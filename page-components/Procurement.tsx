"use client";
import { useSEO, SCHEMAS } from "@/hooks/useSEO";
/**
 * TAILOR.HK — PROCUREMENT & DISTRIBUTION
 * Design: Technical editorial — Barlow Condensed + JetBrains Mono
 * Positioning: Tailors.hk as a global textile and menswear distribution brand
 */

import { useState, useEffect } from "react";
import { Link } from "@/lib/wouter-shim";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
// SEO handled by generateMetadata in page.tsx
import { pageEnquiryUrl } from "@/lib/whatsapp";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID  = "service_4fsz82g";
const EMAILJS_TEMPLATE_ID = "template_rkwyske";
const EMAILJS_PUBLIC_KEY  = "pPJMTC_ZpirSxcVr9";

const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body:    '"Barlow", Arial, sans-serif',
  mono:    '"JetBrains Mono", "Courier New", monospace',
};

const CDN = "https://images.squarespace-cdn.com/content/v1/68fb7bffc7f5256a863ed907";

const PARTNERSHIP_TIERS = [
  {
    code: "T1",
    name: "Wholesale Fabric Partner",
    description: "Access Tailors.hk's curated fabric library — sourced directly from Loro Piana, Vitale Barberis, Holland & Sherry, and Scabal. Minimum order quantities from 30 metres per cloth.",
    features: [
      "Direct mill pricing on 200+ cloths",
      "Seasonal collection updates",
      "Fabric sample books supplied",
      "Dedicated account manager",
      "Net 30 payment terms",
    ],
    moq: "30m per cloth",
    lead: "2–4 weeks",
    markets: "Asia Pacific",
  },
  {
    code: "T2",
    name: "Menswear Distribution Partner",
    description: "Distribute Tailors.hk's bespoke and made-to-measure menswear programme under your brand or as a white-label service. Ideal for hotels, department stores, and lifestyle retailers.",
    features: [
      "White-label MTM programme",
      "In-store or in-room trunk show support",
      "Branded garment bags and packaging",
      "Staff training on product knowledge",
      "Revenue share model available",
    ],
    moq: "10 garments/month",
    lead: "4–6 weeks per garment",
    markets: "Global",
  },
  {
    code: "T3",
    name: "Corporate Supply Partner",
    description: "Tailors.hk supplies bespoke and made-to-measure uniforms, corporate gifting suites, and executive wardrobe programmes to businesses across Asia and globally.",
    features: [
      "Bespoke corporate uniform design",
      "Volume pricing from 20+ garments",
      "Branded label and packaging",
      "Annual wardrobe review service",
      "Priority production scheduling",
    ],
    moq: "20 garments",
    lead: "6–8 weeks",
    markets: "Global",
  },
  {
    code: "T4",
    name: "Tailor Network Partner",
    description: "Independent tailors and ateliers can join the Tailors.hk network to access our fabric library, client referrals, and distribution infrastructure.",
    features: [
      "Fabric library access at wholesale rates",
      "Client referral programme",
      "Co-branded marketing support",
      "Technical training and workshops",
      "Listing in Tailors.hk index",
    ],
    moq: "No minimum",
    lead: "Immediate on approval",
    markets: "Hong Kong & Asia",
  },
];

const DISTRIBUTION_REGIONS = [
  { region: "Hong Kong", role: "Headquarters & Primary Market", status: "Active" },
  { region: "Mainland China", role: "Fabric Distribution & Corporate", status: "Active" },
  { region: "Singapore", role: "Southeast Asia Hub", status: "Active" },
  { region: "Japan", role: "Fabric Sourcing & Retail", status: "Active" },
  { region: "United Kingdom", role: "Savile Row Fabric Sourcing", status: "Active" },
  { region: "Italy", role: "Mill Partnerships (Biella, Como)", status: "Active" },
  { region: "Australia", role: "Wool Sourcing & Distribution", status: "Expanding" },
  { region: "United States", role: "East Coast Distribution", status: "Expanding" },
  { region: "Middle East", role: "Luxury Retail Partnerships", status: "Planned" },
  { region: "Europe", role: "Wholesale Distribution", status: "Planned" },
];

