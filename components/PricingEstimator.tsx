/**
 * TAILOR.HK — PRICING ESTIMATOR WIDGET
 * Design: Technical editorial — monospaced labels, numbered steps, instant output
 * Logic: 3 questions (garment, construction, fabric) → Atelier Direct price + retail comparison toggle
 *
 * Prices anchored to Atelier Direct product prices:
 *   Suit full canvas house cloth: from HK$12,800
 *   Trousers: from HK$3,800
 *   Shirt: from HK$880
 *   Overcoat: from HK$18,800
 *   Jacket: from HK$12,800
 *
 * Retail multiplier: ~2.5× for full canvas, ~2× for half canvas
 */
import { useState, useEffect } from "react";
import { Link } from "@/lib/wouter-shim";
import { quizEnquiryUrl } from "@/lib/whatsapp";

const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body:    '"Barlow", Arial, sans-serif',
  mono:    '"JetBrains Mono", "Courier New", monospace',
};

// ── Atelier Direct price matrix (HKD) ─────────────────────────────────────
// [garment][construction][fabric] = [low, high]
// Anchored to product page prices:
//   Suit VBC HK$12,800 | Suit LP HK$16,800
//   Blazer VBC HK$8,800 | Blazer H&S HK$10,800 | Blazer LP HK$12,800
//   Trousers HK$2,800 | Shirt HK$880
//   Overcoat HK$10,800 (most products) | Black Overcoat HK$18,800
const ATELIER_MATRIX: Record<string, Record<string, Record<string, [number, number]>>> = {
  suit: {
    full:  { luxury: [16800, 22800], premium: [14000, 16800], house: [12800, 14000] },
    half:  { luxury: [12800, 16800], premium: [10000, 12800], house: [8300,  10000] },
  },
  jacket: {
    full:  { luxury: [12800, 16800], premium: [10800, 12800], house: [8800,  10800] },
    half:  { luxury: [9800,  12800], premium: [8000,  9800],  house: [6200,  8000]  },
  },
  trousers: {
    full:  { luxury: [5800, 8800],  premium: [3800, 5800], house: [2800, 3800] },
    half:  { luxury: [4500, 7000],  premium: [3200, 4500], house: [2200, 3200] },
  },
  shirt: {
    full:  { luxury: [2800, 4800], premium: [1800, 2800], house: [880, 1800] },
    half:  { luxury: [2200, 3800], premium: [1400, 2200], house: [880, 1400] },
  },
  overcoat: {
    full:  { luxury: [18800, 28000], premium: [14000, 18800], house: [10800, 14000] },
    half:  { luxury: [14800, 22000], premium: [11000, 14800], house: [8800,  11000] },
  },
};

// Retail multiplier per construction (conventional bespoke channels)
const RETAIL_MULTIPLIER: Record<string, number> = {
  full: 2.5,
  half: 2.0,
};

const UPGRADES: { id: string; label: string; note: string; add: number }[] = [
  { id: "canvas",      label: "Full Floating Canvas Construction", note: "Fully hand-padded — the Atelier Direct standard", add: 0 },
  { id: "lapels",      label: "Hand-Padded Lapels",               note: "Shaped entirely by hand over the tailor's ham",   add: 0 },
  { id: "finishing",   label: "Hand-Stitched Finishing",          note: "Buttonholes, pick-stitching, sleeve heads",       add: 0 },
  { id: "surgeons",    label: "Working Surgeon's Cuffs",          note: "4 functional buttonholes per sleeve",             add: 2500 },
  { id: "archive",     label: "Full Measurement Archive",         note: "Your block kept on file permanently",             add: 0 },
];

const GARMENTS = [
  { id: "suit",     label: "Full Suit",   sub: "JACKET + TROUSERS" },
  { id: "jacket",   label: "Jacket",      sub: "JACKET ONLY" },
  { id: "trousers", label: "Trousers",    sub: "TROUSERS ONLY" },
  { id: "shirt",    label: "Dress Shirt", sub: "BESPOKE SHIRT" },
  { id: "overcoat", label: "Overcoat",    sub: "FULL-LENGTH COAT" },
];

