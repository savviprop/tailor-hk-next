"use client";
import { useSEO } from "@/hooks/useSEO";
/**
 * TAILOR.HK — HOMEPAGE
 * Design: Technical editorial — research-driven, timeless, accessible luxury
 * Audience: Entry-level to senior professionals in Hong Kong
 * Layout: Vitaei-inspired numbered sections, fabric data annotations, monospaced labels
 * Images: All sourced directly from Tailors.hk Squarespace CDN
 */

import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@/lib/wouter-shim";
import { ArrowRight, ChevronRight, ExternalLink } from "lucide-react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  BarChart, Bar, Cell,
} from "recharts";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
// // SEO handled by generateMetadata in page.tsx
import RrpTooltip from "@/components/RrpTooltip";
import PricingEstimator from "@/components/PricingEstimator";


const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body:    '"Barlow", Arial, sans-serif',
  mono:    '"JetBrains Mono", "Courier New", monospace',
};

// ── Verified CDN image URLs from Tailors.hk ──────────────────────────────────
const CDN = "https://images.squarespace-cdn.com/content/v1/68fb7bffc7f5256a863ed907";

const HERO_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/VeTDsTFJhpLJVXfo.png";

const SUITS = [
  {
    id: "S-001",
    name: "The Banker",
    fabric: "Super 120s Wool",
    weight: "280g/m²",
    origin: "Huddersfield, UK",
    tier: "BESPOKE",
    price: "HK$12,800",
    slug: "midnight-blue-suit",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/pVEPkPApyWtkArag.jpg",
  },
  {
    id: "S-002",
    name: "The Counsel",
    fabric: "Fresco Wool",
    weight: "260g/m²",
    origin: "Loro Piana, IT",
    tier: "BESPOKE",
    price: "HK$12,800",
    slug: "dark-grey-double-breasted",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/OEkbqFLSaAsYpDdV.jpg",
  },
  {
    id: "S-003",
    name: "The Diplomat",
    fabric: "Tropical Wool",
    weight: "200g/m²",
    origin: "Vitale Barberis, IT",
    tier: "MTM",
    price: "HK$12,800",
    slug: "charcoal-grey-suit",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/TNxmCQSagTsnBwFW.jpg",
  },
  {
    id: "S-004",
    name: "The Associate",
    fabric: "Super 100s Wool",
    weight: "300g/m²",
    origin: "Scabal, BE",
    tier: "MTM",
    price: "HK$12,800",
    slug: "navy-suit",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/iiwfHtsspNExjqdN.jpg",
  },
];

const GUIDES = [
  {
    index: "01",
    category: "HONG KONG TAILORING",
    title: "Hong Kong's Finest Tailoring: The Definitive Guide",
    readTime: "14 min",
    href: "/tailor-guides/hk-finest-tailoring",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/JocirFuxVRRDODTn.png",
  },
  {
    index: "02",
    category: "FABRICATION",
    title: "Bespoke, Made-to-Measure & Ready-to-Wear: A Complete Guide",
    readTime: "9 min",
    href: "/tailor-guides/bespoke-made-to-measure-and-ready-to-wear-suit-guide",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/UxjspNPkZkmSMCkU.jpg",
  },
  {
    index: "03",
    category: "METHODOLOGY",
    title: "Making the Cut: The Methodology of Fine Tailoring",
    readTime: "14 min",
    href: "/tailor-guides/making-the-cut",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/JocirFuxVRRDODTn.png",
  },
];

const LOGOS = [
  "HSBC", "Goldman Sachs", "McKinsey & Co", "Deloitte", "Clifford Chance",
  "Morgan Stanley", "PwC", "Freshfields", "UBS", "Linklaters",
  "HSBC", "Goldman Sachs", "McKinsey & Co", "Deloitte", "Clifford Chance",
  "Morgan Stanley", "PwC", "Freshfields", "UBS", "Linklaters",
];

const METHODOLOGY_STEPS = [
  { num: "01", label: "CONSULTATION", desc: "A 45-minute discovery session to understand your wardrobe needs, lifestyle, and professional context." },
  { num: "02", label: "FABRIC SELECTION", desc: "Access to over 4,000 cloth options from the world's finest mills — Vitale Barberis, Holland & Sherry, Dormeuil, and others." },
  { num: "03", label: "PATTERN CUTTING", desc: "A bespoke pattern drafted to your precise measurements. Every seam, dart, and canvas built for your body." },
  { num: "04", label: "FITTINGS", desc: "Two to three fittings ensure the garment evolves correctly. No shortcuts. No compromises." },
];

// ── Technical data for charts ────────────────────────────────────────────────
const CONSTRUCTION_RADAR = [
  { axis: "FIT PRECISION",    bespoke: 98, mtm: 78, rtw: 45 },
  { axis: "FABRIC ACCESS",   bespoke: 95, mtm: 72, rtw: 55 },
  { axis: "CONSTRUCTION",    bespoke: 97, mtm: 68, rtw: 40 },
  { axis: "LONGEVITY",       bespoke: 94, mtm: 75, rtw: 50 },
  { axis: "VALUE INDEX",     bespoke: 82, mtm: 85, rtw: 70 },
  { axis: "PERSONALISATION", bespoke: 100, mtm: 80, rtw: 20 },
];
const FABRIC_WEIGHT_DATA = [
  { label: "150", tropical: 98, fourSeason: 30, winter: 5  },
  { label: "180", tropical: 90, fourSeason: 55, winter: 15 },
  { label: "220", tropical: 72, fourSeason: 82, winter: 35 },
  { label: "260", tropical: 48, fourSeason: 90, winter: 60 },
  { label: "300", tropical: 22, fourSeason: 78, winter: 85 },
  { label: "340", tropical: 8,  fourSeason: 55, winter: 96 },
  { label: "380", tropical: 3,  fourSeason: 30, winter: 99 },
];
// ── Tailoring origins world map data ────────────────────────────────────────────────
const TAILORING_ORIGINS = [
  {
    id: "london",
    city: "London",
    region: "Savile Row",
    coordinates: [-0.1276, 51.5074] as [number, number],
    anchor: "right" as const,
    climate: "Cool, temperate",
    silhouette: "Structured, suppressed waist, padded chest",
    character: "Formal authority. The English suit is built for permanence — full canvas, hand-padded lapels, and a chest that holds its shape for decades. Rooted in military precision and aristocratic restraint.",
    known: "Anderson & Sheppard, Huntsman, Gieves & Hawkes, Norton & Sons",
    palette: "Navy, charcoal, chalk stripe, houndstooth",
  },
  {
    id: "naples",
    city: "Naples",
    region: "Neapolitan",
    coordinates: [14.2681, 40.8518] as [number, number],
    anchor: "right" as const,
    climate: "Mediterranean, warm",
    silhouette: "Soft, unstructured, spalla camicia shirt sleeve",
    character: "The antithesis of English rigidity. Neapolitan tailoring drapes naturally against the body, using minimal padding and a shirt-sleeve shoulder that moves with ease. Designed for warmth, gesture, and life lived outdoors.",
    known: "Kiton, Cesare Attolini, Rubinacci, Isaia",
    palette: "Tan, cream, light grey, soft blue",
  },
  {
    id: "milan",
    city: "Milan",
    region: "Italian",
    coordinates: [9.1900, 45.4654] as [number, number],
    anchor: "right" as const,
    climate: "Continental, four seasons",
    silhouette: "Clean lines, slight structure, longer jacket",
    character: "Where craft meets commerce. Milanese tailoring balances the softness of Naples with commercial precision — a longer, leaner silhouette that reads as modern luxury. The language of boardrooms and fashion weeks.",
    known: "Brioni, Zegna, Canali, Giorgio Armani",
    palette: "Charcoal, mid-grey, camel, deep navy",
  },
  {
    id: "paris",
    city: "Paris",
    region: "French",
    coordinates: [2.3522, 48.8566] as [number, number],
    anchor: "left" as const,
    climate: "Temperate, four seasons",
    silhouette: "Slim, elongated, intellectual",
    character: "Tailoring as philosophy. The French tradition prizes proportion and restraint above all — a narrower lapel, a longer torso, and a studied nonchalance that makes dressing look effortless. Worn by artists and intellectuals alike.",
    known: "Cifonelli, Camps de Luca, Arnys",
    palette: "Black, ivory, deep burgundy, slate",
  },
  {
    id: "tokyo",
    city: "Tokyo",
    region: "Japanese",
    coordinates: [139.6917, 35.6895] as [number, number],
    anchor: "right" as const,
    climate: "Humid subtropical, four seasons",
    silhouette: "Precise, minimal, obsessively detailed",
    character: "Craftsmanship elevated to ritual. Japanese tailoring applies the same devotion to cloth and construction as traditional arts — every stitch considered, every seam pressed with intention. A quiet, unshowy perfection.",
    known: "Musubi, Ring Jacket, Liverano (Tokyo outpost)",
    palette: "Indigo, charcoal, natural wool, deep brown",
  },
  {
    id: "hongkong",
    city: "Hong Kong",
    region: "Hong Kong",
    coordinates: [114.1694, 22.3193] as [number, number],
    anchor: "right" as const,
    climate: "Subtropical, humid summers",
    silhouette: "Adaptable — East meets West, climate-conscious",
    character: "The meeting point of traditions. Hong Kong tailoring absorbed English structure, Italian softness, and local pragmatism — producing suits that perform in humidity, travel well, and read as international. Speed and value are part of the tradition.",
    known: "Magnus & Novus, W.W. Chan, Dorsia, A Man Hing Cheong",
    palette: "Navy, mid-grey, tropical tan, white linen",
  },
  {
    id: "newyork",
    city: "New York",
    region: "American",
    coordinates: [-74.0060, 40.7128] as [number, number],
    anchor: "left" as const,
    climate: "Humid continental, four seasons",
    silhouette: "Relaxed, broad shoulder, natural drape",
    character: "Power dressed for democracy. The American tradition — rooted in Brooks Brothers and the Ivy League — favours comfort and ease over European precision. A natural-shoulder suit that says confidence without ceremony.",
    known: "Ralph Lauren Purple Label, Tom Ford, Hickey Freeman",
    palette: "Sack grey, khaki, repp stripe, madras",
  },
];

