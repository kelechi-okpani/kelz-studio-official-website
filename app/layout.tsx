import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { site } from "@/config/site";
import { getReleases, latestStable } from "@/lib/releases/github";

// Light unless the visitor explicitly saved "dark". System preference is deliberately ignored.
const THEME_SCRIPT = `try{var t=localStorage.getItem("kelz-theme");document.documentElement.dataset.theme=t==="dark"?"dark":"light"}catch(e){document.documentElement.dataset.theme="light"}`;
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url || "https://kelechi-okpani.com"),
  title: { 
    default: `${site.name} — Best Presentation Software for Churches & Events`, 
    template: `%s | ${site.name} Presentation Software` 
  },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: site.company, url: site.url }],
  creator: site.company,
  publisher: site.company,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: { 
    title: `${site.name} — ${site.tagline}`, 
    description: site.description, 
    url: site.url,
    siteName: site.name, 
    type: "website", 
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "KelzStudio Presentation Software" }] 
  },
  twitter: { 
    card: "summary_large_image", 
    title: `${site.name} — ${site.tagline}`, 
    description: site.description,
    images: ["/logo.png"]
  },
  icons: { icon: "/logo.png" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const d = await getReleases(); 
  const latest = d.ok ? latestStable(d.releases) : undefined;

  // JSON-LD Structured Data for Google to index KelzStudio as a Software Application
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": site.name,
    "operatingSystem": "Windows, macOS, Linux",
    "applicationCategory": "PresentationApplication",
    "description": site.description,
    "url": site.url,
    "logo": site.logo,
    "brand": {
      "@type": "Brand",
      "name": site.company
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    icons: {
      icon: "/logo.png",
      shortcut: "/logo.png",
      apple: "/logo.png",
    }
  };

  return (
    <html lang="en" data-theme="light" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* Google Tag Manager - GTM-WD4GLLBS */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WD4GLLBS');`,
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WD4GLLBS"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        
        <Nav latest={latest?.version} />
        <main>{children}</main>
        <Footer latestTag={latest?.tag} />
        <FloatingContact />
      </body>
    </html>
  );
}