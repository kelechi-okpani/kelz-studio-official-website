import { Mail } from "lucide-react";
import { emailConfigured, emailHref, whatsappConfigured, whatsappHref } from "@/lib/contact";
const Wa = () => <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden><path d="M12.04 2a9.9 9.9 0 0 0-8.43 15.1L2 22l5.05-1.32A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.2 15.03l-.3-.18-3 .78.8-2.92-.2-.31A8.1 8.1 0 0 1 12.04 3.8Zm-3.1 3.9c-.17 0-.45.06-.69.32-.24.26-.9.88-.9 2.15s.93 2.5 1.06 2.67c.13.17 1.8 2.86 4.45 3.9 2.2.87 2.65.7 3.13.65.48-.04 1.55-.63 1.77-1.24.22-.6.22-1.13.15-1.24-.06-.11-.24-.17-.5-.3-.26-.14-1.55-.77-1.79-.85-.24-.09-.41-.13-.59.13-.17.26-.67.85-.82 1.02-.15.18-.3.2-.57.07-.26-.13-1.1-.4-2.1-1.3-.77-.69-1.3-1.55-1.45-1.8-.15-.27 0-.4.12-.53.12-.12.26-.3.4-.46.13-.15.17-.26.26-.44.09-.17.04-.33-.02-.46-.07-.13-.59-1.42-.8-1.94-.21-.5-.43-.43-.59-.44h-.5Z" /></svg>;
function Fab({ href, label, children, primary, external }: { href: string; label: string; children: React.ReactNode; primary?: boolean; external?: boolean }) {
  return (
    <a href={href} aria-label={label} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition duration-200 hover:-translate-y-0.5 active:scale-95 ${primary ? "bg-brand text-on-brand shadow-brand/30" : "border border-line bg-surface text-fg shadow-[0_10px_30px_-10px_rgb(var(--shadow)/.4)]"}`}>
      {children}
      <span aria-hidden className="pointer-events-none absolute right-full mr-3 translate-x-2 whitespace-nowrap rounded-lg border border-line bg-surface px-3 py-1.5 text-sm font-medium text-fg opacity-0 shadow-lg transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">{label}</span>
    </a>);
}
/** Both buttons always show. Until configured in .env, they link to /support. */
export function FloatingContact() {
  return (
    <div
      className="fixed right-4 z-40 flex flex-col gap-3 [animation:fab-in_.5s_.8s_both] md:right-6"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <Fab href={whatsappHref} label="Chat on WhatsApp" primary external={whatsappConfigured}>
        <Wa />
      </Fab>
      <Fab href={emailHref} label={emailConfigured ? "Email support" : "Contact support"}>
        <Mail size={24} />
      </Fab>
    </div>
  );
}
