import type { Metadata } from "next";
import Link from "next/link";
import { FaqSearch } from "@/components/FaqSearch";
import { site } from "@/config/site";
import { limitations } from "@/content/limits";
import { emailConfigured, emailHref, whatsappConfigured, whatsappHref } from "@/lib/contact";
export const metadata: Metadata = { title: "Support", description: "Help, guides and FAQs for KelzStudio." };
export default function Support() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-32">
      <h1 className="text-3xl font-semibold text-fg md:text-4xl">Support</h1>
      <p className="mt-4 text-muted">Find answers, or start with the guides.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link href="/how-it-works" className="rounded-md border border-line p-5 hover:bg-surface2"><b className="text-fg">Getting started</b><p className="text-sm text-muted">Step-by-step guides for every feature.</p></Link>
        <Link href="/download" className="rounded-md border border-line p-5 hover:bg-surface2"><b className="text-fg">Installation</b><p className="text-sm text-muted">Downloads and release notes.</p></Link>
      </div>
      <h2 className="mb-4 mt-12 font-semibold text-fg">Frequently asked questions</h2><FaqSearch />
      <h2 className="mt-12 font-semibold text-fg">Known limitations</h2>
      <ul className="mt-3 divide-y divide-line rounded-md border border-line">{limitations.map((l) => <li key={l.title} className="p-4"><b className="text-fg">{l.title}.</b> <span className="text-muted">{l.text}</span></li>)}</ul>
      <h2 className="mt-12 font-semibold text-fg">Contact us</h2>
      <div className="mt-3 flex flex-wrap gap-3">{whatsappConfigured && <a className="btn-primary" href={whatsappHref} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>}{emailConfigured && <a className="btn-ghost" href={emailHref}>Email support</a>}{site.issuesUrl && <a className="btn-ghost" href={site.issuesUrl}>Report an issue</a>}</div>
      {!whatsappConfigured && !emailConfigured && !site.issuesUrl && <p className="mt-2 text-muted">Official support contact details have not been published yet.</p>}
    </div>);
}
