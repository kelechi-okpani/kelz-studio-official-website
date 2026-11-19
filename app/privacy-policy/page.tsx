import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { policy, policyUpdated } from "@/content/privacy";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How KelzNova Ltd. handles information on the KelzStudio website and in the KelzStudio application.",
  ...(site.url ? { alternates: { canonical: "/privacy-policy" } } : {}),
};

export default function PrivacyPolicy() {
  return <LegalDocument title="Privacy Policy" updated={policyUpdated} sections={policy} contactIntro="For privacy questions or to use your rights, contact KelzNova Ltd." />;
}

// import type { Metadata } from "next";
// import Link from "next/link";
// import { policy, policyUpdated } from "@/content/privacy";
// import { emailConfigured, emailHref, whatsappConfigured, whatsappHref } from "@/lib/contact";
// import { site } from "@/config/site";
// export const metadata: Metadata = { title: "Privacy Policy", description: "How KelzNova Ltd. handles information on the KelzStudio website and in the KelzStudio application.", ...(site.url ? { alternates: { canonical: "/privacy-policy" } } : {}) };
// export default function PrivacyPolicy() {
//   return (
//     <article className="mx-auto max-w-3xl px-5 pb-28 pt-32">
//       <h1 className="text-3xl font-semibold tracking-tight text-fg md:text-5xl">Privacy Policy</h1>
//       <p className="mt-3 text-sm text-muted">KelzNova Ltd. · Last updated {policyUpdated}</p>
//       <nav aria-label="On this page" className="mt-8 rounded-xl border border-line bg-surface p-5"><p className="text-sm font-semibold text-fg">On this page</p>
//         <ol className="mt-3 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">{policy.map((s) => <li key={s.id}><a href={`#${s.id}`} className="text-muted hover:text-fg">{s.title}</a></li>)}<li><a href="#contact" className="text-muted hover:text-fg">14. Contact us</a></li></ol></nav>
//       <div className="mt-10 space-y-10">{policy.map((s) => (
//         <section key={s.id} id={s.id} className="scroll-mt-24"><h2 className="text-xl font-semibold text-fg">{s.title}</h2>
//           <div className="mt-3 space-y-3 leading-relaxed text-fg/80">{s.body.map((b, i) => typeof b === "string" ? <p key={i}>{b}</p> : <ul key={i} className="list-disc space-y-1.5 pl-5">{b.map((x) => <li key={x}>{x}</li>)}</ul>)}</div></section>))}
//         <section id="contact" className="scroll-mt-24"><h2 className="text-xl font-semibold text-fg">14. Contact us</h2>
//           <p className="mt-3 leading-relaxed text-fg/80">For privacy questions or to use your rights, contact KelzNova Ltd.{whatsappConfigured || emailConfigured ? " using:" : <> through the <Link href="/support" className="text-glow hover:underline">Support page</Link>.</>}</p>
//           {(whatsappConfigured || emailConfigured) && <div className="mt-4 flex flex-wrap gap-3">{whatsappConfigured && <a className="btn-primary" href={whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp</a>}{emailConfigured && <a className="btn-ghost" href={emailHref}>Email</a>}</div>}</section>
//       </div>
//     </article>);
// }
