"use client";
import { useSEO, SCHEMAS } from "@/hooks/useSEO";
/**
 * TAILOR.HK — PRODUCT PAGE
 * Design: Barlow Condensed display + JetBrains Mono data labels + Barlow body
 * Full product details, fabric specs, pricing, and Favourites/Enquiry integration
 */
import { useParams, Link } from "@/lib/wouter-shim";
import { useState, useEffect, useRef } from "react";
import { productEnquiryUrl } from "@/lib/whatsapp";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useFavourites } from "@/contexts/FavouritesContext";
import RrpTooltip from "@/components/RrpTooltip";
import { SizeSelector, JACKET_SIZES, SHIRT_SIZES, TROUSER_SIZES } from "@/components/SizeGuide";
import { toast } from "sonner";
// SEO handled by generateMetadata in page.tsx

const CDN = "https://images.squarespace-cdn.com/content/v1/68fb7bffc7f5256a863ed907";
const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body:    '"Barlow", Arial, sans-serif',
  mono:    '"JetBrains Mono", "Courier New", monospace',
};

export interface MillOption {
  mill: string;
  shortName: string;
  origin: string;
  description: string;
  price: string;       // Bespoke price
  mtmPrice: string;   // Made-to-Measure price (~35% lower)
  tier?: "entry" | "mid" | "gold"; // visual tier for price scale
}
export interface ProductData {
  id: string;
  name: string;
  category: string;
  slug: string;
  img: string;
  price: string;
  priceNote: string;
  tagline: string;
  description: string;
  fabricHighlight: string;
  fabricDetails: { label: string; value: string }[];
  constructionDetails: { label: string; value: string }[];
  occasions: string[];
  relatedIds: string[];
  millOptions?: MillOption[];
}

const SUIT_MILLS: MillOption[] = [
  { mill: "Vitale Barberis", shortName: "Vitale Barberis", origin: "Biella, Italy", description: "Pure S150s Wool — four-season plain weave", price: "HK$12,800", mtmPrice: "HK$12,800", tier: "entry" },
  { mill: "Dormeuil / Holland & Sherry", shortName: "Dormeuil / Holland & Sherry", origin: "Reims, France / Peebles, Scotland", description: "Dormeuil or Holland & Sherry — premium suiting, exceptional resilience", price: "HK$18,000", mtmPrice: "HK$18,000", tier: "mid" },
  { mill: "Carlo Barbera / Loro Piana", shortName: "Carlo Barbera / Loro Piana", origin: "Biella, Italy / Quarona, Italy", description: "Carlo Barbera (Kiton) or Loro Piana — ultra-fine Merino, superior drape", price: "HK$28,000", mtmPrice: "HK$28,000", tier: "gold" },
];
const TUXEDO_MILLS: MillOption[] = [
  { mill: "Vitale Barberis", shortName: "Vitale Barberis", origin: "Biella, Italy", description: "Barathea Wool — classic tuxedo weave, fine sheen", price: "HK$15,800", mtmPrice: "HK$15,800", tier: "entry" },
  { mill: "Dormeuil / Holland & Sherry", shortName: "Dormeuil / Holland & Sherry", origin: "Reims, France / Peebles, Scotland", description: "Dormeuil or Holland & Sherry — premium barathea, exceptional resilience", price: "HK$18,800", mtmPrice: "HK$18,800", tier: "mid" },
  { mill: "Carlo Barbera / Loro Piana", shortName: "Carlo Barbera / Loro Piana", origin: "Biella, Italy / Quarona, Italy", description: "Carlo Barbera (Kiton) or Loro Piana — ultra-fine Merino, superior drape", price: "HK$22,800", mtmPrice: "HK$22,800", tier: "gold" },
];
const BLAZER_MILLS: MillOption[] = [
  { mill: "Vitale Barberis", shortName: "Vitale Barberis", origin: "Biella, Italy", description: "Pure Wool Hopsack — four-season open weave", price: "HK$8,800", mtmPrice: "HK$8,800", tier: "entry" },
  { mill: "Dormeuil / Holland & Sherry", shortName: "Dormeuil / Holland & Sherry", origin: "Reims, France / Peebles, Scotland", description: "Dormeuil or Holland & Sherry — premium hopsack, exceptional resilience", price: "HK$12,800", mtmPrice: "HK$12,800", tier: "mid" },
  { mill: "Carlo Barbera / Loro Piana", shortName: "Carlo Barbera / Loro Piana", origin: "Biella, Italy / Quarona, Italy", description: "Carlo Barbera (Kiton) or Loro Piana — finest Merino, unmatched softness", price: "HK$16,800", mtmPrice: "HK$16,800", tier: "gold" },
];
const SHIRT_MILLS: MillOption[] = [
  { mill: "House Cotton", shortName: "House Cotton", origin: "Albini Group, Italy", description: "House cotton — fine poplin, year-round breathability", price: "HK$880", mtmPrice: "HK$880", tier: "entry" },
  { mill: "Italian Cotton", shortName: "Italian Cotton", origin: "Thomas Mason, Italy", description: "Italian cotton — superior hand, finer weave", price: "HK$1,280", mtmPrice: "HK$1,280", tier: "mid" },
  { mill: "Swiss Cotton", shortName: "Swiss Cotton", origin: "Alumo, Switzerland", description: "Swiss cotton — the finest shirting cloth in the world", price: "HK$1,800", mtmPrice: "HK$1,800", tier: "gold" },
];
const TROUSER_MILLS: MillOption[] = [
  { mill: "Vitale Barberis", shortName: "Vitale Barberis", origin: "Biella, Italy", description: "Pure S120s Wool — four-season plain weave", price: "HK$2,800", mtmPrice: "HK$2,800", tier: "entry" },
  { mill: "Dormeuil / Holland & Sherry", shortName: "Dormeuil / Holland & Sherry", origin: "Reims, France / Peebles, Scotland", description: "Dormeuil or Holland & Sherry — premium suiting, exceptional resilience", price: "HK$3,800", mtmPrice: "HK$3,800", tier: "mid" },
  { mill: "Carlo Barbera / Loro Piana", shortName: "Carlo Barbera / Loro Piana", origin: "Biella, Italy / Quarona, Italy", description: "Carlo Barbera (Kiton) or Loro Piana — ultra-fine Merino, superior drape", price: "HK$5,800", mtmPrice: "HK$5,800", tier: "gold" },
];
const OVERCOAT_MILLS: MillOption[] = [
  { mill: "Wool Flannel", shortName: "Vitale Barberis", origin: "Vitale Barberis, Italy", description: "Pure S120s Wool Flannel — classic overcoat weight", price: "HK$10,800", mtmPrice: "HK$10,800", tier: "entry" },
  { mill: "Cashmere-Wool", shortName: "Loro Piana Wool", origin: "Loro Piana, Italy", description: "Cashmere-Wool blend — warmth with refined drape", price: "HK$18,800", mtmPrice: "HK$18,800", tier: "mid" },
  { mill: "100% Cashmere", shortName: "Loro Piana Cashmere", origin: "Loro Piana, Italy", description: "Pure cashmere — the pinnacle of overcoat cloth", price: "HK$28,800", mtmPrice: "HK$28,800", tier: "gold" },
];

