import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PlatformDownload } from "@/components/releases/PlatformDownload";
import { ReleaseNotes } from "@/components/releases/ReleaseNotes";
import { Stale, Unavailable } from "@/components/releases/Unavailable";
import { VersionBadge } from "@/components/releases/VersionBadge";
import { revalidateSeconds } from "@/config/downloads";
import { site } from "@/config/site";
import { fmtDate, getReleases, latestStable } from "@/lib/releases/github";
export const revalidate = 600; // keep in sync with config/downloads.ts (Next requires a literal) export const dynamicParams = true;
type P = { params: Promise<{ tag: string }> };
export async function generateStaticParams() { const d = await getReleases(); return d.ok ? d.releases.map((r) => ({ tag: r.tag })) : []; }
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const tag = decodeURIComponent((await params).tag); const d = await getReleases(); const r = d.ok ? d.releases.find((x) => x.tag === tag) : undefined;
  if (!r) return { title: "Release" };
  const description = r.summary || `KelzStudio ${r.version}, published ${fmtDate(r.publishedAt)}.`;
  return { title: `KelzStudio ${r.version}`, description, openGraph: { title: `KelzStudio ${r.version}`, description }, ...(site.url ? { alternates: { canonical: `/releases/${encodeURIComponent(r.tag)}` } } : {}) };
}
export default async function ReleasePage({ params }: P) {
  const tag = decodeURIComponent((await params).tag); const d = await getReleases();
  if (!d.ok) return <div className="mx-auto max-w-3xl px-5 pb-28 pt-32"><Unavailable what="This release" /></div>;
  const i = d.releases.findIndex((x) => x.tag === tag); if (i < 0) notFound();
  const r = d.releases[i]; const newer = d.releases[i - 1], older = d.releases[i + 1]; const isLatest = latestStable(d.releases)?.tag === r.tag;
  return (
    <article className="mx-auto max-w-5xl px-5 pb-28 pt-32">
      {d.stale && <Stale at={d.fetchedAt} />}
      <Link href="/releases" className="text-sm text-glow hover:underline">← All releases</Link>
      <div className="mt-6"><VersionBadge version={r.version} prerelease={r.prerelease} latest={isLatest} /></div>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-fg md:text-6xl">{r.name}</h1>
      <p className="mt-3 text-muted">Published <time dateTime={r.publishedAt}>{fmtDate(r.publishedAt)}</time> · <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-glow hover:underline">View on GitHub</a></p>
      <h2 className="mt-14 text-sm font-semibold tracking-[.18em] text-glow">DOWNLOAD</h2>
      <div className="mt-4 grid gap-6 md:grid-cols-2"><PlatformDownload release={r} platform="windows" /><PlatformDownload release={r} platform="macos" /></div>
      <h2 className="mt-16 text-sm font-semibold tracking-[.18em] text-glow">RELEASE NOTES</h2>
      <div className="mt-5 max-w-3xl"><ReleaseNotes release={r} /></div>
      <nav aria-label="Release navigation" className="mt-20 flex justify-between gap-6 border-t border-line pt-6 text-sm">
        {older ? <Link href={`/releases/${encodeURIComponent(older.tag)}`} className="hover:text-glow">← Older: {older.version}</Link> : <span />}
        {newer ? <Link href={`/releases/${encodeURIComponent(newer.tag)}`} className="hover:text-glow">Newer: {newer.version} →</Link> : <span />}</nav>
    </article>);
}
