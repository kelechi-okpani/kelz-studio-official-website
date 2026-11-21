"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Send } from "lucide-react";

const TELEGRAM_URL = "https://t.me/kelzstudio1";

/** Animated banner inviting visitors to the KelzStudio Telegram channel. Navy in both light and dark themes. */
export function TelegramBanner() {
  const reduce = useReducedMotion();
  return (
    <motion.aside
      aria-label="Join the KelzStudio Telegram channel"
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mt-8 group relative isolate overflow-hidden rounded-2xl bg-gradient-to-r from-[#142B52] via-[#1B3D7A] to-[#2563EB] p-6 text-white shadow-[0_30px_60px_-30px_rgba(20,43,82,.7)] md:p-8"
    >
      {/* light sweep */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-1/3 top-0 -z-10 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={reduce ? undefined : { x: ["0%", "450%"] }}
        transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
      />
      {/* soft glow */}
      <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 -z-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <motion.span
            animate={reduce ? undefined : { y: [0, -4, 0], rotate: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25"
          >
            <Send size={22} />
          </motion.span>
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[.18em] text-white/80">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              TELEGRAM CHANNEL
            </p>
            <h2 className="mt-1.5 text-xl font-semibold md:text-2xl">Join our Telegram channel</h2>
            <p className="mt-1 max-w-xl text-sm text-white/80 md:text-base">
              Get updates on new features, releases and important news about KelzStudio as they happen.
            </p>
          </div>
        </div>

        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 font-medium text-[#142B52] shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-white/90 active:scale-[.98]"
        >
          Join on Telegram
          <ArrowUpRight size={18} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </motion.aside>
  );
}