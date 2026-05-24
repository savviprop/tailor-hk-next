import type { Metadata } from "next";
import ProcurementClient from "./ProcurementClient";

export const metadata: Metadata = {
  title: "Fabric Procurement — Source the World's Finest Cloths",
  description: "Direct fabric procurement service. Source Loro Piana, Dormeuil, and other premium suiting cloths.",
  alternates: { canonical: "https://tailors.hk/procurement" },
  openGraph: {
    title: "Fabric Procurement — Source the World's Finest Cloths",
    description: "Direct fabric procurement service. Source Loro Piana, Dormeuil, and other premium suiting cloths.",
    url: "https://tailors.hk/procurement",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebPage", "name": "Fabric Procurement — Source the World's Finest Cloths", "description": "Direct fabric procurement service. Source Loro Piana, Dormeuil, and other premium suiting cloths.", "url": "https://tailors.hk/procurement"}) }}
      />
      <ProcurementClient />
    </>
  );
}
