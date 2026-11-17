import { Apple, Download } from "lucide-react";
import { requirements } from "@/config/downloads";
import { archLabel, assetsFor, fmtBytes, fmtDate } from "@/lib/releases/github";
import type { Arch, Platform, Release } from "@/lib/releases/types";
const Win = () => <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden><path d="M3 5.5 10.5 4.4v7H3zm8.5-1.2L21 3v8.4h-9.5zM3 12.6h7.5v7L3 18.5zm8.5 0H21V21l-9.5-1.4z" /></svg>;
/** `arch` splits macOS into Apple Silicon (arm64) and Intel (x64) cards; universal builds appear in both. */
export function PlatformDownload({ release, platform, arch }: { release: Release; platform: Platform; arch?: Extract<Arch, "arm64" | "x64"> }) {
  const base = platform === "windows" ? "Windows" : "macOS"; const label = arch ? `${base} (${arch === "arm64" ? "Apple Silicon" : "Intel"})` : base;
  const assets = assetsFor(release, platform).filter((a) => !arch || a.arch === arch || a.arch === "universal");
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgb(var(--shadow)/.4)]">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand to-glow" aria-hidden />
      <div className="flex items-center gap-3 text-fg"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface2 text-brand dark:text-glow">{platform === "windows" ? <Win /> : <Apple size={26} />}</span>
        <div><h3 className="text-xl font-semibold">KelzStudio for {base}{arch ? <span className="block text-base font-medium text-muted">{arch === "arm64" ? "Apple Silicon" : "Intel"}</span> : null}</h3><p className="text-sm text-muted">Version {release.version} · {fmtDate(release.publishedAt)}</p></div></div>
      {requirements[platform] && <p className="mt-4 text-sm text-muted">Requires {requirements[platform]}</p>}
      {assets.length === 0 ? <p role="status" className="mt-6 rounded-lg border border-dashed border-line px-5 py-3 text-center text-muted">No {label} installer is available in this release.</p>
        : <div className="mt-6 space-y-5">{assets.map((a) => (
          <div key={a.id}><dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-muted">File</dt><dd className="break-all text-right text-fg">{a.name}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Format</dt><dd className="text-fg">{a.format}</dd></div>
            {!arch && archLabel[a.arch] && <div className="flex justify-between"><dt className="text-muted">Architecture</dt><dd className="text-fg">{archLabel[a.arch]}</dd></div>}
            <div className="flex justify-between"><dt className="text-muted">Size</dt><dd className="text-fg">{fmtBytes(a.size)}</dd></div>
            {a.digest && <div className="flex justify-between gap-4"><dt className="shrink-0 text-muted">Checksum (GitHub)</dt><dd className="break-all text-right font-mono text-xs text-fg">{a.digest}</dd></div>}</dl>
            <a href={a.url} className="btn-primary mt-4 w-full"><Download size={18} />Download for {label}{!arch && archLabel[a.arch] && assets.length > 1 ? ` (${archLabel[a.arch]})` : ""}</a></div>))}</div>}
    </div>);
}
