"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/config/site";
import { ThemeToggle } from "./ThemeToggle";
export function Nav({ latest }: { latest?: string }) {
  const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false); const path = usePathname();
  useEffect(() => { const f = () => setScrolled(window.scrollY > 12); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false); window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, []);
  const active = (h: string) => !h.includes("#") && (h === path || (h !== "/" && path.startsWith(h)));
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || open ? "border-b border-line bg-bg/80 backdrop-blur-xl" : "border-b border-transparent"}`}>
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-6 px-5">
        <Link href="/" className="flex items-center gap-2.5 font-semibold text-fg"><Image src="/logo.png" alt="" width={32} height={32} priority />{site.name}</Link>
        <nav aria-label="Primary" className="hidden items-center justify-center gap-8 text-sm md:flex">
          {nav.map((n) => <Link key={n.label} href={n.href} aria-current={active(n.href) ? "page" : undefined} className={`group relative py-2 transition-colors hover:text-fg ${active(n.href) ? "text-fg" : "text-muted"}`}>
            {n.label}{n.label === "Releases" && latest && <span className="ml-1.5 hidden rounded-full bg-surface2 px-1.5 py-0.5 text-[10px] font-semibold text-glow lg:inline">v{latest}</span>}{active(n.href) ? <motion.span layoutId="nav-active" className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded bg-brand" /> : <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded bg-line transition-transform group-hover:scale-x-100" />}</Link>)}
        </nav>
        <div className="col-start-3 flex items-center gap-3 md:col-start-auto">
          <ThemeToggle />
          <Link href="/download" className="btn-primary hidden !px-4 !py-2 text-sm md:inline-flex">Download KelzStudio</Link>
          <button className="flex h-10 w-10 items-center justify-center md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      <AnimatePresence>{open && <motion.div id="mobile-menu" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-line md:hidden">
        <nav aria-label="Mobile" className="flex flex-col px-5 pb-5">{nav.map((n) => <Link key={n.label} href={n.href} onClick={() => setOpen(false)} className="border-b border-line py-3.5 text-base text-fg">{n.label}</Link>)}
          <Link href="/download" onClick={() => setOpen(false)} className="btn-primary mt-4">Download KelzStudio</Link></nav></motion.div>}</AnimatePresence>
    </header>
  );
}
