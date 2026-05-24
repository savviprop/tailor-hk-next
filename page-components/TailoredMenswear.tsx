"use client";
import { useSEO, SCHEMAS } from "@/hooks/useSEO";
/**
 * TAILOR.HK — TAILORED MENSWEAR
 * Design: Technical editorial — Barlow Condensed + JetBrains Mono
 * Grid: Large cards, Dorsia-inspired — fewer columns, more visual weight per item
 */

import { useState, useEffect } from "react";
import { Link } from "@/lib/wouter-shim";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
// SEO handled by generateMetadata in page.tsx
import { menswearEnquiryUrl } from "@/lib/whatsapp";
import RrpTooltip from "@/components/RrpTooltip";
import ShareButton from "@/components/ShareButton";

const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body:    '"Barlow", Arial, sans-serif',
  mono:    '"JetBrains Mono", "Courier New", monospace',
};

type PriceTier = { label: string; price: string; gold?: boolean };
interface ProductItem { id: string; slug: string; name: string; img: string; price: string; tiers: PriceTier[]; rrp?: string; category?: string; }

const SUITS: ProductItem[] = [
  { id: "001", slug: "midnight-blue-suit", name: "Midnight Blue Suit", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/pVEPkPApyWtkArag.jpg", price: "HK$12,800", tiers: [{label:"Vitale Barberis",price:"HK$12,800"},{label:"Dormeuil / Holland & Sherry",price:"HK$18,000"},{label:"Carlo Barbera / Loro Piana",price:"HK$28,000",gold:true}], rrp: "HK$58,000" },
  { id: "002", slug: "mid-grey-suit", name: "Mid Grey Suit", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/OEkbqFLSaAsYpDdV.jpg", price: "HK$12,800", tiers: [{label:"Vitale Barberis",price:"HK$12,800"},{label:"Dormeuil / Holland & Sherry",price:"HK$18,000"},{label:"Carlo Barbera / Loro Piana",price:"HK$28,000",gold:true}], rrp: "HK$58,000" },
  { id: "003", slug: "charcoal-grey-suit", name: "Charcoal Grey Suit", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/TNxmCQSagTsnBwFW.jpg", price: "HK$12,800", tiers: [{label:"Vitale Barberis",price:"HK$12,800"},{label:"Dormeuil / Holland & Sherry",price:"HK$18,000"},{label:"Carlo Barbera / Loro Piana",price:"HK$28,000",gold:true}], rrp: "HK$58,000" },
  { id: "004", slug: "navy-suit", name: "Navy Suit", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/iiwfHtsspNExjqdN.jpg", price: "HK$12,800", tiers: [{label:"Vitale Barberis",price:"HK$12,800"},{label:"Dormeuil / Holland & Sherry",price:"HK$18,000"},{label:"Carlo Barbera / Loro Piana",price:"HK$28,000",gold:true}], rrp: "HK$58,000" },
  { id: "005", slug: "light-grey-suit", name: "Light Grey Suit", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/lGOiLNUXUbdGKjAk.jpg", price: "HK$12,800", tiers: [{label:"Vitale Barberis",price:"HK$12,800"},{label:"Dormeuil / Holland & Sherry",price:"HK$18,000"},{label:"Carlo Barbera / Loro Piana",price:"HK$28,000",gold:true}], rrp: "HK$58,000" },
  { id: "006", slug: "charcoal-grey-pinstripe-db", name: "Charcoal Grey Pinstripe DB", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/BiulTpyoJMPOqBrQ.jpg", price: "HK$12,800", tiers: [{label:"Vitale Barberis",price:"HK$12,800"},{label:"Dormeuil / Holland & Sherry",price:"HK$18,000"},{label:"Carlo Barbera / Loro Piana",price:"HK$28,000",gold:true}], rrp: "HK$58,000" },
  { id: "007", slug: "dark-grey-double-breasted", name: "Dark Grey Double Breasted", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/ZJmCUyhPTHiSBKEX.jpg", price: "HK$12,800", tiers: [{label:"Vitale Barberis",price:"HK$12,800"},{label:"Dormeuil / Holland & Sherry",price:"HK$18,000"},{label:"Carlo Barbera / Loro Piana",price:"HK$28,000",gold:true}], rrp: "HK$58,000" },
  { id: "008", slug: "black-suit", name: "Black Suit", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/heiIXvqutPSXYsQT.jpg", price: "HK$12,800", tiers: [{label:"Vitale Barberis",price:"HK$12,800"},{label:"Dormeuil / Holland & Sherry",price:"HK$18,000"},{label:"Carlo Barbera / Loro Piana",price:"HK$28,000",gold:true}], rrp: "HK$58,000" },
  { id: "009", slug: "black-tuxedo", name: "Black Tuxedo", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/HwrJYhmgykzHojMx.jpg", price: "HK$15,800", tiers: [{label:"Vitale Barberis",price:"HK$15,800"},{label:"Dormeuil / Holland & Sherry",price:"HK$18,800"},{label:"Carlo Barbera / Loro Piana",price:"HK$22,800",gold:true}], rrp: "HK$58,000" },
];

const BLAZERS: ProductItem[] = [
  { id: "010", slug: "dark-navy-blazer", name: "Dark Navy Blazer", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/obhGYlwXMWixoiXP.jpg", price: "HK$8,800", tiers: [{label:"Vitale Barberis",price:"HK$8,800"},{label:"Dormeuil / Holland & Sherry",price:"HK$12,800"},{label:"Carlo Barbera / Loro Piana",price:"HK$16,800",gold:true}], rrp: "HK$38,000" },
  { id: "011", slug: "navy-blazer", name: "Navy Blazer", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/PmAHRBUiaBlSGhii.jpg", price: "HK$8,800", tiers: [{label:"Vitale Barberis",price:"HK$8,800"},{label:"Dormeuil / Holland & Sherry",price:"HK$12,800"},{label:"Carlo Barbera / Loro Piana",price:"HK$16,800",gold:true}], rrp: "HK$38,000" },

];

const TROUSERS: ProductItem[] = [
  { id: "201", slug: "light-grey-flannel-pants", name: "Light Grey Flannel Pants", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/UWwCBVIXIYjINQjZ.jpg", price: "HK$2,800", tiers: [{label:"Vitale Barberis",price:"HK$2,800"},{label:"Dormeuil / Holland & Sherry",price:"HK$3,800"},{label:"Carlo Barbera / Loro Piana",price:"HK$5,800",gold:true}], rrp: "HK$12,000" },
  { id: "202", slug: "ivory-chinos", name: "Ivory Chinos", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/egwIBWRfgUJZMEch.jpg", price: "HK$2,800", tiers: [{label:"Vitale Barberis",price:"HK$2,800"},{label:"Dormeuil / Holland & Sherry",price:"HK$3,800"},{label:"Carlo Barbera / Loro Piana",price:"HK$5,800",gold:true}], rrp: "HK$12,000" },

];

const OVERCOATS: ProductItem[] = [
  { id: "501", slug: "black-overcoat", name: "Black Overcoat", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/HOkQPWLKCHoIdruX.jpg", price: "HK$10,800", tiers: [{label:"Vitale Barberis",price:"HK$10,800"},{label:"Loro Piana Wool",price:"HK$18,000"},{label:"Loro Piana Cashmere",price:"HK$28,000",gold:true}], rrp: "HK$88,000" },
  { id: "502", slug: "dark-grey-overcoat", name: "Dark Grey Overcoat", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/vBwbKqfoaJHEtjQC.jpg", price: "HK$10,800", tiers: [{label:"Vitale Barberis",price:"HK$10,800"},{label:"Loro Piana Wool",price:"HK$18,000"},{label:"Loro Piana Cashmere",price:"HK$28,000",gold:true}], rrp: "HK$88,000" },
  { id: "503", slug: "dark-navy-overcoat", name: "Dark Navy Overcoat", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/VwArcFQaPquFIJZs.jpg", price: "HK$10,800", tiers: [{label:"Vitale Barberis",price:"HK$10,800"},{label:"Loro Piana Wool",price:"HK$18,000"},{label:"Loro Piana Cashmere",price:"HK$28,000",gold:true}], rrp: "HK$88,000" },
  { id: "504", slug: "navy-overcoat", name: "Navy Overcoat", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/nFWodFNNZKgiIfRJ.jpg", price: "HK$10,800", tiers: [{label:"Vitale Barberis",price:"HK$10,800"},{label:"Loro Piana Wool",price:"HK$18,000"},{label:"Loro Piana Cashmere",price:"HK$28,000",gold:true}], rrp: "HK$88,000" },
  { id: "505", slug: "light-grey-overcoat", name: "Light Grey Overcoat", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/olGPRdncWTHtdQNq.jpg", price: "HK$10,800", tiers: [{label:"Vitale Barberis",price:"HK$10,800"},{label:"Loro Piana Wool",price:"HK$18,000"},{label:"Loro Piana Cashmere",price:"HK$28,000",gold:true}], rrp: "HK$88,000" },
  { id: "506", slug: "mid-brown-overcoat", name: "Mid Brown Overcoat", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/BYULNImuvqmTYmBW.jpg", price: "HK$10,800", tiers: [{label:"Vitale Barberis",price:"HK$10,800"},{label:"Loro Piana Wool",price:"HK$18,000"},{label:"Loro Piana Cashmere",price:"HK$28,000",gold:true}], rrp: "HK$88,000" },
];

const SHIRTS: ProductItem[] = [
  { id: "301", slug: "white-shirt", name: "White Shirt", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/KVgzkgDrbzwsZQhk.jpg", price: "HK$880", tiers: [{label:"House",price:"HK$880"},{label:"Italian",price:"HK$1,280"},{label:"Swiss Cotton",price:"HK$1,800",gold:true}], rrp: "HK$3,800" },
  { id: "302", slug: "light-blue-shirt", name: "Light Blue Shirt", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/WqPUqZQVzSZcZbCo.jpg", price: "HK$880", tiers: [{label:"House",price:"HK$880"},{label:"Italian",price:"HK$1,280"},{label:"Swiss Cotton",price:"HK$1,800",gold:true}], rrp: "HK$3,800" },
  { id: "303", slug: "light-pink-shirt", name: "Light Pink Shirt", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/muEGXoshhQGCUQTr.jpg", price: "HK$880", tiers: [{label:"House",price:"HK$880"},{label:"Italian",price:"HK$1,280"},{label:"Swiss Cotton",price:"HK$1,800",gold:true}], rrp: "HK$3,800" },
];

const CATEGORIES = ["All", "Suits", "Shirts", "Blazers", "Trousers", "Overcoats"];

// Reusable large product card
function ProductCard({ item }: { item: ProductItem }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={`/tailored-menswear/${item.slug}`}>
      <div
        style={{ cursor: "pointer" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image container */}
        <div style={{ position: "relative", overflow: "hidden", backgroundColor: "#f0f0ee" }}>
          <img
            src={item.img}
            alt={`${item.name} — Bespoke tailored Hong Kong`}
            loading="lazy"
            style={{
              width: "100%",
              aspectRatio: "2/3",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.45s ease",
              transform: hovered ? "scale(1.04)" : "scale(1)",
            }}
          />
          {/* BESPOKE / MTM badges */}
          <div style={{ position: "absolute", bottom: "10px", left: "10px", display: "flex", gap: "4px" }}>
            <span style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", background: "rgba(0,0,0,0.72)", padding: "3px 7px", border: "1px solid rgba(255,255,255,0.25)" }}>BESPOKE</span>
            <span style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", background: "rgba(0,0,0,0.72)", padding: "3px 7px", border: "1px solid rgba(255,255,255,0.25)" }}>MTM</span>
          </div>
          {/* Hover overlay */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.28)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: "20px",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}>
            <span style={{
              fontFamily: F.mono,
              fontSize: "9px",
              letterSpacing: "0.14em",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.7)",
              padding: "8px 20px",
              textTransform: "uppercase",
              backgroundColor: "rgba(0,0,0,0.4)",
            }}>
              VIEW OPTIONS
            </span>
          </div>
        </div>
        {/* Text below image */}
        <div style={{ paddingTop: "12px", paddingBottom: "4px" }}>
          <p style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#bbb", marginBottom: "4px" }}>{item.id}</p>
          <p style={{
            fontFamily: F.display,
            fontSize: "clamp(13px, 1.4vw, 16px)",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#111",
            marginBottom: "8px",
            lineHeight: 1.2,
          }}>{item.name}</p>
          {/* Pricing tiers */}
          <div style={{ borderTop: "1px solid #e8e8e8", paddingTop: "8px", display: "flex", flexDirection: "column", gap: "3px" }}>
            {item.tiers.map((t) => (
              <div key={t.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.06em", color: "#888", textTransform: "uppercase" }}>{t.label}</span>
                <span style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.06em", color: t.gold ? "#c9a96e" : "#111", fontWeight: 600, display: "inline-flex", alignItems: "center" }}>
                  {t.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function TailoredMenswear() {
  useSEO({
    title: "Tailored Menswear — Handcrafted Bespoke Suits & Shirts | Tailors.hk",
    description: "Handcrafted bespoke and made-to-measure menswear from a world-leading atelier. Suits from HK$12,800 at atelier direct rates — access fine craft production directly.",
    canonical: "https://tailors.hk/tailored-menswear",
    keywords: "bespoke suit Hong Kong price, made to measure suit HK, custom suit Hong Kong, tailored shirt Hong Kong",
    ogType: "website",
    schema: [
      SCHEMAS.breadcrumb([
        { name: "Home", url: "/" },
        { name: "Tailored Menswear", url: "/tailored-menswear" },
      ]),
      SCHEMAS.speakable(["h1", "h2"]),
            {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Tailored Menswear",
        "url": "https://tailors.hk/tailored-menswear",
        "description": "Handcrafted bespoke and made-to-measure menswear at atelier direct rates. Suits from HK$12,800 — access fine craft from a world-leading atelier directly."
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Bespoke Menswear Collection",
        "description": "Hong Kong bespoke tailoring collection",
        "numberOfItems": 22,
        "itemListElement": [
          {"@type": "ListItem", "position": 1, "name": "Midnight Blue Suit", "url": "https://tailors.hk/product/midnight-blue-suit"},
          {"@type": "ListItem", "position": 2, "name": "Charcoal Grey Suit", "url": "https://tailors.hk/product/charcoal-grey-suit"},
          {"@type": "ListItem", "position": 3, "name": "Navy Pinstripe Suit", "url": "https://tailors.hk/product/navy-pinstripe-suit"}
        ]
      }
    ],
  });

  const [activeCategory, setActiveCategory] = useState(() => {
    if (typeof window === "undefined") return "All";
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("cat");
    if (!cat) return "All";
    const map: Record<string, string> = {
      suits: "Suits", blazers: "Blazers", trousers: "Trousers",
      shirts: "Shirts", overcoats: "Overcoats",
    };
    return map[cat.toLowerCase()] ?? "All";
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("cat");
    if (!cat) { setActiveCategory("All"); return; }
    const map: Record<string, string> = {
      suits: "Suits", blazers: "Blazers", trousers: "Trousers",
      shirts: "Shirts", overcoats: "Overcoats",
    };
    setActiveCategory(map[cat.toLowerCase()] ?? "All");
  }, []);

  // Grid column CSS per context
  const suitCols = "repeat(3, 1fr)";
  const suitColsMd = "repeat(2, 1fr)";
  const suitColsSm = "1fr";
  const pairCols = "repeat(2, 1fr)";  // blazers, shirts, trousers (small counts)
  const pairColsSm = "1fr";
  const overcoatCols = "repeat(3, 1fr)";
  const overcoatColsMd = "repeat(2, 1fr)";

  return (
    <main style={{ backgroundColor: "#fff", overflowX: "hidden" }}>
      <style>{`
        .pg-suits    { display: grid; grid-template-columns: ${suitCols}; gap: 20px; }
        .pg-pair     { display: grid; grid-template-columns: ${pairCols}; gap: 20px; }
        .pg-shirts   { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .pg-overcoat { display: grid; grid-template-columns: ${overcoatCols}; gap: 20px; }
        @media (max-width: 1024px) {
          .pg-suits    { grid-template-columns: ${suitColsMd}; }
          .pg-overcoat { grid-template-columns: ${overcoatColsMd}; }
        }
        @media (max-width: 768px) {
          .pg-shirts   { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .pg-suits    { grid-template-columns: ${suitColsSm}; gap: 14px; }
          .pg-pair     { grid-template-columns: ${pairColsSm}; gap: 14px; }
          .pg-shirts   { grid-template-columns: 1fr; gap: 14px; }
          .pg-overcoat { grid-template-columns: repeat(2, 1fr); gap: 14px; }
        }
      `}</style>
      <Navigation />

      {/* Hero */}
      <section style={{ position: "relative", borderBottom: "1px solid #1a1a1a", padding: "100px 0 60px", background: "#111", color: "#fff", overflow: "hidden" }}>
        <img
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/vKnOFrsPkulZuMdk.webp"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.38, pointerEvents: "none" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#666", display: "block", marginBottom: "12px" }}>§ 01 · TAILORED MENSWEAR</span>
          <h1 style={{ fontFamily: F.display, fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", lineHeight: 1.05, marginBottom: "16px" }}>Tailored Menswear</h1>
          <p style={{ fontFamily: F.body, fontSize: "15px", lineHeight: 1.75, color: "#aaa", maxWidth: "560px" }}>The pieces shown here are essential menswear basics — the core garments every wardrobe is built around, ideal for daily rotation. They represent a starting point, not a ceiling. Every commission is bespoke to the client: from tailored shorts and denim to black-tie, morning dress, and event wear. If you wear it, we make it.</p>
        </div>
      </section>

      {/* Category filter tabs */}
      <div style={{ borderBottom: "1px solid #e2e2e2", display: "flex", justifyContent: "center", overflowX: "auto" }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "14px 20px", border: "none",
              borderBottom: activeCategory === cat ? "2px solid #111" : "2px solid transparent",
              background: "none", color: activeCategory === cat ? "#111" : "#aaa",
              cursor: "pointer", transition: "color 0.15s", whiteSpace: "nowrap",
            }}
          >{cat}</button>
        ))}
      </div>

      {/* ── SUITS ─────────────────────────────────────────────────────── */}
      {(activeCategory === "All" || activeCategory === "Suits") && (
        <section style={{ padding: "64px 0", borderBottom: "1px solid #e5e5e5" }}>
          <div className="container">
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "6px" }}>TIMELESS BUSINESS SUITING</span>
                <h2 style={{ fontFamily: F.display, fontSize: "clamp(20px, 2.8vw, 32px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111" }}>Tailored Suits</h2>
              </div>
              <Link href="/how-it-works"><span className="btn-outline">How It Works</span></Link>
            </div>
            <div className="pg-suits">
              {SUITS.map((item) => <ProductCard key={item.id} item={item} />)}
            </div>
            <div style={{ marginTop: "40px" }}>
              <a href={menswearEnquiryUrl({ garment: "Suits", price: "HK$12,800" })} target="_blank" rel="noopener noreferrer">
                <span className="btn-outline">Enquire About a Suit</span>
              </a>
              <p style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#aaa", marginTop: "10px", textTransform: "uppercase" }}>◆ Atelier Direct · From HK$12,800</p>
            </div>
          </div>
        </section>
      )}

      {/* ── BLAZERS ───────────────────────────────────────────────────── */}
      {(activeCategory === "All" || activeCategory === "Blazers") && (
        <section style={{ padding: "64px 0", borderBottom: "1px solid #e5e5e5", backgroundColor: activeCategory === "All" ? "#f7f7f7" : "#fff" }}>
          <div className="container">
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "6px" }}>SPORT COATS & BLAZERS</span>
                <h2 style={{ fontFamily: F.display, fontSize: "clamp(20px, 2.8vw, 32px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111" }}>Tailored Blazers</h2>
              </div>
              <Link href="/contact?type=bespoke"><span className="btn-outline">Enquire About a Blazer</span></Link>
            </div>
            <div className="pg-pair">
              {BLAZERS.map((item) => <ProductCard key={item.id} item={item} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── SHIRTS ────────────────────────────────────────────────────── */}
      {(activeCategory === "All" || activeCategory === "Shirts") && (
        <section style={{ padding: "64px 0", borderBottom: "1px solid #e5e5e5" }}>
          <div className="container">
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "6px" }}>TIMELESS TAILORED SHIRTING</span>
                <h2 style={{ fontFamily: F.display, fontSize: "clamp(20px, 2.8vw, 32px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111" }}>Tailored Shirts</h2>
              </div>
              <Link href="/contact?type=bespoke"><span className="btn-outline">Enquire About a Shirt</span></Link>
            </div>
            <div className="pg-shirts">
              {SHIRTS.map((item) => <ProductCard key={item.id} item={item} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── TROUSERS ──────────────────────────────────────────────────── */}
      {(activeCategory === "All" || activeCategory === "Trousers") && (
        <section style={{ padding: "64px 0", borderBottom: "1px solid #e5e5e5", backgroundColor: activeCategory === "All" ? "#f7f7f7" : "#fff" }}>
          <div className="container">
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "6px" }}>TAILORED TROUSERS & CHINOS</span>
                <h2 style={{ fontFamily: F.display, fontSize: "clamp(20px, 2.8vw, 32px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111" }}>Tailored Trousers</h2>
              </div>
              <a href={menswearEnquiryUrl({ garment: "Trousers", price: "HK$2,800" })} target="_blank" rel="noopener noreferrer">
                <span className="btn-outline">Enquire About Trousers</span>
              </a>
            </div>
            <div className="pg-pair">
              {TROUSERS.map((item) => <ProductCard key={item.id} item={item} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── OVERCOATS ─────────────────────────────────────────────────── */}
      {(activeCategory === "All" || activeCategory === "Overcoats") && (
        <section style={{ padding: "64px 0", borderBottom: "1px solid #e5e5e5" }}>
          <div className="container">
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "6px" }}>CASHMERE & WOOL OVERCOATS</span>
                <h2 style={{ fontFamily: F.display, fontSize: "clamp(20px, 2.8vw, 32px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111" }}>Overcoats</h2>
              </div>
              <a href={menswearEnquiryUrl({ garment: "Overcoats", price: "HK$10,800" })} target="_blank" rel="noopener noreferrer">
                <span className="btn-outline">Enquire About an Overcoat</span>
              </a>
            </div>
            <div className="pg-overcoat">
              {OVERCOATS.map((item) => <ProductCard key={item.id} item={item} />)}
            </div>
            <p style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#aaa", marginTop: "16px", textTransform: "uppercase" }}>◆ Atelier Direct · From HK$10,800</p>
          </div>
        </section>
      )}

      {/* ── FABRICS (All view only) ────────────────────────────────────── */}
      {activeCategory === "All" && (
        <section style={{ padding: "64px 0" }}>
          <div className="container">
            <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "8px" }}>PREMIUM FABRICS</span>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(20px, 2.8vw, 32px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", marginBottom: "32px" }}>World-Class Cloth</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
              {[
                { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/prqGrMlrEOEEDwqq.jpeg", label: "Wool Suiting" },
                { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/TkBztkkzndumsmvs.jpeg", label: "Fabrication" },
                { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/xSAEdhySXqdKlJEA.png", label: "Luxury Shirting" },
                { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/cxYMBJJJLPLejyTt.png", label: "Fine Dress Shirting" },
              ].map((f) => (
                <div key={f.label} className="guide-card">
                  <img src={f.img} alt={`${f.label} — premium tailoring fabrics Hong Kong`} loading="lazy" style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }} />
                  <p style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", marginTop: "8px" }}>{f.label}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "28px" }}>
              <Link href="/tailor-guides/essential-guide-to-suit-fabrics">
                <span className="btn-outline">Read the Fabric Guide</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Share */}
      <section style={{ padding: "32px 0", borderTop: "1px solid #e5e5e5" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa" }}>SHARE THIS PAGE</span>
          <ShareButton title="Tailored Menswear — Tailors.hk" text="Bespoke suits, shirts, blazers, trousers and overcoats in Hong Kong at atelier direct rates." variant="icon" scheme="light" />
        </div>
      </section>
      <Footer />
    </main>
  );
}
