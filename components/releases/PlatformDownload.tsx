import { Apple, Download } from "lucide-react";
import { requirements } from "@/config/downloads";
import { archLabel, assetsFor, fmtBytes, fmtDate } from "@/lib/releases/github";
import type { Arch, Platform, Release } from "@/lib/releases/types";
import type { DownloadClickPlatform } from "@/lib/download-clicks";
import { TrackedDownloadLink } from "./TrackedDownloadLink";
import Image from "next/image";

// const Win = () => <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden><path d="M3 5.5 10.5 4.4v7H3zm8.5-1.2L21 3v8.4h-9.5zM3 12.6h7.5v7L3 18.5zm8.5 0H21V21l-9.5-1.4z" /></svg>;
const Win = ({ size = 26 }: { size?: number }) => <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden><path d="M3 5.5 10.5 4.4v7H3zm8.5-1.2L21 3v8.4h-9.5zM3 12.6h7.5v7L3 18.5zm8.5 0H21V21l-9.5-1.4z" /></svg>;

/** `arch` splits macOS into Apple Silicon (arm64) and Intel (x64) cards; universal builds appear in both. */
export function PlatformDownload({ release, platform, arch }: { release: Release; platform: Platform; arch?: Extract<Arch, "arm64" | "x64"> }) {
  const base = platform === "windows" ? "Windows" : "macOS"; const label = arch ? `${base} (${arch === "arm64" ? "Apple Silicon" : "Intel"})` : base;
  const assets = assetsFor(release, platform).filter((a) => !arch || a.arch === arch || a.arch === "universal");
  const meta = [release.version && `Version ${release.version}`, 
    release.publishedAt && fmtDate(release.publishedAt)].filter(Boolean).join(" · ");
  
  
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgb(var(--shadow)/.4)]">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand to-glow" aria-hidden />
      {/* faint brand watermark */}
      <Image src="/logo.png" alt="" aria-hidden width={160} height={160} className="pointer-events-none absolute -bottom-8 -right-8 h-36 w-36 opacity-[0.06] transition duration-500 group-hover:scale-110 group-hover:opacity-[0.12]" />

      <div className="relative flex items-center gap-3 text-fg">
        {/* KelzStudio logo with a small platform badge */}
        <span className="relative h-12 w-12 shrink-0">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface2 ring-1 ring-line transition duration-300 group-hover:-rotate-3 group-hover:scale-105">
            <Image src="/logo.png" alt="KelzStudio logo" width={36} height={36} className="h-9 w-9 object-contain" />
          </span>
          <span className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-line bg-surface text-brand shadow-sm dark:text-glow [&>svg]:h-3.5 [&>svg]:w-3.5">
            {platform === "windows" ? <Win /> : <Apple size={14} />}
          </span>
        </span>
        <div>
          <h3 className="text-base font-semibold">
            KelzStudio for {base}
            {arch ? <span className="block text-xs font-medium text-muted">{arch === "arm64" ? "Apple Silicon" : "Intel"}</span> : null}
          </h3>
          <div className="space-y-0.5 text-xs text-muted">
            {release.version && <p>Version {release.version}</p>}
            {release.publishedAt && <p>{fmtDate(release.publishedAt)}</p>}
          </div>
        </div>
      </div>

      {requirements[platform] && <p className="relative mt-4 text-sm text-muted">Requires {requirements[platform]}</p>}
      {assets.length === 0 ? <p role="status" className="relative mt-6 rounded-lg border border-dashed border-line px-5 py-3 text-center text-muted">No {label} installer is available in this release.</p>
        : <div className="relative mt-6 flex flex-1 flex-col gap-5">{assets.map((a) => { const size = a.sizeLabel ?? (a.size ? fmtBytes(a.size) : ""); return (
          <div key={a.id} className="flex flex-1 flex-col"><dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-muted">File</dt><dd className="break-all text-right text-fg">{a.name}</dd></div>
            {a.format && <div className="flex justify-between"><dt className="text-muted">Format</dt><dd className="text-fg">{a.format}</dd></div>}
            {!arch && archLabel[a.arch] && <div className="flex justify-between"><dt className="text-muted">Architecture</dt><dd className="text-fg">{archLabel[a.arch]}</dd></div>}
            {size && <div className="flex justify-between"><dt className="text-muted">Size</dt><dd className="text-fg">{size}</dd></div>}
            {a.downloads !== undefined && <div className="flex justify-between"><dt className="text-muted">Downloads</dt><dd className="font-medium text-fg">{a.downloads.toLocaleString("en-US")}</dd></div>}
          </dl>
            <TrackedDownloadLink href={a.url} platform={clickPlatformForAsset(platform, arch, a.arch)} releaseVersion={release.version} assetName={a.name}>
              <Download size={18} />
              <span className="text-xs font-medium">Download for </span>
              <span className="text-xs font-medium">{arch ? (arch === "arm64" ? "Apple Silicon" : "Intel") : label}{!arch && archLabel[a.arch] && assets.length > 1 ? ` (${archLabel[a.arch]})` : ""}</span>
            </TrackedDownloadLink></div>); })}</div>}
    </div>);
}

function clickPlatformForAsset(
  platform: Platform,
  cardArch: Extract<Arch, "arm64" | "x64"> | undefined,
  assetArch: Arch,
): DownloadClickPlatform {
  if (platform === "windows") return "windows";
  const arch = cardArch ?? assetArch;
  if (arch === "arm64") return "mac_silicon";
  if (arch === "x64") return "mac_intel";
  return "macos";
}