import type { Arch, Platform, PlatformAsset, Release } from "./types";
/**
 * Env-configured download links. These take priority over GitHub Release assets for the same platform/architecture,
 * and keep the Download page working when GitHub Releases are unavailable. Server-side env only.
 */
const slots: { key: string; platform: Platform; arch: Arch; id: number }[] = [
  { key: "WINDOWS", platform: "windows", arch: "unknown", id: -1 },
  { key: "MAC_ARM64", platform: "macos", arch: "arm64", id: -2 },
  { key: "MAC_INTEL", platform: "macos", arch: "x64", id: -3 },
];
const env = (k: string) => process.env[k]?.trim() || undefined;
const extOf = (s: string) => { const m = s.split("?")[0].match(/\.([a-z0-9]{2,5})$/i); return m ? `.${m[1].toLowerCase()}` : ""; };
const baseName = (url: string) => { try { return decodeURIComponent(url.split("?")[0].split("/").pop() || ""); } catch { return ""; } };
export function getManualAssets(): PlatformAsset[] {
  return slots.flatMap((s) => {
    const url = env(`DOWNLOAD_${s.key}_URL`); if (!url || !/^https?:\/\//i.test(url)) return [];
    const name = env(`DOWNLOAD_${s.key}_FILENAME`) ?? (baseName(url) || "KelzStudio");
    return [{ id: s.id, name, platform: s.platform, arch: s.arch, format: extOf(name) || extOf(url), size: 0, sizeLabel: env(`DOWNLOAD_${s.key}_SIZE`), url, digest: env(`DOWNLOAD_${s.key}_CHECKSUM`), source: "env" as const }];
  });
}
/** Merges env downloads into the latest GitHub release (or stands in for it when GitHub is unavailable). */
export function downloadRelease(r?: Release): Release | undefined {
  const manual = getManualAssets(); if (!manual.length) return r;
  const base: Release = r ?? { tag: "", version: "", name: "KelzStudio", publishedAt: "", prerelease: false, url: "", body: "", summary: "", sections: [], assets: [] };
  const kept = base.assets.filter((a) => !manual.some((m) => m.platform === a.platform && (m.platform === "windows" || m.arch === a.arch)));
  return { ...base, version: env("DOWNLOAD_VERSION") ?? base.version, publishedAt: env("DOWNLOAD_DATE") ?? base.publishedAt, assets: [...kept, ...manual] };
}
