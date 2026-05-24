import type { Metadata } from "next";
import HollandSherryAnthologyClient from "./HollandSherryAnthologyClient";

export const metadata: Metadata = {
  title: "Holland & Sherry Anthology — British Suiting Excellence",
  description: "Explore Holland & Sherry's legendary suiting fabrics — from Shetland tweeds to fine merino.",
  alternates: { canonical: "https://tailors.hk/holland-sherry-anthology" },
  openGraph: {
    title: "Holland & Sherry Anthology — British Suiting Excellence",
    description: "Explore Holland & Sherry's legendary suiting fabrics — from Shetland tweeds to fine merino.",
    url: "https://tailors.hk/holland-sherry-anthology",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebPage", "name": "Holland & Sherry Anthology — British Suiting Excellence", "description": "Explore Holland & Sherry's legendary suiting fabrics — from Shetland tweeds to fine merino.", "url": "https://tailors.hk/holland-sherry-anthology"}) }}
      />
      <HollandSherryAnthologyClient />
    </>
  );
}
