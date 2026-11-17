import type { Metadata } from "next";
import Link from "next/link";
import { LatestRelease } from "@/components/releases/LatestRelease";
import { ReleaseListItem } from "@/components/releases/ReleaseListItem";
import { NoStable, Stale, Unavailable } from "@/components/releases/Unavailable";
import { revalidateSeconds } from "@/config/downloads";
import { site } from "@/config/site";
import { getReleases, latestStable } from "@/lib/releases/github";
export const revalidate = 600; // keep in sync with config/downloads.ts (Next requires a literal)
export const metadata: Metadata = { title: "KelzStudio Releases", description: "Explore the latest updates, improvements, and releases of KelzStudio.", ...(site.url ? { alternates: { canonical: "/releases" } } : {}) };
type SP = Promise<{ channel?: string; platform?: string; limit?: string }>;
const STEP = 10;
export default async function Releases({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams; const data = await getReleases();
  if (!data.ok) return <Shell><Unavailable /></Shell>;
  const all = data.releases; const latest = latestStable(all);
  const hasPre = all.some((r) => r.prerelease), hasWin = all.some((r) => r.assets.some((a) => a.platform === "windows")), hasMac = all.some((r) => r.assets.some((a) => a.platform === "macos"));
  const channel = hasPre && (sp.channel === "stable" || sp.channel === "pre") ? sp.channel : undefined;
  const platform = hasWin && hasMac && (sp.platform === "windows" || sp.platform === "macos") ? sp.platform : undefined;
  const list = all.filter((r) => (!channel || (channel === "pre") === r.prerelease) && (!platform || r.assets.some((a) => a.platform === platform)));
  const limit = Math.min(Math.max(parseInt(sp.limit ?? "") || STEP, STEP), 500);
  const href = (o: Record<string, string | undefined>) => { const q = new URLSearchParams(); const m = { channel, platform, ...o }; Object.entries(m).forEach(([k, v]) => v && q.set(k, v)); const s = q.toString(); return `/releases${s ? `?${s}` : ""}`; };
  const chip = (on: boolean) => `rounded-full border px-4 py-1.5 text-sm transition ${on ? "border-brand bg-brand text-on-brand" : "border-line text-fg hover:bg-surface2"}`;
  return (
    <Shell>
      {data.stale && <Stale at={data.fetchedAt} />}
      <h2 className="text-sm font-semibold tracking-[.18em] text-glow">LATEST RELEASE</h2>
      <div className="mt-4">{latest ? <LatestRelease release={latest} heading={false} /> : <NoStable />}</div>
      <div className="mt-20 flex flex-wrap items-end justify-between gap-4"><h2 className="text-3xl font-semibold text-fg md:text-4xl">Release History</h2>
        {(hasPre || (hasWin && hasMac)) && <nav aria-label="Filter releases" className="flex flex-wrap gap-2">
          <Link href={href({ channel: undefined, platform: undefined })} className={chip(!channel && !platform)}>All</Link>
          {hasPre && <><Link href={href({ channel: "stable" })} className={chip(channel === "stable")}>Stable</Link><Link href={href({ channel: "pre" })} className={chip(channel === "pre")}>Pre-releases</Link></>}
          {hasWin && hasMac && <><Link href={href({ platform: "windows" })} className={chip(platform === "windows")}>Windows</Link><Link href={href({ platform: "macos" })} className={chip(platform === "macos")}>macOS</Link></>}</nav>}</div>
      {list.length ? <ol className="mt-10">{list.slice(0, limit).map((r) => <ReleaseListItem key={r.tag} r={r} />)}</ol> : <p className="mt-10 text-muted">No releases match these filters.</p>}
      {list.length > limit && <div className="mt-10 text-center"><Link href={href({ limit: String(limit + STEP) })} scroll={false} className="btn-ghost">Load more releases</Link></div>}
    </Shell>);
}
function Shell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-5xl px-5 pb-28 pt-32"><h1 className="text-5xl font-semibold tracking-tight text-fg md:text-7xl">KelzStudio Releases</h1>
    <p className="mb-14 mt-5 max-w-2xl text-lg text-muted">Explore the latest updates, improvements, and releases of KelzStudio.</p>{children}</div>;
}
