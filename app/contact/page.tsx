import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Tailors.hk — Book a Consultation",
  description: "Book a bespoke consultation with Tailors.hk in Hong Kong. WhatsApp, email, or visit our atelier.",
  alternates: { canonical: "https://tailors.hk/contact" },
  openGraph: {
    title: "Contact Tailors.hk — Book a Consultation",
    description: "Book a bespoke consultation with Tailors.hk in Hong Kong. WhatsApp, email, or visit our atelier.",
    url: "https://tailors.hk/contact",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "ContactPage", "name": "Contact Tailors.hk — Book a Consultation", "description": "Book a bespoke consultation with Tailors.hk in Hong Kong. WhatsApp, email, or visit our atelier.", "url": "https://tailors.hk/contact"}) }}
      />
      <ContactClient />
    </>
  );
}