const FABRIC_PARTNERS = [
  { mill: "Loro Piana", origin: "Biella, Italy", specialty: "Super 150s–200s wool, cashmere, Tasmanian", since: "2019" },
  { mill: "Vitale Barberis", origin: "Biella, Italy", specialty: "Tropical wool, fresco, four-season", since: "2018" },
  { mill: "Holland & Sherry", origin: "Huddersfield, UK", specialty: "Fresco, tweed, British wool", since: "2020" },
  { mill: "Scabal", origin: "Brussels, Belgium", specialty: "Gold thread, luxury blends", since: "2021" },
  { mill: "Dormeuil", origin: "Paris, France", specialty: "Amadeus, Vanquish II, luxury cloths", since: "2020" },
  { mill: "Zegna Baruffa", origin: "Biella, Italy", specialty: "Cashwool, merino, cashmere blends", since: "2022" },
];

export default function Procurement() {
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  useSEO({
    title: "Atelier Direct Rates — Procurement & Distribution | Tailors.hk",
    description: "Tailors.hk is a world-leading atelier of handcrafted tailored suits. Access fine craft at atelier-direct rates from HK$12,800 — direct to the private client.",
    canonical: "https://tailors.hk/procurement",
    keywords: "atelier direct rates Hong Kong, bespoke suit supplier HK, handcrafted suit wholesale Hong Kong, MTM brand supplier, fabric distribution Hong Kong",
    ogType: "website",
    schema: [
      SCHEMAS.breadcrumb([
        { name: "Home", url: "/" },
        { name: "Procurement & Distribution", url: "/procurement" },
      ]),
      SCHEMAS.speakable(["h1", "h2"]),
            {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Procurement & Distribution",
        "provider": { "@type": "Organization", "name": "Tailors.hk" },
        "description": "Global textile and menswear distribution from Hong Kong",
        "areaServed": "Global",
      },
    ],
  });

  const [activeTab, setActiveTab] = useState<"partnerships" | "distribution" | "fabrics">("partnerships");
  const [enquiryForm, setEnquiryForm] = useState({ name: "", company: "", email: "", tier: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendError(null);
    const body = [
      `Procurement Enquiry`,
      ``,
      `Name: ${enquiryForm.name}`,
      `Company: ${enquiryForm.company || "—"}`,
      `Email: ${enquiryForm.email}`,
      `Partnership Tier: ${enquiryForm.tier || "—"}`,
      ``,
      enquiryForm.message || "—",
    ].join("\n");
    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        subject:   `Procurement Enquiry — ${enquiryForm.name}`,
        reply_to:  enquiryForm.email,
        from_name: enquiryForm.name,
        message:   body,
      },
      EMAILJS_PUBLIC_KEY
    ).then(() => {
      setSending(false);
      setSubmitted(true);
    }).catch((err) => {
      setSending(false);
      setSendError("Submission failed. Please email us at info@tailorshongkong.com");
      console.error("EmailJS error:", err);
    });
  };

  return (
    <main style={{ backgroundColor: "#fff", overflowX: "hidden" }}>
      <Navigation />

      {/* ── HERO ── */}
      <section style={{ position: "relative", height: "60vh", minHeight: "420px", overflow: "hidden" }}>
        <img
          src={"https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/TkBztkkzndumsmvs.jpeg"}
          alt="Textile fabrication"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.3))" }} />
        <div className="container" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 20px 52px" }}>
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", color: "#888", marginBottom: "12px" }}>§ 08 · PROCUREMENT & DISTRIBUTION</span>
          <h1 style={{ fontFamily: F.display, fontSize: "clamp(36px, 7vw, 72px)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#fff", lineHeight: 1.0, marginBottom: "20px", maxWidth: "640px" }}>
            Access the Production.
            Not the Retail Price.
          </h1>
          <p style={{ fontFamily: F.body, fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.75)", maxWidth: "520px", marginBottom: "32px" }}>
            Tailors.hk is a world-leading platform for handcrafted suits and textiles to some of the finest tailoring houses, international ready-to-wear labels and corporate clients. For the first time, fine craft is made available directly to the private client — through Atelier Direct.

            The world’s leading ready-to-wear tailoring retails through conventional channels at HK$30,000–50,000 and above. Atelier Direct rates begin from HK$12,800 for essential handcrafted suiting. At the pinnacle, each commission is an art piece — singular, made only for you. Commissioned in the finest cloths, from essentials to Vicuña, fitted precisely to your form. The difference to retail is timeless menswear, elevated fabrication, hand craft, optimised fit, and access.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a
              href="#enquiry"
              style={{ fontFamily: F.mono, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", padding: "12px 24px", backgroundColor: "#fff", color: "#111", textDecoration: "none", display: "inline-block" }}
            >
              Enquire Now →
            </a>
            <a
              href={pageEnquiryUrl("Procurement & Distribution")}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: F.mono, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", padding: "12px 24px", border: "1px solid rgba(255,255,255,0.4)", color: "#fff", textDecoration: "none", display: "inline-block" }}
            >
              Enquire via WhatsApp →
            </a>
          </div>
          <p style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "rgba(255,255,255,0.35)", marginTop: "20px", textTransform: "uppercase" }}>
            ◆ Atelier Direct · Handcrafted to Order · From HK$12,800
          </p>
        </div>
      </section>

      {/* ── INTRO STATS ── */}
      <section style={{ borderBottom: "1px solid #e2e2e2", backgroundColor: "#f9f9f9" }}>
        <div className="container" style={{ padding: "40px 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(160px, 100%), 1fr))", gap: "0", borderLeft: "1px solid #e2e2e2" }}>
            {[
              { value: "25+", label: "Years in Operation", sub: "Trusted partner & supplier" },
              { value: "200+", label: "Cloths Available", sub: "Direct from world mills" },
              { value: "10", label: "Markets Served", sub: "Asia & Global" },
              { value: "HK$12,800", label: "Direct Rate From", sub: "Bespoke suit, full canvas" },
            ].map((stat) => (
              <div key={stat.label} style={{ padding: "24px 28px", borderRight: "1px solid #e2e2e2" }}>
                <div style={{ fontFamily: F.display, fontSize: "36px", fontWeight: 700, letterSpacing: "0.04em", color: "#111", lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#111", textTransform: "uppercase", marginTop: "6px" }}>{stat.label}</div>
                <div style={{ fontFamily: F.body, fontSize: "11px", color: "#888", marginTop: "3px" }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TABS ── */}
      <div style={{ borderBottom: "1px solid #e2e2e2", display: "flex", overflowX: "auto" }}>
        {(["partnerships", "distribution", "fabrics"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "16px 24px", color: activeTab === tab ? "#111" : "#aaa",
              background: "none", border: "none",
              borderBottom: activeTab === tab ? "2px solid #111" : "2px solid transparent",
              cursor: "pointer", whiteSpace: "nowrap",
            }}
          >
            {tab === "partnerships" ? "Partnership Tiers" : tab === "distribution" ? "Distribution Network" : "Fabric Partners"}
          </button>
        ))}
      </div>

      {/* ── TAB CONTENT ── */}
      <div className="container" style={{ padding: "56px 20px" }}>

        {/* PARTNERSHIPS */}
        {activeTab === "partnerships" && (
          <div>
            <div style={{ marginBottom: "48px" }}>
              <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "12px" }}>§ 08a · PARTNERSHIP TIERS</span>
              <h2 style={{ fontFamily: F.display, fontSize: "clamp(22px, 4vw, 38px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", lineHeight: 1.1, marginBottom: "16px" }}>Four Ways to Partner</h2>
              <p style={{ fontFamily: F.body, fontSize: "15px", lineHeight: 1.75, color: "#666", maxWidth: "560px" }}>
                From wholesale fabric access to full menswear distribution programmes, Tailors.hk offers structured partnership tiers designed for different business models and markets.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))", gap: "1px", backgroundColor: "#e2e2e2" }}>
              {PARTNERSHIP_TIERS.map((tier) => (
                <div key={tier.code} style={{ backgroundColor: "#fff", padding: "36px 32px" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "16px" }}>
                    <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa" }}>{tier.code}</span>
                    <h3 style={{ fontFamily: F.display, fontSize: "16px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#111" }}>{tier.name}</h3>
                  </div>
                  <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.7, color: "#666", marginBottom: "20px" }}>{tier.description}</p>
                  <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "16px", marginBottom: "20px" }}>
                    {tier.features.map((f) => (
                      <div key={f} style={{ display: "flex", gap: "8px", marginBottom: "6px" }}>
                        <span style={{ fontFamily: F.mono, fontSize: "9px", color: "#111", flexShrink: 0, marginTop: "2px" }}>—</span>
                        <span style={{ fontFamily: F.body, fontSize: "12px", color: "#555", lineHeight: 1.5 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px", borderTop: "1px solid #f0f0f0", paddingTop: "16px" }}>
                    <div>
                      <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: "#aaa", marginBottom: "3px" }}>MOQ</div>
                      <div style={{ fontFamily: F.body, fontSize: "12px", color: "#111" }}>{tier.moq}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: "#aaa", marginBottom: "3px" }}>LEAD TIME</div>
                      <div style={{ fontFamily: F.body, fontSize: "12px", color: "#111" }}>{tier.lead}</div>
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: "#aaa", marginBottom: "3px" }}>MARKETS</div>
                      <div style={{ fontFamily: F.body, fontSize: "12px", color: "#111" }}>{tier.markets}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DISTRIBUTION */}
        {activeTab === "distribution" && (
          <div>
            <div style={{ marginBottom: "48px" }}>
              <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "12px" }}>§ 08b · DISTRIBUTION NETWORK</span>
              <h2 style={{ fontFamily: F.display, fontSize: "clamp(22px, 4vw, 38px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", lineHeight: 1.1, marginBottom: "16px" }}>Global Distribution</h2>
              <p style={{ fontFamily: F.body, fontSize: "15px", lineHeight: 1.75, color: "#666", maxWidth: "560px" }}>
                Headquartered in Hong Kong, Tailors.hk's distribution network spans the key textile and menswear markets of Asia, Europe, and beyond.
              </p>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: F.body, fontSize: "13px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #111" }}>
                    {["Region", "Role", "Status"].map((h) => (
                      <th key={h} style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa", textAlign: "left", padding: "10px 16px 10px 0", fontWeight: 400 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DISTRIBUTION_REGIONS.map((r, i) => (
                    <tr key={r.region} style={{ borderBottom: "1px solid #f0f0f0", backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                      <td style={{ padding: "14px 16px 14px 0", fontWeight: 600, color: "#111" }}>{r.region}</td>
                      <td style={{ padding: "14px 16px 14px 0", color: "#555" }}>{r.role}</td>
                      <td style={{ padding: "14px 16px 14px 0" }}>
                        <span style={{
                          fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase",
                          padding: "3px 8px",
                          backgroundColor: r.status === "Active" ? "#f0fdf4" : r.status === "Expanding" ? "#fefce8" : "#f5f5f5",
                          color: r.status === "Active" ? "#16a34a" : r.status === "Expanding" ? "#ca8a04" : "#888",
                        }}>
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* FABRICS */}
        {activeTab === "fabrics" && (
          <div>
            <div style={{ marginBottom: "48px" }}>
              <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "12px" }}>§ 08c · FABRIC PARTNERS</span>
              <h2 style={{ fontFamily: F.display, fontSize: "clamp(22px, 4vw, 38px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", lineHeight: 1.1, marginBottom: "16px" }}>Mill Partnerships</h2>
              <p style={{ fontFamily: F.body, fontSize: "15px", lineHeight: 1.75, color: "#666", maxWidth: "560px" }}>
                Tailors.hk maintains direct relationships with six of the world's finest fabric mills, enabling wholesale access to cloths that are otherwise only available through established tailoring houses.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: "1px", backgroundColor: "#e2e2e2" }}>
              {FABRIC_PARTNERS.map((mill) => (
                <div key={mill.mill} style={{ backgroundColor: "#fff", padding: "32px 28px" }}>
                  <h3 style={{ fontFamily: F.display, fontSize: "18px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#111", marginBottom: "6px" }}>{mill.mill}</h3>
                  <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", marginBottom: "14px" }}>{mill.origin}</div>
                  <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.65, color: "#555", marginBottom: "16px" }}>{mill.specialty}</p>
                  <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: "#aaa" }}>PARTNER SINCE {mill.since}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── ENQUIRY FORM ── */}
      <section id="enquiry" style={{ backgroundColor: "#111", padding: "80px 0" }}>
        <div className="container" style={{ padding: "0 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "32px" : "80px", alignItems: "start" }}>
            {/* Left */}
            <div>
              <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", color: "#555", display: "block", marginBottom: "16px" }}>§ 08d · PARTNER ENQUIRY</span>
              <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", lineHeight: 1.05, marginBottom: "24px" }}>
                Start a Conversation
              </h2>
              <p style={{ fontFamily: F.body, fontSize: "15px", lineHeight: 1.75, color: "#888", marginBottom: "32px" }}>
                Whether you are a retailer, hotel group, corporate client, or independent tailor, we would like to understand your requirements and explore how Tailors.hk can support your business.
              </p>
              <div style={{ borderTop: "1px solid #222", paddingTop: "24px" }}>
                <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#555", marginBottom: "8px" }}>DIRECT CONTACT</div>
                <a
                  href={pageEnquiryUrl("Procurement & Distribution")}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: F.display, fontSize: "16px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#22c55e", textDecoration: "none" }}
                >
                  Enquire via WhatsApp →
                </a>
                <div style={{ fontFamily: F.body, fontSize: "12px", color: "#555", marginTop: "6px" }}>Available Monday–Saturday, 9am–7pm HKT</div>
              </div>
            </div>

            {/* Right — Form */}
            {submitted ? (
              <div style={{ padding: "40px", border: "1px solid #222", textAlign: "center" }}>
                <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#22c55e", marginBottom: "12px" }}>ENQUIRY SENT</div>
                <p style={{ fontFamily: F.body, fontSize: "14px", color: "#888", lineHeight: 1.7 }}>Your enquiry has been submitted via WhatsApp. We will respond within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  { key: "name", label: "Full Name", type: "text", required: true },
                  { key: "company", label: "Company / Organisation", type: "text", required: true },
                  { key: "email", label: "Email Address", type: "email", required: true },
                ].map(({ key, label, type, required }) => (
                  <div key={key}>
                    <label style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#555", display: "block", marginBottom: "6px" }}>{label}</label>
                    <input
                      type={type}
                      required={required}
                      value={enquiryForm[key as keyof typeof enquiryForm]}
                      onChange={(e) => setEnquiryForm((p) => ({ ...p, [key]: e.target.value }))}
                      style={{ width: "100%", padding: "10px 12px", backgroundColor: "#1a1a1a", border: "1px solid #333", color: "#fff", fontFamily: F.body, fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#555", display: "block", marginBottom: "6px" }}>Partnership Tier</label>
                  <select
                    value={enquiryForm.tier}
                    onChange={(e) => setEnquiryForm((p) => ({ ...p, tier: e.target.value }))}
                    style={{ width: "100%", padding: "10px 12px", backgroundColor: "#1a1a1a", border: "1px solid #333", color: enquiryForm.tier ? "#fff" : "#555", fontFamily: F.body, fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                  >
                    <option value="">Select a tier</option>
                    {PARTNERSHIP_TIERS.map((t) => (
                      <option key={t.code} value={t.name}>{t.code} — {t.name}</option>
                    ))}
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#555", display: "block", marginBottom: "6px" }}>Message</label>
                  <textarea
                    rows={4}
                    value={enquiryForm.message}
                    onChange={(e) => setEnquiryForm((p) => ({ ...p, message: e.target.value }))}
                    placeholder="Tell us about your business and requirements..."
                    style={{ width: "100%", padding: "10px 12px", backgroundColor: "#1a1a1a", border: "1px solid #333", color: "#fff", fontFamily: F.body, fontSize: "13px", outline: "none", resize: "vertical", boxSizing: "border-box" }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  style={{ fontFamily: F.mono, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", padding: "14px 28px", backgroundColor: "#fff", color: sending ? "#999" : "#111", border: "none", cursor: sending ? "not-allowed" : "pointer", alignSelf: "flex-start" }}
                >
                  {sending ? "SENDING…" : "Send Enquiry →"}
                </button>
                {sendError && (
                  <p style={{ fontFamily: F.mono, fontSize: "9px", color: "#c00", letterSpacing: "0.08em" }}>{sendError}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── RELATED ── */}
      <section style={{ borderTop: "1px solid #e2e2e2", padding: "56px 0" }}>
        <div className="container" style={{ padding: "0 20px" }}>
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "24px" }}>RELATED SERVICES</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))", gap: "16px" }}>
            {[
              { label: "Tailored Menswear", href: "/tailored-menswear", desc: "Browse the full collection" },
              { label: "Corporate Rewards", href: "/corporate-rewards", desc: "Bespoke for teams" },
              { label: "Concierge", href: "/concierge", desc: "Personal tailor matching" },
              { label: "Fabric Guides", href: "/tailor-guides/essential-guide-to-suit-fabrics", desc: "Understand your cloth" },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <div style={{ padding: "20px", border: "1px solid #e2e2e2", cursor: "pointer" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#111"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#e2e2e2"; }}
                >
                  <div style={{ fontFamily: F.display, fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#111", marginBottom: "6px" }}>{item.label}</div>
                  <div style={{ fontFamily: F.body, fontSize: "12px", color: "#888" }}>{item.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
