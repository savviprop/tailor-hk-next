import type { Metadata } from "next";
import LoroPianaAnthologyClient from "./LoroPianaAnthologyClient";

export const metadata: Metadata = {
  title: "Loro Piana Anthology — The World's Finest Wool & Cashmere",
  description: "An editorial guide to Loro Piana's exceptional suiting fabrics, from Tasmanian wool to cashmere.",
  alternates: { canonical: "https://tailors.hk/loro-piana-anthology" },
  openGraph: {
    title: "Loro Piana Anthology — The World's Finest Wool & Cashmere",
    description: "An editorial guide to Loro Piana's exceptional suiting fabrics, from Tasmanian wool to cashmere.",
    url: "https://tailors.hk/loro-piana-anthology",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebPage", "name": "Loro Piana Anthology — The World's Finest Wool & Cashmere", "description": "An editorial guide to Loro Piana's exceptional suiting fabrics, from Tasmanian wool to cashmere.", "url": "https://tailors.hk/loro-piana-anthology"}) }}
      />
      <LoroPianaAnthologyClient />
    </>
  );
}
