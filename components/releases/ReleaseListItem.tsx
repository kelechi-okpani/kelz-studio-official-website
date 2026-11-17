import Link from "next/link";
import { fmtDate } from "@/lib/releases/github";
import type { Release } from "@/lib/releases/types";
import { VersionBadge } from "./VersionBadge";
export function ReleaseListItem({ r }: { r: Release }) {
  const has = (p: string) => r.assets.some((a) => a.platform === p);
  return (
    <li className="relative border-l-2 border-line pb-12 pl-8 last:pb-0">
      <span className="absolute -left-[7px] top-2 h-3 w-3 rounded-full border-2 border-brand bg-bg dark:border-glow" aria-hidden />
      <div className="flex flex-wrap items-center gap-3"><VersionBadge version={r.version} prerelease={r.prerelease} /><time dateTime={r.publishedAt} className="text-sm text-muted">{fmtDate(r.publishedAt)}</time></div>
      <h3 className="mt-3 text-2xl font-semibold text-fg"><Link href={`/releases/${encodeURIComponent(r.tag)}`} className="hover:text-glow">{r.name}</Link></h3>
      {r.summary && <p className="mt-2 max-w-2xl text-muted">{r.summary}</p>}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        {has("windows") && <span className="rounded-md bg-surface2 px-2.5 py-1 text-fg">Windows</span>}{has("macos") && <span className="rounded-md bg-surface2 px-2.5 py-1 text-fg">macOS</span>}
        {!r.assets.length && <span className="text-muted">No installers attached</span>}
        <Link href={`/releases/${encodeURIComponent(r.tag)}`} className="font-medium text-glow hover:underline">View details →</Link></div>
    </li>);
}
