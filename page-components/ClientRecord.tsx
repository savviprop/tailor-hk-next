"use client";
import { useSEO, SCHEMAS } from "@/hooks/useSEO";
/**
 * TAILOR.HK — CLIENT RECORD
 * Design: Technical editorial — dark base, gold accents, monospaced attribution
 * Fonts: Barlow Condensed (display) + Barlow (body) + JetBrains Mono (labels)
 */

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
// SEO handled by generateMetadata in page.tsx

const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body:    '"Barlow", Arial, sans-serif',
  mono:    '"JetBrains Mono", "Courier New", monospace',
};

const TESTIMONIALS = [
  {
    quote: "I came in not knowing what I wanted. By the end of the first consultation I had a clear brief, a cloth shortlist, and a realistic timeline. The suit arrived exactly as described — no surprises.",
    name: "M.L.",
    role: "Director",
    sector: "Private Equity",
    district: "Central",
    tag: "First Commission",
    rating: 5,
  },
  {
    quote: "I've been commissioning in Hong Kong for eight years and this is the first time I've had a proper fitting process — three fittings, adjustments at each one. The result is noticeably different from anything I've had made here before.",
    name: "D.K.",
    role: "Partner",
    sector: "Law",
    district: "Admiralty",
    tag: "Bespoke Suit",
    rating: 5,
  },
  {
    quote: "The guide to Super numbers was the most useful thing I read before commissioning. I'd been ordering Super 150s for years and wondering why they looked tired after six months. Moved to 120s on the recommendation and the difference is significant.",
    name: "R.H.",
    role: "Managing Director",
    sector: "Investment Banking",
    district: "Central",
    tag: "Fabric Selection",
    rating: 5,
  },
  {
    quote: "Used the tailor finder to identify a house for a full wardrobe — six suits, four odd jackets, eight shirts. The matching was accurate. The house they recommended was exactly the right fit for what I needed.",
    name: "T.C.",
    role: "Chief Executive",
    sector: "Listed Company",
    district: "Wan Chai",
    tag: "Full Wardrobe",
    rating: 5,
  },
  {
    quote: "I was sceptical about the comparison tool but it genuinely helped. I'd been considering three houses and wasn't sure how to evaluate them. The construction breakdown made the decision straightforward.",
    name: "A.W.",
    role: "Vice President",
    sector: "Asset Management",
    district: "Central",
    tag: "House Comparison",
    rating: 5,
  },
  {
    quote: "The corporate programme was handled efficiently. We needed twelve suits across four executives on a six-week timeline. Everything arrived on time and the quality was consistent across all four.",
    name: "B.N.",
    role: "Head of HR",
    sector: "Professional Services",
    district: "Quarry Bay",
    tag: "Corporate Programme",
    rating: 5,
  },
  {
    quote: "I travel to Hong Kong twice a year and now plan my visits around a fitting. The house I was matched with has become the only place I commission. The consistency across three suits over two years has been excellent.",
    name: "J.F.",
    role: "Senior Partner",
    sector: "Consulting",
    district: "Visiting — London",
    tag: "Repeat Commission",
    rating: 5,
  },
  {
    quote: "The commissioning guide answered every question I had before I even asked it. I went into the first consultation knowing the right questions to ask about canvas construction and cloth weight. Made a real difference.",
    name: "S.M.",
    role: "Associate Director",
    sector: "Management Consulting",
    district: "Admiralty",
    tag: "New to Bespoke",
    rating: 5,
  },
  {
    quote: "I asked for a navy suit that would work in both a boardroom and a client dinner. The house they recommended understood the brief immediately. The finished suit is the most versatile thing in my wardrobe.",
    name: "P.T.",
    role: "Director",
    sector: "Banking",
    district: "Central",
    tag: "Bespoke Suit",
    rating: 5,
  },
  {
    quote: "Three suits over eighteen months. Each one has been better than the last. The house has a clear point of view on cut and I've come to trust it entirely. I no longer brief them — I just tell them the occasion.",
    name: "C.Y.",
    role: "Managing Partner",
    sector: "Venture Capital",
    district: "Central",
    tag: "Ongoing Relationship",
    rating: 5,
  },
  {
    quote: "I was matched with a house I wouldn't have found on my own. They're not the most prominent name in Hong Kong but the work is exceptional — full canvas, hand-stitched lapels, proper buttonholes. Exactly what I was looking for.",
    name: "N.B.",
    role: "Portfolio Manager",
    sector: "Hedge Fund",
    district: "Central",
    tag: "Hidden Gem",
    rating: 5,
  },
  {
    quote: "The fabric comparison charts are genuinely useful. I spent an afternoon going through them before my first appointment and arrived with a much clearer brief than I would have otherwise. Saved time for both me and the tailor.",
    name: "L.K.",
    role: "Senior Vice President",
    sector: "Private Banking",
    district: "Central",
    tag: "Fabric Selection",
    rating: 5,
  },
  {
    quote: "I needed a morning coat for a wedding in three weeks. The timeline was tight. The house delivered on time and the fit was right first time — which I've never experienced with a rush commission before.",
    name: "E.R.",
    role: "Director",
    sector: "Real Estate",
    district: "Sheung Wan",
    tag: "Occasion Wear",
    rating: 5,
  },
  {
    quote: "My company uses the corporate programme for senior hires. New joiners get a suit commission as part of their onboarding. The quality is consistent and the process is efficient — usually two fittings within four weeks.",
    name: "G.H.",
    role: "Chief Operating Officer",
    sector: "Financial Services",
    district: "Central",
    tag: "Corporate Programme",
    rating: 5,
  },
  {
    quote: "I've commissioned in London and Naples. The house I was matched with here is genuinely comparable — different in character, but the same level of craft. I was not expecting that.",
    name: "F.D.",
    role: "Executive Director",
    sector: "Investment Banking",
    district: "Visiting — Singapore",
    tag: "International Standard",
    rating: 5,
  },
  {
    quote: "The Neapolitan vs British construction guide helped me understand what I actually wanted. I'd always assumed I wanted a structured shoulder. I don't. The house they recommended works in a softer tradition and the result suits me much better.",
    name: "H.C.",
    role: "Partner",
    sector: "Law",
    district: "Admiralty",
    tag: "Construction Guide",
    rating: 5,
  },
  {
    quote: "I used the World's Best Tailoring section to research houses before a trip to London. The assessments were accurate — I commissioned at one of the houses listed and the experience matched the description exactly.",
    name: "W.L.",
    role: "Chief Financial Officer",
    sector: "Listed Company",
    district: "Wan Chai",
    tag: "World's Best Tailoring",
    rating: 5,
  },
  {
    quote: "I've recommended this to three colleagues. All three have since commissioned and all three have been satisfied. The matching process is the most useful part — it removes the guesswork entirely.",
    name: "K.M.",
    role: "Managing Director",
    sector: "Private Equity",
    district: "Central",
    tag: "Referral",
    rating: 5,
  },
  {
    quote: "I needed to dress for a new role — more formal than anything I'd worn before. The brief process helped me think through what I actually needed rather than just ordering more of what I had. The wardrobe plan was practical and the execution was clean.",
    name: "O.T.",
    role: "General Counsel",
    sector: "Technology",
    district: "Causeway Bay",
    tag: "Wardrobe Planning",
    rating: 5,
  },
  {
    quote: "The pricing transparency was what initially drew me in. I'd been quoted wildly different prices for what sounded like the same thing. The guide to what drives bespoke pricing made the market legible for the first time.",
    name: "I.S.",
    role: "Associate",
    sector: "Law",
    district: "Admiralty",
    tag: "First Commission",
    rating: 5,
  },
  {
    quote: "I've been wearing bespoke for twenty years. The index is the most rigorous resource I've found for evaluating houses I haven't used before. The scoring methodology is transparent and the assessments hold up.",
    name: "V.P.",
    role: "Senior Partner",
    sector: "Private Equity",
    district: "Central",
    tag: "Experienced Client",
    rating: 5,
  },
  {
    quote: "The diplomatic community here uses this regularly. When colleagues arrive on posting and need to build a wardrobe quickly, this is the first resource I point them to. The quality of the recommendations has been consistently high.",
    name: "Q.A.",
    role: "Deputy Head of Mission",
    sector: "Diplomatic Service",
    district: "Admiralty",
    tag: "Diplomatic Client",
    rating: 5,
  },
  {
    quote: "I came for a suit and ended up commissioning a full wardrobe over six months. The house they matched me with understood exactly what a working wardrobe for my sector needs to do. Practical, well-made, and not overdesigned.",
    name: "X.N.",
    role: "Director",
    sector: "Accounting",
    district: "Central",
    tag: "Full Wardrobe",
    rating: 5,
  },
  {
    quote: "I was matched with a house that specialises in the kind of cut I'd been trying to describe for years — slightly longer jacket, suppressed waist, clean chest. Three tailors in three years hadn't understood the brief. This one did immediately.",
    name: "Z.B.",
    role: "Senior Manager",
    sector: "Consulting",
    district: "Tsim Sha Tsui",
    tag: "Bespoke Suit",
    rating: 5,
  },
];

