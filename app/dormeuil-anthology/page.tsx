import type { Metadata } from "next";
import DormeuIlAnthologyClient from "./DormeuIlAnthologyClient";

export const metadata: Metadata = {
  title: "Dormeuil Anthology — The Finest French Suiting Fabrics",
  description: "An in-depth guide to Dormeuil's finest suiting fabrics, from Amadeus to Vanquish II.",
  alternates: { canonical: "https://tailors.hk/dormeuil-anthology" },
  openGraph: {
    title: "Dormeuil Anthology — The Finest French Suiting Fabrics",
    description: "An in-depth guide to Dormeuil's finest suiting fabrics, from Amadeus to Vanquish II.",
    url: "https://tailors.hk/dormeuil-anthology",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebPage", "name": "Dormeuil Anthology — The Finest French Suiting Fabrics", "description": "An in-depth guide to Dormeuil's finest suiting fabrics, from Amadeus to Vanquish II.", "url": "https://tailors.hk/dormeuil-anthology"}) }}
      />
      <DormeuIlAnthologyClient />
    </>
  );
}
