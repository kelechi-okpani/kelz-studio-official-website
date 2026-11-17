"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { faqs } from "@/content/faq";
export function FaqSearch() {
  const [q, setQ] = useState("");
  const list = faqs.filter((f) => (f.q + f.a).toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <label className="relative block"><span className="sr-only">Search FAQs</span><Search className="absolute left-3 top-3.5 text-muted" size={18} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search frequently asked questions" className="w-full rounded-md border border-line bg-surface py-3 pl-10 pr-3 text-fg outline-none focus:border-glow" /></label>
      <div className="mt-4 divide-y divide-line rounded-md border border-line">
        {list.map((f) => <details key={f.q} className="group p-4"><summary className="cursor-pointer font-medium text-fg">{f.q}</summary><p className="mt-2 text-muted">{f.a}</p></details>)}
        {!list.length && <p className="p-4 text-muted">No results.</p>}
      </div>
    </div>
  );
}
