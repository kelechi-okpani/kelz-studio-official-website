import { NextResponse } from "next/server";
import {
  getDownloadClickCount,
  isDownloadClickPlatform,
  recordDownloadClick,
} from "@/lib/download-clicks";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const platform = new URL(request.url).searchParams.get("platform");
  if (!isDownloadClickPlatform(platform)) {
    return NextResponse.json({ error: "Invalid download platform." }, { status: 400 });
  }

  try {
    const count = await getDownloadClickCount(platform);
    return NextResponse.json({ count }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    logDatabaseError("Could not read download count.", error);
    return NextResponse.json({ error: "Download click counts are unavailable." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const body = payload && typeof payload === "object" ? payload : undefined;
  const platform = body && "platform" in body ? body.platform : undefined;
  const releaseVersion = body && "releaseVersion" in body ? body.releaseVersion : undefined;
  const assetName = body && "assetName" in body ? body.assetName : undefined;
  if (
    !isDownloadClickPlatform(platform) ||
    typeof releaseVersion !== "string" ||
    releaseVersion.length > 100 ||
    typeof assetName !== "string" ||
    assetName.length === 0 ||
    assetName.length > 255
  ) {
    return NextResponse.json({ error: "Invalid download click details." }, { status: 400 });
  }

  try {
    const count = await recordDownloadClick({ platform, releaseVersion, assetName });
    return NextResponse.json({ count }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    logDatabaseError("Could not record download click.", error);
    return NextResponse.json({ error: "Download click could not be recorded." }, { status: 503 });
  }
}

function logDatabaseError(message: string, error: unknown) {
  const detail =
    error instanceof Error
      ? error.message.replace(/postgres(?:ql)?:\/\/[^\s"'<>]+/gi, "[database URL redacted]")
      : "Unknown database error.";
  console.error(`[download-clicks] ${message} ${detail}`);
}
