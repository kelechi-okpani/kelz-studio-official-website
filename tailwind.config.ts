import type { Config } from "tailwindcss";
const t = (v: string) => `rgb(var(--${v}) / <alpha-value>)`;
const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { bg: t("bg"), surface: t("surface"), surface2: t("surface2"), fg: t("fg"), muted: t("muted"), line: t("line"), brand: t("brand"), "on-brand": t("on-brand"), glow: t("glow") },
    fontFamily: { sans: ["var(--font-inter)", "system-ui", "sans-serif"] },
  } },
  plugins: [],
};
export default config;
