"use client";
import { useSEO, SCHEMAS } from "@/hooks/useSEO";
/**
 * TAILOR.HK — ABOUT
 * Design: Technical editorial — research-driven brand story
 * Positioning: World-leading supplier & distributor of handcrafted tailored suits,
 * offering clients direct atelier rates — bypassing conventional retail mark-ups.
 */
import { Link } from "@/lib/wouter-shim";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
// SEO handled by generateMetadata in page.tsx
import { QualityChart } from "@/components/QualityChart";

const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body:    '"Barlow", Arial, sans-serif',
  mono:    '"JetBrains Mono", "Courier New", monospace',
};

const PILLARS = [
  {
    num: "01",
    label: "TIME",
    desc: "We manage the entire commission — sourcing, production, quality control, and delivery — so that your time is spent on the result, not the process. From individual commissions to full corporate wardrobe programmes, we handle the complexity.",
  },
  {
    num: "02",
    label: "EXPERTISE",
    desc: "Over 25 years as a trusted partner and procurement specialist to global executives, diplomats, and corporate leaders. Our team understands the standards required at the highest level of professional and social life.",
  },
  {
    num: "03",
    label: "DIRECT RATES",
    desc: "We supply handcrafted suits to some of the most renowned tailoring houses and su misura to international MTM brands. For the first time, clients can access that same fine craft production — at atelier-direct rates, without the retail intermediary.",
  },
  {
    num: "04",
    label: "CRAFT",
    desc: "Every garment we produce is fully handcrafted. Full canvas construction, premium cloth sourced from the world's leading mills, and a standard of finish that benchmarks against the finest houses in London, Naples, and Paris.",
  },
];

const VALUES = [
  { num: "01", label: "INDEPENDENCE", desc: "No commercial relationships, no sponsored placements. Every tailor in the index is listed on merit — evaluated against the same criteria we apply to houses in London, Naples, and Tokyo." },
  { num: "02", label: "INTERNATIONAL STANDARD", desc: "The index applies a consistent global benchmark. A Hong Kong tailor is not judged against other Hong Kong tailors — it is judged against the best in the world." },
  { num: "03", label: "TRANSPARENCY", desc: "We publish our scoring methodology, our criteria, and our pricing benchmarks. You should know exactly what you are paying for and why." },
  { num: "04", label: "CRAFT OVER CONVENIENCE", desc: "We believe in the value of handwork, proper construction, and garments built to last decades. Fused interlinings and fast turnarounds are not in our index." },
];