export const ALL_PRODUCTS: ProductData[] = [
  // ── SUITS ──────────────────────────────────────────────────────────────────
  {
    id: "001", name: "Midnight Blue Suit", category: "Suits", slug: "midnight-blue-suit",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/pVEPkPApyWtkArag.jpg",
    price: "HK$12,800", priceNote: "Bespoke from",
    tagline: "The definitive business suit. A shade darker than navy, lighter than black.",
    description: "In the enigmatic depths of midnight blue, this single-breasted suit stands as a testament to sartorial mastery, entirely hand-crafted from Pure S150s wool. These fabrics, curated for their four-season versatility, offer a featherlight drape that breathes through summer's warmth and shields against winter's bite. Buttonholes are delicately hand-stitched with silk threads, the lightweight horsehair full canvas is meticulously padded to mould to the wearer's form over time, and linings are fully hand-sewn. The refined notch lapel and enduring silhouette defy transient trends, ensuring it remains a wardrobe cornerstone for decades.",
    fabricHighlight: "Pure S150s Wool — Vitale Barberis",
    fabricDetails: [
      { label: "COMPOSITION", value: "100% Wool" },
      { label: "THREAD COUNT", value: "Super 100s–200s (subject to selection)" },
      { label: "MILL", value: "Subject to client selection" },
      { label: "FINISH", value: "Plain weave / Twill / Herringbone" },
      { label: "SEASON", value: "Year-round" },
    ],
    constructionDetails: [
      { label: "CONSTRUCTION", value: "Full canvas, horsehair padded" },
      { label: "LAPELS", value: "Notch lapel" },
      { label: "POCKETS", value: "Flap pockets, boat-shaped breast" },
      { label: "BUTTONS", value: "Horn buttons" },
      { label: "SHOULDER", value: "Pleated shoulder" },
      { label: "TROUSERS", value: "Flat front, zip fly, side adjusters" },
    ],
    occasions: ["Business", "Formal", "Evening", "Travel"],
    relatedIds: ["002", "003", "004"],
    millOptions: SUIT_MILLS,
  },
  {
    id: "002", name: "Mid Grey Suit", category: "Suits", slug: "mid-grey-suit",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/OEkbqFLSaAsYpDdV.jpg",
    price: "HK$12,800", priceNote: "Bespoke from",
    tagline: "The most wearable grey. Pairs with everything from white to burgundy.",
    description: "The mid grey single-breasted suit radiates versatile elegance, hand-forged from Pure S150s wool sourced from Vitale Barberis. Selected for their all-season adaptability, these textiles offer a supple hand that transitions effortlessly across climates. Silk-threaded buttonholes are sewn by hand, the hand-padded lightweight horsehair canvas contours to the body over time, and fully hand-sewn linings allow for seamless alterations as the wearer evolves. Its timeless silhouette — a poised notch lapel and balanced cut — stands resolute against fleeting fashions.",
    fabricHighlight: "Pure S150s Wool — Vitale Barberis",
    fabricDetails: [
      { label: "COMPOSITION", value: "100% Wool" },
      { label: "THREAD COUNT", value: "Super 100s–200s (subject to selection)" },
      { label: "MILL", value: "Subject to client selection" },
      { label: "FINISH", value: "Plain weave / Twill / Herringbone" },
      { label: "SEASON", value: "Year-round" },
    ],
    constructionDetails: [
      { label: "CONSTRUCTION", value: "Full canvas, horsehair padded" },
      { label: "LAPELS", value: "Notch lapel" },
      { label: "POCKETS", value: "Flap pockets, boat-shaped breast" },
      { label: "BUTTONS", value: "Horn buttons" },
      { label: "SHOULDER", value: "Pleated shoulder" },
      { label: "TROUSERS", value: "Flat front, zip fly, side adjusters" },
    ],
    occasions: ["Business", "Formal", "Casual Smart"],
    relatedIds: ["003", "005", "001"],
    millOptions: SUIT_MILLS,
  },
  {
    id: "003", name: "Charcoal Grey Suit", category: "Suits", slug: "charcoal-grey-suit",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/TNxmCQSagTsnBwFW.jpg",
    price: "HK$12,800", priceNote: "Bespoke from",
    tagline: "Power dressing at its most refined. The suit that closes deals.",
    description: "The charcoal grey single-breasted suit exudes resolute authority, meticulously hand-crafted from Pure S150s wool from Vitale Barberis. Chosen for their four-season versatility, these fabrics provide a lightweight yet resilient drape. Buttonholes are hand-stitched with silk, the lightweight horsehair full canvas is padded by hand to adapt to the wearer's form, and linings are fully hand-sewn for effortless alterations over years of wear. Its eternal proportions — a refined notch lapel and structured silhouette — transcend temporal whims.",
    fabricHighlight: "Pure S150s Wool — Vitale Barberis, 260 g/m²",
    fabricDetails: [
      { label: "COMPOSITION", value: "100% Wool" },
      { label: "WEIGHT", value: "240–340 g/m² (subject to selection)" },
      { label: "MILL", value: "Subject to client selection" },
      { label: "THREAD COUNT", value: "Super 100s–200s (subject to selection)" },
      { label: "FINISH", value: "Natural Stretch" },
      { label: "SEASON", value: "4-Season" },
    ],
    constructionDetails: [
      { label: "CONSTRUCTION", value: "Full canvas, horsehair padded" },
      { label: "LAPELS", value: "Notch lapel" },
      { label: "POCKETS", value: "Flap pockets, boat-shaped breast" },
      { label: "BUTTONS", value: "Horn buttons" },
      { label: "SHOULDER", value: "Pleated shoulder" },
      { label: "TROUSERS", value: "Flat front, zip fly, side adjusters" },
    ],
    occasions: ["Business", "Formal", "Interviews", "Board Meetings"],
    relatedIds: ["006", "001", "002"],
    millOptions: SUIT_MILLS,
  },
  {
    id: "004", name: "Navy Suit", category: "Suits", slug: "navy-suit",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/iiwfHtsspNExjqdN.jpg",
    price: "HK$12,800", priceNote: "Bespoke from",
    tagline: "The foundation of every great wardrobe. Classic navy, precisely cut.",
    description: "The navy single-breasted suit radiates assured versatility, hand-forged from Pure S150s wool sourced from Vitale Barberis. Engineered for all-season resilience, these textiles offer a plush drape that navigates climates with ease. Each detail is a testament to artisanal precision: silk-threaded buttonholes sewn by hand, a hand-padded horsehair canvas that contours to the body over time, and fully hand-sewn linings that facilitate graceful modifications across decades. Its timeless architecture — a poised notch lapel and enduring silhouette — stands resolute against fashion's caprice.",
    fabricHighlight: "Pure S150s Wool — Vitale Barberis",
    fabricDetails: [
      { label: "COMPOSITION", value: "100% Wool" },
      { label: "THREAD COUNT", value: "Super 100s–200s (subject to selection)" },
      { label: "MILL", value: "Subject to client selection" },
      { label: "FINISH", value: "Plain weave / Twill / Herringbone" },
      { label: "SEASON", value: "Year-round" },
    ],
    constructionDetails: [
      { label: "CONSTRUCTION", value: "Full canvas, horsehair padded" },
      { label: "LAPELS", value: "Notch lapel" },
      { label: "POCKETS", value: "Flap pockets, boat-shaped breast" },
      { label: "BUTTONS", value: "Horn buttons" },
      { label: "SHOULDER", value: "Pleated shoulder" },
      { label: "TROUSERS", value: "Flat front, zip fly, side adjusters" },
    ],
    occasions: ["Business", "Formal", "Casual Smart", "Travel"],
    relatedIds: ["001", "010", "011"],
    millOptions: SUIT_MILLS,
  },
  {
    id: "005", name: "Light Grey Suit", category: "Suits", slug: "light-grey-suit",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/lGOiLNUXUbdGKjAk.jpg",
    price: "HK$12,800", priceNote: "Bespoke from",
    tagline: "Effortless warm-weather elegance. The suit for Hong Kong summers.",
    description: "The light grey single-breasted suit evokes luminous adaptability, meticulously hand-crafted from Pure S150s wool from Vitale Barberis. Attuned to four-season fluidity, these fabrics provide a gossamer drape that thrives across climates. Buttonholes are hand-stitched with silk, the lightweight horsehair canvas is padded by hand to mould to the wearer's form, and linings are fully hand-sewn for seamless alterations over time. Its perennial proportions — a refined notch lapel and classic contour — defy vogue's transience, promising enduring resonance.",
    fabricHighlight: "Pure S150s Wool — Vitale Barberis",
    fabricDetails: [
      { label: "COMPOSITION", value: "100% Wool" },
      { label: "THREAD COUNT", value: "Super 100s–200s (subject to selection)" },
      { label: "MILL", value: "Subject to client selection" },
      { label: "FINISH", value: "Plain weave / Twill / Herringbone" },
      { label: "SEASON", value: "Year-round" },
    ],
    constructionDetails: [
      { label: "CONSTRUCTION", value: "Full canvas, horsehair padded" },
      { label: "LAPELS", value: "Notch lapel" },
      { label: "POCKETS", value: "Flap pockets, boat-shaped breast" },
      { label: "BUTTONS", value: "Horn buttons" },
      { label: "SHOULDER", value: "Pleated shoulder" },
      { label: "TROUSERS", value: "Flat front, zip fly, side adjusters" },
    ],
    occasions: ["Business", "Summer Formal", "Weddings", "Casual Smart"],
    relatedIds: ["002", "003", "201"],
    millOptions: SUIT_MILLS,
  },
  {
    id: "006", name: "Charcoal Grey Pinstripe DB", category: "Suits", slug: "charcoal-grey-pinstripe-db",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/BiulTpyoJMPOqBrQ.jpg",
    price: "HK$14,800", priceNote: "Bespoke from",
    tagline: "The City suit. Pinstripe double-breasted — authority in every thread.",
    description: "The double-breasted pinstripe suit is the most powerful garment in a man's wardrobe. Rooted in the City of London and Savile Row tradition, the chalk stripe or pin stripe double-breasted suit signals seniority, confidence, and an understanding of tailoring history. This cut features a 6×2 button stance with peaked lapels — the only correct lapel for a double-breasted suit — and a clean drape through the body.",
    fabricHighlight: "Holland & Sherry Pinstripe Super 120s",
    fabricDetails: [
      { label: "COMPOSITION", value: "100% Wool" },
      { label: "WEIGHT", value: "240–340 g/m² (subject to selection)" },
      { label: "MILL", value: "Subject to client selection" },
      { label: "THREAD COUNT", value: "Super 100s–200s (subject to selection)" },
      { label: "FINISH", value: "Pinstripe" },
      { label: "SEASON", value: "Year-round" },
    ],
    constructionDetails: [
      { label: "CONSTRUCTION", value: "Full canvas" },
      { label: "LAPELS", value: "Peak lapel (standard for DB)" },
      { label: "BUTTONS", value: "6×2 double-breasted" },
      { label: "LINING", value: "Silk or Bemberg cupro" },
      { label: "FITTINGS", value: "2–3 fittings" },
      { label: "LEAD TIME", value: "5–7 weeks" },
    ],
    occasions: ["Business", "Formal", "City", "Board Meetings"],
    relatedIds: ["007", "003", "001"],
    millOptions: SUIT_MILLS,
  },
  {
    id: "007", name: "Dark Grey Double Breasted", category: "Suits", slug: "dark-grey-double-breasted",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/ZJmCUyhPTHiSBKEX.jpg",
    price: "HK$14,800", priceNote: "Bespoke from",
    tagline: "Modern authority. The double-breasted suit for the contemporary executive.",
    description: "A dark grey double-breasted suit is a more understated alternative to the pinstripe DB — equally authoritative, but with a quieter confidence. The plain dark grey cloth allows the cut and construction to speak for themselves. This is the suit for executives who understand that the most powerful statement is often the most restrained one. Cut with a 6×2 button stance and peaked lapels.",
    fabricHighlight: "Vitale Barberis Canonico",
    fabricDetails: [
      { label: "COMPOSITION", value: "100% Wool" },
      { label: "WEIGHT", value: "240–340 g/m² (subject to selection)" },
      { label: "MILL", value: "Subject to client selection" },
      { label: "THREAD COUNT", value: "Super 100s–200s (subject to selection)" },
      { label: "FINISH", value: "Plain weave / Twill / Herringbone" },
      { label: "SEASON", value: "Year-round" },
    ],
    constructionDetails: [
      { label: "CONSTRUCTION", value: "Full canvas" },
      { label: "LAPELS", value: "Peak lapel" },
      { label: "BUTTONS", value: "6×2 double-breasted" },
      { label: "LINING", value: "Bemberg cupro" },
      { label: "FITTINGS", value: "2–3 fittings" },
      { label: "LEAD TIME", value: "5–7 weeks" },
    ],
    occasions: ["Business", "Formal", "Evening"],
    relatedIds: ["006", "003", "008"],
    millOptions: SUIT_MILLS,
  },
  {
    id: "008", name: "Black Suit", category: "Suits", slug: "black-suit",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/heiIXvqutPSXYsQT.jpg",
    price: "HK$12,800", priceNote: "Bespoke from",
    tagline: "For occasions that demand absolute formality. Cut without compromise.",
    description: "A black suit occupies a specific and important niche in a man's wardrobe — it is the suit for funerals, formal evening events, and occasions where the dress code demands the darkest possible option short of black tie. It is not an everyday business suit; it is a precision instrument for specific occasions. Cut in a clean two-button silhouette with a structured chest and minimal detailing.",
    fabricHighlight: "Vitale Barberis Super 120s Wool",
    fabricDetails: [
      { label: "COMPOSITION", value: "100% Wool" },
      { label: "WEIGHT", value: "240–340 g/m² (subject to selection)" },
      { label: "MILL", value: "Subject to client selection" },
      { label: "THREAD COUNT", value: "Super 100s–200s (subject to selection)" },
      { label: "FINISH", value: "Plain weave / Twill / Herringbone" },
      { label: "SEASON", value: "Year-round" },
    ],
    constructionDetails: [
      { label: "CONSTRUCTION", value: "Full canvas" },
      { label: "LAPELS", value: "Notch or peak" },
      { label: "BUTTONS", value: "2-button SB" },
      { label: "LINING", value: "Silk or Bemberg cupro" },
      { label: "FITTINGS", value: "2–3 fittings" },
      { label: "LEAD TIME", value: "4–6 weeks" },
    ],
    occasions: ["Formal", "Evening", "Funerals", "Galas"],
    relatedIds: ["009", "001", "007"],
    millOptions: SUIT_MILLS,
  },
  {
    id: "009", name: "Black Tuxedo", category: "Suits", slug: "black-tuxedo",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/HwrJYhmgykzHojMx.jpg",
    price: "HK$15,800", priceNote: "Bespoke from",
    tagline: "Black tie, perfected. The only tuxedo you will ever need.",
    description: "A bespoke tuxedo is one of the most worthwhile investments a man can make. Unlike a rented or off-the-rack dinner suit, a bespoke tuxedo fits precisely, wears beautifully, and lasts decades. This is a classic black single-breasted tuxedo with satin peak lapels, a single button, and satin-striped trousers — the correct and timeless specification. Hand-crafted from Pure S120s wool with a subtle sheen, sourced from Vitale Barberis and Holland & Sherry. Buttonholes are hand-stitched with silk, the lightweight horsehair canvas is padded by hand, and linings are fully hand-sewn.",
    fabricHighlight: "Vitale Barberis Barathea Wool",
    fabricDetails: [
      { label: "COMPOSITION", value: "100% Wool" },
      { label: "WEIGHT", value: "240–340 g/m² (subject to selection)" },
      { label: "MILL", value: "Subject to client selection" },
      { label: "THREAD COUNT", value: "Super 100s–200s (subject to selection)" },
      { label: "FINISH", value: "Barathea weave" },
      { label: "SEASON", value: "Year-round" },
    ],
    constructionDetails: [
      { label: "CONSTRUCTION", value: "Full canvas" },
      { label: "LAPELS", value: "Satin peak lapel" },
      { label: "BUTTONS", value: "1-button SB" },
      { label: "LINING", value: "Silk" },
      { label: "FITTINGS", value: "2–3 fittings" },
      { label: "LEAD TIME", value: "5–7 weeks" },
    ],
    occasions: ["Black Tie", "Galas", "Weddings", "Awards"],
    relatedIds: ["008", "001"],
    millOptions: TUXEDO_MILLS,
  },
  // ── BLAZERS ────────────────────────────────────────────────────────────────
  {
    id: "010", name: "Dark Navy Blazer", category: "Blazers", slug: "dark-navy-blazer",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/obhGYlwXMWixoiXP.jpg",
    price: "HK$8,800", priceNote: "Bespoke from",
    tagline: "The blazer that does everything. Dark navy, precisely cut.",
    description: "In the enigmatic depths of dark navy, this single-breasted blazer stands as a paragon of understated authority, entirely hand-crafted from Pure S150s wool from Vitale Barberis. Buttonholes are hand-stitched with silk, the lightweight horsehair full canvas is padded by hand, and the unlined interior with patch pockets speaks to a relaxed confidence. Wear with grey flannel trousers for a classic business look, ivory chinos for smart casual, or dark denim for a polished weekend appearance.",
    fabricHighlight: "Pure S150s Wool — Vitale Barberis",
    fabricDetails: [
      { label: "COMPOSITION", value: "100% Wool" },
      { label: "THREAD COUNT", value: "Super 100s–200s (subject to selection)" },
      { label: "MILL", value: "Subject to client selection" },
      { label: "FINISH", value: "Plain weave / Twill / Herringbone" },
      { label: "SEASON", value: "Year-round" },
    ],
    constructionDetails: [
      { label: "CONSTRUCTION", value: "Full canvas, horsehair padded" },
      { label: "LAPELS", value: "Notch lapel" },
      { label: "POCKETS", value: "Patch pockets" },
      { label: "BUTTONS", value: "Horn buttons" },
      { label: "LINING", value: "Unlined interior" },
      { label: "VENTS", value: "Double vented" },
    ],
    occasions: ["Business Casual", "Smart Casual", "Travel", "Weekends"],
    relatedIds: ["011", "201", "202"],
    millOptions: BLAZER_MILLS,
  },
  {
    id: "011", name: "Navy Blazer", category: "Blazers", slug: "navy-blazer",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/PmAHRBUiaBlSGhii.jpg",
    price: "HK$8,800", priceNote: "Bespoke from",
    tagline: "Classic navy. The blazer that has never been out of style.",
    description: "The navy blazer is perhaps the single most important garment in the history of menswear. From its origins as a naval uniform to its adoption by Savile Row as the definitive smart-casual garment, the navy blazer has remained relevant for over a century. Hand-crafted from Pure S150s wool from Vitale Barberis, with silk-stitched buttonholes, a hand-padded horsehair canvas, and an unlined interior with patch pockets — the correct specification for a blazer that will serve for decades.",
    fabricHighlight: "Pure S150s Wool — Vitale Barberis",
    fabricDetails: [
      { label: "COMPOSITION", value: "100% Wool" },
      { label: "THREAD COUNT", value: "Super 100s–200s (subject to selection)" },
      { label: "MILL", value: "Subject to client selection" },
      { label: "FINISH", value: "Plain weave / Twill / Herringbone" },
      { label: "SEASON", value: "Year-round" },
    ],
    constructionDetails: [
      { label: "CONSTRUCTION", value: "Full canvas, horsehair padded" },
      { label: "LAPELS", value: "Notch lapel" },
      { label: "POCKETS", value: "Patch pockets" },
      { label: "BUTTONS", value: "Horn buttons" },
      { label: "LINING", value: "Unlined interior" },
      { label: "VENTS", value: "Double vented" },
    ],
    occasions: ["Business Casual", "Smart Casual", "Weekends", "Travel"],
    relatedIds: ["010", "201", "202"],
    millOptions: BLAZER_MILLS,
  },
  // ── TROUSERS ───────────────────────────────────────────────────────────────
  {
    id: "201", name: "Light Grey Flannel Pants", category: "Trousers", slug: "light-grey-flannel-pants",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/UWwCBVIXIYjINQjZ.jpg",
    price: "HK$2,800", priceNote: "Bespoke from",
    tagline: "The trouser that pairs with everything. Flannel, precisely cut.",
    description: "Light grey flannel trousers are the most versatile trouser a man can own. They pair with navy blazers, tweed jackets, and cashmere sweaters with equal ease, and can be dressed up with a white shirt and tie or down with a polo shirt. Flannel has a warmth and texture that smooth worsted wool cannot replicate, and it drapes beautifully when cut correctly.",
    fabricHighlight: "Dormeuil Flannel Super 100s",
    fabricDetails: [
      { label: "COMPOSITION", value: "100% Wool" },
      { label: "WEIGHT", value: "240–340 g/m² (subject to selection)" },
      { label: "MILL", value: "Subject to client selection" },
      { label: "THREAD COUNT", value: "Super 100s–200s (subject to selection)" },
      { label: "FINISH", value: "Flannel" },
      { label: "SEASON", value: "Autumn / Winter" },
    ],
    constructionDetails: [
      { label: "WAISTBAND", value: "Extended waistband or belt loops" },
      { label: "PLEATS", value: "Flat front or single pleat" },
      { label: "BREAK", value: "Slight or no break" },
      { label: "FITTINGS", value: "1–2 fittings" },
      { label: "LEAD TIME", value: "3–4 weeks" },
    ],
    occasions: ["Business Casual", "Smart Casual", "Weekends"],
    relatedIds: ["202", "010", "011"],
    millOptions: TROUSER_MILLS,
  },
  {
    id: "202", name: "Ivory Chinos", category: "Trousers", slug: "ivory-chinos",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/egwIBWRfgUJZMEch.jpg",
    price: "HK$2,800", priceNote: "Bespoke from",
    tagline: "The warm-weather essential. Clean ivory, perfectly proportioned.",
    description: "Ivory or off-white chinos are a warm-weather essential that most men overlook in favour of beige or khaki. The cleaner, brighter tone of ivory pairs beautifully with navy, dark green, and burgundy, and works equally well in cotton or a cotton-linen blend for Hong Kong's subtropical summers. Cut with a clean flat front and a slight taper through the leg.",
    fabricHighlight: "Thomas Mason Cotton-Linen Blend",
    fabricDetails: [
      { label: "COMPOSITION", value: "70% Cotton / 30% Linen" },
      { label: "WEIGHT", value: "240–340 g/m² (subject to selection)" },
      { label: "MILL", value: "Thomas Mason, Albini Group" },
      { label: "FINISH", value: "Twill weave" },
      { label: "SEASON", value: "Spring / Summer" },
    ],
    constructionDetails: [
      { label: "WAISTBAND", value: "Belt loops" },
      { label: "PLEATS", value: "Flat front" },
      { label: "BREAK", value: "Slight or no break" },
      { label: "FITTINGS", value: "1–2 fittings" },
      { label: "LEAD TIME", value: "3–4 weeks" },
    ],
    occasions: ["Smart Casual", "Weekends", "Summer Business Casual"],
    relatedIds: ["201", "010", "011"],
    millOptions: TROUSER_MILLS,
  },
  // ── SHIRTS ─────────────────────────────────────────────────────────────────
  {
    id: "301", name: "White Shirt", category: "Shirts", slug: "white-shirt",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/KVgzkgDrbzwsZQhk.jpg",
    price: "HK$880", priceNote: "Bespoke from",
    tagline: "The foundation of every outfit. White, perfectly fitted.",
    description: "In the pristine clarity of white, this single-cuff bespoke shirt emerges as a foundation of sartorial refinement, meticulously crafted from your choice of house cotton, Italian cotton, or Swiss cotton. These fabrics, selected for their four-season breathability, offer a silken drape that ensures comfort across climates. Longer tails in the traditional manner maintain a tucked-in composure, asymmetrically set armholes allow for effortless ironing, and natural mother-of-pearl buttons lend an iridescent sheen. Tailored for boardroom presentations or formal luncheons, its luminous hue exudes versatility.",
    fabricHighlight: "100% Cotton — House, Italian, or Swiss",
    fabricDetails: [
      { label: "COMPOSITION", value: "100% Cotton" },
      { label: "CLOTH", value: "House, Italian, or Swiss cotton" },
      { label: "BUTTONS", value: "Natural mother-of-pearl" },
      { label: "FINISH", value: "Poplin / Twill / Oxford" },
      { label: "SEASON", value: "Year-round" },
    ],
    constructionDetails: [
      { label: "COLLAR", value: "Spread collar" },
      { label: "CUFFS", value: "Single cuff" },
      { label: "STITCHING", value: "Ultra-fine" },
      { label: "INTERLINING", value: "Soft in cuff and collar" },
      { label: "ARMHOLE", value: "Offset seam for easy ironing" },
      { label: "TAILS", value: "Long tails, traditional style" },
    ],
    occasions: ["Business", "Formal", "Casual Smart", "All occasions"],
    relatedIds: ["302", "303", "001"],
    millOptions: SHIRT_MILLS,
  },
  {
    id: "302", name: "Light Blue Shirt", category: "Shirts", slug: "light-blue-shirt",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/WqPUqZQVzSZcZbCo.jpg",
    price: "HK$880", priceNote: "Bespoke from",
    tagline: "The second shirt every man needs. Softer than white, smarter than colour.",
    description: "The pale blue single-cuff shirt radiates subtle versatility, meticulously crafted from your choice of house cotton, Italian cotton, or Swiss cotton. Engineered for all-season resilience, these textiles offer a plush drape that navigates climates with ease. Longer tails in the traditional manner maintain a tucked-in composure, asymmetrically set armholes allow for effortless ironing, and natural mother-of-pearl buttons lend an iridescent sheen. Ideal for corporate dialogues or advisory roles, its serene hue instills confidence. Pair with navy or mid grey suits to heighten its tranquil poise.",
    fabricHighlight: "100% Cotton — House, Italian, or Swiss",
    fabricDetails: [
      { label: "COMPOSITION", value: "100% Cotton" },
      { label: "CLOTH", value: "House, Italian, or Swiss cotton" },
      { label: "BUTTONS", value: "Natural mother-of-pearl" },
      { label: "FINISH", value: "Poplin / Twill / Oxford" },
      { label: "SEASON", value: "Year-round" },
    ],
    constructionDetails: [
      { label: "COLLAR", value: "Spread collar" },
      { label: "CUFFS", value: "Single cuff" },
      { label: "STITCHING", value: "Ultra-fine" },
      { label: "INTERLINING", value: "Soft in cuff and collar" },
      { label: "ARMHOLE", value: "Offset seam for easy ironing" },
      { label: "SIDE", value: "Gusset" },
    ],
    occasions: ["Business", "Casual Smart", "Weekends"],
    relatedIds: ["301", "303", "004"],
    millOptions: SHIRT_MILLS,
  },
  {
    id: "303", name: "Light Pink Shirt", category: "Shirts", slug: "light-pink-shirt",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/muEGXoshhQGCUQTr.jpg",
    price: "HK$880", priceNote: "Bespoke from",
    tagline: "A touch of character. Pink — the shirt that elevates any suit.",
    description: "In the soft warmth of pink, this French-cuff bespoke shirt stands as a subtle statement of sophistication, meticulously crafted from your choice of house cotton, Italian cotton, or Swiss cotton. Chosen for their four-season versatility, these fabrics provide a gossamer drape that thrives across climates. Longer tails in the traditional manner maintain a tucked-in composure, asymmetrically set armholes allow for effortless ironing, and natural mother-of-pearl buttons lend an iridescent sheen. Pair with light grey or navy suits to amplify its ethereal glow.",
    fabricHighlight: "100% Cotton — House, Italian, or Swiss",
    fabricDetails: [
      { label: "COMPOSITION", value: "100% Cotton" },
      { label: "CLOTH", value: "House, Italian, or Swiss cotton" },
      { label: "BUTTONS", value: "Natural mother-of-pearl" },
      { label: "FINISH", value: "Poplin / Twill / Oxford" },
      { label: "SEASON", value: "Year-round" },
    ],
    constructionDetails: [
      { label: "COLLAR", value: "Spread collar" },
      { label: "CUFFS", value: "French cuff" },
      { label: "STITCHING", value: "Ultra-fine" },
      { label: "INTERLINING", value: "Soft in cuff and collar" },
      { label: "ARMHOLE", value: "Offset seam for easy ironing" },
      { label: "SIDE", value: "Gusset" },
    ],
    occasions: ["Business", "Casual Smart", "Client Meetings"],
    relatedIds: ["301", "302", "002"],
    millOptions: SHIRT_MILLS,
  },
  // ── OVERCOATS ──────────────────────────────────────────────────────────────
  {
    id: "501", name: "Black Overcoat", category: "Overcoats", slug: "black-overcoat",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/HOkQPWLKCHoIdruX.jpg",
    price: "HK$18,800", priceNote: "Bespoke from",
    tagline: "The most powerful outerwear a man can own. Black, precisely cut.",
    description: "A black overcoat is the single most powerful piece of outerwear in a man's wardrobe. It elevates every suit beneath it, reads as authoritative in every context, and never goes out of style. This is a classic single-breasted overcoat cut to knee length, with a structured shoulder and a clean drape through the body. Available in cashmere, cashmere-wool blend, and premium melton wool.",
    fabricHighlight: "100% Wool Flannel — Vitale Barberis",
    fabricDetails: [
      { label: "COMPOSITION", value: "100% Wool" },
      { label: "FABRIC", value: "Wool Flannel" },
      { label: "MILL", value: "Subject to client selection" },
      { label: "FINISH", value: "Flannel" },
      { label: "SEASON", value: "Autumn / Winter" },
    ],
    constructionDetails: [
      { label: "CONSTRUCTION", value: "Full canvas, horsehair padded" },
      { label: "LAPELS", value: "Notch lapel" },
      { label: "POCKETS", value: "Welted pockets, boat-shaped breast" },
      { label: "CLOSURE", value: "2.5-button single-breasted" },
      { label: "BUTTONS", value: "Horn buttons" },
      { label: "VENTS", value: "Double vented" },
    ],
    occasions: ["Business", "Formal", "Travel", "Winter"],
    relatedIds: ["502", "503", "001"],
    millOptions: OVERCOAT_MILLS,
  },
  {
    id: "502", name: "Dark Grey Overcoat", category: "Overcoats", slug: "dark-grey-overcoat",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/vBwbKqfoaJHEtjQC.jpg",
    price: "HK$10,800", priceNote: "Bespoke from",
    tagline: "Understated authority. Dark grey — the overcoat for every occasion.",
    description: "The charcoal grey single-breasted overcoat exudes resolute authority, entirely hand-crafted from Pure S150s wool from illustrious Italian purveyors. A testament to sartorial virtuosity, each garment is hand-formed with full-canvas interlining padded manually using lightweight horsehair that moulds to the contours of the body across time, complemented by buttonholes meticulously stitched with silk. Timeless in its silhouette — proportioned with a classic notch and enduring lines — this overcoat defies ephemeral fashions, promising steadfast relevance.",
    fabricHighlight: "100% Wool Flannel — Vitale Barberis",
    fabricDetails: [
      { label: "COMPOSITION", value: "100% Wool" },
      { label: "FABRIC", value: "Wool Flannel" },
      { label: "MILL", value: "Subject to client selection" },
      { label: "FINISH", value: "Flannel" },
      { label: "SEASON", value: "Autumn / Winter" },
    ],
    constructionDetails: [
      { label: "CONSTRUCTION", value: "Full canvas, horsehair padded" },
      { label: "LAPELS", value: "Notch lapel" },
      { label: "POCKETS", value: "Welted pockets, boat-shaped breast" },
      { label: "CLOSURE", value: "2.5-button single-breasted" },
      { label: "BUTTONS", value: "Horn buttons" },
      { label: "VENTS", value: "Double vented" },
    ],
    occasions: ["Business", "Formal", "Travel", "Winter"],
    relatedIds: ["501", "504", "003"],
    millOptions: OVERCOAT_MILLS,
  },
  {
    id: "503", name: "Dark Navy Overcoat", category: "Overcoats", slug: "dark-navy-overcoat",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/VwArcFQaPquFIJZs.jpg",
    price: "HK$10,800", priceNote: "Bespoke from",
    tagline: "Naval heritage, modern cut. Dark navy — the classic overcoat.",
    description: "In the enigmatic depths of dark navy, this single-breasted overcoat stands as a paragon of understated authority, entirely hand-crafted from Pure S150s wool from esteemed Italian mills. Each garment is hand-formed with full-canvas interlining padded manually using lightweight horsehair that moulds to the contours of the body across time, complemented by buttonholes meticulously stitched with silk. Timeless in its silhouette — proportioned with a classic notch and enduring lines — this overcoat pairs beautifully with grey, navy, and charcoal suits.",
    fabricHighlight: "100% Wool Flannel — Vitale Barberis",
    fabricDetails: [
      { label: "COMPOSITION", value: "100% Wool" },
      { label: "FABRIC", value: "Wool Flannel" },
      { label: "MILL", value: "Subject to client selection" },
      { label: "FINISH", value: "Flannel" },
      { label: "SEASON", value: "Autumn / Winter" },
    ],
    constructionDetails: [
      { label: "CONSTRUCTION", value: "Full canvas, horsehair padded" },
      { label: "LAPELS", value: "Notch lapel" },
      { label: "POCKETS", value: "Welted pockets, boat-shaped breast" },
      { label: "CLOSURE", value: "2.5-button single-breasted" },
      { label: "BUTTONS", value: "Horn buttons" },
      { label: "VENTS", value: "Double vented" },
    ],
    occasions: ["Business", "Formal", "Travel", "Winter"],
    relatedIds: ["504", "501", "004"],
    millOptions: OVERCOAT_MILLS,
  },
  {
    id: "504", name: "Navy Overcoat", category: "Overcoats", slug: "navy-overcoat",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/nFWodFNNZKgiIfRJ.jpg",
    price: "HK$10,800", priceNote: "Bespoke from",
    tagline: "The most versatile overcoat. Navy — pairs with everything.",
    description: "Navy is the most versatile overcoat colour for the same reason navy is the most versatile suit colour — it pairs with every other colour in a man's wardrobe. A navy overcoat over a grey suit is a classic combination; over a navy suit it creates a tonal look of considerable elegance. Hand-crafted from Pure S150s wool from esteemed Italian mills, with full-canvas interlining padded manually using lightweight horsehair and buttonholes meticulously stitched with silk.",
    fabricHighlight: "100% Wool Flannel — Vitale Barberis",
    fabricDetails: [
      { label: "COMPOSITION", value: "100% Wool" },
      { label: "FABRIC", value: "Wool Flannel" },
      { label: "MILL", value: "Subject to client selection" },
      { label: "FINISH", value: "Flannel" },
      { label: "SEASON", value: "Autumn / Winter" },
    ],
    constructionDetails: [
      { label: "CONSTRUCTION", value: "Full canvas, horsehair padded" },
      { label: "LAPELS", value: "Notch lapel" },
      { label: "POCKETS", value: "Welted pockets, boat-shaped breast" },
      { label: "CLOSURE", value: "2.5-button single-breasted" },
      { label: "BUTTONS", value: "Horn buttons" },
      { label: "VENTS", value: "Double vented" },
    ],
    occasions: ["Business", "Formal", "Travel", "Winter"],
    relatedIds: ["503", "505", "004"],
    millOptions: OVERCOAT_MILLS,
  },
  {
    id: "505", name: "Light Grey Overcoat", category: "Overcoats", slug: "light-grey-overcoat",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/olGPRdncWTHtdQNq.jpg",
    price: "HK$10,800", priceNote: "Bespoke from",
    tagline: "Quiet luxury. Light grey — the overcoat that turns heads.",
    description: "The light grey single-breasted overcoat evokes luminous adaptability, meticulously hand-crafted from Pure S150s wool from elite Italian sources. In a sea of black and navy overcoats, light grey stands apart as a statement of confidence and refinement. Dorsia overcoats boast full-canvas layered by hand with featherlight horsehair that yields to the form through usage, and buttonholes artisanally threaded in silk. Its perennial harmony — a notch lapel and classic contour — ensures defiance of vogue's caprice.",
    fabricHighlight: "100% Wool Flannel — Vitale Barberis",
    fabricDetails: [
      { label: "COMPOSITION", value: "100% Wool" },
      { label: "FABRIC", value: "Wool Flannel" },
      { label: "MILL", value: "Subject to client selection" },
      { label: "FINISH", value: "Flannel" },
      { label: "SEASON", value: "Autumn / Winter" },
    ],
    constructionDetails: [
      { label: "CONSTRUCTION", value: "Full canvas, horsehair padded" },
      { label: "LAPELS", value: "Notch lapel" },
      { label: "POCKETS", value: "Welted pockets, boat-shaped breast" },
      { label: "CLOSURE", value: "2.5-button single-breasted" },
      { label: "BUTTONS", value: "Horn buttons" },
      { label: "VENTS", value: "Double vented" },
    ],
    occasions: ["Business", "Formal", "Travel", "Winter"],
    relatedIds: ["502", "504", "005"],
    millOptions: OVERCOAT_MILLS,
  },
  {
    id: "506", name: "Mid Brown Overcoat", category: "Overcoats", slug: "mid-brown-overcoat",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/BYULNImuvqmTYmBW.jpg",
    price: "HK$10,800", priceNote: "Bespoke from",
    tagline: "The most underrated overcoat colour. Brown — warm, rich, and distinctive.",
    description: "The camel single-breasted overcoat evokes warm adaptability, meticulously hand-crafted from a Pure Cashmere-Wool blend from elite Italian sources. Brown is the most underrated colour in a man's overcoat wardrobe — it pairs beautifully with grey and navy suits, and has a warmth and richness that cooler colours cannot replicate. Hand-formed with full-canvas interlining padded manually using lightweight horsehair, with buttonholes meticulously stitched with silk for a legacy of refinement.",
    fabricHighlight: "100% Wool Flannel — Vitale Barberis",
    fabricDetails: [
      { label: "COMPOSITION", value: "100% Wool" },
      { label: "FABRIC", value: "Wool Flannel" },
      { label: "MILL", value: "Subject to client selection" },
      { label: "FINISH", value: "Flannel" },
      { label: "SEASON", value: "Autumn / Winter" },
    ],
    constructionDetails: [
      { label: "CONSTRUCTION", value: "Full canvas, horsehair padded" },
      { label: "LAPELS", value: "Notch lapel" },
      { label: "POCKETS", value: "Welted pockets, boat-shaped breast" },
      { label: "CLOSURE", value: "2.5-button single-breasted" },
      { label: "BUTTONS", value: "Horn buttons" },
      { label: "VENTS", value: "Double vented" },
    ],
    occasions: ["Business", "Smart Casual", "Travel", "Winter"],
    relatedIds: ["505", "501", "010"],
    millOptions: OVERCOAT_MILLS,
  },
];

