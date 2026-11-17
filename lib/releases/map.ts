import { assetRules } from "@/config/downloads";
import type { Arch, PlatformAsset, Release } from "./types";
import { parseSections, summarize } from "./notes";
/* eslint-disable @typescript-eslint/no-explicit-any */
const IGNORE = /\.(blockmap|ya?ml|sha\d*|sig|asc|txt|json)$/i;
const archOf = (n: string): Arch => /arm64|aarch64|apple.?silicon/i.test(n) ? "arm64" : /universal/i.test(n) ? "universal" : /x64|x86_64|amd64|intel/i.test(n) ? "x64" : "unknown";
export function classifyAsset(a: any): PlatformAsset | null {
  const name: string = a.name ?? ""; if (!name || IGNORE.test(name) || a.state === "uploading") return null;
  const rule = assetRules.find((r) => new RegExp(r.match, "i").test(name));
  const ext = name.split(".").pop()!.toLowerCase();
  const platform = rule?.platform ?? (/^(exe|msi)$/.test(ext) ? "windows" : /^(dmg|pkg)$/.test(ext) ? "macos" : null);
  if (!platform) return null;
  return { id: a.id, name, platform, arch: rule?.arch ?? archOf(name), format: `.${ext}`, size: a.size ?? 0, url: a.browser_download_url, digest: typeof a.digest === "string" ? a.digest : undefined };
}
export function toRelease(r: any): Release | null {
  if (r.draft || !r.tag_name || !r.published_at) return null;
  const body: string = r.body ?? "";
  return { tag: r.tag_name, version: String(r.tag_name).replace(/^v/i, ""), name: r.name || r.tag_name, publishedAt: r.published_at, prerelease: !!r.prerelease, url: r.html_url, body,
    summary: summarize(body), sections: parseSections(body), assets: (r.assets ?? []).map(classifyAsset).filter(Boolean) as PlatformAsset[] };
}
