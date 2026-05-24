"use client";
import { useSEO, SCHEMAS } from "@/hooks/useSEO";
/**
 * DormeuIlAnthology — Dormeuil Fabric Anthology
 * Design: Dark mono editorial, matching HollandSherryAnthology card format
 * Layout: Category tabs + filter bar + expandable grid cards
 * Data: Dormeuil bunches from dormeuil.com/pages/our-bunches
 * Mill: Dormeuil · Est. 1842 · Reims, France
 */

import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButton from "@/components/ShareButton";
// SEO handled by generateMetadata in page.tsx

const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body:    '"Barlow", Arial, sans-serif',
  mono:    '"JetBrains Mono", "Courier New", monospace',
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

type Garment = "SUIT" | "JACKET" | "PANTS" | "SHIRT" | "OUTERWEAR" | "CASUAL";
type Fibre   = "WOOL" | "CASHMERE" | "COTTON" | "LINEN" | "SILK" | "MOHAIR" | "BLEND";
type Category = "SUITING" | "LUXURY & CASHMERE" | "EVENING & CEREMONIAL" | "SEASONAL" | "SUSTAINABILITY";

interface DormeuIlCollection {
  id: string;
  name: string;
  category: Category;
  keySellingPoint: string;
  composition: string;
  weight: string;
  priceIndex: number; // 0–3
  garments: Garment[];
  fibre: Fibre[];
  description: string;
  notes?: string;
  isNew?: boolean;
  isTopSeller?: boolean;
}

