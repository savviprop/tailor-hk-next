"use client";
import { useSEO, SCHEMAS } from "@/hooks/useSEO";
/**
 * TAILOR.HK — EXECUTIVE TAILORING
 * Design: Technical editorial — dark, precise, minimal
 */
import { useState } from "react";
import emailjs from "@emailjs/browser";
import ShareButton from "@/components/ShareButton";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
// SEO handled by generateMetadata in page.tsx

const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body:    '"Barlow", Arial, sans-serif',
  mono:    '"JetBrains Mono", "Courier New", monospace',
};

const SERVICES = [
  { num: "01", label: "WARDROBE AUDIT", desc: "A comprehensive review of your existing wardrobe. We identify gaps, redundancies, and opportunities to build a more coherent professional wardrobe." },
  { num: "02", label: "SEASONAL PLANNING", desc: "A structured approach to building your wardrobe across Hong Kong's seasons. We plan fabric weights, colours, and garment types for maximum versatility." },
  { num: "03", label: "IN-OFFICE FITTINGS", desc: "We come to you. Fittings can be arranged at your office, minimising disruption to your schedule." },
  { num: "04", label: "PRIORITY PRODUCTION", desc: "Executive clients receive priority scheduling in our production queue. Expedited delivery available for urgent requirements." },
  { num: "05", label: "PATTERN ARCHIVE", desc: "Your measurements and pattern are maintained on file indefinitely. Reorders can be fulfilled with a single fitting or none at all." },
];

const GARMENT_TYPES = ["Bespoke Suit", "Made-to-Measure Suit", "Dress Shirt", "Overcoat", "Trousers", "Waistcoat", "Other"];

type FormState = "idle" | "submitting" | "success" | "error";

