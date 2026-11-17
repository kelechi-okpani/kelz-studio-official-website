"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => { setDark(document.documentElement.dataset.theme === "dark"); }, []);
  const toggle = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next; setDark(!dark);
    try { localStorage.setItem("kelz-theme", next); } catch {}
  };
  return (
    <button type="button" onClick={toggle} aria-label="Toggle light and dark mode" aria-pressed={dark} title={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-fg transition hover:bg-surface2 active:scale-95">
      <Moon size={18} className="absolute transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <Sun size={18} className="absolute rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
    </button>
  );
}
