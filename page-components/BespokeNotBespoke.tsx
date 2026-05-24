"use client";
import { useSEO, SCHEMAS } from "@/hooks/useSEO";
/**
 * BespokeNotBespoke — Editorial guide page
 * Route: /bespoke-not-bespoke
 * Design: Dark editorial luxury, Barlow Condensed + JetBrains Mono
 * Purpose: SEO authority piece on construction standards in HK tailoring market.
 *          Positions Tailors.hk as the expert voice on craft distinction.
 *          Guide/editorial tone — NO supplier language, purely authoritative.
 */

import { Link } from "@/lib/wouter-shim";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
// SEO handled by generateMetadata in page.tsx
import BookmarkButton from "@/components/BookmarkButton";
import ShareButton from "@/components/ShareButton";

const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body: '"Barlow", Arial, sans-serif',
  mono: '"JetBrains Mono", "Courier New", monospace',
};

const GOLD = "#c9a96e";

export default function BespokeNotBespoke() {
  useSEO({
    title: "Why Most Bespoke Suits in Hong Kong Are Not Bespoke | Tailors.hk",
    description:
      "Hong Kong has hundreds of tailors. Most are not producing bespoke garments in any meaningful sense. This guide explains the distinction — what bespoke actually means, how to identify it, and why it matters.",
    canonical: "https://tailors.hk/bespoke-not-bespoke",
    keywords:
      "bespoke suit Hong Kong, fused vs canvassed suit, full canvas bespoke Hong Kong, how to identify bespoke tailor, Hong Kong tailoring quality",
    ogType: "article",
    schema: [
      SCHEMAS.breadcrumb([
        { name: "Home", url: "/" },
        { name: "Guides", url: "/tailor-guides" },
        { name: "Why Most Bespoke Suits in Hong Kong Are Not Bespoke", url: "/bespoke-not-bespoke" },
      ]),
      SCHEMAS.speakable(["h1", "h2"]),
      SCHEMAS.article({
        title: "Why Most Bespoke Suits in Hong Kong Are Not Bespoke",
        description: "An authoritative guide to construction standards in Hong Kong tailoring — what bespoke actually means, how to identify it, and why the distinction matters.",
        url: "/bespoke-not-bespoke",
        image: "https://tailors.hkhttps://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/INJQJnMGaXUHzrAO.jpeg",
        datePublished: "2026-05-08",
        dateModified: "2026-05-12",
        authorName: "Tailors.hk Editorial Team",
        authorDescription: "Menswear professionals with over 25 years of expertise in bespoke tailoring and Hong Kong tailoring.",
        keywords: ["bespoke suit Hong Kong", "full canvas suit", "fused interlining", "handcrafted tailoring", "Hong Kong tailor quality"],
        wordCount: 2800,
      }),
      SCHEMAS.faq([
        { question: "What does bespoke actually mean?", answer: "Bespoke refers to a garment made entirely from scratch to a client's individual measurements, with a personal pattern cut by a skilled cutter, and constructed using traditional hand-finishing techniques including a floating canvas interlining." },
        { question: "How can I tell if a Hong Kong tailor is producing true bespoke?", answer: "Ask to see the pattern — a bespoke house will have a unique paper or card pattern for your measurements. Ask about the interlining: full canvas (floating) construction is the hallmark of true bespoke. Ask how many fittings are included: at least two is standard for bespoke." },
        { question: "What is the difference between bespoke and made-to-measure?", answer: "Bespoke starts from a blank pattern cut to your measurements. Made-to-measure adapts a standard block pattern. Bespoke typically involves more fittings, more hand-finishing, and a higher degree of customisation." },
        { question: "Why do most Hong Kong tailors call their work bespoke when it is not?", answer: "The term bespoke is unregulated outside the UK. Many Hong Kong tailors use it to mean any custom-ordered garment, regardless of construction method. True bespoke — with a floating canvas, hand-stitched lapels, and a personal pattern — is produced by a small number of houses." },
      ]),
    ],
  });

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <Navigation />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div style={{
        background: "#000",
        paddingTop: "80px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background thumbnail image */}
        <img
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/INJQJnMGaXUHzrAO.jpeg"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.22,
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "80px 24px 64px" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "32px" }}>
            <Link href="/guides">
              <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", color: "#444", textTransform: "uppercase", cursor: "pointer" }}>
                Guides
              </span>
            </Link>
            <span style={{ fontFamily: F.mono, fontSize: "9px", color: "#333" }}>·</span>
            <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", color: "#555", textTransform: "uppercase" }}>
              Methodology
            </span>
          </div>

          {/* Category label */}
          <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.18em", color: "#444", textTransform: "uppercase", marginBottom: "20px" }}>
            METHODOLOGY GUIDE · 10 MIN READ
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: F.display,
            fontSize: "clamp(32px, 5vw, 58px)",
            fontWeight: 700,
            letterSpacing: "0.02em",
            textTransform: "uppercase",
            color: "#fff",
            lineHeight: 1.05,
            margin: "0 0 28px",
          }}>
            Why Most Bespoke Suits in Hong Kong Are Not Bespoke
          </h1>

          {/* Standfirst */}
          <p style={{
            fontFamily: F.body,
            fontSize: "18px",
            color: "#999",
            lineHeight: 1.7,
            margin: "0 0 40px",
            maxWidth: "620px",
          }}>
            Hong Kong has hundreds of tailors. Most are not producing bespoke garments in any meaningful sense. This guide explains the distinction — what bespoke actually requires, how to identify it, and why it matters to the client who intends to wear the suit for twenty years.
          </p>

          {/* Meta row */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", color: "#444", textTransform: "uppercase" }}>
              Tailors.hk Editorial · May 2026
            </span>
            <BookmarkButton
              item={{ slug: "bespoke-not-bespoke", title: "Why Most Bespoke Suits in Hong Kong Are Not Bespoke", category: "Construction", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/INJQJnMGaXUHzrAO.jpeg", excerpt: "Hong Kong has hundreds of tailors. Most are not producing bespoke garments in any meaningful sense." }}
              variant="label"
              scheme="dark"
            />
            <ShareButton
              title="Why Most Bespoke Suits in Hong Kong Are Not Bespoke"
              text="Hong Kong has hundreds of tailors. Most are not producing bespoke garments in any meaningful sense."
              variant="label"
              scheme="dark"
            />
          </div>
        </div>
      </div>

      {/* ── Divider ────────────────────────────────────────────────────────────────── */}
      <div style={{ height: "1px", background: "#111" }} />

      {/* ── Article body ─────────────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "64px 24px 80px" }}>

        {/* ─ Section 1 ─ */}
        <section style={{ marginBottom: "64px" }}>
          <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.18em", color: "#bbb", textTransform: "uppercase", marginBottom: "20px" }}>
            § 01 · THE PROBLEM WITH THE WORD
          </div>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "#111", lineHeight: 1.15, marginBottom: "20px" }}>
            "Bespoke" Has Been Diluted Beyond Recognition
          </h2>
          <p style={{ fontFamily: F.body, fontSize: "16px", color: "#333", lineHeight: 1.85, marginBottom: "18px" }}>
            Walk through Central or Tsim Sha Tsui and the word appears on nearly every shopfront. "Bespoke tailoring." "Bespoke suits." "Bespoke from HK$3,000." The term has been applied so broadly that it has ceased to communicate anything precise about how a garment is made.
          </p>
          <p style={{ fontFamily: F.body, fontSize: "16px", color: "#333", lineHeight: 1.85, marginBottom: "18px" }}>
            In its original meaning — derived from the English trade, where cloth was said to be "bespoken" for a specific client — bespoke referred to a garment cut from a personal pattern, constructed entirely by hand, and fitted across multiple sessions until the result was exact. That definition implies a specific set of physical processes: a drafted block, a full canvas chest, hand-padded lapels, hand-felled linings, and a pattern that belongs permanently to the client.
          </p>
          <p style={{ fontFamily: F.body, fontSize: "16px", color: "#333", lineHeight: 1.85 }}>
            Most of what is sold as bespoke in Hong Kong today satisfies none of these criteria.
          </p>
        </section>

        {/* ─ Pull quote ─ */}
        <blockquote style={{
          borderLeft: `3px solid ${GOLD}`,
          paddingLeft: "24px",
          margin: "0 0 64px",
          fontFamily: F.display,
          fontSize: "clamp(20px, 2.5vw, 26px)",
          fontWeight: 600,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: "#111",
          lineHeight: 1.3,
        }}>
          "Most of what is sold as bespoke in Hong Kong is a factory-cut garment with a client's measurements applied."
        </blockquote>

        {/* ─ Section 2 ─ */}
        <section style={{ marginBottom: "64px" }}>
          <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.18em", color: "#bbb", textTransform: "uppercase", marginBottom: "20px" }}>
            § 02 · WHAT ACTUALLY HAPPENS IN MOST SHOPS
          </div>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "#111", lineHeight: 1.15, marginBottom: "20px" }}>
            The Factory Model Behind the Shopfront
          </h2>
          <p style={{ fontFamily: F.body, fontSize: "16px", color: "#333", lineHeight: 1.85, marginBottom: "18px" }}>
            The typical process at the majority of Hong Kong tailoring shops follows a pattern that has little to do with traditional craft. A client is measured, selects a fabric from a book of swatches, and returns for one or two fittings. The garment is cut and assembled — not in the shop, but in a factory, using pre-existing block patterns adjusted by machine to approximate the client’s measurements.
          </p>
          <p style={{ fontFamily: F.body, fontSize: "16px", color: "#333", lineHeight: 1.85, marginBottom: "18px" }}>
            The chest piece — the internal structure that gives a jacket its shape and drape — is fused rather than canvassed. Fusing means the interlining is glued to the outer fabric using heat and adhesive. It is fast, cheap, and consistent. It is also the defining characteristic of a factory garment. A fused jacket will delaminate — the glue separates from the fabric — within three to five years of regular wear, particularly in Hong Kong's humid climate. The chest loses its structure. The lapels develop a slight bubble. The garment, which may have cost HK$15,000 or more, begins to look like what it is.
          </p>

          {/* Construction comparison table */}
          <div style={{ margin: "32px 0", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: F.body, fontSize: "14px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #111" }}>
                  <th style={{ textAlign: "left", padding: "12px 16px 12px 0", fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", fontWeight: 400 }}>Construction</th>
                  <th style={{ textAlign: "left", padding: "12px 16px", fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", fontWeight: 400 }}>Method</th>
                  <th style={{ textAlign: "left", padding: "12px 16px", fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", fontWeight: 400 }}>Lifespan</th>
                  <th style={{ textAlign: "left", padding: "12px 16px", fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", fontWeight: 400 }}>Typical price range (HK)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: "Fully fused", method: "Machine-glued interlining", life: "3–5 years", price: "HK$3,000–18,000", highlight: false },
                  { type: "Half canvas", method: "Canvas in chest only, fused below", life: "8–12 years", price: "HK$12,000–25,000", highlight: false },
                  { type: "Full canvas", method: "Hand-stitched floating canvas throughout", life: "20–30+ years", price: "HK$12,800–50,000+", highlight: true },
                ].map((row) => (
                  <tr key={row.type} style={{ borderBottom: "1px solid #e8e8e8", background: row.highlight ? "#fffdf8" : "transparent" }}>
                    <td style={{ padding: "14px 16px 14px 0", color: row.highlight ? "#111" : "#444", fontWeight: row.highlight ? 600 : 400 }}>
                      {row.type}
                      {row.highlight && (
                        <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: GOLD, marginLeft: "8px", textTransform: "uppercase" }}>
                          True bespoke
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "14px 16px", color: "#555" }}>{row.method}</td>
                    <td style={{ padding: "14px 16px", color: "#555" }}>{row.life}</td>
                    <td style={{ padding: "14px 16px", color: "#555" }}>{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ fontFamily: F.mono, fontSize: "8px", color: "#aaa", letterSpacing: "0.08em", marginTop: "8px" }}>
              TABLE 1 · CONSTRUCTION METHODS AND EXPECTED LIFESPAN · TAILORS.HK METHODOLOGY INDEX
            </div>
          </div>

          <p style={{ fontFamily: F.body, fontSize: "16px", color: "#333", lineHeight: 1.85 }}>
            A full canvas jacket, by contrast, contains a floating layer of woven horsehair and wool canvas that is hand-stitched — not glued — to the chest. Over time, through wearing and pressing, the canvas moulds to the wearer's body. The garment improves with age. The chest becomes more natural, the drape more personal. This is not a marketing claim. It is a physical consequence of the construction method.
          </p>
        </section>

        {/* ─ Section 3 ─ */}
        <section style={{ marginBottom: "64px" }}>
          <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.18em", color: "#bbb", textTransform: "uppercase", marginBottom: "20px" }}>
            § 03 · THE PATTERN QUESTION
          </div>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "#111", lineHeight: 1.15, marginBottom: "20px" }}>
            A Bespoke Pattern Is Not a Template with Your Measurements
          </h2>
          <p style={{ fontFamily: F.body, fontSize: "16px", color: "#333", lineHeight: 1.85, marginBottom: "18px" }}>
            The second defining characteristic of genuine bespoke is the pattern. A true bespoke pattern is drafted from scratch for a specific client — a unique set of shapes derived from their measurements, posture, and physical asymmetries. No two bespoke patterns are identical, because no two bodies are identical.
          </p>
          <p style={{ fontFamily: F.body, fontSize: "16px", color: "#333", lineHeight: 1.85, marginBottom: "18px" }}>
            What most Hong Kong shops offer is more accurately described as made-to-measure: a standard block pattern — a template — adjusted at the seams to approximate the client's dimensions. The block was designed for a notional average body. The adjustments compensate for the difference between that average and the client's actual measurements. The result fits better than an off-the-rack garment, but it is not the same as a garment built from the ground up for a specific person.
          </p>
          <p style={{ fontFamily: F.body, fontSize: "16px", color: "#333", lineHeight: 1.85 }}>
            This distinction matters most for clients with non-standard proportions — a high right shoulder, a pronounced forward lean, a longer torso relative to leg length. A block-adjusted garment will accommodate these differences imperfectly. A drafted pattern accommodates them completely, because it was designed around them from the outset.
          </p>
        </section>

        {/* ─ Section 5 ─ */}
        <section style={{ marginBottom: "64px" }}>
          <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.18em", color: "#bbb", textTransform: "uppercase", marginBottom: "20px" }}>
            § 04 · THE HANDFUL THAT REMAIN
          </div>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "#111", lineHeight: 1.15, marginBottom: "20px" }}>
            The Houses That Still Work This Way
          </h2>
          <p style={{ fontFamily: F.body, fontSize: "16px", color: "#333", lineHeight: 1.85, marginBottom: "18px" }}>
            There are tailors in Hong Kong who still work in the traditional manner. They are not numerous. The economics of genuine bespoke — the time required, the skill required, the number of fittings required — make it difficult to operate at scale in a city where retail rents are among the highest in the world. Many of the craftsmen who learned this work in the Shanghainese tradition that arrived in Hong Kong in the 1940s and 1950s have retired. Their apprentices, in many cases, have not continued the work.
          </p>
          <p style={{ fontFamily: F.body, fontSize: "16px", color: "#333", lineHeight: 1.85, marginBottom: "18px" }}>
            What remains is a small number of houses — fewer than a dozen by any reasonable count — that maintain the full process: personal pattern, full canvas construction, multiple fittings, in-house cutting and finishing. These houses are not always the most visible. They do not always have the most prominent shopfronts. They are identifiable by their work and by their willingness to answer the questions above directly.
          </p>
          <p style={{ fontFamily: F.body, fontSize: "16px", color: "#333", lineHeight: 1.85 }}>
            The client who understands the distinction will find them. The client who does not will pay a premium for a factory product and wonder, in five years, why the chest has gone flat.
          </p>
        </section>

        {/* ─ Final note ─ */}
        <div style={{
          borderTop: "1px solid #e8e8e8",
          paddingTop: "40px",
          marginBottom: "48px",
        }}>
          <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.18em", color: "#bbb", textTransform: "uppercase", marginBottom: "16px" }}>
            A NOTE ON THIS GUIDE
          </div>
          <p style={{ fontFamily: F.body, fontSize: "14px", color: "#888", lineHeight: 1.8 }}>
            This guide is written as an educational resource for clients considering a commission in Hong Kong. It does not name specific tailoring houses — neither to recommend nor to criticise. The purpose is to give the reader the vocabulary and the questions necessary to make their own assessment. The tailoring market in Hong Kong is not uniform. The difference between the best and the rest is significant, and it is not reflected in price.
          </p>
        </div>

        {/* ─ Share + CTA ─ */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <BookmarkButton
              item={{ slug: "bespoke-not-bespoke", title: "Why Most Bespoke Suits in Hong Kong Are Not Bespoke", category: "Construction", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/INJQJnMGaXUHzrAO.jpeg", excerpt: "Hong Kong has hundreds of tailors. Most are not producing bespoke garments in any meaningful sense." }}
              variant="label"
              scheme="light"
            />
            <ShareButton
              title="Why Most Bespoke Suits in Hong Kong Are Not Bespoke"
              text="Hong Kong has hundreds of tailors. Most are not producing bespoke garments in any meaningful sense."
              variant="label"
              scheme="light"
            />
          </div>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link href="/tailor-guides">
              <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", cursor: "pointer" }}>
                ← ALL GUIDES
              </span>
            </Link>
            <Link href="/contact?type=bespoke">
              <span style={{
                display: "inline-block", padding: "10px 22px",
                background: "#111", fontFamily: F.mono, fontSize: "9px",
                letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", cursor: "pointer",
              }}>
                Submit a Commission Brief →
              </span>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