export default function About() {
  useSEO({
    title: "About Tailors.hk — World-Leading Atelier of Handcrafted Tailored Suits",
    description: "Tailors.hk is an award-winning industry authority and world-leading atelier of handcrafted tailored suits. Access fine craft at atelier-direct rates on bespoke and made-to-measure tailoring in Hong Kong.",
    canonical: "https://tailors.hk/about",
    keywords: "about Tailors.hk, Hong Kong tailoring, bespoke tailoring Hong Kong, atelier direct rates, handcrafted suits Hong Kong",
    ogType: "website",
    schema: [
      SCHEMAS.organization(),
      SCHEMAS.breadcrumb([
        { name: "Home", url: "/" },
        { name: "About", url: "/about" },
      ]),
      SCHEMAS.speakable(["h1", "h2"]),
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": "https://tailors.hk/about#webpage",
        "name": "About Tailors.hk — World-Leading Atelier of Handcrafted Tailored Suits",
        "url": "https://tailors.hk/about",
        "description": "World-leading atelier of handcrafted tailored suits. Access fine craft at atelier-direct rates on bespoke and made-to-measure tailoring in Hong Kong.",
        "isPartOf": { "@type": "WebSite", "@id": "https://tailors.hk/#website" },
        "mainEntity": {
          "@type": "Organization",
          "@id": "https://tailors.hk/#organization",
          "name": "Tailors.hk",
          "url": "https://tailors.hk",
          "description": "Award-winning industry authority and world-leading atelier of handcrafted tailored suits.",
          "foundingDate": "2000",
          "foundingLocation": { "@type": "Place", "name": "Hong Kong" },
          "areaServed": "Global",
          "knowsAbout": ["Bespoke Tailoring", "Made-to-Measure Suits", "Hong Kong Tailoring", "Savile Row", "Neapolitan Tailoring"],
          "sameAs": ["https://tailors.hk", "https://www.instagram.com/tailorhk"]
        }
      },
      SCHEMAS.person({
        name: "Tailors.hk Editorial Team",
        description: "The Tailors.hk editorial team comprises menswear professionals with over 25 years of combined expertise in bespoke tailoring, fabric sourcing, and Hong Kong tailoring.",
        url: "https://tailors.hk/about",
        sameAs: ["https://tailors.hk"],
      }),
    ],
  });

  return (
    <main style={{ backgroundColor: "#fff", overflowX: "hidden" }}>
      <Navigation />

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section style={{ borderBottom: "1px solid #e2e2e2", padding: "56px 0 48px" }}>
        <div className="container">
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "12px" }}>§ 08 · ABOUT</span>
          <h1 style={{ fontFamily: F.display, fontSize: "clamp(28px, 5vw, 56px)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#111", lineHeight: 1.0, marginBottom: "20px", maxWidth: "700px" }}>            A World-Leading Atelier of Handcrafted Tailored Menswear
          </h1>
          <p style={{ fontFamily: F.body, fontSize: "15px", lineHeight: 1.8, color: "#666", maxWidth: "640px" }}>
            Tailors.hk is a world-leading platform for handcrafted suits and textiles to some of the finest tailoring houses, international ready-to-wear labels and corporate clients. For the first time, fine craft is made available directly to the private client — through Atelier Direct.
          </p>
        </div>
      </section>

      {/* ── SUPPLIER PROPOSITION ────────────────────────────────────── */}
      <section style={{ padding: "72px 0", borderBottom: "1px solid #e2e2e2" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "56px", alignItems: "start" }}>
            <div>
              <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "16px" }}>WHO WE ARE</span>
              <h2 style={{ fontFamily: F.display, fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#111", lineHeight: 1.1, marginBottom: "24px" }}>
                Trusted Partner &amp; Procurement Specialist for Over 25 Years
              </h2>
              <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.85, color: "#666", marginBottom: "16px" }}>
                The Tailors.hk team has been a trusted partner, distributor, and leading procurement specialist for over 25 years — serving global executives, diplomats, corporate leaders, and discerning professionals across Hong Kong and internationally.
              </p>
              <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.85, color: "#666", marginBottom: "16px" }}>
                The world’s leading ready-to-wear tailoring retails through conventional channels at HK$30,000–50,000 and above. Atelier Direct rates begin from HK$12,800 for essential handcrafted suiting. At the pinnacle, each commission is an art piece — singular, made only for you. Commissioned in the finest cloths, from essentials to Vicuña, fitted precisely to your form.
              </p>
              <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.85, color: "#666" }}>
                The difference to retail is timeless menswear, elevated fabrication, hand craft, optimised fit, and access.
              </p>
            </div>
            <div>
              <div style={{ border: "1px solid #e2e2e2", padding: "28px" }}>
                <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", marginBottom: "20px", borderBottom: "1px solid #f0f0f0", paddingBottom: "12px" }}>CREDENTIALS · 2026</div>
                {[
                  { label: "YEARS IN OPERATION", value: "25+" },
                  { label: "HAND CRAFTED GARMENTS PRODUCED", value: "50,000+" },
                  { label: "CORPORATE CLIENTS", value: "200+" },
                  { label: "DIRECT RATE FROM", value: "HK$12,800" },
                  { label: "LEAD TIME", value: "4–6 weeks" },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f5f5f5" }}>
                    <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.08em", color: "#aaa" }}>{item.label}</span>
                    <span style={{ fontFamily: F.display, fontSize: "16px", fontWeight: 600, letterSpacing: "0.06em", color: "#111" }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THREE PILLARS ───────────────────────────────────────────── */}
      <section style={{ padding: "64px 0", borderBottom: "1px solid #e2e2e2", backgroundColor: "#fafafa" }}>
        <div className="container">
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "12px" }}>WHAT WE BRING</span>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", lineHeight: 1.1, marginBottom: "40px", maxWidth: "480px" }}>
            Time. Expertise. Direct Rates.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))", gap: "32px" }}>
            {PILLARS.map((v) => (
              <div key={v.num} style={{ borderTop: "2px solid #111", paddingTop: "20px" }}>
                <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.06em", color: "#ccc", display: "block", marginBottom: "8px" }}>{v.num}</span>
                <div style={{ fontFamily: F.display, fontSize: "13px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#111", marginBottom: "12px" }}>{v.label}</div>
                <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.8, color: "#777", margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ATELIER DIRECT RATES CALLOUT ────────────────────────────── */}
      <section style={{ padding: "72px 0", borderBottom: "1px solid #e2e2e2", backgroundColor: "#111" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: "48px", alignItems: "center" }}>
            <div>
              <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#555", display: "block", marginBottom: "16px" }}>ATELIER DIRECT RATES</span>
              <h2 style={{ fontFamily: F.display, fontSize: "clamp(24px, 3.5vw, 44px)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#fff", lineHeight: 1.05, marginBottom: "24px" }}>
                Access the Production.<br />Atelier Direct.
              </h2>
              <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.85, color: "#aaa", marginBottom: "20px" }}>
                Tailors.hk is a world-leading platform for handcrafted suits and textiles to some of the finest tailoring houses, international ready-to-wear labels and corporate clients. For the first time, fine craft is made available directly to the private client — through Atelier Direct.
              </p>
              <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.85, color: "#aaa" }}>
                The world’s leading ready-to-wear tailoring retails through conventional channels at HK$30,000–50,000 and above. Atelier Direct rates begin from HK$12,800 for essential handcrafted suiting. At the pinnacle, each commission is an art piece — singular, made only for you. Commissioned in the finest cloths, from essentials to Vicuña, fitted precisely to your form. The difference to retail is timeless menswear, elevated fabrication, hand craft, optimised fit, and access.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", backgroundColor: "#333" }}>
              {[
                { tier: "ENTRY", price: "FROM HK$12,800", note: "MTM & BESPOKE · HAND CRAFTED" },
                { tier: "MID", price: "FROM HK$18,000", note: "PREMIUM CLOTH SELECTION" },
                { tier: "INVESTMENT", price: "FROM HK$28,000", note: "ELEVATED CLOTH SELECTION" },
                { tier: "ULTRA", price: "FROM HK$33,800", note: "LIMITLESS FABRICATION" },
              ].map((item) => (
                <div key={item.tier} style={{ backgroundColor: "#1a1a1a", padding: "24px 20px" }}>
                  <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#555", marginBottom: "8px" }}>{item.tier}</div>
                  <div style={{ fontFamily: F.display, fontSize: "18px", fontWeight: 700, letterSpacing: "0.04em", color: "#fff", marginBottom: "4px" }}>{item.price}</div>
                  <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: "#666", textTransform: "uppercase" }}>{item.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL VALUES ────────────────────────────────────────── */}
      <section style={{ padding: "64px 0", borderBottom: "1px solid #e2e2e2" }}>
        <div className="container">
              <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "32px" }}>OUR VALUES</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))", gap: "32px" }}>
            {VALUES.map((v) => (
              <div key={v.num}>
                <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.06em", color: "#ccc", display: "block", marginBottom: "8px" }}>{v.num}</span>
                <div style={{ fontFamily: F.display, fontSize: "12px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#111", marginBottom: "10px" }}>{v.label}</div>
                <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.75, color: "#777", margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY TAILORS.HK ──────────────────────────────────────────── */}
      <section style={{ padding: "72px 0", borderBottom: "1px solid #e2e2e2", backgroundColor: "#fafafa" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: "64px", alignItems: "start" }}>
            <div>
              <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", color: "#aaa", display: "block", marginBottom: "16px" }}>WHY TAILOR.HK</span>
              <h2 style={{ fontFamily: F.display, fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#111", lineHeight: 1.05, marginBottom: "24px" }}>Production Integrity.<br />No Exceptions.</h2>
              <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.85, color: "#666", marginBottom: "16px" }}>
                Our production standards are non-negotiable. Every garment we produce is fully handcrafted — full canvas construction, premium cloth sourced from the world's leading mills, and a standard of finish that benchmarks against the finest houses in London, Naples, and Paris.
              </p>
              <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.85, color: "#666", marginBottom: "16px" }}>
                We supply to major international tailoring and MTM brands because our fine craft production meets their standard. That same hand craft is now available to private clients — at the rates we operate, without the retail intermediary.
              </p>
              <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.85, color: "#666" }}>
                The quality is not adjusted for direct clients. The price is.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {[
                { q: "Are listings paid for?", a: "No. Inclusion in the index is based entirely on assessment. No payment, no sponsorship, no commercial arrangement of any kind is accepted." },
                { q: "How are tailors assessed?", a: "Against four criteria: House Style (coherence and distinctiveness), Fabrication (cloth sourcing and quality), Handwork (canvas construction, hand-stitching, buttonholes), and Customisation (range of options, fitting process, client service)." },
                { q: "What are atelier direct rates?", a: "We supply handcrafted garments to international tailoring and MTM brands. Clients who enquire directly access the same fine craft production at the rates we operate — without the retail mark-up applied by boutiques and department stores." },
                { q: "Who runs Tailors.hk?", a: "A world-leading atelier of handcrafted tailored suits, based in Hong Kong with over 25 years of fine craft production experience. We do not disclose individual names or production partners to protect our clients and supply relationships." },
              ].map((item, i) => (
                <div key={i} style={{ borderTop: "1px solid #e2e2e2", padding: "20px 0" }}>
                  <div style={{ fontFamily: F.display, fontSize: "13px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#111", marginBottom: "8px" }}>{item.q}</div>
                  <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.75, color: "#777", margin: 0 }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── QUALITY CHART ───────────────────────────────────────── */}
      <div id="quality-index">
        <QualityChart />
      </div>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section style={{ padding: "64px 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#bbb", display: "block", marginBottom: "16px" }}>BEGIN</span>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", lineHeight: 1.1, marginBottom: "16px" }}>Enquire for Direct Access</h2>
          <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.75, color: "#888", maxWidth: "420px", margin: "0 auto 28px" }}>Submit a brief and we will advise on the appropriate tier, production timeline, and direct rate for your requirements.</p>
          <Link href="/contact?type=bespoke"><span className="btn-filled">Submit a Brief →</span></Link>
          <p style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#888", marginTop: "16px", textTransform: "uppercase" }}>
            ◆ Atelier Direct · Handcrafted to Order · From HK$12,800
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
