import type { Metadata } from "next";
import ExecutiveTailoringClient from "./ExecutiveTailoringClient";

export const metadata: Metadata = {
  title: "Executive Tailoring Hong Kong — Corporate Bespoke Suits",
  description: "Bespoke suits for Hong Kong's business community. Executive tailoring packages from HK$8,800.",
  alternates: { canonical: "https://tailors.hk/executive-tailoring" },
  openGraph: {
    title: "Executive Tailoring Hong Kong — Corporate Bespoke Suits",
    description: "Bespoke suits for Hong Kong's business community. Executive tailoring packages from HK$8,800.",
    url: "https://tailors.hk/executive-tailoring",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebPage", "name": "Executive Tailoring Hong Kong — Corporate Bespoke Suits", "description": "Bespoke suits for Hong Kong's business community. Executive tailoring packages from HK$8,800.", "url": "https://tailors.hk/executive-tailoring"}) }}
      />
      <ExecutiveTailoringClient />
    </>
  );
}
