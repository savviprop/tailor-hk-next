"use client";
import { useSEO, SCHEMAS } from "@/hooks/useSEO";
/**
 * TAILOR.HK — EXECUTIVE TAILORING
 * Design: Technical editorial — dark hero, warm body, Barlow Condensed + JetBrains Mono
 * Rebuilt to match WardrobeConsultancy density
 */
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Link } from "@/lib/wouter-shim";
import ShareButton from "@/components/ShareButton";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { pageEnquiryUrl } from "@/lib/whatsapp";

const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body:    '"Barlow", Arial, sans-serif',
  mono:    '"JetBrains Mono", "Courier New", monospace',
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: '01',
    title: 'Bespoke Suit Commission',
    tagline: 'The finest handcraft, at atelier direct rates.',
    desc: 'A full bespoke suit — floating canvas, hand-padded lapels, working surgeon\'s cuffs — commissioned directly through our atelier. No intermediary markup. You deal with the craftsmen. The result is a garment built to your exact measurements, cloth, and specification.',
    duration: '3–4 fittings over 8–12 weeks',
    deliverable: 'Fully bespoke suit with permanent pattern archive',
    ideal: 'Senior executives commissioning their first or next bespoke suit',
  },
  {
    id: '02',
    title: 'Executive Wardrobe Build',
    tagline: 'A complete professional wardrobe, planned and executed.',
    desc: 'We design a full wardrobe blueprint — mapping every garment to specific occasions, from boardroom to client dinner to travel. Then we commission each piece in sequence, coordinating fittings around your schedule. The result is a wardrobe with no redundancies and no gaps.',
    duration: '3–6 months, fittings at your convenience',
    deliverable: 'Wardrobe blueprint + sequential commission brief',
    ideal: 'Executives relocating to Hong Kong or rebuilding their wardrobe from scratch',
  },
  {
    id: '03',
    title: 'In-Office Fitting Service',
    tagline: 'Fittings come to you — no disruption to your schedule.',
    desc: 'All fittings can be conducted at your office or residence in Hong Kong. We coordinate with your PA, work within your diary, and ensure the process is entirely invisible to your schedule. Measurements, fabric selection, and approvals are all handled on-site.',
    duration: 'Per fitting: 45–60 minutes at your location',
    deliverable: 'Completed fitting notes + fabric approval',
    ideal: 'C-suite executives and senior partners with limited availability',
  },
  {
    id: '04',
    title: 'Priority Production & Expedited Delivery',
    tagline: 'When the timeline is non-negotiable.',
    desc: 'Executive clients receive priority placement in our production schedule. For urgent requirements — a board presentation, a state dinner, a last-minute trip — we offer expedited production with a dedicated production manager assigned to your commission.',
    duration: 'Expedited: 4–6 weeks from final fitting approval',
    deliverable: 'Completed garment with expedited delivery',
    ideal: 'Executives with fixed event deadlines or urgent wardrobe requirements',
  },
  {
    id: '05',
    title: 'Pattern Archive & Reorder Service',
    tagline: 'Your measurements, held indefinitely.',
    desc: 'Every commission is accompanied by a permanent pattern archive. Once your pattern is established, reorders can be fulfilled with a single fitting or none at all — by appointment, by email, or by WhatsApp. Your tailor knows you.',
    duration: 'Reorder: 6–8 weeks from instruction',
    deliverable: 'Completed reorder garment, no remeasurement required',
    ideal: 'Established clients requiring additional pieces without starting from scratch',
  },
];

const PRINCIPLES = [
  {
    title: 'Atelier Direct',
    desc: 'No intermediary. No retail markup. You access the same world-class handcraft that dresses the finest wardrobes in Asia — at the rate the atelier charges, not the rate a retailer adds.',
  },
  {
    title: 'Floating Canvas Construction',
    desc: 'Every suit is built on a full floating canvas — the construction standard of Savile Row and the great Italian houses. The canvas moulds to your body over time. Fused suits do not.',
  },
  {
    title: 'Discretion as Standard',
    desc: 'Client relationships are confidential. We do not share names, commission details, or wardrobe information. Every engagement is governed by a non-disclosure agreement.',
  },
  {
    title: 'Permanent Pattern Archive',
    desc: 'Your measurements and pattern are held indefinitely. A reorder requires a single fitting or none at all. Your wardrobe compounds in precision with every commission.',
  },
];

