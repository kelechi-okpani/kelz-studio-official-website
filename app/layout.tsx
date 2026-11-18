import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { site } from "@/config/site";
import { getReleases, latestStable } from "@/lib/releases/github";

// Light unless the visitor explicitly saved "dark". System preference is deliberately ignored.
const THEME_SCRIPT = `try{var t=localStorage.getItem("kelz-theme");document.documentElement.dataset.theme=t==="dark"?"dark":"light"}catch(e){document.documentElement.dataset.theme="light"}`;

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { title: site.name, description: site.description, siteName: site.name, type: "website", images: ["/logo.png"] },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  icons: { icon: "/logo.png" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const d = await getReleases();
  const latest = d.ok ? latestStable(d.releases) : undefined;

  return (
    <html lang="en" data-theme="light" suppressHydrationWarning className={inter.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WD4GLLBS');
          `}
        </Script>
      </head>
      <body className="font-sans">
        {/* Google Tag Manager (noscript) */}
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
        <SpeedInsights />
      </body>
    </html>
  );
}


// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import Script from "next/script";
// import "./globals.css";
// import { Nav } from "@/components/Nav";
// import { Footer } from "@/components/Footer";
// import { site } from "@/config/site";
// import { getReleases, latestStable } from "@/lib/releases/github";

// // Light unless the visitor explicitly saved "dark". System preference is deliberately ignored.
// const THEME_SCRIPT = `try{var t=localStorage.getItem("kelz-theme");document.documentElement.dataset.theme=t==="dark"?"dark":"light"}catch(e){document.documentElement.dataset.theme="light"}`;

// const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

// export const metadata: Metadata = {
//   ...(site.url ? { metadataBase: new URL(site.url) } : {}),
//   title: { default: `${site.name} — ${site.tagline}`, template: `%s | ${site.name}` },
//   description: site.description,
//   openGraph: { title: site.name, description: site.description, siteName: site.name, type: "website", images: ["/logo.png"] },
//   twitter: { card: "summary_large_image", title: site.name, description: site.description },
//   icons: { icon: "/logo.png" },
// };

// export default async function RootLayout({ children }: { children: React.ReactNode }) {
//   const d = await getReleases();
//   const latest = d.ok ? latestStable(d.releases) : undefined;

//   return (
//     <html lang="en" data-theme="light" suppressHydrationWarning className={inter.variable}>
//       <head>
//         <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
//         <Script
//           id="google-tag"
//           strategy="afterInteractive"
//           src="https://www.googletagmanager.com/gtm.js?id=GTM-597JJD4Q"
//         />
//         <Script id="google-tag-init" strategy="afterInteractive">
//           {`
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());
//             gtag('config', 'G-9EDY4KWLVB');
//           `}
//         </Script>
//       </head>
//       <body className="font-sans">
//         <noscript>
//           <iframe
//             src="https://www.googletagmanager.com/ns.html?id=GTM-597JJD4Q"
//             height="0"
//             width="0"
//             style={{ display: "none", visibility: "hidden" }}
//           />
//         </noscript>
//         <Nav latest={latest?.version} />
//         <main>{children}</main>
//         <Footer latestTag={latest?.tag} />
//       </body>
//     </html>
//   );
// }