const COLLECTIONS: DormeuIlCollection[] = [
  // ── SUITING ──────────────────────────────────────────────────────────────
  {
    id: "amadeus",
    name: "AMADEUS",
    category: "SUITING",
    keySellingPoint: "Pure extrafine Merino with outstanding performance",
    composition: "100% Extrafine Merino Wool",
    weight: "260–300 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    isTopSeller: true,
    description: "Amadeus is one of Dormeuil's most enduring suiting collections. Made of pure extrafine Merino wool, it delivers outstanding performance with a great handle, owing to the unique finishing processes Dormeuil applies in its traditional mills in England. The cloth has a clean, smooth surface with excellent drape and crease recovery — the qualities that have made it a favourite of tailors and clients alike for decades. Available in the full range of business colours and patterns.",
  },
  {
    id: "amadeus-365",
    name: "AMADEUS 365",
    category: "SUITING",
    keySellingPoint: "Lightweight year-round suiting in pure wool",
    composition: "100% Wool",
    weight: "220–250 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    isTopSeller: true,
    description: "Amadeus 365 is, as the name implies, a lightweight suiting ideal for year-round wear. Its secret lies in the use of a new compact yarn in pure wool which ensures that a highly precise weave can be achieved by Dormeuil's mills in the UK. The compact yarn construction gives the cloth a clean, smooth surface and excellent crease resistance, while the lighter weight ensures comfort across all seasons. The definitive year-round business suiting from Dormeuil.",
  },
  {
    id: "ambassador",
    name: "AMBASSADOR",
    category: "SUITING",
    keySellingPoint: "One of the finest two-fold yarns in the world",
    composition: "100% Wool Super 130s",
    weight: "240–280 g/m²",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    description: "The recipe for Ambassador's success lies in the fineness of the 14.5 micron wool fibre and the spinning process involved, producing one of the finest two-fold yarns in the world, used in both warp and weft. The resulting cloth has a surface of extraordinary smoothness and a drape that is unmistakably luxurious. Ambassador is the cloth for the client who wants a suit of genuine distinction — one that will be recognised by those who know.",
  },
  {
    id: "distinxion",
    name: "DISTINXION",
    category: "SUITING",
    keySellingPoint: "Wool and silk blend for subtle translucent lustre",
    composition: "Wool & Silk Blend",
    weight: "240–270 g/m²",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "SILK", "BLEND"],
    description: "The subtle, translucent lustre of wool embodies luxury, while the addition of silk yarn lends a special sheen to Distinxion. The blend offers the opportunity to combine the intrinsic qualities of both fibres, exploiting their differences to enhance performance. The wool provides structure and drape; the silk adds brightness and a characteristic shot effect that gives the cloth a luminous quality under artificial light. Distinxion is the cloth for the client who wants a suit that is quietly extraordinary.",
  },
  {
    id: "echo",
    name: "ECHO",
    category: "SUITING",
    keySellingPoint: "Super 130s with guaranteed traceability and natural stretch",
    composition: "100% Merino Wool Super 130s",
    weight: "240–270 g/m²",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    isNew: true,
    description: "Echo is Dormeuil's innovative fabric with guaranteed traceability. It uses two different Merino wools sourced from Patagonia and Australia — the combination lending the cloth softness and unique performance, including natural stretch, while the finishing process ensures water-repellency. Each metre of Echo comes with full supply chain documentation, from the farm to the finished cloth. For the client who wants both quality and provenance.",
  },
  {
    id: "15-point-7",
    name: "15 POINT 7",
    category: "SUITING",
    keySellingPoint: "Ultra-fine New Zealand Merino — characterised by superlatives",
    composition: "100% Merino Wool Super 150s",
    weight: "200–230 g/m²",
    priceIndex: 3,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    description: "The secret of 15 Point 7 lies in the synergy of the elements. Characterised by superlatives, it features ultra-fine wool from the fleece of New Zealand Merino sheep with ultra-fine yarn, ultra-lightweight fabric, and an ultra-dense weave. The name refers to the 15.7 micron fibre diameter — among the finest commercially available. The result is a cloth of extraordinary softness, lightness, and precision that represents the absolute pinnacle of Dormeuil's suiting range.",
  },
  {
    id: "180-years",
    name: "180 YEARS",
    category: "SUITING",
    keySellingPoint: "Inimitable lightness and luxury — the Dormeuil signature",
    composition: "Wool, Cashmere & Silk Blend",
    weight: "220–260 g/m²",
    priceIndex: 3,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "CASHMERE", "SILK", "BLEND"],
    isTopSeller: true,
    description: "180 Years is recognised everywhere as possessing inimitable qualities of lightness and luxury. When combined with Dormeuil's other speciality fibres — cashmere, silk, and extrafine wool — it lends an entirely new dimension to these fabrics. The collection celebrates the heritage of the House of Dormeuil, bringing together the finest fibres in combinations that showcase the mill's expertise in luxury blending. A cloth that announces itself without ostentation.",
  },
  {
    id: "british-vintage",
    name: "BRITISH VINTAGE",
    category: "SUITING",
    keySellingPoint: "Iconic Dormeuil fabrics for winter warmth",
    composition: "100% Wool",
    weight: "300–380 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS", "OUTERWEAR"],
    fibre: ["WOOL"],
    description: "The British Vintage collection features several iconic Dormeuil fabrics which were expressly developed for winter warmth and are manufactured in the House's traditional mills in England. These are the cloths that have defined British tailoring for generations — the heavy flannels, the dense twills, and the robust worsteds that provide genuine warmth and structure in cold climates. British Vintage is a celebration of the great tradition of English mill production.",
  },
  // ── LUXURY & CASHMERE ─────────────────────────────────────────────────────
  {
    id: "cashmere",
    name: "CASHMERE",
    category: "LUXURY & CASHMERE",
    keySellingPoint: "Highest quality cashmere, woven with a commitment to excellence",
    composition: "100% Cashmere",
    weight: "280–340 g/m²",
    priceIndex: 3,
    garments: ["SUIT", "JACKET", "PANTS", "OUTERWEAR"],
    fibre: ["CASHMERE"],
    description: "Dormeuil's Cashmere collection is crafted exclusively from the highest quality material — each yarn is woven with a commitment to excellence, ensuring that every piece meets the House's exacting standards. Pure cashmere suiting is one of the most luxurious experiences in tailoring: the extraordinary softness, the natural warmth, and the characteristic drape of the fibre combine to create a cloth that is unlike any other. Available in the classic cashmere palette.",
  },
  {
    id: "cashmere-supreme",
    name: "CASHMERE SUPREME",
    category: "LUXURY & CASHMERE",
    keySellingPoint: "Cashmere blend fancies with nano finish for water resistance",
    composition: "Cashmere Blend",
    weight: "280–320 g/m²",
    priceIndex: 3,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["CASHMERE", "BLEND"],
    description: "Cashmere Supreme is the perfect choice for easy-to-wear jackets and suits as well as sport chic jackets. Thanks to the nano finish, water glides over the fabric surface and the feel is very soft to the touch. The nano finish is applied after weaving and does not affect the natural qualities of the cashmere — the softness, the warmth, the drape — but adds a practical water-resistance that makes the cloth significantly more versatile for everyday wear.",
  },
  {
    id: "cashmania",
    name: "CASHMANIA",
    category: "LUXURY & CASHMERE",
    keySellingPoint: "Pure cashmere and cashmere-silk blends with a contemporary edge",
    composition: "Pure Cashmere & Cashmere-Silk Blend",
    weight: "260–300 g/m²",
    priceIndex: 3,
    garments: ["JACKET", "SUIT", "OUTERWEAR"],
    fibre: ["CASHMERE", "SILK", "BLEND"],
    isNew: true,
    description: "The Cashmania collection showcases Dormeuil's expertise in rare cashmere fabrics, featuring both pure cashmere and refined cashmere-silk blends. Designed for exceptional softness and warmth, these luxurious fabrics offer a refined winter wardrobe with a contemporary edge. The cashmere-silk blends are particularly distinctive — the silk adds a characteristic luminosity to the cashmere's natural softness, creating a cloth of extraordinary beauty.",
  },
  // ── EVENING & CEREMONIAL ──────────────────────────────────────────────────
  {
    id: "ceremonial",
    name: "CEREMONIAL",
    category: "EVENING & CEREMONIAL",
    keySellingPoint: "Elegant understated styling in navy and black",
    composition: "Wool, Silk & Mohair Blend",
    weight: "240–280 g/m²",
    priceIndex: 2,
    garments: ["SUIT", "JACKET"],
    fibre: ["WOOL", "SILK", "MOHAIR", "BLEND"],
    description: "Designed in navy and black, the Ceremonial collection is the epitome of elegant, understated styling. A variety of materials — grain de poudre in a number of weights, and combinations of wool, silk and mohair — are used, each with unique appeal and excellent drape. The grain de poudre weave structure, with its characteristic fine, even texture, has been the preferred cloth for formal and ceremonial dress for over a century. Ceremonial is the collection for the most important occasions.",
  },
  {
    id: "celebration",
    name: "CELEBRATION",
    category: "EVENING & CEREMONIAL",
    keySellingPoint: "Innovative fabrics with shimmers of gold, silver or platinum",
    composition: "Wool & Precious Metal Thread Blend",
    weight: "230–270 g/m²",
    priceIndex: 3,
    garments: ["SUIT", "JACKET"],
    fibre: ["WOOL", "BLEND"],
    isNew: true,
    description: "The Celebration collection gives full flight to the imagination of the House of Dormeuil, resulting in innovative fabrics with shimmers of gold, silver or platinum. These create technically colourful evening wear with exquisite understated details to help you navigate big occasions or sunny days with ease, on a tide of poise and charm. The precious metal threads are woven into the cloth structure — not applied as a surface treatment — ensuring their lustre is permanent.",
  },
  // ── SEASONAL ──────────────────────────────────────────────────────────────
  {
    id: "d-philosophy-ss",
    name: "D PHILOSOPHY SS",
    category: "SEASONAL",
    keySellingPoint: "Nautical preppy charm inspired by the American East Coast",
    composition: "Wool & Linen Blend",
    weight: "200–240 g/m²",
    priceIndex: 1,
    garments: ["JACKET", "SUIT", "CASUAL"],
    fibre: ["WOOL", "LINEN", "BLEND"],
    isNew: true,
    description: "This season, D Philosophy takes a nautical detour with a touch of preppy charm. Inspired by the American East Coast, the collection transforms classic essentials into bold, contemporary pieces. The spring/summer palette draws on the colours of the Atlantic seaboard — the blues and whites of sailing, the khakis and greens of the Hamptons — rendered in lightweight wool and linen blends that are both comfortable and refined.",
  },
  {
    id: "d-philosophy-aw",
    name: "D PHILOSOPHY AW",
    category: "SEASONAL",
    keySellingPoint: "Stylish jackets for the trendy contemporary client",
    composition: "Wool & Blend",
    weight: "260–300 g/m²",
    priceIndex: 1,
    garments: ["JACKET", "CASUAL"],
    fibre: ["WOOL", "BLEND"],
    description: "Dormeuil's D Philosophy will serve our trendy customers searching for a stylish jacket. What began as Friday wear has become much more than Fridays — it is the collection for the client who wants a jacket that works across the full spectrum of contemporary dress codes, from the office to the weekend. The autumn/winter version uses heavier, richer fabrics that provide warmth without sacrificing the relaxed, contemporary sensibility of the D Philosophy range.",
  },
  // ── SUSTAINABILITY ─────────────────────────────────────────────────────────
  {
    id: "forever-green",
    name: "FOREVER GREEN",
    category: "SUSTAINABILITY",
    keySellingPoint: "Finest wool with sustainable natural fibres — bamboo, cotton, silk, linen",
    composition: "Wool, Bamboo, Cotton, Silk & Linen Blend",
    weight: "230–270 g/m²",
    priceIndex: 1,
    garments: ["JACKET", "SUIT", "CASUAL"],
    fibre: ["WOOL", "COTTON", "SILK", "LINEN", "BLEND"],
    isNew: true,
    description: "The Forever Green collection is made from a combination of the finest wool and sustainable natural fibres, such as bamboo, cotton, silk and linen. This exquisite collection is ideal for crafting stylish and comfortable jackets while reflecting Dormeuil's unwavering commitment to the environment. The sustainable fibres are selected not only for their environmental credentials but for their contribution to the performance and character of the finished cloth — bamboo adds softness and breathability, linen adds texture and freshness.",
  },
];

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const ALL_FIBRES: Fibre[] = ["WOOL", "CASHMERE", "COTTON", "LINEN", "SILK", "MOHAIR", "BLEND"];
const ALL_GARMENTS: Garment[] = ["SUIT", "JACKET", "PANTS", "SHIRT", "OUTERWEAR", "CASUAL"];
const ALL_CATEGORIES: Category[] = ["SUITING", "LUXURY & CASHMERE", "EVENING & CEREMONIAL", "SEASONAL", "SUSTAINABILITY"];

