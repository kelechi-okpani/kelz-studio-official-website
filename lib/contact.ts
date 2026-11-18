import { site } from "@/config/site";
export const whatsappHref = site.whatsappNumber ? `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappMessage)}` : "";
export const emailHref = site.supportEmail ? `mailto:${site.supportEmail}?subject=${encodeURIComponent("KelzStudio support")}` : "";
