"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Shot } from "./Shot";
import type { shots } from "@/config/site";
export function ParallaxShot({ name, className = "" }: { name: keyof typeof shots; className?: string }) {
  const ref = useRef<HTMLDivElement>(null); const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 50, reduce ? 0 : -50]);
  return <div ref={ref} className={className}><motion.div style={{ y }}><Shot name={name} sizes="100vw" /></motion.div></div>;
}
