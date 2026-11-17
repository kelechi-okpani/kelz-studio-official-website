# KelzStudio website
`npm install && npm run build`. Configure downloads/support via env vars (see config/downloads.ts, config/site.ts):
NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_WINDOWS_URL, NEXT_PUBLIC_MACOS_URL, NEXT_PUBLIC_WINDOWS_INSTALLER, NEXT_PUBLIC_MACOS_INSTALLER, NEXT_PUBLIC_WINDOWS_SIZE, NEXT_PUBLIC_MACOS_SIZE, NEXT_PUBLIC_RELEASE_DATE, NEXT_PUBLIC_RELEASE_NOTES_URL, NEXT_PUBLIC_SUPPORT_EMAIL, NEXT_PUBLIC_ISSUES_URL.
Content lives in content/*.ts. Replace images in public/shots to update screenshots.

## Releases
Source: GitHub Releases of `KelzNova/kelz-studio` (override with GITHUB_OWNER / GITHUB_REPO). Server-side only, cached 10 min (config/downloads.ts `revalidateSeconds`).
Optional server env `GITHUB_TOKEN` raises the rate limit (never sent to the browser). Installer detection: .exe/.msi = Windows, .dmg/.pkg = macOS; override via `assetRules`.
