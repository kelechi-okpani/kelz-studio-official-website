export function VersionBadge({ version, prerelease, latest }: { version: string; prerelease?: boolean; latest?: boolean }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <span className="rounded-full bg-brand px-3 py-1 text-sm font-semibold text-on-brand">v{version}</span>
      {latest && <span className="flex items-center gap-1.5 rounded-full border border-glow/40 px-3 py-1 text-xs font-medium text-glow"><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-glow" />Latest stable</span>}
      {prerelease ? <span className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">Pre-release</span> : !latest && <span className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">Stable</span>}
    </span>);
}
