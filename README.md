# KelzStudio website
`npm install && npm run build`. Configure downloads/support via env vars (see config/downloads.ts, config/site.ts):
NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_WINDOWS_URL, NEXT_PUBLIC_MACOS_URL, NEXT_PUBLIC_WINDOWS_INSTALLER, NEXT_PUBLIC_MACOS_INSTALLER, NEXT_PUBLIC_WINDOWS_SIZE, NEXT_PUBLIC_MACOS_SIZE, NEXT_PUBLIC_RELEASE_DATE, NEXT_PUBLIC_RELEASE_NOTES_URL, NEXT_PUBLIC_SUPPORT_EMAIL, NEXT_PUBLIC_ISSUES_URL.
Content lives in content/*.ts. Replace images in public/shots to update screenshots.

## Releases
Source: GitHub Releases of `kelechi-okpani/kelzStudio` (override with `GITHUB_OWNER` and `GITHUB_REPO`, or set `GITHUB_REPOSITORY` to the repository name). Server-side only, cached 5 min (config/downloads.ts `revalidateSeconds`).
Optional server env `GITHUB_TOKEN` raises the rate limit (never sent to the browser). Installer detection: .exe/.msi = Windows, .dmg/.pkg = macOS; override via `assetRules`.

## Env-configured downloads (override GitHub assets per platform)
Server env on Vercel: DOWNLOAD_WINDOWS_URL, DOWNLOAD_MAC_ARM64_URL, DOWNLOAD_MAC_INTEL_URL (must be public https links),
optional DOWNLOAD_<WINDOWS|MAC_ARM64|MAC_INTEL>_FILENAME / _SIZE (e.g. "181 MB") / _CHECKSUM, and DOWNLOAD_VERSION, DOWNLOAD_DATE (YYYY-MM-DD).

## Contact buttons
Floating WhatsApp + email buttons appear only when set: NEXT_PUBLIC_WHATSAPP_NUMBER (digits, country code, e.g. 2348012345678), NEXT_PUBLIC_SUPPORT_EMAIL, optional NEXT_PUBLIC_WHATSAPP_MESSAGE.
