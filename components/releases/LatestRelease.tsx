import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { fmtDate } from "@/lib/releases/github";
import type { Release } from "@/lib/releases/types";
import { VersionBadge } from "./VersionBadge";
export function LatestRelease({ release, heading = true }: { release: Release; heading?: boolean }) {
  const has = (p: string) => release.assets.some((a) => a.platform === p);
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-8 shadow-[0_40px_80px_-40px_rgb(var(--shadow)/.45)] md:p-14">
        <div aria-hidden className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-glow/15 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            {heading && <><h2 className="text-3xl font-semibold tracking-tight text-fg md:text-4xl">Always Moving Forward.</h2>
              <p className="mt-4 max-w-xl text-base text-muted">Discover the latest improvements, new features, and updates to KelzStudio.</p></>}
            <div className={heading ? "mt-8" : ""}><VersionBadge version={release.version} latest /><p className="mt-3 text-sm text-muted">Published {fmtDate(release.publishedAt)}</p></div>
            {release.summary && <p className="mt-5 max-w-xl text-fg/80">{release.summary}</p>}
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/download" className="btn-primary">Download KelzStudio</Link><Link href={`/releases/${encodeURIComponent(release.tag)}`} className="btn-ghost">View Release Notes</Link></div>
          </div>
          <div className="space-y-3">
            <div className="select-none text-5xl font-semibold tracking-tighter text-brand/90 dark:text-glow md:text-6xl" aria-hidden>v{release.version}</div>
            {(["windows", "macos"] as const).map((p) => { const as = release.assets.filter((a) => a.platform === p); return (
              <div key={p} className="flex items-center justify-between rounded-xl border border-line bg-surface2 px-4 py-3 text-sm"><span className="font-medium text-fg">{p === "windows" ? "Windows" : "macOS"}</span>
                <span className={has(p) ? "text-fg" : "text-muted"}>{has(p) ? [...new Set(as.map((a) => a.format))].join(", ") + " installer" : "Not in this release"}</span></div>); })}
          </div>
        </div>
      </div>
    </Reveal>);
}
