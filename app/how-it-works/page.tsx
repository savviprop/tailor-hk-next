import type { Metadata } from "next";
import HowItWorksClient from "./HowItWorksClient";

export const metadata: Metadata = {
  title: "How Bespoke Tailoring Works — The Process Explained",
  description: "A step-by-step guide to the bespoke tailoring process at Tailors.hk. From consultation to final fitting.",
  alternates: { canonical: "https://tailors.hk/how-it-works" },
  openGraph: {
    title: "How Bespoke Tailoring Works — The Process Explained",
    description: "A step-by-step guide to the bespoke tailoring process at Tailors.hk. From consultation to final fitting.",
    url: "https://tailors.hk/how-it-works",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "HowTo", "name": "How Bespoke Tailoring Works — The Process Explained", "description": "A step-by-step guide to the bespoke tailoring process at Tailors.hk. From consultation to final fitting.", "url": "https://tailors.hk/how-it-works"}) }}
      />
      <HowItWorksClient />
    </>
  );
}
