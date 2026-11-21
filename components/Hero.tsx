"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { Music, BookOpen, Image as Img, ListOrdered, MonitorPlay, type LucideIcon } from "lucide-react";
import { HeroVideo } from "./HeroVideo";
import { Shot } from "./Shot";
const chips: { t: string; I: LucideIcon; c: string; d: number }[] = [
  { t: "Songs", I: Music, c: "-left-4 top-[14%]", d: 40 }, { t: "Scriptures", I: BookOpen, c: "-right-4 top-[22%]", d: 60 },
  { t: "Media", I: Img, c: "-left-2 bottom-[20%]", d: 70 }, { t: "Schedule", I: ListOrdered, c: "-right-2 bottom-[12%]", d: 45 }, { t: "Live Output", I: MonitorPlay, c: "left-[38%] -top-5", d: 80 } ];
function Chip({ t, I, c, d, px, py, i, run }: (typeof chips)[number] & { px: MotionValue<number>; py: MotionValue<number>; i: number; run: boolean }) {
  const x = useTransform(px, [-0.5, 0.5], [-d / 3, d / 3]); const y = useTransform(py, [-0.5, 0.5], [-d / 4, d / 4]);
  return (
    <motion.div aria-hidden style={{ x, y }} className={`absolute hidden lg:block ${c}`}>
      <motion.div animate={run ? { y: [0, -9, 0] } : undefined} transition={{ duration: 5 + i * 0.7, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-2 rounded-xl border border-line bg-surface/95 px-4 py-2.5 text-sm font-medium text-fg shadow-[0_20px_40px_-15px_rgb(var(--shadow)/.4)] backdrop-blur"><I size={16} className="text-glow" />{t}</motion.div>
    </motion.div>);
}
export function Hero() {
  const reduce = useReducedMotion(); const wrap = useRef<HTMLDivElement>(null); const inView = useInView(wrap);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start 85%", "start 25%"] });
  const sRot = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 20, 0]); const sScale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.9, 1]);
  const mx = useMotionValue(0), my = useMotionValue(0); const px = useSpring(mx, { stiffness: 70, damping: 18 }), py = useSpring(my, { stiffness: 70, damping: 18 });
  const rY = useTransform(px, [-0.5, 0.5], [-7, 7]); const rX = useTransform(py, [-0.5, 0.5], [5, -5]);
  const [fine, setFine] = useState(false); useEffect(() => setFine(window.matchMedia("(pointer:fine)").matches), []);
  const move = (e: React.PointerEvent) => { if (!fine || reduce || !wrap.current) return; const b = wrap.current.getBoundingClientRect(); mx.set((e.clientX - b.left) / b.width - 0.5); my.set((e.clientY - b.top) / b.height - 0.5); };
  const leave = () => { mx.set(0); my.set(0); };
  const up = (d: number) => (reduce ? {} : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] as const } });
  return (
    <section className="relative overflow-hidden pt-32 md:pt-40">
      {/* background video, dark overlay for readability, and a fade into the page below */}
      <HeroVideo />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#050b18]/85 via-[#050b18]/60 to-[#050b18]/90" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      {/* force-dark: light text and dark surfaces over the video, in both themes */}
      <div className="force-dark relative">
      <div className="relative mx-auto max-w-5xl px-5 text-center">
        <motion.p {...up(0)} className="text-sm font-semibold tracking-[.2em] text-glow">ONE PLATFORM. EVERY PRESENTATION.</motion.p>
        <motion.h1 {...up(0.1)} className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-4xl md:text-5xl lg:text-[3.75rem]">Every Presentation. <span className="text-glow">One Powerful Platform.</span></motion.h1>
        <motion.p {...up(0.25)} className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted md:text-lg">Create, organize, and deliver professional presentations with KelzStudio — powerful desktop presentation software designed for churches, businesses, events, and organizations.</motion.p>
        <motion.div {...up(0.4)} className="mt-10 flex flex-wrap justify-center gap-3"><Link href="/download" className="btn-primary">Download KelzStudio</Link><Link href="/features" className="btn-ghost">Explore Features</Link></motion.div>
        <motion.p {...up(0.5)} className="mt-5 text-sm text-muted">Available for Windows and macOS</motion.p>
      </div>
      <div ref={wrap} onPointerMove={move} onPointerLeave={leave} className="relative mx-auto mt-16 max-w-[88rem] px-5 pb-28 md:px-10 lg:px-16" style={{ perspective: 1800 }}>
        <motion.div style={{ rotateX: sRot, scale: sScale, transformOrigin: "50% 100%" }}>
          <motion.div style={reduce ? undefined : { rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }} initial={reduce ? false : { opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            <Shot name="hero" priority sizes="100vw" className="mx-auto max-w-6xl" />
          </motion.div>
        </motion.div>
        <div className="pointer-events-none absolute inset-x-5 inset-y-0 mx-auto hidden max-w-7xl lg:block">{chips.map((c, i) => <Chip key={c.t} {...c} px={px} py={py} i={i} run={!reduce && inView} />)}</div>
      </div>
      </div>
    </section>);
}

// "use client";
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";
// import { motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
// import { Music, BookOpen, Image as Img, ListOrdered, MonitorPlay, type LucideIcon } from "lucide-react";
// import { Shot } from "./Shot";
// const chips: { t: string; I: LucideIcon; c: string; d: number }[] = [
//   { t: "Songs", I: Music, c: "-left-4 top-[14%]", d: 40 }, { t: "Scriptures", I: BookOpen, c: "-right-4 top-[22%]", d: 60 },
//   { t: "Media", I: Img, c: "-left-2 bottom-[20%]", d: 70 }, { t: "Schedule", I: ListOrdered, c: "-right-2 bottom-[12%]", d: 45 }, { t: "Live Output", I: MonitorPlay, c: "left-[38%] -top-5", d: 80 } ];
// function Chip({ t, I, c, d, px, py, i, run }: (typeof chips)[number] & { px: MotionValue<number>; py: MotionValue<number>; i: number; run: boolean }) {
//   const x = useTransform(px, [-0.5, 0.5], [-d / 3, d / 3]); const y = useTransform(py, [-0.5, 0.5], [-d / 4, d / 4]);
//   return (
//     <motion.div aria-hidden style={{ x, y }} className={`absolute hidden lg:block ${c}`}>
//       <motion.div animate={run ? { y: [0, -9, 0] } : undefined} transition={{ duration: 5 + i * 0.7, repeat: Infinity, ease: "easeInOut" }}
//         className="flex items-center gap-2 rounded-xl border border-line bg-surface/95 px-4 py-2.5 text-sm font-medium text-fg shadow-[0_20px_40px_-15px_rgb(var(--shadow)/.4)] backdrop-blur"><I size={16} className="text-glow" />{t}</motion.div>
//     </motion.div>);
// }
// export function Hero() {
//   const reduce = useReducedMotion(); const wrap = useRef<HTMLDivElement>(null); const inView = useInView(wrap);
//   const { scrollYProgress } = useScroll({ target: wrap, offset: ["start 85%", "start 25%"] });
//   const sRot = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 20, 0]); const sScale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.9, 1]);
//   const mx = useMotionValue(0), my = useMotionValue(0); const px = useSpring(mx, { stiffness: 70, damping: 18 }), py = useSpring(my, { stiffness: 70, damping: 18 });
//   const rY = useTransform(px, [-0.5, 0.5], [-7, 7]); const rX = useTransform(py, [-0.5, 0.5], [5, -5]);
//   const [fine, setFine] = useState(false); useEffect(() => setFine(window.matchMedia("(pointer:fine)").matches), []);
//   const move = (e: React.PointerEvent) => { if (!fine || reduce || !wrap.current) return; const b = wrap.current.getBoundingClientRect(); mx.set((e.clientX - b.left) / b.width - 0.5); my.set((e.clientY - b.top) / b.height - 0.5); };
//   const leave = () => { mx.set(0); my.set(0); };
//   const up = (d: number) => (reduce ? {} : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] as const } });
//   return (
//     <section className="relative overflow-hidden pt-32 md:pt-40">
//       <div className="grid-bg absolute inset-0" aria-hidden />
//       <div className="relative mx-auto max-w-5xl px-5 text-center">
//         <motion.p {...up(0)} className="text-sm font-semibold tracking-[.2em] text-glow">ONE PLATFORM. EVERY PRESENTATION.</motion.p>
//         <motion.h1 {...up(0.1)} className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-4xl md:text-5xl lg:text-[3.75rem]">Every Presentation. <span className="text-brand dark:text-glow">One Powerful Platform.</span></motion.h1>
//         <motion.p {...up(0.25)} className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted md:text-lg">Create, organize, and deliver professional presentations with KelzStudio — powerful desktop presentation software designed for churches, businesses, events, and organizations.</motion.p>
//         <motion.div {...up(0.4)} className="mt-10 flex flex-wrap justify-center gap-3"><Link href="/download" className="btn-primary">Download KelzStudio</Link><Link href="/features" className="btn-ghost">Explore Features</Link></motion.div>
//         <motion.p {...up(0.5)} className="mt-5 text-sm text-muted">Available for Windows and macOS</motion.p>
//       </div>
//       <div ref={wrap} onPointerMove={move} onPointerLeave={leave} className="relative mx-auto mt-16 max-w-[88rem] px-5 pb-28 md:px-10 lg:px-16" style={{ perspective: 1800 }}>
//         <motion.div style={{ rotateX: sRot, scale: sScale, transformOrigin: "50% 100%" }}>
//           <motion.div style={reduce ? undefined : { rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }} initial={reduce ? false : { opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}>
//             <Shot name="hero" priority sizes="100vw" className="mx-auto max-w-6xl" />
//           </motion.div>
//         </motion.div>
//         <div className="pointer-events-none absolute inset-x-5 inset-y-0 mx-auto hidden max-w-7xl lg:block">{chips.map((c, i) => <Chip key={c.t} {...c} px={px} py={py} i={i} run={!reduce && inView} />)}</div>
//       </div>
//     </section>);
// }