const PROCESS = [
  {
    step: '01',
    title: 'Initial Consultation',
    desc: 'A 45-minute conversation — in person at your office or by video — to understand your role, dress environment, travel schedule, and wardrobe objectives. No obligation.',
  },
  {
    step: '02',
    title: 'Cloth & Specification',
    desc: 'We present a curated selection of cloths from Loro Piana, Scabal, Holland & Sherry, and Dormeuil — matched to your occasion requirements, climate, and personal preference. Construction details are agreed at this stage.',
  },
  {
    step: '03',
    title: 'Measurement & Pattern',
    desc: 'A full measurement session — at your office, at our atelier, or at your residence. Your pattern is cut and held permanently. The first fitting is scheduled 4–6 weeks later.',
  },
  {
    step: '04',
    title: 'Fittings & Delivery',
    desc: 'Typically two to three fittings, each at your convenience. Final delivery is accompanied by a care briefing and, where applicable, a reorder instruction card.',
  },
];

const FAQS = [
  {
    q: 'What is included as standard in every commission?',
    a: 'Full floating canvas construction, hand-padded lapels, hand-stitched finishing, working surgeon\'s cuffs, a full measurement archive, and permanent pattern retention. These are not upgrades — they are the standard.',
  },
  {
    q: 'Where do fittings take place?',
    a: 'Fittings can be conducted at your office, at your residence, or at our atelier in Hong Kong. We coordinate with your PA and work around your diary. For overseas clients, we can arrange travel fittings in Singapore, London, and New York.',
  },
  {
    q: 'What is the starting price?',
    a: 'Bespoke suits start from HK$12,800 — at atelier direct rates, with no intermediary markup. This includes all standard inclusions. Cloth selection and construction upgrades are quoted separately.',
  },
  {
    q: 'How long does a commission take?',
    a: 'A standard commission takes 8–12 weeks from the measurement session to final delivery, with two to three fittings in between. Expedited production is available for urgent requirements — typically 4–6 weeks.',
  },
  {
    q: 'Can I commission multiple pieces at once?',
    a: 'Yes. Many executive clients commission a full wardrobe in sequence — suits, shirts, trousers, and overcoats — with fittings coordinated to minimise diary disruption. A wardrobe blueprint is available for clients commissioning three or more pieces.',
  },
  {
    q: 'Do you work with existing tailors?',
    a: 'We are independent. We can work alongside your existing tailor, or recommend houses based on your specific requirements, cloth preferences, and construction standards. We do not have commercial relationships with any tailoring house.',
  },
];

