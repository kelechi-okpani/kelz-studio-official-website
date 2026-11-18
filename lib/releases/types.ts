export type Platform = "windows" | "macos";
export type Arch = "x64" | "arm64" | "universal" | "unknown";
export interface PlatformAsset { id: number; name: string; platform: Platform; arch: Arch; format: string; size: number; url: string; digest?: string; sizeLabel?: string; downloads?: number; source?: "github" | "env" }
export type NoteCategory = "features" | "improvements" | "fixes" | "performance" | "compatibility" | "security";
export interface NoteSection { category?: NoteCategory; title: string; markdown: string }
export interface Release { tag: string; version: string; name: string; publishedAt: string; prerelease: boolean; url: string; body: string; summary: string; sections: NoteSection[]; assets: PlatformAsset[] }
export type ReleasesResult = { ok: true; releases: Release[]; fetchedAt: string; stale: boolean } | { ok: false; reason: "rate_limit" | "not_found" | "network" | "http" };
