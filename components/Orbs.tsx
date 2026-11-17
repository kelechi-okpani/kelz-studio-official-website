"use client";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
const orbs = [["8%", "20%", 340, 14], ["72%", "10%", 260, 18], ["55%", "70%", 420, 22]] as const;
export function Orbs() {
  const ref = useRef<HTMLDivElement>(null); const inView = useInView(ref); const reduce = useReducedMotion();
  return <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">{orbs.map(([l, t, s, d], i) => (
    <motion.div key={i} animate={inView && !reduce ? { x: [0, 40, 0], y: [0, -30, 0] } : undefined} transition={{ duration: d, repeat: Infinity, ease: "easeInOut" }}
      className="absolute rounded-full bg-glow/20 blur-3xl" style={{ left: l, top: t, width: s, height: s }} />))}</div>;
}
