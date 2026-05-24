"use client";
import { useSEO, SCHEMAS } from "@/hooks/useSEO";
/**
 * HollandSherryAnthology — Holland & Sherry Fabric Anthology
 * Design: Dark mono editorial, matching FabricAnthology card format
 * Layout: Category tabs + filter bar + expandable grid cards
 * Data: Key H&S collections from their apparel fabric catalogue
 * Mill: Holland & Sherry · Est. 1836 · Savile Row, London
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
type Fibre   = "WOOL" | "CASHMERE" | "COTTON" | "LINEN" | "SILK" | "MOHAIR" | "TWEED" | "BLEND";
type Category = "SUITING" | "OVERCOATING" | "CASUAL & SPORT" | "SEASONAL" | "SPECIALIST";

interface HSCollection {
  id: string;
  name: string;
  category: Category;
  keySellingPoint: string;
  composition: string;
  weight: string;
  priceIndex: number;   // 0–3
  garments: Garment[];
  fibre: Fibre[];
  description: string;
  notes?: string;
  isNew?: boolean;
  isTopSeller?: boolean;
}

const COLLECTIONS: HSCollection[] = [
  // ── SUITING ──────────────────────────────────────────────────────────────
  {
    id: "target",
    name: "TARGET",
    category: "SUITING",
    keySellingPoint: "The benchmark business suit cloth",
    composition: "100% Wool",
    weight: "260–310 g/m",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    isTopSeller: true,
    description: "Target is Holland & Sherry's most enduring suiting collection — a pure wool worsted that has clothed boardrooms and trading floors for generations. Woven in a tight, even plain weave from fine Merino yarns, it delivers a clean, smooth surface with excellent drape and crease recovery. The palette spans the full range of business staples: navy, charcoal, mid-grey, and their countless variations. Target is the cloth against which all other business suitings are measured.",
  },
  {
    id: "target-elite",
    name: "TARGET ELITE",
    category: "SUITING",
    keySellingPoint: "Elevated business suiting",
    composition: "100% Wool Super 120s–150s",
    weight: "240–290 g/m",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    isNew: true,
    description: "Target Elite elevates the Target formula with finer Merino yarns — Super 120s to Super 150s — for a noticeably softer hand feel and a more refined surface. The cloth retains the structural integrity and crease resistance that made Target the standard for business suiting, while adding a subtle lustre and a lighter, more comfortable drape. Ideal for the client who wears a suit every day and demands both performance and refinement.",
  },
  {
    id: "perennial-classics",
    name: "PERENNIAL CLASSICS",
    category: "SUITING",
    keySellingPoint: "Timeless patterns, year-round weight",
    composition: "100% Wool",
    weight: "270–320 g/m",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    isTopSeller: true,
    description: "Perennial Classics is the definitive collection of traditional British suiting patterns — chalk stripes, windowpanes, Prince of Wales checks, and herringbones — woven in pure wool at a year-round weight. Each pattern is rendered with the restraint and precision that distinguishes a Savile Row cloth from a high-street imitation. The collection is a complete wardrobe reference for the client who understands that pattern, not colour, is the true mark of a well-dressed man.",
  },
  {
    id: "seasonal-classics",
    name: "SEASONAL CLASSICS",
    category: "SUITING",
    keySellingPoint: "Classic patterns in seasonal weights",
    composition: "100% Wool",
    weight: "220–360 g/m",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    description: "Seasonal Classics extends the Perennial Classics formula across the full calendar — lighter weights for spring and summer, heavier weights for autumn and winter — while maintaining the same commitment to traditional British patterns. The collection allows the tailor to build a complete wardrobe of classic suitings without ever leaving the Holland & Sherry range.",
  },
  {
    id: "city-of-london",
    name: "CITY OF LONDON VINTAGE SUITING",
    category: "SUITING",
    keySellingPoint: "Archive patterns reissued",
    composition: "100% Wool",
    weight: "280–330 g/m",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    isNew: true,
    description: "Drawn from Holland & Sherry's archive of patterns dating back to the 1950s and 1960s, City of London Vintage Suiting reissues the cloths that dressed the original City of London — the bankers, brokers, and barristers of the Square Mile in its post-war heyday. The patterns are faithful to the originals, woven on the same structures, but finished to contemporary standards. For the client who wants to wear history.",
  },
  {
    id: "concerto",
    name: "CONCERTO",
    category: "SUITING",
    keySellingPoint: "Stretch comfort, formal appearance",
    composition: "Wool & Elastane",
    weight: "250–290 g/m",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "BLEND"],
    description: "Concerto introduces a measured degree of mechanical stretch into a classic worsted suiting structure. The elastane content — carefully balanced to avoid any visual distortion — allows the cloth to move with the wearer without compromising the clean lines of a tailored suit. Ideal for the active professional who travels frequently and requires a suit that performs as well at the end of a long day as it does at the beginning.",
  },
  {
    id: "intercity",
    name: "INTERCITY",
    category: "SUITING",
    keySellingPoint: "Travel-optimised suiting",
    composition: "100% Wool",
    weight: "230–260 g/m",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    description: "InterCity is engineered for the modern business traveller. Woven from high-twist Merino yarns, the cloth has an exceptional resistance to creasing — it can be packed in a suitcase for a transatlantic flight and emerge ready to wear. The high-twist construction also gives the cloth a slightly crisper, cooler hand feel, making it particularly suitable for the warmer months and for clients who run warm.",
  },
  {
    id: "sherry-stretch",
    name: "SHERRY STRETCH",
    category: "SUITING",
    keySellingPoint: "Four-way stretch suiting",
    composition: "Wool & Elastane Blend",
    weight: "240–270 g/m",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "BLEND"],
    description: "Sherry Stretch delivers four-way mechanical stretch in a suiting cloth that looks and behaves like a conventional worsted. The bi-directional stretch provides exceptional freedom of movement — particularly valuable for clients who commute by bicycle, travel frequently, or simply prefer a more active fit. The cloth is available in the full range of business colours and patterns.",
  },
  {
    id: "eco-traveller",
    name: "ECO-TRAVELLER®",
    category: "SUITING",
    keySellingPoint: "Sustainable travel suiting",
    composition: "Recycled Wool & Sustainable Fibres",
    weight: "240–280 g/m",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "BLEND"],
    isNew: true,
    description: "Eco-Traveller® combines Holland & Sherry's commitment to performance suiting with a rigorous approach to sustainability. The cloth is woven from recycled and responsibly sourced fibres, certified to recognised environmental standards, without compromising the crease resistance and packability that define the Traveller family. For the client who demands both performance and provenance.",
  },
  {
    id: "jj-one",
    name: "JJ ONE",
    category: "SUITING",
    keySellingPoint: "Super 150s precision suiting",
    composition: "100% Wool Super 150s",
    weight: "230–260 g/m",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    description: "JJ One is Holland & Sherry's premium fine-wool suiting collection, woven from Super 150s Merino in a tight, even plain weave. The cloth has a silky, almost liquid drape and a surface of exceptional smoothness. It is the cloth for the client who wants the finest possible wool suiting without the fragility of the very highest super numbers — a cloth that can be worn regularly and will last.",
  },
  {
    id: "masterpiece-gold",
    name: "MASTERPIECE GOLD WITH PRECIOUS METALS",
    category: "SUITING",
    keySellingPoint: "The pinnacle of H&S suiting",
    composition: "Wool Super 200s & Precious Metal Threads",
    weight: "200–240 g/m",
    priceIndex: 3,
    garments: ["SUIT", "JACKET"],
    fibre: ["WOOL", "SILK", "BLEND"],
    isNew: true,
    description: "Masterpiece Gold represents the absolute summit of Holland & Sherry's suiting range. Woven from Super 200s Merino — among the finest wools commercially available — and interwoven with threads of genuine precious metals, the cloth has a weight and lustre that is entirely unlike any other suiting fabric. Reserved for the most exceptional commissions: state occasions, significant celebrations, and clients for whom only the finest will do.",
  },
  {
    id: "phantom-gold",
    name: "PHANTOM GOLD",
    category: "SUITING",
    keySellingPoint: "Ultra-fine luxury suiting",
    composition: "100% Wool Super 180s",
    weight: "200–220 g/m",
    priceIndex: 3,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    description: "Phantom Gold is woven from Super 180s Merino in a gossamer-fine plain weave that is almost transparent when held to the light. The cloth has a featherweight quality that is extraordinary to wear — cool, smooth, and completely unobtrusive — while retaining enough structure to tailor cleanly. It is the choice for the most formal summer occasions and for clients who demand the finest possible cloth.",
  },
  // ── OVERCOATING ──────────────────────────────────────────────────────────
  {
    id: "classic-overcoats",
    name: "CLASSIC OVERCOATS & TOPCOATS",
    category: "OVERCOATING",
    keySellingPoint: "The definitive British overcoat cloth",
    composition: "100% Wool",
    weight: "400–600 g/m",
    priceIndex: 1,
    garments: ["OUTERWEAR"],
    fibre: ["WOOL"],
    isTopSeller: true,
    description: "Classic Overcoats & Topcoats is the foundational collection for British outerwear — heavy, dense wool cloths in the traditional overcoating structures: melton, cavalry twill, covert, and herringbone. These are the cloths that have been used for British military and civilian overcoats for over a century, and they remain the standard against which all other overcoating is measured. Substantial, warm, and built to last a lifetime.",
  },
  {
    id: "classic-contemporary-overcoats",
    name: "CLASSIC & CONTEMPORARY OVERCOATS",
    category: "OVERCOATING",
    keySellingPoint: "Traditional structures, modern palette",
    composition: "Wool & Wool Blends",
    weight: "380–550 g/m",
    priceIndex: 1,
    garments: ["OUTERWEAR"],
    fibre: ["WOOL", "BLEND"],
    description: "Classic & Contemporary Overcoats bridges the traditional and the modern — the same heavyweight overcoating structures as the Classic collection, but with an expanded palette that includes contemporary tones alongside the traditional navy, camel, and charcoal. For the client who wants the substance and warmth of a classic British overcoat but in a colour that reflects a more contemporary wardrobe.",
  },
  {
    id: "cashique",
    name: "CASHIQUE",
    category: "OVERCOATING",
    keySellingPoint: "Cashmere-rich overcoating",
    composition: "Cashmere & Wool Blend",
    weight: "400–520 g/m",
    priceIndex: 2,
    garments: ["OUTERWEAR"],
    fibre: ["CASHMERE", "WOOL", "BLEND"],
    isTopSeller: true,
    description: "Cashique is Holland & Sherry's signature cashmere overcoating collection — a blend of cashmere and fine wool that delivers the extraordinary softness and warmth of cashmere in a cloth substantial enough to tailor into a structured overcoat. The cashmere content gives the cloth a depth of colour and a surface quality that pure wool cannot match. Available in the full range of overcoating tones, from classic camel to deep navy.",
  },
  {
    id: "cashique-suits",
    name: "CASHIQUE SUITS",
    category: "OVERCOATING",
    keySellingPoint: "Cashmere suiting weight",
    composition: "Cashmere & Wool Blend",
    weight: "280–340 g/m",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["CASHMERE", "WOOL", "BLEND"],
    description: "Cashique Suits brings the cashmere-wool blend formula of the Cashique overcoating range into a suiting weight. The result is a cloth of exceptional softness and warmth for autumn and winter suiting — the cashmere content provides a tactile quality that sets it apart from pure wool, while the wool structure ensures the cloth tailors cleanly and holds its shape.",
  },
  {
    id: "cashmere-pure-opulence",
    name: "CASHMERE PURE OPULENCE",
    category: "OVERCOATING",
    keySellingPoint: "100% cashmere outerwear",
    composition: "100% Cashmere",
    weight: "420–560 g/m",
    priceIndex: 3,
    garments: ["OUTERWEAR"],
    fibre: ["CASHMERE"],
    description: "Pure Opulence is exactly what its name suggests — a 100% cashmere overcoating cloth of extraordinary quality. Woven from the finest Inner Mongolian cashmere, the cloth has a softness and warmth that is unmatched by any other overcoating material. It is the cloth for the client who wants the finest possible overcoat — a garment that will be worn for decades and improve with age.",
  },
  {
    id: "trenchcoat",
    name: "TRENCHCOAT COLLECTION",
    category: "OVERCOATING",
    keySellingPoint: "Purpose-built trench cloth",
    composition: "Cotton & Cotton Blends",
    weight: "320–420 g/m",
    priceIndex: 1,
    garments: ["OUTERWEAR"],
    fibre: ["COTTON", "BLEND"],
    description: "The Trenchcoat Collection provides the dense, tightly woven cotton gabardines and cavalry twills that are the traditional cloth for the British trench coat. These are robust, weather-resistant cloths that improve with wear — the tight weave provides natural water resistance, and the cotton develops a characteristic patina over time. Available in the classic trench palette: khaki, stone, navy, and olive.",
  },
  // ── CASUAL & SPORT ───────────────────────────────────────────────────────
  {
    id: "harris-tweed",
    name: "HARRIS TWEED",
    category: "CASUAL & SPORT",
    keySellingPoint: "Authentic hand-woven Scottish tweed",
    composition: "100% Pure Virgin Wool",
    weight: "380–450 g/m",
    priceIndex: 2,
    garments: ["JACKET", "PANTS", "OUTERWEAR"],
    fibre: ["WOOL", "TWEED"],
    isTopSeller: true,
    description: "Harris Tweed is one of the most protected and regulated cloths in the world — by Act of Parliament, it can only be made from pure virgin wool, dyed and spun in the Outer Hebrides of Scotland, and hand-woven by islanders in their own homes. Holland & Sherry's Harris Tweed collection offers the full range of traditional patterns — herringbones, windowpanes, and houndstooths — in the rich, earthy palette that characterises authentic island tweed. There is no substitute.",
  },
  {
    id: "sherry-tweed",
    name: "SHERRY TWEED",
    category: "CASUAL & SPORT",
    keySellingPoint: "Holland & Sherry's signature tweed",
    composition: "100% Wool",
    weight: "340–420 g/m",
    priceIndex: 1,
    garments: ["JACKET", "PANTS", "OUTERWEAR"],
    fibre: ["WOOL", "TWEED"],
    isTopSeller: true,
    description: "Sherry Tweed is Holland & Sherry's own tweed collection — a range of traditional and contemporary tweed patterns woven to the mill's exacting standards. The collection covers the full spectrum of tweed applications: from the heaviest shooting tweeds to lighter jacket weights suitable for urban wear. Each cloth is woven with the characteristic irregular surface and rich colour that distinguishes a genuine British tweed from its imitations.",
  },
  {
    id: "moorland-tweeds",
    name: "MOORLAND TWEEDS",
    category: "CASUAL & SPORT",
    keySellingPoint: "Country estate classics",
    composition: "100% Wool",
    weight: "360–440 g/m",
    priceIndex: 1,
    garments: ["JACKET", "PANTS", "OUTERWEAR"],
    fibre: ["WOOL", "TWEED"],
    description: "Moorland Tweeds is a collection of traditional country tweeds designed for the sporting estate — the grouse moor, the deer forest, and the fishing river. The patterns are drawn from the classic vocabulary of British country dress: overplaids, gun-club checks, and heather mixtures in the muted, natural tones of the Scottish and English uplands. Substantial, warm, and built for the outdoors.",
  },
  {
    id: "chequers",
    name: "CHEQUERS",
    category: "CASUAL & SPORT",
    keySellingPoint: "Bold check patterns for sport coats",
    composition: "Wool & Wool Blends",
    weight: "300–380 g/m",
    priceIndex: 1,
    garments: ["JACKET"],
    fibre: ["WOOL", "BLEND"],
    description: "Chequers is a collection of bold, graphic check patterns designed for the sport coat and country jacket. The patterns range from the restrained to the exuberant — from subtle windowpanes to large, statement overplaids — all woven in the robust wool and wool-blend structures that give a country jacket its character. For the client who wants their jacket to make a statement.",
  },
  {
    id: "english-mohairs",
    name: "ENGLISH MOHAIRS",
    category: "CASUAL & SPORT",
    keySellingPoint: "Lustrous mohair blends",
    composition: "Wool & Mohair Blend",
    weight: "240–300 g/m",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "MOHAIR", "BLEND"],
    description: "English Mohairs blends fine Merino wool with South African mohair to create a cloth of exceptional lustre and lightness. The mohair content gives the cloth a characteristic sheen that catches the light and adds a subtle iridescence to the surface. The resulting cloth is cool, smooth, and remarkably crease-resistant — ideal for summer suiting and for clients who want their suit to look as fresh at the end of the day as it did at the beginning.",
  },
  {
    id: "corduroys-moleskin",
    name: "CORDUROYS & MOLESKIN",
    category: "CASUAL & SPORT",
    keySellingPoint: "British country classics",
    composition: "100% Cotton",
    weight: "320–420 g/m",
    priceIndex: 1,
    garments: ["JACKET", "PANTS", "CASUAL"],
    fibre: ["COTTON"],
    description: "Corduroys & Moleskin provides the traditional British country fabrics for casual trousers and jackets. The corduroys range from fine-wale to broad-wale, in the classic country palette of rust, olive, and tobacco. The moleskin — a dense, brushed cotton with a characteristic smooth surface — is the traditional cloth for country trousers and waistcoats. Both cloths improve dramatically with wear.",
  },
  {
    id: "cotton-classics",
    name: "COTTON CLASSICS",
    category: "CASUAL & SPORT",
    keySellingPoint: "Summer casual fabrics",
    composition: "100% Cotton",
    weight: "220–300 g/m",
    priceIndex: 1,
    garments: ["JACKET", "PANTS", "CASUAL"],
    fibre: ["COTTON"],
    description: "Cotton Classics provides a range of traditional cotton fabrics for summer casual wear — chinos, sport coats, and lightweight trousers. The collection includes classic cotton gabardines, drill cloths, and poplin-weight fabrics in the full range of summer colours. These are the cloths for the client who wants the comfort and breathability of cotton in a fabric that tailors cleanly and maintains its shape.",
  },
  {
    id: "linen-collection",
    name: "LINEN COLLECTION",
    category: "CASUAL & SPORT",
    keySellingPoint: "Pure linen for summer",
    composition: "100% Linen",
    weight: "200–280 g/m",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["LINEN"],
    description: "The Linen Collection provides pure linen fabrics for summer suiting and casual wear. Linen is the oldest textile fibre in the world, and Holland & Sherry's linen cloths are woven to the highest standards — smooth enough to tailor cleanly, with the characteristic natural texture and breathability that makes linen the ideal fabric for hot weather. Available in the classic linen palette of natural, ecru, and stone, as well as a range of seasonal colours.",
  },
  {
    id: "gaberdines",
    name: "GABERDINES",
    category: "CASUAL & SPORT",
    keySellingPoint: "The original performance fabric",
    composition: "Wool & Cotton Gaberdines",
    weight: "260–340 g/m",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS", "OUTERWEAR"],
    fibre: ["WOOL", "COTTON", "BLEND"],
    description: "Gaberdine — the tightly woven twill cloth invented by Thomas Burberry in 1879 — is one of the most versatile and enduring fabrics in the tailor's vocabulary. Holland & Sherry's Gaberdines collection provides both wool and cotton gaberdines in the full range of weights and colours. The tight weave provides natural weather resistance and exceptional crease recovery, making gaberdine the ideal cloth for both suiting and outerwear.",
  },
  // ── SEASONAL ─────────────────────────────────────────────────────────────
  {
    id: "riviera",
    name: "RIVIERA",
    category: "SEASONAL",
    keySellingPoint: "Resort and cruise suiting",
    composition: "Wool, Linen & Silk Blends",
    weight: "200–260 g/m",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "LINEN", "SILK", "BLEND"],
    isNew: true,
    description: "Riviera is Holland & Sherry's summer resort collection — lightweight wool, linen, and silk blends in the sun-bleached palette of the Mediterranean coast. The cloths are designed for the client who wants to look impeccably dressed in the heat — cool, breathable, and relaxed in character, but tailored with precision. The collection spans the full range of summer occasions, from the yacht to the terrace restaurant.",
  },
  {
    id: "crispaire",
    name: "CRISPAIRE",
    category: "SEASONAL",
    keySellingPoint: "Cool-hand summer suiting",
    composition: "Wool & Mohair",
    weight: "200–240 g/m",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "MOHAIR", "BLEND"],
    isTopSeller: true,
    description: "Crispaire is one of Holland & Sherry's most celebrated summer collections — a wool and mohair blend with an open, airy weave structure that provides exceptional breathability and a characteristic cool, crisp hand feel. The mohair content adds lustre and crease resistance, making it ideal for the client who wears a suit in warm weather. Available in the classic summer suiting palette.",
  },
  {
    id: "summer-serge",
    name: "SUMMER SERGE & SOLANA",
    category: "SEASONAL",
    keySellingPoint: "Lightweight summer serge",
    composition: "100% Wool",
    weight: "210–250 g/m",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    description: "Summer Serge & Solana provides lightweight pure wool fabrics for summer suiting in the classic serge structure — a smooth, even twill that has been the standard for British summer suiting for over a century. The light weight and open weave provide comfort in warm weather while the serge structure ensures the cloth tailors cleanly and holds its shape. Available in the full range of summer suiting colours.",
  },
  {
    id: "azure",
    name: "AZURE",
    category: "SEASONAL",
    keySellingPoint: "Summer blues and coastal tones",
    composition: "Wool & Linen Blend",
    weight: "220–260 g/m",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "LINEN", "BLEND"],
    description: "Azure is a seasonal collection focused on the blue spectrum — from the palest sky blue to the deepest navy — in lightweight wool and linen blends. The collection is designed for the client who wants to build a summer wardrobe around the most versatile and enduring colour in menswear. The linen content adds texture and breathability; the wool provides structure and crease resistance.",
  },
  {
    id: "classic-woollen-flannel",
    name: "CLASSIC WOOLLEN FLANNEL",
    category: "SEASONAL",
    keySellingPoint: "The quintessential autumn cloth",
    composition: "100% Wool",
    weight: "300–380 g/m",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    isTopSeller: true,
    description: "Classic Woollen Flannel is the definitive autumn and winter suiting cloth — a milled, brushed wool with a soft, warm surface and a characteristic gentle drape. Holland & Sherry's flannel is woven from fine Merino yarns and finished to produce the characteristic soft, slightly fuzzy surface that distinguishes a genuine woollen flannel from a worsted imitation. Available in the classic flannel palette: mid-grey, charcoal, and their many variations.",
  },
  {
    id: "classic-worsted-flannel",
    name: "CLASSIC WORSTED FLANNEL",
    category: "SEASONAL",
    keySellingPoint: "Flannel with a worsted finish",
    composition: "100% Wool",
    weight: "280–340 g/m",
    priceIndex: 1,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    description: "Classic Worsted Flannel provides the warmth and softness of flannel in a worsted structure — a slightly smoother, more formal cloth than the woollen flannel, with better crease recovery and a cleaner surface. It is the ideal compromise for the client who wants the warmth of flannel in a cloth that can be worn in more formal contexts.",
  },
  // ── SPECIALIST ───────────────────────────────────────────────────────────
  {
    id: "black-tie",
    name: "BLACK TIE",
    category: "SPECIALIST",
    keySellingPoint: "Evening dress fabrics",
    composition: "Wool, Silk & Blends",
    weight: "220–300 g/m",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "SILK", "BLEND"],
    description: "The Black Tie collection provides the specialist fabrics for evening dress — barathea, doeskin, and fine wool and silk blends in the formal palette of midnight blue and black. These are the cloths for the dinner jacket, the dress suit, and the morning coat — fabrics that have been used for formal evening wear for over a century and remain the standard for the most formal occasions.",
  },
  {
    id: "matrimony",
    name: "MATRIMONY",
    category: "SPECIALIST",
    keySellingPoint: "Wedding and formal occasion fabrics",
    composition: "Wool, Silk & Cashmere Blends",
    weight: "220–280 g/m",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "SILK", "CASHMERE", "BLEND"],
    description: "Matrimony is a collection of fabrics designed specifically for wedding and formal occasion suiting — lighter weights, softer colours, and more refined surfaces than standard suiting cloths. The wool, silk, and cashmere blends provide a cloth that photographs beautifully and feels extraordinary to wear on the most important occasions. Available in the full range of formal and semi-formal colours.",
  },
  {
    id: "masquerade",
    name: "MASQUERADE",
    category: "SPECIALIST",
    keySellingPoint: "Decorative and statement fabrics",
    composition: "Wool, Silk & Metallic Blends",
    weight: "240–300 g/m",
    priceIndex: 2,
    garments: ["JACKET", "SUIT"],
    fibre: ["WOOL", "SILK", "BLEND"],
    description: "Masquerade is Holland & Sherry's collection of decorative and statement fabrics — cloths designed to be noticed. The collection includes velvets, jacquards, and fabrics with metallic threads and decorative weave structures. These are the cloths for the client who wants their suit or jacket to make a statement — for the theatre, the gala, and the occasions that demand something extraordinary.",
  },
  {
    id: "supernova",
    name: "SUPERNOVA",
    category: "SPECIALIST",
    keySellingPoint: "Iridescent and luminous suiting",
    composition: "Wool & Silk Blend",
    weight: "230–270 g/m",
    priceIndex: 2,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "SILK", "BLEND"],
    isNew: true,
    description: "Supernova is a collection of iridescent wool and silk blends that shift colour as the wearer moves — the silk content creates a characteristic shot effect that gives the cloth a luminous, almost metallic quality. The collection is designed for the client who wants a suit that is unmistakably distinctive without being ostentatious — the iridescence is subtle in daylight but dramatic under artificial light.",
  },
  {
    id: "velvets",
    name: "VELVETS",
    category: "SPECIALIST",
    keySellingPoint: "Luxury velvet for formal wear",
    composition: "Cotton & Silk Velvets",
    weight: "280–380 g/m",
    priceIndex: 2,
    garments: ["JACKET", "SUIT"],
    fibre: ["COTTON", "SILK", "BLEND"],
    description: "Holland & Sherry's Velvets collection provides cotton and silk velvets for formal and evening wear — the traditional cloth for the velvet dinner jacket and the velvet blazer. The collection spans the full range of velvet weights and surfaces, from the finest silk velvet to the more robust cotton velvet, in the classic velvet palette of midnight blue, bottle green, burgundy, and black.",
  },
  {
    id: "cashmere-doeskin-blazers",
    name: "CASHMERE DOESKIN BLAZERS",
    category: "SPECIALIST",
    keySellingPoint: "Luxury cashmere for blazers",
    composition: "Cashmere & Wool Blend",
    weight: "300–360 g/m",
    priceIndex: 3,
    garments: ["JACKET"],
    fibre: ["CASHMERE", "WOOL", "BLEND"],
    description: "Cashmere Doeskin Blazers provides a range of cashmere and wool blends in the doeskin structure — a smooth, dense cloth with a characteristic soft, suede-like surface — specifically designed for the luxury blazer. The cashmere content gives the cloth an extraordinary softness and warmth, while the doeskin structure provides the clean, structured surface that a blazer requires. Available in the classic blazer palette: navy, camel, and charcoal.",
  },
  {
    id: "dragonfly-gostwyck",
    name: "DRAGONFLY GOSTWYCK",
    category: "SPECIALIST",
    keySellingPoint: "Australian Merino at its finest",
    composition: "100% Australian Merino Wool",
    weight: "220–260 g/m",
    priceIndex: 3,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL"],
    isNew: true,
    description: "Dragonfly Gostwyck is sourced exclusively from the Gostwyck estate in New South Wales — one of the world's most celebrated Merino wool producers. The estate's unique combination of altitude, climate, and selective breeding produces a wool of extraordinary fineness and uniformity. Holland & Sherry weaves this exceptional raw material into a suiting cloth that represents the absolute pinnacle of Australian Merino — a cloth with a softness, lustre, and drape that is entirely unlike any other.",
  },
  {
    id: "peridot",
    name: "PERIDOT",
    category: "SPECIALIST",
    keySellingPoint: "Gem-quality suiting cloth",
    composition: "Wool Super 160s & Silk",
    weight: "210–240 g/m",
    priceIndex: 3,
    garments: ["SUIT", "JACKET", "PANTS"],
    fibre: ["WOOL", "SILK"],
    description: "Peridot is named after the precious gemstone for its characteristic clarity and lustre. Woven from Super 160s Merino and silk, the cloth has a surface of exceptional smoothness and a subtle iridescence that gives it a jewel-like quality. It is the cloth for the client who wants a suit of the highest possible quality for the most important occasions — a cloth that will be recognised by those who know.",
  },
];

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const ALL_FIBRES: Fibre[] = ["WOOL", "CASHMERE", "COTTON", "LINEN", "SILK", "MOHAIR", "TWEED", "BLEND"];
const ALL_GARMENTS: Garment[] = ["SUIT", "JACKET", "PANTS", "SHIRT", "OUTERWEAR", "CASUAL"];
const ALL_CATEGORIES: Category[] = ["SUITING", "OVERCOATING", "CASUAL & SPORT", "SEASONAL", "SPECIALIST"];

const PRICE_LABELS = ["ENTRY", "CLASSIC", "PREMIUM", "PRESTIGE"];
const PRICE_COLORS = [
  { bg: "#f5f5f5", text: "#666" },
  { bg: "#e8f0e8", text: "#3a6b3a" },
  { bg: "#e8f0f8", text: "#1a4a7a" },
  { bg: "#f8f0e0", text: "#8a5a00" },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function HollandSherryAnthology() {
  useSEO({
    title: "Holland & Sherry Fabric Anthology — Luxury Suiting Cloths | Tailors.hk",
    description: "Explore the Holland & Sherry fabric anthology — luxury suiting cloths from Peebles, Scotland. Curated by Tailors.hk.",
    canonical: "https://tailors.hk/holland-sherry-anthology",
    schema: [
      SCHEMAS.organization(),
      SCHEMAS.breadcrumb([
        { name: 'Home', url: '/' },
        { name: 'Holland & Sherry Anthology', url: '/holland-sherry-anthology' },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Holland & Sherry Fabric Anthology — Luxury Suiting Cloths | Tailors.hk",
        "description": "Explore the Holland & Sherry fabric anthology — luxury suiting cloths from Peebles, Scotland. Curated by Tailors.hk.",
        "url": "https://tailors.hk/holland-sherry-anthology",
        "about": {
          "@type": "Product",
          "name": "Holland & Sherry Suiting Fabrics",
          "description": "Holland & Sherry luxury suiting fabrics from Peebles, Scotland — used by Savile Row's finest houses",
          "brand": { "@type": "Brand", "name": "Holland & Sherry" }
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
      <section style={{ backgroundColor: "#0a0a0a", color: "#fff", padding: "80px 0 60px" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "24px", marginBottom: "40px" }}>
            <div>
              <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.14em", color: "#555", display: "block", marginBottom: "12px" }}>
                § FABRIC ANTHOLOGY · MILL REFERENCE
              </span>
              <h1 style={{ fontFamily: F.display, fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "#fff", lineHeight: 1, margin: "0 0 8px" }}>
                HOLLAND & SHERRY
              </h1>
              <p style={{ fontFamily: F.display, fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#555", margin: "0 0 20px" }}>
                EST. 1836 · SAVILE ROW, LONDON
              </p>
              <p style={{ fontFamily: F.body, fontSize: "15px", lineHeight: 1.75, color: "#888", maxWidth: "560px" }}>
                A complete reference to Holland & Sherry's fabric collections — from the benchmark Target suiting to Harris Tweed, Cashique overcoating, and the ultra-fine Masterpiece Gold. {COLLECTIONS.length} collections spanning wool, cashmere, linen, silk, and specialist blends.
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px", alignItems: "center", flexShrink: 0 }}>
              <BookmarkButton
                item={{
                  slug: "holland-sherry-anthology",
                  title: "Holland & Sherry Fabric Anthology",
                  category: "FABRIC REFERENCE",
                  img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/FlUtZXQmAETyFHRl.jpeg",
                  excerpt: `${COLLECTIONS.length} collections profiled with composition, weight, garment suitability, and price tier.`,
                }}
              />
              <ShareButton
                title="Holland & Sherry Fabric Anthology — Tailors.hk"
                text={`A complete reference to Holland & Sherry's fabric collections — ${COLLECTIONS.length} collections spanning wool, cashmere, linen, silk, and specialist blends.`}
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            {[
              { label: "COLLECTIONS", value: String(COLLECTIONS.length) },
              { label: "CATEGORIES", value: "5" },
              { label: "MILL", value: "HOLLAND & SHERRY · SAVILE ROW" },
              { label: "EST.", value: "1836" },
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
                          {c.category} · HOLLAND & SHERRY
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
            HOLLAND & SHERRY · EST. 1836
          </h2>
          <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.8, color: "#777", marginBottom: "24px" }}>
            Founded in 1836 on Savile Row, Holland & Sherry is one of the world's oldest and most respected fabric merchants. The company sources the finest wools from Australia, New Zealand, and South Africa, and works with the best mills in England, Scotland, and Italy to produce cloths that have clothed royalty, heads of state, and the most discerning private clients for nearly two centuries. Their range spans everything from the benchmark Target suiting to Harris Tweed, cashmere overcoating, and ultra-fine Super 200s prestige cloths. Holland & Sherry fabrics are available through Tailors.hk for bespoke and MTM commissions.
          </p>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {[
              { label: "FOUNDED", value: "1836" },
              { label: "LOCATION", value: "SAVILE ROW, LONDON" },
              { label: "SPECIALITY", value: "SUITING · OVERCOATING · TWEED" },
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
              { name: "LORO PIANA", est: "1924", note: "30 COLLECTIONS", href: "/loro-piana-anthology", desc: "Quarona, Italy" },
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
