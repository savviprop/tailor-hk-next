"use client";
import { useSEO, SCHEMAS } from "@/hooks/useSEO";
/**
 * TAILOR.HK — WARDROBE CONSULTANCY
 * Design: Technical editorial — Barlow Condensed + JetBrains Mono
 * Service page for executives to build and review their wardrobe
 */
import { useState, useEffect } from "react";
import { Link } from "@/lib/wouter-shim";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ShareButton from "@/components/ShareButton";
// SEO handled by generateMetadata in page.tsx
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { pageEnquiryUrl } from "@/lib/whatsapp";

const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body:    '"Barlow", Arial, sans-serif',
  mono:    '"JetBrains Mono", "Courier New", monospace',
};

// ─── DATA ────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: '01',
    title: 'Wardrobe Audit',
    tagline: 'Know exactly what you have — and what you need.',
    desc: 'A thorough review of your existing wardrobe. We assess every suit, shirt, shoe and accessory against your current lifestyle, role and body. You receive a written report with a prioritised action list: what to keep, what to alter, what to retire.',
    duration: '2–3 hours',
    deliverable: 'Written audit report + priority action list',
    ideal: 'Executives returning from a career transition, weight change, or relocation',
  },
  {
    id: '02',
    title: 'Wardrobe Architecture',
    tagline: 'Build a wardrobe with no redundancies and no gaps.',
    desc: 'Starting from your audit (or from scratch), we design a complete wardrobe blueprint. Every piece is mapped to specific occasions — boardroom, client dinner, travel, weekend — with fabric, colour and silhouette recommendations at each tier.',
    duration: '3–4 hours across two sessions',
    deliverable: 'Wardrobe blueprint + sourcing brief',
    ideal: 'Senior executives building a new wardrobe or relocating to Hong Kong',
  },
  {
    id: '03',
    title: 'Bespoke Commission Brief',
    tagline: 'Commission the right pieces from the right tailors.',
    desc: 'We translate your wardrobe blueprint into a precise commission brief for your chosen tailor. Fabric specifications, construction notes, fit references and delivery sequencing — so your tailor understands exactly what is required before the first appointment.',
    duration: '1–2 hours',
    deliverable: 'Tailor commission brief document',
    ideal: 'Clients commissioning multiple bespoke pieces across different tailors',
  },
  {
    id: '04',
    title: 'Ongoing Wardrobe Management',
    tagline: 'A retained wardrobe director — without the overhead.',
    desc: 'A quarterly retainer service. We review seasonal additions, manage alterations, coordinate with your tailor, and maintain your wardrobe inventory. Ideal for executives who travel frequently and need their wardrobe to function without friction.',
    duration: 'Quarterly sessions + on-call support',
    deliverable: 'Quarterly wardrobe review + inventory management',
    ideal: 'C-suite executives and frequent travellers',
  },
];

const PROCESS = [
  {
    step: '01',
    title: 'Initial Consultation',
    desc: 'A 45-minute conversation — in person or by video — to understand your role, travel schedule, dress environment and personal preferences. No obligation.',
  },
  {
    step: '02',
    title: 'Wardrobe Assessment',
    desc: 'We visit your home or office to review your existing wardrobe in person. Every piece is catalogued, assessed for condition and mapped to your lifestyle needs.',
  },
  {
    step: '03',
    title: 'Report & Blueprint',
    desc: 'Within five working days, you receive a written audit report and — where applicable — a wardrobe blueprint with specific sourcing and commission recommendations.',
  },
  {
    step: '04',
    title: 'Execution',
    desc: 'We coordinate with tailors, retailers and alterations specialists on your behalf. You approve, we manage the process end to end.',
  },
];

const PRINCIPLES = [
  {
    title: 'Cloth First',
    desc: 'The finest ready-to-wear and bespoke pieces share one quality: exceptional cloth. We source from Loro Piana, Scabal, Holland & Sherry and Dormeuil — and we know the difference between a Super 120s and a Super 160s in practice, not just on paper.',
  },
  {
    title: 'Occasion Mapping',
    desc: 'A wardrobe is not a collection — it is a toolkit. Every piece must earn its place by serving a specific occasion. We eliminate redundancy and fill genuine gaps.',
  },
  {
    title: 'Longevity Over Trend',
    desc: 'We do not chase seasons. A well-cut navy suit in a classic cloth will serve you for fifteen years. We advise on pieces that compound in value — in quality, in fit, and in confidence.',
  },
  {
    title: 'Discretion',
    desc: 'Our client relationships are confidential. We do not share client names, wardrobe details or commission briefs. Every engagement is governed by a non-disclosure agreement.',
  },
];

