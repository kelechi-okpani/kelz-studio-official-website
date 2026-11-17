export const site = {
  name: "KelzStudio",
  company: "KelzNova Ltd.",
  tagline: "One Platform. Every Presentation.",
  description: "A powerful, easy-to-use presentation software for churches, businesses, events, and organizations.",
  // TODO: set once the official domain is known (enables canonical URLs, sitemap, OG).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  // TODO: supply official details. Nothing here is invented.
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "",
  issuesUrl: process.env.NEXT_PUBLIC_ISSUES_URL ?? "",
};
export const nav = [
  { label: "Overview", href: "/#overview" },
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Downloads", href: "/download" },
  { label: "Releases", href: "/releases" },
  { label: "Support", href: "/support" },
];
// Real captures supplied by the developer. Swap files in /public/shots to update everywhere.
export interface ShotInfo { src: string; w: number; h: number; alt: string; bare?: boolean }
export const shots: Record<"hero" | "media" | "songs" | "scriptures" | "presentations" | "themes" | "options" | "alternate" | "output", ShotInfo> = {
  hero: { src: "/shots/hero.png", w: 1647, h: 1030, alt: "KelzStudio with a schedule, Preview and Live panels, and the Media library open" },
  media: { src: "/shots/media.png", w: 1417, h: 1027, alt: "KelzStudio All Media list showing images and videos with Title, File name and Type" },
  songs: { src: "/shots/songs.png", w: 1532, h: 1026, alt: "KelzStudio Songs library with a song shown as chorus and verse slides in Preview and Live" },
  scriptures: { src: "/shots/scriptures.png", w: 1533, h: 1012, alt: "KelzStudio Scriptures library with reference search, results and a book and chapter picker" },
  presentations: { src: "/shots/presentations.png", w: 1521, h: 1027, alt: "KelzStudio Presentations library with Word and PowerPoint presentations and slide navigation" },
  themes: { src: "/shots/themes.png", w: 1531, h: 1027, alt: "KelzStudio Theme Editor with slide canvas, toolbar and Inspector" },
  options: { src: "/shots/options.png", w: 1533, h: 1032, alt: "KelzStudio Options dialog on Main Output, Song settings" },
  alternate: { src: "/shots/alternate.png", w: 1537, h: 1032, alt: "KelzStudio Options dialog on Alternate Output with monitor, position and margin settings" },
  output: { src: "/shots/output.png", w: 1918, h: 1078, alt: "A KelzStudio scripture slide as shown on the main output", bare: true },
};
