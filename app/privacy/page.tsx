import { permanentRedirect } from "next/navigation";
// /privacy is a short alias for the full policy.
export default function Privacy() { permanentRedirect("/privacy-policy"); }
