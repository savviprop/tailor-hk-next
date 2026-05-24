/**
 * TAILOR.HK — SONNER TOAST COMPONENT
 * Design: Dark editorial mono — uppercase JetBrains Mono, gold accent, precise borders
 */
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      position="bottom-right"
      toastOptions={{
        style: {
          background: "#111",
          border: "1px solid #2a2a2a",
          borderLeft: "3px solid #c9a96e",
          color: "#e8e8e8",
          fontFamily: '"JetBrains Mono", "Courier New", monospace',
          fontSize: "9px",
          letterSpacing: "0.12em",
          textTransform: "uppercase" as const,
          borderRadius: "0",
          padding: "12px 16px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
          minWidth: "260px",
          maxWidth: "340px",
        },
      }}
      style={{
        "--normal-bg": "#111",
        "--normal-text": "#e8e8e8",
        "--normal-border": "#2a2a2a",
        "--success-bg": "#111",
        "--success-text": "#c9a96e",
        "--success-border": "#2a2a2a",
        "--error-bg": "#111",
        "--error-text": "#e8e8e8",
        "--error-border": "#2a2a2a",
      } as React.CSSProperties}
      {...props}
    />
  );
};

export { Toaster };
