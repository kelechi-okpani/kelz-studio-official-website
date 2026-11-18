import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { site } from "@/config/site";
import { getReleases, latestStable } from "@/lib/releases/github";
// Light unless the visitor explicitly saved "dark". System preference is deliberately ignored.
const THEME_SCRIPT = `try{var t=localStorage.getItem("kelz-theme");document.documentElement.dataset.theme=t==="dark"?"dark":"light"}catch(e){document.documentElement.dataset.theme="light"}`;
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
export const metadata: Metadata = {
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { title: site.name, description: site.description, siteName: site.name, type: "website", images: ["/logo.png"] },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  icons: { icon: "/logo.png" },
};
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const d = await getReleases(); const latest = d.ok ? latestStable(d.releases) : undefined;
  return (<html lang="en" data-theme="light" suppressHydrationWarning className={inter.variable}><head><script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} /></head><body className="font-sans"><Nav latest={latest?.version} /><main>{children}</main><Footer latestTag={latest?.tag} /><FloatingContact /></body></html>);
}
