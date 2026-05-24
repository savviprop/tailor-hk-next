"use client";
import { useSEO, SCHEMAS } from "@/hooks/useSEO";
/**
 * TAILORS.HK — CONTACT / THE BRIEF
 * Design: Technical editorial — enquiry-type selector drives contextual form + info panel.
 * Typography: Barlow Condensed display / Barlow body / JetBrains Mono labels
 */
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
// SEO handled by generateMetadata in page.tsx
import RrpTooltip from "@/components/RrpTooltip";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID  = "service_4fsz82g";
const EMAILJS_TEMPLATE_ID = "template_rkwyske";
const EMAILJS_PUBLIC_KEY  = "pPJMTC_ZpirSxcVr9";

const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body:    '"Barlow", Arial, sans-serif',
  mono:    '"JetBrains Mono", "Courier New", monospace',
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  border: "1px solid #d8d8d8",
  borderRadius: 0,
  fontFamily: F.mono,
  fontSize: "10px",
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color: "#111",
  outline: "none",
  backgroundColor: "#fafafa",
  boxSizing: "border-box",
  transition: "border-color 0.15s",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "none" as const,
  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23999' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 14px center",
  paddingRight: "36px",
};

type EnquiryType = "bespoke" | "mtm" | "corporate" | "wardrobe" | "general";

const ENQUIRY_TYPES: { id: EnquiryType; label: string; sub: string }[] = [
  { id: "bespoke",   label: "BESPOKE COMMISSION",     sub: "FULL PATTERN · 3–5 FITTINGS · FROM HK$12,800" },
  { id: "mtm",       label: "MADE-TO-MEASURE",        sub: "HANDCRAFTED · 4–6 WEEK TURNAROUND" },
  { id: "corporate", label: "CORPORATE & VOLUME",     sub: "3+ SUITS · VOLUME RATES FROM HK$8,800" },
  { id: "wardrobe",  label: "WARDROBE CONSULTANCY",   sub: "STRATEGIC WARDROBE PLANNING" },
  { id: "general",   label: "GENERAL ENQUIRY",        sub: "ANY OTHER QUESTION" },
];

