import type { Metadata } from "next";
import SuitsByTailorClient from "./SuitsByTailorClient";

export const metadata: Metadata = {
  title: "Suits by Tailor — Hong Kong's Finest Bespoke Houses",
  description: "Browse bespoke suits by Hong Kong's finest tailoring houses. Compare styles, prices, and traditions.",
  alternates: { canonical: "https://tailors.hk/suits-by-tailor" },
  openGraph: {
    title: "Suits by Tailor — Hong Kong's Finest Bespoke Houses",
    description: "Browse bespoke suits by Hong Kong's finest tailoring houses. Compare styles, prices, and traditions.",
    url: "https://tailors.hk/suits-by-tailor",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebPage", "name": "Suits by Tailor — Hong Kong's Finest Bespoke Houses", "description": "Browse bespoke suits by Hong Kong's finest tailoring houses. Compare styles, prices, and traditions.", "url": "https://tailors.hk/suits-by-tailor"}) }}
      />
      <SuitsByTailorClient />
    </>
  );
}
