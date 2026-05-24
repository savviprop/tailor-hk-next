import type { Metadata } from "next";
import BespokeNotBespokeClient from "./BespokeNotBespokeClient";

export const metadata: Metadata = {
  title: "Bespoke vs Made-to-Measure — What's the Difference?",
  description: "The definitive guide to understanding the difference between true bespoke and made-to-measure tailoring.",
  alternates: { canonical: "https://tailors.hk/bespoke-not-bespoke" },
  openGraph: {
    title: "Bespoke vs Made-to-Measure — What's the Difference?",
    description: "The definitive guide to understanding the difference between true bespoke and made-to-measure tailoring.",
    url: "https://tailors.hk/bespoke-not-bespoke",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "name": "Bespoke vs Made-to-Measure — What's the Difference?", "description": "The definitive guide to understanding the difference between true bespoke and made-to-measure tailoring.", "url": "https://tailors.hk/bespoke-not-bespoke"}) }}
      />
      <BespokeNotBespokeClient />
    </>
  );
}
