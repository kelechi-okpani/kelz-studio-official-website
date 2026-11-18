import type { Release } from "@/lib/releases/types";
/** Per-installer download counts as reported by GitHub for the release assets. */
export function DownloadStats({ release, all }: { release: Release; all: Release[] }) {
  const rows = release.assets.filter((a) => a.downloads !== undefined);
  if (!rows.length) return null;
  const allTime = all.flatMap((r) => r.assets).reduce((n, a) => n + (a.downloads ?? 0), 0);
  const max = Math.max(1, ...rows.map((a) => a.downloads ?? 0));
  return (
    <section aria-labelledby="dl-stats" className="mt-14 rounded-2xl border border-line bg-surface p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><h2 id="dl-stats" className="text-xl font-semibold text-fg">Downloads so far</h2><p className="mt-1 text-sm text-muted">KelzStudio v{release.version}, per installer</p></div>
        <p className="text-sm text-muted">All versions: <span className="text-xl font-semibold text-fg">{allTime.toLocaleString("en-US")}</span></p>
      </div>
      <ul className="mt-6 space-y-5">{rows.map((a) => (
        <li key={a.id}><div className="flex items-baseline justify-between gap-4"><span className="break-all text-fg">{a.name}</span><span className="text-lg font-semibold tabular-nums text-fg">{(a.downloads ?? 0).toLocaleString("en-US")}</span></div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface2"><div className="h-full rounded-full bg-gradient-to-r from-brand to-glow" style={{ width: `${Math.max(2, ((a.downloads ?? 0) / max) * 100)}%` }} /></div></li>))}</ul>
      <p className="mt-6 text-xs text-muted">Counts come from GitHub and refresh every few minutes.</p>
    </section>);
}
