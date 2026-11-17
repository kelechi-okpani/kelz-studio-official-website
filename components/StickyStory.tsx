"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { Shot } from "./Shot";
import type { shots } from "@/config/site";
export interface Story { id: string; title: string; text: string; points?: string[]; shot: keyof typeof shots; href?: string }
function Item({ it, i, active, done, numbered, onActive }: { it: Story; i: number; active: boolean; done: boolean; numbered: boolean; onActive: () => void }) {
  const ref = useRef<HTMLDivElement>(null); const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => { if (inView) onActive(); }, [inView, onActive]);
  return (
    <div ref={ref} id={it.id} className={`scroll-mt-28 border-l-2 py-10 pl-7 transition-all duration-500 lg:flex lg:min-h-[70vh] lg:flex-col lg:justify-center ${active ? "border-brand dark:border-glow" : "border-line lg:opacity-45"}`}>
      {numbered && <span className={`mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${active || done ? "bg-brand text-on-brand" : "bg-surface2 text-muted"}`}>{done ? <Check size={16} /> : `0${i + 1}`}</span>}
      <h3 className="text-3xl font-semibold tracking-tight text-fg md:text-4xl">{it.title}</h3>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{it.text}</p>
      {it.points && <ul className="mt-5 max-w-md space-y-2 text-fg/80">{it.points.map((p) => <li key={p} className="flex gap-2.5"><Check size={18} className="mt-1 shrink-0 text-glow" />{p}</li>)}</ul>}
      {it.href && <Link href={it.href} className="mt-6 text-sm font-medium text-glow hover:underline">Learn more →</Link>}
      <div className="mt-8 lg:hidden"><Shot name={it.shot} /></div>
    </div>);
}
export function StickyStory({ items, numbered = false }: { items: Story[]; numbered?: boolean }) {
  const [active, setActive] = useState(0); const reduce = useReducedMotion();
  return (
    <div className="grid gap-x-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)]">
      <div>{items.map((it, i) => <Item key={it.id} it={it} i={i} active={i === active} done={i < active} numbered={numbered} onActive={() => setActive(i)} />)}</div>
      <div className="hidden lg:block"><div className="sticky top-28 pt-6">
        <AnimatePresence mode="wait"><motion.div key={active} initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduce ? undefined : { opacity: 0, y: -16 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
          <Shot name={items[active].shot} sizes="60vw" /></motion.div></AnimatePresence></div></div>
    </div>);
}
