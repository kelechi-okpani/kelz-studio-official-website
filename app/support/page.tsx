import type { Metadata } from "next";
import Link from "next/link";
import { FaqSearch } from "@/components/FaqSearch";
import { site } from "@/config/site";
export const metadata: Metadata = { title: "Support", description: "Help, guides and FAQs for KelzStudio." };
export default function Support() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-32">
      <h1 className="text-4xl font-semibold text-fg md:text-6xl">Support</h1>
      <p className="mt-4 text-muted">Find answers, or start with the guides.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link href="/how-it-works" className="rounded-md border border-line p-5 hover:bg-surface2"><b className="text-fg">Getting started</b><p className="text-sm text-muted">Step-by-step guides.</p></Link>
        <Link href="/download" className="rounded-md border border-line p-5 hover:bg-surface2"><b className="text-fg">Installation</b><p className="text-sm text-muted">Downloads and release notes.</p></Link>
      </div>
      <h2 className="mb-4 mt-12 font-semibold text-fg">Frequently asked questions</h2><FaqSearch />
      <h2 className="mt-12 font-semibold text-fg">Report a problem</h2>
      <p className="mt-2 text-muted">{site.issuesUrl ? <a className="text-glow" href={site.issuesUrl}>Open an issue</a> : site.supportEmail ? <a className="text-glow" href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> : "Official support contact details have not been published yet."}</p>
    </div>);
}
