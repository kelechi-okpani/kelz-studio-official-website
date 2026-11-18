import { categoryLabels } from "@/lib/releases/notes";
import type { Release } from "@/lib/releases/types";
import { Markdown } from "./Markdown";
/** Categorised when the notes use recognisable headings; otherwise the published text is shown unchanged. */
export function ReleaseNotes({ release }: { release: Release }) {
  if (!release.body.trim()) return <p className="text-muted">No release notes were published for this version.</p>;
  const cat = release.sections.some((s) => s.category);
  if (!cat) return <Markdown source={release.body} />;
  const intro = release.body.split(/\r?\n/).slice(0, release.body.split(/\r?\n/).findIndex((l) => /^(#{1,4}\s|\*\*.+\*\*:?\s*$)/.test(l.trim())));
  return <div className="space-y-10">{intro.join("").trim() && <Markdown source={intro.join("\n")} />}
    {release.sections.map((s, i) => <section key={i}>{s.category ? <p className="text-xs font-semibold tracking-[.18em] text-glow">{categoryLabels[s.category].toUpperCase()}</p> : null}
      <h3 className="mt-1 text-lg font-semibold text-fg">{s.title}</h3><div className="mt-4"><Markdown source={s.markdown} /></div></section>)}</div>;
}
