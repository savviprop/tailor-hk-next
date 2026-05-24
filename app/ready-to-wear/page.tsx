import type { Metadata } from "next";
import ReadyToWearClient from "./ReadyToWearClient";

export const metadata: Metadata = {
  title: "Ready to Wear vs Bespoke — The Complete Guide",
  description: "Understanding the spectrum from off-the-rack to fully bespoke. Which is right for you?",
  alternates: { canonical: "https://tailors.hk/ready-to-wear" },
  openGraph: {
    title: "Ready to Wear vs Bespoke — The Complete Guide",
    description: "Understanding the spectrum from off-the-rack to fully bespoke. Which is right for you?",
    url: "https://tailors.hk/ready-to-wear",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "name": "Ready to Wear vs Bespoke — The Complete Guide", "description": "Understanding the spectrum from off-the-rack to fully bespoke. Which is right for you?", "url": "https://tailors.hk/ready-to-wear"}) }}
      />
      <ReadyToWearClient />
    </>
  );
}