const FAQS = [
  {
    q: 'Where does the consultation take place?',
    a: 'We can conduct the initial consultation in person at your office or home in Hong Kong, or by video call for clients based overseas. The wardrobe audit itself requires an in-person visit.',
  },
  {
    q: 'Do you work with any specific tailors?',
    a: 'We are independent and work with all major Hong Kong tailoring houses. We can also coordinate with your existing tailor, or recommend houses based on your specific requirements and budget.',
  },
  {
    q: 'What is the typical investment for a Wardrobe Architecture engagement?',
    a: 'Consultancy fees are quoted individually based on scope. The audit and blueprint service typically represents a fraction of the value of the wardrobe it produces. Contact us for a fee proposal.',
  },
  {
    q: 'Can you help with ready-to-wear sourcing as well as bespoke?',
    a: 'Yes. We work across both. For some occasions and garment categories, a well-chosen ready-to-wear piece from a house like Brunello Cucinelli or Canali is the right answer. We are not dogmatic about bespoke.',
  },
  {
    q: 'Do you offer services outside Hong Kong?',
    a: 'We are based in Hong Kong but can travel for retained clients. Initial consultations and ongoing management can be conducted remotely for clients in Singapore, London, New York and other major cities.',
  },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

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

export default function WardrobeConsultancy() {
  useSEO({
    title: 'Wardrobe Consultancy for Executives | Tailors.hk',
    description: 'A professional wardrobe consultancy for senior executives. Access handcrafted bespoke garments at atelier direct rates — from a world-leading atelier with 25 years of fine craft expertise.',
    canonical: 'https://tailors.hk/wardrobe-consultancy',
    schema: [
      SCHEMAS.organization(),
      SCHEMAS.breadcrumb([
        { name: 'Home', url: '/' },
        { name: 'Wardrobe Consultancy', url: '/wardrobe-consultancy' },
      ]),
      SCHEMAS.service({
        name: 'Executive Wardrobe Consultancy',
        description: 'A professional wardrobe consultancy for senior executives. Access handcrafted bespoke garments at atelier direct rates — from a world-leading atelier with 25 years of fine craft expertise.',
        price: '12800',
        url: '/wardrobe-consultancy',
      }),
      SCHEMAS.faq(FAQS.map(f => ({ question: f.q, answer: f.a }))),
    ],
  });

  const WHATSAPP_URL = pageEnquiryUrl("Wardrobe Consultancy");
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  return (
    <div style={{ background: '#faf9f7', minHeight: '100vh' }}>
      <Navigation />

      {/* ── HERO ── */}
      <section style={{ position: 'relative', background: '#111', color: '#fff', paddingTop: '120px', paddingBottom: '80px', overflow: 'hidden' }}>
        <img
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/SmaMsjHhEgNoicVP.jpeg"
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
            <span style={{ color: '#888' }}>WARDROBE CONSULTANCY</span>
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
                WARDROBE<br />CONSUL&shy;TANCY
              </h1>
              <p style={{ fontFamily: F.body, fontSize: '16px', color: '#aaa', lineHeight: 1.8, margin: '0 0 40px', maxWidth: '440px' }}>
                A professional wardrobe service for senior executives. We audit, design, and commission — with direct access to world-class handcrafted tailoring at atelier rates.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    fontFamily: F.display, fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '14px 28px', background: '#fff', color: '#111',
                    textDecoration: 'none',
                  }}
                >
                  Book a Consultation
                </a>
                <a
                  href="#services"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    fontFamily: F.display, fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '14px 28px', border: '1px solid #444', color: '#aaa',
                    textDecoration: 'none',
                  }}
                >
                  View Services
                </a>
              </div>
            </div>

            {/* Stats panel */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#222', marginTop: isMobile ? '0' : undefined }}>
              {[
                { value: '4', label: 'Service Tiers' },
                { value: 'HK', label: 'Based in Hong Kong' },
                { value: '15+', label: 'Years of Tailoring Knowledge' },
                { value: '100%', label: 'Confidential' },
              ].map(s => (
                <div key={s.label} style={{ background: '#1a1a1a', padding: '28px 24px' }}>
                  <div style={{ fontFamily: F.display, fontSize: '36px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>{s.value}</div>
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
            § 01 — OUR APPROACH
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
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', alignItems: 'start' }}>
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

      {/* ── RTW LINK ── */}
      <section style={{ background: '#f5f3f0', padding: '60px 24px', borderTop: '1px solid #e8e4df' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div style={{ fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.15em', color: '#888', marginBottom: '8px' }}>
              WHILE YOU WAIT FOR YOUR BESPOKE COMMISSIONS
            </div>
            <h3 style={{ fontFamily: F.display, fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 700, letterSpacing: '-0.01em', textTransform: 'uppercase', color: '#111', margin: 0 }}>
              Browse Our Ready-to-Wear Curation
            </h3>
            <p style={{ fontFamily: F.body, fontSize: '14px', color: '#666', margin: '8px 0 0', lineHeight: 1.6 }}>
              The finest blazers, suits and shoes from MR PORTER — selected by our editorial team.
              Links automatically localised to your region (APAC, US, UK, AU) with affiliate pricing.
              MR PORTER ships to over 170 countries.
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
            § 04 — FREQUENTLY ASKED
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
            § BEGIN YOUR ENGAGEMENT
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
                padding: '16px 36px', background: '#fff', color: '#111',
                textDecoration: 'none',
              }}
            >
              Message Us on WhatsApp
            </a>
            <a
              href="/contact?type=wardrobe"
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
          <ShareButton title="Wardrobe Consultancy — Tailors.hk" text="Professional wardrobe consultancy and styling services in Hong Kong." variant="icon" scheme="light" />
        </div>
      </section>
      <Footer />
    </div>
  );
}
