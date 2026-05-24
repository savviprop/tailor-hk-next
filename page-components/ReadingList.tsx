"use client";
import { useSEO } from "@/hooks/useSEO";
/**
 * TAILOR.HK - READING LIST PAGE
 */
import { Link } from "@/lib/wouter-shim";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useReadingList } from "@/contexts/ReadingListContext";
// // SEO handled by generateMetadata in page.tsx
import { Bookmark, ArrowRight, X, Share2, Check, Mail } from "lucide-react";
import { useState } from "react";

const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body:    '"Barlow", Arial, sans-serif',
  mono:    '"JetBrains Mono", "Courier New", monospace',
};

export default function ReadingList() {
  useSEO({
    title: "Reading List - Saved Guides | Tailors.hk",
    description: "Your saved tailoring guides and articles from Tailors.hk.",
    canonical: "https://tailors.hk/reading-list",
    schema: [],
  });

  const { bookmarks, toggleBookmark, clearAll } = useReadingList();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: "My Reading List — Tailors.hk", url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleEmailShare = () => {
    const url = window.location.href;
    const subject = encodeURIComponent("My Tailoring Reading List — Tailors.hk");
    const titles = bookmarks.map((b, i) => `${i + 1}. ${b.title}`).join("\n");
    const body = encodeURIComponent(
      `I've saved ${bookmarks.length} tailoring guide${bookmarks.length === 1 ? "" : "s"} on Tailors.hk:\n\n${titles}\n\nView the full list: ${url}\n\n— Tailors.hk · Hong Kong's Leading Bespoke Tailor`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      <Navigation />
      <section style={{ borderBottom: "1px solid #e2e2e2", padding: "56px 0 40px" }}>
        <div className="container">
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "12px" }}>
            § READING LIST
          </span>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <h1 style={{ fontFamily: F.display, fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", lineHeight: 1.05, marginBottom: "10px" }}>
                Reading List
              </h1>
              <p style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.08em", color: "#aaa" }}>
                {bookmarks.length} {bookmarks.length === 1 ? "GUIDE" : "GUIDES"} SAVED
              </p>
            </div>
            {bookmarks.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button
                  onClick={handleShare}
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase", color: copied ? "#22c55e" : "#111", background: "none", border: "1px solid #e2e2e2", padding: "8px 14px", cursor: "pointer", transition: "color 0.2s" }}
                >
                  {copied ? <Check size={11} /> : <Share2 size={11} />}
                  {copied ? "COPIED" : "SHARE"}
                </button>
                <button
                  onClick={handleEmailShare}
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#111", background: "none", border: "1px solid #e2e2e2", padding: "8px 14px", cursor: "pointer" }}
                  title="Send via email"
                >
                  <Mail size={11} />
                  EMAIL
                </button>
                <button onClick={clearAll} style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", background: "none", border: "1px solid #e2e2e2", padding: "8px 14px", cursor: "pointer" }}>
                  CLEAR ALL
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      <div className="container" style={{ paddingTop: "48px", paddingBottom: "80px" }}>
        {bookmarks.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <Bookmark size={40} color="#ddd" style={{ margin: "0 auto 20px", display: "block" }} />
            <p style={{ fontFamily: F.display, fontSize: "22px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#ccc", marginBottom: "12px" }}>No Saved Guides</p>
            <p style={{ fontFamily: F.body, fontSize: "14px", color: "#aaa", lineHeight: 1.7, marginBottom: "28px" }}>Bookmark guides and articles as you read them.</p>
            <Link href="/tailor-guides">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", backgroundColor: "#111", color: "#fff", padding: "12px 24px" }}>
                Browse All Guides <ArrowRight size={11} />
              </span>
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))", gap: "32px" }}>
            {bookmarks.map((item) => (
              <div key={item.slug} style={{ backgroundColor: "#fff", borderBottom: "1px solid #e2e2e2", paddingBottom: "28px", position: "relative" }}>
                <button onClick={() => toggleBookmark(item)} style={{ position: "absolute", top: "0px", right: "0px", background: "none", border: "none", cursor: "pointer", padding: "4px", color: "#ccc" }} aria-label="Remove bookmark">
                  <X size={14} />
                </button>
                <span style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: "10px" }}>{item.category}</span>
                {item.img && <div style={{ marginBottom: "14px" }}><img src={item.img} alt={item.title} loading="lazy" style={{ width: "100%", height: "140px", objectFit: "cover", display: "block" }} /></div>}
                <h2 style={{ fontFamily: F.display, fontSize: "15px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", lineHeight: 1.25, marginBottom: "8px" }}>{item.title}</h2>
                <p style={{ fontFamily: F.body, fontSize: "12.5px", lineHeight: 1.65, color: "#777", marginBottom: "18px" }}>{item.excerpt}</p>
                <Link href={'/tailor-guides/' + item.slug}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#111", borderBottom: "1px solid #111", paddingBottom: "1px" }}>
                    READ GUIDE <ArrowRight size={9} />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Conversion CTA */}
      <section style={{ background: '#0a0a0a', padding: '64px 0', marginTop: '80px' }}>
        <div className='container' style={{ maxWidth: '640px' }}>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#555', display: 'block', marginBottom: '16px' }}>
            ATELIER DIRECT · TAILORS.HK
          </span>
          <h2 style={{ fontFamily: '"Barlow Condensed", Arial, sans-serif', fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#fff', lineHeight: 0.95, marginBottom: '20px' }}>
            READY TO COMMISSION?
          </h2>
          <p style={{ fontFamily: '"Barlow", Arial, sans-serif', fontSize: '15px', lineHeight: 1.8, color: '#888', marginBottom: '32px', maxWidth: '480px' }}>
            You have done the research. The next step is a private consultation — in person in Hong Kong or by video call. No obligation. We will discuss your requirements, cloth preferences, and timeline.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href='/contact?type=bespoke' style={{ display: 'inline-block', fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '14px 32px', background: '#b8a87a', color: '#0a0a0a', textDecoration: 'none', fontWeight: 600 }}>
              Start Your Brief →
            </a>
            <a href='/tailor-finder' style={{ display: 'inline-block', fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '14px 32px', border: '1px solid #333', color: '#aaa', textDecoration: 'none' }}>
              Find Your Tailor →
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
