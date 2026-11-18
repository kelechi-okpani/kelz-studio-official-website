"use client";

import { useEffect, useState } from "react";
import type { DownloadClickPlatform } from "@/lib/download-clicks";

function readCount(payload: unknown): number {
  if (
    !payload ||
    typeof payload !== "object" ||
    !("count" in payload) ||
    typeof payload.count !== "number" ||
    !Number.isSafeInteger(payload.count) ||
    payload.count < 0
  ) {
    throw new Error("The click-count service returned an invalid response.");
  }
  return payload.count;
}

export function TrackedDownloadLink({
  href,
  platform,
  releaseVersion,
  assetName,
  children,
}: {
  href: string;
  platform: DownloadClickPlatform;
  releaseVersion: string;
  assetName: string;
  children: React.ReactNode;
}) {
  const [count, setCount] = useState<number>();
  const [status, setStatus] = useState("Loading click count…");

  useEffect(() => {
    let active = true;
    fetch(`/api/download-clicks?platform=${encodeURIComponent(platform)}`, { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) return null;
        return readCount(await response.json());
      })
      .then((value) => {
        if (active && value !== null) {
          setCount(value);
          setStatus("");
        } else if (active) {
          setStatus("Download count temporarily unavailable.");
        }
      })
      .catch((error: unknown) => {
        console.warn("[download-clicks] Could not load click count.", error);
        if (active) setStatus("Download count temporarily unavailable.");
      });

    return () => {
      active = false;
    };
  }, [platform]);

  async function recordClick() {
    try {
      const response = await fetch("/api/download-clicks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, releaseVersion, assetName }),
        keepalive: true,
      });
      if (!response.ok) throw new Error(`Click could not be recorded (HTTP ${response.status}).`);
      setCount(readCount(await response.json()));
      setStatus("");
    } catch (error) {
      console.error("[download-clicks] Click tracking failed; continuing with download.", error);
      setStatus("Click could not be counted; starting download anyway.");
    }
  }

  async function trackClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (event.defaultPrevented || event.button !== 0) return;

    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.currentTarget.target === "_blank"
    ) {
      void recordClick();
      return;
    }

    event.preventDefault();
    setStatus("Recording click…");
    await recordClick();

    window.location.assign(href);
  }

  function trackAuxClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (event.button === 1) void recordClick();
  }

  return (
    <>
      <a href={href} onClick={trackClick} onAuxClick={trackAuxClick} className="btn-primary mt-4 w-full">
        {children}
      </a>
      <div className="mt-auto pt-8 text-right" aria-live="polite">
        {count === undefined ? (
          <p className="text-xs text-muted">{status}</p>
        ) : (
          <p className="text-sm font-bold text-fg">
            {/* {count.toLocaleString("en-US")}  */}
            
           <span className="text-muted">
          {`${count === 1 ? "download" : "downloads"} (${count.toLocaleString("en-US")})`}
        </span>
            {/* {count === 1 ? "download" : "downloads"} */}
          </p>
        )}
        {count !== undefined && status && <p className="mt-1 text-xs text-muted">{status}</p>}
      </div>
    </>
  );
}
