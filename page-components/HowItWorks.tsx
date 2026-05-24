"use client";
import { useSEO } from "@/hooks/useSEO";
/**
 * TAILOR.HK — HOW IT WORKS
 * Design: Technical editorial — numbered methodology, spec comparison table
 */
import { Link } from "@/lib/wouter-shim";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
// // SEO handled by generateMetadata in page.tsx

const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body:    '"Barlow", Arial, sans-serif',
  mono:    '"JetBrains Mono", "Courier New", monospace',
};

const CDN = "https://images.squarespace-cdn.com/content/v1/68fb7bffc7f5256a863ed907";

const STEPS = [
  { num: "01", label: "CONSULTATION", duration: "45 min", location: "Atelier or your office",
    desc: "We begin with a private consultation to understand your requirements — your lifestyle, occasions, fabric preferences, and budget. This can be done in person at our Hong Kong atelier or remotely.",
    detail: "No obligation. No pressure. A diagnostic session, not a sales pitch." },
  { num: "02", label: "MEASUREMENTS & FABRIC", duration: "30–60 min", location: "Atelier",
    desc: "Your cutter takes over 30 measurements. You select from a range of premium fabrics sourced from leading mills — Loro Piana, Scabal, Dormeuil, Holland & Sherry, and others.",
    detail: "Over 4,000 cloth options. We guide you through weight, weave, and composition for Hong Kong's climate." },
  { num: "03", label: "PATTERN & CONSTRUCTION", duration: "—", location: "Workshop",
    desc: "A unique pattern is drafted to your exact measurements. Your garment is then cut and constructed by hand, with multiple stages of quality control throughout the process.",
    detail: "Bespoke: pattern drafted from scratch. Made-to-measure: adjusted from a base block." },
  { num: "04", label: "FITTINGS", duration: "30 min × 2–3", location: "Atelier",
    desc: "You attend one or more fittings where adjustments are made. The shoulder, chest, and sleeve pitch are refined progressively until the garment meets the required standard.",
    detail: "The basted garment is fitted on your body before any permanent stitching is done." },
  { num: "05", label: "FINAL DELIVERY", duration: "15 min", location: "Atelier or delivery",
    desc: "Your completed garment is delivered with a full care guide. We maintain your pattern on file so that future orders can be fulfilled with minimal fittings required.",
    detail: "Total lead time: 4–6 weeks bespoke. 2–3 weeks made-to-measure." },
];

const SPECS = [
  { label: "LEAD TIME",       bespoke: "4–6 weeks",           mtm: "2–3 weeks" },
  { label: "FITTINGS",        bespoke: "2–3 sessions",        mtm: "1–2 sessions" },
  { label: "PATTERN",         bespoke: "Drafted from scratch", mtm: "Adjusted block" },
  { label: "CANVAS",          bespoke: "Full floating canvas", mtm: "Half canvas" },
  { label: "CLOTH OPTIONS",   bespoke: "4,000+",              mtm: "2,000+" },
  { label: "PRICE FROM",      bespoke: "HK$18,000",           mtm: "HK$12,800" },
];

