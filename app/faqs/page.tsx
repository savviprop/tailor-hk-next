import type { Metadata } from "next";
import FAQClient from "./FAQClient";

export const metadata: Metadata = {
  title: "Bespoke Tailoring FAQs — Your Questions Answered",
  description: "Frequently asked questions about bespoke tailoring, pricing, timelines, and the Tailors.hk process.",
  alternates: { canonical: "https://tailors.hk/faqs" },
  openGraph: {
    title: "Bespoke Tailoring FAQs — Your Questions Answered",
    description: "Frequently asked questions about bespoke tailoring, pricing, timelines, and the Tailors.hk process.",
    url: "https://tailors.hk/faqs",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "name": "Bespoke Tailoring FAQs — Your Questions Answered", "description": "Frequently asked questions about bespoke tailoring, pricing, timelines, and the Tailors.hk process.", "url": "https://tailors.hk/faqs"}) }}
      />
      <FAQClient />
    </>
  );
}
