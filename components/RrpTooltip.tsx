/**
 * RrpTooltip — inline ⓘ button that reveals RRP comparison on click
 * Design: Barlow Condensed + JetBrains Mono, works on both dark and light backgrounds
 *
 * Usage:
 *   <RrpTooltip rrp="HK$30,000" theme="dark" />   ← next to price on dark bg
 *   <RrpTooltip rrp="HK$30,000" theme="light" />  ← next to price on light bg
 */

import { useState, useEffect, useRef } from "react";

interface RrpTooltipProps {
  /** The RRP figure to display, e.g. "HK$30,000" */
  rrp?: string;
  /** Background context — controls text/border colours */
  theme?: "dark" | "light";
  /** Optional custom footnote text */
  footnote?: string;
}

const DEFAULT_FOOTNOTE =
  "Equivalent construction and cloth retails through conventional ready-to-wear channels at this price. Atelier Direct removes the intermediary — you access the same production at the source.";

export default function RrpTooltip({ rrp = "HK$30,000", theme = "dark", footnote }: RrpTooltipProps) {
  const note = footnote ?? DEFAULT_FOOTNOTE;
  const [open, setOpen] = useState(false);
  const [offset, setOffset] = useState(0); // horizontal correction in px
  const ref = useRef<HTMLSpanElement>(null);
  const popoverRef = useRef<HTMLSpanElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // After popover mounts, check if it overflows the viewport and correct
  useEffect(() => {
    if (!open || !popoverRef.current) return;
    const rect = popoverRef.current.getBoundingClientRect();
    const margin = 12; // px gap from screen edge
    if (rect.right > window.innerWidth - margin) {
      setOffset(-(rect.right - window.innerWidth + margin));
    } else if (rect.left < margin) {
      setOffset(margin - rect.left);
    } else {
      setOffset(0);
    }
  }, [open]);

  // Reset offset when closed
  useEffect(() => {
    if (!open) setOffset(0);
  }, [open]);

  const isDark = theme === "dark";

  const btnColor   = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)";
  const btnHover   = isDark ? "rgba(255,255,255,0.7)"  : "rgba(0,0,0,0.6)";
  const boxBg      = isDark ? "#111"                   : "#fff";
  const boxBorder  = isDark ? "#333"                   : "#ddd";
  const labelColor = "#c9a96e";
  const rrpColor   = isDark ? "#fff"                   : "#111";
  const noteColor  = isDark ? "#888"                   : "#999";

  return (
    <span
      ref={ref}
      style={{ position: "relative", display: "inline-flex", alignItems: "center", verticalAlign: "middle", marginLeft: "6px" }}
    >
      {/* ⓘ trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Show RRP comparison"
        style={{
          background: "none",
          border: "none",
          padding: "0 2px",
          cursor: "pointer",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px",
          color: open ? btnHover : btnColor,
          lineHeight: 1,
          transition: "color 0.15s",
          userSelect: "none",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = btnHover; }}
        onMouseLeave={(e) => { if (!open) (e.currentTarget as HTMLButtonElement).style.color = btnColor; }}
      >
        ⓘ
      </button>

      {/* Popover */}
      {open && (
        <span
          ref={popoverRef}
          style={{
            position: "absolute",
            bottom: "calc(100% + 10px)",
            left: `calc(50% + ${offset}px)`,
            transform: "translateX(-50%)",
            width: "min(240px, calc(100vw - 24px))",
            background: boxBg,
            border: `1px solid ${boxBorder}`,
            padding: "14px 16px",
            zIndex: 9999,
            boxShadow: isDark
              ? "0 4px 24px rgba(0,0,0,0.6)"
              : "0 4px 24px rgba(0,0,0,0.12)",
            pointerEvents: "auto",
          }}
        >
          {/* Small caret — stays centred on the button regardless of offset */}
          <span style={{
            position: "absolute",
            bottom: "-5px",
            left: `calc(50% - ${offset}px)`,
            transform: "translateX(-50%) rotate(45deg)",
            width: "8px",
            height: "8px",
            background: boxBg,
            borderRight: `1px solid ${boxBorder}`,
            borderBottom: `1px solid ${boxBorder}`,
          }} />

          <span style={{
            display: "block",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "8px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: labelColor,
            marginBottom: "6px",
          }}>
            RRP EQUIVALENT
          </span>

          <span style={{
            display: "block",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: rrpColor,
            lineHeight: 1,
            marginBottom: "8px",
          }}>
            {rrp}
          </span>

          <span style={{
            display: "block",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "8px",
            letterSpacing: "0.06em",
            lineHeight: 1.7,
            color: noteColor,
            textTransform: "uppercase",
          }}>
            {note}
          </span>
        </span>
      )}
    </span>
  );
}
