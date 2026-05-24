"use client";
import { useSEO } from "@/hooks/useSEO";
/**
 * TAILOR.HK — FAQ
 * Design: Technical editorial — Barlow Condensed + JetBrains Mono
 */

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Link } from "@/lib/wouter-shim";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
// // SEO handled by generateMetadata in page.tsx
import { pageEnquiryUrl } from "@/lib/whatsapp";

const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body:    '"Barlow", Arial, sans-serif',
  mono:    '"JetBrains Mono", "Courier New", monospace',
};

const faqs = [
  {
    category: "The Process",
    items: [
      {
        q: "What is the difference between bespoke and made-to-measure?",
        a: "Bespoke tailoring involves creating a unique pattern from scratch based solely on your measurements and posture. Made-to-measure starts from a standard block pattern that is then adjusted to your measurements. Bespoke offers the highest level of personalisation and fit, while made-to-measure is a more accessible entry point to custom tailoring.",
      },
      {
        q: "How many fittings will I need?",
        a: "For a bespoke suit, we typically schedule two to three fittings. The first fitting is a basted fitting where the garment is loosely assembled to check the overall shape. Subsequent fittings refine the details. Made-to-measure garments typically require one fitting.",
      },
      {
        q: "How long does the process take?",
        a: "A bespoke suit typically takes six to eight weeks from your first consultation to final delivery. Made-to-measure garments take three to four weeks. Rush orders can be accommodated in some cases — please contact us to discuss your timeline.",
      },
      {
        q: "Do I need to come in for every fitting?",
        a: "Yes. Fittings must be conducted in person. We are located in Sheung Wan, Hong Kong, and operate by private appointment only. We can also accommodate remote consultations for clients outside Hong Kong.",
      },
    ],
  },
  {
    category: "Pricing & Value",
    items: [
      {
        q: "How does the wholesale pricing model work?",
        a: "Through our partnership with Dorsia, we access wholesale tailoring rates that are typically 2–3x lower than equivalent retail alternatives. This means you receive the same quality of fabric and construction as world-renowned tailoring brands, at a price that reflects true manufacturing cost rather than retail markup.",
      },
      {
        q: "Is the initial consultation zero fee?",
        a: "Yes. Our initial consultations carry zero fee and no obligation. We encourage you to come in, explore our fabric library, and discuss your requirements before making any commitment.",
      },
      {
        q: "Do you offer corporate rates for teams?",
        a: "Yes. We offer dedicated corporate rates for organisations looking to equip their teams, reward top performers, or create client gifting programmes. Please visit our Corporate Rewards page or contact us directly to discuss your requirements.",
      },
    ],
  },
  {
    category: "Fabrics & Materials",
    items: [
      {
        q: "Which fabric mills do you work with?",
        a: "We source fabrics from the world's finest mills, including Loro Piana, Scabal, Dormeuil, Holland & Sherry, Caccioppoli, and Vitale Barberis, among others. Our fabric library is updated seasonally.",
      },
      {
        q: "What fabrics are best for Hong Kong's climate?",
        a: "Hong Kong's humid subtropical climate calls for lightweight, breathable fabrics. We recommend Super 110s–130s wool in lighter weights (200–260g/m²), tropical wool, or linen blends for year-round wear. For air-conditioned environments, heavier weights are also appropriate.",
      },
      {
        q: "What is the difference between Super 100s and Super 150s wool?",
        a: "The Super number refers to the fineness of the wool fibre — a higher number indicates a finer, softer fibre. Super 100s to Super 130s represent the practical sweet spot for most suits: fine enough to drape beautifully, robust enough for regular wear. Super 150s and above are extraordinarily soft but require more careful handling.",
      },
    ],
  },
  {
    category: "Appointments & Logistics",
    items: [
      {
        q: "Where are you located?",
        a: "We are based in Sheung Wan, Hong Kong. All consultations and fittings are by private appointment only. Please contact us via WhatsApp or email to arrange a time.",
      },
      {
        q: "Do you offer remote consultations?",
        a: "Yes. We offer remote consultations via video call for clients who are unable to visit us in person. For clients outside Hong Kong, we can arrange for a local tailor to take your measurements using our precise measurement guide.",
      },
      {
        q: "Do you store my measurements and pattern?",
        a: "Yes. Once your pattern has been created, we store it permanently on file. This means future orders can be fulfilled with minimal fittings, and we can produce garments for you even if you are not in Hong Kong.",
      },
    ],
  },
];

