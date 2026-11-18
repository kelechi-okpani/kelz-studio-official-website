import type { Metadata } from "next";
import Link from "next/link";
import { installNote, tutorials } from "@/content/tutorials";
export const metadata: Metadata = { title: "How It Works", description: "Step-by-step guides for using KelzStudio." };
export default function HowItWorks() {
  const cats = [...new Set(tutorials.map((t) => t.category))];
  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-32">
      <h1 className="text-3xl font-semibold text-fg md:text-4xl">How It Works</h1>
      <p className="mt-4 text-muted">Practical guides that follow the real KelzStudio interface.</p>
      {cats.map((c) => <section key={c} className="mt-12"><h2 className="text-sm tracking-widest text-glow">{c.toUpperCase()}</h2>
        <ul className="mt-4 divide-y divide-line border-y border-line">{tutorials.filter((t) => t.category === c).map((t) => (
          <li key={t.slug}><Link href={`/how-it-works/${t.slug}`} className="flex items-center justify-between py-4 hover:text-fg"><span className="font-medium text-fg/80">{t.title}</span><span className="text-sm text-muted">{t.minutes} min · {t.level}</span></Link></li>))}</ul></section>)}
      <p className="mt-12 text-sm text-muted">{installNote}</p>
    </div>);
}
