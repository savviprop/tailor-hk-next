"use client";
import { useSEO, SCHEMAS } from "@/hooks/useSEO";
/**
 * TAILOR.HK — CONCIERGE PAGE
 * Design: Technical editorial — same design system as site
 * Purpose: Personalised tailor matching service with enquiry form
 */
import { useState, useEffect } from "react";
import { Link } from "@/lib/wouter-shim";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
// SEO handled by generateMetadata in page.tsx
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID  = "service_4fsz82g";
const EMAILJS_TEMPLATE_ID = "template_rkwyske";
const EMAILJS_PUBLIC_KEY  = "pPJMTC_ZpirSxcVr9";

const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body: '"Barlow", Arial, sans-serif',
  mono: '"JetBrains Mono", "Courier New", monospace',
};

const HERO_IMG =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=85&fit=crop";

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Submit Your Brief",
    desc: "Complete the concierge form with your tailoring requirements, budget, timeline, and style preferences. Takes under two minutes.",
  },
  {
    num: "02",
    title: "Expert Review",
    desc: "Our team reviews your brief against the index — assessed on craftsmanship, fabric standards, pricing, and client experience.",
  },
  {
    num: "03",
    title: "Matched Shortlist",
    desc: "Within 24 hours you receive a shortlist of two to three houses best suited to your requirements, with notes on why each was selected.",
  },
  {
    num: "04",
    title: "Introduction & Appointment",
    desc: "We facilitate a direct introduction and, where requested, accompany you to the first consultation. No fees. No commissions. Independent advice.",
  },
];

const CONSTRUCTION_DATA = [
  { label: "Fused / Glued Interlining", pct: 90, note: "Dominant in RTW and most branded suits. Susceptible to delamination and bubbling over time." },
  { label: "Half Canvas", pct: 9, note: "Upper-mid-tier MTM. Improved drape in chest and lapels. Hybrid of canvas and fused construction." },
  { label: "Full Hand-Padded Canvas", pct: 1, note: "The bespoke benchmark. Floating horsehair canvas hand-stitched throughout. Conforms to the body over decades." },
];

