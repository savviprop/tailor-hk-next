"use client";
import { useSEO } from "@/hooks/useSEO";
/**
 * TAILORS.HK — ATELIER DIRECT
 * Design: Barlow Condensed display + JetBrains Mono data labels + Barlow body
 * Single-purpose shareable landing page for the Atelier Direct proposition
 */
import { Link } from "@/lib/wouter-shim";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
// // SEO handled by generateMetadata in page.tsx
import { QualityChart } from "@/components/QualityChart";
import RrpTooltip from "@/components/RrpTooltip";
import PricingEstimator from "@/components/PricingEstimator";
import { atelierTierEnquiryUrl, pageEnquiryUrl } from "@/lib/whatsapp";

const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body:    '"Barlow", Arial, sans-serif',
  mono:    '"JetBrains Mono", "Courier New", monospace',
};

const WHATSAPP_URL = pageEnquiryUrl("Atelier Direct");

const tiers = [
  {
    code: "01",
    label: "ENTRY",
    price: "From HK$12,800",
    note: "MTM & Bespoke · Hand Crafted",
    desc: "Handcrafted to your measurements. Full floating canvas, hand-padded, hand-sewn throughout. The same construction supplied to major international tailoring houses — available to the private client at atelier rates.",
    fabrics: ["Vitale Barberis", "Loro Piana", "Holland & Sherry"],
    rrp: "HK$30,000",
    rrpNote: "Equivalent full-canvas construction retails through conventional bespoke channels at HK$30,000 and above. Atelier Direct removes the retail intermediary.",
  },
  {
    code: "02",
    label: "MID",
    price: "From HK$18,000",
    note: "Premium cloth selection",
    desc: "Step up in cloth quality — Super 160s and above, cashmere blends, and seasonal specialities. The same handcrafted construction, elevated through the selection of cloth.",
    fabrics: ["Dormeuil", "Scabal", "Caccioppoli"],
    rrp: "HK$50,000",
    rrpNote: "Premium cloth with full-canvas construction at this specification retails at HK$50,000+ through established tailoring houses. Atelier Direct provides the same production at source.",
  },
  {
    code: "03",
    label: "INVESTMENT",
    price: "From HK$28,000",
    note: "Elevated cloth selection",
    desc: "The finest wools, cashmere, and exotic blends. Each garment is a considered investment — built to last decades, altered as the wearer evolves, and finished with bespoke hardware and hand-embroidered details.",
    fabrics: ["Loro Piana Cashmere", "Dormeuil Amadeus", "Scabal Platinum"],
    rrp: "HK$80,000",
    rrpNote: "Luxury cloth commissions at this level retail at HK$80,000+ through international tailoring houses. Atelier Direct delivers the same cloth and construction without the intermediary margin.",
  },
  {
    code: "04",
    label: "ULTRA",
    price: "From HK$33,800",
    note: "Limitless Fabrication",
    desc: "At the pinnacle, a commission becomes something else entirely — a singular art object. Loro Piana cloth of the highest grade, bespoke hardware, and construction techniques unchanged for a century. Each garment is made once, for one person, by a single craftsman.",
    fabrics: ["Loro Piana Cashmere", "Loro Piana Tasmanian", "Dormeuil Vanquish II"],
    rrp: "HK$100,000+",
    rrpNote: "Ultra-luxury commissions of this specification — Loro Piana cloth, single craftsman, bespoke hardware — are not publicly priced by most houses. Equivalent commissions begin at HK$100,000 through international ateliers.",
  },
];

const comparison = [
  { label: "Construction", retail: "Fused or half-canvas", atelier: "Full floating canvas, hand-padded" },
  { label: "Production", retail: "Factory, at volume, on blocks", atelier: "By hand, to your measurements, once" },
  { label: "Pattern", retail: "Standard block, adjusted", atelier: "Drafted entirely to your form" },
  { label: "Fittings", retail: "None (RTW) or 1 (MTM)", atelier: "2–5 fittings, depending on tier" },
  { label: "Lining", retail: "Machine-sewn", atelier: "Fully hand-sewn" },
  { label: "Buttonholes", retail: "Machine-cut", atelier: "Hand-stitched with silk thread" },
  { label: "Alterations", retail: "Limited by fused construction", atelier: "Unlimited — hand-sewn throughout" },
  { label: "Retail price", retail: "HK$30,000–50,000+", atelier: "From HK$12,800 direct" },
];

