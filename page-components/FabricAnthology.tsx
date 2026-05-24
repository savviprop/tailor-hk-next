"use client";
import { useSEO, SCHEMAS } from "@/hooks/useSEO";
/**
 * FabricAnthology — Loro Piana Fabric Anthology
 * Design: Dark mono editorial, matching WorldTailors card format
 * Layout: Filter bar + expandable grid cards
 * Data: All 30 Loro Piana collections from The Fabric Anthology
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

type Garment = "SUIT" | "JACKET" | "PANTS" | "SHIRT" | "OUTERWEAR";
type Fibre   = "WOOL" | "CASHMERE" | "COTTON" | "LINEN" | "SILK" | "BLEND";

interface FabricCollection {
  id: string;
  name: string;
  collection: string;          // e.g. "779"
  keySellingPoint: string;     // e.g. "CLASSIC SOLID COLOURS"
  composition: string;
  weight: string;              // e.g. "150–340 gr/mt"
  priceIndex: number;          // 0–3 (Loro Piana scale)
  garments: Garment[];
  fibre: Fibre[];
  description: string;
  notes?: string;
  isNew?: boolean;
  isTopSeller?: boolean;
}

const COLLECTIONS: FabricCollection[] = [
  {
    id: "uniti",
    name: "UNITI",
    collection: "779",
    keySellingPoint: "Classic solid colours",
    composition: "Wool & Wool Blend",
    weight: "150–340 gr/mt",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "BLEND"],
    isNew: true,
    description: "A wide range of solid-coloured fabrics offering a palette of shades and textures to suit every need and style. The selection offers mohair wool blends, blended with silk or pure wool. Lightweight and breathable, they also use high-twist yarns for an elevated crease resistance and a fresh yet compact feel.",
  },
  {
    id: "denim",
    name: "DENIM",
    collection: "776",
    keySellingPoint: "The evolution of an icon",
    composition: "Cashmere, Wool & Cotton",
    weight: "260–460 gr/mt",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS", "SHIRT"],
    fibre: ["CASHMERE", "WOOL", "COTTON"],
    description: "Denim, one of the most popular fabrics of all time, is unique in its ability to span the decades, fashions and seasons, constantly changing yet always true to itself. Loro Piana elevates it using premium fibres, changing its essence but not its informal appearance. This evolution is reflected in the original garments with a unique and exquisite touch.",
    notes: "N776001 to N776002 only for shirts.",
  },
  {
    id: "overcoats",
    name: "OVERCOATS",
    collection: "775",
    keySellingPoint: "Luxury performance",
    composition: "Cashmere, Wool & Baby Camel Hair",
    weight: "460–620 gr/mt",
    priceIndex: 2,
    garments: ["OUTERWEAR"],
    fibre: ["CASHMERE", "WOOL", "BLEND"],
    description: "Exquisite fibres, carefully selected and passionately transformed into sophisticated fabrics for soft, enveloping coats in a varied range of fabrics made with different raw materials, textures, patterns and colours. The fabrics have all been treated with Rain System®, the special finish from Loro Piana that adds water repellent properties without altering the quality and feel of the fabrics in any way, for an ideal garment suitable to wear even on rainy days.",
  },
  {
    id: "mare",
    name: "MARE",
    collection: "772",
    keySellingPoint: "Perfect summer wardrobe",
    composition: "Wool, Cotton, Linen, Silk & Blends",
    weight: "260–460 gr/mt",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "COTTON", "LINEN", "SILK", "BLEND"],
    description: "A wide selection of fabrics caters to both gentlemen and ladies for spring, summer, and beyond. The elegant freshness of linen, cotton and silk defines this versatile collection, perfect for both casual and refined summer attire. The variety of weights and textures allows for the creation of dresses, jackets and trousers with great impact and personality.",
    notes: "N772001 to N772017 and N772032 to N772035 only for jackets.",
  },
  {
    id: "summertime",
    name: "SUMMERTIME",
    collection: "771",
    keySellingPoint: "Summer icon",
    composition: "71% Wool, 15% Cotton, 14% Silk",
    weight: "250 gr/mt",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "COTTON", "SILK"],
    description: "The carefully balanced raw materials allow fabrics to be created with a relaxed appearance, suitable for a variety of occasions. Linen and silk bring a fresh, flowing quality, while the elasticity of wool enhances crease resistance, making it ideal for travel clothing.",
  },
  {
    id: "helios",
    name: "HELIOS",
    collection: "770",
    keySellingPoint: "Sophisticated",
    composition: "100% Wool Super 120s",
    weight: "270 gr/mt",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    description: "The classic and renowned iridescent effect — with khaki right side and brick reverse — is magically revealed in a fabric that naturally captures and reflects the light, thanks to the skilful interweaving of contrasting-coloured yarns. This creates a warm and enveloping sensation with a radiant glow sunlight. Loro Piana expands the colour range, offering vivid shades that enhance the fabric's innate brilliance and play of colours. Helios is completed by performance fabrics: fine wool treated with Rain System® technology, making the fabric water repellent and performing.",
  },
  {
    id: "cotton-velvet",
    name: "COTTON VELVET",
    collection: "769",
    keySellingPoint: "Red carpet",
    composition: "100% Cotton",
    weight: "245 gr/mt",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["COTTON"],
    description: "An easy-to-tailor sophisticated and smooth pure cotton velvet. Designed for garments that offer comfort and refinement and distinguished by its particularly soft hand feel. It is the ideal weight for warm and durable blazers and trousers for the winter season.",
  },
  {
    id: "jackets-trousers",
    name: "JACKETS AND TROUSERS",
    collection: "766",
    keySellingPoint: "The perfect combination",
    composition: "Wool, Cotton & Wool Blends",
    weight: "200–320 gr/mt",
    priceIndex: 1,
    garments: ["JACKET", "PANTS"],
    fibre: ["WOOL", "COTTON", "BLEND"],
    description: "A curated selection of fabrics designed for the perfect jacket and trouser combination. Versatile weights and textures allow for both formal and casual interpretations, with the wool and cotton blends providing an ideal balance of structure and comfort.",
  },
  {
    id: "wool-cashmere-flannels",
    name: "WOOL & CASHMERE FLANNELS",
    collection: "765",
    keySellingPoint: "Soft hand feel",
    composition: "Wool & Cashmere",
    weight: "280–380 gr/mt",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "CASHMERE"],
    description: "The quintessential flannel elevated by the addition of cashmere. The resulting fabric has an exceptionally soft hand feel while retaining the structured drape and warmth that makes flannel the fabric of choice for autumn and winter suiting. The cashmere content adds a subtle lustre and an unmistakable tactile quality.",
  },
  {
    id: "noblesse",
    name: "NOBLESSE",
    collection: "762",
    keySellingPoint: "Sublime formal wear",
    composition: "Wool (200's) & Silk",
    weight: "220–280 gr/mt",
    priceIndex: 3,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "SILK"],
    description: "Noblesse represents the pinnacle of Loro Piana's formal suiting fabrics. The extraordinary Super 200's wool — among the finest wools in the world — is blended with silk to create a fabric of incomparable lightness, lustre, and drape. Reserved for the most formal and prestigious occasions, Noblesse is the fabric of choice for those who demand nothing less than the absolute finest.",
  },
  {
    id: "world-of-colours",
    name: "A WORLD OF COLOURS",
    collection: "760",
    keySellingPoint: "Full colours palette",
    composition: "100% Wool",
    weight: "250–310 gr/mt",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    description: "An expansive palette of pure wool fabrics spanning the full spectrum of colour. From the most restrained neutrals to the most vivid seasonal tones, this collection provides the tailor with an unparalleled range of options for every occasion and every client. The consistent quality of the wool ensures that colour is rendered with depth and accuracy.",
  },
  {
    id: "cashmere-box",
    name: "CASHMERE BOX",
    collection: "759",
    keySellingPoint: "Fancy look & soft touch",
    composition: "100% Cashmere",
    weight: "280–340 gr/mt",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["CASHMERE"],
    description: "Pure cashmere in a structured box weave that delivers both visual interest and an extraordinary soft touch. The box construction gives the fabric a subtle three-dimensional quality that catches the light and adds depth to the surface. An ideal choice for those who wish to wear cashmere in a more formal context without sacrificing visual distinction.",
  },
  {
    id: "cruise",
    name: "CRUISE",
    collection: "746",
    keySellingPoint: "Luxury leisure in style",
    composition: "Wool & Cashmere Blends",
    weight: "220–280 gr/mt",
    priceIndex: 2,
    garments: ["JACKET"],
    fibre: ["WOOL", "CASHMERE", "BLEND"],
    description: "Designed for the most refined leisure occasions, Cruise combines the comfort of cashmere with the structure of fine wool. The result is a fabric that moves effortlessly between the yacht deck and the dining room — relaxed in character but impeccable in finish. Available in a curated palette of coastal and resort-inspired tones.",
  },
  {
    id: "royal-wish",
    name: "ROYAL WISH®",
    collection: "738",
    keySellingPoint: "Light resistant business wear",
    composition: "Wool (170's) & Silk",
    weight: "200–240 gr/mt",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "SILK"],
    description: "Royal Wish® is engineered for the demands of modern business travel. The Super 170's wool and silk blend creates a fabric of exceptional lightness that resists creasing even after long hours of wear. The silk content adds a subtle iridescence and a cool, smooth hand feel that makes it ideal for the executive wardrobe.",
  },
  {
    id: "events",
    name: "EVENTS",
    collection: "735",
    keySellingPoint: "Ceremony",
    composition: "Wool & Other Fibres",
    weight: "250–320 gr/mt",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "BLEND"],
    description: "Conceived for the most important occasions, Events is a collection of fabrics that combine formal elegance with a distinctive character. Subtle patterns, refined textures, and a palette of deep, ceremonial tones make this the natural choice for weddings, black tie events, and formal receptions.",
  },
  {
    id: "atelier",
    name: "ATELIER",
    collection: "733",
    keySellingPoint: "Ladies excellence",
    composition: "Wool, Cashmere & Blends",
    weight: "200–280 gr/mt",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS", "OUTERWEAR"],
    fibre: ["WOOL", "CASHMERE", "BLEND"],
    description: "The Atelier collection is designed for the most discerning clients who require a fabric that performs equally well in both structured tailoring and softer, more fluid constructions. The wool and cashmere blends offer exceptional drape and a refined surface quality that rewards close inspection.",
    notes: "Selected articles suitable for outerwear.",
  },
  {
    id: "sopra-visso",
    name: "SOPRA VISSO",
    collection: "732",
    keySellingPoint: "No wrinkles",
    composition: "100% Wool",
    weight: "260–300 gr/mt",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    description: "Sopra Visso is engineered for the modern professional who demands impeccable appearance throughout the working day. The proprietary finishing process creates a fabric with exceptional crease recovery — garments return to their original shape after hours of wear. An essential choice for frequent travellers and those with demanding schedules.",
  },
  {
    id: "winter-australis",
    name: "WINTER AUSTRALIS®",
    collection: "729",
    keySellingPoint: "The perfect drop",
    composition: "100% Wool (150's)",
    weight: "280–320 gr/mt",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    description: "Winter Australis® is sourced from the finest Merino flocks of Australia, producing a Super 150's wool of extraordinary fineness and uniformity. The resulting fabric has a perfect drop — the way a fine fabric falls and drapes from the shoulder — that is the hallmark of truly exceptional suiting cloth.",
  },
  {
    id: "cashmere-wish",
    name: "CASHMERE WISH®",
    collection: "728",
    keySellingPoint: "Cashmere feel & wool versatility",
    composition: "Wool & Cashmere",
    weight: "260–300 gr/mt",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "CASHMERE"],
    description: "Cashmere Wish® achieves the remarkable balance of cashmere's incomparable softness with the structural integrity and versatility of fine wool. The precise blend ratio has been refined over decades to produce a fabric that feels like cashmere against the skin while tailoring with the precision of the finest wool.",
  },
  {
    id: "suitmate",
    name: "SUITMATE",
    collection: "726",
    keySellingPoint: "The easiest unseasonal suit",
    composition: "100% Wool (150's)",
    weight: "240–280 gr/mt",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    description: "Suitmate is designed for the client who requires a single suit that performs across all seasons and occasions. The Super 150's wool at this weight is light enough for summer comfort yet substantial enough for winter formality. The fabric's inherent versatility makes it the ideal choice for a first bespoke commission or a core wardrobe piece.",
  },
  {
    id: "world-of-shirts",
    name: "A WORLD OF SHIRTS",
    collection: "722",
    keySellingPoint: "Every season & every occasion shirts",
    composition: "Cotton, Wool & Cashmere",
    weight: "120–180 gr/mt",
    priceIndex: 2,
    garments: ["SHIRT"],
    fibre: ["COTTON", "WOOL", "CASHMERE"],
    description: "An extraordinary collection of shirt fabrics spanning every season and occasion. From the crispest poplin for formal occasions to the softest cashmere blends for casual luxury, this collection provides the shirt maker with an unparalleled range of options. Each fabric has been selected for its exceptional quality and its ability to be tailored to the highest standard.",
  },
  {
    id: "australis-jackets",
    name: "AUSTRALIS® JACKETS",
    collection: "721",
    keySellingPoint: "Fancy jackets",
    composition: "100% Wool (150's)",
    weight: "220–260 gr/mt",
    priceIndex: 2,
    garments: ["JACKET"],
    fibre: ["WOOL"],
    description: "Australis® Jackets brings the extraordinary quality of Loro Piana's flagship Australis® wool to the sport coat and blazer. The Super 150's wool at this weight is ideal for unstructured and lightly structured jackets, offering exceptional drape and a refined surface that rewards the most demanding construction techniques.",
  },
  {
    id: "jersey",
    name: "JERSEY",
    collection: "719",
    keySellingPoint: "Comfort",
    composition: "Wool, Cashmere & Blends",
    weight: "200–260 gr/mt",
    priceIndex: 2,
    garments: ["JACKET"],
    fibre: ["WOOL", "CASHMERE", "BLEND"],
    description: "Jersey brings the comfort and ease of knitwear to structured tailoring. The wool and cashmere blends are woven in a jersey construction that provides exceptional stretch and recovery, making garments that move with the body and return to shape. An ideal choice for the modern client who prioritises comfort without compromising on elegance.",
  },
  {
    id: "loro-piana-system",
    name: "LORO PIANA SYSTEM",
    collection: "715",
    keySellingPoint: "Functional",
    composition: "Wool & Cashmere",
    weight: "220–280 gr/mt",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS", "OUTERWEAR"],
    fibre: ["WOOL", "CASHMERE"],
    description: "The Loro Piana System is a coordinated collection of fabrics designed to work together as a complete wardrobe. Jackets, trousers, shirts, and outerwear are all available in complementary weights and compositions, allowing the client to build a cohesive wardrobe from a single collection. The System is the ultimate expression of Loro Piana's vision of integrated luxury.",
    notes: "Selected articles suitable for outerwear.",
  },
  {
    id: "volare",
    name: "VOLARE",
    collection: "714",
    keySellingPoint: "Travel",
    composition: "Wool, Cashmere & Blends",
    weight: "180–240 gr/mt",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "CASHMERE", "BLEND"],
    description: "Volare — Italian for 'to fly' — is engineered for the modern traveller. The lightweight wool and cashmere blend is treated with a proprietary process that dramatically reduces creasing during transit. Garments made in Volare emerge from a suitcase looking as though they have just been pressed. The ideal fabric for the executive who travels constantly and cannot afford to look anything less than immaculate.",
  },
  {
    id: "tasmanian",
    name: "TASMANIAN®",
    collection: "713",
    keySellingPoint: "Iconic suit",
    composition: "100% Wool (170's)",
    weight: "240–280 gr/mt",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    isTopSeller: true,
    description: "Tasmanian® is perhaps the most iconic fabric in the Loro Piana collection. Sourced from the finest Merino flocks of Tasmania, the Super 170's wool produces a fabric of extraordinary fineness, lustre, and drape. The Tasmanian® suit is the benchmark against which all other suiting fabrics are measured — a fabric that has dressed heads of state, captains of industry, and the world's most discerning dressers for generations.",
  },
  {
    id: "cashmere",
    name: "CASHMERE",
    collection: "708",
    keySellingPoint: "Timeless look & soft touch",
    composition: "100% Cashmere",
    weight: "280–380 gr/mt",
    priceIndex: 3,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["CASHMERE"],
    description: "Pure cashmere suiting represents the absolute pinnacle of Loro Piana's craft. The fibres are sourced exclusively from the finest Hircus goats of Inner Mongolia and processed at Loro Piana's own mills in Quarona, Italy. The resulting fabric has an incomparable softness, warmth, and lustre that cannot be replicated by any other fibre. A cashmere suit from Loro Piana is a lifetime investment.",
  },
  {
    id: "australis",
    name: "AUSTRALIS®",
    collection: "707",
    keySellingPoint: "Every occasion suits",
    composition: "100% Wool (150's)",
    weight: "240–280 gr/mt",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    isTopSeller: true,
    description: "Australis® is the foundation of the Loro Piana suiting range — a Super 150's wool of exceptional quality and consistency that provides the ideal canvas for the finest tailoring. Versatile enough for any occasion, refined enough for the most demanding client, Australis® has been the fabric of choice for the world's great tailoring houses for decades.",
  },
  {
    id: "australis-natural-stretch",
    name: "AUSTRALIS® NATURAL STRETCH",
    collection: "703",
    keySellingPoint: "Every occasion suits with comfort",
    composition: "100% Wool (150's)",
    weight: "240–280 gr/mt",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    description: "Australis® Natural Stretch brings the legendary quality of the Australis® collection to a fabric with inherent stretch and recovery. The natural elasticity — achieved without synthetic fibres — provides exceptional comfort and freedom of movement while maintaining the immaculate appearance that defines the Australis® range.",
  },
  {
    id: "super-200",
    name: "SUPER 200",
    collection: "684",
    keySellingPoint: "Top wool selection",
    composition: "100% Wool (200's)",
    weight: "200–240 gr/mt",
    priceIndex: 3,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    description: "Super 200 represents the absolute finest wool available for suiting. The Super 200's designation refers to the extraordinary fineness of the individual wool fibres — among the finest ever produced. The resulting fabric is of gossamer lightness, extraordinary lustre, and a drape that defies description. Reserved for the most exceptional commissions and the most discerning clients.",
  },
  {
    id: "blazers",
    name: "BLAZERS",
    collection: "667",
    keySellingPoint: "Essential blazers",
    composition: "Wool & Cashmere",
    weight: "260–320 gr/mt",
    priceIndex: 2,
    garments: ["JACKET"],
    fibre: ["WOOL", "CASHMERE"],
    description: "A curated selection of fabrics specifically designed for the blazer and sport coat. The wool and cashmere blends provide the ideal combination of structure and softness for unlined and half-lined constructions, while the range of patterns — from classic solids to subtle textures — ensures that every client can find their ideal blazer fabric.",
  },
  {
    id: "zenit",
    name: "ZENIT®",
    collection: "645",
    keySellingPoint: "Exclusive raw material blends",
    composition: "Wool, Cashmere & Other Excellence Fibres",
    weight: "220–280 gr/mt",
    priceIndex: 3,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "CASHMERE", "BLEND"],
    description: "Zenit® is Loro Piana's most exclusive suiting collection — a series of extraordinary blends that combine the finest wool with cashmere, vicuña, and other rare excellence fibres. Each article in the Zenit® collection is produced in strictly limited quantities, making it the fabric of choice for those who demand absolute exclusivity. The blends are developed by Loro Piana's master weavers and cannot be found anywhere else in the world.",
  },
];

// ─── FILTER CONFIG ────────────────────────────────────────────────────────────

const ALL_FIBRES: Fibre[] = ["WOOL", "CASHMERE", "COTTON", "LINEN", "SILK", "BLEND"];
const ALL_GARMENTS: Garment[] = ["SUIT", "JACKET", "PANTS", "SHIRT", "OUTERWEAR"];

const PRICE_LABELS = ["ENTRY", "MID", "PREMIUM", "ULTRA"];
const PRICE_COLORS = [
  { bg: "#f0f0f0", text: "#555" },
  { bg: "#e8f0e8", text: "#3a6b3a" },
  { bg: "#e8eef8", text: "#2a4a8a" },
  { bg: "#f8f0e0", text: "#8a5a00" },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function FabricAnthology() {
  useSEO({
    title: "Fabric Anthology — Luxury Suiting Cloths | Tailors.hk",
    description: "Explore the Tailors.hk fabric anthology — luxury suiting cloths from the world's finest mills. Loro Piana, Holland & Sherry, Dormeuil, Scabal, VBC and more.",
    canonical: "https://tailors.hk/fabric-anthology",
    schema: [
      SCHEMAS.organization(),
      SCHEMAS.breadcrumb([
        { name: 'Home', url: '/' },
        { name: 'Fabric Anthology', url: '/fabric-anthology' },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Fabric Anthology — Luxury Suiting Cloths | Tailors.hk",
        "description": "Explore the Tailors.hk fabric anthology — luxury suiting cloths from the world's finest mills. Loro Piana, Holland & Sherry, Dormeuil, Scabal, VBC and more.",
        "url": "https://tailors.hk/fabric-anthology",
        "about": {
          "@type": "Product",
          "name": "Luxury Suiting Mills Suiting Fabrics",
          "description": "Luxury suiting fabrics from the world's finest mills — Loro Piana, Holland & Sherry, Dormeuil, Scabal, VBC",
          "brand": { "@type": "Brand", "name": "Luxury Suiting Mills" }
        },
        "isPartOf": { "@type": "WebSite", "@id": "https://tailors.hk/#website" }
      }
    ],
  });
  const [search, setSearch] = useState("");
  const [activeFibre, setActiveFibre] = useState<Fibre | "ALL">("ALL");
  const [activeGarment, setActiveGarment] = useState<Garment | "ALL">("ALL");
  const [sortBy, setSortBy] = useState<"collection" | "price" | "name">("collection");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = COLLECTIONS.filter((c) => {
      const matchFibre   = activeFibre === "ALL"   || c.fibre.includes(activeFibre);
      const matchGarment = activeGarment === "ALL" || c.garments.includes(activeGarment);
      const q = search.toLowerCase();
      const matchSearch  = !q || c.name.toLowerCase().includes(q) || c.composition.toLowerCase().includes(q) || c.keySellingPoint.toLowerCase().includes(q);
      return matchFibre && matchGarment && matchSearch;
    });
    if (sortBy === "collection") list = [...list].sort((a, b) => parseInt(b.collection) - parseInt(a.collection));
    if (sortBy === "price")      list = [...list].sort((a, b) => b.priceIndex - a.priceIndex);
    if (sortBy === "name")       list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [activeFibre, activeGarment, search, sortBy]);

  return (
    <div style={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>
      <Navigation />

      {/* ── Hero ── */}
      <section style={{ position: "relative", backgroundColor: "#111", color: "#fff", padding: "80px 0 60px", overflow: "hidden" }}>
        <img
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/prqGrMlrEOEEDwqq.jpeg"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.35, pointerEvents: "none" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.16em", color: "#555", display: "block", marginBottom: "12px" }}>
            § FABRIC REFERENCE · LORO PIANA
          </span>
          <h1 style={{ fontFamily: F.display, fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#fff", lineHeight: 1, margin: "0 0 20px" }}>
            THE FABRIC ANTHOLOGY
          </h1>
          <p style={{ fontFamily: F.body, fontSize: "15px", lineHeight: 1.75, color: "#888", maxWidth: "600px", margin: "0 0 32px" }}>
            A complete reference to Loro Piana's Spring/Summer 2026 collections — 30 collections spanning pure wool, cashmere, cotton, linen, and rare blends. Each entry documents composition, weight, garment suitability, and the key character of the cloth.
          </p>
          {/* Save & Share */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "28px" }}>
            <BookmarkButton
              item={{
                slug: "loro-piana-anthology",
                title: "The Fabric Anthology — Loro Piana",
                category: "Fabrics",
                img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/prqGrMlrEOEEDwqq.jpeg",
                excerpt: "30 collections profiled with composition, weight, garment suitability, and price tier.",
              }}
            />
            <ShareButton
              title="The Fabric Anthology — Loro Piana"
              text="A complete reference to Loro Piana's fabric collections — 30 collections spanning pure wool, cashmere, cotton, linen, and rare blends."
            />
          </div>
          <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            {[
              { label: "COLLECTIONS", value: "30" },
              { label: "FIBRE TYPES", value: "6" },
              { label: "MILL", value: "LORO PIANA · QUARONA, ITALY" },
              
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.12em", color: "#555", marginBottom: "4px" }}>{s.label}</div>
                <div style={{ fontFamily: F.display, fontSize: "18px", fontWeight: 700, letterSpacing: "0.06em", color: "#fff" }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filter bar ── */}
      <section style={{ backgroundColor: "#fff", borderBottom: "1px solid #e0e0e0", position: "sticky", top: "52px", zIndex: 50 }}>
        <div className="container" style={{ padding: "16px 0" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            {/* Search */}
            <input
              type="text"
              placeholder="SEARCH COLLECTIONS..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.08em",
                border: "1px solid #d0d0d0", padding: "8px 12px",
                backgroundColor: "#fafafa", color: "#111", outline: "none",
                width: "200px", textTransform: "uppercase",
              }}
            />
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              style={{
                fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.08em",
                border: "1px solid #d0d0d0", padding: "8px 12px",
                backgroundColor: "#fafafa", color: "#111", outline: "none",
                textTransform: "uppercase", cursor: "pointer",
              }}
            >
              <option value="collection">SORT: COLLECTION NO.</option>
              <option value="price">SORT: PRICE TIER</option>
              <option value="name">SORT: NAME A–Z</option>
            </select>
          </div>
        </div>
      </section>

      {/* ── Fibre filter ── */}
      <section style={{ backgroundColor: "#fff", borderBottom: "1px solid #e8e8e8" }}>
        <div className="container" style={{ padding: "12px 0" }}>
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
        <div className="container" style={{ padding: "12px 0" }}>
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
            {filtered.length} COLLECTION{filtered.length !== 1 ? "S" : ""} · {[activeFibre !== "ALL" ? activeFibre : "", activeGarment !== "ALL" ? activeGarment : ""].filter(Boolean).join(" · ") || "ALL FIBRES & GARMENTS"}
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
                          COLLEZIONE {c.collection} · LORO PIANA
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
                      <span style={{ fontFamily: F.mono, fontSize: "6px", color: "#bbb", width: "8px", textAlign: "right" }}>{c.priceIndex}</span>
                    </div>

                    {/* Fibre bars */}
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
                          <div style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.1em", color: "#bbb", marginBottom: "4px" }}>SUITABLE FOR</div>
                          <div style={{ fontFamily: F.body, fontSize: "11px", color: "#555", lineHeight: 1.5 }}>{c.garments.join(", ")}</div>
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
              NO COLLECTIONS MATCH YOUR SEARCH
            </div>
          )}
        </div>
      </section>

      {/* ── Mill note ── */}
      <section style={{ backgroundColor: "#111", color: "#fff", padding: "60px 0" }}>
        <div className="container" style={{ maxWidth: "680px" }}>
          <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#555", display: "block", marginBottom: "12px" }}>
            MILL REFERENCE
          </span>
          <h2 style={{ fontFamily: F.display, fontSize: "24px", fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", marginBottom: "16px" }}>
            LORO PIANA · QUARONA, ITALY
          </h2>
          <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.8, color: "#777", marginBottom: "24px" }}>
            Founded in 1924 in the Valsesia valley of Piedmont, Loro Piana is the world's largest processor of vicuña and cashmere fibres. The mill controls the entire production chain — from raw fibre sourcing in Mongolia, Australia, and Peru to finished cloth — ensuring absolute consistency of quality. Their fabrics are supplied to the world's finest tailoring houses, including Kiton, Brioni, and Cesare Attolini, and are available through Tailors.hk for bespoke and MTM commissions.
          </p>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {[
              { label: "FOUNDED", value: "1924" },
              { label: "LOCATION", value: "QUARONA, PIEDMONT" },
              { label: "SPECIALITY", value: "CASHMERE · VICUÑA · FINE WOOL" },
              { label: "SUPPLY", value: "WORLD'S FINEST TAILORING HOUSES" },
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
              { name: "HOLLAND & SHERRY", est: "1836", note: "41 COLLECTIONS", href: "/holland-sherry-anthology", desc: "Huddersfield, England" },
              { name: "VBC", est: "1663", note: "17 COLLECTIONS", href: "/vbc-anthology", desc: "Biella, Italy" },
              { name: "DORMEUIL", est: "1842", note: "17 BUNCHES", href: "/dormeuil-anthology", desc: "Reims, France" },
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
