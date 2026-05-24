/**
 * QualityChart — Brand Quality Positioning Chart
 * Design: Horizontal tier ladder, dark editorial aesthetic
 * Shows RTW brands tiered by construction quality and fabric sourcing
 * Atelier Direct positioned at Tier I alongside Kiton
 */

import { useState } from "react";

const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body:    '"Barlow", Arial, sans-serif',
  mono:    '"JetBrains Mono", "Courier New", monospace',
};

interface Brand {
  name: string;
  note: string;
  isAtelier?: boolean;
}

interface Tier {
  level: string;
  label: string;
  sublabel: string;
  description: string;
  fabricNote: string;
  constructionNote: string;
  brands: Brand[];
  bg: string;
  textColor: string;
  accentColor: string;
  borderColor: string;
}

const TIERS: Tier[] = [
  {
    level: "I",
    label: "PINNACLE",
    sublabel: "FULL BESPOKE CONSTRUCTION · WORLD'S FINEST CLOTH",
    description: "Full floating canvas, hand-padded lapels, hand-sewn buttonholes, hand-felled linings. Cloth sourced exclusively from the top tier of Italian and British mills — Loro Piana, Holland & Sherry, Scabal Goldline. At this tier, every garment is produced by hand, to order, by a single craftsman — not on a production line.",
    fabricNote: "Loro Piana, Holland & Sherry, Carlo Barbera, Scabal, Dormeuil top-grade",
    constructionNote: "Fully handcrafted to order · Full floating canvas · Hand-padded · Hand-sewn throughout",
    brands: [
      { name: "Atelier Direct", note: "HANDCRAFTED TO ORDER", isAtelier: true },
      { name: "Kiton", note: "NAPLES" },
      { name: "Cesare Attolini", note: "NAPLES" },
      { name: "Rubinacci", note: "NAPLES" },
    ],
    bg: "#111",
    textColor: "#fff",
    accentColor: "#c9a96e",
    borderColor: "#333",
  },
  {
    level: "II",
    label: "LUXURY",
    sublabel: "PARTIAL CANVAS · PREMIUM CLOTH",
    description: "Partial or half-canvas construction. Premium cloth from established mills. Strong brand heritage but construction shortcuts — fused foreparts common in lower lines.",
    fabricNote: "Ermenegildo Zegna Cloth, Loro Piana (standard grade)",
    constructionNote: "Half canvas or partial canvas · Machine-finished details",
    brands: [
      { name: "Brioni", note: "Rome" },
      { name: "Ermenegildo Zegna", note: "MILAN" },
      { name: "Brunello Cucinelli", note: "Solomeo" },
      { name: "Loro Piana", note: "RTW line" },
      { name: "Isaia", note: "NAPLES" },
      { name: "Boglioli", note: "MILAN" },
    ],
    bg: "#1c1c1c",
    textColor: "#e8e8e8",
    accentColor: "#a0a0a0",
    borderColor: "#2e2e2e",
  },
  {
    level: "III",
    label: "PREMIUM",
    sublabel: "FUSED OR LIGHT CANVAS · MID-GRADE CLOTH",
    description: "Predominantly fused construction with light canvas in select models. Cloth quality varies — mid-grade wools, often house-branded fabrics. Strong marketing, moderate craft.",
    fabricNote: "House-branded fabrics, mid-grade Biella wools",
    constructionNote: "Fused or light canvas · Machine-sewn throughout",
    brands: [
      { name: "Thom Browne", note: "NEW YORK" },
      { name: "Canali", note: "MILAN" },
      { name: "Lardini", note: "Filottrano" },
      { name: "Corneliani", note: "Mantua" },
      { name: "Caruso", note: "Soragna" },
      { name: "Pal Zileri", note: "Vicenza" },
    ],
    bg: "#242424",
    textColor: "#c8c8c8",
    accentColor: "#777",
    borderColor: "#333",
  },
  {
    level: "IV",
    label: "FASHION",
    sublabel: "FULLY FUSED · BRAND-DRIVEN PRICING",
    description: "Fully fused construction. Fabric quality secondary to brand identity and seasonal design. Price premium driven by brand equity, not craft. Typically manufactured in Eastern Europe or Asia.",
    fabricNote: "Proprietary blends, polyester mixes common",
    constructionNote: "Fully fused · No canvas · Machine-sewn",
    brands: [
      { name: "Prada", note: "MILAN" },
      { name: "Saint Laurent", note: "PARIS" },
      { name: "Bottega Veneta", note: "Vicenza" },
      { name: "Celine", note: "PARIS" },
      { name: "Balenciaga", note: "PARIS" },
      { name: "Givenchy", note: "PARIS" },
      { name: "Alexander McQueen", note: "LONDON" },
      { name: "Valentino", note: "Rome" },
    ],
    bg: "#2c2c2c",
    textColor: "#999",
    accentColor: "#555",
    borderColor: "#3a3a3a",
  },
];