const CONTEXT: Record<EnquiryType, { heading: string; body: string; steps?: { n: string; t: string }[]; stats?: { v: string; l: string }[] }> = {
  bespoke: {
    heading: "BESPOKE COMMISSION",
    body: "A bespoke commission begins with a blank sheet. Your pattern is drafted entirely to your measurements — no block, no adjustment, no compromise. Full floating canvas construction, hand-padded lapels, pick-stitched edges. Three to five fittings over 8–12 weeks. Atelier Direct rates begin from HK$12,800 — the same craft as the world’s leading ready-to-wear labels, available directly to the private client.",
    steps: [
      { n: "01", t: "Submit your brief — occasion, cloth, silhouette preference" },
      { n: "02", t: "Private consultation — measurement and pattern draft" },
      { n: "03", t: "First fitting — canvas baste, structural assessment" },
      { n: "04", t: "Second and third fittings — refinement and balance" },
      { n: "05", t: "Final fitting and collection" },
    ],
    stats: [
      { v: "HK$12,800", l: "Atelier Direct rate from" },
      { v: "3–5", l: "Fittings included" },
      { v: "8–12 WKS", l: "Lead time" },
    ],
  },
  mtm: {
    heading: "MADE-TO-MEASURE",
    body: "Made-to-Measure uses a proven block pattern adjusted to your proportions — the same handcrafted construction as our bespoke programme, delivered in a shorter timeframe. Full canvas, hand-finished throughout. One fitting. Ideal for professionals who require a precise, handcrafted result within a defined schedule. Same atelier direct rates as bespoke — the difference is service, not quality.",
    steps: [
      { n: "01", t: "Consultation and measurement — 45 minutes" },
      { n: "02", t: "Cloth selection from our mill portfolio" },
      { n: "03", t: "Production — 4–6 weeks, fully handcrafted" },
      { n: "04", t: "Single fitting and collection" },
    ],
    stats: [
      { v: "HK$12,800", l: "MTM suit from" },
      { v: "4–6 WKS", l: "Turnaround" },
      { v: "1", l: "Fitting included" },
    ],
  },
  corporate: {
    heading: "CORPORATE & VOLUME PROGRAMME",
    body: "Tailors.hk offers a dedicated corporate programme for companies requiring consistent, handcrafted suiting across teams. Volume rates apply from a minimum of three suits. Each garment is individually measured and handcrafted — no compromise on construction for volume. Suitable for financial institutions, law firms, hospitality groups, and executive teams.",
    steps: [
      { n: "01", t: "Corporate brief — number of suits, timeline, budget" },
      { n: "02", t: "On-site or atelier measurement sessions" },
      { n: "03", t: "Cloth and specification sign-off" },
      { n: "04", t: "Production and staged delivery" },
    ],
    stats: [
      { v: "HK$8,800", l: "Volume rate from (min. 3)" },
      { v: "3+", l: "Minimum order" },
      { v: "6–8 WKS", l: "Corporate lead time" },
    ],
  },
  wardrobe: {
    heading: "WARDROBE CONSULTANCY",
    body: "A strategic wardrobe review with one of our consultants — assessing your current wardrobe, identifying gaps, and building a commission plan aligned to your professional and personal occasions. Covers suiting, shirting, outerwear, and accessories. The session results in a prioritised wardrobe brief and a phased commission schedule.",
    steps: [
      { n: "01", t: "Initial consultation — lifestyle, occasions, existing wardrobe" },
      { n: "02", t: "Wardrobe audit and gap analysis" },
      { n: "03", t: "Commission plan — phased by priority and budget" },
      { n: "04", t: "Ongoing wardrobe management — seasonal reviews" },
    ],
    stats: [
      { v: "90 MIN", l: "Initial session" },
      { v: "PHASED", l: "Commission plan" },
      { v: "ONGOING", l: "Wardrobe management" },
    ],
  },
  general: {
    heading: "GENERAL ENQUIRY",
    body: "For any question not covered by the above — fabric sourcing, press enquiries, trade accounts, or anything else. We respond to all enquiries within one business day. For the fastest response, use WhatsApp.",
    stats: [
      { v: "1 DAY", l: "Response time" },
      { v: "MON–SAT", l: "Operating hours" },
      { v: "HKT", l: "Timezone" },
    ],
  },
};

const CLOTH_PREFS = ["No preference", "Wool (VBC / Loro Piana)", "Cashmere blend", "Linen / Summer weight", "Heavy tweed / Flannel", "Loro Piana ultra-luxury (by arrangement)"];
const TIMELINES   = ["As soon as possible", "Within 4 weeks", "Within 8 weeks", "Within 3 months", "No fixed deadline"];
const BUDGETS     = ["HK$12,800–18,000", "HK$18,000–28,000", "HK$28,000–50,000", "HK$50,000–100,000", "HK$100,000+", "To be discussed"];
const SUIT_COUNTS = ["3–5 suits", "6–10 suits", "11–20 suits", "20+ suits"];
const APPT_TIMES  = ["Weekday Morning (10:00–13:00)", "Weekday Afternoon (13:00–17:00)", "Weekday Evening (17:00–19:00)", "Saturday Morning (10:00–13:00)", "Saturday Afternoon (13:00–17:00)", "Flexible"];