const CONSTRUCTIONS = [
  { id: "full",  label: "Full Canvas",  sub: "FULLY HAND-PADDED — THE ATELIER DIRECT STANDARD" },
  { id: "half",  label: "Half Canvas",  sub: "CANVAS CHEST PIECE, QUALITY MTM STANDARD" },
  { id: "fused", label: "Fused",        sub: "NOT OFFERED — WE DO NOT WORK WITH FUSED CONSTRUCTION.", disabled: true },
];

// Garments where canvas construction step is not applicable
const GARMENTS_NO_CONSTRUCTION = ["shirt", "trousers"];

const FABRICS_SUIT = [
  { id: "luxury",  label: "Elevated Mill",  sub: "LORO PIANA · HOLLAND & SHERRY · SCABAL · DORMEUIL" },
  { id: "premium", label: "Premium Mill", sub: "VITALE BARBERIS CANONICO · REDA · DUGDALE · CACCIOPPOLI" },
  { id: "house",   label: "House Cloth",  sub: "TAILOR-CURATED CLOTH — SOLID QUALITY, NO MILL PREMIUM" },
];

const FABRICS_SHIRT = [
  { id: "luxury",  label: "Premium Shirting",  sub: "ALUMO SWISS COTTON · LORO PIANA · ORTEGA" },
  { id: "premium", label: "Fine Shirting", sub: "THOMAS MASON · SOKTAS · SOLBIATI" },
  { id: "house",   label: "House Cloth",  sub: "TAILOR-CURATED SHIRTING — SOLID QUALITY, NO MILL PREMIUM" },
];

function getFabrics(garmentId: string | null) {
  return garmentId === "shirt" ? FABRICS_SHIRT : FABRICS_SUIT;
}

function fmt(n: number) {
  return "HK$" + Math.round(n).toLocaleString("en-HK");
}

interface Props {
  isMobile?: boolean;
}