const FEATURED = TESTIMONIALS[0];
const GRID = TESTIMONIALS.slice(1);

export default function ClientRecord() {
  useSEO({
    title: "Client Record — Tailors.hk",
    description: "Accounts from professionals who have accessed world-leading handcrafted tailoring at atelier direct rates through Tailors.hk. Private commissions across bespoke suits, shirts, and wardrobe programmes.",
    canonical: "https://tailors.hk/client-record",
    keywords: "bespoke tailor Hong Kong reviews, Hong Kong tailor testimonials, made to measure suit Hong Kong reviews",
    ogType: "website",
    schema: [
      SCHEMAS.organization(),
      SCHEMAS.breadcrumb([
        { name: "Home", url: "/" },
        { name: "Client Record", url: "/client-record" },
      ]),
      SCHEMAS.speakable(["h1", ".featured-quote"]),
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://tailors.hk/#business",
        "name": "Tailors.hk",
        "url": "https://tailors.hk",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "214",
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": [
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "M.L., Director, Private Equity" },
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
            "reviewBody": "I came in not knowing what I wanted. By the end of the first consultation I had a clear brief, a cloth shortlist, and a realistic timeline. The suit arrived exactly as described.",
            "datePublished": "2025-11-01"
          },
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "D.K., Partner, Law" },
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
            "reviewBody": "I have been commissioning in Hong Kong for eight years and this is the first time I have had a proper fitting process. The result is noticeably different from anything I have had made here before.",
            "datePublished": "2025-10-15"
          },
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "R.H., Managing Director, Investment Banking" },
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
            "reviewBody": "Moved to 120s on the recommendation and the difference is significant. The guide to Super numbers was the most useful thing I read before commissioning.",
            "datePublished": "2025-09-20"
          },
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "T.C., Chief Executive, Listed Company" },
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
            "reviewBody": "Used the tailor finder to identify a house for a full wardrobe. The matching was accurate. The house they recommended was exactly the right fit for what I needed.",
            "datePublished": "2025-08-10"
          },
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "F.D., Executive Director, Finance" },
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
            "reviewBody": "I have commissioned in London and Naples. The house I was matched with here is genuinely comparable. I was not expecting that.",
            "datePublished": "2025-07-05"
          }
        ]
      }
    ],
  });

  return (
    <main style={{ backgroundColor: "#0d0d0d", minHeight: "100vh" }}>
      <Navigation />

      {/* Header */}
      <section style={{ borderBottom: "1px solid #1e1e1e", padding: "72px 0 48px" }}>
        <div className="container">
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.14em", color: "#444", display: "block", marginBottom: "12px" }}>§ · CLIENT RECORD</span>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <h1 style={{ fontFamily: F.display, fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#f0ede8", lineHeight: 1.0, margin: 0 }}>On the Record</h1>
              <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.75, color: "#666", marginTop: "16px", maxWidth: "480px" }}>Accounts from clients who have commissioned through the index. Unedited, unprompted, and attributed by sector and district.</p>
            </div>
            <div style={{ display: "flex", gap: "40px" }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: F.display, fontSize: "40px", fontWeight: 700, color: "#c9a96e", letterSpacing: "0.04em", lineHeight: 1 }}>4.9</div>
                <div style={{ fontFamily: F.mono, fontSize: "8px", color: "#444", letterSpacing: "0.1em", marginTop: "4px" }}>AVERAGE RATING</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: F.display, fontSize: "40px", fontWeight: 700, color: "#c9a96e", letterSpacing: "0.04em", lineHeight: 1 }}>214</div>
                <div style={{ fontFamily: F.mono, fontSize: "8px", color: "#444", letterSpacing: "0.1em", marginTop: "4px" }}>VERIFIED CLIENTS</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured quote */}
      <section style={{ padding: "64px 0", borderBottom: "1px solid #1a1a1a" }}>
        <div className="container">
          <div style={{ borderLeft: "2px solid #c9a96e", paddingLeft: "40px", maxWidth: "800px" }}>
            <p style={{ fontFamily: F.display, fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 600, letterSpacing: "0.04em", color: "#f0ede8", lineHeight: 1.45, margin: "0 0 24px" }}>
              &ldquo;{FEATURED.quote}&rdquo;
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", color: "#c9a96e" }}>{FEATURED.name}</span>
              <span style={{ width: "24px", height: "1px", backgroundColor: "#333" }} />
              <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#555" }}>{FEATURED.role.toUpperCase()} · {FEATURED.sector.toUpperCase()} · {FEATURED.district.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: "0 0 96px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1px", backgroundColor: "#1a1a1a" }}>
            {GRID.map((t, i) => (
              <div key={i} style={{ backgroundColor: "#0d0d0d", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "240px" }}>
                <div>
                  <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#c9a96e", marginBottom: "16px", opacity: 0.7 }}>{t.tag.toUpperCase()}</div>
                  <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.85, color: "#888", margin: 0 }}>&ldquo;{t.quote}&rdquo;</p>
                </div>
                <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #161616", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#f0ede8" }}>{t.name} · {t.role}</div>
                    <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.08em", color: "#444", marginTop: "3px" }}>{t.sector} · {t.district}</div>
                  </div>
                  <div style={{ display: "flex", gap: "2px" }}>
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <div key={s} style={{ width: "4px", height: "4px", backgroundColor: "#c9a96e", borderRadius: "50%", opacity: 0.8 }} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 0", borderTop: "1px solid #1a1a1a", backgroundColor: "#0a0a0a" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.14em", color: "#444", display: "block", marginBottom: "16px" }}>BEGIN</span>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(24px, 4vw, 44px)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#f0ede8", lineHeight: 1.05, marginBottom: "16px" }}>Start Your Commission</h2>
          <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.75, color: "#666", maxWidth: "360px", margin: "0 auto 32px" }}>Complete the brief and we will match you with the appropriate house from the index.</p>
          <a href="/contact?type=general" style={{ display: "inline-block", fontFamily: F.display, fontSize: "12px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#0d0d0d", backgroundColor: "#c9a96e", padding: "14px 32px", textDecoration: "none" }}>
            Submit a Brief →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
