import type { Metadata } from "next";
import TailorFinderQuizClient from "./TailorFinderQuizClient";

export const metadata: Metadata = {
  title: "Tailor Finder Quiz — Find Your Perfect Hong Kong Tailor",
  description: "Take our tailor finder quiz to discover which Hong Kong tailor is right for your style and budget.",
  alternates: { canonical: "https://tailors.hk/tailor-finder-quiz" },
  openGraph: {
    title: "Tailor Finder Quiz — Find Your Perfect Hong Kong Tailor",
    description: "Take our tailor finder quiz to discover which Hong Kong tailor is right for your style and budget.",
    url: "https://tailors.hk/tailor-finder-quiz",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebPage", "name": "Tailor Finder Quiz — Find Your Perfect Hong Kong Tailor", "description": "Take our tailor finder quiz to discover which Hong Kong tailor is right for your style and budget.", "url": "https://tailors.hk/tailor-finder-quiz"}) }}
      />
      <TailorFinderQuizClient />
    </>
  );
}
