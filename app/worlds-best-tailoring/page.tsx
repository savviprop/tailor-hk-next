import type { Metadata } from "next";
import WorldTailorsClient from "./WorldTailorsClient";

export const metadata: Metadata = {
  title: "World's Best Tailoring — Global Tailor Index",
  description: "The definitive index of the world's finest tailors — from Savile Row to Naples, Hong Kong to Tokyo.",
  alternates: { canonical: "https://tailors.hk/worlds-best-tailoring" },
  openGraph: {
    title: "World's Best Tailoring — Global Tailor Index",
    description: "The definitive index of the world's finest tailors — from Savile Row to Naples, Hong Kong to Tokyo.",
    url: "https://tailors.hk/worlds-best-tailoring",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebPage", "name": "World's Best Tailoring — Global Tailor Index", "description": "The definitive index of the world's finest tailors — from Savile Row to Naples, Hong Kong to Tokyo.", "url": "https://tailors.hk/worlds-best-tailoring"}) }}
      />
      <WorldTailorsClient />
    </>
  );
}
