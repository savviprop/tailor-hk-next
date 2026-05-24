import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Tailors.hk — Hong Kong's Leading Bespoke Tailor",
  description: "Hong Kong's premier destination for bespoke and made-to-measure suits, shirts, and trousers. Atelier-direct pricing from HK$8,800.",
  alternates: { canonical: "https://tailors.hk" },
  openGraph: {
    title: "Tailors.hk — Hong Kong's Leading Bespoke Tailor",
    description: "Hong Kong's premier destination for bespoke and made-to-measure suits, shirts, and trousers. Atelier-direct pricing from HK$8,800.",
    url: "https://tailors.hk",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebPage", "name": "Tailors.hk — Hong Kong's Leading Bespoke Tailor", "description": "Hong Kong's premier destination for bespoke and made-to-measure suits, shirts, and trousers. Atelier-direct pricing from HK$8,800.", "url": "https://tailors.hk"}) }}
      />
      <HomeClient />
    </>
  );
}