export default function ProductPage() {
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  const { slug } = useParams<{ slug: string }>();
  const { toggleFavourite, isFavourite, sendEnquiry, count } = useFavourites();
  const [activeTab, setActiveTab] = useState<"fabric" | "construction">("fabric");
  const [added, setAdded] = useState(false);
  const [selectedMill, setSelectedMill] = useState<string | null>(null);
  const [pricingTier, setPricingTier] = useState<"bespoke" | "mtm">("bespoke");
  const [selectedSize, setSelectedSize] = useState<string>("");

  const product = ALL_PRODUCTS.find(p => p.slug === slug);
  const related = product ? ALL_PRODUCTS.filter(p => product.relatedIds.includes(p.id)) : [];

  // Dynamic SEO per product
  useSEO(product ? {
    title: `${product.name} — Bespoke ${product.category} Hong Kong | Tailors.hk`,
    description: `${product.description.slice(0, 155)}`,
    canonical: `https://tailors.hk/tailored-menswear/${product.slug}`,
    schema: [
      SCHEMAS.breadcrumb([
        { name: 'Home', url: '/' },
        { name: 'Tailored Menswear', url: '/tailored-menswear' },
        { name: product.name, url: `/tailored-menswear/${product.slug}` },
      ]),
      SCHEMAS.product({
        name: product.name,
        description: product.description,
        image: product.img,
        price: product.price.replace(/[^0-9]/g, ''),
        url: `/tailored-menswear/${product.slug}`,
        sku: product.id,
      }),
    ],
  } : {
    title: 'Bespoke Tailored Menswear Hong Kong | Tailors.hk',
    description: 'Handcrafted bespoke suits, shirts, blazers and trousers from Tailors.hk — atelier direct rates from HK$12,800.',
    canonical: 'https://tailors.hk/tailored-menswear',
  });

  // Reset mill selection when navigating to a different product
  useEffect(() => {
    setSelectedMill(null);
    setPricingTier("bespoke");
    setSelectedSize("");
  }, [slug]);

  // Derived price: always show bespoke price — pricingTier is a service preference for the enquiry only, not a price switch
  const displayMill = product?.millOptions?.find(m => m.mill === selectedMill) ?? product?.millOptions?.[0] ?? null;
  const displayPrice = displayMill ? displayMill.price : product?.price ?? "";

  // RRP equivalent by category and mill tier
  const displayRrp = (() => {
    const cat = product?.category ?? "";
    const tier = displayMill?.tier ?? "entry";
    if (cat === "Shirts") {
      return tier === "gold" ? "HK$3,800" : tier === "mid" ? "HK$2,600" : "HK$1,800";
    }
    if (cat === "Overcoats") {
      return tier === "gold" ? "HK$88,000" : tier === "mid" ? "HK$58,000" : "HK$38,000";
    }
    if (cat === "Trousers") {
      return tier === "gold" ? "HK$12,000" : tier === "mid" ? "HK$8,800" : "HK$6,800";
    }
    if (cat === "Blazers") {
      return tier === "gold" ? "HK$38,000" : tier === "mid" ? "HK$28,000" : "HK$18,000";
    }
    // Suits & Tuxedo
    return tier === "gold" ? "HK$58,000" : tier === "mid" ? "HK$38,000" : "HK$28,000";
  })();

  if (!product) {
    return (
      <main style={{ backgroundColor: "#fff" }}>
        <Navigation />
        <div className="container" style={{ paddingTop: "120px", paddingBottom: "120px", textAlign: "center" }}>
          <p style={{ fontFamily: F.mono, fontSize: "11px", color: "#aaa", letterSpacing: "0.1em" }}>PRODUCT NOT FOUND</p>
          <Link href="/tailored-menswear">
            <span style={{ fontFamily: F.mono, fontSize: "10px", letterSpacing: "0.1em", color: "#111", borderBottom: "1px solid #111", cursor: "pointer" }}>← BACK TO MENSWEAR</span>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const fav = isFavourite(product.id);

  const handleToggle = () => {
    toggleFavourite({
      id: product.id,
      name: product.name,
      category: product.category,
      price: displayMill?.price ?? product.price,
      img: product.img,
      mill: displayMill ? `${displayMill.mill} · ${displayMill.origin}` : undefined,
    });
    if (!fav) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <main style={{ backgroundColor: "#fff", overflowX: "hidden" }}>
      <Navigation />

      {/* Breadcrumb */}
      <div style={{ borderBottom: "1px solid #e8e8e8" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", gap: "6px", paddingTop: "14px", paddingBottom: "14px", overflow: "hidden", minWidth: 0 }}>
          <Link href="/tailored-menswear" style={{ flexShrink: 0 }}>
            <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", cursor: "pointer", whiteSpace: "nowrap" }}>MENSWEAR</span>
          </Link>
          <span style={{ fontFamily: F.mono, fontSize: "9px", color: "#ccc", flexShrink: 0 }}>›</span>
          {!isMobile && (
            <>
              <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", whiteSpace: "nowrap", flexShrink: 0 }}>{product.category.toUpperCase()}</span>
              <span style={{ fontFamily: F.mono, fontSize: "9px", color: "#ccc", flexShrink: 0 }}>›</span>
            </>
          )}
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#555", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>{product.name.toUpperCase()}</span>
        </div>
      </div>

      {/* Main Product Layout — mobile: full-bleed image + padded text; desktop: 2-col grid */}
      {/* Mobile image: full-bleed, shown only on mobile */}
      {isMobile && (
        <div style={{ position: "relative", overflow: "hidden", backgroundColor: "#f4f4f2" }}>
          <img
            src={product.img}
            alt={`${product.name} — Bespoke tailored ${product.category.toLowerCase()} Hong Kong`}
            style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }}
          />
          <div style={{ position: "absolute", top: "12px", left: "12px", backgroundColor: "rgba(17,17,17,0.75)", padding: "4px 8px" }}>
            <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#fff" }}>{product.id}</span>
          </div>
        </div>
      )}
      <div className="container" style={{ paddingTop: isMobile ? "28px" : "48px", paddingBottom: isMobile ? "120px" : "80px" }}>
        {/* Desktop: 2-col grid; Mobile: single column (image already rendered above) */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "0" : "64px" }}>
          {/* Left: Image — desktop only. Outer div stretches to full row height; inner div is sticky */}
          {!isMobile && (
            <div style={{ position: "sticky", top: "80px", alignSelf: "start" }}>
              <div style={{ position: "relative", overflow: "hidden", backgroundColor: "#f4f4f2" }}>
                <img
                  src={product.img}
                  alt={`${product.name} — Bespoke tailored ${product.category.toLowerCase()} Hong Kong`}
                  style={{ width: "100%", aspectRatio: "2/3", objectFit: "cover", display: "block" }}
                />
                <div style={{ position: "absolute", top: "12px", left: "12px", backgroundColor: "rgba(17,17,17,0.75)", padding: "4px 8px" }}>
                  <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#fff" }}>{product.id}</span>
                </div>
              </div>
            </div>
          )}
          {/* Right: Details */}
          <div>
            {/* Category label */}
            <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", color: "#aaa", display: "block", marginBottom: "10px" }}>
              {product.category.toUpperCase()} · HONG KONG BESPOKE
            </span>

            {/* Title */}
            <h1 style={{ fontFamily: F.display, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#111", lineHeight: 1.05, marginBottom: "12px" }}>
              {product.name}
            </h1>

            {/* Tagline */}
            <p style={{ fontFamily: F.body, fontSize: "15px", lineHeight: 1.6, color: "#555", marginBottom: "24px", fontStyle: "italic" }}>
              {product.tagline}
            </p>

            {/* Mill Selector (suits & blazers only) */}
            {product.millOptions && product.millOptions.length > 0 && (
              <div style={{ marginBottom: "24px" }}>
                {/* Bespoke / MTM tier toggle */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#aaa" }}>SELECT CLOTH MILL</span>
                  <div style={{ display: "flex", border: "1px solid #d8d8d8", overflow: "hidden" }}>
                    {(["bespoke", "mtm"] as const).map((tier) => (
                      <button
                        key={tier}
                        onClick={() => setPricingTier(tier)}
                        style={{
                          fontFamily: F.mono,
                          fontSize: "8px",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          padding: "5px 12px",
                          border: "none",
                          borderLeft: tier === "mtm" ? "1px solid #d8d8d8" : "none",
                          backgroundColor: pricingTier === tier ? "#111" : "#fff",
                          color: pricingTier === tier ? "#fff" : "#888",
                          cursor: "pointer",
                          transition: "all 0.1s",
                        }}
                      >
                        {tier === "bespoke" ? "Bespoke" : "MTM"}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Tier explainer */}
                <p style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.04em", color: "#aaa", lineHeight: 1.6, marginBottom: "10px" }}>
                  {pricingTier === "bespoke"
                    ? "Bespoke — a pattern drafted entirely to your measurements. Full horsehair canvas, hand-padded lapels, silk-stitched buttonholes. 3–5 fittings over 8–12 weeks."
                    : "Made-to-Measure — the same handcrafted construction as bespoke. A proven block adjusted to your proportions. 1–2 fittings, delivered in 4–6 weeks."}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: product.millOptions.length === 3 ? "1fr 1fr 1fr" : "1fr 1fr", gap: "6px" }}>
                  {product.millOptions.map((opt) => {
                    const isSelected = (selectedMill === null && opt === product.millOptions![0]) || selectedMill === opt.mill;
                    const isGold = opt.tier === "gold";
                    const goldBg = "#b8922a";
                    const goldBorder = "#c9a84c";
                    const goldText = "#fff";
                    const goldSub = "rgba(255,255,255,0.75)";
                    return (
                      <button
                        key={opt.mill}
                        onClick={() => setSelectedMill(opt.mill)}
                        style={{
                          textAlign: "left",
                          padding: "12px 14px",
                          border: isSelected
                            ? `1.5px solid ${isGold ? goldBorder : "#111"}`
                            : isGold
                            ? `1px solid ${goldBorder}`
                            : "1px solid #d8d8d8",
                          backgroundColor: isSelected
                            ? isGold ? goldBg : "#111"
                            : isGold ? "#fdf8ee" : "#fff",
                          cursor: "pointer",
                          transition: "all 0.12s",
                          position: "relative" as const,
                        }}
                      >
                        {isGold && (
                          <div style={{ position: "absolute", top: "6px", right: "8px", fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.1em", color: isSelected ? goldText : goldBorder, textTransform: "uppercase" as const }}>◆ GOLD</div>
                        )}
                        <div style={{ fontFamily: F.display, fontSize: "10px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: isSelected ? (isGold ? goldText : "#fff") : isGold ? goldBorder : "#111", marginBottom: "2px", lineHeight: 1.3 }}>
                          {opt.shortName}
                        </div>
                        <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.04em", color: isSelected ? (isGold ? goldSub : "rgba(255,255,255,0.65)") : isGold ? "#a07830" : "#999", marginBottom: "4px" }}>
                          {opt.origin}
                        </div>
                        <div style={{ fontFamily: F.display, fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em", color: isSelected ? (isGold ? goldText : "rgba(255,255,255,0.9)") : isGold ? goldBorder : "#555" }}>
                          {pricingTier === "mtm" ? opt.mtmPrice : opt.price}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {displayMill && (
                  <div style={{ marginTop: "8px", fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.06em", color: "#888", textTransform: "uppercase" as const }}>
                    {displayMill.mill} · {displayMill.description}
                  </div>
                )}
              </div>
            )}
            {/* Price */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "28px", paddingBottom: "28px", borderBottom: "1px solid #e8e8e8" }}>
              <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa" }}>ATELIER DIRECT · FROM</span>
              <span style={{ fontFamily: F.display, fontSize: "28px", fontWeight: 700, letterSpacing: "0.04em", color: "#111", display: "inline-flex", alignItems: "center" }}>{displayPrice}<RrpTooltip theme="light" rrp={displayRrp} /></span>
            </div>

            {/* Atelier Direct Benchmark link */}
            <div style={{ marginBottom: "16px" }}>
              <Link href="/about#quality-index">
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: F.mono,
                  fontSize: "8px",
                  letterSpacing: "0.1em",
                  color: "#888",
                  textTransform: "uppercase",
                  borderBottom: "1px solid #ddd",
                  paddingBottom: "2px",
                  cursor: "pointer",
                  transition: "color 0.15s",
                }}>
                  <span style={{ fontSize: "10px" }}>◆</span>
                  Atelier Direct Benchmark · View Quality Index
                  <span style={{ fontSize: "9px" }}>→</span>
                </span>
              </Link>
            </div>

            {/* Volume pricing note */}
            <div style={{ marginBottom: "20px", padding: "10px 14px", backgroundColor: "#f8f8f8", borderLeft: "2px solid #ccc" }}>
              <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: "#888", display: "block", marginBottom: "4px" }}>VOLUME ORDERS</span>
              <span style={{ fontFamily: F.body, fontSize: "12px", color: "#555", lineHeight: 1.6 }}>
                Essential suiting (MTM) from HK$8,800 per suit — minimum 3 suits. <a href="/contact?type=corporate" style={{ color: "#111", textDecoration: "underline" }}>Enquire for corporate rates.</a>
              </span>
            </div>

            {/* Description */}
            <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.8, color: "#555", marginBottom: "32px" }}>
              {product.description}
            </p>

            {/* Occasions */}
            <div style={{ marginBottom: "32px" }}>
              <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#aaa", display: "block", marginBottom: "10px" }}>OCCASIONS</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {product.occasions.map(occ => (
                  <span key={occ} style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: "#555", border: "1px solid #ddd", padding: "4px 10px", textTransform: "uppercase" as const }}>
                    {occ.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Fabric Highlight */}
            <div style={{ backgroundColor: "#f4f4f2", padding: "16px", marginBottom: "32px", borderLeft: "3px solid #111" }}>
              <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "4px" }}>SUGGESTED FABRIC</span>
              <span style={{ fontFamily: F.display, fontSize: "14px", fontWeight: 600, letterSpacing: "0.06em", color: "#111" }}>{product.fabricHighlight}</span>
            </div>

            {/* Specs Tabs */}
            <div style={{ marginBottom: "32px" }}>
              <div style={{ display: "flex", borderBottom: "1px solid #e8e8e8", marginBottom: "20px" }}>
                {(["fabric", "construction"] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", textTransform: "uppercase",
                      padding: "10px 16px", border: "none", background: "none", cursor: "pointer",
                      borderBottom: activeTab === tab ? "2px solid #111" : "2px solid transparent",
                      color: activeTab === tab ? "#111" : "#aaa",
                      transition: "color 0.15s",
                    }}
                  >
                    {tab === "fabric" ? "Fabric Specifications" : "Construction Details"}
                  </button>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "0" }}>
                {(activeTab === "fabric" ? product.fabricDetails : product.constructionDetails).map((spec, i) => (
                  <div key={spec.label} style={{
                    padding: "10px 0",
                    borderBottom: "1px solid #f0f0f0",
                    gridColumn: "span 1",
                  }}>
                    <span style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.1em", color: "#bbb", display: "block", marginBottom: "3px" }}>{spec.label}</span>
                    <span style={{ fontFamily: F.body, fontSize: "13px", color: "#333" }}>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div style={{ marginBottom: "28px", paddingBottom: "28px", borderBottom: "1px solid #e8e8e8" }}>
              <SizeSelector
                sizes={product.category === "Shirts" ? SHIRT_SIZES : product.category === "Trousers" ? TROUSER_SIZES : JACKET_SIZES}
                selectedSize={selectedSize}
                onSelect={setSelectedSize}
                label={product.category === "Shirts" ? "SHIRT SIZE" : product.category === "Trousers" ? "TROUSER SIZE" : "JACKET SIZE"}
              />
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* Add to Enquiry List */}
              <button
                onClick={handleToggle}
                style={{
                  fontFamily: F.mono, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase",
                  padding: "16px 24px", border: "none", cursor: "pointer",
                  backgroundColor: fav ? "#111" : "#111",
                  color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                <span>{fav ? "✓ SAVED TO ENQUIRY LIST" : added ? "✓ ADDED" : "+ ADD TO ENQUIRY LIST"}</span>
                {count > 0 && <span style={{ backgroundColor: "rgba(255,255,255,0.2)", padding: "2px 6px", fontSize: "8px" }}>{count}</span>}
              </button>

              {/* Response commitment stats */}
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                border: "1px solid #e8e8e8", marginBottom: "0",
              }}>
                {[
                  { value: "< 4 hrs", label: "Response Time" },
                  { value: "Zero Fee", label: "Consultation" },
                  { value: "2–3", label: "Fittings Included" },
                ].map((stat, i) => (
                  <div key={stat.label} style={{
                    padding: "14px 12px",
                    borderLeft: i > 0 ? "1px solid #e8e8e8" : "none",
                    textAlign: "center",
                  }}>
                    <div style={{ fontFamily: F.display, fontSize: "18px", fontWeight: 600, letterSpacing: "0.04em", color: "#111", lineHeight: 1 }}>{stat.value}</div>
                    <div style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.1em", color: "#aaa", textTransform: "uppercase", marginTop: "4px" }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Send WhatsApp Enquiry */}
              <button
                onClick={() => {
                  const service = pricingTier === "mtm" ? "Made-to-Measure" : "Bespoke";
                  const url = productEnquiryUrl({
                    productName: product.name,
                    productId: product.id,
                    category: product.category,
                    mill: displayMill?.mill,
                    millOrigin: displayMill?.origin,
                    service,
                    price: displayPrice,
                    referenceSize: selectedSize || undefined,
                  });
                  window.open(url, "_blank");
                }}
                style={{
                  fontFamily: F.mono, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase",
                  padding: "16px 24px", border: "1px solid #111", cursor: "pointer",
                  backgroundColor: "transparent", color: "#111",
                  transition: "background-color 0.15s, color 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#111"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#111"; }}
              >
                ENQUIRE VIA WHATSAPP →
              </button>

              {/* Book Appointment */}
              <Link href="/contact?type=bespoke">
                <span style={{
                  display: "block", fontFamily: F.mono, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase",
                  padding: "16px 24px", border: "1px solid #ddd", cursor: "pointer",
                  backgroundColor: "transparent", color: "#777", textAlign: "center",
                }}>
                  BOOK AN APPOINTMENT
                </span>
              </Link>
            </div>

           </div>
        </div>
        {/* Process note — full width below the grid */}
        <div style={{ marginTop: "40px", padding: "20px 24px", border: "1px solid #e8e8e8", display: isMobile ? "block" : "flex", alignItems: "center", gap: "32px" }}>
          <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: isMobile ? "8px" : 0, flexShrink: 0 }}>THE PROCESS</span>
          <p style={{ fontFamily: F.body, fontSize: "12px", lineHeight: 1.7, color: "#777", margin: 0 }}>
            Every garment begins with a consultation and full body measurement. We guide you through fabric selection from our curated mill library, discuss your lifestyle requirements, and take you through 2–3 fittings to achieve a perfect result. Lead time is typically {product.constructionDetails.find(d => d.label === "LEAD TIME")?.value || "4–6 weeks"}.
          </p>
        </div>
        {/* Related Products */}
        {related.length > 0 && (
          <div style={{ marginTop: "80px", paddingTop: "48px", borderTop: "1px solid #e8e8e8" }}>
            <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "8px" }}>YOU MAY ALSO CONSIDER</span>
            <h2 style={{ fontFamily: F.display, fontSize: "22px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", marginBottom: "32px" }}>Related Items</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))", gap: "24px" }}>
              {related.map(rel => (
                <Link key={rel.id} href={`/tailored-menswear/${rel.slug}`}>
                  <div style={{ cursor: "pointer" }}>
                    <div style={{ overflow: "hidden", backgroundColor: "#f4f4f2", marginBottom: "12px", position: "relative" }}>
                      <img
                        src={rel.img}
                        alt={rel.name}
                        loading="lazy"
                        style={{ width: "100%", aspectRatio: "2/3", objectFit: "cover", display: "block", transition: "transform 0.3s ease" }}
                        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.03)")}
                        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                      />
                      <div style={{ position: "absolute", bottom: "8px", left: "8px", display: "flex", gap: "4px" }}>
                        <span style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", background: "rgba(0,0,0,0.72)", padding: "3px 6px", border: "1px solid rgba(255,255,255,0.25)" }}>Bespoke</span>
                        <span style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", background: "rgba(0,0,0,0.72)", padding: "3px 6px", border: "1px solid rgba(255,255,255,0.25)" }}>MTM</span>
                      </div>
                    </div>
                    <p style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: "#bbb", marginBottom: "4px" }}>{rel.id}</p>
                    <p style={{ fontFamily: F.display, fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", marginBottom: "4px" }}>{rel.name}</p>
                    <p style={{ fontFamily: F.mono, fontSize: "9px", color: "#777" }}>{rel.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky mobile CTA bar */}
      {isMobile && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
          backgroundColor: "#fff", borderTop: "1px solid #e8e8e8",
          padding: "12px 20px",
          display: "flex", gap: "10px",
          boxShadow: "0 -4px 16px rgba(0,0,0,0.06)",
        }}>
          <button
            onClick={handleToggle}
            style={{
              flex: 1, fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em",
              textTransform: "uppercase", padding: "13px 10px", border: "none",
              backgroundColor: "#111", color: "#fff", cursor: "pointer",
            }}
          >
            {fav ? "✓ SAVED" : "+ SAVE"}
          </button>
          <button
            onClick={() => {
              const service = pricingTier === "mtm" ? "Made-to-Measure" : "Bespoke";
              const url = productEnquiryUrl({
                productName: product.name,
                productId: product.id,
                category: product.category,
                mill: displayMill?.mill,
                millOrigin: displayMill?.origin,
                service,
                price: displayPrice,
                referenceSize: selectedSize || undefined,
              });
              window.open(url, "_blank");
            }}
            style={{
              flex: 2, fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em",
              textTransform: "uppercase", padding: "13px 10px",
              border: "1px solid #111", backgroundColor: "transparent", color: "#111", cursor: "pointer",
            }}
          >
            ENQUIRE VIA WHATSAPP →
          </button>
        </div>
      )}

      <Footer />
    </main>
  );
}