type FormState = "idle" | "submitting" | "success" | "error";

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid #e8e4df' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{ fontFamily: F.display, fontSize: '18px', letterSpacing: '0.02em', color: '#111' }}>{q}</span>
        {open ? <ChevronUp size={16} color="#888" /> : <ChevronDown size={16} color="#888" />}
      </button>
      {open && (
        <div style={{ paddingBottom: '20px' }}>
          <p style={{ fontFamily: F.body, fontSize: '15px', color: '#555', lineHeight: 1.8, margin: 0 }}>{a}</p>
        </div>
      )}
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

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
      SCHEMAS.faq(FAQS.map(f => ({ question: f.q, answer: f.a }))),
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Executive Tailoring",
        "provider": {"@type": "Organization", "name": "Tailors.hk"},
        "description": "Handcrafted bespoke tailoring at atelier direct rates for Hong Kong's business professionals.",
        "areaServed": "Hong Kong",
        "offers": {
          "@type": "Offer",
          "price": "12800",
          "priceCurrency": "HKD",
          "description": "Bespoke suit from HK$12,800 — full floating canvas, hand-padded lapels, working surgeon's cuffs"
        }
      }
    ],
  });

  const WHATSAPP_URL = pageEnquiryUrl("Executive Tailoring");

  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "",
    garment: "", quantity: "", timeline: "", notes: "",
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
    width: "100%", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 0,
    padding: "12px 14px", fontFamily: F.body, fontSize: "13px", color: "#e0e0e0",
    outline: "none", boxSizing: "border-box", transition: "border-color 0.15s",
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#666",
    textTransform: "uppercase" as const, display: "block", marginBottom: "6px",
  };

  return (
    <div style={{ background: '#faf9f7', minHeight: '100vh' }}>
      <Navigation />

      {/* ── HERO ── */}
      <section style={{ position: 'relative', background: '#111', color: '#fff', paddingTop: '120px', paddingBottom: '80px', overflow: 'hidden' }}>
        <img
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/TkBztkkzndumsmvs.jpeg"
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.35, pointerEvents: 'none' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb */}
          <div style={{ fontFamily: F.mono, fontSize: '10px', letterSpacing: '0.12em', color: '#555', marginBottom: '40px', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Link href="/" style={{ color: '#555', textDecoration: 'none' }}>HOME</Link>
            <span>/</span>
            <Link href="/how-it-works" style={{ color: '#555', textDecoration: 'none' }}>SERVICES</Link>
            <span>/</span>
            <span style={{ color: '#888' }}>EXECUTIVE TAILORING</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '40px' : '80px', alignItems: 'end' }}>
            <div>
              <div style={{ fontFamily: F.mono, fontSize: '10px', letterSpacing: '0.15em', color: '#555', marginBottom: '16px' }}>
                § EXECUTIVE SERVICES
              </div>
              <h1 style={{
                fontFamily: F.display, fontSize: 'clamp(48px, 7vw, 88px)', fontWeight: 700,
                letterSpacing: '-0.01em', lineHeight: 0.9, margin: '0 0 32px', textTransform: 'uppercase',
              }}>
                EXECUTIVE<br />TAILORING
              </h1>
              <p style={{ fontFamily: F.body, fontSize: '16px', color: '#aaa', lineHeight: 1.8, margin: '0 0 40px', maxWidth: '440px' }}>
                World-leading handcrafted production at atelier direct rates. Discreet, efficient, and uncompromising in quality — for Hong Kong's senior professionals.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    fontFamily: F.display, fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '14px 28px', background: '#fff', color: '#111', textDecoration: 'none',
                  }}
                >
                  Book a Consultation
                </a>
                <a
                  href="#services"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    fontFamily: F.display, fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '14px 28px', border: '1px solid #444', color: '#aaa', textDecoration: 'none',
                  }}
                >
                  View Services
                </a>
              </div>
            </div>

            {/* Stats panel */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#222' }}>
              {[
                { value: 'HK$12,800', label: 'Starting Price' },
                { value: '5', label: 'Service Tiers' },
                { value: '100%', label: 'Floating Canvas' },
                { value: 'HK', label: 'Based in Hong Kong' },
              ].map(s => (
                <div key={s.label} style={{ background: '#1a1a1a', padding: '28px 24px' }}>
                  <div style={{ fontFamily: F.display, fontSize: s.value.length > 5 ? '24px' : '36px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontFamily: F.mono, fontSize: '9px', color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '6px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES ── */}
      <section style={{ background: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontFamily: F.mono, fontSize: '10px', letterSpacing: '0.15em', color: '#888', marginBottom: '12px' }}>
            § 01 — OUR STANDARDS
          </div>
          <h2 style={{ fontFamily: F.display, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, letterSpacing: '-0.01em', textTransform: 'uppercase', margin: '0 0 48px', color: '#111' }}>
            Four Principles
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '32px' }}>
            {PRINCIPLES.map((p, i) => (
              <div key={p.title}>
                <div style={{ fontFamily: F.mono, fontSize: '10px', letterSpacing: '0.12em', color: '#bbb', marginBottom: '10px' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 style={{ fontFamily: F.display, fontSize: '22px', fontWeight: 700, letterSpacing: '0.02em', textTransform: 'uppercase', color: '#111', margin: '0 0 12px' }}>
                  {p.title}
                </h3>
                <p style={{ fontFamily: F.body, fontSize: '14px', color: '#666', lineHeight: 1.8, margin: 0 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ background: '#faf9f7', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontFamily: F.mono, fontSize: '10px', letterSpacing: '0.15em', color: '#888', marginBottom: '12px' }}>
            § 02 — SERVICE TIERS
          </div>
          <h2 style={{ fontFamily: F.display, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, letterSpacing: '-0.01em', textTransform: 'uppercase', margin: '0 0 48px', color: '#111' }}>
            What We Offer
          </h2>

          <div style={{ display: 'grid', gap: '2px' }}>
            {SERVICES.map(svc => (
              <div key={svc.id} style={{ background: '#fff', border: '1px solid #e8e4df', padding: '40px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr auto', gap: '24px', alignItems: 'start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                      <span style={{ fontFamily: F.mono, fontSize: '10px', letterSpacing: '0.12em', color: '#bbb' }}>
                        {svc.id}
                      </span>
                      <h3 style={{ fontFamily: F.display, fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, letterSpacing: '0.02em', textTransform: 'uppercase', color: '#111', margin: 0 }}>
                        {svc.title}
                      </h3>
                    </div>
                    <p style={{ fontFamily: F.display, fontSize: '16px', color: '#888', letterSpacing: '0.02em', margin: '0 0 16px', fontStyle: 'italic' }}>
                      {svc.tagline}
                    </p>
                    <p style={{ fontFamily: F.body, fontSize: '15px', color: '#555', lineHeight: 1.8, margin: '0 0 24px', maxWidth: '640px' }}>
                      {svc.desc}
                    </p>
                    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                      <div>
                        <div style={{ fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.12em', color: '#aaa', textTransform: 'uppercase', marginBottom: '4px' }}>Duration</div>
                        <div style={{ fontFamily: F.mono, fontSize: '11px', color: '#555' }}>{svc.duration}</div>
                      </div>
                      <div>
                        <div style={{ fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.12em', color: '#aaa', textTransform: 'uppercase', marginBottom: '4px' }}>Deliverable</div>
                        <div style={{ fontFamily: F.mono, fontSize: '11px', color: '#555' }}>{svc.deliverable}</div>
                      </div>
                      <div>
                        <div style={{ fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.12em', color: '#aaa', textTransform: 'uppercase', marginBottom: '4px' }}>Ideal for</div>
                        <div style={{ fontFamily: F.mono, fontSize: '11px', color: '#555' }}>{svc.ideal}</div>
                      </div>
                    </div>
                  </div>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      fontFamily: F.display, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase',
                      padding: '10px 18px', border: '1px solid #111', background: '#111', color: '#fff',
                      textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0,
                    }}
                  >
                    Enquire <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ background: '#111', color: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontFamily: F.mono, fontSize: '10px', letterSpacing: '0.15em', color: '#555', marginBottom: '12px' }}>
            § 03 — HOW IT WORKS
          </div>
          <h2 style={{ fontFamily: F.display, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, letterSpacing: '-0.01em', textTransform: 'uppercase', margin: '0 0 48px', color: '#fff' }}>
            The Process
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1px', background: '#222' }}>
            {PROCESS.map(p => (
              <div key={p.step} style={{ background: '#111', padding: '40px 32px' }}>
                <div style={{ fontFamily: F.mono, fontSize: '32px', color: '#222', letterSpacing: '-0.02em', marginBottom: '20px', lineHeight: 1 }}>
                  {p.step}
                </div>
                <h3 style={{ fontFamily: F.display, fontSize: '20px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#fff', margin: '0 0 12px' }}>
                  {p.title}
                </h3>
                <p style={{ fontFamily: F.body, fontSize: '14px', color: '#888', lineHeight: 1.8, margin: 0 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENQUIRY FORM ── */}
      <section style={{ background: '#1a1a1a', padding: '80px 24px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ fontFamily: F.mono, fontSize: '10px', letterSpacing: '0.15em', color: '#555', marginBottom: '12px' }}>
            § 04 — SUBMIT AN ENQUIRY
          </div>
          <h2 style={{ fontFamily: F.display, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, letterSpacing: '-0.01em', textTransform: 'uppercase', margin: '0 0 12px', color: '#fff' }}>
            Begin Your Commission
          </h2>
          <p style={{ fontFamily: F.body, fontSize: '14px', lineHeight: 1.75, color: '#666', marginBottom: '40px' }}>
            All enquiries are handled with complete discretion. A consultant will respond within one business day.
          </p>

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
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input name="name" required value={form.name} onChange={handleChange} placeholder="Your name" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Company</label>
                  <input name="company" value={form.company} onChange={handleChange} placeholder="Firm or organisation" style={inputStyle} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Phone / WhatsApp</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+852 ···" style={inputStyle} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Garment Type</label>
                  <select name="garment" value={form.garment} onChange={handleChange} style={{ ...inputStyle, appearance: "none" as const }}>
                    <option value="">Select garment</option>
                    {["Bespoke Suit", "Made-to-Measure Suit", "Dress Shirt", "Overcoat", "Trousers", "Waistcoat", "Other"].map(g => <option key={g} value={g}>{g}</option>)}
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
                  name="notes" value={form.notes} onChange={handleChange} rows={4}
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
                    fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase",
                    background: "#fff", color: "#111", border: "none", padding: "14px 32px",
                    cursor: formState === "submitting" ? "not-allowed" : "pointer",
                    opacity: formState === "submitting" ? 0.6 : 1, transition: "opacity 0.15s",
                  }}
                >
                  {formState === "submitting" ? "Submitting…" : "Submit Enquiry →"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ── RTW CROSS-SELL ── */}
      <section style={{ background: '#f5f3f0', padding: '60px 24px', borderTop: '1px solid #e8e4df' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div style={{ fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.15em', color: '#888', marginBottom: '8px' }}>
              WHILE YOUR BESPOKE COMMISSION IS IN PRODUCTION
            </div>
            <h3 style={{ fontFamily: F.display, fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 700, letterSpacing: '-0.01em', textTransform: 'uppercase', color: '#111', margin: 0 }}>
              Browse Our Ready-to-Wear Curation
            </h3>
            <p style={{ fontFamily: F.body, fontSize: '14px', color: '#666', margin: '8px 0 0', lineHeight: 1.6 }}>
              The finest blazers, suits and shoes from MR PORTER — selected by our editorial team.
              Links automatically localised to your region. MR PORTER ships to over 170 countries.
            </p>
          </div>
          <Link
            href="/ready-to-wear"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: F.display, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '12px 24px', border: '1px solid #111', background: '#111', color: '#fff',
              textDecoration: 'none', whiteSpace: 'nowrap',
            }}
          >
            View Ready to Wear
          </Link>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontFamily: F.mono, fontSize: '10px', letterSpacing: '0.15em', color: '#888', marginBottom: '12px' }}>
            § 05 — FREQUENTLY ASKED
          </div>
          <h2 style={{ fontFamily: F.display, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, letterSpacing: '-0.01em', textTransform: 'uppercase', margin: '0 0 40px', color: '#111' }}>
            Questions
          </h2>
          <div style={{ borderTop: '1px solid #e8e4df' }}>
            {FAQS.map(faq => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ background: '#111', color: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: F.mono, fontSize: '10px', letterSpacing: '0.15em', color: '#555', marginBottom: '20px' }}>
            § BEGIN YOUR COMMISSION
          </div>
          <h2 style={{ fontFamily: F.display, fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 700, letterSpacing: '-0.01em', textTransform: 'uppercase', margin: '0 0 24px', lineHeight: 0.9 }}>
            BOOK A ZERO FEE<br />CONSULTATION
          </h2>
          <p style={{ fontFamily: F.body, fontSize: '16px', color: '#aaa', lineHeight: 1.8, margin: '0 0 40px' }}>
            A 45-minute conversation to understand your requirements. No obligation. Conducted in person in Hong Kong or by video call.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                fontFamily: F.display, fontSize: '14px', letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '16px 36px', background: '#fff', color: '#111', textDecoration: 'none',
              }}
            >
              Message Us on WhatsApp
            </a>
            <a
              href="/contact?type=executive"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                fontFamily: F.display, fontSize: '14px', letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '16px 36px', border: '1px solid #444', color: '#fff',
                textDecoration: 'none', background: 'transparent',
              }}
            >
              Submit a Brief
            </a>
          </div>
          <div style={{ fontFamily: F.mono, fontSize: '10px', color: '#444', letterSpacing: '0.08em', marginTop: '16px' }}>
            TYPICALLY RESPONDS WITHIN 4 HOURS · HONG KONG BUSINESS HOURS
          </div>
          <div style={{ fontFamily: F.mono, fontSize: '8px', color: '#555', letterSpacing: '0.12em', marginTop: '8px', textTransform: 'uppercase' }}>
            ◆ Atelier Direct · Handcrafted to Order · From HK$12,800
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
    </div>
  );
}
