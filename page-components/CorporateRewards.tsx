"use client";
import { useSEO, SCHEMAS } from "@/hooks/useSEO";
/**
 * TAILOR.HK — CORPORATE REWARDS
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

const BENEFITS = [
  { label: "ACCOUNT DISCOUNT",  value: "Up to 20%",          note: "Based on annual volume" },
  { label: "MINIMUM ORDER",     value: "5 garments",         note: "Per account activation" },
  { label: "FITTING LOCATION",  value: "Office or atelier",  note: "We come to you" },
  { label: "LEAD TIME",         value: "4–6 weeks",          note: "Priority available" },
  { label: "ACCOUNT MANAGER",   value: "Dedicated contact",  note: "Single point of contact" },
  { label: "INVOICE TERMS",     value: "Net 30",             note: "For approved accounts" },
  { label: "PATTERN ARCHIVE",   value: "Permanent",          note: "All team members" },
  { label: "GIFT VOUCHERS",     value: "Available",          note: "For rewards programmes" },
];

const PROGRAMME_TYPES = ["Corporate Wardrobe Programme", "Executive Gifting", "Team Uniform", "Client Incentives", "Other"];

type FormState = "idle" | "submitting" | "success" | "error";

export default function CorporateRewards() {
  useSEO({
    title: "Corporate Tailoring & Rewards — Bespoke Suits for Business | Tailors.hk",
    description: "Tailors.hk's corporate tailoring programme for businesses in Hong Kong. Bespoke suits, branded uniforms, and executive wardrobe services for teams and client gifting.",
    canonical: "https://tailors.hk/corporate-rewards",
    keywords: "corporate tailoring Hong Kong, business suit Hong Kong, executive tailoring HK, corporate uniform Hong Kong",
    ogType: "website",
    schema: [
      SCHEMAS.breadcrumb([
        { name: "Home", url: "/" },
        { name: "Corporate Tailoring", url: "/corporate-rewards" },
      ]),
      SCHEMAS.speakable(["h1", "h2"]),
            {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Corporate Tailoring & Rewards",
        "provider": {"@type": "Organization", "name": "Tailors.hk"},
        "description": "Bespoke tailoring services for corporate clients in Hong Kong",
        "areaServed": "Hong Kong"
      }
    ],
  });

  const [form, setForm] = useState({
    name: "",
    company: "",
    role: "",
    email: "",
    phone: "",
    programme: "",
    teamSize: "",
    budget: "",
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
      `Corporate Tailoring Enquiry — Tailors.hk`,
      ``,
      `Name: ${form.name}`,
      form.company ? `Company: ${form.company}` : null,
      form.role ? `Role: ${form.role}` : null,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : null,
      form.programme ? `Programme: ${form.programme}` : null,
      form.teamSize ? `Team Size: ${form.teamSize}` : null,
      form.budget ? `Budget: ${form.budget}` : null,
      form.timeline ? `Timeline: ${form.timeline}` : null,
      form.notes ? `Notes: ${form.notes}` : null,
    ].filter(Boolean).join("\n");
    try {
      await emailjs.send(
        "service_4fsz82g",
        "template_rkwyske",
        { subject: `Corporate Enquiry — ${form.name}`, message, reply_to: form.email, from_name: form.name },
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
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/prqGrMlrEOEEDwqq.jpeg"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.4, pointerEvents: "none" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.88) 100%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#666", display: "block", marginBottom: "12px" }}>§ 06 · CORPORATE</span>
          <h1 style={{ fontFamily: F.display, fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", lineHeight: 1.05, marginBottom: "16px" }}>Corporate Rewards</h1>
          <p style={{ fontFamily: F.body, fontSize: "15px", lineHeight: 1.75, color: "#aaa", maxWidth: "560px" }}>Preferred rates, in-office fittings, and dedicated account management for firms across Hong Kong's financial and professional services sector.</p>
        </div>
      </section>

      {/* Programme Details */}
      <section style={{ padding: "64px 0", borderBottom: "1px solid #e2e2e2" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: "48px" }}>
            <div>
              <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "16px" }}>THE PROGRAMME</span>
              <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.8, color: "#666", marginBottom: "16px" }}>Our corporate programme is designed for firms that value their people and understand that a well-dressed team projects confidence, credibility, and professionalism.</p>
              <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.8, color: "#666", marginBottom: "16px" }}>We work with law firms, investment banks, consulting practices, and financial institutions across Hong Kong. In-office fittings mean your team spends minimal time away from their desks.</p>
              <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.8, color: "#666" }}>Gift vouchers are available for employee rewards, client gifts, and incentive programmes.</p>
            </div>
            <div>
              <div style={{ border: "1px solid #e2e2e2", padding: "28px" }}>
                <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", marginBottom: "20px", borderBottom: "1px solid #f0f0f0", paddingBottom: "12px" }}>CORPORATE PROGRAMME · TERMS</div>
                {BENEFITS.map((b) => (
                  <div key={b.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "10px 0", borderBottom: "1px solid #f5f5f5", gap: "16px" }}>
                    <div>
                      <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.08em", color: "#aaa" }}>{b.label}</div>
                      <div style={{ fontFamily: F.mono, fontSize: "9px", color: "#ccc", marginTop: "2px" }}>{b.note}</div>
                    </div>
                    <span style={{ fontFamily: F.display, fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", color: "#111", whiteSpace: "nowrap" }}>{b.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section style={{ padding: "72px 0", backgroundColor: "#111" }}>
        <div className="container">
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#555", display: "block", marginBottom: "12px" }}>CORPORATE ENQUIRY · ATELIER DIRECT</span>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", lineHeight: 1.1, marginBottom: "8px" }}>Set Up a Corporate Account</h2>
            <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.75, color: "#666", marginBottom: "40px" }}>Submit your details below and we will prepare a tailored proposal within 48 hours.</p>

            {formState === "success" ? (
              <div style={{ border: "1px solid #2a2a2a", padding: "40px", textAlign: "center" }}>
                <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", color: "#555", marginBottom: "12px" }}>ENQUIRY RECEIVED</div>
                <p style={{ fontFamily: F.body, fontSize: "14px", color: "#aaa", lineHeight: 1.75, marginBottom: "20px" }}>Your enquiry has been submitted. We will respond within 48 hours to discuss your requirements.</p>
                <button
                  onClick={() => { setFormState("idle"); setForm({ name: "", company: "", role: "", email: "", phone: "", programme: "", teamSize: "", budget: "", timeline: "", notes: "" }); }}
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
                    <label style={labelStyle}>Company *</label>
                    <input name="company" required value={form.company} onChange={handleChange} placeholder="Firm or organisation" style={inputStyle} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>Your Role</label>
                    <input name="role" value={form.role} onChange={handleChange} placeholder="e.g. HR Director" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address *</label>
                    <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" style={inputStyle} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>Phone / WhatsApp</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+852 ···" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Programme Type</label>
                    <select name="programme" value={form.programme} onChange={handleChange} style={{ ...inputStyle, appearance: "none" as const }}>
                      <option value="">Select type</option>
                      {PROGRAMME_TYPES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>Team Size</label>
                    <input name="teamSize" value={form.teamSize} onChange={handleChange} placeholder="e.g. 10–20 people" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Approximate Budget</label>
                    <input name="budget" value={form.budget} onChange={handleChange} placeholder="e.g. HK$100,000" style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Preferred Timeline</label>
                  <input name="timeline" value={form.timeline} onChange={handleChange} placeholder="e.g. Q3 2026 rollout" style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Additional Notes</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Garment types, branding requirements, or any other details"
                    style={{ ...inputStyle, resize: "vertical" as const, lineHeight: 1.6 }}
                  />
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", paddingTop: "8px" }}>
                  <p style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: "#444", margin: 0 }}>
                    ◆ ATELIER DIRECT · VOLUME PRICING FROM HK$8,800
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
          <ShareButton title="Corporate Rewards — Tailors.hk" text="Bespoke corporate tailoring programme for businesses in Hong Kong." variant="icon" scheme="light" />
        </div>
      </section>
      <Footer />
    </main>
  );
}
