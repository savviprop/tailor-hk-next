import type { Metadata } from "next";
import TailorGuidesClient from "./TailorGuidesClient";

export const metadata: Metadata = {
  title: "Bespoke Tailoring Guides — The Complete Resource",
  description: "Expert guides on bespoke tailoring, fabric selection, suit construction, and Hong Kong's tailoring scene.",
  alternates: { canonical: "https://tailors.hk/tailor-guides" },
  openGraph: {
    title: "Bespoke Tailoring Guides — The Complete Resource",
    description: "Expert guides on bespoke tailoring, fabric selection, suit construction, and Hong Kong's tailoring scene.",
    url: "https://tailors.hk/tailor-guides",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "CollectionPage", "name": "Bespoke Tailoring Guides — The Complete Resource", "description": "Expert guides on bespoke tailoring, fabric selection, suit construction, and Hong Kong's tailoring scene.", "url": "https://tailors.hk/tailor-guides"}) }}
      />
      <TailorGuidesClient />
    </>
  );
}
