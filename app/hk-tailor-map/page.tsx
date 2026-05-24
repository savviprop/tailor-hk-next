import type { Metadata } from "next";
import ProductionIndexClient from "./ProductionIndexClient";

export const metadata: Metadata = {
  title: "Hong Kong Tailor Map — Find Tailors Near You",
  description: "Interactive map of Hong Kong's finest bespoke tailors. Find tailors in Central, Tsim Sha Tsui, and beyond.",
  alternates: { canonical: "https://tailors.hk/hk-tailor-map" },
  openGraph: {
    title: "Hong Kong Tailor Map — Find Tailors Near You",
    description: "Interactive map of Hong Kong's finest bespoke tailors. Find tailors in Central, Tsim Sha Tsui, and beyond.",
    url: "https://tailors.hk/hk-tailor-map",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebPage", "name": "Hong Kong Tailor Map — Find Tailors Near You", "description": "Interactive map of Hong Kong's finest bespoke tailors. Find tailors in Central, Tsim Sha Tsui, and beyond.", "url": "https://tailors.hk/hk-tailor-map"}) }}
      />
      <ProductionIndexClient />
    </>
  );
}
