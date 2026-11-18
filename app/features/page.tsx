import type { Metadata } from "next";
import { Shot } from "@/components/Shot";
import { controls, libraries, outputs } from "@/content/features";
export const metadata: Metadata = { title: "Features", description: "Songs, Scriptures, Media, Presentations, Themes, schedules and multiple outputs in KelzStudio." };
export default function Features() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32">
      <h1 className="text-3xl font-semibold text-fg md:text-4xl">Features</h1>
      <p className="mt-4 max-w-2xl text-muted">Everything below is based on the current KelzStudio interface.</p>
      <h2 className="mt-16 text-sm tracking-widest text-glow">RESOURCE LIBRARIES</h2>
      <div className="mt-8 space-y-20">{libraries.map((f) => (
        <section key={f.id} id={f.id} className="grid scroll-mt-24 items-start gap-8 lg:grid-cols-2">
          <div><h3 className="text-xl font-semibold text-fg">{f.title}</h3><p className="mt-2 text-muted">{f.summary}</p>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-fg/80">{f.points.map((p) => <li key={p}>{p}</li>)}</ul></div>
          {f.shot && <Shot name={f.shot} />}
        </section>))}</div>
      <h2 className="mt-24 text-sm tracking-widest text-glow">OUTPUT MANAGEMENT</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">{outputs.map((o) => <div key={o.id} id={o.id} className="border-t border-line pt-4"><h3 className="font-semibold text-fg">{o.title}</h3><p className="mt-1 text-sm text-muted">{o.text}</p></div>)}</div>
      <h2 className="mt-24 text-sm tracking-widest text-glow">WORKFLOW AND CONTROLS</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">{controls.map((o) => <div key={o.title} className="border-t border-line pt-4"><h3 className="font-semibold text-fg">{o.title}</h3><p className="mt-1 text-sm text-muted">{o.text}</p></div>)}</div>
    </div>);
}
