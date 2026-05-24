/**
 * SizeGuide — Size selector + size guide modal
 * Design: Dark mono editorial, consistent with site aesthetic
 * Sizes from Magnus & Novus size chart (UK/US/IT/EU/FR)
 * Note: Size is for reference only — Bespoke & MTM are fully custom
 * Modal: Custom-built measurement table in JetBrains Mono + Barlow Condensed (no image)
 */

import { useState } from "react";

const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body:    '"Barlow", Arial, sans-serif',
  mono:    '"JetBrains Mono", "Courier New", monospace',
};

// ─── SIZE DATA ────────────────────────────────────────────────────────────────

export const JACKET_SIZES = [
  { label: "34", sub: "UK/US 34 · IT/EU/FR 44" },
  { label: "36", sub: "UK/US 36 · IT/EU/FR 46" },
  { label: "38", sub: "UK/US 38 · IT/EU/FR 48" },
  { label: "40", sub: "UK/US 40 · IT/EU/FR 50" },
  { label: "42", sub: "UK/US 42 · IT/EU/FR 52" },
  { label: "44", sub: "UK/US 44 · IT/EU/FR 54" },
  { label: "46", sub: "UK/US 46 · IT/EU/FR 56" },
];

export const SHIRT_SIZES = [
  { label: "34 / 15\"",   sub: "UK/US 34 · IT/EU/FR 44" },
  { label: "36 / 15\"",   sub: "UK/US 36 · IT/EU/FR 46" },
  { label: "38 / 15.5\"", sub: "UK/US 38 · IT/EU/FR 48" },
  { label: "40 / 16\"",   sub: "UK/US 40 · IT/EU/FR 50" },
  { label: "42 / 16.5\"", sub: "UK/US 42 · IT/EU/FR 52" },
  { label: "44 / 17\"",   sub: "UK/US 44 · IT/EU/FR 54" },
  { label: "46 / 17.5\"", sub: "UK/US 46 · IT/EU/FR 56" },
];

export const TROUSER_SIZES = [
  { label: "28", sub: "UK/US 28 · IT/EU 44" },
  { label: "30", sub: "UK/US 30 · IT/EU 46" },
  { label: "32", sub: "UK/US 32 · IT/EU 48" },
  { label: "34", sub: "UK/US 34 · IT/EU 50" },
  { label: "36", sub: "UK/US 36 · IT/EU 52" },
  { label: "38", sub: "UK/US 38 · IT/EU 54" },
  { label: "40", sub: "UK/US 40 · IT/EU 56" },
];

// ─── MEASUREMENT TABLES ───────────────────────────────────────────────────────

const JACKET_TABLE = {
  heading: "JACKET / SUIT / BLAZER / OVERCOAT",
  columns: ["UK/US", "IT/EU/FR", "CHEST (CM)", "WAIST (CM)", "CROSS SHOULDER (CM)", "SLEEVE (CM)", "BODY LENGTH (CM)"],
  rows: [
    ["34", "44", "87–89",   "74–76",   "42.5", "63", "71"],
    ["36", "46", "91–93",   "78–80",   "44.0", "64", "72"],
    ["38", "48", "95–97",   "82–84",   "45.5", "65", "73"],
    ["40", "50", "99–101",  "86–88",   "47.0", "65.5", "74"],
    ["42", "52", "103–105", "90–92",   "48.5", "66", "75"],
    ["44", "54", "107–109", "94–96",   "50.0", "66.5", "76"],
    ["46", "56", "111–113", "98–100",  "51.5", "67", "77"],
  ],
};

const SHIRT_TABLE = {
  heading: "DRESS SHIRT",
  columns: ["UK/US", "IT/EU/FR", "COLLAR (IN)", "COLLAR (CM)", "CHEST (CM)", "SLEEVE (CM)", "BODY LENGTH (CM)"],
  rows: [
    ["34", "44", "15\"",   "38", "87–89",   "63", "74"],
    ["36", "46", "15\"",   "38", "91–93",   "64", "75"],
    ["38", "48", "15.5\"", "39", "95–97",   "65", "76"],
    ["40", "50", "16\"",   "41", "99–101",  "65.5", "77"],
    ["42", "52", "16.5\"", "42", "103–105", "66", "78"],
    ["44", "54", "17\"",   "43", "107–109", "66.5", "79"],
    ["46", "56", "17.5\"", "44", "111–113", "67", "80"],
  ],
};