export default function PricingEstimator({ isMobile: isMobileProp }: Props) {
  const [isMobileInternal, setIsMobileInternal] = useState(false);
  useEffect(() => {
    const check = () => setIsMobileInternal(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const isMobile = isMobileProp ?? isMobileInternal;
  const [step, setStep]               = useState<1 | 2 | 3 | 4>(1);
  const [garment, setGarment]         = useState<string | null>(null);
  const [construction, setConstruction] = useState<string | null>(null);
  const [fabric, setFabric]           = useState<string | null>(null);
  const [upgrades, setUpgrades]       = useState<Set<string>>(new Set());
  const [showUpgrades, setShowUpgrades] = useState(false);
  const [showRetail, setShowRetail]   = useState(false);

  const toggleUpgrade = (id: string) => {
    setUpgrades(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const reset = () => {
    setStep(1); setGarment(null); setConstruction(null);
    setFabric(null); setUpgrades(new Set()); setShowUpgrades(false); setShowRetail(false);
  };

  // Compute Atelier Direct result
  let baseLow = 0, baseHigh = 0;
  if (garment && construction && fabric) {
    [baseLow, baseHigh] = ATELIER_MATRIX[garment]?.[construction]?.[fabric] ?? [0, 0];
  }
  const upgradeTotal = UPGRADES.filter(u => upgrades.has(u.id)).reduce((s, u) => s + u.add, 0);
  const totalLow  = baseLow  + upgradeTotal;
  const totalHigh = baseHigh + upgradeTotal;

  // Retail equivalent
  const multiplier = construction ? (RETAIL_MULTIPLIER[construction] ?? 2.5) : 2.5;
  const retailLow  = Math.round(totalLow  * multiplier / 1000) * 1000;
  const retailHigh = Math.round(totalHigh * multiplier / 1000) * 1000;

  const OptionBtn = ({
    id, label, sub, selected, onClick, disabled,
  }: { id: string; label: string; sub: string; selected: boolean; onClick: () => void; disabled?: boolean }) => (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        textAlign: "left",
        padding: isMobile ? "14px 16px" : "16px 20px",
        border: disabled ? "1px solid #e8e8e8" : selected ? "1.5px solid #111" : "1px solid #d8d8d8",
        backgroundColor: disabled ? "#f9f9f9" : selected ? "#111" : "#fff",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.15s",
        display: "block",
        width: "100%",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <div style={{
        fontFamily: F.display, fontSize: isMobile ? "13px" : "14px",
        fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
        color: disabled ? "#bbb" : selected ? "#fff" : "#111", marginBottom: "3px",
        textDecoration: disabled ? "line-through" : "none",
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.06em",
        color: disabled ? "#ccc" : selected ? "rgba(255,255,255,0.6)" : "#999",
      }}>
        {sub}
      </div>
    </button>
  );

  const stepLabel = (n: number, title: string, active: boolean, done: boolean) => (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
      <div style={{
        width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0,
        backgroundColor: done ? "#111" : active ? "#111" : "transparent",
        border: done || active ? "none" : "1px solid #ccc",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {done ? (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <span style={{ fontFamily: F.mono, fontSize: "9px", color: active ? "#fff" : "#bbb" }}>{n}</span>
        )}
      </div>
      <span style={{
        fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em",
        color: active ? "#111" : done ? "#666" : "#bbb",
        textTransform: "uppercase",
      }}>
        {title}
      </span>
    </div>
  );

  return (
    <div style={{
      backgroundColor: "#fafaf8",
      border: "1px solid #e2e2e2",
      padding: isMobile ? "28px 20px" : "40px 44px",
      maxWidth: "680px",
    }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#aaa", display: "block", marginBottom: "6px" }}>
          ATELIER DIRECT · PRICING GUIDE · HONG KONG
        </span>
        <h3 style={{
          fontFamily: F.display, fontSize: isMobile ? "20px" : "24px",
          fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
          color: "#111", margin: 0,
        }}>
          What Will It Cost?
        </h3>
        <p style={{ fontFamily: F.body, fontSize: "12px", color: "#777", marginTop: "8px", lineHeight: 1.6 }}>
          Answer three questions for an indicative Atelier Direct rate. All prices reflect direct production — no retail intermediary.
        </p>
      </div>

      {/* Step indicators */}
      <div style={{ display: "flex", gap: isMobile ? "16px" : "32px", marginBottom: "28px", flexWrap: "wrap" }}>
        {stepLabel(1, "Garment",      step === 1, step > 1)}
        {garment !== null && !GARMENTS_NO_CONSTRUCTION.includes(garment) && stepLabel(2, "Construction", step === 2, step > 2)}
        {stepLabel(garment !== null && GARMENTS_NO_CONSTRUCTION.includes(garment) ? 2 : 3, "Fabric",  step === 3, step > 3)}
        {step === 4 && stepLabel(garment !== null && GARMENTS_NO_CONSTRUCTION.includes(garment) ? 3 : 4, "Estimate", step === 4, false)}
      </div>

      {/* Step 1 — Garment */}
      {step === 1 && (
        <div>
          <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#888", marginBottom: "14px" }}>
            WHAT ARE YOU COMMISSIONING?
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)", gap: "8px" }}>
            {GARMENTS.map(g => (
              <OptionBtn
                key={g.id} id={g.id} label={g.label} sub={g.sub}
                selected={garment === g.id}
                onClick={() => {
                  setGarment(g.id);
                  if (GARMENTS_NO_CONSTRUCTION.includes(g.id)) {
                    // Shirts and trousers skip canvas construction step
                    setConstruction("full");
                    setStep(3);
                  } else {
                    setStep(2);
                  }
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 2 — Construction (skipped for shirts and trousers) */}
      {step === 2 && garment !== null && !GARMENTS_NO_CONSTRUCTION.includes(garment) && (
        <div>
          <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#888", marginBottom: "14px" }}>
            CONSTRUCTION STANDARD
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px" }}>
            {CONSTRUCTIONS.map(c => (
              <OptionBtn
                key={c.id} id={c.id} label={c.label} sub={c.sub}
                selected={construction === c.id}
                disabled={(c as any).disabled}
                onClick={() => { setConstruction(c.id); setStep(3); }}
              />
            ))}
          </div>
          <button onClick={() => setStep(1)} style={{ fontFamily: F.mono, fontSize: "9px", color: "#aaa", background: "none", border: "none", cursor: "pointer", marginTop: "16px", letterSpacing: "0.06em" }}>
            ← BACK
          </button>
        </div>
      )}

      {/* Step 3 — Fabric */}
      {step === 3 && (

        <div>
          <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#888", marginBottom: "14px" }}>
            FABRIC TIER
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px" }}>
            {getFabrics(garment).map(f => (
              <OptionBtn
                key={f.id} id={f.id} label={f.label} sub={f.sub}
                selected={fabric === f.id}
                onClick={() => { setFabric(f.id); setStep(4); }}
              />
            ))}
          </div>
          <button onClick={() => garment !== null && GARMENTS_NO_CONSTRUCTION.includes(garment) ? setStep(1) : setStep(2)} style={{ fontFamily: F.mono, fontSize: "9px", color: "#aaa", background: "none", border: "none", cursor: "pointer", marginTop: "16px", letterSpacing: "0.06em" }}>
            ← BACK
          </button>
        </div>
      )}

      {/* Step 4 — Result */}
      {step === 4 && garment && construction && fabric && (
        <div>
          {/* Atelier Direct price output */}
          <div style={{
            backgroundColor: "#111", color: "#fff",
            padding: isMobile ? "24px 20px" : "28px 32px",
            marginBottom: "16px",
          }}>
            <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "rgba(255,255,255,0.5)", marginBottom: "8px" }}>
              ATELIER DIRECT RATE · {GARMENTS.find(g => g.id === garment)?.label.toUpperCase()} · {CONSTRUCTIONS.find(c => c.id === construction)?.label.toUpperCase()} · {getFabrics(garment).find(f => f.id === fabric)?.label.toUpperCase()}
            </div>
            <div style={{
              fontFamily: F.display, fontSize: isMobile ? "28px" : "36px",
              fontWeight: 700, letterSpacing: "0.04em", color: "#fff",
              lineHeight: 1.1,
            }}>
              {fmt(totalLow)} — {fmt(totalHigh)}
            </div>
            {upgradeTotal > 0 && (
              <div style={{ fontFamily: F.mono, fontSize: "9px", color: "rgba(255,255,255,0.5)", marginTop: "8px" }}>
                Includes {fmt(upgradeTotal)} in selected upgrades
              </div>
            )}
            <div style={{ fontFamily: F.mono, fontSize: "8px", color: "rgba(255,255,255,0.35)", marginTop: "12px", lineHeight: 1.6 }}>
              Indicative Atelier Direct rate. Final price confirmed at consultation. Excludes alterations.
            </div>
          </div>

          {/* Retail comparison toggle */}
          <div style={{ marginBottom: "20px" }}>
            <button
              onClick={() => setShowRetail(v => !v)}
              style={{
                fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em",
                color: showRetail ? "#b8a87a" : "#555",
                background: "none",
                border: showRetail ? "1px solid #b8a87a" : "1px solid #d8d8d8",
                padding: "8px 16px",
                cursor: "pointer",
                display: "flex", alignItems: "center", gap: "6px",
                transition: "all 0.15s",
              }}
            >
              {showRetail ? "▲" : "▼"} {showRetail ? "HIDE" : "SHOW"} RETAIL EQUIVALENT
            </button>
            {showRetail && (
              <div style={{
                marginTop: "10px",
                backgroundColor: "#f5f3ef",
                border: "1px solid #e0d8cc",
                padding: isMobile ? "16px" : "20px 24px",
              }}>
                <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#b8a87a", marginBottom: "6px" }}>
                  RETAIL EQUIVALENT · CONVENTIONAL BESPOKE CHANNELS
                </div>
                <div style={{
                  fontFamily: F.display, fontSize: isMobile ? "22px" : "28px",
                  fontWeight: 700, letterSpacing: "0.04em", color: "#111",
                  lineHeight: 1.1, marginBottom: "8px",
                }}>
                  {fmt(retailLow)} — {fmt(retailHigh)}
                </div>
                <div style={{ fontFamily: F.mono, fontSize: "8px", color: "#888", lineHeight: 1.7 }}>
                  Equivalent construction and cloth retails through established tailoring houses at approximately this range.
                  Atelier Direct removes the retail intermediary — the same production, at the source.
                  <span style={{ display: "block", marginTop: "6px", color: "#b8a87a" }}>
                    You save approximately {fmt(retailLow - totalLow)} — {fmt(retailHigh - totalHigh)} by coming direct.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Atelier Direct standard inclusions — shown as value, not upsell */}
          <div style={{ marginBottom: "24px" }}>
            <button
              onClick={() => setShowUpgrades(!showUpgrades)}
              style={{
                fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em",
                color: showUpgrades ? "#b8a87a" : "#555",
                background: "none", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", gap: "6px", padding: 0,
              }}
            >
              {showUpgrades ? "▲" : "▼"} WHAT IS INCLUDED AS STANDARD
            </button>
            {showUpgrades && (
              <div style={{ marginTop: "12px" }}>
                <div style={{
                  fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em",
                  color: "#b8a87a", marginBottom: "10px",
                }}>
                  ATELIER DIRECT · INCLUDED AT NO ADDITIONAL CHARGE
                </div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "8px" }}>
                  {UPGRADES.map(u => (
                    <div
                      key={u.id}
                      style={{
                        textAlign: "left", padding: "12px 14px",
                        border: "1px solid #e8e4dc",
                        backgroundColor: "#faf9f6",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ fontFamily: F.display, fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "#111" }}>
                          {u.label}
                        </div>
                        <div style={{ fontFamily: F.mono, fontSize: "8px", color: "#b8a87a", marginLeft: "8px", flexShrink: 0, textAlign: "right" }}>
                          {u.add > 0 && <span style={{ textDecoration: "line-through", color: "#bbb", marginRight: "4px" }}>{fmt(u.add)}</span>}
                          <span>INCLUDED</span>
                        </div>
                      </div>
                      <div style={{ fontFamily: F.mono, fontSize: "8px", color: "#999", marginTop: "3px" }}>
                        {u.note}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "13px", fontStyle: "italic",
                  color: "#888", marginTop: "12px", lineHeight: 1.6,
                }}>
                  These are standard at every Atelier Direct commission. Most tailoring houses charge separately for each.
                </div>
              </div>
            )}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href={(() => {
              const garmentLabel = GARMENTS.find(g => g.id === garment)?.label ?? "";
              const constructionLabel = CONSTRUCTIONS.find(c => c.id === construction)?.label ?? "";
              const fabricLabel = getFabrics(garment).find(f => f.id === fabric)?.label ?? "";
              const params = new URLSearchParams({
                type: "atelier",
                garment: garmentLabel,
                construction: constructionLabel,
                fabric: fabricLabel,
                low: String(totalLow),
                high: String(totalHigh),
              });
              return `/contact?${params.toString()}`;
            })()}>
              <button style={{
                fontFamily: F.mono, fontSize: "10px", letterSpacing: "0.1em",
                backgroundColor: "#111", color: "#fff", border: "none",
                padding: "12px 24px", cursor: "pointer",
              }}>
                START YOUR BRIEF →
              </button>
            </Link>
            <a href={quizEnquiryUrl({
                garment: GARMENTS.find(g => g.id === garment)?.label ?? "",
                construction: CONSTRUCTIONS.find(c => c.id === construction)?.label ?? "",
                fabric: getFabrics(garment).find(f => f.id === fabric)?.label ?? "",
                priceLow: totalLow,
                priceHigh: totalHigh,
                isMTM: construction === "half",
              })} target="_blank" rel="noopener noreferrer">
              <button style={{
                fontFamily: F.mono, fontSize: "10px", letterSpacing: "0.1em",
                backgroundColor: "transparent", color: "#111",
                border: "1px solid #111", padding: "12px 24px", cursor: "pointer",
              }}>
                ENQUIRE VIA WHATSAPP
              </button>
            </a>
            <button
              onClick={reset}
              style={{
                fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.08em",
                color: "#aaa", background: "none", border: "none", cursor: "pointer",
              }}
            >
              START OVER
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
