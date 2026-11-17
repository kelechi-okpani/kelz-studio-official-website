import type { NoteCategory, NoteSection } from "./types";
export const categoryLabels: Record<NoteCategory, string> = { features: "New Features", improvements: "Improvements", fixes: "Bug Fixes", performance: "Performance", compatibility: "Compatibility", security: "Security" };
const rules: [NoteCategory, RegExp][] = [["features", /feature|added|what.?s new|new\b/i], ["fixes", /fix|bug/i], ["performance", /perf|speed/i], ["compatibility", /compat|support/i], ["security", /secur/i], ["improvements", /improv|enhanc|chang|update/i]];
export const categorize = (t: string): NoteCategory | undefined => rules.find(([, r]) => r.test(t))?.[0];
const headingOf = (line: string): string | null => {
  const h = line.match(/^#{1,4}\s+(.+?)\s*#*$/); if (h) return h[1].replace(/[*_`]/g, "").replace(/:$/, "").trim();
  const b = line.match(/^\*\*(.+?)\*\*:?\s*$/); return b ? b[1].replace(/:$/, "").trim() : null;
};
/** Splits release notes on headings. Only sections whose heading names a known category get a category; text is never altered. */
export function parseSections(body: string): NoteSection[] {
  const out: NoteSection[] = []; let cur: NoteSection | null = null;
  for (const line of body.replace(/\r/g, "").split("\n")) {
    const h = headingOf(line.trim());
    if (h) { cur = { title: h, category: categorize(h), markdown: "" }; out.push(cur); } else if (cur) cur.markdown += line + "\n";
  }
  return out.filter((s) => s.markdown.trim());
}
export function summarize(body: string): string {
  for (const block of body.replace(/\r/g, "").split(/\n\s*\n/)) {
    const t = block.trim(); if (!t || /^(#|[-*+]\s|\d+\.\s|```|\*\*[^*]+\*\*:?$)/.test(t)) continue;
    const plain = t.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*_`>]/g, "").replace(/\s+/g, " ");
    return plain.length > 220 ? plain.slice(0, 217).trimEnd() + "…" : plain;
  }
  return "";
}