const TEXTILE_ORIGINS = [
  {
    id: "biella",
    city: "Biella",
    region: "Italian Mill District",
    coordinates: [8.0580, 45.5654] as [number, number],
    anchor: "right" as const,
    climate: "Alpine, cool",
    silhouette: "—",
    character: "The world capital of fine wool. The Biella valley in Piedmont is home to Loro Piana, Vitale Barberis, and Zegna Baruffa — producing Super 100s to Super 250s merino, cashmere blends, and tropical wools that supply the finest tailors globally.",
    known: "Loro Piana, Vitale Barberis, Zegna Baruffa, Reda",
    palette: "Natural merino, cashmere cream, slate",
  },
  {
    id: "huddersfield",
    city: "Huddersfield",
    region: "Yorkshire Mill District",
    coordinates: [-1.7799, 53.6458] as [number, number],
    anchor: "right" as const,
    climate: "Cool, damp",
    silhouette: "—",
    character: "The historic heartland of British suiting cloth. Yorkshire's soft water and long wool-working tradition produced the world's finest fresco, flannel, and tweed. Holland & Sherry, Scabal, and Dormeuil all source from this region.",
    known: "Holland & Sherry, Fox Brothers, Abraham Moon",
    palette: "Charcoal flannel, tweed, chalk stripe",
  },
  {
    id: "kashmir",
    city: "Kashmir",
    region: "Cashmere Origin",
    coordinates: [74.7973, 34.0837] as [number, number],
    anchor: "right" as const,
    climate: "High altitude, extreme cold",
    silhouette: "—",
    character: "The original source of pashmina and cashmere. Changthangi goats in the high Himalayan plateau produce the finest undercoat fibres in the world — 14–16 microns. The raw material for the most luxurious suiting and overcoating fabrics.",
    known: "Loro Piana (Pecora Nera), Johnstons of Elgin",
    palette: "Natural camel, ivory, warm grey",
  },
  {
    id: "mongolia",
    city: "Mongolia",
    region: "Cashmere Steppe",
    coordinates: [103.8467, 47.8864] as [number, number],
    anchor: "right" as const,
    climate: "Continental, extreme cold winters",
    silhouette: "—",
    character: "Mongolia produces over 40% of the world's raw cashmere. The harsh continental climate forces Mongolian goats to grow exceptionally fine, dense undercoats. A critical raw material source for Italian and Scottish mills.",
    known: "Gobi, Mongol Cashmere, Loro Piana sourcing",
    palette: "Raw cashmere, undyed natural tones",
  },
  {
    id: "australia",
    city: "New South Wales",
    region: "Merino Wool Origin",
    coordinates: [146.9211, -31.2532] as [number, number],
    anchor: "right" as const,
    climate: "Temperate, semi-arid",
    silhouette: "—",
    character: "Australia produces over 90% of the world's fine merino wool — the raw fibre behind Super 100s to Super 200s suiting cloth. Merino from New South Wales and Victoria is the primary input for Biella's finest mills.",
    known: "Australian Wool Innovation, Loro Piana Tasmanian",
    palette: "Natural white, ecru, undyed fleece",
  },
  {
    id: "como",
    city: "Como",
    region: "Italian Silk District",
    coordinates: [9.0832, 45.8080] as [number, number],
    anchor: "right" as const,
    climate: "Temperate, lakeside",
    silhouette: "—",
    character: "Lake Como is the global centre of luxury silk weaving. Italian silk from Como supplies the world's finest shirtmakers and tie makers — from Hermès to Charvet. The region produces silk twill, foulard, and jacquard of unmatched quality.",
    known: "Canepa, Ratti, Mantero, Clerici Tessuto",
    palette: "Silk navy, foulard, rich jewel tones",
  },
  {
    id: "ireland",
    city: "Ireland",
    region: "Irish Linen",
    coordinates: [-7.6921, 53.1424] as [number, number],
    anchor: "left" as const,
    climate: "Cool, damp",
    silhouette: "—",
    character: "Ireland's damp climate is ideal for retting flax — the process that produces linen fibre. Irish linen has been the benchmark for suiting and shirting linen for centuries, prized for its natural lustre, breathability, and strength.",
    known: "Thomas Ferguson, Baird McNutt",
    palette: "Natural ecru, white, pale grey",
  },
];
const FABRIC_DATA = [
  { spec: "YEARS IN OPERATION", value: "25+", note: "TRUSTED PARTNER & SUPPLIER" },
  { spec: "HAND CRAFTED GARMENTS PRODUCED", value: "50,000+", note: "HANDCRAFTED TO ORDER" },
  { spec: "CORPORATE CLIENTS", value: "200+", note: "GLOBAL EXECUTIVES & FIRMS" },
  { spec: "DIRECT RATE FROM", value: "HK$12,800", note: "BESPOKE SUIT, FULL CANVAS" },
  { spec: "LEAD TIME", value: "4–6 weeks", note: "FROM COMMISSION TO DELIVERY" },
];

// ── TailoringWorldMap component ────────────────────────────────────────────────
// GEO_URL — Natural Earth 110m countries TopoJSON from CDN
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type OriginEntry = typeof TAILORING_ORIGINS[number];
type MapMode = "tailoring" | "textile";

function TailoringWorldMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [locked, setLocked] = useState<string | null>("hongkong");
  const [mode, setMode] = useState<MapMode>("tailoring");
  const [touchCount, setTouchCount] = useState(0);
  const isMobileMap = typeof window !== "undefined" && window.innerWidth < 768;
  const origins = mode === "tailoring" ? TAILORING_ORIGINS : TEXTILE_ORIGINS;
  const activeId = locked ?? hovered;
  const activeOrigin: OriginEntry | undefined = origins.find((o) => o.id === activeId);

  return (
    <div style={{ border: "1px solid #e0e0e0", backgroundColor: "#f4f4f2", overflow: "hidden" }}>
      {/* Tab switcher */}
      <div style={{ display: "flex", borderBottom: "1px solid #e0e0e0", backgroundColor: "#f8f8f6" }}>
        {(["tailoring", "textile"] as MapMode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setHovered(null); setLocked(null); }}
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "8px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "8px 16px",
              border: "none",
              borderBottom: mode === m ? "2px solid #111" : "2px solid transparent",
              backgroundColor: "transparent",
              color: mode === m ? "#111" : "#999",
              cursor: "pointer",
              fontWeight: mode === m ? 700 : 400,
              transition: "all 0.15s",
            }}
          >
            {m === "tailoring" ? "TAILORING MECCAS" : "TEXTILE ORIGINS"}
          </button>
        ))}
      </div>

      {/* Map */}
      <div
        style={{ position: "relative", touchAction: "pan-y" }}
        onMouseLeave={() => setHovered(null)}
        onClick={(e) => { if ((e.target as SVGElement).tagName === 'svg' || (e.target as SVGElement).tagName === 'path') setLocked(null); }}
      >
        <ComposableMap
          projection="geoNaturalEarth1"
          projectionConfig={{ scale: 175, center: [15, 15] }}
          style={{ width: "100%", height: "clamp(260px, 50vw, 420px)", display: "block", touchAction: "pan-y" }}
        >
          <ZoomableGroup zoom={1} minZoom={1} maxZoom={isMobileMap ? 1 : 4} disablePanning={isMobileMap}>
            <Geographies geography={GEO_URL}>
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: { fill: "#d8d8d4", stroke: "#b8b8b4", strokeWidth: 0.4, outline: "none" },
                      hover:   { fill: "#c8c8c4", stroke: "#b8b8b4", strokeWidth: 0.4, outline: "none" },
                      pressed: { fill: "#c8c8c4", stroke: "#b8b8b4", strokeWidth: 0.4, outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>

            {origins.map((origin) => {
              const active = locked === origin.id || (hovered === origin.id && locked === null);
              return (
                <Marker
                  key={origin.id}
                  coordinates={origin.coordinates}
                  onMouseEnter={() => setHovered(origin.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={(e: React.MouseEvent) => { e.stopPropagation(); setLocked(locked === origin.id ? null : origin.id); }}
                >
                  {/* Pulse ring */}
                  {/* Large invisible tap target for mobile */}
                  <circle r={18} fill="transparent" style={{ cursor: "pointer" }} />
                  <circle
                    r={active ? 9 : 7}
                    fill="none"
                    stroke={active ? "#111" : "#555"}
                    strokeWidth={active ? 1 : 0.6}
                    opacity={active ? 0.5 : 0.3}
                    style={{ transition: "all 0.2s" }}
                  />
                  {/* Dot */}
                  <circle
                    r={active ? 5 : 4}
                    fill={active ? "#111" : "#444"}
                    style={{ transition: "all 0.2s", cursor: "pointer" }}
                  />
                  {/* Label */}
                  <text
                    textAnchor={origin.anchor === "left" ? "end" : "start"}
                    x={origin.anchor === "left" ? -8 : 8}
                    y={3}
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: active ? "7px" : "6px",
                      fill: active ? "#111" : "#666",
                      fontWeight: active ? 700 : 400,
                      letterSpacing: "0.06em",
                      pointerEvents: "none",
                      userSelect: "none",
                      transition: "all 0.15s",
                    }}
                  >
                    {origin.city.toUpperCase()}
                  </text>
                </Marker>
              );
            })}
          </ZoomableGroup>
        </ComposableMap>
        <div style={{ position: "absolute", bottom: "6px", right: "8px", fontFamily: '"JetBrains Mono", monospace', fontSize: "7px", color: "#bbb", letterSpacing: "0.06em" }}>
          NATURAL EARTH PROJECTION
        </div>
      </div>

      {/* Info panel */}
      <div style={{
        borderTop: "1px solid #ddd",
        backgroundColor: activeOrigin ? "#111" : "#f4f4f2",
        padding: "14px 16px",
        minHeight: "110px",
        transition: "background-color 0.2s",
      }}>
        {activeOrigin ? (
          <>
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "8px", flexWrap: "wrap" }}>
              <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: "16px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff" }}>
                {activeOrigin.city}
              </span>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: "8px", color: "#555", letterSpacing: "0.08em" }}>
                {activeOrigin.region.toUpperCase()}
              </span>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: "8px", color: "#444", marginLeft: "auto" }}>
                {activeOrigin.climate}
              </span>
            </div>
            <p style={{ fontFamily: '"Barlow", sans-serif', fontSize: "12px", lineHeight: 1.65, color: "#888", margin: "0 0 8px" }}>
              {activeOrigin.character}
            </p>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: "7px", color: "#444", letterSpacing: "0.1em", marginBottom: "2px" }}>KNOWN FOR</div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: "9px", color: "#777" }}>{activeOrigin.known}</div>
              </div>
              <div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: "7px", color: "#444", letterSpacing: "0.1em", marginBottom: "2px" }}>PALETTE</div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: "9px", color: "#777" }}>{activeOrigin.palette}</div>
              </div>
            </div>
          </>
        ) : (
          <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: "9px", color: "#bbb", margin: 0, letterSpacing: "0.08em", paddingTop: "8px" }}>
            {mode === "tailoring" ? "CLICK A CITY TO EXPLORE ITS TAILORING TRADITION" : "CLICK A REGION TO EXPLORE ITS TEXTILE HERITAGE"}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Fade-in hook ─────────────────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeSection({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useFadeIn();
  return <div ref={ref} className="fade-in" style={style}>{children}</div>;
}

// ── Image with fallback ───────────────────────────────────────────────────────
function Img({ src, alt, style }: { src: string; alt: string; style?: React.CSSProperties }) {
  const [err, setErr] = useState(false);
  return (
    <img
      src={err ? `https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80` : src}
      alt={alt}
      style={style}
      onError={() => setErr(true)}
      loading="lazy"
    />
  );
}

export default function Home() {
  useSEO({
    title: "Tailors.hk — Bespoke Tailored Suits, Hong Kong",
    description: "Handcrafted bespoke suits from HK$12,800. Atelier direct access to the world's finest tailoring houses. Trusted by professionals for over 25 years.",
    canonical: "https://tailors.hk/",
    keywords: "bespoke tailor Hong Kong, handcrafted tailored suits Hong Kong, atelier direct rates HK, bespoke suit HK$12800, made to measure suit Hong Kong",
    ogType: "website",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Tailors.hk",
        "description": "A world-leading atelier of handcrafted tailored suits. Atelier direct rates from HK$12,800.",
        "url": "https://tailors.hk",
        "logo": "https://tailors.hk/logo.png",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Hong Kong",
          "addressCountry": "HK"
        },
        "areaServed": ["Hong Kong", "Global"],
        "priceRange": "HK$$$",
        "sameAs": ["https://www.instagram.com/tailors.hk"]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Tailors.hk",
        "url": "https://tailors.hk",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://tailors.hk/tailor-guides?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Tailors.hk",
        "url": "https://tailors.hk",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "214",
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": [
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "R.K., Managing Director, Investment Banking" },
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
            "reviewBody": "The register is the most rigorous editorial resource on tailoring I have encountered. The comparative data on construction methods alone saved me considerable time in evaluating houses before my first commission."
          },
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "C.L., Partner, Magic Circle Law Firm" },
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
            "reviewBody": "I have been commissioning bespoke suits in Hong Kong for twelve years. The level of editorial rigour here is rare. The assessments are accurate and the comparative data is the most useful I have found anywhere."
          },
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "T.W., Chief Financial Officer, Listed Company" },
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
            "reviewBody": "Used the tailor finder to identify a house for a full corporate wardrobe programme. The process was efficient, the guidance precise, and the outcome — eight suits across two houses — has been uniformly excellent."
          }
        ]
      }
    ],
  });

  const [, navigate] = useLocation();
  const [tailorQuery, setTailorQuery] = useState("");
  const [tailorSuggestions, setTailorSuggestions] = useState<Array<{id:string;name:string;city:string;tradition:string}>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Tailor search data — compact subset of TAILORS from WorldTailors
  const TAILOR_INDEX = [
    { id: "anderson-sheppard", name: "Anderson & Sheppard", city: "London", tradition: "Savile Row" },
    { id: "huntsman", name: "Huntsman", city: "London", tradition: "Savile Row" },
    { id: "norton-sons", name: "Norton & Sons", city: "London", tradition: "Savile Row" },
    { id: "henry-poole", name: "Henry Poole & Co", city: "London", tradition: "Savile Row" },
    { id: "kiton", name: "Kiton", city: "Naples", tradition: "Neapolitan" },
    { id: "cesare-attolini", name: "Cesare Attolini", city: "Naples", tradition: "Neapolitan" },
    { id: "isaia", name: "Isaia", city: "Naples", tradition: "Neapolitan" },
    { id: "brioni", name: "Brioni", city: "Rome", tradition: "Italian Bespoke" },
    { id: "zegna", name: "Ermenegildo Zegna", city: "Milan", tradition: "Italian RTW/Bespoke" },
    { id: "cifonelli", name: "Cifonelli", city: "Paris", tradition: "Parisian" },
    { id: "ralph-lauren-purple", name: "Ralph Lauren Purple Label", city: "New York", tradition: "American" },
    { id: "tom-ford", name: "Tom Ford", city: "New York", tradition: "American" },
    { id: "ww-chan", name: "W.W. Chan & Sons", city: "Hong Kong", tradition: "Hong Kong" },
    { id: "magnus-novus", name: "Magnus & Novus", city: "Hong Kong", tradition: "British" },
    { id: "boglioli", name: "Boglioli", city: "Milan", tradition: "Italian RTW" },
      { id: "berluti", name: "Berluti", city: "Paris", tradition: "Parisian" },
    { id: "brunello-cucinelli", name: "Brunello Cucinelli", city: "Solomeo", tradition: "Italian RTW/Bespoke" },
    { id: "ring-jacket", name: "Ring Jacket", city: "Osaka", tradition: "Japanese" },
    { id: "rubinacci", name: "Rubinacci", city: "Naples", tradition: "Neapolitan" },
    { id: "borrelli", name: "Luigi Borrelli", city: "Naples", tradition: "Neapolitan" },
    { id: "charvet", name: "Charvet", city: "Paris", tradition: "Parisian" },
    { id: "g-inglese", name: "G. Inglese", city: "Naples", tradition: "Neapolitan" },
    { id: "liverano", name: "Liverano & Liverano", city: "Florence", tradition: "Italian Bespoke" },
    { id: "chittleborough-morgan", name: "Chittleborough & Morgan", city: "London", tradition: "Savile Row" },
    { id: "richard-james", name: "Richard James", city: "London", tradition: "Savile Row" },
    { id: "ozwald-boateng", name: "Ozwald Boateng", city: "London", tradition: "Savile Row" },
    { id: "edward-sexton", name: "Edward Sexton", city: "London", tradition: "Savile Row" },
    { id: "thom-sweeney", name: "Thom Sweeney", city: "London", tradition: "Savile Row" },
    { id: "belvest", name: "Belvest", city: "Vicenza", tradition: "Italian" },
    { id: "a-caraceni", name: "A. Caraceni", city: "Milan", tradition: "Italian" },
    { id: "b-and-tailor", name: "B&Tailor", city: "Seoul", tradition: "Korean" },
    { id: "solito", name: "Solito", city: "Naples", tradition: "Neapolitan" },
    { id: "orazio-luciano", name: "Orazio Luciano", city: "Naples", tradition: "Neapolitan" },
    { id: "sartoria-dalcuore", name: "Sartoria Dalcuore", city: "Naples", tradition: "Neapolitan" },
    { id: "dege-and-skinner", name: "Dege & Skinner", city: "London", tradition: "Savile Row" },
    { id: "welsh-and-jefferies", name: "Welsh & Jefferies", city: "London", tradition: "Savile Row" },
    { id: "turnbull-and-asser", name: "Turnbull & Asser", city: "London", tradition: "British" },
    { id: "sartoria-vestrucci", name: "Sartoria Vestrucci", city: "Florence", tradition: "Florentine" },
    { id: "ferdinando-caraceni", name: "Ferdinando Caraceni", city: "Milan", tradition: "Italian" },
    { id: "arnys", name: "Arnys", city: "Paris", tradition: "Parisian" },
    { id: "camps-de-luca", name: "Camps de Luca", city: "Paris", tradition: "Parisian" },
    { id: "ascot-chang", name: "Ascot Chang", city: "Hong Kong", tradition: "Hong Kong" },
    { id: "dorsia", name: "Dorsia", city: "Hong Kong", tradition: "Hong Kong" },
    { id: "sartoria-sciarra", name: "Sartoria Sciarra", city: "Tokyo", tradition: "Japanese" },
    { id: "caliendo", name: "Sartoria Caliendo", city: "Naples", tradition: "Neapolitan" },
    { id: "luca-avitabile", name: "Luca Avitabile", city: "Naples", tradition: "Neapolitan" },
    { id: "saman-amel", name: "Atelier Saman Amel", city: "Stockholm", tradition: "Scandinavian" },
  ];

  const handleTailorSearch = (q: string) => {
    setTailorQuery(q);
    if (q.trim().length < 1) {
      setTailorSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const lower = q.toLowerCase();
    const matches = TAILOR_INDEX.filter(
      (t) => t.name.toLowerCase().includes(lower) || t.city.toLowerCase().includes(lower) || t.tradition.toLowerCase().includes(lower)
    ).slice(0, 6);
    setTailorSuggestions(matches);
    setShowSuggestions(true);
  };

  const handleTailorSelect = (tailor: { id: string; name: string }) => {
    setTailorQuery(tailor.name);
    setShowSuggestions(false);
    navigate(`/worlds-best-tailoring?q=${encodeURIComponent(tailor.name)}`);
  };

  const handleTailorSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tailorQuery.trim()) {
      setShowSuggestions(false);
      navigate(`/worlds-best-tailoring?q=${encodeURIComponent(tailorQuery.trim())}`);
    }
  };

  // Close suggestions on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn, { passive: true });
    return () => window.removeEventListener("resize", fn);
  }, []);

  return (
    <>
    <Navigation />
    <main style={{ backgroundColor: "#fff", overflowX: "hidden" }}>

      {/* ═══════════════════════════════════════════════════════════════
          § 01 — HERO
          ═══════════════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", backgroundColor: "#111", overflow: "hidden", paddingBottom: "0" }}>
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src={HERO_IMG}
            alt="Bespoke tailoring Hong Kong — hand stitching a bespoke suit"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.82 }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.15) 100%)" }} />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1, padding: "80px 20px" }}>
          {/* Section index */}
          <div style={{ marginBottom: "32px" }}>
            <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#666", display: "block", marginBottom: "6px" }}>
              § 01 · TRUSTED BY THE WORLD'S FINEST TAILORING HOUSES
            </span>
            <div style={{ width: "32px", height: "1px", backgroundColor: "#555" }} />
          </div>

          {/* Data tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "28px" }}>
            {["BESPOKE", "MADE-TO-MEASURE", "CORPORATE", "ATELIER DIRECT"].map((tag) => (
              tag === "ATELIER DIRECT" ? (
                <Link key={tag} href="/atelier-direct" style={{
                  fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.08em",
                  color: "#c9a96e", border: "1px solid #c9a96e", padding: "2px 8px",
                  backgroundColor: "rgba(201,169,110,0.08)",
                  textDecoration: "none", cursor: "pointer",
                }}>
                  {tag}
                </Link>
              ) : (
                <span key={tag} style={{
                  fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.08em",
                  color: "#888", border: "1px solid #333", padding: "2px 8px",
                  backgroundColor: "rgba(255,255,255,0.04)",
                }}>
                  {tag}
                </span>
              )
            ))}
          </div>

          {/* Hero headline */}
          <h1 style={{
            fontFamily: F.display,
            fontSize: isMobile ? "36px" : "clamp(40px, 6vw, 72px)",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#fff",
            lineHeight: 1.05,
            maxWidth: "700px",
            marginBottom: "24px",
          }}>
            Access World Craft<br />
            Atelier Direct         </h1>

          <p style={{
            fontFamily: F.body,
            fontSize: isMobile ? "14px" : "16px",
            lineHeight: 1.75,
            color: "#aaa",
            maxWidth: "480px",
            marginBottom: "36px",
          }}>
            Tailors.hk is a world-leading platform for handcrafted suits and textiles to some of the finest tailoring houses and international ready-to-wear labels. For the first time, fine craft is made available directly to the private client — through Atelier Direct.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "56px" }}>
            <Link href="/tailor-finder-quiz">
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "12px 28px", backgroundColor: "#fff", color: "#111",
                fontFamily: F.display, fontSize: "11px", fontWeight: 600,
                letterSpacing: "0.18em", textTransform: "uppercase",
                transition: "background 0.18s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.backgroundColor = "#e8e8e8"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.backgroundColor = "#fff"; }}
              >
                Start Your Brief <ArrowRight size={12} />
              </span>
            </Link>
            <Link href="/tailor-guides">
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "12px 28px", backgroundColor: "transparent", color: "#fff",
                border: "1px solid rgba(255,255,255,0.35)",
                fontFamily: F.display, fontSize: "11px", fontWeight: 600,
                letterSpacing: "0.18em", textTransform: "uppercase",
                transition: "background 0.18s, border-color 0.18s",
              }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLSpanElement; el.style.backgroundColor = "rgba(255,255,255,0.08)"; el.style.borderColor = "rgba(255,255,255,0.6)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLSpanElement; el.style.backgroundColor = "transparent"; el.style.borderColor = "rgba(255,255,255,0.35)"; }}
              >
                Read the Guides
              </span>
            </Link>
          </div>

          {/* Tailor search bar removed — search now in nav icon */}
          <div ref={searchRef} style={{ display: "none" }}>
            <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#666", display: "block", marginBottom: "8px", textTransform: "uppercase" }}>Search 49 Houses Worldwide</span>
            <form onSubmit={handleTailorSearchSubmit} style={{ display: "flex", gap: "0" }}>
              <input
                type="text"
                value={tailorQuery}
                onChange={(e) => handleTailorSearch(e.target.value)}
                onFocus={() => tailorQuery.trim() && setShowSuggestions(true)}
                placeholder="House name, city, or tradition..."
                style={{
                  flex: 1,
                  fontFamily: F.mono,
                  fontSize: "11px",
                  letterSpacing: "0.04em",
                  padding: "10px 14px",
                  backgroundColor: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRight: "none",
                  color: "#fff",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "10px 16px",
                  backgroundColor: "#fff",
                  color: "#111",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: F.mono,
                  fontSize: "9px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                Search
              </button>
            </form>
            {showSuggestions && tailorSuggestions.length > 0 && (
              <div style={{
                position: "absolute", top: "100%", left: 0, right: 0,
                backgroundColor: "#1a1a1a", border: "1px solid #333",
                zIndex: 100, marginTop: "2px",
              }}>
                {tailorSuggestions.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleTailorSelect(t)}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      width: "100%", padding: "10px 14px",
                      backgroundColor: "transparent", border: "none",
                      borderBottom: "1px solid #2a2a2a", cursor: "pointer",
                      textAlign: "left",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#222"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}
                  >
                    <span style={{ fontFamily: F.body, fontSize: "12px", color: "#fff", letterSpacing: "0.02em" }}>{t.name}</span>
                    <span style={{ fontFamily: F.mono, fontSize: "8px", color: "#666", letterSpacing: "0.08em", textTransform: "uppercase" }}>{t.city} · {t.tradition}</span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => { setShowSuggestions(false); navigate(`/worlds-best-tailoring?q=${encodeURIComponent(tailorQuery.trim())}`); }}
                  style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    width: "100%", padding: "9px 14px",
                    backgroundColor: "transparent", border: "none",
                    cursor: "pointer", textAlign: "left",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#222"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}
                >
                  <span style={{ fontFamily: F.mono, fontSize: "8px", color: "#888", letterSpacing: "0.1em", textTransform: "uppercase" }}>View all results for "{tailorQuery}" →</span>
                </button>
              </div>
            )}
          </div>

          {/* Fabric data strip */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(5, auto)",
            gap: isMobile ? "16px 12px" : "0",
            borderTop: "1px solid #333", paddingTop: "20px",
          }}>
            {FABRIC_DATA.map((item, i) => (
              <div key={item.spec} style={{
                paddingRight: isMobile ? "0" : "28px",
                paddingLeft: isMobile ? "0" : (i > 0 ? "28px" : "0"),
                borderLeft: isMobile ? "none" : (i > 0 ? "1px solid #333" : "none"),
                gridColumn: isMobile && i === FABRIC_DATA.length - 1 && FABRIC_DATA.length % 2 !== 0 ? "1 / -1" : undefined,
              }}>
                <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: "#555", marginBottom: "2px" }}>
                  {item.spec}
                </div>
                <div style={{ fontFamily: F.display, fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em", color: "#ccc", display: "flex", alignItems: "center" }}>
                  {item.value}{item.spec === "DIRECT RATE FROM" && <RrpTooltip theme="dark" />}
                </div>
                <div style={{ fontFamily: F.mono, fontSize: "8px", color: "#555", marginTop: "1px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {item.note}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* SCROLL label — gold, bottom of hero */}
        <div style={{
          position: "absolute",
          bottom: isMobile ? "20px" : "28px",
          right: isMobile ? "20px" : "32px",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}>
          <span style={{
            fontFamily: F.mono,
            fontSize: "8px",
            letterSpacing: "0.2em",
            color: "#c9a84c",
            textTransform: "uppercase",
          }}>Scroll</span>
          <div style={{ width: "20px", height: "1px", backgroundColor: "#c9a84c", opacity: 0.6 }} />
        </div>
      </section>



      {/* ═══════════════════════════════════════════════════════════════
          § 02 — TRUSTED BY
          ═══════════════════════════════════════════════════════════════ */}
      <section style={{ borderBottom: "1px solid #e2e2e2", overflow: "hidden", padding: "18px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0", overflow: "hidden" }}>
          <div style={{
            flexShrink: 0, padding: "0 28px",
            fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#bbb",
            borderRight: "1px solid #e2e2e2", whiteSpace: "nowrap",
          }}>
            TRUSTED BY
          </div>
          <div style={{ overflow: "hidden", flex: 1 }}>
            <div className="marquee-track">
              {LOGOS.map((logo, i) => (
                <span key={i} style={{
                  display: "inline-block", padding: "0 36px",
                  fontFamily: F.display, fontSize: "11px", fontWeight: 500,
                  letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb",
                  borderRight: "1px solid #e8e8e8", whiteSpace: "nowrap",
                }}>
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          § 03 — SERVICE TIERS
          ═══════════════════════════════════════════════════════════════ */}
      <FadeSection>
        <section style={{ padding: isMobile ? "48px 0" : "64px 0", borderBottom: "1px solid #e2e2e2", backgroundColor: "#fff" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: isMobile ? "32px" : "44px" }}>
              <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "10px" }}>§ 03 · THE REGISTER</span>
              <h2 style={{ fontFamily: F.display, fontSize: isMobile ? "22px" : "28px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#111", margin: 0 }}>
                Three Tiers. One Standard.
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: isMobile ? "16px" : "2px" }}>
              {[
                { tier: "Bespoke", code: "01", from: "HK$12,800", desc: "A pattern drafted entirely to your measurements. Full canvas construction, three to five fittings, and a house silhouette built once and refined over a lifetime. Ideal for clients with non-standard proportions.", tooltipNote: "Complimentary bespoke upgrade — at no additional charge to MTM.", cta: "Commission a Suit", href: "/tailored-menswear", accent: "#111", bg: "#111", textCol: "#fff" },
                { tier: "Made-to-Measure", code: "02", from: "HK$12,800", desc: "A proven block pattern adjusted to your proportions. The same handcrafted construction — full canvas, two fittings — with a faster turnaround for clients who know their fit.", tooltipNote: undefined, cta: "Begin Made-to-Measure", href: "/tailored-menswear", accent: "#111", bg: "#f8f8f8", textCol: "#111" },
                { tier: "Ready-to-Wear", code: "03", from: "HK$30,000", desc: "The world's finest RTW houses — Kiton, Brioni, Brunello Cucinelli, Zegna — curated and available for immediate acquisition. Off the rack at retail.", tooltipNote: undefined, cta: "Browse the Collection", href: "/ready-to-wear", accent: "#111", bg: "#fff", textCol: "#111" },
              ].map((item) => (
                <div key={item.tier} style={{ backgroundColor: item.bg, padding: isMobile ? "28px 24px" : "40px 36px", border: "1px solid #e2e2e2", display: "flex", flexDirection: "column", gap: "0" }}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "20px" }}>
                    <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: item.textCol === "#fff" ? "rgba(255,255,255,0.45)" : "#bbb", textTransform: "uppercase" }}>{item.code}</span>
                    <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: item.textCol === "#fff" ? "rgba(255,255,255,0.55)" : "#888", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "2px" }}>From {item.from}{item.from === "HK$12,800" && <RrpTooltip theme={item.textCol === "#fff" ? "dark" : "light"} footnote={item.tooltipNote} />}</span>
                  </div>
                  <h3 style={{ fontFamily: F.display, fontSize: isMobile ? "20px" : "22px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: item.textCol, marginBottom: "14px", lineHeight: 1.1 }}>{item.tier}</h3>
                  <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.75, color: item.textCol === "#fff" ? "rgba(255,255,255,0.7)" : "#777", flex: 1, marginBottom: "28px" }}>{item.desc}</p>
                  <Link href={item.href}>
                    <span style={{
                      display: "inline-block", padding: "9px 18px",
                      border: `1px solid ${item.textCol === "#fff" ? "rgba(255,255,255,0.4)" : "#111"}`,
                      fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase",
                      color: item.textCol, backgroundColor: "transparent",
                      cursor: "pointer", transition: "background 0.18s, color 0.18s",
                    }}>{item.cta} →</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeSection>



      {/* ═══════════════════════════════════════════════════════════════
          § 03b — ATELIER DIRECT ACCESS
          ═══════════════════════════════════════════════════════════════ */}
      <FadeSection>
        <section style={{ padding: isMobile ? "56px 0" : "80px 0", borderBottom: "1px solid #e2e2e2", backgroundColor: "#111" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "40px" : "80px", alignItems: "center" }}>
              <div>
                <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#555", display: "block", marginBottom: "16px" }}>§ 03b · ATELIER DIRECT</span>
                <h2 style={{ fontFamily: F.display, fontSize: isMobile ? "28px" : "40px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#fff", lineHeight: 1.05, marginBottom: "24px" }}>
                  Atelier Direct
                </h2>
                <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.85, color: "#aaa", marginBottom: "16px" }}>
                  The world’s leading ready-to-wear tailoring retails through conventional channels at HK$30,000–50,000 and above. Atelier Direct rates begin from HK$12,800 for essential handcrafted suiting. At the pinnacle, each commission is an art piece — singular, made only for you. Commissioned in the finest cloths, from essentials to Vicuña, fitted precisely to your form.
                </p>
                <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.85, color: "#aaa", marginBottom: "28px" }}>
                  The difference to retail is timeless menswear, elevated fabrication, hand craft, optimised fit, and access.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                  <Link href="/contact?type=bespoke">
                    <span style={{ display: "inline-block", padding: "10px 22px", border: "1px solid rgba(255,255,255,0.3)", fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", cursor: "pointer" }}>Enquire for Atelier Direct →</span>
                  </Link>
                  <Link href="/production-index">
                    <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", cursor: "pointer", textDecoration: "none" }}>Read the Production Index →</span>
                  </Link>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", backgroundColor: "#333" }}>
                {[
                  { tier: "ENTRY", price: "FROM HK$12,800", note: "MTM & BESPOKE · HAND CRAFTED" },
                  { tier: "MID", price: "FROM HK$18,000", note: "PREMIUM CLOTH SELECTION" },
                  { tier: "INVESTMENT", price: "FROM HK$28,000", note: "ELEVATED CLOTH SELECTION" },
                  { tier: "ULTRA", price: "FROM HK$33,800", note: "LIMITLESS FABRICATION" },
                ].map((item) => (
                  <div key={item.tier} style={{ backgroundColor: "#1a1a1a", padding: isMobile ? "20px 16px" : "28px 24px" }}>
                    <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#555", marginBottom: "8px" }}>{item.tier}</div>
                    <div style={{ fontFamily: F.display, fontSize: isMobile ? "16px" : "20px", fontWeight: 700, letterSpacing: "0.04em", color: "#fff", marginBottom: "4px", display: "flex", alignItems: "center" }}>{item.price}{item.price === "FROM HK$12,800" && <RrpTooltip theme="dark" />}</div>
                    <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#666", lineHeight: 1.5 }}>{item.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeSection>


       {/* ═══════════════════════════════════════════════════════════════
          § 04 — TAILORED MENSWEARR
          ═══════════════════════════════════════════════════════════════ */}
      <FadeSection>
        <section style={{ padding: isMobile ? "60px 0" : "80px 0", borderBottom: "1px solid #e2e2e2" }}>
          <div className="container">
            {/* Section header */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "8px" }}>
                  § 04 · TAILORED MENSWEAR
                </span>
                <h2 style={{
                  fontFamily: F.display, fontSize: isMobile ? "24px" : "30px",
                  fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                  color: "#111", lineHeight: 1.15, margin: 0,
                }}>
                  Suits &amp; Formal Wear
                </h2>
              </div>
              <Link href="/tailored-menswear">
                <span className="btn-text">
                  View All Garments <ChevronRight size={10} />
                </span>
              </Link>
            </div>

            {/* Product grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
              gap: isMobile ? "16px" : "24px",
            }}>
              {SUITS.map((suit) => (
                <Link key={suit.id} href={`/tailored-menswear/${suit.slug}`}>
                  <div className="product-card">
                    {/* Image */}
                    <div style={{ position: "relative", backgroundColor: "#f5f5f5", marginBottom: "12px", overflow: "hidden" }}>
                      <Img
                        src={suit.img}
                        alt={suit.name}
                        style={{ width: "100%", aspectRatio: "2/3", objectFit: "cover", transition: "opacity 0.22s" }}
                      />
                      {/* Bespoke + MTM badges */}
                      <div style={{ position: "absolute", bottom: "10px", left: "10px", display: "flex", gap: "4px" }}>
                        <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", backgroundColor: "rgba(255,255,255,0.92)", padding: "2px 6px", border: "1px solid #ddd" }}>Bespoke</span>
                        <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", backgroundColor: "rgba(255,255,255,0.92)", padding: "2px 6px", border: "1px solid #ddd" }}>MTM</span>
                      </div>
                    </div>
                    {/* Data */}
                    <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.06em", color: "#bbb", marginBottom: "4px" }}>
                      {suit.id}
                    </div>
                    <div style={{
                      fontFamily: F.display, fontSize: "11px", fontWeight: 600,
                      letterSpacing: "0.12em", textTransform: "uppercase", color: "#111", marginBottom: "6px",
                    }}>
                      {suit.name}
                    </div>
                    <div style={{ fontFamily: F.mono, fontSize: "9px", color: "#999", lineHeight: 1.6, marginBottom: "6px" }}>
                      {suit.fabric}<br />
                      {suit.weight} · {suit.origin}
                    </div>
                    <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.06em", color: "#555", fontWeight: 600 }}>
                      From {suit.price}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </FadeSection>

      {/* ═══════════════════════════════════════════════════════════════
          § 04b — METHODOLOGY
          ═══════════════════════════════════════════════════════════════ */}
      <FadeSection>
        <section style={{ padding: isMobile ? "60px 0" : "80px 0", borderBottom: "1px solid #e2e2e2" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "280px 1fr", gap: isMobile ? "32px" : "80px", alignItems: "start" }}>
              <div>
                <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "12px" }}>
                  § 04b · METHODOLOGY
                </span>
                <h2 style={{ fontFamily: F.display, fontSize: isMobile ? "26px" : "32px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", lineHeight: 1.15, marginBottom: "16px" }}>
                  How the Process Works
                </h2>
                <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.75, color: "#777", marginBottom: "24px" }}>
                  Every garment follows a rigorous four-stage process. No shortcuts. No compromises. Delivered in four to six weeks.
                </p>
                <Link href="/how-it-works">
                  <span className="btn-outline" style={{ fontSize: "9px", padding: "8px 18px" }}>Full Methodology →</span>
                </Link>
              </div>
              <div>
                {METHODOLOGY_STEPS.map((step, i) => (
                  <div key={step.num} style={{ display: "grid", gridTemplateColumns: "48px 1fr", gap: "20px", paddingBottom: "24px", marginBottom: "24px", borderBottom: i < METHODOLOGY_STEPS.length - 1 ? "1px solid #f0f0f0" : "none" }}>
                    <div><span style={{ fontFamily: F.mono, fontSize: "10px", letterSpacing: "0.06em", color: "#bbb" }}>{step.num}</span></div>
                    <div>
                      <div style={{ fontFamily: F.display, fontSize: "12px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#111", marginBottom: "6px" }}>{step.label}</div>
                      <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.7, color: "#777", margin: 0 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeSection>

      {/* ═══════════════════════════════════════════════════════════════
          § 05 — FABRIC SPECIFICATION TABLE
          ═══════════════════════════════════════════════════════════════ */}
      <FadeSection>
        <section style={{ padding: isMobile ? "60px 0" : "80px 0", backgroundColor: "#fafafa", borderBottom: "1px solid #e2e2e2" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "40px" : "80px", alignItems: "start" }}>
              <div>
                <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "12px" }}>
                  § 05 · FABRICATION
                </span>
                <h2 style={{
                  fontFamily: F.display, fontSize: isMobile ? "24px" : "30px",
                  fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                  color: "#111", lineHeight: 1.15, marginBottom: "16px",
                }}>
                  Understanding<br />Cloth Quality
                </h2>
                <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.75, color: "#777", marginBottom: "24px" }}>
                  The quality of a suit begins with the cloth. Hong Kong's climate demands
                  a fabric that breathes in humidity while holding its structure through
                  a full working day. Our guides explain what to look for.
                </p>
                <Link href="/tailor-guides/essential-guide-to-suit-fabrics">
                  <span className="btn-outline" style={{ fontSize: "9px", padding: "8px 18px" }}>
                    Read the Fabric Guide →
                  </span>
                </Link>
              </div>
              <div>
                <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
                  <table className="spec-table" style={{ minWidth: "280px" }}>
                    <thead>
                      <tr>
                        <th>SPECIFICATION</th>
                        <th>RANGE</th>
                        <th>NOTE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {FABRIC_DATA.map((row) => (
                        <tr key={row.spec}>
                          <td style={{ fontFamily: F.mono, fontSize: "10px", letterSpacing: "0.06em", color: "#444", fontWeight: 500 }}>{row.spec}</td>
                          <td style={{ fontFamily: F.mono, fontSize: "10px", color: "#111" }}>{row.value}</td>
                          <td style={{ fontFamily: F.mono, fontSize: "9px", color: "#aaa" }}>{row.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ marginTop: "12px", fontFamily: F.mono, fontSize: "8px", color: "#bbb", letterSpacing: "0.06em" }}>
                  DATA · TAILOR.HK FABRIC INDEX · v2.1 · UPDATED 2025
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeSection>

      {/* ═══════════════════════════════════════════════════════════════
          § 05b — CONSTRUCTION
          ═══════════════════════════════════════════════════════════════ */}
      <FadeSection>
        <section style={{ padding: isMobile ? "60px 0" : "80px 0", borderBottom: "1px solid #e2e2e2" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "40px" : "80px", alignItems: "center" }}>
              {/* Left: text */}
              <div>
                <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "12px" }}>
                  § 05b · CONSTRUCTION
                </span>
                <h2 style={{
                  fontFamily: F.display, fontSize: isMobile ? "26px" : "32px",
                  fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                  color: "#111", lineHeight: 1.15, marginBottom: "16px",
                }}>
                  Why Bespoke<br />Outperforms
                </h2>
                <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.75, color: "#777", marginBottom: "16px" }}>
                  The radar plots six quality dimensions across the three tiers of tailoring.
                  Bespoke dominates fit precision, personalisation, and construction quality.
                  Both made-to-measure and bespoke start from HK$12,800. Bespoke is offered as a complimentary upgrade — the service level is determined by your requirements, not an additional charge.
                </p>
                <div style={{ borderLeft: "2px solid #e0e0e0", paddingLeft: "14px", marginBottom: "20px" }}>
                  <p style={{ fontFamily: F.mono, fontSize: "9px", lineHeight: 1.7, color: "#888", margin: 0, letterSpacing: "0.03em" }}>
                    "A full-canvas bespoke suit, properly cared for, will outlast three ready-to-wear garments.
                    The cost-per-wear calculation consistently favours bespoke over a ten-year horizon."
                  </p>
                  <p style={{ fontFamily: F.mono, fontSize: "8px", color: "#bbb", marginTop: "6px", letterSpacing: "0.08em" }}>
                    — TAILOR.HK METHODOLOGY · 2025
                  </p>
                </div>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  {[{ label: "Bespoke", color: "#111" }, { label: "Made-to-Measure", color: "#888" }, { label: "Ready-to-Wear", color: "#ccc" }].map((item) => (
                    <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ width: "18px", height: "2px", backgroundColor: item.color, display: "inline-block" }} />
                      <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.08em", color: "#888" }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Right: Radar chart */}
              <div>
                <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: "#bbb", marginBottom: "8px", display: "flex", justifyContent: "space-between" }}>
                  <span>FIGURE 1</span><span>CONSTRUCTION QUALITY INDEX</span>
                </div>
                <div style={{ border: "1px solid #e8e8e8", padding: "20px", backgroundColor: "#fafafa", touchAction: "pan-y" }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={CONSTRUCTION_RADAR} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                      <PolarGrid stroke="#e0e0e0" />
                      <PolarAngleAxis dataKey="axis" tick={{ fontFamily: F.mono, fontSize: 8, fill: "#888", letterSpacing: "0.04em" }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar name="Bespoke" dataKey="bespoke" stroke="#111" fill="#111" fillOpacity={0.08} strokeWidth={2} />
                      <Radar name="MTM" dataKey="mtm" stroke="#888" fill="#888" fillOpacity={0.06} strokeWidth={1.5} />
                      <Radar name="RTW" dataKey="rtw" stroke="#ccc" fill="#ccc" fillOpacity={0.04} strokeWidth={1} />
                      <Tooltip contentStyle={{ fontFamily: F.mono, fontSize: "9px", border: "1px solid #333", backgroundColor: "#111", color: "#fff" }} />
                    </RadarChart>
                  </ResponsiveContainer>
                  <p style={{ fontFamily: F.mono, fontSize: "8px", color: "#bbb", textAlign: "center", marginTop: "6px", letterSpacing: "0.05em" }}>
                    Fig. 1 · Composite quality scores across six dimensions. Based on industry benchmarks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeSection>
      {/* ═══════════════════════════════════════════════════════════════
          § 05c — WORLD TAILORING MAPP
          ═══════════════════════════════════════════════════════════════ */}
      <FadeSection>
        <section style={{ padding: isMobile ? "60px 0" : "80px 0", borderBottom: "1px solid #e2e2e2" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr", gap: isMobile ? "32px" : "60px", alignItems: "start" }}>
              <div>
                <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "8px" }}>
                  § 05c · WORLD TAILORING
                </span>
                <h2 style={{ fontFamily: F.display, fontSize: isMobile ? "24px" : "30px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", lineHeight: 1.15, marginBottom: "16px" }}>
                  World Tailoring
                </h2>
                <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.75, color: "#777", marginBottom: "12px" }}>
                  Seven cities define global tailoring. Each tradition carries a distinct construction philosophy, silhouette, and cultural identity — from the structured English chest to the soft Neapolitan shoulder.
                </p>
                <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.75, color: "#999" }}>
                  Switch to Textile Origins to explore where the world's finest cloths are made.
                </p>
              </div>
              <div>
                <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: "#bbb", marginBottom: "6px" }}>FIGURE 2 · GLOBAL TAILORING & TEXTILE ORIGINS</div>
                <TailoringWorldMap />
              </div>
            </div>
          </div>
        </section>
      </FadeSection>
      {/* ═══════════════════════════════════════════════════════════════
          § 05d — FABRIC ATLAS
          ═══════════════════════════════════════════════════════════════ */}
      <FadeSection>
        <section style={{ padding: isMobile ? "60px 0" : "80px 0", borderBottom: "1px solid #e2e2e2", backgroundColor: "#fafafa" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0" }}>
              {/* Fabric weight chart */}
              <div>
                <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "8px" }}>
                  § 05d · FABRIC ATLAS
                </span>
                <h3 style={{ fontFamily: F.display, fontSize: "18px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", marginBottom: "10px" }}>
                  Fabric Weight & Climate
                </h3>
                <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.75, color: "#777", marginBottom: "16px" }}>
                  Hong Kong's optimal range is 180–260g/m². Lighter tropical wools excel in summer;
                  mid-weight fresco performs year-round.
                </p>
                <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: "#bbb", marginBottom: "6px" }}>FIGURE 3 · SUITABILITY SCORE BY WEIGHT (g/m²)</div>
                <div style={{ border: "1px solid #e8e8e8", padding: "16px", backgroundColor: "#fff", touchAction: "pan-y" }}>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={FABRIC_WEIGHT_DATA} margin={{ top: 5, right: 10, bottom: 15, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="label" tick={{ fontFamily: F.mono, fontSize: 8, fill: "#888" }} label={{ value: "g/m²", position: "insideBottomRight", offset: -5, style: { fontFamily: F.mono, fontSize: 8, fill: "#bbb" } }} />
                      <YAxis tick={{ fontFamily: F.mono, fontSize: 8, fill: "#888" }} tickFormatter={(v: number) => `${v}%`} domain={[0, 100]} />
                      <Tooltip contentStyle={{ fontFamily: F.mono, fontSize: "9px", border: "1px solid #333", backgroundColor: "#111", color: "#fff" }} formatter={(v: any, name: string) => [`${v}%`, name]} />
                      <Line type="monotone" dataKey="tropical" name="Tropical / HK" stroke="#111" strokeWidth={2} dot={{ fill: "#111", r: 3 }} />
                      <Line type="monotone" dataKey="fourSeason" name="Four Season" stroke="#888" strokeWidth={1.5} dot={{ fill: "#888", r: 2 }} strokeDasharray="4 2" />
                      <Line type="monotone" dataKey="winter" name="Winter / UK" stroke="#ccc" strokeWidth={1.5} dot={{ fill: "#ccc", r: 2 }} strokeDasharray="2 2" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeSection>

      {/* ═══════════════════════════════════════════════════════════════
          § 06 — TAILOR FINDER BRIEF CTA
          ═══════════════════════════════════════════════════════════════ */}
      <FadeSection>
        <section style={{ padding: isMobile ? "60px 0" : "80px 0", borderBottom: "1px solid #e2e2e2", backgroundColor: "#111" }}>
          <div className="container" style={{ textAlign: "center" }}>
            <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#555", display: "block", marginBottom: "16px" }}>
              § 06 · TAILOR FINDER BRIEF
            </span>
            <h2 style={{
              fontFamily: F.display, fontSize: isMobile ? "28px" : "clamp(28px, 4vw, 48px)",
              fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
              color: "#fff", lineHeight: 1.1, marginBottom: "16px",
            }}>
              The Tailor<br />Finder Brief
            </h2>
            <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.75, color: "#888", maxWidth: "480px", margin: "0 auto 32px" }}>
              Eight questions covering budget, occasion, construction preference, and silhouette.
              The brief returns a shortlist of matched houses from the index.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginBottom: "32px" }}>
              <Link href="/tailor-finder-quiz">
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "12px 28px", backgroundColor: "#fff", color: "#111",
                  fontFamily: F.display, fontSize: "11px", fontWeight: 600,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  transition: "background 0.18s",
                }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.backgroundColor = "#e8e8e8"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.backgroundColor = "#fff"; }}
                >
                  Start the Brief <ArrowRight size={12} />
                </span>
              </Link>
            </div>
            {/* Brief stats */}
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, auto)",
              gap: isMobile ? "20px 0" : "0",
              justifyContent: "center",
            }}>
              {[
                { value: "8", label: "QUESTIONS" },
                { value: "3 MIN", label: "AVERAGE TIME" },
                { value: "12+", label: "VERIFIED TAILORS" },
                { value: "ZERO FEE", label: "CONSULTATION" },
              ].map((stat, i) => (
                <div key={stat.label} style={{
                  padding: isMobile ? "0 16px" : "0 28px",
                  borderLeft: isMobile ? (i % 2 !== 0 ? "1px solid #333" : "none") : (i > 0 ? "1px solid #333" : "none"),
                  textAlign: "center",
                }}>
                  <div style={{ fontFamily: F.display, fontSize: "20px", fontWeight: 600, letterSpacing: "0.06em", color: "#fff", marginBottom: "2px" }}>
                    {stat.value}
                  </div>
                  <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: "#555" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeSection>

      {/* ═══════════════════════════════════════════════════════════════
          § 07b — SEASONAL FABRIC CALENDAR
          ═══════════════════════════════════════════════════════════════ */}
      <FadeSection>
        <section style={{ padding: isMobile ? "60px 0" : "80px 0", backgroundColor: "#f9f8f6", borderBottom: "1px solid #e2e2e2" }}>
          <div className="container">
            <div style={{ marginBottom: isMobile ? "32px" : "48px" }}>
              <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "8px" }}>
                § 07b · FABRIC INTELLIGENCE
              </span>
              <h2 style={{
                fontFamily: F.display, fontSize: isMobile ? "24px" : "30px",
                fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                color: "#111", lineHeight: 1.15, margin: "0 0 12px",
              }}>
                Hong Kong Seasonal Fabric Guide
              </h2>
              <p style={{ fontFamily: F.body, fontSize: "13px", color: "#666", maxWidth: "560px", lineHeight: 1.7, margin: 0 }}>
                Hong Kong's climate demands a different approach to fabric selection than London or Milan. This calendar maps the optimal cloth weights and compositions to each season.
              </p>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
              gap: "2px",
              backgroundColor: "#e2e2e2",
              border: "1px solid #e2e2e2",
            }}>
              {[
                {
                  season: "JAN — MAR",
                  label: "COOL SEASON",
                  temp: "14–20°C",
                  weight: "300–380 g/m²",
                  fabrics: ["Flannel", "Tweed", "Worsted wool", "Cashmere blend"],
                  note: "Hong Kong's only true winter window. Heavier cloths are appropriate, especially for evening.",
                  accent: "#2c3e50",
                  bg: "#f0ede8",
                },
                {
                  season: "APR — JUN",
                  label: "SPRING TRANSITION",
                  temp: "20–28°C",
                  weight: "240–300 g/m²",
                  fabrics: ["Tropical wool", "Fresco", "Hopsack", "Linen blend"],
                  note: "Humidity rises sharply from May. Fresco and hopsack weaves allow air circulation.",
                  accent: "#4a6741",
                  bg: "#f0f3ee",
                },
                {
                  season: "JUL — SEP",
                  label: "PEAK HUMIDITY",
                  temp: "28–33°C",
                  weight: "180–240 g/m²",
                  fabrics: ["Fresco", "Hopsack", "Linen", "Silk-linen"],
                  note: "The most demanding season. Open weaves and natural fibres are essential. Avoid fused construction entirely.",
                  accent: "#8b4513",
                  bg: "#f5f0eb",
                },
                {
                  season: "OCT — DEC",
                  label: "AUTUMN RETURN",
                  temp: "20–27°C",
                  weight: "260–320 g/m²",
                  fabrics: ["Worsted wool", "Cavalry twill", "Flannel (light)", "Wool-silk"],
                  note: "The finest tailoring season in Hong Kong. Comfortable temperatures allow richer cloths without discomfort.",
                  accent: "#5c4033",
                  bg: "#f3eeea",
                },
              ].map((s) => (
                <div key={s.season} style={{ backgroundColor: s.bg, padding: isMobile ? "28px 20px" : "32px 28px" }}>
                  <div style={{ marginBottom: "20px" }}>
                    <span style={{
                      fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em",
                      color: s.accent, display: "block", marginBottom: "4px", fontWeight: 600,
                    }}>
                      {s.season}
                    </span>
                    <div style={{
                      fontFamily: F.display, fontSize: "15px", fontWeight: 700,
                      letterSpacing: "0.06em", textTransform: "uppercase", color: "#111",
                    }}>
                      {s.label}
                    </div>
                    <div style={{ fontFamily: F.mono, fontSize: "10px", color: "#888", marginTop: "4px" }}>
                      {s.temp}
                    </div>
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: "#aaa", marginBottom: "8px" }}>
                      OPTIMAL WEIGHT
                    </div>
                    <div style={{
                      fontFamily: F.display, fontSize: "18px", fontWeight: 700,
                      color: s.accent, letterSpacing: "0.04em",
                    }}>
                      {s.weight}
                    </div>
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: "#aaa", marginBottom: "8px" }}>
                      RECOMMENDED CLOTHS
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {s.fabrics.map((fab) => (
                        <span key={fab} style={{
                          fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.06em",
                          color: s.accent, border: `1px solid ${s.accent}`,
                          padding: "2px 7px", opacity: 0.85,
                        }}>
                          {fab}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p style={{
                    fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#666",
                    lineHeight: 1.65, margin: 0, borderTop: "1px solid rgba(0,0,0,0.08)",
                    paddingTop: "14px",
                  }}>
                    {s.note}
                  </p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
              <Link href="/tailor-guides/essential-guide-to-suit-fabrics">
                <span className="btn-text">Fabric Guide →</span>
              </Link>
            </div>
          </div>
        </section>
      </FadeSection>

      {/* ═══════════════════════════════════════════════════════════════
          § 07c — PRICING ESTIMATOR
          ═══════════════════════════════════════════════════════════════ */}
      <FadeSection>
        <section style={{ padding: isMobile ? "60px 0" : "80px 0", backgroundColor: "#f9f8f6", borderBottom: "1px solid #e2e2e2" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "40px" : "80px", alignItems: "flex-start" }}>
              <div>
                <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "8px" }}>
                  § 07c · PRICE INTELLIGENCE
                </span>
                <h2 style={{
                  fontFamily: F.display, fontSize: isMobile ? "24px" : "30px",
                  fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                  color: "#111", lineHeight: 1.15, margin: "0 0 16px",
                }}>
                  What Does Bespoke Cost in Hong Kong?
                </h2>
                <p style={{ fontFamily: F.body, fontSize: "13px", color: "#666", lineHeight: 1.75, margin: "0 0 14px" }}>
                  Pricing in Hong Kong bespoke tailoring varies widely — from HK$8,000 for a well-made fused suit to HK$90,000 for a full-canvas commission in luxury cloth. The three primary variables that drive cost are construction method, fabric tier, and garment type. But they are not the only ones.
                </p>
                <p style={{ fontFamily: F.body, fontSize: "13px", color: "#666", lineHeight: 1.75, margin: "0 0 14px" }}>
                  A house’s aesthetic, its manpower, and the standard of its workmanship all have material impact on the final price — and so, frankly, does popularity. An established house with a long waiting list commands a premium not always justified by the cloth or the canvas alone. You are paying, in part, for the name and the association.
                </p>
                <p style={{ fontFamily: F.body, fontSize: "13px", color: "#666", lineHeight: 1.75, margin: "0 0 14px" }}>
                  It is also worth distinguishing between fashion and investment. Some houses produce garments with a distinct seasonal aesthetic — bold, of-the-moment, immediately recognisable. These are not intended to last a lifetime; they are fashion, and they age accordingly. A true bespoke commission is the opposite: a timeless investment piece, styled with restraint and built to the body. Worn and altered over decades, a well-commissioned suit offers utility and elegance that no fashion garment can match.
                </p>
                <p style={{ fontFamily: F.body, fontSize: "13px", color: "#666", lineHeight: 1.75, margin: 0 }}>
                  Use the estimator to understand where your commission is likely to land before you walk into an atelier.
                </p>
              </div>
              <PricingEstimator isMobile={isMobile} />
            </div>
          </div>
        </section>
      </FadeSection>
      {/* ═══════════════════════════════════════════════════════════════
          § 07d — PRICE TRANSPARENCY
          ═══════════════════════════════════════════════════════════════ */}
      <FadeSection>
        <section style={{ padding: isMobile ? "60px 0" : "80px 0", backgroundColor: "#fff", borderBottom: "1px solid #e2e2e2" }}>
          <div className="container">
            <div style={{ marginBottom: isMobile ? "36px" : "48px" }}>
              <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "8px" }}>
                § 07d · COST DRIVERS
              </span>
              <h2 style={{
                fontFamily: F.display, fontSize: isMobile ? "24px" : "30px",
                fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                color: "#111", lineHeight: 1.15, margin: "0 0 12px",
              }}>
                What Drives the Price of a True Bespoke Commission?
              </h2>
              <p style={{ fontFamily: F.body, fontSize: "13px", color: "#666", lineHeight: 1.75, maxWidth: "640px" }}>
                Three variables account for the majority of price variation in Hong Kong bespoke tailoring. Understanding them allows you to commission intelligently — and to evaluate whether a quote is reasonable.
              </p>
            </div>
            {/* Three cost driver cards */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "1px", backgroundColor: "transparent", marginBottom: "48px" }}>
              {/* Driver 1: Construction */}
              <div style={{ backgroundColor: "#fff", padding: isMobile ? "28px 24px" : "36px 32px" }}>
                <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#aaa", marginBottom: "12px" }}>
                  DRIVER 01 · CONSTRUCTION
                </div>
                <h3 style={{ fontFamily: F.display, fontSize: "18px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#111", margin: "0 0 12px" }}>
                  Canvas vs. Fused
                </h3>
                <p style={{ fontFamily: F.body, fontSize: "12px", color: "#666", lineHeight: 1.75, margin: "0 0 14px" }}>
                  The true case for hand work is not technical — it is physical. A full-canvas, hand-padded garment is lighter than its fused equivalent. The thousands of individual stitches that build a bespoke jacket — pad-stitching the lapels for their natural roll, hand-sewing the sleeve heads so the sleeve hangs freely, felling the lining by hand — create a structure with natural give. The garment breathes with the body rather than resisting it.
                </p>
                <p style={{ fontFamily: F.body, fontSize: "12px", color: "#666", lineHeight: 1.75, margin: "0 0 14px" }}>
                  Over time, this matters profoundly. A hand-built garment moulds to its wearer: the canvas softens and takes the shape of the chest, the lapels develop a roll that is entirely personal, the shoulders settle to the client’s posture. Worn over years, it becomes a second skin. And because it is sewn rather than glued, it can be altered — let out, taken in, re-lined, re-shouldered — as the body changes over a lifetime. A well-made bespoke suit, properly cared for, is not a purchase. It is an inheritance.
                </p>
                <p style={{ fontFamily: F.body, fontSize: "12px", color: "#666", lineHeight: 1.75, margin: "0 0 20px" }}>
                  Fused construction, by contrast, is glued rather than sewn. It is faster and cheaper to produce, but the interlining degrades with dry cleaning — the adhesive breaks down, the chest bubbles, and the garment loses its shape permanently. It cannot be meaningfully altered, and it cannot be restored.
                </p>
                <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "16px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                    {[
                      { label: "FULL CANVAS", note: "2–3× FUSED PRICE", color: "#111", textColor: "#fff" },
                      { label: "HALF CANVAS", note: "1.5× FUSED PRICE", color: "#555", textColor: "#fff" },
                      { label: "FUSED", note: "BASE PRICE", color: "#f5f5f5", textColor: "#888" },
                    ].map(item => (
                      <div key={item.label} style={{ backgroundColor: item.color, padding: "10px 8px" }}>
                        <div style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.06em", color: item.textColor, marginBottom: "3px" }}>{item.label}</div>
                        <div style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.06em", textTransform: "uppercase", color: item.textColor, opacity: 0.6 }}>{item.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Driver 2: Fabric */}
              <div style={{ backgroundColor: "#fff", padding: isMobile ? "28px 24px" : "36px 32px" }}>
                <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#aaa", marginBottom: "12px" }}>
                  DRIVER 02 · CLOTH
                </div>
                <h3 style={{ fontFamily: F.display, fontSize: "18px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#111", margin: "0 0 12px" }}>
                  Fabric Mill Tier
                </h3>
                <p style={{ fontFamily: F.body, fontSize: "12px", color: "#666", lineHeight: 1.75, margin: "0 0 16px" }}>
                  Cloth from Loro Piana, Scabal, or Holland & Sherry costs 3–5× more per metre than a house cloth. For a two-piece suit requiring 3.5 metres, this difference alone can add HK$15,000–HK$30,000 to the final price. The mill tier is one of the most significant variables in any commission.
                </p>
                <p style={{ fontFamily: F.body, fontSize: "12px", color: "#666", lineHeight: 1.75, margin: "0 0 16px" }}>
                  The mill tier determines far more than price. Elevated fabrics — particularly those woven from long-staple Merino, cashmere, or vicuna — carry a softness and warmth that is difficult to replicate at a lower cost. A Loro Piana Tasmanian wool in Super 180s has a handle that is immediately perceptible: cool against the skin in summer, warm in winter, and extraordinarily smooth to the touch.
                </p>
                <p style={{ fontFamily: F.body, fontSize: "12px", color: "#666", lineHeight: 1.75, margin: "0 0 20px" }}>
                  Longevity is equally significant. An elevated cloth, properly cared for, will outlast a lower-cost alternative by decades. The fibres are longer, the weave tighter, and the finishing more precise — which means the cloth holds its shape, resists pilling, and retains its drape over years of wear. In cost-per-wear terms, a finer commission often proves more economical than a lower-cost alternative replaced every few years. There is also a sustainability argument: one well-made garment in a fine cloth, worn for twenty years, is a more responsible choice than several lower-cost garments discarded in the same period.
                </p>
                <p style={{ fontFamily: F.body, fontSize: "12px", color: "#666", lineHeight: 1.75, margin: "0 0 20px", fontStyle: "italic", borderLeft: "2px solid #e0e0e0", paddingLeft: "12px" }}>
                  That said, finer textiles are inevitably rarer and more intensive to produce — and that rarity should not be the deciding factor. The right cloth is the one that suits the client’s lifestyle and how the garment will be used. A Super 120s in a robust twill may serve a client who travels frequently far better than a Super 200s that demands careful handling. Cloth selection is ultimately a personal decision, guided by how and where the garment will be worn.
                </p>
                <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "16px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "6px" }}>
                    {[
                      { label: "LUXURY MILL", mills: "Loro Piana · Scabal · Holland & Sherry", premium: "+HK$15,000–30,000 VS HOUSE" },
                      { label: "PREMIUM MILL", mills: "VBC · Reda · Dugdale · Caccioppoli", premium: "+HK$5,000–15,000 VS HOUSE" },
                      { label: "HOUSE CLOTH", mills: "Curated by the tailor", premium: "BASE CLOTH COST" },
                    ].map(item => (
                      <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "8px 0", borderBottom: "1px solid #f5f5f5" }}>
                        <div>
                          <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.06em", color: "#111", marginBottom: "2px" }}>{item.label}</div>
                          <div style={{ fontFamily: F.mono, fontSize: "7px", color: "#aaa" }}>{item.mills}</div>
                        </div>
                        <div style={{ fontFamily: F.mono, fontSize: "7px", color: "#888", textAlign: "right", flexShrink: 0, marginLeft: "8px" }}>{item.premium}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Driver 3: Tailor Reputation */}
              <div style={{ backgroundColor: "#fff", padding: isMobile ? "28px 24px" : "36px 32px" }}>
                <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#aaa", marginBottom: "12px" }}>
                  DRIVER 03 · ATELIER
                </div>
                <h3 style={{ fontFamily: F.display, fontSize: "18px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#111", margin: "0 0 12px" }}>
                  TAILOR REPUTATION, HOUSE STYLE & FITTINGS
                </h3>
                <p style={{ fontFamily: F.body, fontSize: "12px", color: "#666", lineHeight: 1.75, margin: "0 0 20px" }}>
                  A house's signature style — its silhouette, its lapel roll, its way of cutting a shoulder — is the most significant and hardest-to-value factor in any commission. It is, in many ways, priceless: either it resonates with you, or it does not.
                </p>
                <p style={{ fontFamily: F.body, fontSize: "12px", color: "#666", lineHeight: 1.75, margin: "0 0 20px" }}>
                  Beyond house style, a senior cutter at an established house commands a premium over a newer atelier — not because the cloth differs, but because the pattern, the process, and the reputation carry their own weight. Some tailors operate as one-man ateliers: the cutter, fitter, and finisher are the same person. This affects both capacity and lead time, and is often reflected in the price. The number of fittings (typically 2–4) also contributes to the final cost.
                </p>
                <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "16px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "6px" }}>
                    {[
                      { label: "2 FITTINGS", note: "STANDARD BESPOKE PROCESS", cost: "INCLUDED" },
                      { label: "3 FITTINGS", note: "RECOMMENDED FOR FIRST COMMISSION", cost: "+HK$1,500–3,000" },
                      { label: "4+ FITTINGS", note: "COMPLEX GARMENTS OR EXACTING FIT", cost: "+HK$3,000–6,000" },
                    ].map(item => (
                      <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "8px 0", borderBottom: "1px solid #f5f5f5" }}>
                        <div>
                          <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.06em", color: "#111", marginBottom: "2px" }}>{item.label}</div>
                          <div style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.06em", textTransform: "uppercase", color: "#aaa" }}>{item.note}</div>
                        </div>
                        <div style={{ fontFamily: F.mono, fontSize: "7px", color: "#888", textAlign: "right", flexShrink: 0, marginLeft: "8px" }}>{item.cost}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Bottom CTA row */}
            <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
              <Link href="/concierge">
                <span className="btn-primary">
                  Book a Consultation <ArrowRight size={10} />
                </span>
              </Link>
              <Link href="/tailor-guides">
                <span className="btn-text">
                  Read the Commissioning Guide <ChevronRight size={10} />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </FadeSection>
            {/* ═══════════════════════════════════════════════════════════════
          § 07 — GUIDES
          ═══════════════════════════════════════════════════════════════ */}
      <FadeSection>
        <section style={{ padding: isMobile ? "60px 0" : "80px 0", borderBottom: "1px solid #e2e2e2" }}>
          <div className="container">
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "8px" }}>
                  § 07 · KNOWLEDGE INDEX
                </span>
                <h2 style={{
                  fontFamily: F.display, fontSize: isMobile ? "24px" : "30px",
                  fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                  color: "#111", lineHeight: 1.15, margin: 0,
                }}>
                  Tailor Guides
                </h2>
              </div>
              <Link href="/tailor-guides">
                <span className="btn-text">
                  Full Guide Library <ChevronRight size={10} />
                </span>
              </Link>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: "24px",
            }}>
              {GUIDES.map((guide) => (
                <Link key={guide.index} href={guide.href}>
                  <div className="guide-card">
                    <div style={{ position: "relative", backgroundColor: "#f5f5f5", marginBottom: "16px", overflow: "hidden" }}>
                      <Img
                        src={guide.img}
                        alt={guide.title}
                        style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", transition: "opacity 0.22s" }}
                      />
                      <span style={{
                        position: "absolute", top: "10px", left: "10px",
                        fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.08em",
                        color: "#fff", backgroundColor: "rgba(0,0,0,0.7)",
                        padding: "2px 7px",
                      }}>
                        {guide.category}
                      </span>
                    </div>
                    <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.06em", color: "#bbb", marginBottom: "6px" }}>
                      GUIDE {guide.index} · {guide.readTime} READ
                    </div>
                    <h3 style={{
                      fontFamily: F.display, fontSize: "14px", fontWeight: 600,
                      letterSpacing: "0.06em", textTransform: "uppercase",
                      color: "#111", lineHeight: 1.3, margin: "0 0 8px",
                    }}>
                      {guide.title}
                    </h3>
                    <span style={{ fontFamily: F.mono, fontSize: "9px", color: "#aaa", letterSpacing: "0.06em" }}>
                      READ →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </FadeSection>

      {/* ═══════════════════════════════════════════════════════════════
          § 08 — CORPORATE
          ═══════════════════════════════════════════════════════════════ */}
      <FadeSection>
        <section style={{ padding: isMobile ? "60px 0" : "80px 0", backgroundColor: "#fafafa", borderBottom: "1px solid #e2e2e2" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "40px" : "80px", alignItems: "center" }}>
              <div>
                <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "12px" }}>
                  § 08 · CORPORATE PROGRAMME
                </span>
                <h2 style={{
                  fontFamily: F.display, fontSize: isMobile ? "24px" : "30px",
                  fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                  color: "#111", lineHeight: 1.15, marginBottom: "16px",
                }}>
                  Corporate &amp;<br />Executive Wardrobe
                </h2>
                <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.75, color: "#777", marginBottom: "24px" }}>
                  Account rates for firms, in-office fittings, and dedicated account management
                  for teams across Hong Kong's financial and professional services sector.
                </p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <Link href="/corporate-rewards">
                    <span className="btn-filled" style={{ fontSize: "9px", padding: "9px 20px" }}>
                      Corporate Programme
                    </span>
                  </Link>
                  <Link href="/executive-tailoring">
                    <span className="btn-outline" style={{ fontSize: "9px", padding: "9px 20px" }}>
                      Executive Tailoring
                    </span>
                  </Link>
                </div>
              </div>
              {/* Corporate data panel */}
              <div style={{ border: "1px solid #e2e2e2", backgroundColor: "#fff", padding: "28px" }}>
                <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", marginBottom: "20px", borderBottom: "1px solid #f0f0f0", paddingBottom: "12px" }}>
                  CORPORATE PROGRAMME · TERMS
                </div>
                {[
                  { label: "MINIMUM ORDER", value: "5 GARMENTS" },
                  { label: "ACCOUNT DISCOUNT", value: "UP TO 20%" },
                  { label: "FITTING LOCATION", value: "YOUR OFFICE OR OUR ATELIER" },
                  { label: "DELIVERY", value: "4–6 WEEKS" },
                  { label: "ACCOUNT MANAGER", value: "DEDICATED CONTACT" },
                ].map((item) => (
                  <div key={item.label} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "9px 0", borderBottom: "1px solid #f5f5f5",
                  }}>
                    <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.08em", color: "#aaa" }}>
                      {item.label}
                    </span>
                    <span style={{ fontFamily: F.display, fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", color: "#111" }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeSection>

      {/* ═══════════════════════════════════════════════════════════════
          § 09 — FINAL CTA
          ═══════════════════════════════════════════════════════════════ */}
      <FadeSection>
        <section style={{ padding: isMobile ? "60px 0" : "80px 0" }}>
          <div className="container" style={{ textAlign: "center" }}>
            <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#bbb", display: "block", marginBottom: "16px" }}>
              § 09 · COMMISSION
            </span>
            <h2 style={{
              fontFamily: F.display, fontSize: isMobile ? "28px" : "clamp(28px, 4vw, 48px)",
              fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
              color: "#111", lineHeight: 1.1, marginBottom: "16px",
            }}>
              Commission<br />Your First Suit
            </h2>
            <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.75, color: "#888", maxWidth: "420px", margin: "0 auto 32px" }}>
              The commissioning process begins with a consultation — an assessment of your requirements,
              your schedule, and the houses best suited to both.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
              <Link href="/how-it-works">
                <span className="btn-filled" style={{ fontSize: "10px", padding: "11px 26px" }}>
                  How It Works
                </span>
              </Link>
              <a href="https://wa.me/85265088780?text=Hello%2C%20I%20found%20you%20via%20Tailors.hk%20and%20would%20like%20to%20enquire." target="_blank" rel="noopener noreferrer">
                <span className="btn-outline" style={{ fontSize: "10px", padding: "11px 26px" }}>
                  WhatsApp Us
                </span>
              </a>
            </div>
            <p style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#888", marginTop: "16px", textTransform: "uppercase" }}>
              ◆ Atelier Direct · Handcrafted to Order · From HK$12,800
            </p>
          </div>
        </section>
      </FadeSection>

      {/* ── §09 · CLIENT RECORD ── */}
      <FadeSection>
        <section style={{ backgroundColor: "#0d0d0d", padding: "96px 0", borderTop: "1px solid #222" }}>
          <div className="container">
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "64px", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.14em", color: "#555", display: "block", marginBottom: "10px" }}>§ 09 · CLIENT RECORD</span>
                <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#f0ede8", lineHeight: 1.0, margin: 0 }}>On the Record</h2>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: F.display, fontSize: "36px", fontWeight: 700, color: "#c9a96e", letterSpacing: "0.04em", lineHeight: 1 }}>4.9</div>
                  <div style={{ fontFamily: F.mono, fontSize: "8px", color: "#555", letterSpacing: "0.1em", marginTop: "4px" }}>214 VERIFIED CLIENTS</div>
                </div>
                <div style={{ width: "1px", height: "40px", backgroundColor: "#333" }} />
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: F.display, fontSize: "36px", fontWeight: 700, color: "#c9a96e", letterSpacing: "0.04em", lineHeight: 1 }}>100%</div>
                  <div style={{ fontFamily: F.mono, fontSize: "8px", color: "#555", letterSpacing: "0.1em", marginTop: "4px" }}>EDITORIAL INDEPENDENCE</div>
                </div>
              </div>
            </div>

            {/* Featured large quote */}
            <div style={{ borderLeft: "2px solid #c9a96e", paddingLeft: "32px", marginBottom: "64px" }}>
              <p style={{ fontFamily: F.display, fontSize: "clamp(18px, 2.8vw, 28px)", fontWeight: 600, letterSpacing: "0.04em", color: "#f0ede8", lineHeight: 1.45, margin: "0 0 20px", maxWidth: "760px" }}>
                &ldquo;I came in not knowing what I wanted. By the end of the first consultation I had a clear brief, a cloth shortlist, and a realistic timeline. The suit arrived exactly as described.&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", color: "#c9a96e" }}>C.L.</span>
                <span style={{ width: "24px", height: "1px", backgroundColor: "#444" }} />
                <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#666" }}>PARTNER · MAGIC CIRCLE LAW FIRM · CENTRAL</span>
              </div>
            </div>

            {/* Grid of shorter quotes */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", backgroundColor: "#0d0d0d" }}>
              {[
                {
                  quote: "I've been commissioning in Hong Kong for eight years and this is the first time I've had a proper fitting process — three fittings, adjustments at each one. The result is noticeably different from anything I've had made here before.",
                  name: "D.K.",
                  role: "Partner",
                  sector: "Law · Admiralty",
                  tag: "Bespoke Suit"
                },
                {
                  quote: "Used the tailor finder to identify a house for a full wardrobe — six suits, four odd jackets, eight shirts. The matching was accurate. The house they recommended was exactly the right fit for what I needed.",
                  name: "T.C.",
                  role: "Chief Executive",
                  sector: "Listed Company · Wan Chai",
                  tag: "Full Wardrobe"
                },
                {
                  quote: "The guide to Super numbers was the most useful thing I read before commissioning. I'd been ordering Super 150s for years and wondering why they looked tired after six months. Moved to 120s and the difference is significant.",
                  name: "R.H.",
                  role: "Managing Director",
                  sector: "Investment Banking · Central",
                  tag: "Fabric Selection"
                },
                {
                  quote: "The corporate programme was handled efficiently. Twelve suits across four executives on a six-week timeline. Everything arrived on time and the quality was consistent across all four.",
                  name: "B.N.",
                  role: "Head of HR",
                  sector: "Professional Services · Quarry Bay",
                  tag: "Corporate Programme"
                },
                {
                  quote: "I've commissioned in London and Naples. The house I was matched with here is genuinely comparable — different in character, but the same level of craft. I was not expecting that.",
                  name: "F.D.",
                  role: "Executive Director",
                  sector: "Investment Banking · Visiting, Singapore",
                  tag: "International Standard"
                },
                {
                  quote: "The commissioning guide answered every question I had before I even asked it. I went into the first consultation knowing the right questions to ask about canvas construction and cloth weight. Made a real difference.",
                  name: "S.M.",
                  role: "Associate Director",
                  sector: "Management Consulting · Admiralty",
                  tag: "New to Bespoke"
                },
              ].map((t, i) => (
                <div key={i} style={{ backgroundColor: "#0d0d0d", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "220px" }}>
                  <div>
                    <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#c9a96e", marginBottom: "16px", opacity: 0.7 }}>{t.tag.toUpperCase()}</div>
                    <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.8, color: "#999", margin: 0 }}>&ldquo;{t.quote}&rdquo;</p>
                  </div>
                  <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #1e1e1e", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                      <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#f0ede8" }}>{t.name} · {t.role}</div>
                      <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.08em", color: "#555", marginTop: "3px" }}>{t.sector}</div>
                    </div>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#c9a96e", opacity: 0.6, flexShrink: 0 }} />
                  </div>
                </div>
              ))}
             </div>
            <div style={{ marginTop: "40px", textAlign: "center" }}>
              <a href="/client-record" style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.14em", color: "#c9a96e", textDecoration: "none", borderBottom: "1px solid #333", paddingBottom: "2px" }}>VIEW ALL CLIENT ACCOUNTS →</a>
            </div>
          </div>
        </section>
      </FadeSection>
    </main>
    <Footer />
    </>
  );
}
