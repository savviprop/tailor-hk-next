import type { Metadata } from "next";
import TailoredMenswearClient from "./TailoredMenswearClient";

export const metadata: Metadata = {
  title: "Tailored Menswear Hong Kong — Bespoke Suits, Shirts & Trousers",
  description: "Explore our full range of bespoke and made-to-measure menswear. Suits from HK$8,800, shirts from HK$1,280, trousers from HK$2,800.",
  alternates: { canonical: "https://tailors.hk/tailored-menswear" },
  openGraph: {
    title: "Tailored Menswear Hong Kong — Bespoke Suits, Shirts & Trousers",
    description: "Explore our full range of bespoke and made-to-measure menswear. Suits from HK$8,800, shirts from HK$1,280, trousers from HK$2,800.",
    url: "https://tailors.hk/tailored-menswear",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "CollectionPage", "name": "Tailored Menswear Hong Kong — Bespoke Suits, Shirts & Trousers", "description": "Explore our full range of bespoke and made-to-measure menswear. Suits from HK$8,800, shirts from HK$1,280, trousers from HK$2,800.", "url": "https://tailors.hk/tailored-menswear"}) }}
      />
      <TailoredMenswearClient />
    </>
  );
}
