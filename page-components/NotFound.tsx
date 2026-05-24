"use client";
/**
 * TAILOR.HK — 404
 * Design: Technical editorial
 */
import { Link } from "@/lib/wouter-shim";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body:    '"Barlow", Arial, sans-serif',
  mono:    '"JetBrains Mono", "Courier New", monospace',
};

export default function NotFound() {
  return (
    <main style={{ backgroundColor: "#fff", minHeight: "60vh", display: "flex", alignItems: "center" }}>
      <Navigation />
      <div className="container" style={{ textAlign: "center", padding: "80px 20px" }}>
        <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#bbb", display: "block", marginBottom: "16px" }}>ERROR · 404</span>
        <h1 style={{ fontFamily: F.display, fontSize: "clamp(32px, 6vw, 64px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", lineHeight: 1.05, marginBottom: "16px" }}>Page Not Found</h1>
        <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.75, color: "#888", maxWidth: "360px", margin: "0 auto 32px" }}>The page you are looking for does not exist or has been moved.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
          <Link href="/"><span className="btn-filled">Return Home →</span></Link>
          <Link href="/tailor-guides"><span className="btn-outline">Browse Guides</span></Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