const PRICE_LABELS = ["ENTRY", "CLASSIC", "PREMIUM", "PRESTIGE"];
const PRICE_COLORS = [
  { bg: "#f5f5f5", text: "#666" },
  { bg: "#e8f0e8", text: "#3a6b3a" },
  { bg: "#e8f0f8", text: "#1a4a7a" },
  { bg: "#f8f0e0", text: "#8a5a00" },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function DormeuIlAnthology() {
  useSEO({
    title: "Dormeuil Fabric Anthology — Luxury Suiting Cloths | Tailors.hk",
    description: "Explore the full Dormeuil fabric anthology — luxury suiting cloths from Reims, France. Amadeus, Iconik, Vanquish II and more. Curated by Tailors.hk.",
    canonical: "https://tailors.hk/dormeuil-anthology",
    schema: [
      SCHEMAS.organization(),
      SCHEMAS.breadcrumb([
        { name: 'Home', url: '/' },
        { name: 'Dormeuil Anthology', url: '/dormeuil-anthology' },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Dormeuil Fabric Anthology — Luxury Suiting Cloths | Tailors.hk",
        "description": "Explore the full Dormeuil fabric anthology — luxury suiting cloths from Reims, France. Amadeus, Iconik, Vanquish II and more. Curated by Tailors.hk.",
        "url": "https://tailors.hk/dormeuil-anthology",
        "about": {
          "@type": "Product",
          "name": "Dormeuil Suiting Fabrics",
          "description": "Dormeuil luxury suiting fabrics from Reims, France — Amadeus, Iconik, Vanquish II collections",
          "brand": { "@type": "Brand", "name": "Dormeuil" }
        },
        "isPartOf": { "@type": "WebSite", "@id": "https://tailors.hk/#website" }
      }
    ],
  });
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price" | "category">("category");
  const [activeFibre, setActiveFibre] = useState<Fibre | "ALL">("ALL");
  const [activeGarment, setActiveGarment] = useState<Garment | "ALL">("ALL");
  const [activeCategory, setActiveCategory] = useState<Category | "ALL">("ALL");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = COLLECTIONS.filter((c) => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (activeFibre !== "ALL" && !c.fibre.includes(activeFibre)) return false;
      if (activeGarment !== "ALL" && !c.garments.includes(activeGarment)) return false;
      if (activeCategory !== "ALL" && c.category !== activeCategory) return false;
      return true;
    });
    if (sortBy === "price") list = [...list].sort((a, b) => b.priceIndex - a.priceIndex);
    else if (sortBy === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    else list = [...list].sort((a, b) => ALL_CATEGORIES.indexOf(a.category) - ALL_CATEGORIES.indexOf(b.category));
    return list;
  }, [search, sortBy, activeFibre, activeGarment, activeCategory]);

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      <Navigation />

      {/* ── Hero ── */}
      <section style={{ position: "relative", backgroundColor: "#0a0a0a", color: "#fff", padding: "80px 0 60px", overflow: "hidden" }}>
        <img
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/PKJoscCNPdnsQqhg.jpg"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.25, pointerEvents: "none" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.92) 100%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "24px", marginBottom: "40px" }}>
            <div>
              <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.14em", color: "#555", display: "block", marginBottom: "12px" }}>
                § FABRIC ANTHOLOGY · MILL REFERENCE
              </span>
              <h1 style={{ fontFamily: F.display, fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "#fff", lineHeight: 1, margin: "0 0 8px" }}>
                DORMEUIL
              </h1>
              <p style={{ fontFamily: F.display, fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#555", margin: "0 0 20px" }}>
                EST. 1842 · REIMS, FRANCE
              </p>
              <p style={{ fontFamily: F.body, fontSize: "15px", lineHeight: 1.75, color: "#888", maxWidth: "560px" }}>
                A complete reference to Dormeuil's fabric bunches — from the benchmark Amadeus suiting to the ultra-fine 15 Point 7, pure cashmere, and the sustainable Forever Green collection. {COLLECTIONS.length} bunches spanning suiting, luxury cashmere, evening wear, and seasonal fabrics.
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px", alignItems: "center", flexShrink: 0 }}>
              <BookmarkButton
                item={{
                  slug: "dormeuil-anthology",
                  title: "Dormeuil Fabric Anthology",
                  category: "FABRIC REFERENCE",
                  img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/PKJoscCNPdnsQqhg.jpg",
                  excerpt: `${COLLECTIONS.length} bunches profiled with composition, weight, garment suitability, and price tier.`,
                }}
              />
              <ShareButton
                title="Dormeuil Fabric Anthology — Tailors.hk"
                text={`A complete reference to Dormeuil's fabric bunches — ${COLLECTIONS.length} bunches spanning suiting, luxury cashmere, evening wear, and seasonal fabrics.`}
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            {[
              { label: "BUNCHES", value: String(COLLECTIONS.length) },
              { label: "CATEGORIES", value: "5" },
              { label: "MILL", value: "DORMEUIL · REIMS, FRANCE" },
              { label: "EST.", value: "1842" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.12em", color: "#555", marginBottom: "4px" }}>{s.label}</div>
                <div style={{ fontFamily: F.display, fontSize: "18px", fontWeight: 700, letterSpacing: "0.06em", color: "#fff" }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category filter ── */}
      <section style={{ backgroundColor: "#fff", borderBottom: "1px solid #e0e0e0", position: "sticky", top: "52px", zIndex: 50 }}>
        <div className="container" style={{ padding: "0" }}>
          <div style={{ display: "flex", gap: "0", overflowX: "auto" }}>
            {(["ALL", ...ALL_CATEGORIES] as (Category | "ALL")[]).map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em",
                    padding: "16px 20px", border: "none", borderBottom: active ? "2px solid #111" : "2px solid transparent",
                    backgroundColor: "transparent", color: active ? "#111" : "#999",
                    cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.12s",
                    fontWeight: active ? 700 : 400,
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Filter bar ── */}
      <section style={{ backgroundColor: "#fafafa", borderBottom: "1px solid #e8e8e8" }}>
        <div className="container" style={{ padding: "12px 0" }}>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
            <input
              type="text"
              placeholder="SEARCH BUNCHES..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.08em",
                border: "1px solid #d0d0d0", padding: "8px 12px",
                backgroundColor: "#fff", color: "#111", outline: "none",
                width: "200px", textTransform: "uppercase",
              }}
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              style={{
                fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.08em",
                border: "1px solid #d0d0d0", padding: "8px 12px",
                backgroundColor: "#fff", color: "#111", outline: "none",
                textTransform: "uppercase", cursor: "pointer",
              }}
            >
              <option value="category">SORT: CATEGORY</option>
              <option value="price">SORT: PRICE TIER</option>
              <option value="name">SORT: NAME A–Z</option>
            </select>
          </div>
        </div>
      </section>

      {/* ── Fibre filter ── */}
      <section style={{ backgroundColor: "#fff", borderBottom: "1px solid #eeeeee" }}>
        <div className="container" style={{ padding: "10px 0" }}>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.1em", color: "#bbb", marginRight: "4px" }}>FIBRE</span>
            {(["ALL", ...ALL_FIBRES] as (Fibre | "ALL")[]).map((f) => {
              const active = activeFibre === f;
              return (
                <button key={f} onClick={() => setActiveFibre(f)} style={{
                  fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.08em",
                  padding: "4px 10px", border: active ? "1.5px solid #111" : "1px solid #d8d8d8",
                  backgroundColor: active ? "#111" : "transparent",
                  color: active ? "#fff" : "#666", cursor: "pointer", transition: "all 0.12s",
                }}>
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Garment filter ── */}
      <section style={{ backgroundColor: "#fff", borderBottom: "1px solid #e0e0e0" }}>
        <div className="container" style={{ padding: "10px 0" }}>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.1em", color: "#bbb", marginRight: "4px" }}>GARMENT</span>
            {(["ALL", ...ALL_GARMENTS] as (Garment | "ALL")[]).map((g) => {
              const active = activeGarment === g;
              return (
                <button key={g} onClick={() => setActiveGarment(g)} style={{
                  fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.08em",
                  padding: "4px 10px", border: active ? "1.5px solid #111" : "1px solid #d8d8d8",
                  backgroundColor: active ? "#111" : "transparent",
                  color: active ? "#fff" : "#666", cursor: "pointer", transition: "all 0.12s",
                }}>
                  {g}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Results count ── */}
      <section style={{ padding: "16px 0 0" }}>
        <div className="container">
          <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: "#aaa" }}>
            {filtered.length} BUNCH{filtered.length !== 1 ? "ES" : ""} · {[activeCategory !== "ALL" ? activeCategory : "", activeFibre !== "ALL" ? activeFibre : "", activeGarment !== "ALL" ? activeGarment : ""].filter(Boolean).join(" · ") || "ALL CATEGORIES & FIBRES"}
          </span>
        </div>
      </section>

      {/* ── Grid ── */}
      <section style={{ padding: "16px 0 80px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))", gap: "1px", backgroundColor: "#e0e0e0" }}>
            {filtered.map((c) => {
              const isExpanded = expanded === c.id;
              const pc = PRICE_COLORS[c.priceIndex] ?? PRICE_COLORS[1];
              return (
                <div
                  key={c.id}
                  style={{ backgroundColor: "#fff", cursor: "pointer" }}
                  onClick={() => setExpanded(isExpanded ? null : c.id)}
                >
                  {/* Card header */}
                  <div style={{ padding: "24px 24px 16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                      <div>
                        <span style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.12em", color: "#aaa", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                          {c.category} · DORMEUIL
                        </span>
                        <h3 style={{ fontFamily: F.display, fontSize: "20px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#111", lineHeight: 1.1, margin: "0 0 4px" }}>
                          {c.name}
                        </h3>
                        <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.06em", color: "#888" }}>
                          {c.composition}
                        </span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "flex-end", flexShrink: 0, marginLeft: "12px" }}>
                        <span style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.08em", padding: "3px 8px", backgroundColor: pc.bg, color: pc.text, whiteSpace: "nowrap" }}>
                          {PRICE_LABELS[c.priceIndex]}
                        </span>
                        {c.isNew && (
                          <span style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.08em", padding: "2px 6px", backgroundColor: "#e8f0e8", color: "#3a6b3a", border: "1px solid #c8dcc8", whiteSpace: "nowrap" }}>
                            NEW
                          </span>
                        )}
                        {c.isTopSeller && (
                          <span style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.08em", padding: "2px 6px", backgroundColor: "#f8f0e0", color: "#8a5a00", border: "1px solid #e0c880", whiteSpace: "nowrap" }}>
                            TOP SELLER
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Key selling point */}
                    <p style={{ fontFamily: F.body, fontSize: "12px", lineHeight: 1.6, color: "#666", margin: "0 0 14px", fontStyle: "italic" }}>
                      "{c.keySellingPoint}"
                    </p>

                    {/* Quick facts */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      <div>
                        <div style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.1em", color: "#bbb", marginBottom: "2px" }}>WEIGHT</div>
                        <div style={{ fontFamily: F.body, fontSize: "11px", color: "#555" }}>{c.weight}</div>
                      </div>
                      <div>
                        <div style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.1em", color: "#bbb", marginBottom: "2px" }}>GARMENTS</div>
                        <div style={{ fontFamily: F.body, fontSize: "11px", color: "#555" }}>{c.garments.join(" · ")}</div>
                      </div>
                    </div>
                  </div>

                  {/* Price tier bar */}
                  <div style={{ padding: "8px 24px 4px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontFamily: F.mono, fontSize: "6px", letterSpacing: "0.08em", color: "#bbb", width: "82px", flexShrink: 0 }}>PRICE TIER</span>
                      <div style={{ flex: 1, display: "flex", gap: "2px" }}>
                        {[0, 1, 2, 3].map((pip) => (
                          <div key={pip} style={{ flex: 1, height: "3px", backgroundColor: pip <= c.priceIndex ? "#111" : "#e8e8e8" }} />
                        ))}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                      <span style={{ fontFamily: F.mono, fontSize: "6px", letterSpacing: "0.08em", color: "#bbb", width: "82px", flexShrink: 0 }}>FIBRE PROFILE</span>
                      <div style={{ flex: 1, display: "flex", gap: "3px", flexWrap: "wrap" }}>
                        {c.fibre.map((f) => (
                          <span key={f} style={{ fontFamily: F.mono, fontSize: "6px", letterSpacing: "0.06em", color: "#888", border: "1px solid #e8e8e8", padding: "1px 5px" }}>{f}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Expand toggle */}
                  <div style={{ padding: "8px 24px 16px", display: "flex", justifyContent: "flex-end" }}>
                    <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.08em", color: "#aaa" }}>
                      {isExpanded ? "LESS ↑" : "MORE ↓"}
                    </span>
                  </div>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div style={{ padding: "0 24px 24px", borderTop: "1px solid #f0f0f0" }}>
                      <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.75, color: "#555", margin: "16px 0" }}>
                        {c.description}
                      </p>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: c.notes ? "12px" : "0" }}>
                        <div>
                          <div style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.1em", color: "#bbb", marginBottom: "4px" }}>COMPOSITION</div>
                          <div style={{ fontFamily: F.body, fontSize: "11px", color: "#555", lineHeight: 1.5 }}>{c.composition}</div>
                        </div>
                        <div>
                          <div style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.1em", color: "#bbb", marginBottom: "4px" }}>WEIGHT</div>
                          <div style={{ fontFamily: F.body, fontSize: "11px", color: "#555" }}>{c.weight}</div>
                        </div>
                        <div>
                          <div style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.1em", color: "#bbb", marginBottom: "4px" }}>GARMENTS</div>
                          <div style={{ fontFamily: F.body, fontSize: "11px", color: "#555", lineHeight: 1.5 }}>{c.garments.join(", ")}</div>
                        </div>
                        <div>
                          <div style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.1em", color: "#bbb", marginBottom: "4px" }}>CATEGORY</div>
                          <div style={{ fontFamily: F.body, fontSize: "11px", color: "#555" }}>{c.category}</div>
                        </div>
                      </div>
                      {c.notes && (
                        <div style={{ marginTop: "12px", borderLeft: "2px solid #e0e0e0", paddingLeft: "10px" }}>
                          <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.06em", color: "#aaa" }}>* {c.notes}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#aaa", fontFamily: F.mono, fontSize: "11px", letterSpacing: "0.1em" }}>
              NO BUNCHES MATCH YOUR SEARCH
            </div>
          )}
        </div>
      </section>

      {/* ── Mill note ── */}
      <section style={{ backgroundColor: "#0a0a0a", color: "#fff", padding: "60px 0" }}>
        <div className="container" style={{ maxWidth: "680px" }}>
          <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#555", display: "block", marginBottom: "12px" }}>
            MILL REFERENCE
          </span>
          <h2 style={{ fontFamily: F.display, fontSize: "24px", fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", marginBottom: "16px" }}>
            DORMEUIL · EST. 1842
          </h2>
          <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.8, color: "#777", marginBottom: "24px" }}>
            Founded in 1842 in Reims, France, Dormeuil is one of the world's most celebrated fabric houses — known for its uncompromising pursuit of quality and its mastery of luxury blending. The House works with the finest mills in England and France to produce fabrics that have clothed heads of state, royalty, and the most discerning private clients for over 180 years. From the benchmark Amadeus suiting to the ultra-fine 15 Point 7 and the spectacular Celebration evening fabrics, Dormeuil represents the mid-tier of the Tailors.hk fabric programme — cloths of genuine distinction at a considered price.
          </p>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {[
              { label: "FOUNDED", value: "1842" },
              { label: "LOCATION", value: "REIMS, FRANCE" },
              { label: "SPECIALITY", value: "SUITING · CASHMERE · EVENING" },
              { label: "TIER", value: "MID · DORMEUIL / HOLLAND & SHERRY" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.1em", color: "#555", marginBottom: "4px" }}>{s.label}</div>
                <div style={{ fontFamily: F.display, fontSize: "14px", fontWeight: 600, letterSpacing: "0.06em", color: "#aaa" }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other Mills ── */}
      <section style={{ backgroundColor: "#fff", borderTop: "1px solid #e8e8e8", padding: "48px 0" }}>
        <div className="container">
          <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#bbb", display: "block", marginBottom: "20px" }}>OTHER MILL ANTHOLOGIES</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(220px, 100%), 1fr))", gap: "1px", backgroundColor: "#e8e8e8" }}>
            {[
              { name: "LORO PIANA", est: "1924", note: "30 COLLECTIONS", href: "/loro-piana-anthology", desc: "Quarona, Italy" },
              { name: "HOLLAND & SHERRY", est: "1836", note: "41 COLLECTIONS", href: "/holland-sherry-anthology", desc: "Huddersfield, England" },
              { name: "VBC", est: "1663", note: "17 COLLECTIONS", href: "/vbc-anthology", desc: "Biella, Italy" },
              { name: "SCABAL", est: "1938", note: "73 COLLECTIONS", href: "/scabal-anthology", desc: "Brussels, Belgium" },
            ].map((m) => (
              <a key={m.name} href={m.href} style={{ display: "block", backgroundColor: "#fff", padding: "20px 22px", textDecoration: "none", transition: "background 0.12s" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8f8f8")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}>
                <span style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.1em", color: "#bbb", display: "block", marginBottom: "4px" }}>EST. {m.est} · {m.note}</span>
                <span style={{ fontFamily: F.display, fontSize: "16px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#111", display: "block", marginBottom: "2px" }}>{m.name}</span>
                <span style={{ fontFamily: F.body, fontSize: "11px", color: "#888" }}>{m.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