const TROUSER_TABLE = {
  heading: "TROUSERS / CHINOS",
  columns: ["UK/US WAIST", "IT/EU", "WAIST (CM)", "HIP (CM)", "INSEAM (CM)", "OUTSEAM (CM)", "RISE (CM)"],
  rows: [
    ["28", "44", "71–73",   "90–92",   "79", "101", "26"],
    ["30", "46", "75–77",   "94–96",   "80", "102", "27"],
    ["32", "48", "79–81",   "98–100",  "81", "103", "27.5"],
    ["34", "50", "83–85",   "102–104", "82", "104", "28"],
    ["36", "52", "87–89",   "106–108", "82", "105", "28.5"],
    ["38", "54", "91–93",   "110–112", "83", "106", "29"],
    ["40", "56", "95–97",   "114–116", "83", "107", "29.5"],
  ],
};

// ─── TABLE COMPONENT ──────────────────────────────────────────────────────────

function MeasurementTable({ table }: { table: typeof JACKET_TABLE }) {
  return (
    <div style={{ marginBottom: "36px" }}>
      {/* Section heading */}
      <div style={{
        display: "flex", alignItems: "center", gap: "12px",
        marginBottom: "12px", paddingBottom: "8px",
        borderBottom: "2px solid #111",
      }}>
        <span style={{
          fontFamily: F.display, fontSize: "13px", fontWeight: 700,
          letterSpacing: "0.14em", textTransform: "uppercase", color: "#111",
        }}>
          {table.heading}
        </span>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "auto" }}>
          <thead>
            <tr style={{ backgroundColor: "#111" }}>
              {table.columns.map((col, i) => (
                <th
                  key={i}
                  style={{
                    fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.1em",
                    textTransform: "uppercase", color: "#fff",
                    padding: "8px 10px", textAlign: i < 2 ? "center" : "right",
                    whiteSpace: "nowrap", fontWeight: 400,
                    borderRight: i < table.columns.length - 1 ? "1px solid #333" : "none",
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, ri) => (
              <tr
                key={ri}
                style={{ backgroundColor: ri % 2 === 0 ? "#fff" : "#f8f8f8" }}
              >
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    style={{
                      fontFamily: ci < 2 ? F.display : F.mono,
                      fontSize: ci < 2 ? "13px" : "9px",
                      fontWeight: ci < 2 ? 700 : 400,
                      letterSpacing: ci < 2 ? "0.06em" : "0.04em",
                      textTransform: "uppercase",
                      color: ci < 2 ? "#111" : "#555",
                      padding: "9px 10px",
                      textAlign: ci < 2 ? "center" : "right",
                      borderBottom: "1px solid #ececec",
                      borderRight: ci < row.length - 1 ? "1px solid #ececec" : "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── EXPORTS ──────────────────────────────────────────────────────────────────

type SizeSet = typeof JACKET_SIZES;

interface SizeGuideProps {
  sizes?: SizeSet;
  selectedSize: string;
  onSelect: (size: string) => void;
  label?: string;
}

export function SizeSelector({ sizes = JACKET_SIZES, selectedSize, onSelect, label = "SIZE" }: SizeGuideProps) {
  const [showGuide, setShowGuide] = useState(false);

  return (
    <>
      {/* Size selector row */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
          <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.14em", color: "#888", textTransform: "uppercase" }}>
            {label} — FOR REFERENCE
          </span>
          <button
            onClick={() => setShowGuide(true)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em",
              color: "#c9a96e", textDecoration: "underline", textUnderlineOffset: "3px",
              textTransform: "uppercase", padding: 0,
            }}
          >
            SIZE GUIDE →
          </button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {sizes.map((s) => {
            const active = selectedSize === s.label;
            return (
              <button
                key={s.label}
                onClick={() => onSelect(s.label)}
                title={s.sub}
                style={{
                  fontFamily: F.mono,
                  fontSize: "9px",
                  letterSpacing: "0.08em",
                  padding: "6px 12px",
                  border: active ? "1.5px solid #111" : "1px solid #d0d0d0",
                  backgroundColor: active ? "#111" : "transparent",
                  color: active ? "#fff" : "#555",
                  cursor: "pointer",
                  transition: "all 0.12s",
                  textTransform: "uppercase",
                }}
                onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.borderColor = "#888"; }}
                onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.borderColor = "#d0d0d0"; }}
              >
                {s.label}
              </button>
            );
          })}
        </div>
        {selectedSize && (
          <p style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.08em", color: "#aaa", marginTop: "8px" }}>
            {sizes.find(s => s.label === selectedSize)?.sub} · BESPOKE & MTM ARE FULLY CUSTOM TO YOUR MEASUREMENTS
          </p>
        )}
        {!selectedSize && (
          <p style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.08em", color: "#bbb", marginTop: "8px" }}>
            SELECT A REFERENCE SIZE — BESPOKE & MTM CLIENTS ARE MEASURED INDIVIDUALLY
          </p>
        )}
      </div>

      {/* Size guide modal */}
      {showGuide && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            backgroundColor: "rgba(0,0,0,0.88)",
            display: "flex", alignItems: "flex-start", justifyContent: "center",
            padding: "40px 20px",
            overflowY: "auto",
          }}
          onClick={() => setShowGuide(false)}
        >
          <div
            style={{
              backgroundColor: "#fff",
              maxWidth: "960px",
              width: "100%",
              padding: "40px",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "36px" }}>
              <div>
                <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.14em", color: "#aaa", display: "block", marginBottom: "6px", textTransform: "uppercase" }}>
                  § SIZE REFERENCE · TAILORS.HK
                </span>
                <h3 style={{ fontFamily: F.display, fontSize: "26px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#111", margin: 0 }}>
                  MEASUREMENT GUIDE
                </h3>
                <p style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.06em", color: "#888", marginTop: "10px", lineHeight: 1.7, textTransform: "uppercase" }}>
                  SIZES SHOWN ARE FOR REFERENCE ONLY · ALL BESPOKE & MTM GARMENTS ARE CUT TO YOUR INDIVIDUAL MEASUREMENTS · RTW CLIENTS MAY USE THIS CHART TO IDENTIFY THE CLOSEST FIT
                </p>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                style={{
                  background: "none", border: "1px solid #e0e0e0", cursor: "pointer",
                  fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em",
                  color: "#555", padding: "7px 14px", flexShrink: 0, marginLeft: "24px",
                  textTransform: "uppercase",
                }}
              >
                CLOSE ✕
              </button>
            </div>

            {/* Divider */}
            <div style={{ borderTop: "1px solid #e8e8e8", marginBottom: "36px" }} />

            {/* Tables */}
            <MeasurementTable table={JACKET_TABLE} />
            <MeasurementTable table={SHIRT_TABLE} />
            <MeasurementTable table={TROUSER_TABLE} />

            {/* How to measure section */}
            <div style={{ borderTop: "2px solid #111", paddingTop: "24px", marginTop: "8px" }}>
              <span style={{ fontFamily: F.display, fontSize: "13px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#111", display: "block", marginBottom: "16px" }}>
                HOW TO MEASURE
              </span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                {[
                  { label: "CHEST", desc: "MEASURE AROUND THE FULLEST PART OF YOUR CHEST, KEEPING THE TAPE HORIZONTAL" },
                  { label: "WAIST", desc: "MEASURE AROUND YOUR NATURAL WAIST, ABOVE THE HIP BONE" },
                  { label: "CROSS SHOULDER", desc: "MEASURE ACROSS THE BACK FROM SHOULDER SEAM TO SHOULDER SEAM" },
                  { label: "SLEEVE", desc: "MEASURE FROM THE SHOULDER SEAM TO THE WRIST BONE WITH ARM SLIGHTLY BENT" },
                  { label: "COLLAR", desc: "MEASURE AROUND THE BASE OF THE NECK, ALLOWING ONE FINGER OF EASE" },
                  { label: "INSEAM", desc: "MEASURE FROM THE CROTCH TO THE ANKLE BONE ALONG THE INNER LEG" },
                ].map((item) => (
                  <div key={item.label} style={{ borderLeft: "2px solid #e0e0e0", paddingLeft: "12px" }}>
                    <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#111", display: "block", marginBottom: "4px", textTransform: "uppercase" }}>
                      {item.label}
                    </span>
                    <span style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.04em", color: "#888", lineHeight: 1.65, textTransform: "uppercase" }}>
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer note */}
            <div style={{ marginTop: "28px", borderTop: "1px solid #e8e8e8", paddingTop: "16px" }}>
              <p style={{ fontFamily: F.mono, fontSize: "7.5px", letterSpacing: "0.08em", color: "#bbb", lineHeight: 1.8, margin: 0, textTransform: "uppercase" }}>
                ◆ BESPOKE & MTM CLIENTS ARE MEASURED INDIVIDUALLY AT CONSULTATION — NO STANDARD SIZE APPLIES · RTW GARMENTS ARE PRODUCED TO THE NEAREST SIZE SHOWN · ALL MEASUREMENTS IN CM UNLESS NOTED · SIZES MAY VARY SLIGHTLY BETWEEN CLOTH WEIGHTS AND CONSTRUCTIONS
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
