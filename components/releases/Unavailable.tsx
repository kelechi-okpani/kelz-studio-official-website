export function Unavailable({ what = "Release information" }: { what?: string }) {
  return <div role="status" className="rounded-2xl border border-dashed border-line bg-surface p-8 text-center"><p className="font-medium text-fg">{what} is temporarily unavailable.</p><p className="mt-2 text-muted">Please try again shortly. Nothing has been changed on your side.</p></div>;
}
export function Stale({ at }: { at: string }) {
  return <p className="mb-6 rounded-lg border border-line bg-surface2 px-4 py-2 text-sm text-muted">GitHub could not be reached, so this shows release information last retrieved {new Date(at).toUTCString()}.</p>;
}
export function NoStable() { return <div className="rounded-2xl border border-dashed border-line bg-surface p-8 text-center text-muted">No stable release has been published yet.</div>; }
