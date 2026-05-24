import type { Metadata } from "next";
import VBCAnthologyClient from "./VBCAnthologyClient";

export const metadata: Metadata = {
  title: "Vitale Barberis Canonico Anthology — Italian Suiting Mastery",
  description: "An editorial guide to Vitale Barberis Canonico's finest suiting fabrics from the oldest mill in the world.",
  alternates: { canonical: "https://tailors.hk/vbc-anthology" },
  openGraph: {
    title: "Vitale Barberis Canonico Anthology — Italian Suiting Mastery",
    description: "An editorial guide to Vitale Barberis Canonico's finest suiting fabrics from the oldest mill in the world.",
    url: "https://tailors.hk/vbc-anthology",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebPage", "name": "Vitale Barberis Canonico Anthology — Italian Suiting Mastery", "description": "An editorial guide to Vitale Barberis Canonico's finest suiting fabrics from the oldest mill in the world.", "url": "https://tailors.hk/vbc-anthology"}) }}
      />
      <VBCAnthologyClient />
    </>
  );
}