export default function ExecutiveTailoring() {
  useSEO({
    title: "Executive Tailoring — Atelier Direct Rates for Professionals | Tailors.hk",
    description: "Handcrafted bespoke suits for Hong Kong's business professionals at atelier direct rates. From a world-leading atelier — suits from HK$12,800, access fine craft directly.",
    canonical: "https://tailors.hk/executive-tailoring",
    keywords: "executive tailoring Hong Kong, bespoke suit professional HK, premium suit Hong Kong, business wardrobe Hong Kong",
    ogType: "website",
    schema: [
      SCHEMAS.breadcrumb([
        { name: "Home", url: "/" },
        { name: "Executive Tailoring", url: "/executive-tailoring" },
      ]),
      SCHEMAS.speakable(["h1", "h2"]),
            {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Executive Tailoring",
        "provider": {"@type": "Organization", "name": "Tailors.hk"},
        "description": "Handcrafted bespoke tailoring at atelier direct rates for Hong Kong's business professionals. Access fine craft from a world-leading atelier, directly.",
        "areaServed": "Hong Kong"
      }
    ],
  });

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    garment: "",
    quantity: "",
    timeline: "",
    notes: "",
  });
  const [formState, setFormState] = useState<FormState>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    const message = [
      `Executive Tailoring Enquiry — Tailors.hk`,
      ``,
      `Name: ${form.name}`,
      form.company ? `Company: ${form.company}` : null,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : null,
      form.garment ? `Garment: ${form.garment}` : null,
      form.quantity ? `Quantity: ${form.quantity}` : null,
      form.timeline ? `Timeline: ${form.timeline}` : null,
      form.notes ? `Notes: ${form.notes}` : null,
    ].filter(Boolean).join("\n");
    try {
      await emailjs.send(
        "service_4fsz82g",
        "template_rkwyske",
        { subject: `Executive Tailoring Enquiry — ${form.name}`, message, reply_to: form.email, from_name: form.name },
        "pPJMTC_ZpirSxcVr9"
      );
      setFormState("success");
    } catch {
      setFormState("idle");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: 0,
    padding: "12px 14px",
    fontFamily: F.body,
    fontSize: "13px",
    color: "#e0e0e0",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: F.mono,
    fontSize: "8px",
    letterSpacing: "0.12em",
    color: "#666",
    textTransform: "uppercase" as const,
    display: "block",
    marginBottom: "6px",
  };

  return (
    <main style={{ backgroundColor: "#fff", overflowX: "hidden" }}>
      <Navigation />

      {/* Hero */}
      <section style={{ position: "relative", borderBottom: "1px solid #1a1a1a", padding: "100px 0 60px", background: "#111", color: "#fff", overflow: "hidden" }}>
        <img
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/TkBztkkzndumsmvs.jpeg"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.4, pointerEvents: "none" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.88) 100%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#666", display: "block", marginBottom: "12px" }}>§ 05 · EXECUTIVE</span>
          <h1 style={{ fontFamily: F.display, fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", lineHeight: 1.05, marginBottom: "16px" }}>Executive Tailoring</h1>
          <p style={{ fontFamily: F.body, fontSize: "15px", lineHeight: 1.75, color: "#aaa", maxWidth: "560px" }}>A dedicated service for senior professionals. World-leading handcrafted production at atelier direct rates — discreet, efficient, and uncompromising in quality.</p>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: "64px 0", borderBottom: "1px solid #e2e2e2" }}>
        <div className="container">
          <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", marginBottom: "40px" }}>EXECUTIVE SERVICE COMPONENTS</div>
          {SERVICES.map((s, i) => (
            <div key={s.num} style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: "24px", padding: "28px 0", borderBottom: i < SERVICES.length - 1 ? "1px solid #f0f0f0" : "none" }}>
              <span style={{ fontFamily: F.mono, fontSize: "11px", letterSpacing: "0.06em", color: "#ccc", paddingTop: "2px" }}>{s.num}</span>
              <div>
                <div style={{ fontFamily: F.display, fontSize: "13px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#111", marginBottom: "8px" }}>{s.label}</div>
                <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.75, color: "#666", margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enquiry Form */}
      <section style={{ padding: "72px 0", backgroundColor: "#111" }}>
        <div className="container">
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#555", display: "block", marginBottom: "12px" }}>EXECUTIVE ENQUIRY · ATELIER DIRECT</span>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", lineHeight: 1.1, marginBottom: "8px" }}>Submit an Enquiry</h2>
            <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.75, color: "#666", marginBottom: "40px" }}>All enquiries are handled with complete discretion. A consultant will respond within one business day.</p>

            {formState === "success" ? (
              <div style={{ border: "1px solid #2a2a2a", padding: "40px", textAlign: "center" }}>
                <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", color: "#555", marginBottom: "12px" }}>ENQUIRY RECEIVED</div>
                <p style={{ fontFamily: F.body, fontSize: "14px", color: "#aaa", lineHeight: 1.75, marginBottom: "20px" }}>Your enquiry has been submitted. We will respond within one business day to arrange a private consultation.</p>
                <button
                  onClick={() => { setFormState("idle"); setForm({ name: "", company: "", email: "", phone: "", garment: "", quantity: "", timeline: "", notes: "" }); }}
                  style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#666", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
                >
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input name="name" required value={form.name} onChange={handleChange} placeholder="Your name" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Company</label>
                    <input name="company" value={form.company} onChange={handleChange} placeholder="Firm or organisation" style={inputStyle} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>Email Address *</label>
                    <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone / WhatsApp</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+852 ···" style={inputStyle} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>Garment Type</label>
                    <select name="garment" value={form.garment} onChange={handleChange} style={{ ...inputStyle, appearance: "none" as const }}>
                      <option value="">Select garment</option>
                      {GARMENT_TYPES.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Quantity</label>
                    <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="e.g. 1–3 suits" style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Preferred Timeline</label>
                  <input name="timeline" value={form.timeline} onChange={handleChange} placeholder="e.g. Required by end of quarter" style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Additional Notes</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Fabric preferences, fitting requirements, or any other details"
                    style={{ ...inputStyle, resize: "vertical" as const, lineHeight: 1.6 }}
                  />
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", paddingTop: "8px" }}>
                  <p style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: "#444", margin: 0 }}>
                    ◆ ATELIER DIRECT · FROM HK$12,800
                  </p>
                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    style={{
                      fontFamily: F.mono,
                      fontSize: "9px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      background: "#fff",
                      color: "#111",
                      border: "none",
                      padding: "14px 32px",
                      cursor: formState === "submitting" ? "not-allowed" : "pointer",
                      opacity: formState === "submitting" ? 0.6 : 1,
                      transition: "opacity 0.15s",
                    }}
                  >
                    {formState === "submitting" ? "Submitting…" : "Submit Enquiry →"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Share */}
      <section style={{ padding: "32px 0", borderTop: "1px solid #e5e5e5" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa" }}>SHARE THIS PAGE</span>
          <ShareButton title="Executive Tailoring — Tailors.hk" text="Bespoke executive tailoring for professionals in Hong Kong." variant="icon" scheme="light" />
        </div>
      </section>
      <Footer />
    </main>
  );
}
