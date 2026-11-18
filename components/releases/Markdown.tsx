import type { ReactNode } from "react";
/** Small safe Markdown renderer: no raw HTML, only http(s) links. Unsupported syntax renders as plain text. */
const INLINE = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\(https?:\/\/[^)\s]+\)|https?:\/\/[^\s)<]+)/g;
function inline(s: string): ReactNode[] {
  return s.split(INLINE).map((p, i) => {
    if (!p) return null;
    if (p.startsWith("`") && p.endsWith("`") && p.length > 1) return <code key={i} className="rounded bg-surface2 px-1.5 py-0.5 text-[.9em]">{p.slice(1, -1)}</code>;
    if (p.startsWith("**") && p.endsWith("**") && p.length > 4) return <strong key={i} className="font-semibold text-fg">{p.slice(2, -2)}</strong>;
    const l = p.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/); if (l) return <a key={i} href={l[2]} target="_blank" rel="noopener noreferrer nofollow" className="text-glow underline-offset-2 hover:underline">{l[1]}</a>;
    if (/^https?:\/\//.test(p)) return <a key={i} href={p} target="_blank" rel="noopener noreferrer nofollow" className="break-all text-glow hover:underline">{p}</a>;
    return p;
  });
}
export function Markdown({ source }: { source: string }) {
  const lines = source.replace(/\r/g, "").split("\n"); const out: ReactNode[] = []; let i = 0, k = 0;
  while (i < lines.length) {
    const L = lines[i], t = L.trim();
    if (!t) { i++; continue; }
    if (t.startsWith("```")) { const buf: string[] = []; i++; while (i < lines.length && !lines[i].trim().startsWith("```")) buf.push(lines[i++]); i++; out.push(<pre key={k++} className="overflow-x-auto rounded-lg border border-line bg-surface2 p-4 text-sm"><code>{buf.join("\n")}</code></pre>); continue; }
    const h = t.match(/^(#{1,6})\s+(.+)$/); if (h) { out.push(<h4 key={k++} className="mt-6 text-base font-semibold text-fg">{inline(h[2])}</h4>); i++; continue; }
    if (/^[-*+]\s+/.test(t) || /^\d+\.\s+/.test(t)) { const ord = /^\d+\./.test(t); const items: string[] = [];
      while (i < lines.length && /^\s*([-*+]|\d+\.)\s+/.test(lines[i])) items.push(lines[i++].trim().replace(/^([-*+]|\d+\.)\s+/, ""));
      const Tag = ord ? "ol" : "ul"; out.push(<Tag key={k++} className={`space-y-1.5 pl-5 text-fg/80 ${ord ? "list-decimal" : "list-disc"}`}>{items.map((x, j) => <li key={j}>{inline(x)}</li>)}</Tag>); continue; }
    const buf: string[] = []; while (i < lines.length && lines[i].trim() && !/^(#{1,6}\s|```|\s*([-*+]|\d+\.)\s)/.test(lines[i])) buf.push(lines[i++].trim());
    out.push(<p key={k++} className="text-fg/80">{inline(buf.join(" "))}</p>);
  }
  return <div className="space-y-4 leading-relaxed">{out}</div>;
}
