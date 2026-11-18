import { site } from "@/config/site";

export const whatsappConfigured = Boolean(site.whatsappNumber);
export const emailConfigured = Boolean(site.supportEmail);

// Falls back to the Support page until real contact details are set.
export const whatsappHref = whatsappConfigured
  ? `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappMessage)}`
  : "/support";

export const emailHref = emailConfigured
  ? `mailto:${site.supportEmail}?subject=${encodeURIComponent("KelzStudio support")}`
  : "/support";