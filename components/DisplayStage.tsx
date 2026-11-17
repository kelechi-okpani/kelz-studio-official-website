"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MonitorPlay, Timer } from "lucide-react";
import { shots } from "@/config/site";
import { outputs } from "@/content/features";
export function DisplayStage() {
  const ref = useRef<HTMLDivElement>(null); const reduce = useReducedMotion(); const [active, setActive] = useState(0); const [wide, setWide] = useState(false);
  useEffect(() => { const m = window.matchMedia("(min-width:768px)"); const f = () => setWide(m.matches); f(); m.addEventListener("change", f); return () => m.removeEventListener("change", f); }, []);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 85%", "end 40%"] });
  useMotionValueEvent(p, "change", (v) => setActive(v < 0.42 ? 0 : v < 0.62 ? 1 : 2));
  const on = wide && !reduce;
  const lx = useTransform(p, [0.1, 0.5], [0, on ? -150 : 0]); const rx = useTransform(p, [0.1, 0.5], [0, on ? 150 : 0]);
  const ry = useTransform(p, [0.1, 0.5], [0, on ? 14 : 0]); const sc = useTransform(p, [0.1, 0.5], [on ? 0.88 : 1, 1]);
  const cls = (i: number) => `rounded-xl border bg-surface p-2 shadow-[0_30px_60px_-25px_rgb(var(--shadow)/.5)] transition-all duration-500 ${active === i ? "border-glow ring-2 ring-glow/30" : "border-line md:opacity-70"}`;
  const s = shots.output;
  return (
    <div ref={ref}>
      <div className="relative grid gap-6 md:grid-cols-3 md:gap-0" style={{ perspective: 1600 }}>
        <motion.div style={{ x: lx, rotateY: ry, scale: sc }} className={cls(0)}><div className="relative aspect-video overflow-hidden rounded-lg bg-surface2"><Image src={s.src} alt={s.alt} fill sizes="33vw" className="object-cover" /></div><p className="px-2 pb-1 pt-3 text-sm font-medium text-fg">Main Output</p></motion.div>
        <motion.div style={{ scale: sc, zIndex: 2 }} className={`${cls(1)} md:-mx-3`}><div className="relative aspect-video overflow-hidden rounded-lg bg-surface2"><Image src={shots.alternate.src} alt={shots.alternate.alt} fill sizes="33vw" className="object-cover object-top" /></div><p className="px-2 pb-1 pt-3 text-sm font-medium text-fg">Alternate Output settings</p></motion.div>
        <motion.div style={{ x: rx, rotateY: useTransform(ry, (v) => -v), scale: sc }} className={cls(2)}><div className="flex aspect-video flex-col items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-glow/10 to-brand/15 text-brand dark:text-glow"><Timer size={34} /><span className="text-xs text-muted">Illustrative layout, not a screenshot</span></div><p className="px-2 pb-1 pt-3 text-sm font-medium text-fg">Foldback / Stage Display</p></motion.div>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">{outputs.map((o, i) => (
        <div key={o.id} className={`border-t-2 pt-4 transition-colors duration-500 ${active === i ? "border-brand dark:border-glow" : "border-line"}`}><h3 className="flex items-center gap-2 font-semibold text-fg"><MonitorPlay size={18} className="text-glow" />{o.title}</h3><p className="mt-2 text-muted">{o.text}</p></div>))}</div>
    </div>);
}
