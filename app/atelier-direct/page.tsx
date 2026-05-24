import type { Metadata } from "next";
import AtelierDirectClient from "./AtelierDirectClient";

export const metadata: Metadata = {
  title: "Atelier Direct — Bespoke Pricing Without the Middleman",
  description: "Atelier-direct pricing on bespoke suits, shirts, and trousers. No retail markup. Suits from HK$8,800.",
  alternates: { canonical: "https://tailors.hk/atelier-direct" },
  openGraph: {
    title: "Atelier Direct — Bespoke Pricing Without the Middleman",
    description: "Atelier-direct pricing on bespoke suits, shirts, and trousers. No retail markup. Suits from HK$8,800.",
    url: "https://tailors.hk/atelier-direct",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebPage", "name": "Atelier Direct — Bespoke Pricing Without the Middleman", "description": "Atelier-direct pricing on bespoke suits, shirts, and trousers. No retail markup. Suits from HK$8,800.", "url": "https://tailors.hk/atelier-direct"}) }}
      />
      <AtelierDirectClient />
    </>
  );
}
