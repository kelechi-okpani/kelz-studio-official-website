import { assetsFor } from "@/lib/releases/github";
import type { Release } from "@/lib/releases/types";
import { PlatformDownload } from "./PlatformDownload";
/** Windows + macOS Apple Silicon + macOS Intel. Falls back to one macOS card if macOS files aren't labelled by architecture. */
export function DownloadGrid({ release }: { release: Release }) {
  const mixed = assetsFor(release, "macos").some((a) => a.arch === "unknown");
  return (
    <div className="grid gap-6 text-left md:grid-cols-2 lg:grid-cols-3">
      <PlatformDownload release={release} platform="windows" />
      {mixed ? <PlatformDownload release={release} platform="macos" /> : <><PlatformDownload release={release} platform="macos" arch="arm64" /><PlatformDownload release={release} platform="macos" arch="x64" /></>}
    </div>);
}
