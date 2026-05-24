"use client";
/**
 * TAILOR.HK — FOOTER
 * Design: Technical editorial — dark base, JetBrains Mono data labels, section numbering
 * Fonts: Barlow Condensed (headings/links) + JetBrains Mono (labels/data)
 */

import { Link } from "@/lib/wouter-shim";
import { pageEnquiryUrl } from "@/lib/whatsapp";

const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body:    '"Barlow", Arial, sans-serif',
  mono:    '"JetBrains Mono", "Courier New", monospace',
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#111", borderTop: "2px solid #1e1e1e" }}>

      {/* ── Main columns ── */}
      <div className="container" style={{ padding: "52px 20px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "40px" }}>

          {/* Brand */}
          <div>
            <Link href="/">
              <span style={{
                fontFamily: F.display, fontSize: "20px", fontWeight: 700,
                letterSpacing: "0.28em", textTransform: "uppercase",
                color: "#fff", display: "block", marginBottom: "10px",
              }}>
                TAILORS
              </span>
            </Link>
            <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.08em", color: "#444", marginBottom: "16px", lineHeight: 1.9 }}>
              TAILORS.HK<br />
              WORLD-LEADING SUPPLIER<br />
              BY APPOINTMENT
            </div>
            <p style={{ fontFamily: F.mono, fontSize: "10px", letterSpacing: "0.06em", lineHeight: 1.75, color: "#666", marginBottom: "18px", maxWidth: "220px", textTransform: "uppercase" }}>
              A world-leading supplier of handcrafted tailored suits. Atelier direct rates — trusted by professionals.
            </p>
            <a
              href={pageEnquiryUrl("Footer")}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "5px",
                fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em",
                color: "#22c55e", padding: "6px 12px",
                border: "1px solid #22c55e",
                transition: "background 0.18s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(34,197,94,0.1)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
            >
              WHATSAPP US →
            </a>
          </div>

          {/* Tailoring */}
          <div>
            <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#444", marginBottom: "14px", paddingBottom: "10px", borderBottom: "1px solid #1e1e1e" }}>
              § 01 · TAILORING
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "Atelier Direct",     href: "/atelier-direct" },
                { label: "Tailored Menswear",   href: "/tailored-menswear" },
                { label: "Suits by Tailor",     href: "/suits-by-tailor" },
                { label: "How It Works",        href: "/how-it-works" },
                { label: "Executive Tailoring", href: "/executive-tailoring" },
                { label: "Corporate Rewards",   href: "/corporate-rewards" },
              ].map((l) => (
                <Link key={l.href} href={l.href}>
                  <span style={{
                    fontFamily: F.display, fontSize: "11px", fontWeight: 500,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "#777", transition: "color 0.15s", cursor: "pointer",
                  }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.color = "#fff"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.color = "#777"; }}
                  >
                    {l.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Guides */}
          <div>
            <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#444", marginBottom: "14px", paddingBottom: "10px", borderBottom: "1px solid #1e1e1e" }}>
              § 02 · GUIDES
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "All Guides",            href: "/tailor-guides" },
                { label: "Hong Kong's Finest Tailoring", href: "/tailor-guides/hk-finest-tailoring" },
                { label: "Bespoke vs MTM vs RTW", href: "/tailor-guides/bespoke-made-to-measure-and-ready-to-wear-suit-guide" },
                { label: "Suit Fabrics Guide",    href: "/tailor-guides/essential-guide-to-suit-fabrics" },
                { label: "Tailor Finder Brief",    href: "/tailor-finder-quiz" },
              ].map((l) => (
                <Link key={l.href} href={l.href}>
                  <span style={{
                    fontFamily: F.display, fontSize: "11px", fontWeight: 500,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "#777", transition: "color 0.15s", cursor: "pointer",
                  }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.color = "#fff"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.color = "#777"; }}
                  >
                    {l.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#444", marginBottom: "14px", paddingBottom: "10px", borderBottom: "1px solid #1e1e1e" }}>
              § 03 · COMPANY
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
              {[
                { label: "About",         href: "/about" },
                { label: "FAQ",           href: "/faqs" },
                { label: "Contact",       href: "/contact" },
                { label: "Client Record", href: "/client-record" },
              ].map((l) => (
                <Link key={l.href} href={l.href}>
                  <span style={{
                    fontFamily: F.display, fontSize: "11px", fontWeight: 500,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "#777", transition: "color 0.15s", cursor: "pointer",
                  }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.color = "#fff"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.color = "#777"; }}
                  >
                    {l.label}
                  </span>
                </Link>
              ))}
            </div>
            <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.06em", color: "#444", lineHeight: 1.9, textTransform: "uppercase" as const }}>
              <div style={{ color: "#555", marginBottom: "2px" }}>EMAIL</div>
              <a href="mailto:info@tailorshongkong.com" style={{ color: "#777", display: "block", marginBottom: "12px" }}>
                INFO@TAILORSHONGKONG.COM
              </a>
              <div style={{ color: "#555", marginBottom: "2px" }}>LOCATION</div>
              <div style={{ color: "#555" }}>HONG KONG<br />BY APPOINTMENT</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: "1px solid #1e1e1e" }}>
        <div className="container" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 20px", flexWrap: "wrap", gap: "8px",
        }}>
          <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.06em", color: "#3a3a3a" }}>
            © {year} TAILORS.HK · ALL RIGHTS RESERVED
          </span>
          <div style={{ display: "flex", gap: "18px" }}>
            {["Privacy Policy", "Terms of Use"].map((label) => (
              <span key={label} style={{
                fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.06em",
                color: "#3a3a3a", cursor: "pointer", transition: "color 0.15s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.color = "#777"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.color = "#3a3a3a"; }}
              >
                {label.toUpperCase()}
              </span>
            ))}
          </div>
          <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.06em", color: "#2a2a2a" }}>
            TAILORS.HK · v3.0
          </span>
        </div>
      </div>
    </footer>
  );
}