export function QualityChart() {
  const [activeTier, setActiveTier] = useState<string | null>("I");
  const active = TIERS.find(t => t.level === activeTier) ?? null;

  return (
    <div style={{ backgroundColor: "#0d0d0d", padding: "64px 0" }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", color: "#555", display: "block", marginBottom: "12px" }}>QUALITY POSITIONING INDEX</span>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#fff", lineHeight: 1.05, marginBottom: "12px" }}>
            WHERE CRAFT MEETS COMMERCE
          </h2>
          <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.75, color: "#666", maxWidth: "560px" }}>
            A construction and fabric quality index across major ready-to-wear suiting brands. Ranked by canvas type, hand-finishing, and cloth sourcing — not retail price.
          </p>
        </div>

        {/* Tier selector — vertical ladder */}
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.6fr)", gap: "2px", alignItems: "stretch" }}>
          {/* Left: tier list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {TIERS.map((tier) => {
              const isActive = activeTier === tier.level;
              return (
                <button
                  key={tier.level}
                  onClick={() => setActiveTier(tier.level)}
                  style={{
                    textAlign: "left",
                    padding: "20px 24px",
                    backgroundColor: isActive ? tier.bg : "#161616",
                    border: "none",
                    borderLeft: isActive ? `3px solid ${tier.accentColor}` : "3px solid transparent",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <span style={{
                    fontFamily: F.mono,
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    color: isActive ? tier.accentColor : "#444",
                    minWidth: "20px",
                  }}>
                    {tier.level}
                  </span>
                  <div>
                    <div style={{ fontFamily: F.display, fontSize: "15px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: isActive ? tier.textColor : "#555", marginBottom: "2px" }}>
                      {tier.label}
                    </div>
                    <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.06em", color: isActive ? tier.accentColor : "#3a3a3a" }}>
                      {tier.sublabel}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: detail panel */}
          {active && (
            <div style={{ backgroundColor: active.bg, padding: "32px", borderLeft: `3px solid ${active.accentColor}`, display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Tier header */}
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "8px" }}>
                  <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", color: active.accentColor }}>TIER {active.level}</span>
                  <span style={{ fontFamily: F.display, fontSize: "22px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: active.textColor }}>{active.label}</span>
                </div>
                <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.75, color: active.level === "I" ? "rgba(255,255,255,0.65)" : "#666", margin: 0 }}>
                  {active.description}
                </p>
              </div>

              {/* Specs */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ borderTop: `1px solid ${active.borderColor}`, paddingTop: "12px" }}>
                  <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: active.accentColor, display: "block", marginBottom: "4px" }}>CLOTH</span>
                  <span style={{ fontFamily: F.body, fontSize: "12px", color: active.textColor, lineHeight: 1.5 }}>{active.fabricNote}</span>
                </div>
                <div style={{ borderTop: `1px solid ${active.borderColor}`, paddingTop: "12px" }}>
                  <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: active.accentColor, display: "block", marginBottom: "4px" }}>CONSTRUCTION</span>
                  <span style={{ fontFamily: F.body, fontSize: "12px", color: active.textColor, lineHeight: 1.5 }}>{active.constructionNote}</span>
                </div>
              </div>

              {/* Brands */}
              <div>
                <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: active.accentColor, display: "block", marginBottom: "12px" }}>BRANDS AT THIS TIER</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {active.brands.map((brand) => (
                    <div
                      key={brand.name}
                      style={{
                        padding: "6px 14px",
                        border: brand.isAtelier ? `1.5px solid ${active.accentColor}` : `1px solid ${active.borderColor}`,
                        backgroundColor: brand.isAtelier ? active.accentColor : "transparent",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1px",
                      }}
                    >
                      <span style={{ fontFamily: F.display, fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: brand.isAtelier ? "#111" : active.textColor }}>
                        {brand.name}
                      </span>
                      <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.04em", color: brand.isAtelier ? "rgba(0,0,0,0.6)" : active.accentColor }}>
                        {brand.note}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Atelier callout for Tier I */}
              {active.level === "I" && (
                <div style={{ borderTop: `1px solid #333`, paddingTop: "16px" }}>
                  <p style={{ fontFamily: F.body, fontSize: "12px", lineHeight: 1.7, color: "rgba(255,255,255,0.5)", margin: 0 }}>
                    The houses at this tier represent the ceiling of ready-to-wear production. Atelier Direct garments are produced by a single craftsman, entirely by hand, to your measurements and specifications. The cloth is the same. The construction method is the same. The difference is that no two garments are identical — each is made once, for one person. Available to private clients from HK$12,800.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile: stacked view */}
        <style>{`
          @media (max-width: 640px) {
            .quality-chart-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

        {/* Legend */}
        <div style={{ marginTop: "32px", display: "flex", gap: "24px", flexWrap: "wrap" }}>
          {TIERS.map(t => (
            <div key={t.level} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "3px", height: "16px", backgroundColor: t.accentColor }} />
              <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.08em", color: "#555" }}>
                {t.level} · {t.label.toUpperCase()}
              </span>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.04em", color: "#3a3a3a", marginTop: "24px", lineHeight: 1.6 }}>
          Index based on publicly available construction specifications, fabric sourcing, and industry assessment. Tier placement reflects production quality, not brand prestige or retail price. Individual product lines within brands may vary.
        </p>
      </div>
    </div>
  );
}
