import type { Metadata } from "next";
import Link from "next/link";
import { PlatformDownload } from "@/components/releases/PlatformDownload";
import { NoStable, Stale, Unavailable } from "@/components/releases/Unavailable";
import { VersionBadge } from "@/components/releases/VersionBadge";
import { site } from "@/config/site";
import { assetsFor, fmtDate, getReleases, latestStable } from "@/lib/releases/github";
export const revalidate = 600; // keep in sync with config/downloads.ts (Next requires a literal)
export const metadata: Metadata = { title: "Download KelzStudio", description: "Download the latest stable version of KelzStudio for Windows and macOS.", ...(site.url ? { alternates: { canonical: "/download" } } : {}) };
export default async function Download() {
  const d = await getReleases(); const r = d.ok ? latestStable(d.releases) : undefined;
  return (
    <div className="mx-auto max-w-6xl px-5 pb-28 pt-32">
      <h1 className="text-5xl font-semibold tracking-tight text-fg md:text-7xl">Download KelzStudio.</h1>
      <p className="mt-5 text-lg text-muted">Choose your platform and get started with KelzStudio.</p>
      {!d.ok ? <div className="mt-12"><Unavailable /></div> : !r ? <div className="mt-12"><NoStable /></div> : <>
        <div className="mt-10 flex flex-wrap items-center gap-4"><VersionBadge version={r.version} latest /><span className="text-sm text-muted">Published {fmtDate(r.publishedAt)}</span><Link href={`/releases/${encodeURIComponent(r.tag)}`} className="text-sm font-medium text-glow hover:underline">Release notes →</Link></div>
        {d.stale && <div className="mt-6"><Stale at={d.fetchedAt} /></div>}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <PlatformDownload release={r} platform="windows" />
          {/* Separate Apple Silicon / Intel cards when macOS assets are labelled by architecture; otherwise one macOS card. */}
          {assetsFor(r, "macos").some((a) => a.arch === "unknown") ? <PlatformDownload release={r} platform="macos" /> : <><PlatformDownload release={r} platform="macos" arch="arm64" /><PlatformDownload release={r} platform="macos" arch="x64" /></>}</div></>}
      <p className="mt-10 text-sm text-muted">Need an earlier version? <Link href="/releases" className="text-glow hover:underline">View all releases</Link>. Installer signing and notarization status is not stated here until it has been confirmed.</p>
    </div>);
}
