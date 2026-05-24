import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL("https://tailors.hk"),
  title: {
    default: "Tailors.hk — Hong Kong's Leading Bespoke Tailor",
    template: "%s | Tailors.hk",
  },
  description: "Hong Kong's premier destination for bespoke and made-to-measure suits, shirts, and trousers. Atelier-direct pricing from HK$8,800.",
  openGraph: {
    type: "website",
    locale: "en_HK",
    url: "https://tailors.hk",
    siteName: "Tailors.hk",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tailors.hk" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": "https://tailors.hk/#organization", name: "Tailors.hk", url: "https://tailors.hk" },
      { "@type": "LocalBusiness", "@id": "https://tailors.hk/#localbusiness", name: "Tailors.hk — Dorsia Bespoke", url: "https://tailors.hk", address: { "@type": "PostalAddress", addressLocality: "Hong Kong", addressCountry: "HK" }, priceRange: "HKD 8800-50000" },
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
          <Navigation />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
