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
const labels: Record<string, string> = {
  WINDOWS: "KelzStudio for Windows",
  MAC_ARM64: "KelzStudio for macOS (Apple Silicon)",
  MAC_INTEL: "KelzStudio for macOS (Intel)",
};
const isHash = (v?: string) => !!v && /^(sha\d+:)?[a-f0-9]{32,128}$/i.test(v);
const env = (k: string) => process.env[k]?.trim() || undefined;
const extOf = (s: string) => { const m = s.split("?")[0].match(/\.([a-z0-9]{2,5})$/i); return m ? `.${m[1].toLowerCase()}` : ""; };
const baseName = (url: string) => { try { return decodeURIComponent(url.split("?")[0].split("/").pop() || ""); } catch { return ""; } };

export function getManualAssets(): PlatformAsset[] {
  return slots.flatMap((s) => {
    const url = env(`DOWNLOAD_${s.key}_URL`);
    if (!url || !/^https?:\/\//i.test(url)) return [];

    // Use the filename from the URL only if it looks like a real file (has letters and an extension);
    // otherwise fall back to a friendly label instead of showing an ID like 14370297369.
    const fromUrl = baseName(url);
    const looksLikeFile = /[a-z]/i.test(fromUrl) && /\.[a-z0-9]{2,5}$/i.test(fromUrl);
    const name = env(`DOWNLOAD_${s.key}_FILENAME`) ?? (looksLikeFile ? fromUrl : labels[s.key]);

    // Show a checksum only if it is a real hash (e.g. sha256:abc123...); anything else is ignored.
    const checksum = env(`DOWNLOAD_${s.key}_CHECKSUM`);

    return [{
      id: s.id, name, platform: s.platform, arch: s.arch,
      format: extOf(name) || extOf(url), size: 0,
      sizeLabel: env(`DOWNLOAD_${s.key}_SIZE`), url,
      digest: isHash(checksum) ? checksum : undefined,
      source: "env" as const,
    }];
  });
}

/** Merges env downloads into the latest GitHub release (or stands in for it when GitHub is unavailable). */
export function downloadRelease(r?: Release): Release | undefined {
  const manual = getManualAssets();
  if (!manual.length) return r;
  const base: Release = r ?? { tag: "", version: "", name: "KelzStudio", publishedAt: "", prerelease: false, url: "", body: "", summary: "", sections: [], assets: [] };
  const kept = base.assets.filter((a) => !manual.some((m) => m.platform === a.platform && (m.platform === "windows" || m.arch === a.arch)));
  return { ...base, version: env("DOWNLOAD_VERSION") ?? base.version, publishedAt: env("DOWNLOAD_DATE") ?? base.publishedAt, assets: [...kept, ...manual] };
}