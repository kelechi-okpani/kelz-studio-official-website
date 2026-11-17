import type { Metadata } from "next";
import Link from "next/link";
import { DownloadGrid } from "@/components/releases/DownloadGrid";
import { Stale, Unavailable } from "@/components/releases/Unavailable";
import { VersionBadge } from "@/components/releases/VersionBadge";
import { site } from "@/config/site";
import { fmtDate, getReleases, latestStable } from "@/lib/releases/github";
import { downloadRelease } from "@/lib/releases/manual";
export const revalidate = 600; // keep in sync with config/downloads.ts (Next requires a literal)
export const metadata: Metadata = { title: "Download KelzStudio", description: "Download the latest version of KelzStudio for Windows and macOS.", ...(site.url ? { alternates: { canonical: "/download" } } : {}) };
export default async function Download() {
  const d = await getReleases(); const r = d.ok ? latestStable(d.releases) : undefined; const dl = downloadRelease(r);
  return (
    <div className="mx-auto max-w-6xl px-5 pb-28 pt-32">
      <h1 className="text-5xl font-semibold tracking-tight text-fg md:text-7xl">Download KelzStudio.</h1>
      <p className="mt-5 text-lg text-muted">Choose your platform and get started with KelzStudio.</p>
      {!dl ? <div className="mt-12"><Unavailable what="Downloads are" /></div> : <>
        <div className="mt-10 flex flex-wrap items-center gap-4">{dl.version && <VersionBadge version={dl.version} latest={!!r} />}{dl.publishedAt && <span className="text-sm text-muted">Published {fmtDate(dl.publishedAt)}</span>}
          {r && <Link href={`/releases/${encodeURIComponent(r.tag)}`} className="text-sm font-medium text-glow hover:underline">Release notes →</Link>}</div>
        {d.ok && d.stale && <div className="mt-6"><Stale at={d.fetchedAt} /></div>}
        <div className="mt-8"><DownloadGrid release={dl} /></div></>}
      <p className="mt-10 text-sm text-muted">Need an earlier version? <Link href="/releases" className="text-glow hover:underline">View all releases</Link>. Installer signing and notarization status is not stated here until it has been confirmed.</p>
    </div>);
}