export default function HowItWorks() {
  useSEO({
    title: "How Bespoke Tailoring Works — The Process | Tailors.hk",
    description: "A step-by-step guide to the bespoke tailoring process at Tailors.hk — from initial consultation and fabric selection to pattern cutting, fittings, and final delivery.",
    canonical: "https://tailors.hk/how-it-works",
    keywords: "bespoke tailoring process Hong Kong, how bespoke suit is made, tailoring consultation HK, suit fitting process",
    ogType: "website",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Commission a Bespoke Suit in Hong Kong",
        "description": "The step-by-step process for commissioning a bespoke suit at Tailors.hk",
        "step": [
          {"@type": "HowToStep", "position": 1, "name": "Initial Consultation", "text": "Meet with our tailor to discuss your requirements, style preferences, and occasion."},
          {"@type": "HowToStep", "position": 2, "name": "Fabric Selection", "text": "Select from a range of fine wools, cashmeres, and blends from leading European mills."},
          {"@type": "HowToStep", "position": 3, "name": "Measurements", "text": "Your tailor takes precise measurements across 20+ points to create your individual pattern."},
          {"@type": "HowToStep", "position": 4, "name": "First Fitting", "text": "Try the basted garment and make adjustments to fit and style."},
          {"@type": "HowToStep", "position": 5, "name": "Final Delivery", "text": "Collect your completed garment, fitted to your measurements."}
        ]
      }
    ],
  });

  return (
    <main style={{ backgroundColor: "#fff", overflowX: "hidden" }}>
      <Navigation />
      <section style={{ position: "relative", borderBottom: "1px solid #1a1a1a", padding: "100px 0 60px", background: "#111", color: "#fff", overflow: "hidden" }}>
        <img
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/INJQJnMGaXUHzrAO.jpeg"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.3, pointerEvents: "none" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#666", display: "block", marginBottom: "12px" }}>§ 02 · METHODOLOGY</span>
          <h1 style={{ fontFamily: F.display, fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", lineHeight: 1.05, marginBottom: "16px" }}>How It Works</h1>
          <p style={{ fontFamily: F.body, fontSize: "15px", lineHeight: 1.75, color: "#aaa", maxWidth: "560px" }}>A rigorous five-stage process from first conversation to final garment. Every step is designed to produce a suit that fits your body, your life, and your professional context.</p>
        </div>
      </section>

      <section style={{ borderBottom: "1px solid #e2e2e2", padding: "48px 0", backgroundColor: "#fafafa" }}>
        <div className="container">
          <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", marginBottom: "20px" }}>BESPOKE VS MADE-TO-MEASURE · SPECIFICATION COMPARISON</div>
          <div style={{ overflowX: "auto" }}>
            <table className="spec-table" style={{ minWidth: "500px" }}>
              <thead><tr><th>SPECIFICATION</th><th>BESPOKE</th><th>MADE-TO-MEASURE</th></tr></thead>
              <tbody>
                {SPECS.map((row) => (
                  <tr key={row.label}>
                    <td style={{ fontFamily: F.mono, fontSize: "10px", letterSpacing: "0.06em", color: "#555", fontWeight: 500 }}>{row.label}</td>
                    <td style={{ fontFamily: F.display, fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em", color: "#111" }}>{row.bespoke}</td>
                    <td style={{ fontFamily: F.display, fontSize: "12px", fontWeight: 500, letterSpacing: "0.06em", color: "#666" }}>{row.mtm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 0" }}>
        <div className="container">
          <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", marginBottom: "40px" }}>THE FIVE-STAGE PROCESS</div>
          {STEPS.map((step, i) => (
            <div key={step.num} style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: "24px", padding: "32px 0", borderBottom: i < STEPS.length - 1 ? "1px solid #f0f0f0" : "none" }}>
              <div><span style={{ fontFamily: F.mono, fontSize: "11px", letterSpacing: "0.06em", color: "#ccc" }}>{step.num}</span></div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "10px", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: F.display, fontSize: "13px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#111" }}>{step.label}</span>
                  <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.06em", color: "#bbb", border: "1px solid #e8e8e8", padding: "2px 8px" }}>{step.duration}</span>
                  <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.06em", color: "#bbb" }}>{step.location}</span>
                </div>
                <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.75, color: "#555", marginBottom: "8px" }}>{step.desc}</p>
                <p style={{ fontFamily: F.mono, fontSize: "10px", lineHeight: 1.7, color: "#aaa", margin: 0 }}>{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "64px 0", backgroundColor: "#111" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#555", display: "block", marginBottom: "16px" }}>§ 01 · COMMISSION</span>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", lineHeight: 1.1, marginBottom: "16px" }}>Arrange a Private Consultation</h2>
          <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.75, color: "#888", maxWidth: "420px", margin: "0 auto 28px" }}>A focused conversation — your measurements, cloth preferences, and intended occasions. By appointment, at our atelier in Hong Kong.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
            <Link href="/tailor-finder-quiz"><span className="btn-filled-white">Submit a Brief <ArrowRight size={12} /></span></Link>
            <a href="https://wa.me/85265088780?text=Hello%2C%20I%20found%20you%20via%20Tailors.hk%20and%20would%20like%20to%20enquire." target="_blank" rel="noopener noreferrer"><span className="btn-outline-white">Enquire via WhatsApp</span></a>
          </div>
          <p style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#444", marginTop: "16px", textTransform: "uppercase" }}>
            ◆ Atelier Direct · Handcrafted to Order · From HK$12,800
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
