import { site } from "@/config/site";

export const whatsappConfigured = Boolean(site.whatsappNumber);
export const emailConfigured = Boolean(site.supportEmail);

// Until real details are set in .env, both buttons fall back to the Support page.
export const whatsappHref = whatsappConfigured ? `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappMessage)}` : "/support";
export const emailHref = emailConfigured ? `mailto:${site.supportEmail}?subject=${encodeURIComponent("KelzStudio support")}` : "/support";