export default function Concierge() {
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  useSEO({
    title: "Tailoring Concierge — Private Client Access | Tailors.hk",
    description: "Private access to world-class handcrafted tailoring at atelier direct rates. Tailors.hk guides you from brief to finished garment — a world-leading atelier serving private clients directly.",
    canonical: "https://tailors.hk/concierge",
    keywords: "tailor concierge Hong Kong, find best tailor HK, personal tailor service Hong Kong, bespoke consultation",
    ogType: "website",
    schema: [
      SCHEMAS.breadcrumb([
        { name: "Home", url: "/" },
        { name: "Tailoring Concierge", url: "/concierge" },
      ]),
      SCHEMAS.speakable(["h1", "h2"]),
            {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Tailoring Concierge",
        "provider": {"@type": "Organization", "name": "Tailors.hk"},
        "description": "Private client access to world-leading handcrafted tailoring at atelier direct rates. From brief to finished garment."
      }
    ],
  });

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    tailoring: [] as string[],
    budget: "",
    timeline: "",
    notes: "",

  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const toggleCheck = (field: "tailoring", value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendError(null);
    const body = [
      `Concierge Enquiry`,
      ``,
      `Name: ${form.firstName} ${form.lastName}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || "—"}`,
      `Tailoring: ${form.tailoring.join(", ") || "—"}`,
      `Budget: ${form.budget || "—"}`,
      `Timeline: ${form.timeline || "—"}`,
      `Notes: ${form.notes || "—"}`,
    ].join("\n");
    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        subject:   `Concierge Enquiry — ${form.firstName} ${form.lastName}`,
        reply_to:  form.email,
        from_name: `${form.firstName} ${form.lastName}`,
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
    <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      <Navigation />

      {/* ── Hero ── */}
      <section style={{ position: "relative", height: "60vh", minHeight: "400px", overflow: "hidden", backgroundColor: "#111" }}>
        <img
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/ELTmQJGEAkQMOFIc.png"
          alt="Tailors.hk Concierge"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)" }} />
        <div className="container" style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: "48px" }}>
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.15em", color: "#888", display: "block", marginBottom: "12px" }}>
            TAILOR.HK · CONCIERGE SERVICE
          </span>
          <h1 style={{ fontFamily: F.display, fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#fff", lineHeight: 1.05, margin: 0 }}>
            Tailoring Concierge<br />Hong Kong
          </h1>
          <p style={{ fontFamily: F.body, fontSize: "15px", color: "rgba(255,255,255,0.65)", marginTop: "16px", maxWidth: "520px", lineHeight: 1.7 }}>
            Direct access to world-class handcrafted tailoring at atelier rates. Our concierge team guides you from brief to finished garment — with no retail intermediary.
          </p>
        </div>
      </section>

      {/* ── Value proposition ── */}
      <section style={{ padding: "80px 0", borderBottom: "1px solid #e2e2e2" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))", gap: "0" }}>
            {[
              { label: "Zero Fees", desc: "Our concierge service is entirely complimentary. No commissions. No hidden charges." },
              { label: "Direct Access", desc: "As a world-leading atelier, we offer private clients access to the same fine craft production we deliver to major international tailoring houses." },
              { label: "Atelier Rates", desc: "Suits from HK$12,800 — comparable garments retail at HK$30,000–50,000 through conventional channels." },
              { label: "25 Years", desc: "Serving Hong Kong's executives, diplomats, and corporate institutions since 1998." },
            ].map((item, i) => (
              <div key={item.label} style={{
                padding: "32px 28px",
                borderRight: i < 3 ? "1px solid #e2e2e2" : "none",
                borderLeft: i === 0 ? "none" : undefined,
              }}>
                <h3 style={{ fontFamily: F.display, fontSize: "20px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#111", marginBottom: "10px" }}>
                  {item.label}
                </h3>
                <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.75, color: "#777", margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section style={{ padding: "80px 0", borderBottom: "1px solid #e2e2e2", backgroundColor: "#fafafa" }}>
        <div className="container">
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.15em", color: "#aaa", display: "block", marginBottom: "12px" }}>
            § 01 · HOW IT WORKS
          </span>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", marginBottom: "48px" }}>
            The Concierge Process
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))", gap: "32px" }}>
            {PROCESS_STEPS.map((step) => (
              <div key={step.num}>
                <span style={{ fontFamily: F.mono, fontSize: "28px", color: "#e8e8e8", display: "block", marginBottom: "12px", letterSpacing: "-0.02em" }}>
                  {step.num}
                </span>
                <h3 style={{ fontFamily: F.display, fontSize: "16px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#111", marginBottom: "8px" }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.75, color: "#777", margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main: Form + Construction data ── */}
      <section style={{ padding: "80px 0", borderBottom: "1px solid #e2e2e2" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "32px" : "80px", alignItems: "start" }}>

            {/* Left: Form */}
            <div>
              <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.15em", color: "#aaa", display: "block", marginBottom: "12px" }}>
                § 02 · CONCIERGE FORM
              </span>
              <h2 style={{ fontFamily: F.display, fontSize: "28px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", marginBottom: "8px" }}>
                Request Your Tailor Match
              </h2>
              <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.75, color: "#777", marginBottom: "32px" }}>
                Complete the form below. We will review your brief and respond within 24 hours with a personalised shortlist.
              </p>

              {submitted ? (
                <div style={{ border: "1px solid #111", padding: "32px", textAlign: "center" }}>
                  <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.15em", color: "#aaa", display: "block", marginBottom: "12px" }}>ENQUIRY RECEIVED</span>
                  <h3 style={{ fontFamily: F.display, fontSize: "22px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", marginBottom: "8px" }}>
                    Thank You
                  </h3>
                  <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.75, color: "#777" }}>
                    Your concierge request has been sent. We will be in touch within 24 hours with your personalised tailor shortlist.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* Name */}
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "12px" }}>
                    {(["firstName", "lastName"] as const).map((field) => (
                      <div key={field}>
                        <label style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#888", display: "block", marginBottom: "6px" }}>
                          {field === "firstName" ? "FIRST NAME" : "LAST NAME"}
                        </label>
                        <input
                          type="text"
                          value={form[field]}
                          onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))}
                          style={{ width: "100%", border: "1px solid #ddd", padding: "10px 12px", fontFamily: F.body, fontSize: "13px", color: "#111", outline: "none", backgroundColor: "#fafafa", boxSizing: "border-box" }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Email + Phone */}
                  {[
                    { field: "email" as const, label: "EMAIL", type: "email" },
                    { field: "phone" as const, label: "PHONE (INCL. COUNTRY CODE)", type: "tel" },
                  ].map(({ field, label, type }) => (
                    <div key={field}>
                      <label style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#888", display: "block", marginBottom: "6px" }}>{label}</label>
                      <input
                        type={type}
                        value={form[field]}
                        onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))}
                        style={{ width: "100%", border: "1px solid #ddd", padding: "10px 12px", fontFamily: F.body, fontSize: "13px", color: "#111", outline: "none", backgroundColor: "#fafafa", boxSizing: "border-box" }}
                      />
                    </div>
                  ))}

                  {/* Tailoring type */}
                  <div>
                    <label style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#888", display: "block", marginBottom: "10px" }}>TAILORING REQUIRED</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px" }}>
                      {["Business Suits", "Business Casual", "Dress Shirts", "Evening Wear", "Wedding Attire", "Overcoat", "Trousers", "Other"].map((item) => (
                        <label key={item} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                          <input
                            type="checkbox"
                            checked={form.tailoring.includes(item)}
                            onChange={() => toggleCheck("tailoring", item)}
                            style={{ accentColor: "#111" }}
                          />
                          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.06em", color: "#555" }}>{item.toUpperCase()}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#888", display: "block", marginBottom: "6px" }}>ANNUAL WARDROBE BUDGET</label>
                    <p style={{ fontFamily: F.mono, fontSize: "8px", color: "#bbb", marginBottom: "10px", lineHeight: 1.6 }}>
                      True bespoke and hand-crafted tailoring typically requires an initial investment of HK$8,000+ per garment.
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {["HK$8,000 – 15,000", "HK$15,000 – 30,000", "HK$30,000 – 60,000", "HK$60,000 – 100,000", "HK$100,000+"].map((b) => (
                        <label key={b} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                          <input
                            type="radio"
                            name="budget"
                            value={b}
                            checked={form.budget === b}
                            onChange={() => setForm((p) => ({ ...p, budget: b }))}
                            style={{ accentColor: "#111" }}
                          />
                          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.06em", color: "#555" }}>{b}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <label style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#888", display: "block", marginBottom: "6px" }}>REQUIRED COMPLETION DATE</label>
                    <p style={{ fontFamily: F.mono, fontSize: "8px", color: "#bbb", marginBottom: "10px", lineHeight: 1.6 }}>
                      True bespoke tailoring requires multiple fittings and at least 4–8 weeks. Expedited services are available.
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {["Within 5–10 days", "Within 2–3 weeks", "Within 1 month", "Within 2 months", "No rush"].map((t) => (
                        <label key={t} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                          <input
                            type="radio"
                            name="timeline"
                            value={t}
                            checked={form.timeline === t}
                            onChange={() => setForm((p) => ({ ...p, timeline: t }))}
                            style={{ accentColor: "#111" }}
                          />
                          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.06em", color: "#555" }}>{t.toUpperCase()}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#888", display: "block", marginBottom: "6px" }}>NOTES</label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                      placeholder="Please share any specific details — occasion, style preferences, body considerations, or current tailor experience."
                      rows={4}
                      style={{ width: "100%", border: "1px solid #ddd", padding: "10px 12px", fontFamily: F.body, fontSize: "13px", color: "#111", outline: "none", backgroundColor: "#fafafa", resize: "vertical", boxSizing: "border-box" }}
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={sending}
                      style={{
                        backgroundColor: sending ? "#555" : "#111", color: "#fff", border: "none",
                        padding: "14px 28px", fontFamily: F.mono, fontSize: "10px",
                        letterSpacing: "0.15em", cursor: sending ? "not-allowed" : "pointer", textTransform: "uppercase",
                        marginTop: "8px", transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) => { if (!sending) e.currentTarget.style.backgroundColor = "#333"; }}
                      onMouseLeave={(e) => { if (!sending) e.currentTarget.style.backgroundColor = "#111"; }}
                    >
                      {sending ? "SENDING…" : "Request Tailor Match →"}
                    </button>
                    {sendError && (
                      <p style={{ fontFamily: F.mono, fontSize: "9px", color: "#c00", marginTop: "8px", letterSpacing: "0.08em" }}>{sendError}</p>
                    )}
                    <p style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#aaa", marginTop: "10px", textTransform: "uppercase" }}>
                      ◆ Atelier Direct · Handcrafted to Order · From HK$12,800
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Right: Market overview + construction data */}
            <div>
              <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.15em", color: "#aaa", display: "block", marginBottom: "12px" }}>
                § 03 · MARKET OVERVIEW
              </span>
              <h2 style={{ fontFamily: F.display, fontSize: "28px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", marginBottom: "8px" }}>
                Hong Kong<br />Construction Quality
              </h2>
              <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.75, color: "#777", marginBottom: "32px" }}>
                Of all suits sold in Hong Kong, only 1% are constructed to true bespoke standards.
                Understanding construction method is the single most important factor in evaluating tailoring quality.
              </p>

              {CONSTRUCTION_DATA.map((item, i) => (
                <div key={item.label} style={{ marginBottom: "24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
                    <span style={{ fontFamily: F.display, fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111" }}>
                      {item.label}
                    </span>
                    <span style={{ fontFamily: F.mono, fontSize: "11px", color: i === 2 ? "#111" : "#aaa", fontWeight: i === 2 ? "700" : "400" }}>
                      {item.pct}%
                    </span>
                  </div>
                  {/* Bar */}
                  <div style={{ height: "3px", backgroundColor: "#f0f0f0", marginBottom: "8px" }}>
                    <div style={{ height: "100%", width: `${item.pct}%`, backgroundColor: i === 2 ? "#111" : i === 1 ? "#888" : "#ccc", transition: "width 0.6s" }} />
                  </div>
                  <p style={{ fontFamily: F.mono, fontSize: "9px", lineHeight: 1.65, color: "#aaa", margin: 0 }}>
                    {item.note}
                  </p>
                </div>
              ))}

              <div style={{ borderTop: "1px solid #e2e2e2", paddingTop: "24px", marginTop: "8px" }}>
                <p style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.06em", color: "#bbb", lineHeight: 1.7 }}>
                  DATA · TAILOR.HK CONSTRUCTION INDEX · UPDATED 2025
                </p>
              </div>

              {/* Entrusted by block */}
              <div style={{ marginTop: "40px", backgroundColor: "#111", padding: "28px" }}>
                <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#555", display: "block", marginBottom: "12px" }}>
                  ENTRUSTED BY
                </span>
                <p style={{ fontFamily: F.display, fontSize: "18px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#fff", lineHeight: 1.3, marginBottom: "16px" }}>
                  Hong Kong's Professional &<br />Corporate Community
                </p>
                <p style={{ fontFamily: F.body, fontSize: "12px", lineHeight: 1.75, color: "#888", marginBottom: "20px" }}>
                  For over 25 years, Hong Kong's leading executives, diplomats, government officials,
                  and corporate institutions have entrusted us with their tailoring procurement needs.
                  Our vendor list reflects authentic, functional standards — setting the benchmark
                  for tailoring excellence in Hong Kong.
                </p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {["Forbes Five-Star Hotels", "Diplomatic Services", "Financial Institutions", "Royal Household Suppliers"].map((client) => (
                    <span key={client} style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.08em", color: "#555", border: "1px solid #333", padding: "4px 8px" }}>
                      {client.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Corporate rates CTA */}
              <div style={{ marginTop: "24px", border: "1px solid #e2e2e2", padding: "20px" }}>
                <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#aaa", display: "block", marginBottom: "8px" }}>
                  CORPORATE PROGRAMME
                </span>
                <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.75, color: "#555", marginBottom: "14px" }}>
                  Outfitting a team? Access exclusive corporate rates and dedicated account management for organisations of all sizes.
                </p>
                <Link href="/corporate-rewards">
                  <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", color: "#111", textDecoration: "underline", cursor: "pointer" }}>
                    VIEW CORPORATE PROGRAMME →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Procurement benefits ── */}
      <section style={{ padding: "80px 0", borderBottom: "1px solid #e2e2e2", backgroundColor: "#fafafa" }}>
        <div className="container">
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.15em", color: "#aaa", display: "block", marginBottom: "12px" }}>
            § 04 · PROCUREMENT ADVANTAGES
          </span>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", marginBottom: "48px" }}>
            Why Use the Concierge
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: "32px" }}>
            {[
              {
                num: "1.",
                title: "Direct Workshop Access",
                desc: "Bypass retail markups entirely. Our concierge connects you directly with the workshop, ensuring your investment goes into craftsmanship rather than overheads.",
              },
              {
                num: "2.",
                title: "End-to-End Procurement Control",
                desc: "From fabric selection to final fitting, we manage the entire process on your behalf. Specifications, quality checks, and delivery schedules are all handled by our team.",
              },
              {
                num: "3.",
                title: "Scalable Craftsmanship",
                desc: "Whether you require a single commission or a full corporate wardrobe programme, our network scales to meet demand without compromising on quality.",
              },
            ].map((item) => (
              <div key={item.num} style={{ borderTop: "2px solid #111", paddingTop: "20px" }}>
                <span style={{ fontFamily: F.mono, fontSize: "10px", letterSpacing: "0.1em", color: "#bbb", display: "block", marginBottom: "8px" }}>{item.num}</span>
                <h3 style={{ fontFamily: F.display, fontSize: "18px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", marginBottom: "10px" }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.75, color: "#777", margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
