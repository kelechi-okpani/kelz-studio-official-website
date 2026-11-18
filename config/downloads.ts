// Release source of truth is GitHub Releases. Nothing here is a download URL or release fact.
export const github = {
  owner: process.env.GITHUB_OWNER ?? "kelechi-okpani",
  repo: process.env.GITHUB_REPO ?? process.env.GITHUB_REPOSITORY ?? "kelzStudio",
};
export const releasesUrl = `https://github.com/${github.owner}/${github.repo}/releases`;
// Optional explicit asset mapping, checked before filename heuristics. Example: { match: "^KelzStudio-Setup", platform: "windows" }
export const assetRules: { match: string; platform: "windows" | "macos"; arch?: "x64" | "arm64" | "universal" }[] = [];
// Fill ONLY once verified from the app's build config. Shown on the download page when set.
export const requirements: Partial<Record<"windows" | "macos", string>> = {};
export const revalidateSeconds = 300;
