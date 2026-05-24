/**
 * TAILOR.HK — BOOKMARK BUTTON
 * Design: JetBrains Mono label, minimal editorial style
 * Behaviour: toggles item in ReadingListContext (localStorage-persisted)
 * Use on: guide articles, product pages, editorial content
 */
import { Bookmark } from "lucide-react";
import { useReadingList, BookmarkedGuide } from "@/contexts/ReadingListContext";
import { toast } from "sonner";

const F = {
  mono: '"JetBrains Mono", "Courier New", monospace',
};

interface BookmarkButtonProps {
  item: BookmarkedGuide;
  /** Visual variant: "icon" shows only icon, "label" shows icon + text, "full" shows full-width bar */
  variant?: "icon" | "label" | "full";
  /** Color scheme: "light" = dark text on white bg, "dark" = light text on dark bg */
  scheme?: "light" | "dark";
  style?: React.CSSProperties;
  className?: string;
}

export default function BookmarkButton({
  item,
  variant = "label",
  scheme = "light",
  style,
  className,
}: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useReadingList();
  const saved = isBookmarked(item.slug);
  const isDark = scheme === "dark";

  const handleToggle = () => {
    toggleBookmark(item);
    if (!saved) {
      toast.success("SAVED TO READING LIST");
    } else {
      toast("REMOVED FROM READING LIST");
    }
  };

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
    background: saved
      ? isDark ? "rgba(255,255,255,0.1)" : "#111"
      : "none",
    border: saved
      ? isDark ? "1px solid rgba(255,255,255,0.3)" : "1px solid #111"
      : isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid #ddd",
    padding: variant === "icon" ? "7px" : "7px 14px",
    color: saved
      ? isDark ? "#fff" : "#fff"
      : isDark ? "rgba(255,255,255,0.7)" : "#666",
    fontFamily: F.mono,
    fontSize: "8px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    transition: "all 0.15s",
    whiteSpace: "nowrap",
    width: variant === "full" ? "100%" : undefined,
    justifyContent: variant === "full" ? "center" : undefined,
    ...style,
  };

  return (
    <button
      onClick={handleToggle}
      className={className}
      style={baseStyle}
      aria-label={saved ? "Remove bookmark" : "Save to reading list"}
      onMouseEnter={(e) => {
        if (!saved) {
          const el = e.currentTarget;
          el.style.borderColor = isDark ? "rgba(255,255,255,0.5)" : "#999";
          el.style.color = isDark ? "#fff" : "#111";
        }
      }}
      onMouseLeave={(e) => {
        if (!saved) {
          const el = e.currentTarget;
          el.style.borderColor = isDark ? "rgba(255,255,255,0.2)" : "#ddd";
          el.style.color = isDark ? "rgba(255,255,255,0.7)" : "#666";
        }
      }}
    >
      <Bookmark
        size={11}
        fill={saved ? "currentColor" : "none"}
        style={{ transition: "fill 0.15s" }}
      />
      {variant !== "icon" && (
        <span>{saved ? "SAVED" : "SAVE"}</span>
      )}
    </button>
  );
}
