import type { Metadata } from "next";
import ConciergeClient from "./ConciergeClient";

export const metadata: Metadata = {
  title: "Concierge Tailoring — White Glove Bespoke Service",
  description: "White glove bespoke tailoring concierge service. We come to you, anywhere in Hong Kong.",
  alternates: { canonical: "https://tailors.hk/concierge" },
  openGraph: {
    title: "Concierge Tailoring — White Glove Bespoke Service",
    description: "White glove bespoke tailoring concierge service. We come to you, anywhere in Hong Kong.",
    url: "https://tailors.hk/concierge",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebPage", "name": "Concierge Tailoring — White Glove Bespoke Service", "description": "White glove bespoke tailoring concierge service. We come to you, anywhere in Hong Kong.", "url": "https://tailors.hk/concierge"}) }}
      />
      <ConciergeClient />
    </>
  );
}
