import { github, revalidateSeconds } from "@/config/downloads";
import type { Platform, Release, ReleasesResult } from "./types";
import { toRelease } from "./map";
let lastGood: { releases: Release[]; fetchedAt: string } | null = null; // in-memory; only served with a visible "stale" flag
/** The only place that talks to GitHub. Server-side, cached by Next for `revalidateSeconds`. Never throws. */
export async function getReleases(): Promise<ReleasesResult> {
  const fail = (reason: "rate_limit" | "not_found" | "network" | "http"): ReleasesResult => {
    console.warn(`[releases] GitHub fetch failed: ${reason}`);
    return lastGood ? { ok: true, ...lastGood, stale: true } : { ok: false, reason };
  };
  try {
    const headers: Record<string, string> = { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`; // server env only, never sent to the browser
    const res = await fetch(`https://api.github.com/repos/${github.owner}/${github.repo}/releases?per_page=100`, { headers, next: { revalidate: revalidateSeconds } });
    if (res.status === 403 || res.status === 429) return fail("rate_limit");
    if (res.status === 404) return fail("not_found");
    if (!res.ok) return fail("http");
    const raw: unknown = await res.json(); if (!Array.isArray(raw)) return fail("http");
    const releases = raw.map(toRelease).filter((r): r is Release => !!r).sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
    lastGood = { releases, fetchedAt: new Date().toISOString() };
    return { ok: true, releases, fetchedAt: lastGood.fetchedAt, stale: false };
  } catch { return fail("network"); }
}
export const latestStable = (rs: Release[]) => rs.find((r) => !r.prerelease);
export const assetsFor = (r: Release, p: Platform) => r.assets.filter((a) => a.platform === p);
export const fmtDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
export const fmtBytes = (n: number) => (n >= 1048576 ? `${(n / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);
export const archLabel = { x64: "Intel / x64", arm64: "Apple Silicon / ARM64", universal: "Universal", unknown: "" } as const;
