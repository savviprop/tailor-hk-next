import type { Metadata } from "next";
import WardrobeConsultancyClient from "./WardrobeConsultancyClient";

export const metadata: Metadata = {
  title: "Wardrobe Consultancy — Build a Bespoke Wardrobe",
  description: "Personal wardrobe consultancy service. Build a complete bespoke wardrobe tailored to your lifestyle.",
  alternates: { canonical: "https://tailors.hk/wardrobe-consultancy" },
  openGraph: {
    title: "Wardrobe Consultancy — Build a Bespoke Wardrobe",
    description: "Personal wardrobe consultancy service. Build a complete bespoke wardrobe tailored to your lifestyle.",
    url: "https://tailors.hk/wardrobe-consultancy",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebPage", "name": "Wardrobe Consultancy — Build a Bespoke Wardrobe", "description": "Personal wardrobe consultancy service. Build a complete bespoke wardrobe tailored to your lifestyle.", "url": "https://tailors.hk/wardrobe-consultancy"}) }}
      />
      <WardrobeConsultancyClient />
    </>
  );
}
