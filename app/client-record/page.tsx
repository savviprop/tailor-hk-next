import type { Metadata } from "next";
import ClientRecordClient from "./ClientRecordClient";

export const metadata: Metadata = {
  title: "Client Record — Your Bespoke Profile",
  description: "Access your personal bespoke client record. Measurements, preferences, and order history.",
  alternates: { canonical: "https://tailors.hk/client-record" },
  openGraph: {
    title: "Client Record — Your Bespoke Profile",
    description: "Access your personal bespoke client record. Measurements, preferences, and order history.",
    url: "https://tailors.hk/client-record",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebPage", "name": "Client Record — Your Bespoke Profile", "description": "Access your personal bespoke client record. Measurements, preferences, and order history.", "url": "https://tailors.hk/client-record"}) }}
      />
      <ClientRecordClient />
    </>
  );
}
