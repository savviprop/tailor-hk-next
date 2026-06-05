import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL("https://tailors.hk"),
  title: {
    default: "Tailors.hk — Hong Kong's Leading Bespoke Tailor",
    template: "%s | Tailors.hk",
  },
  description: "Hong Kong's premier destination for bespoke and made-to-measure suits, shirts, and trousers. Atelier-direct pricing from HK$12,800. By appointment.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_HK",
    url: "https://tailors.hk",
    siteName: "Tailors.hk",
    images: [{ url: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/VeTDsTFJhpLJVXfo.png", width: 1200, height: 630, alt: "Tailors.hk — Hong Kong's Leading Bespoke Tailor" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tailors.hk — Hong Kong's Leading Bespoke Tailor",
    description: "Hong Kong's premier destination for bespoke and made-to-measure suits, shirts, and trousers. Atelier-direct pricing from HK$12,800. By appointment.",
    images: ["https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/VeTDsTFJhpLJVXfo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      { rel: "manifest", url: "/manifest.json" },
    ],
  },
  // NOTE: No root canonical here — each page.tsx sets its own self-referencing canonical.
  // A root canonical would propagate to all pages and tell Google every page is a duplicate of the homepage.
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": "https://tailors.hk/#organization", name: "Tailors.hk", url: "https://tailors.hk" },
      {
        "@type": "LocalBusiness",
        "@id": "https://tailors.hk/#localbusiness",
        name: "Tailors.hk — Dorsia Bespoke",
        url: "https://tailors.hk",
        telephone: "+85265088780",
        email: "info@tailorshongkong.com",
        description: "Hong Kong's premier bespoke and made-to-measure tailoring service. Atelier-direct pricing from HK$12,800. Fitting locations in Central, Sheung Wan, and Causeway Bay.",
        priceRange: "HKD 12800-50000",
        currenciesAccepted: "HKD",
        paymentAccepted: "Cash, Credit Card, Bank Transfer",
        areaServed: [
          { "@type": "City", name: "Hong Kong" },
          { "@type": "AdministrativeArea", name: "Central, Hong Kong" },
          { "@type": "AdministrativeArea", name: "Sheung Wan, Hong Kong" },
          { "@type": "AdministrativeArea", name: "Causeway Bay, Hong Kong" },
        ],
        address: [
          { "@type": "PostalAddress", addressLocality: "Central", addressRegion: "Hong Kong Island", addressCountry: "HK", description: "Bespoke & Corporate Tailoring" },
          { "@type": "PostalAddress", addressLocality: "Sheung Wan", addressRegion: "Hong Kong Island", addressCountry: "HK", description: "Atelier Direct & Fabric Anthology" },
          { "@type": "PostalAddress", addressLocality: "Causeway Bay", addressRegion: "Hong Kong Island", addressCountry: "HK", description: "Ready-to-Wear & MTM" },
        ],
        geo: { "@type": "GeoCoordinates", latitude: 22.2830, longitude: 114.1550 },
        openingHoursSpecification: [{
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
          opens: "10:00",
          closes: "19:00"
        }],
        sameAs: [
          "https://www.instagram.com/tailors.hk",
          "https://tailorshongkong.com",
          "https://tailor.hk"
        ],
        hasMap: "https://maps.google.com/?q=Central,Hong+Kong",
        knowsAbout: [
          "Bespoke tailoring",
          "Made-to-measure suits",
          "Hong Kong bespoke tailor",
          "Atelier direct pricing",
          "Corporate tailoring Hong Kong",
          "Bespoke suits Hong Kong"
        ]
      },
      { "@type": "WebSite", "@id": "https://tailors.hk/#website", url: "https://tailors.hk", name: "Tailors.hk" },
    ],
  };
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,600&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </head>
      <body className="bg-black text-white antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
