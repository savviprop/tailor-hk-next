"use client";
import { useSEO, SCHEMAS } from "@/hooks/useSEO";
/**
 * ScabalAnthology — Scabal Fabric Anthology
 * Design: Dark mono editorial, matching HollandSherryAnthology card format
 * Layout: Category tabs + filter bar + expandable grid cards
 * Data: Scabal collections from fabrics.scabal.com (73 collections)
 * Mill: Scabal · Est. 1938 · Brussels, Belgium
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
type Fibre   = "WOOL" | "CASHMERE" | "COTTON" | "LINEN" | "SILK" | "MOHAIR" | "VICUÑA" | "BLEND";
type Category = "SUITING" | "LUXURY & SPECIAL" | "CASUAL & LIFESTYLE" | "SEASONAL & TREND" | "SPECIALIST";

interface ScabalCollection {
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
  swatchCount?: number;
  notes?: string;
  isNew?: boolean;
  isTopSeller?: boolean;
}

const COLLECTIONS: ScabalCollection[] = [
  // ── SUITING ──────────────────────────────────────────────────────────────
  {
    id: "new-deluxe",
    name: "NEW DELUXE",
    category: "SUITING",
    keySellingPoint: "Scabal's most comprehensive suiting range",
    composition: "100% Wool Super 100s–150s",
    weight: "250–310 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    isTopSeller: true,
    swatchCount: 131,
    description: "New Deluxe is Scabal's flagship suiting collection and the most comprehensive in the range, with 131 swatches covering the full spectrum of business and formal suiting requirements. Woven from Super 100s to Super 150s Merino wool in the finest mills of England and Italy, the collection spans plain weaves, twills, herringbones, checks, and stripes in the complete palette of business colours. New Deluxe is the collection that defines Scabal's identity as a suiting mill.",
  },
  {
    id: "eton",
    name: "ETON",
    category: "SUITING",
    keySellingPoint: "Classic British suiting with 86 options",
    composition: "100% Wool",
    weight: "260–310 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    isTopSeller: true,
    swatchCount: 86,
    description: "Eton is named after the most celebrated school in England and the sartorial tradition it represents. The collection provides 86 swatches of classic British suiting — the patterns, structures, and colours that have defined English tailoring for generations. Chalk stripes, windowpanes, Prince of Wales checks, and the full range of plain weaves in navy, charcoal, and grey. Eton is the collection for the client who wants to dress with the authority of tradition.",
  },
  {
    id: "the-royal",
    name: "THE ROYAL",
    category: "SUITING",
    keySellingPoint: "Premium suiting with 84 distinguished options",
    composition: "100% Wool Super 120s–160s",
    weight: "240–290 g/m²",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    isTopSeller: true,
    swatchCount: 84,
    description: "The Royal is Scabal's premium suiting collection, offering 84 swatches of fine wool suiting from Super 120s to Super 160s. The collection is designed for the client who wants a suit of genuine distinction — cloths with a noticeably finer hand feel, a more refined surface, and a more elevated drape than standard business suitings. The Royal spans the full range of formal and business suiting requirements at the premium level.",
  },
  {
    id: "savile-row",
    name: "SAVILE ROW",
    category: "SUITING",
    keySellingPoint: "The Savile Row tradition in 50 swatches",
    composition: "100% Wool Super 130s",
    weight: "260–300 g/m²",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 50,
    description: "Savile Row is Scabal's homage to the world's most famous tailoring street. The collection captures the essence of the Savile Row tradition — the precise weave structures, the restrained colour palette, the subtle patterns that distinguish a properly dressed man from a merely well-dressed one. 50 swatches of fine wool suiting that embody the values of English tailoring at its finest.",
  },
  {
    id: "savile-row-classics",
    name: "SAVILE ROW CLASSICS",
    category: "SUITING",
    keySellingPoint: "Timeless Savile Row patterns, year-round",
    composition: "100% Wool",
    weight: "270–320 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 42,
    description: "Savile Row Classics extends the Savile Row collection with a focus on the most enduring patterns — the classics that have never gone out of fashion and never will. 42 swatches of year-round weight suiting in the patterns that define the Savile Row aesthetic: chalk stripes, herringbones, and the subtle checks that have been worn on that famous street for over a century.",
  },
  {
    id: "classics",
    name: "CLASSICS",
    category: "SUITING",
    keySellingPoint: "The essential suiting reference — 69 options",
    composition: "100% Wool",
    weight: "260–310 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 69,
    description: "Classics is exactly what the name implies — the essential reference for classic suiting. 69 swatches covering the full range of traditional suiting patterns and colours, from plain navy and charcoal to chalk stripes, herringbones, and windowpanes. Woven from fine Merino wool at a year-round weight, Classics is the collection that provides the backbone of any well-dressed man's wardrobe.",
  },
  {
    id: "galaxy",
    name: "GALAXY",
    category: "SUITING",
    keySellingPoint: "Fine suiting with a luminous quality — 54 swatches",
    composition: "Wool & Silk Blend",
    weight: "240–280 g/m²",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "SILK", "BLEND"],
    swatchCount: 54,
    description: "Galaxy takes its name from the luminous quality of its wool and silk blends. The silk content adds a characteristic sheen and brightness to the fine Merino base, creating cloths that have a subtle iridescence — particularly noticeable under artificial light. 54 swatches spanning the full range of business and formal suiting in a collection that is quietly extraordinary.",
  },
  {
    id: "festival",
    name: "FESTIVAL",
    category: "SUITING",
    keySellingPoint: "Celebratory suiting for special occasions — 58 swatches",
    composition: "100% Wool Super 120s",
    weight: "240–280 g/m²",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 58,
    description: "Festival is Scabal's collection for the occasions that matter — the weddings, the celebrations, the events that call for a suit of genuine distinction. 58 swatches of fine Super 120s wool in the colours and patterns that are appropriate for formal occasions: the deep navies, the rich charcoals, and the subtle patterns that make a suit memorable without being ostentatious.",
  },
  {
    id: "cosmopolitan",
    name: "COSMOPOLITAN",
    category: "SUITING",
    keySellingPoint: "Contemporary suiting for the global professional — 44 swatches",
    composition: "100% Wool Super 120s",
    weight: "240–270 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 44,
    description: "Cosmopolitan is designed for the professional who operates across cultures and time zones — a collection that works equally well in London, New York, Tokyo, and Hong Kong. 44 swatches of fine Super 120s wool in the colours and patterns that transcend national sartorial traditions, providing a wardrobe that is universally appropriate and consistently distinguished.",
  },
  {
    id: "capri",
    name: "CAPRI",
    category: "SUITING",
    keySellingPoint: "Mediterranean-inspired suiting — 47 swatches",
    composition: "100% Wool",
    weight: "220–260 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 47,
    description: "Capri takes its inspiration from the island of the same name — the colours of the Mediterranean, the lightness of the Italian summer, the relaxed elegance of the Amalfi Coast. 47 swatches of lightweight wool suiting in the blues, greys, and warm tones that evoke the Italian Riviera. A collection for the client who wants a suit that feels as good as it looks.",
  },
  {
    id: "londoner",
    name: "LONDONER",
    category: "SUITING",
    keySellingPoint: "The London professional's essential wardrobe — 45 swatches",
    composition: "100% Wool",
    weight: "260–300 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 45,
    description: "Londoner is designed for the professional who works in the City — the bankers, lawyers, and consultants who need a suit that projects authority, reliability, and taste. 45 swatches of fine wool suiting in the colours and patterns that define the London professional wardrobe: the deep navies, the charcoals, the subtle stripes, and the restrained checks that have dressed the Square Mile for generations.",
  },
  {
    id: "image",
    name: "IMAGE",
    category: "SUITING",
    keySellingPoint: "Classic business suiting in traditional patterns — 46 swatches",
    composition: "100% Wool",
    weight: "260–300 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 46,
    description: "Image is Scabal's classic business suiting collection — the cloths that project the image of a well-dressed professional. 46 swatches of fine wool suiting in the traditional business patterns: plain weaves, subtle twills, and the classic stripes and checks that have defined business dress for decades. Image is the collection for the client who wants a suit that works every day without ever looking ordinary.",
  },
  {
    id: "tornado",
    name: "TORNADO",
    category: "SUITING",
    keySellingPoint: "Dynamic suiting with energy and movement — 42 swatches",
    composition: "100% Wool Super 120s",
    weight: "240–280 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 42,
    description: "Tornado brings energy and dynamism to the Scabal suiting range. 42 swatches of fine Super 120s wool in patterns that have a directional quality — the stripes, the checks, and the weave structures that give the cloth a sense of movement. For the client who wants a suit that is active and contemporary without sacrificing the quality and craft that Scabal represents.",
  },
  {
    id: "triumph",
    name: "TRIUMPH",
    category: "SUITING",
    keySellingPoint: "Victorious suiting for the ambitious professional — 42 swatches",
    composition: "100% Wool Super 120s",
    weight: "250–290 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 42,
    description: "Triumph is designed for the client who wants a suit that projects success. 42 swatches of fine Super 120s wool in the colours and patterns that communicate authority and achievement — the deep navies, the rich charcoals, and the confident stripes that have dressed successful professionals across the globe. A collection that lives up to its name.",
  },
  {
    id: "rhapsody",
    name: "RHAPSODY",
    category: "SUITING",
    keySellingPoint: "Harmonious suiting blends — 37 swatches",
    composition: "Wool & Blend",
    weight: "240–280 g/m²",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "BLEND"],
    swatchCount: 37,
    description: "Rhapsody is a collection of harmonious blends — fabrics in which different fibres are combined to create cloths that are greater than the sum of their parts. 37 swatches of wool-based blends that exploit the complementary qualities of different fibres: the structure of wool, the softness of cashmere, the brightness of silk, the freshness of linen. Each cloth in the collection is a carefully considered composition.",
  },
  {
    id: "champion",
    name: "CHAMPION",
    category: "SUITING",
    keySellingPoint: "Performance suiting for the active professional — 39 swatches",
    composition: "Wool & Elastane Blend",
    weight: "240–270 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "BLEND"],
    swatchCount: 39,
    description: "Champion introduces performance stretch into the Scabal suiting range. 39 swatches of wool and elastane blends that provide the freedom of movement demanded by the active professional — the commuter, the traveller, the executive who needs a suit that performs as well at the end of a long day as it does at the beginning. The stretch is carefully balanced to avoid any visual distortion of the cloth.",
  },
  {
    id: "dynamic",
    name: "DYNAMIC",
    category: "SUITING",
    keySellingPoint: "Active suiting with natural stretch — 36 swatches",
    composition: "Wool & Stretch Blend",
    weight: "230–270 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "BLEND"],
    swatchCount: 36,
    description: "Dynamic is Scabal's natural stretch suiting collection — fabrics that provide comfort and freedom of movement through fibre selection and weave construction rather than synthetic elastane. 36 swatches of wool-based stretch fabrics that look and behave like conventional suitings but provide significantly greater comfort in wear. The collection is designed for the professional who refuses to compromise between appearance and comfort.",
  },
  {
    id: "turbo-travel",
    name: "TURBO TRAVEL",
    category: "SUITING",
    keySellingPoint: "Travel-optimised suiting with crease resistance — 39 swatches",
    composition: "100% Wool High-Twist",
    weight: "220–260 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 39,
    description: "Turbo Travel is engineered for the modern business traveller. 39 swatches of high-twist wool suiting that can be packed in a suitcase for a transatlantic flight and emerge ready to wear. The high-twist construction gives the cloth an exceptional resistance to creasing, while the lighter weight ensures comfort on long journeys. Turbo Travel is the collection for the client who lives out of a suitcase.",
  },
  {
    id: "concerto",
    name: "CONCERTO",
    category: "SUITING",
    keySellingPoint: "Harmonious suiting with stretch comfort — 29 swatches",
    composition: "Wool & Elastane",
    weight: "250–290 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "BLEND"],
    swatchCount: 29,
    description: "Concerto introduces a measured degree of mechanical stretch into a classic worsted suiting structure. 29 swatches of wool and elastane blends that allow the cloth to move with the wearer without compromising the clean lines of a tailored suit. The elastane content is carefully balanced to avoid any visual distortion — the cloth looks like a conventional worsted but performs like a stretch fabric.",
  },
  {
    id: "connect",
    name: "CONNECT",
    category: "SUITING",
    keySellingPoint: "Connected suiting for the modern professional — 27 swatches",
    composition: "100% Wool",
    weight: "240–280 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 27,
    description: "Connect is designed for the professional who needs to make an impression in any context — the boardroom, the client meeting, the networking event. 27 swatches of fine wool suiting in the colours and patterns that project confidence and competence. Connect is the collection for the client who understands that a well-chosen suit is one of the most powerful tools in the professional's arsenal.",
  },
  {
    id: "bliss",
    name: "BLISS",
    category: "SUITING",
    keySellingPoint: "Pure pleasure in fine wool suiting — 31 swatches",
    composition: "100% Wool Super 120s",
    weight: "240–270 g/m²",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 31,
    description: "Bliss is the collection for the client who wants a suit that is a pleasure to wear — not just to look at. 31 swatches of fine Super 120s wool with a particularly soft hand feel and a drape that is immediately noticeable. The cloth has been finished to enhance its natural softness, creating a suiting experience that is genuinely luxurious without the fragility of the very finest super numbers.",
  },
  {
    id: "amalfi-trend",
    name: "AMALFI TREND",
    category: "SUITING",
    keySellingPoint: "Mediterranean trend suiting — 34 swatches",
    composition: "100% Wool",
    weight: "220–260 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 34,
    description: "Amalfi Trend takes its inspiration from the Amalfi Coast — the colours, the light, and the relaxed sophistication of southern Italy. 34 swatches of lightweight wool suiting with a contemporary edge, incorporating the trend colours and patterns of the current season while maintaining the quality and craft that Scabal represents. A collection that is fashionable without being transient.",
  },
  {
    id: "panorama",
    name: "PANORAMA",
    category: "SUITING",
    keySellingPoint: "Wide-ranging suiting overview — 12 swatches",
    composition: "100% Wool",
    weight: "260–300 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 12,
    description: "Panorama provides a curated overview of the Scabal suiting range — 12 swatches that represent the breadth and quality of the collection. Each swatch has been selected to demonstrate a different aspect of Scabal's suiting expertise: the plain weaves, the patterns, the weights, and the colour palette that define the house's approach to suiting.",
  },
  {
    id: "sapphire",
    name: "SAPPHIRE",
    category: "SUITING",
    keySellingPoint: "Gem-quality suiting with deep colour saturation — 23 swatches",
    composition: "100% Wool Super 130s",
    weight: "240–280 g/m²",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 23,
    description: "Sapphire is named for the depth and clarity of its colour palette. 23 swatches of fine Super 130s wool in colours of exceptional saturation and depth — the deep navies, the rich blues, and the intense charcoals that give the collection its gem-like quality. The cloth has a surface of extraordinary smoothness that allows the colours to express themselves fully.",
  },
  {
    id: "obsession",
    name: "OBSESSION",
    category: "SUITING",
    keySellingPoint: "Compellingly fine suiting — 23 swatches",
    composition: "100% Wool Super 130s",
    weight: "240–270 g/m²",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 23,
    description: "Obsession is the collection for the client who cannot stop thinking about the perfect suit. 23 swatches of fine Super 130s wool that represent Scabal's obsessive attention to quality — the precise weave structures, the immaculate finishing, and the careful colour development that make each cloth in the collection genuinely extraordinary.",
  },
  {
    id: "sonata",
    name: "SONATA",
    category: "SUITING",
    keySellingPoint: "Composed suiting in fine wool — 25 swatches",
    composition: "100% Wool Super 120s",
    weight: "240–280 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 25,
    description: "Sonata is a collection of carefully composed suitings — fabrics in which every element has been considered and balanced to create a cloth of harmonious quality. 25 swatches of fine Super 120s wool in patterns that have the precision and structure of a musical composition. For the client who appreciates the craft that goes into a truly well-made cloth.",
  },
  {
    id: "golden-gate",
    name: "GOLDEN GATE",
    category: "SUITING",
    keySellingPoint: "Iconic suiting with American confidence — 29 swatches",
    composition: "100% Wool Super 120s",
    weight: "240–280 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 29,
    description: "Golden Gate takes its name from the iconic San Francisco bridge — a structure that combines engineering precision with aesthetic grandeur. 29 swatches of fine Super 120s wool in the colours and patterns that project American confidence and ambition. A collection for the client who wants a suit that makes a statement without sacrificing refinement.",
  },
  {
    id: "harmony",
    name: "HARMONY",
    category: "SUITING",
    keySellingPoint: "Balanced suiting for every occasion — 20 swatches",
    composition: "100% Wool",
    weight: "250–290 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 20,
    description: "Harmony is the collection for the client who wants a suit that works in every context — the office, the dinner, the weekend. 20 swatches of fine wool suiting in the colours and patterns that are universally appropriate: the balanced navies, the harmonious greys, and the subtle patterns that never look out of place. Harmony is the collection for the client who values versatility.",
  },
  {
    id: "miracle",
    name: "MIRACLE",
    category: "SUITING",
    keySellingPoint: "Exceptional performance in fine wool — 34 swatches",
    composition: "100% Wool Super 120s",
    weight: "240–270 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 34,
    description: "Miracle is the collection for the client who wants a suit that performs exceptionally well in every respect — appearance, comfort, durability, and crease resistance. 34 swatches of fine Super 120s wool that have been engineered to provide the best possible performance in daily wear. The miracle is in the combination of qualities that the cloth achieves.",
  },
  {
    id: "sleek",
    name: "SLEEK",
    category: "SUITING",
    keySellingPoint: "Smooth, clean suiting with a modern edge — 26 swatches",
    composition: "100% Wool Super 130s",
    weight: "230–260 g/m²",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 26,
    description: "Sleek is the collection for the client who wants a suit with a clean, modern aesthetic. 26 swatches of fine Super 130s wool with a particularly smooth surface and a contemporary colour palette — the precise navies, the clean charcoals, and the subtle patterns that define modern business dress. Sleek is the collection for the client who appreciates restraint.",
  },
  {
    id: "vision",
    name: "VISION",
    category: "SUITING",
    keySellingPoint: "Forward-looking suiting — 12 swatches",
    composition: "100% Wool Super 120s",
    weight: "240–280 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 12,
    description: "Vision is a focused collection of 12 swatches that represent Scabal's vision for the future of suiting — the colours, patterns, and structures that will define business dress in the coming seasons. Each swatch has been selected to demonstrate a specific aspect of Scabal's forward-looking approach to suiting design.",
  },
  {
    id: "passion",
    name: "PASSION",
    category: "SUITING",
    keySellingPoint: "Passionate suiting for the dedicated dresser — 12 swatches",
    composition: "100% Wool Super 120s",
    weight: "240–280 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 12,
    description: "Passion is the collection for the client who is passionate about dressing well — who understands that the choice of cloth is as important as the cut of the suit. 12 swatches of fine Super 120s wool that represent Scabal's passion for quality: the precise weave structures, the careful colour development, and the immaculate finishing that make each cloth a statement of intent.",
  },
  {
    id: "mosaic",
    name: "MOSAIC",
    category: "SUITING",
    keySellingPoint: "Richly patterned suiting — 18 swatches",
    composition: "100% Wool",
    weight: "260–300 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 18,
    description: "Mosaic is a collection of richly patterned suitings — fabrics in which the pattern is as important as the colour. 18 swatches of fine wool suiting with complex, multi-colour patterns that reward close inspection: the intricate checks, the subtle overplaids, and the sophisticated patterns that distinguish a cloth of genuine quality from a merely competent one.",
  },
  {
    id: "pegasus",
    name: "PEGASUS",
    category: "SUITING",
    keySellingPoint: "Elevated suiting that takes flight — 17 swatches",
    composition: "100% Wool Super 130s",
    weight: "240–280 g/m²",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 17,
    description: "Pegasus is named after the winged horse of Greek mythology — a symbol of inspiration and elevation. 17 swatches of fine Super 130s wool that represent Scabal's most elevated suiting — cloths with a quality that takes the wearer above the ordinary. The collection is designed for the client who wants a suit that is genuinely exceptional.",
  },
  {
    id: "summit",
    name: "SUMMIT",
    category: "SUITING",
    keySellingPoint: "Peak suiting performance — 14 swatches",
    composition: "100% Wool Super 130s",
    weight: "240–270 g/m²",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 14,
    description: "Summit represents the peak of Scabal's standard suiting range. 14 swatches of fine Super 130s wool that have been selected to represent the highest standard of quality in the collection — the cloths with the finest hand feel, the most refined surface, and the most distinguished drape. Summit is the collection for the client who wants the best of the best.",
  },
  {
    id: "diamond-chip",
    name: "DIAMOND CHIP",
    category: "SUITING",
    keySellingPoint: "Brilliant suiting with diamond-like clarity — 28 swatches",
    composition: "100% Wool Super 120s",
    weight: "240–280 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 28,
    description: "Diamond Chip is named for the brilliant clarity of its colour palette and the precision of its weave structures. 28 swatches of fine Super 120s wool with a surface of exceptional smoothness and colours of gem-like clarity. The collection is designed for the client who wants a suit that has the quiet brilliance of a well-cut diamond — understated but unmistakably fine.",
  },
  {
    id: "escape",
    name: "ESCAPE",
    category: "SUITING",
    keySellingPoint: "Liberating suiting for the free spirit — 23 swatches",
    composition: "100% Wool",
    weight: "230–260 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 23,
    description: "Escape is the collection for the client who wants a suit that feels like freedom — a cloth that is comfortable, lightweight, and unrestrictive. 23 swatches of fine wool suiting in the lighter weights and fresher colours that make a suit a pleasure to wear rather than an obligation. Escape is the collection for the client who wants to look impeccable without feeling constrained.",
  },
  // ── LUXURY & SPECIAL ──────────────────────────────────────────────────────
  {
    id: "nobility",
    name: "NOBILITY",
    category: "LUXURY & SPECIAL",
    keySellingPoint: "Scabal's finest suiting — 24 swatches",
    composition: "100% Wool Super 160s–200s",
    weight: "200–240 g/m²",
    priceIndex: 3,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    isTopSeller: true,
    swatchCount: 24,
    description: "Nobility is Scabal's flagship luxury suiting collection — 24 swatches of the finest wools commercially available, from Super 160s to Super 200s. The cloth has a featherweight quality and a surface of extraordinary smoothness that is immediately apparent to the touch. Nobility is the collection for the client who demands the absolute finest — a cloth that represents the pinnacle of the wool weaver's art.",
  },
  {
    id: "wizard",
    name: "WIZARD",
    category: "LUXURY & SPECIAL",
    keySellingPoint: "Magical Super 180s precision suiting — 25 swatches",
    composition: "100% Wool Super 180s",
    weight: "200–230 g/m²",
    priceIndex: 3,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 25,
    description: "Wizard is woven from Super 180s Merino — one of the finest wools commercially available — in a gossamer-fine plain weave that is almost transparent when held to the light. The cloth has a featherweight quality that is extraordinary to wear: cool, smooth, and completely unobtrusive, while retaining enough structure to tailor with precision. Wizard is the choice for the most formal summer occasions and for clients who demand the finest possible cloth.",
  },
  {
    id: "noble-phantom",
    name: "NOBLE PHANTOM",
    category: "LUXURY & SPECIAL",
    keySellingPoint: "Ultra-fine luxury suiting — 20 swatches",
    composition: "100% Wool Super 170s",
    weight: "200–230 g/m²",
    priceIndex: 3,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 20,
    description: "Noble Phantom is woven from Super 170s Merino in a fine plain weave that has an almost ethereal quality. The cloth is so fine that it seems to disappear when worn — the wearer is aware only of the extraordinary comfort and the clean, precise silhouette it creates. Noble Phantom is the collection for the client who wants a suit of the highest possible quality for the most important occasions.",
  },
  {
    id: "noble-fleece",
    name: "NOBLE FLEECE",
    category: "LUXURY & SPECIAL",
    keySellingPoint: "Premium fleece-finish luxury suiting — 24 swatches",
    composition: "100% Wool Super 150s",
    weight: "220–260 g/m²",
    priceIndex: 3,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 24,
    description: "Noble Fleece is woven from Super 150s Merino and finished with a subtle fleece treatment that gives the cloth an extraordinary softness without compromising its structure. The fleece finish adds a warmth and depth to the surface that is particularly noticeable in the richer colours — the deep navies and charcoals take on a velvety quality that is entirely distinctive.",
  },
  {
    id: "noble-star",
    name: "NOBLE STAR",
    category: "LUXURY & SPECIAL",
    keySellingPoint: "Star-quality luxury suiting — 11 swatches",
    composition: "100% Wool Super 160s",
    weight: "210–240 g/m²",
    priceIndex: 3,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 11,
    description: "Noble Star is a focused collection of 11 swatches representing the very finest of Scabal's Super 160s suiting. Each swatch has been selected to demonstrate a specific quality of the cloth — the extraordinary softness, the refined surface, the distinguished drape — that justifies the Noble Star designation. For the client who wants a suit of genuine star quality.",
  },
  {
    id: "pure-vicuna",
    name: "PURE VICUÑA",
    category: "LUXURY & SPECIAL",
    keySellingPoint: "The rarest natural fibre in the world — 6 swatches",
    composition: "100% Vicuña",
    weight: "180–220 g/m²",
    priceIndex: 3,
    garments: ["SUIT", "JACKET"],
    fibre: ["VICUÑA"],
    swatchCount: 6,
    description: "Pure Vicuña represents the absolute pinnacle of natural fibre luxury. The vicuña — a wild camelid native to the high Andes — produces the finest and most valuable natural fibre in the world, with a diameter of just 12–14 microns. Each animal can only be shorn once every three years, and the fibre must be harvested by hand. The resulting cloth has a softness and warmth that is entirely without parallel. 6 swatches of this extraordinary material, available for the most exceptional commissions.",
    notes: "Vicuña is a protected species; all fibres are sourced from certified sustainable harvesting programmes.",
  },
  {
    id: "vicuna-suitings",
    name: "VICUÑA SUITINGS",
    category: "LUXURY & SPECIAL",
    keySellingPoint: "Vicuña blends for extraordinary suiting — 14 swatches",
    composition: "Vicuña & Wool Blend",
    weight: "200–240 g/m²",
    priceIndex: 3,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["VICUÑA", "WOOL", "BLEND"],
    swatchCount: 14,
    description: "Vicuña Suitings provides 14 swatches of vicuña and wool blends — fabrics that combine the extraordinary qualities of vicuña fibre with the structure and versatility of fine Merino wool. The vicuña content adds an unparalleled softness and warmth to the cloth, while the wool provides the structure needed for suiting. A more accessible entry point to the world of vicuña, without compromising on the extraordinary quality of the fibre.",
  },
  {
    id: "vicuna-jacketings",
    name: "VICUÑA JACKETINGS",
    category: "LUXURY & SPECIAL",
    keySellingPoint: "Vicuña blends for sport jackets — 7 swatches",
    composition: "Vicuña & Cashmere Blend",
    weight: "240–280 g/m²",
    priceIndex: 3,
    garments: ["JACKET"],
    fibre: ["VICUÑA", "CASHMERE", "BLEND"],
    swatchCount: 7,
    description: "Vicuña Jacketings provides 7 swatches of vicuña and cashmere blends specifically designed for sport jackets and casual wear. The combination of vicuña and cashmere creates a cloth of extraordinary softness and warmth — two of the world's finest natural fibres working in concert. The collection is designed for the client who wants the ultimate luxury sport jacket.",
  },
  {
    id: "royal-ultimus",
    name: "ROYAL ULTIMUS",
    category: "LUXURY & SPECIAL",
    keySellingPoint: "The ultimate Scabal suiting — 12 swatches",
    composition: "100% Wool Super 200s",
    weight: "190–220 g/m²",
    priceIndex: 3,
    garments: ["SUIT", "JACKET"],
    fibre: ["WOOL"],
    swatchCount: 12,
    description: "Royal Ultimus is the absolute summit of Scabal's suiting range. 12 swatches of Super 200s Merino — among the finest wools commercially available — woven in a gossamer-fine plain weave that is almost transparent when held to the light. The cloth has a featherweight quality and a surface of extraordinary smoothness. Royal Ultimus is reserved for the most exceptional commissions: state occasions, significant celebrations, and clients for whom only the finest will do.",
  },
  {
    id: "royal-fanfare",
    name: "ROYAL FANFARE",
    category: "LUXURY & SPECIAL",
    keySellingPoint: "Ceremonial suiting for grand occasions — 17 swatches",
    composition: "Wool & Precious Fibre Blend",
    weight: "220–260 g/m²",
    priceIndex: 3,
    garments: ["SUIT", "JACKET"],
    fibre: ["WOOL", "SILK", "BLEND"],
    swatchCount: 17,
    description: "Royal Fanfare is designed for the grandest occasions — the state dinners, the royal events, the celebrations that call for a suit of the highest possible distinction. 17 swatches of wool and precious fibre blends that have a ceremonial quality: the rich colours, the subtle lustre, and the immaculate surface that are appropriate for the most formal occasions.",
  },
  {
    id: "lapis-lazuli",
    name: "LAPIS LAZULI",
    category: "LUXURY & SPECIAL",
    keySellingPoint: "Gem-quality suiting with deep blue tones — 12 swatches",
    composition: "100% Wool Super 150s",
    weight: "220–260 g/m²",
    priceIndex: 3,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 12,
    description: "Lapis Lazuli is named after the deep blue semi-precious stone — one of the most prized pigments in the history of art. 12 swatches of fine Super 150s wool in the deep, saturated blues that give the collection its name. The colour depth and clarity of these cloths is extraordinary — achieved through a dyeing process that gives the navy and blue tones a richness and intensity that is immediately apparent.",
  },
  {
    id: "treasure-box",
    name: "TREASURE BOX",
    category: "LUXURY & SPECIAL",
    keySellingPoint: "A curated selection of Scabal's finest — 12 swatches",
    composition: "Wool & Precious Fibre Blends",
    weight: "200–260 g/m²",
    priceIndex: 3,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "CASHMERE", "SILK", "BLEND"],
    swatchCount: 12,
    description: "Treasure Box is exactly what the name implies — a curated selection of Scabal's most precious fabrics. 12 swatches of wool and precious fibre blends that represent the breadth and depth of Scabal's luxury offering: the finest wools, the most exquisite cashmere blends, and the most distinguished silk combinations. Each swatch is a treasure in its own right.",
  },
  {
    id: "silver-cloud",
    name: "SILVER CLOUD",
    category: "LUXURY & SPECIAL",
    keySellingPoint: "Ethereal luxury suiting — 33 swatches",
    composition: "Wool & Cashmere Blend",
    weight: "220–260 g/m²",
    priceIndex: 3,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "CASHMERE", "BLEND"],
    swatchCount: 33,
    description: "Silver Cloud is a collection of wool and cashmere blends that have an ethereal, cloud-like quality. 33 swatches of fabrics that combine the structure of fine Merino wool with the extraordinary softness of cashmere, creating cloths that are both refined and comfortable. The silver tones in the palette give the collection its name — a series of cloths that have the subtle lustre of silver in natural light.",
  },
  {
    id: "silver-shadow",
    name: "SILVER SHADOW",
    category: "LUXURY & SPECIAL",
    keySellingPoint: "Shadowed luxury with subtle metallic tones — 36 swatches",
    composition: "Wool & Cashmere Blend",
    weight: "230–270 g/m²",
    priceIndex: 3,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "CASHMERE", "BLEND"],
    swatchCount: 36,
    description: "Silver Shadow extends the Silver Cloud concept with a focus on the deeper, more shadowed tones of the palette. 36 swatches of wool and cashmere blends in the charcoals, dark greys, and deep navies that have a subtle metallic quality — the shadow of silver in the depths of the colour. A collection of exceptional refinement for the client who wants luxury without ostentation.",
  },
  {
    id: "magus",
    name: "MAGUS",
    category: "LUXURY & SPECIAL",
    keySellingPoint: "Mystical luxury suiting — 14 swatches",
    composition: "Wool & Silk Blend",
    weight: "230–270 g/m²",
    priceIndex: 3,
    garments: ["SUIT", "JACKET"],
    fibre: ["WOOL", "SILK", "BLEND"],
    swatchCount: 14,
    description: "Magus is a collection of wool and silk blends with a mystical, almost otherworldly quality. 14 swatches of fabrics that have an iridescent, shot quality — the silk content creates a characteristic colour shift as the wearer moves, giving the cloth a luminous, almost magical appearance. For the client who wants a suit that is genuinely extraordinary.",
  },
  {
    id: "fascination",
    name: "FASCINATION",
    category: "LUXURY & SPECIAL",
    keySellingPoint: "Irresistibly fine luxury suiting — 14 swatches",
    composition: "100% Wool Super 150s",
    weight: "220–250 g/m²",
    priceIndex: 3,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 14,
    description: "Fascination is the collection for the client who is captivated by the finest possible cloth. 14 swatches of fine Super 150s wool that have been selected for their extraordinary quality — the cloths that are genuinely fascinating to touch, to examine, and to wear. Each swatch in the collection demonstrates a specific aspect of Scabal's mastery of fine wool suiting.",
  },
  {
    id: "doppione",
    name: "DOPPIONE",
    category: "LUXURY & SPECIAL",
    keySellingPoint: "Double-thread silk suiting — 9 swatches",
    composition: "Silk Doppione",
    weight: "200–240 g/m²",
    priceIndex: 3,
    garments: ["SUIT", "JACKET"],
    fibre: ["SILK"],
    swatchCount: 9,
    description: "Doppione is woven from doppione silk — a double-thread silk that creates a characteristic irregular texture in the finished cloth. The doppione structure gives the fabric a natural, organic quality that is entirely different from the smooth, even surface of conventional silk suiting. 9 swatches of this distinctive material, available for the most exceptional summer commissions.",
  },
  {
    id: "beverly-hills",
    name: "BEVERLY HILLS",
    category: "LUXURY & SPECIAL",
    keySellingPoint: "Hollywood glamour in fine suiting — 9 swatches",
    composition: "Wool & Silk Blend",
    weight: "220–260 g/m²",
    priceIndex: 3,
    garments: ["SUIT", "JACKET"],
    fibre: ["WOOL", "SILK", "BLEND"],
    swatchCount: 9,
    description: "Beverly Hills is named after the most glamorous address in the world of entertainment and luxury. 9 swatches of wool and silk blends that have the glamour and confidence of their namesake — cloths with a characteristic lustre and a colour palette that evokes the golden light of Southern California. For the client who wants a suit with genuine star quality.",
  },
  {
    id: "jet-set",
    name: "JET SET",
    category: "LUXURY & SPECIAL",
    keySellingPoint: "Global luxury suiting for the international traveller — 27 swatches",
    composition: "100% Wool Super 130s",
    weight: "230–260 g/m²",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 27,
    description: "Jet Set is designed for the client who travels the world in style — the international executive, the global entrepreneur, the sophisticated traveller who wants a suit that looks impeccable in every city on the itinerary. 27 swatches of fine Super 130s wool with excellent crease resistance and a colour palette that works across cultures and time zones.",
  },
  // ── CASUAL & LIFESTYLE ────────────────────────────────────────────────────
  {
    id: "cashmere-cotton",
    name: "CASHMERE COTTON",
    category: "CASUAL & LIFESTYLE",
    keySellingPoint: "Luxurious cashmere and cotton blend — 36 swatches",
    composition: "Cashmere & Cotton Blend",
    weight: "240–280 g/m²",
    priceIndex: 2,
    garments: ["JACKET", "PANTS", "CASUAL"],
    fibre: ["CASHMERE", "COTTON", "BLEND"],
    swatchCount: 36,
    description: "Cashmere Cotton combines the extraordinary softness of cashmere with the freshness and breathability of cotton. 36 swatches of this distinctive blend in the colours and textures that work for casual and smart-casual wear — the sport jacket, the casual trouser, the weekend coat. The combination of fibres creates a cloth that is both luxurious and practical.",
  },
  {
    id: "cashmere-cord-and-cash-cotton",
    name: "CASHMERE CORD AND CASH COTTON",
    category: "CASUAL & LIFESTYLE",
    keySellingPoint: "Cashmere corduroy and cotton blends — 31 swatches",
    composition: "Cashmere Corduroy & Cashmere Cotton",
    weight: "280–360 g/m²",
    priceIndex: 2,
    garments: ["JACKET", "PANTS", "CASUAL"],
    fibre: ["CASHMERE", "COTTON", "BLEND"],
    swatchCount: 31,
    description: "Cashmere Cord and Cash Cotton provides 31 swatches of cashmere corduroy and cashmere cotton blends — fabrics for the luxury casual wardrobe. The cashmere corduroy has the characteristic ribbed texture of corduroy with the extraordinary softness of cashmere; the cashmere cotton blends provide a lighter, more versatile option for casual wear. A collection for the client who wants luxury in every context.",
  },
  {
    id: "cashmere-denim",
    name: "CASHMERE DENIM",
    category: "CASUAL & LIFESTYLE",
    keySellingPoint: "The ultimate luxury denim — 10 swatches",
    composition: "Cashmere & Cotton Denim",
    weight: "280–340 g/m²",
    priceIndex: 2,
    garments: ["JACKET", "PANTS", "CASUAL"],
    fibre: ["CASHMERE", "COTTON", "BLEND"],
    swatchCount: 10,
    description: "Cashmere Denim is Scabal's most unexpected collection — a denim fabric that incorporates cashmere fibre to create a cloth of extraordinary softness and luxury. 10 swatches of this distinctive material in the classic denim palette: the indigos, the mid-blues, and the washed tones that define denim aesthetics, but with the softness and warmth of cashmere. For the client who wants the ultimate luxury casual wardrobe.",
  },
  {
    id: "corduroy",
    name: "CORDUROY",
    category: "CASUAL & LIFESTYLE",
    keySellingPoint: "Classic corduroy for the country wardrobe — 27 swatches",
    composition: "Cotton & Wool Corduroy",
    weight: "300–400 g/m²",
    priceIndex: 1,
    garments: ["JACKET", "PANTS", "CASUAL"],
    fibre: ["COTTON", "WOOL", "BLEND"],
    swatchCount: 27,
    description: "Corduroy is one of the great classic casual fabrics — a ribbed, cut-pile cloth that has been central to the country and casual wardrobe for over a century. Scabal's Corduroy collection provides 27 swatches of fine corduroy in the colours and rib widths that define the fabric: the warm browns, the rich greens, and the classic navies that work for country jackets, casual trousers, and weekend wear.",
  },
  {
    id: "pure-linen",
    name: "PURE LINEN",
    category: "CASUAL & LIFESTYLE",
    keySellingPoint: "The finest linen for summer tailoring — 32 swatches",
    composition: "100% Linen",
    weight: "180–240 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS", "CASUAL"],
    fibre: ["LINEN"],
    swatchCount: 32,
    description: "Pure Linen is Scabal's collection for summer tailoring — 32 swatches of the finest linen in the colours and textures that work for warm-weather suits, jackets, and trousers. Linen has been the preferred fabric for summer tailoring for centuries: its natural breathability, its characteristic texture, and its ability to keep the wearer cool in hot weather make it the ideal choice for the summer wardrobe.",
  },
  {
    id: "summer-cashmere",
    name: "SUMMER CASHMERE",
    category: "CASUAL & LIFESTYLE",
    keySellingPoint: "Lightweight cashmere for warm-weather luxury — 14 swatches",
    composition: "100% Cashmere",
    weight: "200–240 g/m²",
    priceIndex: 3,
    garments: ["JACKET", "PANTS", "CASUAL"],
    fibre: ["CASHMERE"],
    swatchCount: 14,
    description: "Summer Cashmere is woven from the finest cashmere in a lightweight construction that makes it suitable for warm-weather wear. 14 swatches of pure cashmere in the lighter colours and weights that work for spring and summer jackets and trousers. The cloth has the extraordinary softness and warmth of cashmere in a weight that is comfortable in warmer conditions.",
  },
  {
    id: "lifestyle",
    name: "LIFESTYLE",
    category: "CASUAL & LIFESTYLE",
    keySellingPoint: "Versatile fabrics for the modern lifestyle — 23 swatches",
    composition: "Wool & Blend",
    weight: "240–290 g/m²",
    priceIndex: 1,
    garments: ["JACKET", "PANTS", "CASUAL"],
    fibre: ["WOOL", "BLEND"],
    swatchCount: 23,
    description: "Lifestyle is Scabal's collection for the contemporary wardrobe in which the boundaries between formal and casual have become increasingly fluid. 23 swatches of wool-based fabrics in the colours and textures that work across dress codes — from the smart-casual office to the weekend. The collection provides the versatility that the modern professional requires.",
  },
  {
    id: "freestyle",
    name: "FREESTYLE",
    category: "CASUAL & LIFESTYLE",
    keySellingPoint: "Free-spirited casual fabrics — 25 swatches",
    composition: "Wool & Cotton Blend",
    weight: "230–270 g/m²",
    priceIndex: 1,
    garments: ["JACKET", "PANTS", "CASUAL"],
    fibre: ["WOOL", "COTTON", "BLEND"],
    swatchCount: 25,
    description: "Freestyle is the collection for the client who wants to dress without constraints — fabrics that work in any context and allow the wearer to express their personal style. 25 swatches of wool and cotton blends in the colours and textures that define contemporary casual dressing. Freestyle is the collection for the client who values individuality.",
  },
  {
    id: "hybrid",
    name: "HYBRID",
    category: "CASUAL & LIFESTYLE",
    keySellingPoint: "Between tailoring and casualwear — 20 swatches",
    composition: "Wool & Technical Blend",
    weight: "220–260 g/m²",
    priceIndex: 1,
    garments: ["JACKET", "PANTS", "CASUAL"],
    fibre: ["WOOL", "BLEND"],
    swatchCount: 20,
    description: "Hybrid occupies the space between formal tailoring and casualwear — fabrics that have the quality and craft of Scabal suiting but the comfort and versatility of casual wear. 20 swatches of wool and technical blends that provide the best of both worlds: the appearance of tailoring with the comfort of casualwear.",
  },
  {
    id: "lining",
    name: "LINING",
    category: "CASUAL & LIFESTYLE",
    keySellingPoint: "Premium lining fabrics — 39 options",
    composition: "Silk & Bemberg",
    weight: "80–120 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "OUTERWEAR"],
    fibre: ["SILK", "BLEND"],
    swatchCount: 39,
    description: "Scabal's Lining collection provides 39 options of premium lining fabrics — the silk and Bemberg linings that complete a bespoke or MTM commission. The lining is often overlooked, but it is the first thing the wearer feels when putting on a jacket, and the last impression it makes when removed. Scabal's linings are designed to complement the outer fabric and provide the smooth, comfortable interior that a quality suit requires.",
  },
  // ── SEASONAL & TREND ──────────────────────────────────────────────────────
  {
    id: "flannel-saxony",
    name: "FLANNEL & SAXONY",
    category: "SEASONAL & TREND",
    keySellingPoint: "Classic winter fabrics — 59 swatches",
    composition: "100% Wool",
    weight: "300–400 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS", "OUTERWEAR"],
    fibre: ["WOOL"],
    isTopSeller: true,
    swatchCount: 59,
    description: "Flannel & Saxony is Scabal's comprehensive winter fabric collection — 59 swatches of the classic cold-weather cloths that have defined winter tailoring for generations. Flannel, with its soft, slightly napped surface and exceptional drape, and Saxony, with its denser, more structured character, are the two great winter suiting fabrics. The collection provides the full range of weights, colours, and patterns for the winter wardrobe.",
  },
  {
    id: "autumn-leaves",
    name: "AUTUMN LEAVES",
    category: "SEASONAL & TREND",
    keySellingPoint: "Autumnal colours and textures — 24 swatches",
    composition: "100% Wool",
    weight: "280–340 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 24,
    description: "Autumn Leaves is inspired by the colours and textures of the autumn season — the warm browns, the rich ochres, the deep greens, and the russet tones that define the autumnal palette. 24 swatches of fine wool suiting in the colours that make autumn the most sartorially rich of seasons. For the client who wants a suit that celebrates the season.",
  },
  {
    id: "trend",
    name: "TREND",
    category: "SEASONAL & TREND",
    keySellingPoint: "Current season trend colours and patterns — 24 swatches",
    composition: "100% Wool",
    weight: "240–290 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 24,
    description: "Trend is Scabal's seasonal collection — 24 swatches that capture the colours, patterns, and structures that define the current season's direction. The collection is updated each season to reflect the latest developments in suiting design, providing the client who wants to be current with a curated selection of the most relevant fabrics.",
  },
  {
    id: "jazz",
    name: "JAZZ",
    category: "SEASONAL & TREND",
    keySellingPoint: "Vibrant, improvisational patterns for the bold dresser — 20 swatches",
    composition: "Wool & Blend",
    weight: "240–280 g/m²",
    priceIndex: 1,
    garments: ["JACKET", "SUIT", "CASUAL"],
    fibre: ["WOOL", "BLEND"],
    swatchCount: 20,
    description: "Jazz is named after the music that celebrates improvisation, spontaneity, and individual expression. 20 swatches of wool-based fabrics with vibrant, contemporary patterns — the bold checks, the graphic stripes, and the unexpected colour combinations that make a suit a statement of personal style. Jazz is the collection for the client who dresses with confidence and individuality.",
  },
  // ── SPECIALIST ────────────────────────────────────────────────────────────
  {
    id: "fine-velvet",
    name: "FINE VELVET",
    category: "SPECIALIST",
    keySellingPoint: "Luxury velvet for formal and evening wear — 12 swatches",
    composition: "Silk & Cotton Velvet",
    weight: "280–380 g/m²",
    priceIndex: 2,
    garments: ["JACKET", "SUIT"],
    fibre: ["SILK", "COTTON", "BLEND"],
    swatchCount: 12,
    description: "Fine Velvet provides 12 swatches of silk and cotton velvets for formal and evening wear — the traditional cloth for the velvet dinner jacket and the velvet blazer. The collection spans the full range of velvet weights and surfaces, from the finest silk velvet to the more robust cotton velvet, in the classic velvet palette of midnight blue, bottle green, burgundy, and black.",
  },
  {
    id: "velvets",
    name: "VELVETS",
    category: "SPECIALIST",
    keySellingPoint: "Comprehensive velvet collection — 16 swatches",
    composition: "Cotton & Silk Velvets",
    weight: "280–400 g/m²",
    priceIndex: 2,
    garments: ["JACKET", "SUIT", "CASUAL"],
    fibre: ["COTTON", "SILK", "BLEND"],
    swatchCount: 16,
    description: "Velvets provides a comprehensive range of 16 velvet swatches for formal, evening, and casual wear. The collection includes both the fine silk velvets appropriate for the most formal occasions and the more robust cotton velvets that work for casual jackets and blazers. The full velvet palette: midnight blue, bottle green, burgundy, black, and the seasonal colours.",
  },
  {
    id: "essentials",
    name: "ESSENTIALS",
    category: "SPECIALIST",
    keySellingPoint: "The essential Scabal reference — 11 swatches",
    composition: "100% Wool",
    weight: "260–300 g/m²",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    swatchCount: 11,
    description: "Essentials is a focused collection of 11 swatches that represent the essential Scabal reference — the cloths that every tailor should know and every client should consider. Each swatch has been selected to demonstrate a specific aspect of Scabal's suiting expertise: the plain weaves, the classic patterns, and the essential colours that form the foundation of a well-dressed wardrobe.",
  },
];

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const ALL_FIBRES: Fibre[] = ["WOOL", "CASHMERE", "COTTON", "LINEN", "SILK", "MOHAIR", "VICUÑA", "BLEND"];
const ALL_GARMENTS: Garment[] = ["SUIT", "JACKET", "PANTS", "SHIRT", "OUTERWEAR", "CASUAL"];
const ALL_CATEGORIES: Category[] = ["SUITING", "LUXURY & SPECIAL", "CASUAL & LIFESTYLE", "SEASONAL & TREND", "SPECIALIST"];

const PRICE_LABELS = ["ENTRY", "CLASSIC", "PREMIUM", "PRESTIGE"];
const PRICE_COLORS = [
  { bg: "#f5f5f5", text: "#666" },
  { bg: "#e8f0e8", text: "#3a6b3a" },
  { bg: "#e8f0f8", text: "#1a4a7a" },
  { bg: "#f8f0e0", text: "#8a5a00" },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function ScabalAnthology() {
  useSEO({
    title: "Scabal Fabric Anthology — Luxury Suiting Cloths | Tailors.hk",
    description: "Explore the full Scabal fabric anthology — 73 collections of luxury suiting cloth from Brussels. Curated by Tailors.hk.",
    canonical: "https://tailors.hk/scabal-anthology",
    schema: [
      SCHEMAS.organization(),
      SCHEMAS.breadcrumb([
        { name: 'Home', url: '/' },
        { name: 'Scabal Anthology', url: '/scabal-anthology' },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Scabal Fabric Anthology — Luxury Suiting Cloths | Tailors.hk",
        "description": "Explore the full Scabal fabric anthology — 73 collections of luxury suiting cloth from Brussels. Curated by Tailors.hk.",
        "url": "https://tailors.hk/scabal-anthology",
        "about": {
          "@type": "Product",
          "name": "Scabal Suiting Fabrics",
          "description": "Scabal luxury suiting fabrics from Brussels — 73 collections of premium suiting cloth",
          "brand": { "@type": "Brand", "name": "Scabal" }
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
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/ZejCtjgeenPpZlxu.jpg"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.3, pointerEvents: "none" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.92) 100%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "24px", marginBottom: "40px" }}>
            <div>
              <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.14em", color: "#555", display: "block", marginBottom: "12px" }}>
                § FABRIC ANTHOLOGY · MILL REFERENCE
              </span>
              <h1 style={{ fontFamily: F.display, fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "#fff", lineHeight: 1, margin: "0 0 8px" }}>
                SCABAL
              </h1>
              <p style={{ fontFamily: F.display, fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#555", margin: "0 0 20px" }}>
                EST. 1938 · BRUSSELS, BELGIUM
              </p>
              <p style={{ fontFamily: F.body, fontSize: "15px", lineHeight: 1.75, color: "#888", maxWidth: "560px" }}>
                A complete reference to Scabal's fabric collections — from the flagship New Deluxe suiting and Nobility luxury range to Pure Vicuña, cashmere lifestyle fabrics, and the specialist velvet and linen collections. {COLLECTIONS.length} collections spanning suiting, luxury, casual, and specialist fabrics.
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px", alignItems: "center", flexShrink: 0 }}>
              <BookmarkButton
                item={{
                  slug: "scabal-anthology",
                  title: "Scabal Fabric Anthology",
                  category: "FABRIC REFERENCE",
                  img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/ZejCtjgeenPpZlxu.jpg",
                  excerpt: `${COLLECTIONS.length} collections profiled with composition, weight, garment suitability, and price tier.`,
                }}
              />
              <ShareButton
                title="Scabal Fabric Anthology — Tailors.hk"
                text={`A complete reference to Scabal's fabric collections — ${COLLECTIONS.length} collections spanning suiting, luxury, casual, and specialist fabrics.`}
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            {[
              { label: "COLLECTIONS", value: String(COLLECTIONS.length) },
              { label: "CATEGORIES", value: "5" },
              { label: "MILL", value: "SCABAL · BRUSSELS" },
              { label: "EST.", value: "1938" },
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
                          {c.category} · SCABAL{c.swatchCount ? ` · ${c.swatchCount} SWATCHES` : ""}
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
            SCABAL · EST. 1938
          </h2>
          <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.8, color: "#777", marginBottom: "24px" }}>
            Founded in 1938 in Brussels, Belgium, Scabal has built its reputation on the breadth and depth of its fabric range — from the comprehensive New Deluxe suiting collection to the ultra-fine Nobility and Wizard luxury ranges, and the extraordinary Pure Vicuña. The house is known for its willingness to push the boundaries of what a fabric house can offer: cashmere denim, vicuña suitings, and precious metal thread fabrics sit alongside the most traditional business suitings. Scabal fabrics are available through Tailors.hk for bespoke and MTM commissions across all price tiers.
          </p>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {[
              { label: "FOUNDED", value: "1938" },
              { label: "LOCATION", value: "BRUSSELS, BELGIUM" },
              { label: "SPECIALITY", value: "SUITING · LUXURY · VICUÑA" },
              { label: "COLLECTIONS", value: `${COLLECTIONS.length} RANGES` },
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
              { name: "DORMEUIL", est: "1842", note: "17 BUNCHES", href: "/dormeuil-anthology", desc: "Reims, France" },
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