export default function FAQ() {
  useSEO({
    title: "Frequently Asked Questions — Bespoke Tailoring Hong Kong | Tailors.hk",
    description: "Answers to the most common questions about bespoke tailoring in Hong Kong — pricing, process, timelines, fittings, fabric choices, and what to expect from your first commission.",
    canonical: "https://tailors.hk/faq",
    keywords: "bespoke suit FAQ, tailoring questions Hong Kong, how much does a bespoke suit cost HK, bespoke suit process",
    ogType: "website",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.flatMap(section =>
          section.items.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": { "@type": "Answer", "text": item.a }
          }))
        )
      }
    ],
  });

  const [open, setOpen] = useState<string | null>(null);
  const toggle = (key: string) => setOpen(open === key ? null : key);

  return (
    <main style={{ backgroundColor: "#fff", overflowX: "hidden" }}>
      <Navigation />

      <section style={{ borderBottom: "1px solid #e2e2e2", padding: "56px 0 40px" }}>
        <div className="container">
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "12px" }}>§ 07 · FREQUENTLY ASKED QUESTIONS</span>
          <h1 style={{ fontFamily: F.display, fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", lineHeight: 1.05, marginBottom: "16px" }}>FAQs</h1>
          <p style={{ fontFamily: F.body, fontSize: "15px", lineHeight: 1.75, color: "#777", maxWidth: "520px" }}>Everything you need to know about our tailoring process, pricing, fabrics, and appointments.</p>
        </div>
      </section>

      <section style={{ padding: "64px 0" }}>
        <div className="container" style={{ maxWidth: "780px" }}>
          {faqs.map((section, si) => (
            <div key={section.category} style={{ marginBottom: "48px" }}>
              <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", color: "#aaa", marginBottom: "20px", paddingBottom: "12px", borderBottom: "1px solid #e8e8e8" }}>
                {String(si + 1).padStart(2, "0")} · {section.category.toUpperCase()}
              </div>
              {section.items.map((item, ii) => {
                const key = `${si}-${ii}`;
                const isOpen = open === key;
                return (
                  <div key={key} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <button onClick={() => toggle(key)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", padding: "18px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                      <span style={{ fontFamily: F.display, fontSize: "14px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#111", lineHeight: 1.4, flex: 1 }}>{item.q}</span>
                      <span style={{ color: "#aaa", flexShrink: 0, paddingTop: "2px" }}>{isOpen ? <Minus size={14} /> : <Plus size={14} />}</span>
                    </button>
                    {isOpen && (
                      <div style={{ paddingBottom: "20px" }}>
                        <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.8, color: "#666", margin: 0 }}>{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "56px 0", backgroundColor: "#fafafa", borderTop: "1px solid #e2e2e2" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#bbb", display: "block", marginBottom: "12px" }}>STILL HAVE QUESTIONS?</span>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", lineHeight: 1.1, marginBottom: "12px" }}>We Are Here to Help</h2>
          <p style={{ fontFamily: F.body, fontSize: "14px", color: "#888", maxWidth: "360px", margin: "0 auto 24px" }}>Contact us via WhatsApp or email and we will respond within one business day.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
            <a href={pageEnquiryUrl("FAQ")} target="_blank" rel="noopener noreferrer"><span className="btn-filled">Enquire via WhatsApp →</span></a>
            <Link href="/contact"><span className="btn-outline">Email Us</span></Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
