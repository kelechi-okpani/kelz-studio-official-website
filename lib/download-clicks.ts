import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

export const downloadClickPlatforms = ["windows", "mac_intel", "mac_silicon", "macos"] as const;
export type DownloadClickPlatform = (typeof downloadClickPlatforms)[number];

const isDownloadClickPlatform = (value: unknown): value is DownloadClickPlatform =>
  typeof value === "string" && downloadClickPlatforms.includes(value as DownloadClickPlatform);

const localDevelopmentCounts = new Map<DownloadClickPlatform, number>();

let sqlClient: NeonQueryFunction<false, false> | undefined;
let schemaReady: Promise<void> | undefined;

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

async function countForPlatform(platform: DownloadClickPlatform): Promise<number> {
  const sql = await ensureSchema();
  if (!sql) return localDevelopmentCounts.get(platform) ?? 0;

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
    const count = (localDevelopmentCounts.get(platform) ?? 0) + 1;
    localDevelopmentCounts.set(platform, count);
    return count;
  }
  await sql`
    INSERT INTO kelzstudio_download_clicks (platform, release_version, asset_name)
    VALUES (${platform}, ${releaseVersion}, ${assetName})
  `;
  return countForPlatform(platform);
}

export { isDownloadClickPlatform };
