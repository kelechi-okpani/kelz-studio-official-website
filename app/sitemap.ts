import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { tutorials } from "@/content/tutorials";
import { getReleases } from "@/lib/releases/github";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!site.url) return [];
  const d = await getReleases();
  const paths = ["", 
    "/features",
     "/how-it-works", "/download", "/releases", "/support", 
     "/privacy-policy",
     "/terms",
      ...tutorials.map((t) => `/how-it-works/${t.slug}`), ...(d.ok ? d.releases.map((r) => `/releases/${encodeURIComponent(r.tag)}`) : [])];
  return paths.map((p) => ({ url: `${site.url}${p}` }));
}
