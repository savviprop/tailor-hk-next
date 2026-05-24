import type { Metadata } from "next";
import ScabalAnthologyClient from "./ScabalAnthologyClient";

export const metadata: Metadata = {
  title: "Scabal Anthology — Belgian Suiting Heritage",
  description: "Explore Scabal's distinguished suiting fabrics, from classic worsted to innovative blends.",
  alternates: { canonical: "https://tailors.hk/scabal-anthology" },
  openGraph: {
    title: "Scabal Anthology — Belgian Suiting Heritage",
    description: "Explore Scabal's distinguished suiting fabrics, from classic worsted to innovative blends.",
    url: "https://tailors.hk/scabal-anthology",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebPage", "name": "Scabal Anthology — Belgian Suiting Heritage", "description": "Explore Scabal's distinguished suiting fabrics, from classic worsted to innovative blends.", "url": "https://tailors.hk/scabal-anthology"}) }}
      />
      <ScabalAnthologyClient />
    </>
  );
}