const process = [
  { step: "01", title: "Submit a Brief", desc: "Complete the enquiry form or contact us via WhatsApp. We will respond within one business day to arrange a consultation." },
  { step: "02", title: "Consultation", desc: "A private consultation — in person in Hong Kong or by video call. We discuss your requirements, occasion, cloth preferences, and timeline." },
  { step: "03", title: "Cloth Selection", desc: "We present cloths from our library — Vitale Barberis, Loro Piana, Holland & Sherry, Dormeuil, and others — selected for your commission." },
  { step: "04", title: "Measurement & Pattern", desc: "Full body measurement and pattern drafting. For bespoke commissions, a unique pattern is created for you and retained on file for future orders." },
  { step: "05", title: "Construction", desc: "Your garment is constructed entirely by hand. Full canvas, hand-padded, hand-sewn throughout. Production time: 8–12 weeks for bespoke, 4–6 weeks for MTM." },
  { step: "06", title: "Fittings & Delivery", desc: "Two to five fittings depending on tier. Final delivery in Hong Kong. Your pattern and measurements are retained for future commissions." },
];

export default function AtelierDirect() {
  const [copied, setCopied] = useState(false);

  useSEO({
    title: "Atelier Direct — Handcrafted Suits at Direct Rates | Tailors.hk",
    description: "Tailors.hk is a world-leading atelier of handcrafted suits. For the first time, access to fine craft production is available directly to the private client — at atelier rates. Suits from HK$12,800.",
    canonical: "https://tailors.hk/atelier-direct",
    keywords: "atelier direct Hong Kong, bespoke suits direct rates, handcrafted suits Hong Kong, tailoring at cost, bespoke tailor Hong Kong",
    ogType: "website",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Atelier Direct",
        "provider": { "@type": "Organization", "name": "Tailors.hk" },
        "description": "Direct access to world-class handcrafted suit production at atelier rates, bypassing the retail intermediary.",
        "areaServed": "Hong Kong",
        "url": "https://tailors.hk/atelier-direct",
      }
    ],
  });

  const handleCopy = () => {
    navigator.clipboard.writeText("https://tailors.hk/atelier-direct").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <main style={{ backgroundColor: "#fff", overflowX: "hidden" }}>
      <Navigation />

      {/* ── HERO ── */}
      <section style={{ position: "relative", background: "#0a0a0a", color: "#fff", padding: "100px 0 80px", borderBottom: "1px solid #1a1a1a", overflow: "hidden" }}>
        <img
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/TkBztkkzndumsmvs.jpeg"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.3, pointerEvents: "none" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.14em", color: "#555", display: "block", marginBottom: "20px", textTransform: "uppercase" }}>
            § ATELIER DIRECT · TAILORS.HK
          </span>
          <h1 style={{ fontFamily: F.display, fontSize: "clamp(40px, 8vw, 96px)", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "#fff", lineHeight: 0.95, marginBottom: "32px" }}>
            ACCESS<br />THE PRODUCTION.
          </h1>
          <p style={{ fontFamily: F.body, fontSize: "clamp(15px, 1.5vw, 18px)", lineHeight: 1.8, color: "#aaa", maxWidth: "560px", marginBottom: "16px" }}>
            Tailors.hk is a world-leading platform for handcrafted suits and textiles to some of the finest tailoring houses, international ready-to-wear labels and corporate clients. For the first time, fine craft is made available directly to the private client — through Atelier Direct.
          </p>
          <p style={{ fontFamily: F.body, fontSize: "clamp(14px, 1.3vw, 16px)", lineHeight: 1.8, color: "#888", maxWidth: "560px", marginBottom: "40px" }}>
            The world’s leading ready-to-wear tailoring retails through conventional channels at HK$30,000–50,000 and above. Atelier Direct rates begin from HK$12,800 for essential handcrafted suiting. At the pinnacle, each commission is an art piece — singular, made only for you. Commissioned in the finest cloths, from essentials to Vicuña, fitted precisely to your form. The difference to retail is timeless menswear, elevated fabrication, hand craft, optimised fit, and access.
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", marginBottom: "40px" }}>
            <Link href="/contact?type=bespoke">
              <span style={{ display: "inline-block", fontFamily: F.mono, fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", padding: "14px 32px", background: "#b8a87a", color: "#0a0a0a", cursor: "pointer" }}>
                Enquire for Atelier Direct →
              </span>
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", fontFamily: F.mono, fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", padding: "14px 32px", border: "1px solid #333", color: "#aaa", textDecoration: "none" }}>
              WhatsApp →
            </a>
          </div>

          {/* Share */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
            <button
              onClick={handleCopy}
              style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", textTransform: "uppercase", padding: "8px 16px", border: "1px solid #2a2a2a", background: "transparent", color: copied ? "#22c55e" : "#555", cursor: "pointer" }}
            >
              {copied ? "✓ Link Copied" : "◆ Share This Page"}
            </button>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ background: "#111", borderBottom: "1px solid #1e1e1e", padding: "24px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "24px" }}>
            {[
              { value: "25+", label: "Years Production" },
              { value: "HK$12,800", label: "Direct Rate From" },
              { value: "Tier I", label: "Quality Benchmark" },
              { value: "By Enquiry", label: "Access" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: F.display, fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 700, letterSpacing: "0.06em", color: "#b8a87a", textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center" }}>{s.value}{s.value === "HK$12,800" && <RrpTooltip theme="dark" />}</div>
                <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#555", marginTop: "4px", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section style={{ padding: "80px 0", borderBottom: "1px solid #e5e5e5" }}>
        <div className="container">
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.14em", color: "#aaa", display: "block", marginBottom: "12px", textTransform: "uppercase" }}>§ 01 · THE DIFFERENCE</span>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(24px, 4vw, 48px)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#111", lineHeight: 1.05, marginBottom: "40px" }}>
            Retail vs.<br />Atelier Direct
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: F.mono, fontSize: "11px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #111" }}>
                  <th style={{ textAlign: "left", padding: "12px 16px", letterSpacing: "0.12em", color: "#aaa", fontWeight: 400, textTransform: "uppercase", width: "25%" }}>Attribute</th>
                  <th style={{ textAlign: "left", padding: "12px 16px", letterSpacing: "0.12em", color: "#aaa", fontWeight: 400, textTransform: "uppercase", width: "37.5%" }}>Conventional Retail</th>
                  <th style={{ textAlign: "left", padding: "12px 16px", letterSpacing: "0.12em", color: "#b8a87a", fontWeight: 600, textTransform: "uppercase", width: "37.5%", background: "#fafaf8" }}>◆ Atelier Direct</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.label} style={{ borderBottom: "1px solid #e8e8e8", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                    <td style={{ padding: "14px 16px", color: "#555", letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "9px" }}>{row.label}</td>
                    <td style={{ padding: "14px 16px", color: "#777", lineHeight: 1.5 }}>{row.retail}</td>
                    <td style={{ padding: "14px 16px", color: "#111", lineHeight: 1.5, fontWeight: 500, background: "#fafaf8" }}>{row.atelier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── TIERS ── */}
      <section style={{ padding: "80px 0", background: "#f7f7f5", borderBottom: "1px solid #e5e5e5" }}>
        <div className="container">
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.14em", color: "#aaa", display: "block", marginBottom: "12px", textTransform: "uppercase" }}>§ 02 · DIRECT RATE TIERS</span>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(24px, 4vw, 48px)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#111", lineHeight: 1.05, marginBottom: "40px" }}>
            Select Your<br />Commission Tier
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: "1px", background: "#e0e0e0" }}>
            {tiers.map((tier) => (
              <div key={tier.code} style={{ background: "#fff", padding: "32px 28px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", color: "#aaa", textTransform: "uppercase" }}>{tier.code}</span>
                  <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.08em", color: "#b8a87a", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "2px" }}>{tier.price}<RrpTooltip theme="light" rrp={tier.rrp} footnote={tier.rrpNote} /></span>
                </div>
                <h3 style={{ fontFamily: F.display, fontSize: "clamp(16px, 2vw, 22px)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", marginBottom: "8px" }}>{tier.label}</h3>
                <p style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: "#aaa", textTransform: "uppercase", marginBottom: "16px" }}>{tier.note}</p>
                <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.75, color: "#666", marginBottom: "20px" }}>{tier.desc}</p>
                <div style={{ borderTop: "1px solid #eee", paddingTop: "16px" }}>
                  <p style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: "#aaa", textTransform: "uppercase", marginBottom: "8px" }}>Cloth Sources</p>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
                    {tier.fabrics.map((f) => (
                      <span key={f} style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.06em", color: "#555", padding: "3px 8px", border: "1px solid #e0e0e0", textTransform: "uppercase" }}>{f}</span>
                    ))}
                  </div>
                  <a
                    href={atelierTierEnquiryUrl({ tier: tier.label, price: tier.price.replace("From ", "") })}
                    target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-block", fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", textTransform: "uppercase", padding: "9px 16px", background: "#111", color: "#fff", textDecoration: "none" }}
                  >
                    Enquire — {tier.label} →
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "32px", textAlign: "center" }}>
            <Link href="/contact?type=bespoke">
              <span style={{ display: "inline-block", fontFamily: F.mono, fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", padding: "14px 32px", background: "#111", color: "#fff", cursor: "pointer" }}>
                Enquire for Direct Access →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ padding: "80px 0", borderBottom: "1px solid #e5e5e5" }}>
        <div className="container">
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.14em", color: "#aaa", display: "block", marginBottom: "12px", textTransform: "uppercase" }}>§ 03 · THE PROCESS</span>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(24px, 4vw, 48px)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#111", lineHeight: 1.05, marginBottom: "40px" }}>
            From Brief<br />to Delivery
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: "40px" }}>
            {process.map((step, i) => (
              <div key={step.step} style={{ borderTop: `2px solid ${i === 0 ? "#b8a87a" : "#e0e0e0"}`, paddingTop: "20px" }}>
                <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.14em", color: i === 0 ? "#b8a87a" : "#aaa", display: "block", marginBottom: "8px" }}>{step.step}</span>
                <h3 style={{ fontFamily: F.display, fontSize: "clamp(14px, 1.8vw, 18px)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", marginBottom: "10px" }}>{step.title}</h3>
                <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.75, color: "#666" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUALITY INDEX ── */}
      <section style={{ padding: "80px 0", background: "#f7f7f5", borderBottom: "1px solid #e5e5e5" }}>
        <div className="container">
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.14em", color: "#aaa", display: "block", marginBottom: "12px", textTransform: "uppercase" }}>§ 04 · QUALITY BENCHMARK</span>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(24px, 4vw, 48px)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#111", lineHeight: 1.05, marginBottom: "8px" }}>
            Where We Stand
          </h2>
          <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.75, color: "#777", maxWidth: "520px", marginBottom: "40px" }}>
            Our production sits at Tier I — alongside the world's finest handcrafted tailoring houses. The difference is that we offer direct access, without the retail intermediary.
          </p>
          <QualityChart />
        </div>
      </section>

      {/* ── PRICING ESTIMATOR ── */}
      <section style={{ background: "#f8f7f4", padding: "80px 0" }}>
        <div className="container">
          <div style={{ marginBottom: "40px" }}>
            <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.14em", color: "#aaa", display: "block", marginBottom: "12px", textTransform: "uppercase" }}>§ · PRICING GUIDE</span>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "#111", marginBottom: "8px" }}>What Will It Cost?</h2>
            <p style={{ fontFamily: F.body, fontSize: "14px", color: "#777", maxWidth: "480px", lineHeight: 1.75 }}>Use the guide below to estimate your Atelier Direct rate before submitting a brief.</p>
          </div>
          <PricingEstimator />
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ background: "#0a0a0a", color: "#fff", padding: "100px 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.14em", color: "#555", display: "block", marginBottom: "20px", textTransform: "uppercase" }}>
            § ENQUIRE FOR ATELIER DIRECT
          </span>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(32px, 6vw, 72px)", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "#fff", lineHeight: 0.95, marginBottom: "24px" }}>
            Access Is<br />By Enquiry.
          </h2>
          <p style={{ fontFamily: F.body, fontSize: "clamp(14px, 1.5vw, 17px)", lineHeight: 1.8, color: "#888", maxWidth: "480px", margin: "0 auto 40px" }}>
            Submit a brief and we will advise on the appropriate tier, production timeline, and direct rate for your requirements. All enquiries are handled with complete discretion.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact?type=bespoke">
              <span style={{ display: "inline-block", fontFamily: F.mono, fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", padding: "16px 40px", background: "#b8a87a", color: "#0a0a0a", cursor: "pointer" }}>
                Submit a Brief →
              </span>
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", fontFamily: F.mono, fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", padding: "16px 40px", border: "1px solid #333", color: "#aaa", textDecoration: "none" }}>
              WhatsApp →
            </a>
          </div>
          <p style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#444", marginTop: "20px", textTransform: "uppercase" }}>
            ◆ Atelier Direct · Handcrafted to Order · From HK$12,800
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