export default function Contact() {
  useSEO({
    title: "Submit a Brief — Atelier Direct Enquiries | Tailors.hk",
    description: "Submit a tailoring brief for Atelier Direct access, bespoke commission, made-to-measure, corporate volume, or wardrobe consultancy. World-leading handcrafted suiting from HK$12,800.",
    canonical: "https://tailors.hk/contact",
    keywords: "contact tailor Hong Kong, bespoke suit consultation Hong Kong, atelier direct enquiry, corporate tailoring Hong Kong",
    ogType: "website",
    schema: [
      SCHEMAS.breadcrumb([
        { name: "Home", url: "/" },
        { name: "Submit a Brief", url: "/contact" },
      ]),
      SCHEMAS.speakable(["h1", "h2"]),
            {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Submit a Brief — Tailors.hk",
        "description": "Enquiry page for Atelier Direct access, bespoke commissions, made-to-measure, corporate tailoring, and wardrobe consultancy.",
        "url": "https://tailors.hk/contact",
      }
    ],
  });

  const [enquiryType, setEnquiryType] = useState<EnquiryType>(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("type");
    const valid: EnquiryType[] = ["bespoke", "mtm", "corporate", "wardrobe", "general"];
    if (raw === "atelier") return "bespoke";
    return valid.includes(raw as EnquiryType) ? (raw as EnquiryType) : "bespoke";
  });
  const [form, setForm] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const qGarment      = params.get("garment") ?? "";
    const qConstruction = params.get("construction") ?? "";
    const qFabric       = params.get("fabric") ?? "";
    const qLow          = params.get("low") ?? "";
    const qHigh         = params.get("high") ?? "";
    // Build pre-filled message from quiz params
    const quizMessage = qGarment
      ? `From the pricing guide:\nGarment: ${qGarment}\nConstruction: ${qConstruction}\nFabric: ${qFabric}${qLow && qHigh ? `\nAtelier Direct rate: HK$${Number(qLow).toLocaleString("en-HK")} – HK$${Number(qHigh).toLocaleString("en-HK")}` : ""}`
      : "";
    // Map quiz price range to budget dropdown
    const low = Number(qLow);
    const budget = !low ? "To be discussed"
      : low < 18000  ? "HK$12,800–18,000"
      : low < 28000  ? "HK$18,000–28,000"
      : low < 50000  ? "HK$28,000–50,000"
      : low < 100000 ? "HK$50,000–100,000"
      : "HK$100,000+";
    return {
      name: "", email: "", phone: "", company: "",
      garment: "Bespoke Suit", cloth: "No preference",
      suitCount: "3–5 suits", timeline: "No fixed deadline",
      budget, appointment: "Flexible",
      wardrobeGoals: "", message: quizMessage,
    };
  });
  const [sent, setSent] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const ctx = CONTEXT[enquiryType];

  const buildEmailBody = () => {
    const label = ENQUIRY_TYPES.find(e => e.id === enquiryType)?.label ?? "Enquiry";
    const lines: string[] = [
      `New enquiry — ${label}`,
      ``,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
    ];
    if (form.phone) lines.push(`Phone: ${form.phone}`);
    if (enquiryType === "corporate" && form.company) lines.push(`Company: ${form.company}`);
    if (enquiryType === "corporate") lines.push(`Suits: ${form.suitCount}`);
    if (["bespoke","mtm"].includes(enquiryType)) lines.push(`Cloth: ${form.cloth}`);
    if (enquiryType !== "general") lines.push(`Timeline: ${form.timeline}`);
    if (["bespoke","mtm","corporate"].includes(enquiryType)) lines.push(`Budget: ${form.budget}`);
    if (enquiryType === "wardrobe" && form.wardrobeGoals) lines.push(`Wardrobe goals: ${form.wardrobeGoals}`);
    lines.push(`Appointment: ${form.appointment}`);
    if (form.message) { lines.push(""); lines.push(form.message); }
    return lines.join("\n");
  };

  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendError(null);
    const label = ENQUIRY_TYPES.find(ev => ev.id === enquiryType)?.label ?? "Enquiry";
    const templateParams = {
      subject:   `${label} — ${form.name}`,
      reply_to:  form.email,
      from_name: form.name,
      message:   buildEmailBody(),
    };
    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setSending(false);
        setSent(true);
      })
      .catch((err) => {
        setSending(false);
        setSendError("Submission failed. Please email us directly at info@tailorshongkong.com");
        console.error("EmailJS error:", err);
      });
  };

  const fs = (key: string): React.CSSProperties => ({
    ...inputStyle,
    borderColor: focusedField === key ? "#111" : "#d8d8d8",
  });
  const ss = (key: string): React.CSSProperties => ({
    ...selectStyle,
    borderColor: focusedField === key ? "#111" : "#d8d8d8",
  });

  const Label = ({ children }: { children: React.ReactNode }) => (
    <label style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#aaa", display: "block", marginBottom: "6px" }}>{children}</label>
  );

  return (
    <main style={{ backgroundColor: "#fff", overflowX: "hidden" }}>
      <Navigation />

      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <section style={{ borderBottom: "1px solid #e2e2e2", padding: "56px 0 40px" }}>
        <div className="container">
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", color: "#aaa", display: "block", marginBottom: "12px" }}>§ 09 · THE BRIEF</span>
          <h1 style={{ fontFamily: F.display, fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#111", lineHeight: 1.0, marginBottom: "16px" }}>
            Submit a Brief
          </h1>
          <p style={{ fontFamily: F.body, fontSize: "15px", lineHeight: 1.75, color: "#666", maxWidth: "560px" }}>
            Select your enquiry type below. Each brief is reviewed personally and responded to within one business day. For the fastest response, use WhatsApp.
          </p>
        </div>
      </section>

      {/* ── ENQUIRY TYPE SELECTOR ────────────────────────────────────────── */}
      <section style={{ borderBottom: "1px solid #e2e2e2", padding: "0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(6, 1fr)", gap: "0" }}>
            {ENQUIRY_TYPES.map((et) => (
              <button
                key={et.id}
                onClick={() => { setEnquiryType(et.id); setSent(false); }}
                style={{
                  padding: isMobile ? "16px 12px" : "20px 16px",
                  border: "none",
                  borderRight: "1px solid #e2e2e2",
                  borderBottom: isMobile ? "1px solid #e2e2e2" : "none",
                  borderTop: enquiryType === et.id ? "2px solid #111" : "2px solid transparent",
                  backgroundColor: enquiryType === et.id ? "#f8f8f8" : "#fff",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.15s",
                }}
              >
                <div style={{ fontFamily: F.display, fontSize: isMobile ? "11px" : "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: enquiryType === et.id ? "#111" : "#666", marginBottom: "4px" }}>{et.label}</div>
                <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.06em", color: "#aaa", lineHeight: 1.4, display: isMobile ? "none" : "block" }}>{et.sub}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN GRID ────────────────────────────────────────────────────── */}
      <section style={{ padding: "0 0 80px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "minmax(0,1fr) minmax(0,2fr)", gap: "0", alignItems: "start" }}>

            {/* LEFT — Context panel + contact details */}
            <div style={{ borderRight: isMobile ? "none" : "1px solid #e2e2e2", borderBottom: isMobile ? "1px solid #e2e2e2" : "none", paddingRight: isMobile ? "0" : "48px", paddingTop: "48px", paddingBottom: isMobile ? "40px" : "56px" }}>

              {/* Context heading */}
              <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", color: "#aaa", marginBottom: "16px" }}>
                {ENQUIRY_TYPES.find(e => e.id === enquiryType)?.label.toUpperCase()}
              </div>
              <h2 style={{ fontFamily: F.display, fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#111", marginBottom: "16px", lineHeight: 1.1 }}>
                {ctx.heading}
              </h2>
              <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.8, color: "#666", marginBottom: "28px" }}>
                {ctx.body}
              </p>

              {/* Stats */}
              {ctx.stats && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "#e2e2e2", marginBottom: "32px" }}>
                  {ctx.stats.map((s) => (
                    <div key={s.l} style={{ background: "#fff", padding: "16px 12px" }}>
                      <div style={{ fontFamily: F.display, fontSize: "14px", fontWeight: 700, letterSpacing: "0.04em", color: "#111", marginBottom: "4px", display: "flex", alignItems: "center" }}>{s.v}{s.v === "HK$12,800" && <RrpTooltip theme="light" />}</div>
                      <div style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.1em", color: "#aaa", textTransform: "uppercase" }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Process steps */}
              {ctx.steps && (
                <div style={{ marginBottom: "36px" }}>
                  <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#bbb", marginBottom: "16px" }}>THE PROCESS</div>
                  {ctx.steps.map((step) => (
                    <div key={step.n} style={{ display: "flex", gap: "12px", marginBottom: "12px", alignItems: "flex-start" }}>
                      <span style={{ fontFamily: F.mono, fontSize: "8px", color: "#bbb", letterSpacing: "0.08em", minWidth: "20px", paddingTop: "2px" }}>{step.n}</span>
                      <span style={{ fontFamily: F.body, fontSize: "12px", color: "#555", lineHeight: 1.65 }}>{step.t}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Divider */}
              <div style={{ borderTop: "1px solid #e2e2e2", paddingTop: "28px", marginTop: "8px" }}>
                <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#bbb", marginBottom: "20px" }}>CONTACT DETAILS</div>
                {[
                  { label: "EMAIL", value: "INFO@TAILORSHONGKONG.COM", href: "mailto:info@tailorshongkong.com" },
                  { label: "WHATSAPP", value: "+852 6508 8780", href: "https://wa.me/85265088780?text=Hello%2C%20I%20found%20you%20via%20Tailors.hk%20and%20would%20like%20to%20enquire." },
                  { label: "LOCATION", value: "HONG KONG · BY APPOINTMENT", href: null },
                  { label: "HOURS", value: "MON–SAT · 10:00–19:00 HKT", href: null },
                ].map((item) => (
                  <div key={item.label} style={{ marginBottom: "16px", display: "flex", gap: "12px", alignItems: "baseline" }}>
                    <span style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.12em", color: "#bbb", minWidth: "72px" }}>{item.label}</span>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                        style={{ fontFamily: F.mono, fontSize: "10px", letterSpacing: "0.06em", color: "#111", textDecoration: "none" }}>
                        {item.value}
                      </a>
                    ) : (
                      <span style={{ fontFamily: F.mono, fontSize: "10px", letterSpacing: "0.06em", color: "#555" }}>{item.value}</span>
                    )}
                  </div>
                ))}
                <a
                  href="https://wa.me/85265088780?text=Hello%2C%20I%20found%20you%20via%20Tailors.hk%20and%20would%20like%20to%20arrange%20a%20consultation."
                  target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "12px", padding: "10px 18px", backgroundColor: "#111", color: "#fff", fontFamily: F.display, fontSize: "10px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none" }}
                >
                  WHATSAPP →
                </a>
              </div>
            </div>

            {/* RIGHT — Enquiry form */}
            <div style={{ paddingLeft: isMobile ? "0" : "64px", paddingTop: isMobile ? "40px" : "48px", paddingBottom: "56px" }}>
              <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", color: "#aaa", marginBottom: "32px" }}>
                YOUR BRIEF · {ENQUIRY_TYPES.find(e => e.id === enquiryType)?.label.toUpperCase()}
              </div>

              {sent ? (
                <div style={{ border: "1px solid #e2e2e2", padding: "48px 40px", maxWidth: "480px" }}>
                  <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", color: "#22c55e", marginBottom: "12px" }}>✓ BRIEF SUBMITTED</div>
                  <p style={{ fontFamily: F.display, fontSize: "22px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#111", marginBottom: "12px" }}>Thank you.</p>
                  <p style={{ fontFamily: F.body, fontSize: "14px", color: "#666", lineHeight: 1.75 }}>
                    Your brief has been submitted. We will respond within one business day to arrange a private consultation.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    style={{ marginTop: "24px", padding: "10px 20px", border: "1px solid #e2e2e2", backgroundColor: "transparent", fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", color: "#777", cursor: "pointer" }}
                  >
                    SUBMIT ANOTHER BRIEF
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "520px" }}>

                  {/* Quiz pre-fill banner */}
                  {form.message && form.message.startsWith("From the pricing guide") && (
                    <div style={{ padding: "12px 16px", backgroundColor: "#f8f6f0", borderLeft: "3px solid #c9a84c", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#c9a84c", marginTop: "2px", flexShrink: 0 }}>◆</span>
                      <div>
                        <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#c9a84c", marginBottom: "4px" }}>FROM YOUR PRICING GUIDE</div>
                        <div style={{ fontFamily: F.body, fontSize: "12px", color: "#555", lineHeight: 1.6, whiteSpace: "pre-line" }}>{form.message.replace("From the pricing guide:\n", "")}</div>
                      </div>
                    </div>
                  )}

                  {/* Name + Email */}
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
                    <div>
                      <Label>YOUR NAME *</Label>
                      <input type="text" placeholder="FULL NAME" value={form.name} required
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)}
                        style={fs("name")} />
                    </div>
                    <div>
                      <Label>EMAIL ADDRESS *</Label>
                      <input type="email" placeholder="YOUR@EMAIL.COM" value={form.email} required
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)}
                        style={fs("email")} />
                    </div>
                  </div>

                  {/* Phone + Company (corporate only) */}
                  <div style={{ display: "grid", gridTemplateColumns: enquiryType === "corporate" ? (isMobile ? "1fr" : "1fr 1fr") : "1fr", gap: "16px" }}>
                    <div>
                      <Label>PHONE / WHATSAPP</Label>
                      <input type="tel" placeholder="+852 XXXX XXXX" value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        onFocus={() => setFocusedField("phone")} onBlur={() => setFocusedField(null)}
                        style={fs("phone")} />
                    </div>
                    {enquiryType === "corporate" && (
                      <div>
                        <Label>COMPANY NAME *</Label>
                        <input type="text" placeholder="COMPANY" value={form.company} required
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          onFocus={() => setFocusedField("company")} onBlur={() => setFocusedField(null)}
                          style={fs("company")} />
                      </div>
                    )}
                  </div>

                  {/* Corporate: suit count */}
                  {enquiryType === "corporate" && (
                    <div>
                      <Label>NUMBER OF SUITS *</Label>
                      <select value={form.suitCount} required
                        onChange={(e) => setForm({ ...form, suitCount: e.target.value })}
                        onFocus={() => setFocusedField("suitCount")} onBlur={() => setFocusedField(null)}
                        style={ss("suitCount")}>
                        {SUIT_COUNTS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  )}

                  {/* Cloth preference (bespoke, mtm) */}
                  {["bespoke", "mtm"].includes(enquiryType) && (
                    <div>
                      <Label>CLOTH PREFERENCE</Label>
                      <select value={form.cloth}
                        onChange={(e) => setForm({ ...form, cloth: e.target.value })}
                        onFocus={() => setFocusedField("cloth")} onBlur={() => setFocusedField(null)}
                        style={ss("cloth")}>
                        {CLOTH_PREFS.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  )}

                  {/* Budget (bespoke, mtm, corporate) */}
                  {["bespoke", "mtm", "corporate"].includes(enquiryType) && (
                    <div>
                      <Label>BUDGET RANGE</Label>
                      <select value={form.budget}
                        onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        onFocus={() => setFocusedField("budget")} onBlur={() => setFocusedField(null)}
                        style={ss("budget")}>
                        {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  )}

                  {/* Timeline (not general) */}
                  {enquiryType !== "general" && (
                    <div>
                      <Label>TIMELINE</Label>
                      <select value={form.timeline}
                        onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                        onFocus={() => setFocusedField("timeline")} onBlur={() => setFocusedField(null)}
                        style={ss("timeline")}>
                        {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  )}

                  {/* Wardrobe goals */}
                  {enquiryType === "wardrobe" && (
                    <div>
                      <Label>WARDROBE GOALS</Label>
                      <input type="text" placeholder="E.G. BUILD A COMPLETE PROFESSIONAL WARDROBE, REFRESH SUITING FOR A NEW ROLE…" value={form.wardrobeGoals}
                        onChange={(e) => setForm({ ...form, wardrobeGoals: e.target.value })}
                        onFocus={() => setFocusedField("wardrobeGoals")} onBlur={() => setFocusedField(null)}
                        style={fs("wardrobeGoals")} />
                    </div>
                  )}

                  {/* Preferred appointment */}
                  <div>
                    <Label>PREFERRED APPOINTMENT TIME</Label>
                    <select value={form.appointment}
                      onChange={(e) => setForm({ ...form, appointment: e.target.value })}
                      onFocus={() => setFocusedField("appointment")} onBlur={() => setFocusedField(null)}
                      style={ss("appointment")}>
                      {APPT_TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <Label>ADDITIONAL NOTES</Label>
                    <textarea
                      placeholder={
                        enquiryType === "bespoke"   ? "OCCASION, SILHOUETTE PREFERENCE, ANY REFERENCE IMAGES OR INSPIRATIONS." :
                        enquiryType === "mtm"       ? "OCCASION, ANY SPECIFIC REQUIREMENTS OR PREFERENCES." :
                        enquiryType === "corporate" ? "COMPANY BACKGROUND, DRESS CODE REQUIREMENTS, ANY SPECIFIC NOTES." :
                        enquiryType === "wardrobe"  ? "CURRENT WARDROBE SITUATION, PROFESSIONAL CONTEXT, ANY SPECIFIC OCCASIONS COMING UP." :
                        "YOUR QUESTION OR MESSAGE."
                      }
                      value={form.message} rows={5}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocusedField("message")} onBlur={() => setFocusedField(null)}
                      style={{ ...fs("message"), resize: "vertical", lineHeight: 1.65 }}
                    />
                  </div>

                  <p style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.08em", color: "#bbb", lineHeight: 1.8, margin: 0 }}>
                    We respond to all enquiries within one business day.
                  </p>

                  {sendError && (
                    <p style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.08em", color: "#c00", lineHeight: 1.6 }}>{sendError}</p>
                  )}
                  <div>
                    <button
                      type="submit"
                      disabled={sending}
                      style={{ alignSelf: "flex-start", padding: "13px 32px", backgroundColor: sending ? "#555" : "#111", color: "#fff", border: "none", fontFamily: F.display, fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: sending ? "not-allowed" : "pointer", transition: "background 0.2s" }}
                      onMouseEnter={(e) => { if (!sending) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#333"; }}
                      onMouseLeave={(e) => { if (!sending) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#111"; }}
                    >
                      {sending ? "SENDING…" : "SUBMIT BRIEF →"}
                    </button>
                    <p style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#aaa", marginTop: "10px", textTransform: "uppercase" }}>
                      ◆ Atelier Direct · Handcrafted to Order · From HK$12,800
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── RESPONSE COMMITMENT ─────────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid #e2e2e2", padding: "40px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)", gap: isMobile ? "24px" : "0" }}>
            {[
              { stat: "1 DAY",    label: "RESPONSE TIME",       note: "All briefs reviewed and responded to within one business day." },
              { stat: "BY APPT",  label: "PRIVATE CONSULTATION", note: "Consultations held privately at our Hong Kong atelier." },
              { stat: "8–12 WKS", label: "BESPOKE LEAD TIME",   note: "From first consultation to final fitting and collection." },
              { stat: "4–6 WKS",  label: "MTM LEAD TIME",       note: "Same handcrafted construction, faster turnaround." },
            ].map((item, i) => (
              <div key={item.stat} style={{ borderLeft: isMobile ? "2px solid #e2e2e2" : i === 0 ? "none" : "1px solid #e2e2e2", paddingLeft: isMobile ? "20px" : i === 0 ? "0" : "28px", paddingRight: "20px" }}>
                <div style={{ fontFamily: F.display, fontSize: "22px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#111", marginBottom: "4px" }}>{item.stat}</div>
                <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#aaa", marginBottom: "6px" }}>{item.label.toUpperCase()}</div>
                <div style={{ fontFamily: F.body, fontSize: "13px", color: "#777", lineHeight: 1.65 }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
