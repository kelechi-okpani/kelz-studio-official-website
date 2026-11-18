import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

export const downloadClickPlatforms = ["windows", "mac_intel", "mac_silicon", "macos"] as const;
export type DownloadClickPlatform = (typeof downloadClickPlatforms)[number];

const isDownloadClickPlatform = (value: unknown): value is DownloadClickPlatform =>
  typeof value === "string" && downloadClickPlatforms.includes(value as DownloadClickPlatform);

let sqlClient: NeonQueryFunction<false, false> | undefined;
let schemaReady: Promise<void> | undefined;
let localStoreQueue: Promise<void> = Promise.resolve();

interface LocalDownloadClick {
  platform: DownloadClickPlatform;
  releaseVersion: string;
  assetName: string;
  clickedAt: string;
}

const localStorePath = join(process.cwd(), ".data", "download-clicks.json");

function getSql() {
  const connectionString = process.env.DATABASE_URL?.trim();
  if (!connectionString && process.env.NODE_ENV === "development") return null;
  if (!connectionString) throw new Error("DATABASE_URL is not configured.");
  sqlClient ??= neon(connectionString);
  return sqlClient;
}

async function ensureSchema() {
  const sql = getSql();
  if (!sql) return null;

  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS kelzstudio_download_clicks (
          id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          platform TEXT NOT NULL CHECK (platform IN ('windows', 'mac_intel', 'mac_silicon', 'macos')),
          release_version TEXT NOT NULL,
          asset_name TEXT NOT NULL,
          clicked_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`
        CREATE INDEX IF NOT EXISTS kelzstudio_download_clicks_platform_idx
        ON kelzstudio_download_clicks (platform, clicked_at DESC)
      `;
    })();
  }

  try {
    await schemaReady;
  } catch (error) {
    schemaReady = undefined;
    throw error;
  }
  return sql;
}

function isLocalDownloadClick(value: unknown): value is LocalDownloadClick {
  if (!value || typeof value !== "object") return false;
  const click = value as Record<string, unknown>;
  return (
    isDownloadClickPlatform(click.platform) &&
    typeof click.releaseVersion === "string" &&
    typeof click.assetName === "string" &&
    typeof click.clickedAt === "string"
  );
}

async function readLocalClicks(): Promise<LocalDownloadClick[]> {
  let contents: string;
  try {
    contents = await readFile(localStorePath, "utf8");
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") return [];
    throw error;
  }

  const parsed: unknown = JSON.parse(contents);
  if (!Array.isArray(parsed) || !parsed.every(isLocalDownloadClick)) {
    throw new Error("Local download click storage contains invalid data.");
  }
  return parsed;
}

function withLocalStore<T>(operation: () => Promise<T>): Promise<T> {
  const result = localStoreQueue.then(operation);
  localStoreQueue = result.then(
    () => undefined,
    () => undefined,
  );
  return result;
}

async function appendLocalClick(click: LocalDownloadClick): Promise<number> {
  return withLocalStore(async () => {
    const clicks = await readLocalClicks();
    clicks.push(click);
    await mkdir(join(process.cwd(), ".data"), { recursive: true });

    const temporaryPath = `${localStorePath}.${randomUUID()}.tmp`;
    await writeFile(temporaryPath, JSON.stringify(clicks), { encoding: "utf8", flag: "wx" });
    await rename(temporaryPath, localStorePath);
    return clicks.filter((savedClick) => savedClick.platform === click.platform).length;
  });
}

async function countForPlatform(platform: DownloadClickPlatform): Promise<number> {
  const sql = await ensureSchema();
  if (!sql) {
    return withLocalStore(async () => {
      const clicks = await readLocalClicks();
      return clicks.filter((click) => click.platform === platform).length;
    });
  }

  const rows = await sql`
    SELECT COUNT(*)::TEXT AS count
    FROM kelzstudio_download_clicks
    WHERE platform = ${platform}
  `;
  const count: unknown = rows[0]?.count;
  const parsed = typeof count === "number" ? count : typeof count === "string" ? Number(count) : NaN;
  if (!Number.isSafeInteger(parsed) || parsed < 0) {
    throw new Error("The database returned an invalid download count.");
  }
  return parsed;
}

export async function getDownloadClickCount(platform: DownloadClickPlatform): Promise<number> {
  return countForPlatform(platform);
}

export async function recordDownloadClick({
  platform,
  releaseVersion,
  assetName,
}: {
  platform: DownloadClickPlatform;
  releaseVersion: string;
  assetName: string;
}): Promise<number> {
  const sql = await ensureSchema();
  if (!sql) {
    return appendLocalClick({
      platform,
      releaseVersion,
      assetName,
      clickedAt: new Date().toISOString(),
    });
  }
  await sql`
    INSERT INTO kelzstudio_download_clicks (platform, release_version, asset_name)
    VALUES (${platform}, ${releaseVersion}, ${assetName})
  `;
  return countForPlatform(platform);
}

export { isDownloadClickPlatform };
