import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Tailors.hk — Our Story & Philosophy",
  description: "Learn about Tailors.hk, Hong Kong's leading bespoke tailoring platform. Our philosophy, team, and commitment to craft.",
  alternates: { canonical: "https://tailors.hk/about" },
  openGraph: {
    title: "About Tailors.hk — Our Story & Philosophy",
    description: "Learn about Tailors.hk, Hong Kong's leading bespoke tailoring platform. Our philosophy, team, and commitment to craft.",
    url: "https://tailors.hk/about",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "AboutPage", "name": "About Tailors.hk — Our Story & Philosophy", "description": "Learn about Tailors.hk, Hong Kong's leading bespoke tailoring platform. Our philosophy, team, and commitment to craft.", "url": "https://tailors.hk/about"}) }}
      />
      <AboutClient />
    </>
  );
}
