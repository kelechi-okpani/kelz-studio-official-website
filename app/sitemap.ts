
import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { tutorials } from "@/content/tutorials";
import { getReleases } from "@/lib/releases/github";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!site.url) return [];
  const d = await getReleases();
  
  const paths = [
    { route: "", changeFrequency: "daily" as const, priority: 1.0 },
    { route: "/features", changeFrequency: "weekly" as const, priority: 0.8 },
    { route: "/how-it-works", changeFrequency: "weekly" as const, priority: 0.8 },
    { route: "/download", changeFrequency: "weekly" as const, priority: 0.9 },
    { route: "/releases", changeFrequency: "daily" as const, priority: 0.9 },
    { route: "/support", changeFrequency: "monthly" as const, priority: 0.5 },
    { route: "/privacy", changeFrequency: "monthly" as const, priority: 0.5 },
  ];

  const staticEntries = paths.map((p) => ({
    url: `${site.url}${p.route}`,
    lastModified: new Date(),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const tutorialEntries = tutorials.map((t) => ({
    url: `${site.url}/how-it-works/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const releaseEntries = d.ok
    ? d.releases.map((r) => ({
        url: `${site.url}/releases/${encodeURIComponent(r.tag)}`,
        // lastModified: r.published_at ? new Date(r.published_at) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }))
    : [];

  return [...staticEntries, ...tutorialEntries, ...releaseEntries];
}

// import type { MetadataRoute } from "next";
// import { site } from "@/config/site";
// import { tutorials } from "@/content/tutorials";
// import { getReleases } from "@/lib/releases/github";
// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   if (!site.url) return [];
//   const d = await getReleases();
//   const paths = ["", "/features", "/how-it-works", "/download", "/releases", "/support", ...tutorials.map((t) => `/how-it-works/${t.slug}`), ...(d.ok ? d.releases.map((r) => `/releases/${encodeURIComponent(r.tag)}`) : [])];
//   return paths.map((p) => ({ url: `${site.url}${p}` }));
// }
