import type { Metadata } from "next";
import FabricAnthologyClient from "./FabricAnthologyClient";

export const metadata: Metadata = {
  title: "Fabric Anthology — The World's Finest Suiting Cloths",
  description: "An editorial guide to the world's finest suiting fabrics — Loro Piana, Dormeuil, Holland & Sherry, Vitale Barberis Canonico.",
  alternates: { canonical: "https://tailors.hk/fabric-anthology" },
  openGraph: {
    title: "Fabric Anthology — The World's Finest Suiting Cloths",
    description: "An editorial guide to the world's finest suiting fabrics — Loro Piana, Dormeuil, Holland & Sherry, Vitale Barberis Canonico.",
    url: "https://tailors.hk/fabric-anthology",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebPage", "name": "Fabric Anthology — The World's Finest Suiting Cloths", "description": "An editorial guide to the world's finest suiting fabrics — Loro Piana, Dormeuil, Holland & Sherry, Vitale Barberis Canonico.", "url": "https://tailors.hk/fabric-anthology"}) }}
      />
      <FabricAnthologyClient />
    </>
  );
}
