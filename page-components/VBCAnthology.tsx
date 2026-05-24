"use client";
import { useSEO, SCHEMAS } from "@/hooks/useSEO";
/**
 * VBCAnthology — Vitale Barberis Canonico Fabric Anthology
 * Design: Dark mono editorial, matching HollandSherryAnthology card format
 * Layout: Category tabs + filter bar + expandable grid cards
 * Data: VBC collections from vitalebarberiscanonico.com
 * Mill: Vitale Barberis · Est. 1663 · Biella, Italy
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
type Fibre   = "WOOL" | "CASHMERE" | "COTTON" | "LINEN" | "SILK" | "MOHAIR" | "ALPACA" | "BLEND";
type Category = "CLASSIC" | "VINTAGE" | "EARTH WIND & FIRE" | "SUPERSONIC" | "THE H.O.P.E. RANGE" | "OFFLIMITS";

interface VBCCollection {
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

const COLLECTIONS: VBCCollection[] = [
  // ── CLASSIC ──────────────────────────────────────────────────────────────
  {
    id: "the-icons-classic",
    name: "THE ICONS",
    category: "CLASSIC",
    keySellingPoint: "VBC's signature fabrics since 1663",
    composition: "100% Wool Super 120s–150s",
    weight: "260–310 g/m²",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    isTopSeller: true,
    description: "The Icons is Vitale Barberis Canonico's definitive collection — the fabrics that have defined the mill's identity across more than three centuries of continuous production in Biella. Each cloth in the collection represents a pinnacle of the mill's craft: precise weave structures, immaculate finishing, and the characteristic VBC hand feel that comes from generations of accumulated expertise. Available in Super 120s through Super 150s, The Icons spans the full range of business and formal suiting requirements.",
  },
  {
    id: "solaro",
    name: "SOLARO® MADE IN ITALY",
    category: "CLASSIC",
    keySellingPoint: "The iconic sun-reactive suiting cloth",
    composition: "100% Wool Super 120s",
    weight: "270–300 g/m²",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    isTopSeller: true,
    description: "Solaro® is one of the most distinctive fabrics in the history of tailoring. Woven in a special structure that appears brown or tan in artificial light, the cloth reveals a rich red-orange tone when viewed in natural sunlight — a phenomenon caused by the unique double-weave construction and the specific dye combination used in the warp and weft. Originally developed in the early twentieth century for British officers serving in tropical climates, Solaro® has become a hallmark of the informed dresser. VBC's version is the benchmark against which all others are measured.",
    notes: "Registered trademark of Vitale Barberis Canonico.",
  },
  {
    id: "greenhills-super-180",
    name: "GREENHILLS SUPER 180'S",
    category: "CLASSIC",
    keySellingPoint: "Ultra-fine Merino at the pinnacle of VBC's range",
    composition: "100% Wool Super 180s",
    weight: "200–240 g/m²",
    priceIndex: 3,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    description: "Greenhills Super 180's represents the absolute summit of Vitale Barberis Canonico's suiting range. Woven from Super 180s Merino — among the finest wools commercially available — the cloth has a featherweight quality and a surface of extraordinary smoothness. The weave is so fine that the cloth appears almost translucent when held to the light, yet retains sufficient structure to tailor with precision. Reserved for the most exceptional commissions.",
  },
  {
    id: "revenge",
    name: "REVENGE",
    category: "CLASSIC",
    keySellingPoint: "Bold, contemporary patterns with a modern edge",
    composition: "100% Wool Super 120s",
    weight: "260–290 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    isNew: true,
    description: "Revenge is VBC's statement collection for the client who wants to stand out. Bold windowpanes, oversized checks, and graphic stripes rendered in the mill's characteristic clean, precise weave — the patterns are contemporary without being transient, designed to remain relevant across multiple seasons. The collection is a deliberate counterpoint to the understated classics that form the backbone of the VBC range.",
  },
  {
    id: "perennial",
    name: "PERENNIAL",
    category: "CLASSIC",
    keySellingPoint: "Year-round classics, the reliable backbone",
    composition: "100% Wool Super 110s–130s",
    weight: "270–320 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    isTopSeller: true,
    description: "Perennial is the workhorse of the VBC range — the collection that provides the reliable, year-round suitings that form the backbone of any well-dressed man's wardrobe. Plain weaves, subtle twills, and classic herringbones in the full range of business colours: navy, charcoal, mid-grey, and their countless variations. Woven from Super 110s to Super 130s Merino at a year-round weight, Perennial is the cloth that tailors reach for when the client needs a suit that will work every day.",
  },
  {
    id: "flannel",
    name: "FLANNEL",
    category: "CLASSIC",
    keySellingPoint: "Traditional milled flannel, soft hand and excellent drape",
    composition: "100% Wool",
    weight: "300–380 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    description: "VBC's Flannel collection upholds the great tradition of milled flannel — a fabric that has been central to British and Italian tailoring for over a century. The cloth is woven from fine Merino yarns and then subjected to a controlled milling process that raises and interlocks the fibres, creating the characteristic soft, slightly napped surface and the exceptional drape that makes flannel the preferred cloth for winter suits and trousers. Available in the classic flannel palette: charcoal, mid-grey, and navy.",
  },
  {
    id: "wool-mohair",
    name: "WOOL & MOHAIR",
    category: "CLASSIC",
    keySellingPoint: "Lustrous summer-weight blends with natural brightness",
    composition: "Wool & Mohair Blend",
    weight: "220–260 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "MOHAIR", "BLEND"],
    description: "The Wool & Mohair collection exploits the complementary qualities of these two fibres: the structure and drape of fine Merino wool combined with the natural brightness and resilience of mohair. The mohair content — typically 20–30% — adds a characteristic sheen and a springiness that helps the cloth resist creasing, making it particularly suitable for summer suiting and for clients who travel frequently. The collection is available in the full range of business colours.",
  },
  {
    id: "21-micron",
    name: "21 MICRON",
    category: "CLASSIC",
    keySellingPoint: "Ultra-fine 21-micron wool at an accessible price",
    composition: "100% Wool 21 Micron",
    weight: "240–280 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    description: "21 Micron is VBC's commitment to making ultra-fine wool accessible without compromising on quality. At 21 microns, the fibre is finer than most Super 120s wools, giving the cloth a noticeably softer hand feel and a more refined surface than standard business suitings. The collection is positioned as the entry point to VBC's premium range — the cloth for the client who wants to experience the difference that fibre fineness makes, without the investment of the very top of the range.",
  },
  // ── VINTAGE ──────────────────────────────────────────────────────────────
  {
    id: "the-icons-vintage",
    name: "THE ICONS",
    category: "VINTAGE",
    keySellingPoint: "Archive-inspired classics from VBC's heritage",
    composition: "100% Wool Super 110s–130s",
    weight: "270–330 g/m²",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    description: "The Icons within the Vintage category draws from VBC's archive of patterns and structures that have defined the mill's heritage since 1663. These are the cloths that have dressed generations of tailors' most discerning clients — the patterns and weave structures that have proven their worth across decades of continuous production. Each cloth is a faithful reinterpretation of an archive original, woven to contemporary standards of quality and finish.",
  },
  {
    id: "printed-flannel",
    name: "PRINTED FLANNEL",
    category: "VINTAGE",
    keySellingPoint: "Flannel base with printed patterns — unique texture meets graphic design",
    composition: "100% Wool",
    weight: "300–360 g/m²",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    isNew: true,
    description: "Printed Flannel is a genuinely unusual proposition: a traditional milled flannel base — with all the softness, drape, and warmth that implies — onto which patterns are applied through a printing process rather than woven into the structure. The result is a cloth with the tactile qualities of flannel and the graphic precision of printed design, allowing for pattern combinations and colour effects that would be impossible to achieve through weaving alone.",
  },
  {
    id: "melton-overcoat",
    name: "MELTON OVERCOAT",
    category: "VINTAGE",
    keySellingPoint: "Dense, fulled wool for structured overcoats",
    composition: "100% Wool",
    weight: "500–650 g/m²",
    priceIndex: 1,
    garments: ["OUTERWEAR"],
    fibre: ["WOOL"],
    description: "Melton is one of the great classic coating fabrics — a densely woven, heavily fulled wool that has been used for military greatcoats, hunting coats, and formal overcoats for centuries. VBC's Melton Overcoat collection upholds this tradition: the cloth is woven from fine Merino yarns and then subjected to an intensive milling and pressing process that creates a smooth, dense, almost impenetrable surface. The result is a fabric of exceptional warmth, structure, and longevity.",
  },
  {
    id: "mouline-fancy-jacket",
    name: "MOULINÉ FANCY JACKET",
    category: "VINTAGE",
    keySellingPoint: "Twisted multi-colour yarns for a textured, speckled effect",
    composition: "100% Wool",
    weight: "280–340 g/m²",
    priceIndex: 1,
    garments: ["JACKET", "CASUAL"],
    fibre: ["WOOL"],
    description: "Mouliné is a yarn construction in which two or more threads of different colours are twisted together before weaving, creating a characteristic speckled or heathered effect in the finished cloth. VBC's Mouliné Fancy Jacket collection uses this technique to produce sport jacket fabrics with a rich, textured surface — the kind of cloth that rewards close inspection, revealing the complexity of the yarn construction that underlies the apparently simple pattern.",
  },
  // ── EARTH, WIND & FIRE ───────────────────────────────────────────────────
  {
    id: "the-icons-ewf",
    name: "THE ICONS",
    category: "EARTH WIND & FIRE",
    keySellingPoint: "Seasonal signature fabrics inspired by natural elements",
    composition: "100% Wool Super 120s",
    weight: "240–290 g/m²",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    description: "The Icons within the Earth, Wind & Fire category represents VBC's seasonal signature fabrics — cloths that draw inspiration from the natural world and the changing seasons. These are the fabrics that demonstrate VBC's ability to move beyond the purely functional and create cloths with a genuine emotional resonance: the warmth of earth tones, the freshness of spring colours, the drama of autumnal patterns.",
  },
  {
    id: "zermatt",
    name: "ZERMATT",
    category: "EARTH WIND & FIRE",
    keySellingPoint: "Alpine-inspired winter weights with rich textures",
    composition: "100% Wool",
    weight: "320–400 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "OUTERWEAR"],
    fibre: ["WOOL"],
    description: "Named after the iconic Swiss Alpine resort, Zermatt is VBC's winter suiting collection — heavy, warm, and richly textured. The collection draws on the visual language of Alpine life: the deep greens of pine forests, the greys of mountain granite, the warm browns of traditional chalets. The cloths are woven at weights that provide genuine warmth in cold climates, while retaining the clean, structured surface that tailoring requires.",
  },
  {
    id: "aspen",
    name: "ASPEN",
    category: "EARTH WIND & FIRE",
    keySellingPoint: "Luxury winter suiting with a resort sensibility",
    composition: "100% Wool Super 120s",
    weight: "290–340 g/m²",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    description: "Aspen takes its name from the Colorado ski resort and the sensibility that name implies: refined, relaxed, and unabashedly luxurious. The collection is designed for the client who wants a winter suit that is as comfortable at a mountain lodge as it is in a boardroom — cloths that combine the warmth and texture of winter fabrics with the clean, precise surface of fine suiting.",
  },
  {
    id: "megeve",
    name: "MEGÈVE",
    category: "EARTH WIND & FIRE",
    keySellingPoint: "Continental elegance in winter suiting",
    composition: "100% Wool Super 120s",
    weight: "280–330 g/m²",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    description: "Named after the celebrated French Alpine resort, Megève brings a distinctly Continental sensibility to winter suiting. Where Zermatt is robust and Aspen is relaxed, Megève is elegant — the collection for the client who wants winter fabrics with the refinement and precision of the finest Italian tailoring. The colour palette draws on the muted, sophisticated tones of the French Alps: stone, slate, and the deep blues of a winter sky.",
  },
  // ── SUPERSONIC ───────────────────────────────────────────────────────────
  {
    id: "the-icons-supersonic",
    name: "THE ICONS",
    category: "SUPERSONIC",
    keySellingPoint: "High-performance signature fabrics for the modern professional",
    composition: "Wool & Elastane Blend",
    weight: "240–280 g/m²",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "BLEND"],
    description: "The Icons within the Supersonic category represents VBC's high-performance signature fabrics — cloths that combine the aesthetic qualities of the finest suiting with the functional performance demanded by the modern professional. These are the fabrics for the client who refuses to compromise: who wants the look and feel of a traditional VBC suiting with the comfort and practicality of performance textiles.",
  },
  {
    id: "natural-stretch",
    name: "NATURAL STRETCH",
    category: "SUPERSONIC",
    keySellingPoint: "Comfort stretch without synthetic fibres",
    composition: "100% Wool",
    weight: "240–280 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    description: "Natural Stretch achieves the comfort and freedom of movement associated with stretch fabrics without the use of synthetic elastane fibres. The stretch is achieved through a combination of fibre selection — using wools with a naturally high crimp — and a specific weave structure that allows the cloth to extend and recover without distortion. The result is a suiting cloth that looks and behaves like a conventional worsted but provides significantly greater comfort in wear.",
  },
  {
    id: "knit-icons",
    name: "KNIT ICONS",
    category: "SUPERSONIC",
    keySellingPoint: "Knitted fabric panels for contemporary tailoring",
    composition: "Wool & Synthetic Blend",
    weight: "220–260 g/m²",
    priceIndex: 1,
    garments: ["JACKET", "CASUAL"],
    fibre: ["WOOL", "BLEND"],
    isNew: true,
    description: "Knit Icons represents VBC's exploration of the boundary between tailoring and sportswear. The collection uses knitted fabric panels and jersey-inspired weave structures to create cloths that have the visual language of tailoring — the clean surfaces, the precise patterns — but the comfort and flexibility of knitwear. Designed for the contemporary client who wants a jacket that works as well on a long-haul flight as it does in a meeting room.",
  },
  // ── THE H.O.P.E. RANGE ───────────────────────────────────────────────────
  {
    id: "the-icons-hope",
    name: "THE ICONS",
    category: "THE H.O.P.E. RANGE",
    keySellingPoint: "Sustainable signature fabrics — Honest, Open, Pure, Ethical",
    composition: "Certified Sustainable Wool",
    weight: "240–290 g/m²",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    description: "The Icons within The H.O.P.E. Range represents VBC's commitment to sustainability at the highest level of the range. H.O.P.E. — Honest, Open, Pure, Ethical — is the framework through which VBC approaches its environmental responsibilities. These signature fabrics carry the full weight of VBC's heritage and craft, but are produced with certified sustainable fibres, responsible dyeing processes, and full supply chain transparency.",
  },
  {
    id: "red-eri-jacket",
    name: "RED ERI JACKET",
    category: "THE H.O.P.E. RANGE",
    keySellingPoint: "Rare non-violent Eri silk from Assam, India",
    composition: "Eri Silk & Wool Blend",
    weight: "260–300 g/m²",
    priceIndex: 2,
    garments: ["JACKET"],
    fibre: ["SILK", "WOOL", "BLEND"],
    isNew: true,
    description: "Red Eri Jacket is one of the most unusual fabrics in the VBC range. Eri silk — sourced from the Eri silkworm in Assam, northeastern India — is produced without killing the silkworm, making it a genuinely non-violent silk alternative. The resulting fibre has a different character to conventional silk: warmer, slightly coarser, with a distinctive matte lustre. Blended with fine Merino wool, it creates a jacket fabric of exceptional character and provenance.",
  },
  {
    id: "moretta-winter",
    name: "MORETTA WOOL WINTER JACKET",
    category: "THE H.O.P.E. RANGE",
    keySellingPoint: "Heritage Biellese wool from local Merino sheep",
    composition: "100% Biellese Merino Wool",
    weight: "340–400 g/m²",
    priceIndex: 2,
    garments: ["JACKET", "OUTERWEAR"],
    fibre: ["WOOL"],
    description: "Moretta Wool celebrates the heritage of the Biella wool district — the region in Piedmont, northern Italy, that has been the centre of Italian wool production for centuries. The Moretta Winter Jacket uses wool from Merino sheep raised in the Biella area, creating a fabric with a genuine sense of place and provenance. The winter weight provides warmth and structure for cold-weather jackets and light overcoats.",
  },
  {
    id: "moretta-summer",
    name: "MORETTA WOOL SUMMER JACKET",
    category: "THE H.O.P.E. RANGE",
    keySellingPoint: "Biellese heritage wool in a summer weight",
    composition: "100% Biellese Merino Wool",
    weight: "220–260 g/m²",
    priceIndex: 2,
    garments: ["JACKET"],
    fibre: ["WOOL"],
    description: "The summer weight counterpart to the Moretta Winter Jacket, using the same locally sourced Biellese Merino wool in a lighter construction suitable for spring and summer jackets. The cloth retains the characteristic qualities of the Moretta range — the sense of provenance, the natural, unforced quality of the fibre — in a weight that is comfortable to wear in warmer conditions.",
  },
  {
    id: "alpaca-overcoat",
    name: "ALPACA OVERCOAT",
    category: "THE H.O.P.E. RANGE",
    keySellingPoint: "Pure alpaca from Peru — exceptionally soft and lightweight",
    composition: "100% Alpaca",
    weight: "400–500 g/m²",
    priceIndex: 3,
    garments: ["OUTERWEAR"],
    fibre: ["ALPACA"],
    description: "The Alpaca Overcoat is woven from pure alpaca fibre sourced from Peru — one of the world's most prized natural fibres for its extraordinary combination of softness, warmth, and lightness. Alpaca has a natural lustre that gives the cloth a subtle sheen, and the fibre is naturally hypoallergenic. The cloth is woven at a weight that provides genuine warmth without the heaviness of conventional wool overcoating.",
  },
  {
    id: "naturally-dyed-saxony",
    name: "NATURALLY DYED SAXONY SUIT",
    category: "THE H.O.P.E. RANGE",
    keySellingPoint: "Plant-based dyes on traditional Saxony wool",
    composition: "100% Wool Saxony",
    weight: "320–380 g/m²",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    isNew: true,
    description: "Naturally Dyed Saxony Suit uses plant-based and mineral dyes — rather than synthetic chemical dyes — to colour a traditional Saxony wool base. Saxony is a classic coating and suiting fabric with a soft, slightly napped surface; the natural dyeing process gives the cloth colours of a particular depth and subtlety that cannot be achieved with synthetic dyes. Each piece is unique in its precise colouration.",
  },
  {
    id: "naturally-dyed-rustic",
    name: "NATURALLY DYED RUSTIC TROPICAL",
    category: "THE H.O.P.E. RANGE",
    keySellingPoint: "Natural dyes on an open-weave tropical weight",
    composition: "100% Wool",
    weight: "200–240 g/m²",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    isNew: true,
    description: "Naturally Dyed Rustic Tropical applies the same natural dyeing philosophy to a lightweight, open-weave tropical suiting structure — the kind of cloth designed for warm climates and summer wear. The open weave provides excellent breathability, while the natural dyes give the cloth an organic, earthy palette that is entirely different from the sharp, synthetic colours of conventional tropical suitings.",
  },
  {
    id: "naturally-dyed-montecarlo",
    name: "NATURALLY DYED MONTECARLO JACKET",
    category: "THE H.O.P.E. RANGE",
    keySellingPoint: "Natural dyes on a sport jacket weight",
    composition: "100% Wool",
    weight: "270–310 g/m²",
    priceIndex: 2,
    garments: ["JACKET"],
    fibre: ["WOOL"],
    isNew: true,
    description: "Naturally Dyed Montecarlo Jacket brings the natural dyeing approach to a sport jacket weight — a medium-weight cloth with enough structure for a jacket but enough drape for casual wear. The Montecarlo name evokes the glamour and informality of the Mediterranean, and the naturally dyed palette reflects this: warm terracottas, soft ochres, and the muted greens of the Ligurian coast.",
  },
  {
    id: "biellese-wool-coat",
    name: "\"BIELLESE\" WOOL COAT",
    category: "THE H.O.P.E. RANGE",
    keySellingPoint: "Celebrates the Biella wool district heritage",
    composition: "100% Biellese Wool",
    weight: "450–550 g/m²",
    priceIndex: 2,
    garments: ["OUTERWEAR"],
    fibre: ["WOOL"],
    description: "The \"Biellese\" Wool Coat is a direct celebration of the Biella wool district — the geographic and cultural heart of Italian wool production. The cloth is made exclusively from wool produced in the Biella area, using traditional production methods that have been refined over centuries. The result is a coating fabric with a genuine sense of place: the characteristic hand feel, weight, and appearance of Biellese wool at its finest.",
  },
  // ── OFFLIMITS ─────────────────────────────────────────────────────────────
  {
    id: "the-icons-offlimits",
    name: "THE ICONS",
    category: "OFFLIMITS",
    keySellingPoint: "Smart casual signature fabrics for the boundary between tailoring and casualwear",
    composition: "Wool & Blend",
    weight: "240–290 g/m²",
    priceIndex: 2,
    garments: ["JACKET", "CASUAL"],
    fibre: ["WOOL", "BLEND"],
    description: "The Icons within the Offlimits category represents VBC's smart casual signature fabrics — cloths designed for the space between formal tailoring and casualwear. These are the fabrics for the client who wants the quality and craft of VBC in a context that is deliberately less formal: the sport jacket, the casual trouser, the weekend coat.",
  },
  {
    id: "daytoday",
    name: "DAYTODAY",
    category: "OFFLIMITS",
    keySellingPoint: "Comfortable, durable, versatile everyday wear fabrics",
    composition: "Wool & Cotton Blend",
    weight: "250–300 g/m²",
    priceIndex: 0,
    garments: ["JACKET", "PANTS", "CASUAL"],
    fibre: ["WOOL", "COTTON", "BLEND"],
    description: "DayToday is VBC's everyday casual collection — fabrics designed for the demands of daily life rather than the formality of the office or the occasion. The cloths are woven from wool and cotton blends that provide comfort, durability, and easy care, in a range of colours and textures that work across the full spectrum of casual dress codes. DayToday is the collection for the client who wants VBC quality in their weekend wardrobe.",
  },
  {
    id: "crossover",
    name: "CROSSOVER",
    category: "OFFLIMITS",
    keySellingPoint: "Fabrics that work across dress codes",
    composition: "Wool & Blend",
    weight: "240–280 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS", "CASUAL"],
    fibre: ["WOOL", "BLEND"],
    description: "CrossOver is designed for the contemporary wardrobe in which the boundaries between formal and casual have become increasingly fluid. The collection provides fabrics that work equally well as a suit, a sport jacket, or a casual trouser — cloths that can be dressed up or down without looking out of place in either context. The key is in the colour palette and texture: neither too formal nor too casual, CrossOver fabrics are genuinely versatile.",
  },
  {
    id: "streetsmart",
    name: "STREETSMART",
    category: "OFFLIMITS",
    keySellingPoint: "Urban-inspired fabrics for the modern city wardrobe",
    composition: "Wool & Technical Blend",
    weight: "220–260 g/m²",
    priceIndex: 1,
    garments: ["JACKET", "PANTS", "CASUAL"],
    fibre: ["WOOL", "BLEND"],
    isNew: true,
    description: "StreetSmart is VBC's most urban collection — fabrics that draw their inspiration from the visual language of the contemporary city. The cloths combine the quality and craft of VBC's traditional production with colours, textures, and structures that reflect the energy and diversity of modern urban life. StreetSmart is the collection for the client who wants VBC quality in a context that is explicitly contemporary.",
  },
];

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const ALL_FIBRES: Fibre[] = ["WOOL", "CASHMERE", "COTTON", "LINEN", "SILK", "MOHAIR", "ALPACA", "BLEND"];
const ALL_GARMENTS: Garment[] = ["SUIT", "JACKET", "PANTS", "SHIRT", "OUTERWEAR", "CASUAL"];
const ALL_CATEGORIES: Category[] = ["CLASSIC", "VINTAGE", "EARTH WIND & FIRE", "SUPERSONIC", "THE H.O.P.E. RANGE", "OFFLIMITS"];

const PRICE_LABELS = ["ENTRY", "CLASSIC", "PREMIUM", "PRESTIGE"];
const PRICE_COLORS = [
  { bg: "#f5f5f5", text: "#666" },
  { bg: "#e8f0e8", text: "#3a6b3a" },
  { bg: "#e8f0f8", text: "#1a4a7a" },
  { bg: "#f8f0e0", text: "#8a5a00" },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function VBCAnthology() {
  useSEO({
    title: "Vitale Barberis Canonico Fabric Anthology | Tailors.hk",
    description: "Explore the Vitale Barberis Canonico fabric anthology — Italy's oldest wool mill, producing for Kiton, Brioni and the world's finest tailors. Curated by Tailors.hk.",
    canonical: "https://tailors.hk/vbc-anthology",
    schema: [
      SCHEMAS.organization(),
      SCHEMAS.breadcrumb([
        { name: 'Home', url: '/' },
        { name: 'VBC Anthology', url: '/vbc-anthology' },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Vitale Barberis Canonico Fabric Anthology | Tailors.hk",
        "description": "Explore the Vitale Barberis Canonico fabric anthology — Italy's oldest wool mill, producing for Kiton, Brioni and the world's finest tailors. Curated by Tailors.hk.",
        "url": "https://tailors.hk/vbc-anthology",
        "about": {
          "@type": "Product",
          "name": "Vitale Barberis Canonico Suiting Fabrics",
          "description": "Vitale Barberis Canonico suiting fabrics — Italy's oldest wool mill, producing for Kiton and Brioni",
          "brand": { "@type": "Brand", "name": "Vitale Barberis Canonico" }
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
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/BXAsZfqUdLFfTqpX.jpg"
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
                VITALE BARBERIS
              </h1>
              <p style={{ fontFamily: F.display, fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#555", margin: "0 0 20px" }}>
                EST. 1663 · BIELLA, ITALY
              </p>
              <p style={{ fontFamily: F.body, fontSize: "15px", lineHeight: 1.75, color: "#888", maxWidth: "560px" }}>
                A complete reference to Vitale Barberis Canonico's fabric collections — from the iconic Solaro® and Greenhills Super 180's to the sustainable H.O.P.E. range and the contemporary Offlimits lifestyle fabrics. {COLLECTIONS.length} collections spanning suiting, outerwear, and casual wear.
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px", alignItems: "center", flexShrink: 0 }}>
              <BookmarkButton
                item={{
                  slug: "vbc-anthology",
                  title: "Vitale Barberis Fabric Anthology",
                  category: "FABRIC REFERENCE",
                  img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/BXAsZfqUdLFfTqpX.jpg",
                  excerpt: `${COLLECTIONS.length} collections profiled with composition, weight, garment suitability, and price tier.`,
                }}
              />
              <ShareButton
                title="Vitale Barberis Fabric Anthology — Tailors.hk"
                text={`A complete reference to Vitale Barberis Canonico's fabric collections — ${COLLECTIONS.length} collections spanning suiting, outerwear, and casual wear.`}
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            {[
              { label: "COLLECTIONS", value: String(COLLECTIONS.length) },
              { label: "CATEGORIES", value: "6" },
              { label: "MILL", value: "VITALE BARBERIS · BIELLA" },
              { label: "EST.", value: "1663" },
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
              placeholder="SEARCH COLLECTIONS..."
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
            {filtered.length} COLLECTION{filtered.length !== 1 ? "S" : ""} · {[activeCategory !== "ALL" ? activeCategory : "", activeFibre !== "ALL" ? activeFibre : "", activeGarment !== "ALL" ? activeGarment : ""].filter(Boolean).join(" · ") || "ALL CATEGORIES & FIBRES"}
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
                          {c.category} · VITALE BARBERIS
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
              NO COLLECTIONS MATCH YOUR SEARCH
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
            VITALE BARBERIS · EST. 1663
          </h2>
          <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.8, color: "#777", marginBottom: "24px" }}>
            Founded in 1663 in Biella, Piedmont, Vitale Barberis Canonico is the oldest wool mill in the world still in continuous production. For over three and a half centuries, the mill has produced fabrics that have clothed the most discerning tailoring clients across the globe — from the classic Solaro® to the ultra-fine Greenhills Super 180's. The mill's range spans everything from entry-level business suitings to the sustainable H.O.P.E. range and the contemporary Offlimits lifestyle fabrics. VBC fabrics are available through Tailors.hk as the entry-tier option for bespoke and MTM commissions.
          </p>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {[
              { label: "FOUNDED", value: "1663" },
              { label: "LOCATION", value: "BIELLA, ITALY" },
              { label: "SPECIALITY", value: "SUITING · OUTERWEAR · LIFESTYLE" },
              { label: "TIER", value: "ENTRY · VITALE BARBERIS" },
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
