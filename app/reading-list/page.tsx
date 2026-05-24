import type { Metadata } from "next";
import ReadingListClient from "./ReadingListClient";

export const metadata: Metadata = {
  title: "Reading List — Essential Tailoring Literature",
  description: "A curated reading list of essential books, articles, and resources on bespoke tailoring and menswear.",
  alternates: { canonical: "https://tailors.hk/reading-list" },
  openGraph: {
    title: "Reading List — Essential Tailoring Literature",
    description: "A curated reading list of essential books, articles, and resources on bespoke tailoring and menswear.",
    url: "https://tailors.hk/reading-list",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebPage", "name": "Reading List — Essential Tailoring Literature", "description": "A curated reading list of essential books, articles, and resources on bespoke tailoring and menswear.", "url": "https://tailors.hk/reading-list"}) }}
      />
      <ReadingListClient />
    </>
  );
}
