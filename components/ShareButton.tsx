/**
 * TAILOR.HK — SHARE BUTTON
 * Design: JetBrains Mono label, minimal editorial style
 * Behaviour: native Web Share API → clipboard fallback → toast confirmation
 */
import { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";
import { toast } from "sonner";

const F = {
  mono: '"JetBrains Mono", "Courier New", monospace',
};

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
  /** Visual variant: "icon" shows only icon, "label" shows icon + text, "full" shows full-width bar */
  variant?: "icon" | "label" | "full";
  /** Color scheme: "light" = dark text on white bg, "dark" = light text on dark bg */
  scheme?: "light" | "dark";
  className?: string;
  style?: React.CSSProperties;
}

export default function ShareButton({
  title,
  text,
  url,
  variant = "label",
  scheme = "light",
  className,
  style,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: text || title, url: shareUrl });
        return;
      } catch {
        // User cancelled or share failed — fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("LINK COPIED TO CLIPBOARD");
      setTimeout(() => setCopied(false), 2200);
    } catch {
      toast.error("UNABLE TO COPY LINK");
    }
  };

  const isDark = scheme === "dark";

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
    background: "none",
    border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid #ddd",
    padding: variant === "icon" ? "7px" : "7px 14px",
    color: isDark ? "rgba(255,255,255,0.7)" : "#666",
    fontFamily: F.mono,
    fontSize: "8px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    transition: "border-color 0.15s, color 0.15s, background 0.15s",
    whiteSpace: "nowrap",
    width: variant === "full" ? "100%" : undefined,
    justifyContent: variant === "full" ? "center" : undefined,
    ...style,
  };

  return (
    <button
      onClick={handleShare}
      className={className}
      style={baseStyle}
      aria-label="Share this page"
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = isDark ? "rgba(255,255,255,0.5)" : "#999";
        el.style.color = isDark ? "#fff" : "#111";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = isDark ? "rgba(255,255,255,0.2)" : "#ddd";
        el.style.color = isDark ? "rgba(255,255,255,0.7)" : "#666";
      }}
    >
      {copied ? (
        <Check size={11} />
      ) : (
        <Share2 size={11} />
      )}
      {variant !== "icon" && (
        <span>{copied ? "COPIED" : "SHARE"}</span>
      )}
    </button>
  );
}
