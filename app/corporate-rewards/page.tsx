import type { Metadata } from "next";
import CorporateRewardsClient from "./CorporateRewardsClient";

export const metadata: Metadata = {
  title: "Corporate Rewards — Bespoke Tailoring for Teams",
  description: "Bespoke tailoring corporate rewards and gifting programmes for Hong Kong businesses.",
  alternates: { canonical: "https://tailors.hk/corporate-rewards" },
  openGraph: {
    title: "Corporate Rewards — Bespoke Tailoring for Teams",
    description: "Bespoke tailoring corporate rewards and gifting programmes for Hong Kong businesses.",
    url: "https://tailors.hk/corporate-rewards",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebPage", "name": "Corporate Rewards — Bespoke Tailoring for Teams", "description": "Bespoke tailoring corporate rewards and gifting programmes for Hong Kong businesses.", "url": "https://tailors.hk/corporate-rewards"}) }}
      />
      <CorporateRewardsClient />
    </>
  );
}
