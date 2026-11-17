import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tutorials } from "@/content/tutorials";
type P = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return tutorials.map((t) => ({ slug: t.slug })); }
export async function generateMetadata({ params }: P): Promise<Metadata> { const { slug } = await params; const t = tutorials.find((x) => x.slug === slug); return t ? { title: t.title, description: t.intro } : {}; }
export default async function Tutorial({ params }: P) {
  const { slug } = await params; const i = tutorials.findIndex((t) => t.slug === slug); if (i < 0) notFound();
  const t = tutorials[i]; const prev = tutorials[i - 1]; const next = tutorials[i + 1]; const related = tutorials.filter((x) => x.category === t.category && x.slug !== slug);
  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-32">
      <Link href="/how-it-works" className="text-sm text-glow">← All guides</Link>
      <h1 className="mt-4 text-4xl font-semibold text-fg">{t.title}</h1>
      <p className="mt-2 text-sm text-muted">{t.level} · {t.minutes} min read</p>
      <p className="mt-6 text-lg text-fg/80">{t.intro}</p>
      <ol className="mt-10 space-y-8">{t.steps.map((s, n) => (
        <li key={n} className="flex gap-4"><span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-on-brand">{n + 1}</span>
          <div><p className="text-fg/80">{s.text}</p>{s.shot && <Image src={s.shot} alt="" width={1500} height={800} className="mt-4 h-auto w-full rounded-md border border-line" />}</div></li>))}</ol>
      {t.notes?.map((n) => <p key={n} className="mt-8 rounded-md border border-glow/30 bg-surface2 p-4 text-sm text-fg/80"><strong className="text-fg">Note: </strong>{n}</p>)}
      {!!related.length && <div className="mt-12"><h2 className="font-semibold text-fg">Related</h2><ul className="mt-2">{related.map((r) => <li key={r.slug}><Link className="text-glow" href={`/how-it-works/${r.slug}`}>{r.title}</Link></li>)}</ul></div>}
      <nav className="mt-14 flex justify-between border-t border-line pt-6 text-sm" aria-label="Guide navigation">
        {prev ? <Link href={`/how-it-works/${prev.slug}`}>← {prev.title}</Link> : <span />}{next ? <Link href={`/how-it-works/${next.slug}`}>{next.title} →</Link> : <span />}</nav>
    </article>);
}
