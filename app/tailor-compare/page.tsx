import type { Metadata } from "next";
import TailorCompareClient from "./TailorCompareClient";

export const metadata: Metadata = {
  title: "Compare Hong Kong Tailors — Side by Side Comparison",
  description: "Compare Hong Kong's top bespoke tailors side by side. Pricing, style, and specialities.",
  alternates: { canonical: "https://tailors.hk/tailor-compare" },
  openGraph: {
    title: "Compare Hong Kong Tailors — Side by Side Comparison",
    description: "Compare Hong Kong's top bespoke tailors side by side. Pricing, style, and specialities.",
    url: "https://tailors.hk/tailor-compare",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebPage", "name": "Compare Hong Kong Tailors — Side by Side Comparison", "description": "Compare Hong Kong's top bespoke tailors side by side. Pricing, style, and specialities.", "url": "https://tailors.hk/tailor-compare"}) }}
      />
      <TailorCompareClient />
    </>
  );
}
