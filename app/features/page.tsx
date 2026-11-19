import type { Metadata } from "next";
import { Shot } from "@/components/Shot";
import { documents, libraries, liveControls, outputs, platform, workflow, type Item } from "@/content/features";
import { limitations } from "@/content/limits";
export const metadata: Metadata = { title: "Features", description: "Songs, Scriptures, Media, Presentations, Themes, schedules, three output types, alerts and more in KelzStudio." };
const label = "text-sm font-semibold tracking-[.18em] text-glow";
function Grid({ items, cols = "md:grid-cols-2" }: { items: Item[]; cols?: string }) {
  return <div className={`mt-6 grid gap-x-10 gap-y-8 ${cols}`}>{items.map((o) => (
    <div key={o.title} className="border-t border-line pt-4"><h3 className="font-semibold text-fg">{o.title}</h3><p className="mt-1 text-sm text-muted">{o.text}</p>
      {o.points && <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-fg/80">{o.points.map((p) => <li key={p}>{p}</li>)}</ul>}</div>))}</div>;
}
export default function Features() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32">
      <h1 className="text-3xl font-semibold text-fg md:text-5xl">Features</h1>
      <p className="mt-4 max-w-2xl text-muted">Everything below describes what KelzStudio does today.</p>
      <h2 className={`mt-16 ${label}`}>RESOURCE LIBRARIES</h2>
      <div className="mt-8 space-y-20">{libraries.map((f) => (
        <section key={f.id} id={f.id} className="grid scroll-mt-24 items-start gap-8 lg:grid-cols-2">
          <div><h3 className="text-xl font-semibold text-fg md:text-2xl">{f.title}</h3><p className="mt-2 text-muted">{f.summary}</p>
            <ul className="mt-4 list-disc space-y-1.5 pl-5 text-fg/80">{f.points.map((p) => <li key={p}>{p}</li>)}</ul></div>
          {f.shot && <Shot name={f.shot} />}
        </section>))}</div>
      <h2 className={`mt-24 ${label}`}>DOCUMENTS AND PRESENTATIONS</h2><Grid items={documents} cols="md:grid-cols-3" />
      <h2 id="schedule" className={`mt-24 scroll-mt-24 ${label}`}>SCHEDULE AND WORKFLOW</h2><Grid items={workflow} cols="md:grid-cols-3" />
      <h2 className={`mt-24 ${label}`}>OUTPUT MANAGEMENT</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">{outputs.map((o) => <div key={o.id} id={o.id} className="scroll-mt-24 border-t border-line pt-4"><h3 className="font-semibold text-fg">{o.title}</h3><p className="mt-1 text-sm text-muted">{o.text}</p></div>)}</div>
      <h2 className={`mt-24 ${label}`}>PRESENTATION CONTROLS</h2><Grid items={liveControls} cols="md:grid-cols-3" />
      <h2 className={`mt-24 ${label}`}>DATA AND PLATFORM</h2><Grid items={platform} cols="md:grid-cols-2" />
      <h2 id="limits" className={`mt-24 scroll-mt-24 ${label}`}>GOOD TO KNOW</h2>
      <p className="mt-3 max-w-2xl text-muted">What KelzStudio does not do today, so there are no surprises.</p><Grid items={limitations} cols="md:grid-cols-2" />
    </div>);
}
