"use client";
import { useSEO, SCHEMAS } from "@/hooks/useSEO";
// ═══════════════════════════════════════════════════════════════════════════════
// WorldTailors.tsx — The World's Best Tailoring
// Design: Barlow Condensed display / JetBrains Mono labels / Barlow body
// Layout: Full-width editorial index with filter bar and profile cards
// ═══════════════════════════════════════════════════════════════════════════════

import { useState, useMemo, useEffect } from "react";
import { useSearch } from "@/lib/wouter-shim";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
// SEO handled by generateMetadata in page.tsx

const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body: '"Barlow", Arial, sans-serif',
  mono: '"JetBrains Mono", "Courier New", monospace',
};

// ── Tailor Data ────────────────────────────────────────────────────────────────
const TAILORS = [
  // ── SAVILE ROW ──────────────────────────────────────────────────────────────
  {
    id: "anderson-sheppard",
    name: "Anderson & Sheppard",
    city: "London",
    country: "United Kingdom",
    tradition: "Savile Row",
    founded: 1906,
    tier: "Bespoke",
    services: ["Bespoke"],
    scores: { houseStyle: 4, fabrication: 4, handwork: 4, customisation: 3 },
    priceRange: "£6,000 – £12,000+",
    silhouette: "Soft, draped English",
    construction: "Floating canvas, minimal padding, natural shoulder",
    signature: "The softest suit on the Row — unstructured drape with extraordinary cloth",
    knownFor: ["Draped silhouette", "Exceptional cloth selection", "Hollywood clientele"],
    clients: ["Fred Astaire", "Gary Cooper", "Prince Charles"],
    description: "Founded by Per Anders Andersson and Sidney Sheppard, Anderson & Sheppard is the spiritual home of the draped English suit. Their house style — soft, unpadded, with a floating canvas — is the antithesis of the structured Milanese cut. The house has dressed Hollywood royalty for over a century and remains the benchmark for understated English elegance.",
    address: "32 Old Burlington Street, London W1S 3AT",
    website: "anderson-sheppard.co.uk",
  },
  {
    id: "huntsman",
    name: "Huntsman",
    city: "London",
    country: "United Kingdom",
    tradition: "Savile Row",
    founded: 1849,
    tier: "Bespoke",
    services: ["Bespoke"],
    scores: { houseStyle: 4, fabrication: 4, handwork: 4, customisation: 3 },
    priceRange: "£6,500 – £14,000+",
    silhouette: "Strong, structured English",
    construction: "Full canvas, high armhole, suppressed waist",
    signature: "The most structured house on the Row — military precision in cloth",
    knownFor: ["Single-button jackets", "Strong shoulder", "Equestrian heritage"],
    clients: ["Gregory Peck", "Katharine Hepburn", "Colin Firth"],
    description: "Established in 1849, Huntsman is the most architecturally structured house on Savile Row. Their signature single-button jacket with a high, tight armhole and suppressed waist is immediately recognisable. Originally a riding tailor, the house has translated equestrian precision into civilian dress with extraordinary results. Colin Firth wore Huntsman in The King's Speech.",
    address: "11 Savile Row, London W1S 3PS",
    website: "huntsmansavilerow.com",
  },
  {
    id: "norton-sons",
    name: "Norton & Sons",
    city: "London",
    country: "United Kingdom",
    tradition: "Savile Row",
    founded: 1821,
    tier: "Bespoke",
    services: ["Bespoke"],
    scores: { houseStyle: 3, fabrication: 3, handwork: 3, customisation: 3 },
    priceRange: "£5,500 – £11,000+",
    silhouette: "Classic English, balanced",
    construction: "Full canvas, moderate structure",
    signature: "One of the oldest houses on the Row — a pure expression of English tailoring",
    knownFor: ["Heritage craftsmanship", "Balanced silhouette", "Cloth expertise"],
    clients: ["Winston Churchill", "Edward VII"],
    description: "Founded in 1821, Norton & Sons is one of the oldest surviving tailoring houses on Savile Row. Under the stewardship of Patrick Grant, the house has been revitalised while maintaining its commitment to traditional English construction. Their balanced silhouette — neither as soft as Anderson & Sheppard nor as structured as Huntsman — represents the Row at its most versatile.",
    address: "16 Savile Row, London W1S 3PL",
    website: "nortonandsons.co.uk",
  },
  {
    id: "henry-poole",
    name: "Henry Poole & Co",
    city: "London",
    country: "United Kingdom",
    tradition: "Savile Row",
    founded: 1806,
    tier: "Bespoke",
    services: ["Bespoke"],
    scores: { houseStyle: 4, fabrication: 3, handwork: 4, customisation: 4 },
    priceRange: "£6,000 – £13,000+",
    silhouette: "Classic English, regal",
    construction: "Full canvas, traditional English cut",
    signature: "The founding house of Savile Row — creators of the dinner jacket",
    knownFor: ["Invented the dinner jacket", "Royal warrants", "Historic prestige"],
    clients: ["Napoleon III", "Emperor Hirohito", "Charles Dickens"],
    description: "Henry Poole & Co holds the distinction of being the founding house of Savile Row, having established their premises there in 1846. The house is credited with creating the dinner jacket for the Prince of Wales in 1865. With royal warrants from across Europe and a client list spanning emperors and statesmen, Henry Poole represents the apex of English tailoring heritage.",
    address: "15 Savile Row, London W1S 3PJ",
    website: "henrypoole.com",
  },

  // ── NEAPOLITAN ──────────────────────────────────────────────────────────────
  {
    id: "kiton",
    name: "Kiton",
    city: "Naples",
    country: "Italy",
    tradition: "Neapolitan",
    founded: 1956,
    tier: "Brand",
    services: ["Bespoke", "MTM", "RTW"],
    scores: { houseStyle: 3, fabrication: 5, handwork: 5, customisation: 3 },
    priceRange: "€6,000 – €20,000+",
    silhouette: "Soft Neapolitan, relaxed elegance",
    construction: "Spalla camicia (shirt sleeve), floating canvas, hand-stitched",
    signature: "The world's most expensive ready-to-wear suit — 25 hours of hand work per jacket",
    knownFor: ["Spalla camicia shoulder", "Cashmere expertise", "Ultra-luxury RTW"],
    clients: ["Global business elite", "Heads of state"],
    description: "Founded by Ciro Paone in Naples in 1956, Kiton is the benchmark for Neapolitan tailoring at its most luxurious. Each jacket requires up to 25 hours of hand work by a single craftsman. The house is renowned for its spalla camicia — the shirt-sleeve shoulder, gathered and puckered — and its extraordinary cashmere and vicuña fabrics. Their ready-to-wear rivals the quality of most bespoke houses.",
    address: "Via Domenico Morelli 45, Naples",
    website: "kiton.com",
  },
  {
    id: "cesare-attolini",
    name: "Cesare Attolini",
    city: "Naples",
    country: "Italy",
    tradition: "Neapolitan",
    founded: 1930,
    tier: "Bespoke",
    services: ["Bespoke", "RTW"],
    scores: { houseStyle: 4, fabrication: 5, handwork: 5, customisation: 2 },
    priceRange: "€3,500 – €8,000+",
    silhouette: "Classic Neapolitan, soft and natural",
    construction: "Floating canvas, open quarters, natural shoulder",
    signature: "The original Neapolitan tailor — Vincenzo Attolini invented the modern Italian suit",
    knownFor: ["Invented the modern Italian suit", "Open quarters", "Neapolitan heritage"],
    clients: ["Italian aristocracy", "International connoisseurs"],
    description: "The Attolini family claim the most significant contribution to modern tailoring: it was Vincenzo Attolini, working for Gennaro Rubinacci in the 1930s, who first created the soft, unstructured Italian jacket — abandoning the stiff English canvas and padding to reveal the natural shape of the body. Cesare Attolini, his son, formalised this into a house that remains the purest expression of Neapolitan tailoring philosophy.",
    address: "Via Santa Brigida 28, Naples",
    website: "cesareattolini.com",
  },
  {
    id: "isaia",
    name: "Isaia",
    city: "Naples",
    country: "Italy",
    tradition: "Neapolitan",
    founded: 1957,
    tier: "Brand",
    services: ["Bespoke", "MTM", "RTW"],
    scores: { houseStyle: 3, fabrication: 3, handwork: 3, customisation: 2 },
    priceRange: "€2,500 – €6,000+",
    silhouette: "Contemporary Neapolitan",
    construction: "Half canvas, soft shoulder, relaxed chest",
    signature: "The most colourful house in Naples — bold fabrics and patterns",
    knownFor: ["Bold patterns", "Vibrant fabrics", "Contemporary Neapolitan style"],
    clients: ["Fashion-forward professionals", "International clientele"],
    description: "Founded by Enrico Isaia in Naples in 1957, Isaia has built its reputation on the most adventurous use of cloth on the Neapolitan scene. Where other houses favour restraint, Isaia embraces bold patterns, vivid colours, and unexpected fabric combinations. Their construction remains firmly Neapolitan — soft, natural, and hand-finished — but the aesthetic is distinctly contemporary.",
    address: "Riviera di Chiaia 287, Naples",
    website: "isaia.it",
  },
  // ── MILANESE ────────────────────────────────────────────────────────────────
  {
    id: "brioni",
    name: "Brioni",
    city: "Rome",
    country: "Italy",
    tradition: "Italian",
    founded: 1945,
    tier: "Bespoke",
    services: ["Bespoke", "MTM", "RTW"],
    scores: { houseStyle: 4, fabrication: 4, handwork: 4, customisation: 4 },
    priceRange: "€7,000 – €25,000+",
    silhouette: "Roman elegance — structured yet fluid",
    construction: "Full canvas, suppressed waist, clean chest",
    signature: "The Roman tailor — James Bond's suit of choice for 40 years",
    knownFor: ["James Bond suits", "Roman construction", "Extraordinary fabrics"],
    clients: ["James Bond (film)", "Clark Gable", "Gary Cooper"],
    description: "Founded in Rome in 1945 by Nazareno Fonticoli and Gaetano Savini, Brioni elevated Italian tailoring to international prominence. Their Roman construction — more structured than Naples, more fluid than Milan — occupies a unique position. The house dressed James Bond from 1995 to 2012 and maintains one of the most skilled ateliers in Italy, with each suit requiring over 200 hours of work.",
    address: "Via Barberini 79, Rome",
    website: "brioni.com",
  },

  {
    id: "zegna",
    name: "Ermenegildo Zegna",
    city: "Milan",
    country: "Italy",
    tradition: "Italian",
    founded: 1910,
    tier: "Bespoke",
    services: ["Bespoke", "MTM", "RTW"],
    scores: { houseStyle: 5, fabrication: 4, handwork: 3, customisation: 4 },
    priceRange: "€3,500 – €15,000+",
    silhouette: "Modern Italian — clean, minimal",
    construction: "Full canvas bespoke, half canvas RTW",
    signature: "Vertical integration from wool mill to finished garment — unique in the industry",
    knownFor: ["Owns the wool mill", "Finest fabrics", "Vertical integration"],
    clients: ["Global business leaders", "Heads of state"],
    description: "Founded by Ermenegildo Zegna in Trivero in 1910 — beginning as a wool mill — Zegna is unique among luxury tailoring houses in controlling the entire supply chain from raw fibre to finished garment. The Oasi Cashmere and Vellutino fabrics produced at their Trivero mill are among the finest in the world. Their bespoke service, Su Misura, represents the pinnacle of Milanese tailoring.",
    address: "Via Montenapoleone 27, Milan",
    website: "zegna.com",
  },
  // ── PARISIAN ────────────────────────────────────────────────────────────────
  {
    id: "cifonelli",
    name: "Cifonelli",
    city: "Paris",
    country: "France",
    tradition: "Parisian",
    founded: 1880,
    tier: "Bespoke",
    services: ["Bespoke"],
    scores: { houseStyle: 4, fabrication: 4, handwork: 4, customisation: 4 },
    priceRange: "€6,000 – €14,000+",
    silhouette: "Parisian — structured chest, concave shoulder",
    construction: "Full canvas, signature concave shoulder, high armhole",
    signature: "The Cifonelli shoulder — a concave, scooped armhole unlike anything else in tailoring",
    knownFor: ["Concave shoulder", "Parisian elegance", "Extraordinary construction"],
    clients: ["French aristocracy", "International connoisseurs"],
    description: "Founded in Rome in 1880 and relocated to Paris, Cifonelli has developed the most distinctive shoulder construction in tailoring — the concave, scooped armhole that creates a uniquely clean line from the back. The house is now run by cousins Lorenzo and Massimo Cifonelli, who have elevated the Parisian tailoring tradition to global recognition. Their work combines Italian sensibility with French precision.",
    address: "31 Rue Marbeuf, Paris 75008",
    website: "cifonelli.com",
  },

  // ── JAPANESE ────────────────────────────────────────────────────────────────

  // ── AMERICAN ────────────────────────────────────────────────────────────────
  {
    id: "ralph-lauren-purple",
    name: "Ralph Lauren Purple Label",
    city: "New York",
    country: "United States",
    tradition: "American",
    founded: 1994,
    tier: "Brand",
    services: ["RTW"],
    scores: { houseStyle: 3, fabrication: 4, handwork: 3, customisation: 1 },
    priceRange: "$4,500 – $12,000+",
    silhouette: "American elegance — broad shoulder, clean chest",
    construction: "Full canvas, hand-finished in Italy",
    signature: "The American dream in cloth — aspirational, confident, impeccably made",
    knownFor: ["American heritage", "Italian construction", "Aspirational luxury"],
    clients: ["American business elite", "Hollywood"],
    description: "Launched in 1994, Ralph Lauren Purple Label represents the pinnacle of the Ralph Lauren universe — full canvas construction, hand-finished in Italy, with a distinctly American sensibility. The collection channels the patrician elegance of the American East Coast establishment: broad shoulders, clean chest, and a confidence that is uniquely New World. Purple Label suits are made at the finest Italian factories.",
    address: "867 Madison Avenue, New York",
    website: "ralphlauren.com",
  },
  {
    id: "tom-ford",
    name: "Tom Ford",
    city: "New York",
    country: "United States",
    tradition: "American",
    founded: 2006,
    tier: "Brand",
    services: ["MTM", "RTW"],
    scores: { houseStyle: 4, fabrication: 3, handwork: 2, customisation: 2 },
    priceRange: "$4,000 – $10,000+",
    silhouette: "Sleek, body-conscious, modern",
    construction: "Full canvas (bespoke), half canvas (RTW)",
    signature: "The most cinematic suit in the world — power dressing redefined",
    knownFor: ["Body-conscious silhouette", "Cinematic glamour", "Modern luxury"],
    clients: ["Hollywood A-list", "Global executives"],
    description: "Tom Ford launched his eponymous label in 2006 after transforming Gucci and Yves Saint Laurent. His suits are the most body-conscious in the luxury market — slim, sleek, and deliberately cinematic. The construction is impeccable: full canvas in the bespoke line, with extraordinary fabrics. Ford has redefined what power dressing means for the 21st century.",
    address: "845 Madison Avenue, New York",
    website: "tomford.com",
  },
  // ── HONG KONG ────────────────────────────────────────────────────────────────
  {
    id: "ww-chan",
    name: "W.W. Chan & Sons",
    city: "Hong Kong",
    country: "Hong Kong",
    tradition: "Hong Kong",
    founded: 1952,
    tier: "Bespoke",
    services: ["Bespoke", "MTM"],
    scores: { houseStyle: 2, fabrication: 3, handwork: 4, customisation: 4 },
    priceRange: "HKD 12,000 – HKD 35,000+",
    silhouette: "Classic Hong Kong — structured, precise",
    construction: "Full canvas, hand-padded lapels, traditional HK construction",
    signature: "The most celebrated bespoke tailor in Hong Kong — 70 years of heritage",
    knownFor: ["Heritage Hong Kong tailoring", "Extraordinary precision", "International reputation"],
    clients: ["Business leaders", "Diplomats", "International connoisseurs"],
    description: "Founded in Shanghai in 1952 and relocated to Hong Kong, W.W. Chan & Sons is the most consistently recommended bespoke house in the city among serious menswear writers and well-travelled clients. Their construction follows the Shanghai tradition: full canvas, hand-padded lapels, and a fitting process that prioritises anatomical precision over speed. The house does not impose a strong signature aesthetic — the client's preference drives the cut — which makes it particularly well-suited to those who know exactly what they want. Their international trunk show programme has introduced the house to clients in New York, London, and across Asia.",
    address: "Burlington House, 92-94 Nathan Road, Kowloon",
    website: "wwchan.com",
  },
  {
    id: "magnus-novus",
    name: "Magnus & Novus",
    city: "Hong Kong",
    country: "Hong Kong",
    tradition: "British",
    regions: ["British", "Hong Kong"],
    founded: 2015,
    tier: "Brand",
    services: ["Bespoke", "MTM", "RTW"],
    scores: { houseStyle: 5, fabrication: 5, handwork: 5, customisation: 2 },
    priceRange: "HK$33,800 – HK$120,000+",
    silhouette: "British — structured shoulder, elongated skirt, refined drape",
    construction: "Full canvas, entirely handcrafted",
    signature: "A timeless British house — legendary for igniting global currents in tailored menswear",
    knownFor: ["Full canvas construction", "Handcrafted bespoke & RTW", "British grand maison ethos", "Audacious yet timeless aesthetic"],
    clients: ["Global executives", "International collectors", "Discerning professionals"],
    description: "Magnus & Novus is a British menswear house of singular aesthetic conviction — understated, precise, and built to endure. Every garment is entirely handcrafted, with over 5,000 individual stitches per piece and proprietary textiles developed exclusively for the house. The bespoke programme is structured around a defining house silhouette that clients return to commission repeatedly — the design is not a starting point for adaptation, but the destination itself. The result is a body of work that occupies the space between tailoring and investment craft.",
    address: "Central, Hong Kong",
    website: "magnusandnovus.com",
  },

  {
    id: "boglioli",
    name: "Boglioli",
    city: "Milan",
    country: "Italy",
    tradition: "Italian",
    founded: 1890,
    tier: "Brand",
    services: ["RTW"],
    scores: { houseStyle: 2, fabrication: 2, handwork: 2, customisation: 1 },
    priceRange: "€1,200 – €3,000+",
    silhouette: "Unstructured Italian — deconstructed, relaxed",
    construction: "Unlined, unpadded, minimal construction",
    signature: "The K-Jacket — the original deconstructed Italian suit jacket",
    knownFor: ["K-Jacket", "Deconstructed construction", "Relaxed luxury"],
    clients: ["Creative professionals", "Fashion-forward men"],
    description: "Founded in 1890, Boglioli is best known for the K-Jacket — the original deconstructed Italian suit jacket, unlined and unpadded, that moves like a second skin. This innovation, launched in the 1990s, created an entirely new category of tailored clothing and has been widely imitated but never surpassed. Boglioli represents the most relaxed expression of Italian tailoring.",
    address: "Via Montenapoleone 19, Milan",
    website: "bogliolimilano.com",
  },
  {
    id: "loro-piana",
    name: "Loro Piana",
    city: "Quarona",
    country: "Italy",
    tradition: "Italian",
    founded: 1924,
    tier: "Brand",
    services: ["MTM", "RTW"],
    scores: { houseStyle: 3, fabrication: 4, handwork: 2, customisation: 2 },
    priceRange: "€3,500 – €18,000+",
    silhouette: "Understated — defined by cloth, not cut",
    construction: "Ready-to-wear and made-to-measure; exceptional fabric quality throughout",
    signature: "The world's supreme fabric house — cashmere, vicuña, and baby cashmere without peer",
    knownFor: ["Finest cashmere", "Vicuña", "Quiet luxury", "Fabric supremacy"],
    clients: ["Ultra-high-net-worth individuals", "Royalty"],
    description: "Loro Piana is not a tailor in the traditional sense — it is the world's foremost fabric house, and arguably the single most important name in luxury textile production. Founded in 1924 in Quarona, Piedmont, the house controls the supply chain from raw fibre to finished garment. Their vicuña, baby cashmere, and Storm System wools are the benchmark against which all others are measured. The ready-to-wear and made-to-measure collections exist to showcase these extraordinary materials. To wear Loro Piana is to wear the cloth itself.",
    address: "Via Borgonuovo 21, Milan",
    website: "loropiana.com",
  },
  // ── ULTRA LUXURY LIFESTYLE ─────────────────────────────────────────────────
  {
    id: "berluti",
    name: "Berluti",
    city: "Paris",
    country: "France",
    tradition: "Parisian",
    founded: 1895,
    tier: "Brand",
    services: ["MTM", "RTW"],
    scores: { houseStyle: 3, fabrication: 3, handwork: 3, customisation: 2 },
    priceRange: "€4,500 – €22,000+",
    silhouette: "Parisian — refined, sculptural, deeply personal",
    construction: "Full canvas bespoke; hand-patinated leather throughout",
    signature: "The only house where a suit and its shoes are conceived as a single work",
    knownFor: ["Hand-patinated leather", "Bespoke tailoring", "Artistic craftsmanship"],
    clients: ["Andy Warhol", "Yves Saint Laurent", "Global creative elite"],
    description: "Founded in Paris in 1895, Berluti is the house that elevated the shoe to an art form — and then extended that philosophy to the entire wardrobe. Their hand-patinated leather, developed over generations, remains unmatched. The tailoring atelier brings the same obsessive attention to cloth and construction. Berluti clients do not simply dress; they compose.",
    address: "26 Rue Marbeuf, Paris",
    website: "berluti.com",
  },
  {
    id: "brunello-cucinelli",
    name: "Brunello Cucinelli",
    city: "Solomeo",
    country: "Italy",
    tradition: "Italian",
    founded: 1978,
    tier: "Brand",
    services: ["MTM", "RTW"],
    scores: { houseStyle: 4, fabrication: 3, handwork: 2, customisation: 2 },
    priceRange: "€3,000 – €15,000+",
    silhouette: "Soft Italian — relaxed, tonal, effortlessly elevated",
    construction: "Full canvas and half canvas; cashmere and finest wools throughout",
    signature: "The philosopher-tailor — luxury with a conscience, built in a medieval hamlet",
    knownFor: ["Cashmere mastery", "Humanistic capitalism", "Tonal dressing"],
    clients: ["Global creative and business elite"],
    description: "Brunello Cucinelli founded his house in 1978 in the medieval hamlet of Solomeo, Umbria, where it remains today. His philosophy — that luxury and ethics are inseparable — has produced a house unlike any other. The cashmere knitwear and tailoring are among the finest produced in Italy, executed by artisans paid above market rate in a restored village. The aesthetic is tonal, relaxed, and deeply considered — the antithesis of ostentation.",
    address: "Solomeo, Perugia, Umbria",
    website: "brunellocucinelli.com",
  },

  // ── JAPANESE ────────────────────────────────────────────────────────────────
  {
    id: "ring-jacket",
    name: "Ring Jacket",
    city: "Osaka",
    country: "Japan",
    tradition: "Japanese",
    founded: 1954,
    tier: "Brand",
    services: ["RTW"],
    scores: { houseStyle: 3, fabrication: 3, handwork: 3, customisation: 1 },
    priceRange: "¥200,000 – ¥600,000+",
    silhouette: "Soft Japanese — Neapolitan-influenced, precisely executed",
    construction: "Floating canvas, hand-stitched, spalla camicia",
    signature: "The finest Japanese interpretation of Neapolitan tailoring — extraordinary value",
    knownFor: ["Neapolitan-inspired construction", "Japanese precision", "Exceptional value"],
    clients: ["Japanese business elite", "International connoisseurs"],
    description: "Founded in Osaka in 1954, Ring Jacket has developed the most respected Japanese interpretation of Neapolitan tailoring. Their floating canvas construction, hand-stitched details, and spalla camicia shoulder are executed with a Japanese precision and consistency that rivals the Neapolitan originals. At their price point, Ring Jacket represents extraordinary value for the quality delivered.",
    address: "1-8-16 Minami-Semba, Osaka",
    website: "ringjacket.co.jp",
  },

  {
    id: "rubinacci",
    name: "Rubinacci",
    city: "Naples",
    country: "Italy",
    tradition: "Neapolitan",
    founded: 1932,
    tier: "Brand",
    services: ["Bespoke", "RTW"],
    scores: { houseStyle: 4, fabrication: 5, handwork: 5, customisation: 4 },
    priceRange: "€5,000 – €12,000+",
    silhouette: "Classic Neapolitan — soft, relaxed, expressive",
    construction: "Floating canvas, open quarters, hand-stitched",
    signature: "The house where the modern Italian suit was born — Gennaro Rubinacci's legacy",
    knownFor: ["Birthplace of modern Italian tailoring", "Expressive style", "Neapolitan heritage"],
    clients: ["Italian aristocracy", "International connoisseurs"],
    description: "Gennaro Rubinacci's London House in Naples was the atelier where Vincenzo Attolini created the first modern Italian suit in the 1930s. The house, now run by Mariano Rubinacci, has maintained its position at the apex of Neapolitan tailoring. Their style is the most expressive on the Neapolitan scene — bold patterns, vibrant colours, and a joie de vivre that is quintessentially Neapolitan.",
    address: "Riviera di Chiaia 287, Naples",
    website: "marianorubinacci.com",
  },
  {
    id: "borrelli",
    name: "Luigi Borrelli",
    city: "Naples",
    country: "Italy",
    tradition: "Neapolitan",
    founded: 1957,
    tier: "Brand",
    services: ["Bespoke", "RTW"],
    scores: { houseStyle: 3, fabrication: 3, handwork: 3, customisation: 3 },
    specialty: "shirt",
    priceRange: "€300 – €800+ (shirts)",
    silhouette: "Neapolitan shirt specialist",
    construction: "Hand-sewn, 25 steps per shirt",
    signature: "The finest shirts in the world — 25 hand-sewn steps per garment",
    knownFor: ["World's finest shirts", "Hand-sewn construction", "Neapolitan craftsmanship"],
    clients: ["Discerning dressers worldwide"],
    description: "While primarily a shirtmaker, Luigi Borrelli's influence on Neapolitan tailoring is profound. Founded in Naples in 1957, the house produces what many consider the finest shirts in the world — each requiring 25 hand-sewn steps. Their fabrics, sourced from the finest Swiss and Italian mills, and their construction, executed by a single craftsman from start to finish, set the global standard for luxury shirtmaking.",
    address: "Via Filangieri 15, Naples",
    website: "luigiborrelli.com",
  },
  {
    id: "charvet",
    name: "Charvet",
    city: "Paris",
    country: "France",
    tradition: "Parisian",
    founded: 1838,
    tier: "Bespoke",
    services: ["Bespoke", "RTW"],
    scores: { houseStyle: 4, fabrication: 4, handwork: 1, customisation: 4 },
    specialty: "shirt",
    priceRange: "€350 – €1,200+ (shirts)",
    silhouette: "Parisian shirt — precise, refined, deeply personal",
    construction: "Bespoke shirtmaking; finest Swiss and French fabrics",
    signature: "The oldest shirtmaker in the world — the Parisian standard for bespoke shirts",
    knownFor: ["Bespoke shirts", "Extraordinary fabric selection", "Place Vendôme heritage"],
    clients: ["Charles de Gaulle", "John F. Kennedy", "The Duke of Windsor"],
    description: "Founded in 1838 on the Place Vendôme, Charvet is the oldest shirtmaker in the world and the definitive Parisian standard for bespoke shirts. The house occupies six floors of its original address, each dedicated to a different category of cloth — the fabric selection alone is without equal anywhere. Their bespoke shirts, made entirely by hand, are the choice of statesmen, royalty, and those who understand that a shirt is the foundation of everything.",
    address: "28 Place Vendôme, Paris",
    website: "charvet.com",
  },
  {
    id: "g-inglese",
    name: "G. Inglese",
    city: "Naples",
    country: "Italy",
    tradition: "Neapolitan",
    founded: 1956,
    tier: "Brand",
    services: ["Bespoke", "RTW"],
    scores: { houseStyle: 3, fabrication: 3, handwork: 4, customisation: 3 },
    specialty: "shirt",
    priceRange: "€180 – €600+ (shirts)",
    silhouette: "Neapolitan shirt — soft collar, relaxed construction",
    construction: "Hand-sewn, soft interlining, one-piece collar",
    signature: "The Neapolitan shirt at its most authentic — soft, unlined, and entirely hand-finished",
    knownFor: ["Soft collar construction", "Hand-sewn shirts", "Neapolitan heritage"],
    clients: ["Neapolitan tailoring connoisseurs", "International menswear enthusiasts"],
    description: "Founded in Naples in 1956, G. Inglese is the shirt house that best embodies the Neapolitan philosophy applied to shirtmaking — soft, unstructured, and entirely hand-finished. Their signature one-piece collar, cut without interlining, rolls and softens with wear in a way that no fused shirt can replicate. The fabrics, sourced from the finest Italian and Swiss mills, are selected with the same rigour applied to the finest bespoke tailoring.",
    address: "Via Chiaia 149, Naples",
    website: "g-inglese.com",
  },
  {
    id: "liverano",
    name: "Liverano & Liverano",
    city: "Florence",
    country: "Italy",
    tradition: "Italian",
    founded: 1949,
    tier: "Bespoke",
    services: ["Bespoke"],
    scores: { houseStyle: 3, fabrication: 4, handwork: 4, customisation: 3 },
    priceRange: "€4,500 – €10,000+",
    silhouette: "Florentine — structured chest, clean lines, Anglophile sensibility",
    construction: "Full canvas, hand-padded chest, high armhole",
    signature: "The finest tailor in Florence — a singular Anglophile aesthetic executed with Italian hands",
    knownFor: ["Florentine tailoring", "Anglophile aesthetic", "Full canvas construction"],
    clients: ["International connoisseurs", "Tailoring enthusiasts worldwide"],
    description: "Founded by Antonio Liverano in Florence in 1949, Liverano & Liverano occupies a unique position in Italian tailoring — a house with a distinctly Anglophile sensibility executed with the finest Italian hands. The structured chest, clean silhouette, and high armhole recall Savile Row, but the cloth selection and finishing are unmistakably Italian. Antonio Liverano, still cutting at the bench, is considered one of the greatest living tailors. The atelier on Via dei Fossi is a pilgrimage destination for those who take tailoring seriously.",
    address: "Via dei Fossi 43r, Florence",
    website: "instagram.com/liveranoandliverano/",
  },


  {
    id: "chittleborough-morgan",
    name: "Chittleborough & Morgan",
    city: "London",
    country: "United Kingdom",
    tradition: "Savile Row",
    founded: 1987,
    tier: "Bespoke",
    services: ["Bespoke"],
    scores: { houseStyle: 3, fabrication: 5, handwork: 5, customisation: 4 },
    priceRange: "£5,500 – £11,000+",
    silhouette: "Theatrical English — expressive, bold",
    construction: "Full canvas, dramatic silhouette",
    signature: "The most theatrical house on the Row — suits as wearable art",
    knownFor: ["Theatrical style", "Bold construction", "Artistic expression"],
    clients: ["Rock musicians", "Creative directors", "Fashion industry"],
    description: "Founded by Joe Morgan and Roy Chittleborough in 1987, Chittleborough & Morgan occupies a unique position on Savile Row as the most theatrical and expressive house. Where other Row tailors favour restraint, C&M embraces drama — exaggerated shoulders, bold patterns, and silhouettes that push the boundaries of traditional tailoring. Their clientele includes rock musicians and creative directors who want a suit that makes a statement.",
    address: "12 Savile Row, London W1S 3PQ",
    website: "www.chittleboroughandmorgan.co.uk",
  },
  {
    id: "richard-james",
    name: "Richard James",
    city: "London",
    country: "United Kingdom",
    tradition: "Savile Row",
    founded: 1992,
    tier: "Bespoke",
    services: ["Bespoke", "RTW"],
    scores: { houseStyle: 3, fabrication: 3, handwork: 4, customisation: 4 },
    priceRange: "£4,500 – £9,000+",
    silhouette: "Contemporary English — modern, slim",
    construction: "Full canvas, modern proportions",
    signature: "The house that brought Savile Row into the modern era",
    knownFor: ["Contemporary Row tailoring", "Modern proportions", "Fashion-forward"],
    clients: ["Mick Jagger", "Elton John", "David Bowie"],
    description: "Founded in 1992 by Richard James and Sean Dixon, the house was among the first on Savile Row to embrace contemporary proportions and a more fashion-forward aesthetic. Their suits are slimmer, more modern, and more colourful than the traditional Row offering, while maintaining the full canvas construction and hand-finishing that defines the street. Richard James dressed the rock aristocracy of the 1990s and 2000s.",
    address: "29 Savile Row, London W1S 2EY",
    website: "richard-james.com",
  },
  {
    id: "ozwald-boateng",
    name: "Ozwald Boateng",
    city: "London",
    country: "United Kingdom",
    tradition: "Savile Row",
    founded: 1994,
    tier: "Bespoke",
    services: ["Bespoke", "RTW"],
    scores: { houseStyle: 4, fabrication: 3, handwork: 3, customisation: 4 },
    priceRange: "£5,000 – £10,000+",
    silhouette: "Afro-British — vibrant, sculptural",
    construction: "Full canvas, sculptural silhouette",
    signature: "The first Black tailor on Savile Row — colour and sculpture in cloth",
    knownFor: ["Vibrant colour", "Sculptural silhouette", "Cultural significance"],
    clients: ["Will Smith", "Jamie Foxx", "Laurence Fishburne"],
    description: "Ozwald Boateng became the first Black tailor to open a shop on Savile Row in 1994, bringing a vibrant, sculptural aesthetic that was unlike anything the street had seen. His suits — in bold colours with a distinctive silhouette that emphasises the male form — have dressed Hollywood's African-American elite. Boateng's contribution to Savile Row is both aesthetic and cultural, expanding the definition of what the Row can be.",
    address: "30 Savile Row, London W1S 2ET",
    website: "ozwaldboateng.co.uk",
  },
  {
    id: "edward-sexton",
    name: "Edward Sexton",
    city: "London",
    country: "United Kingdom",
    tradition: "Savile Row",
    founded: 1969,
    tier: "Bespoke",
    services: ["Bespoke"],
    scores: { houseStyle: 4, fabrication: 4, handwork: 4, customisation: 3 },
    priceRange: "£6,000 – £12,000+",
    silhouette: "Theatrical English — dramatic, expressive",
    construction: "Full canvas, dramatic chest, high armhole",
    signature: "The tailor who dressed the Beatles — rock and roll on Savile Row",
    knownFor: ["Beatles connection", "Theatrical construction", "Rock aristocracy"],
    clients: ["The Beatles", "Mick Jagger", "Paul McCartney"],
    description: "Edward Sexton co-founded Tommy Nutter with Tommy Nutter in 1969, creating the most theatrical suits the Row had ever seen — wide lapels, flared trousers, and a dramatic silhouette that captured the spirit of the late 1960s. The Beatles wore Nutter on the Abbey Road cover. Now operating under his own name, Sexton continues to produce the most dramatically expressive tailoring on the Row.",
    address: "37 Berwick Street, London W1F 8RS",
    website: "edwardsexton.co.uk",
  },
  {
    id: "thom-sweeney",
    name: "Thom Sweeney",
    city: "London",
    country: "United Kingdom",
    tradition: "Savile Row",
    founded: 2009,
    tier: "Bespoke",
    services: ["Bespoke", "RTW"],
    scores: { houseStyle: 3, fabrication: 3, handwork: 4, customisation: 4 },
    priceRange: "£4,000 – £8,000+",
    silhouette: "Modern English — clean, contemporary",
    construction: "Full canvas, modern proportions",
    signature: "The new generation of Savile Row — modern tailoring for the contemporary man",
    knownFor: ["Contemporary Row tailoring", "Modern proportions", "Accessible luxury"],
    clients: ["Young professionals", "Creative industry", "International clientele"],
    description: "Founded in 2009 by Thom Whiddett and Luke Sweeney, Thom Sweeney represents the new generation of Savile Row tailoring — modern proportions, contemporary fabrics, and a relaxed approach to the bespoke experience that makes the Row accessible to a younger clientele. Their full canvas construction and hand-finishing maintain Row standards while their aesthetic speaks to the contemporary man.",
    address: "5 Weighhouse Street, London W1K 5LT",
    website: "thomsweeney.co.uk",
  },
  {
    id: "belvest",
    name: "Belvest",
    city: "Vicenza",
    country: "Italy",
    tradition: "Italian",
    founded: 1964,
    tier: "Bespoke",
    services: ["MTM", "RTW"],
    scores: { houseStyle: 2, fabrication: 4, handwork: 3, customisation: 2 },
    priceRange: "€4,000 – €9,000+",
    silhouette: "Venetian — soft shoulder, clean chest, relaxed drape",
    construction: "Full canvas, entirely handmade in Vicenza",
    signature: "One of Italy's last great handmade suit houses — 220 hand operations per garment",
    knownFor: ["220 hand operations", "Venetian soft construction", "Handmade in Italy"],
    clients: ["Connoisseurs of Italian tailoring", "International collectors", "Discerning professionals"],
    description: "Founded in 1964 in Vicenza, Belvest is one of the last Italian houses to produce entirely by hand — 220 individual hand operations per garment. The construction is pure Venetian: a soft, unstructured shoulder, clean chest, and relaxed drape that moves with the body rather than imposing upon it. In an era when 'handmade in Italy' has become a marketing claim, Belvest remains the genuine article — a house where the needle, not the machine, defines the garment.",
    address: "Via Postumia Ovest 162, 36010 Vicenza, Italy",
    website: "belvest.it",
  },
  {
    id: "a-caraceni",
    name: "A. Caraceni",
    city: "Milan",
    country: "Italy",
    tradition: "Italian",
    founded: 1913,
    tier: "Bespoke",
    services: ["Bespoke"],
    scores: { houseStyle: 4, fabrication: 4, handwork: 4, customisation: 4 },
    priceRange: "€6,000 – €15,000+",
    silhouette: "Roman-Milanese — structured yet fluid, the original Italian silhouette",
    construction: "Full canvas, entirely bespoke",
    signature: "The house that defined Italian tailoring — Agnelli, Visconti, Cary Grant",
    knownFor: ["Roman-Milanese bespoke tradition", "Defining Italian silhouette", "Over a century of craft"],
    clients: ["Gianni Agnelli", "Luchino Visconti", "Cary Grant", "Global heads of state"],
    description: "Founded in Rome in 1913 by Augusto Caraceni, A. Caraceni is among the oldest and most revered tailoring houses in Italy. The house moved to Milan and became the definitive expression of Italian bespoke — a structured yet fluid silhouette that influenced every Italian tailor who followed. Gianni Agnelli was a devoted client; so was Luchino Visconti. Over a century of continuous craft, A. Caraceni has never compromised its standard: every garment is entirely bespoke, entirely handmade, and built to last a lifetime.",
    address: "Via Fatebenefratelli 16, 20121 Milan, Italy",
    website: "a-caraceni.it",
  },
  {
    id: "b-and-tailor",
    name: "B&Tailor",
    city: "Seoul",
    country: "South Korea",
    tradition: "Korean",
    founded: 2010,
    tier: "Bespoke",
    services: ["Bespoke"],
    scores: { houseStyle: 3, fabrication: 4, handwork: 4, customisation: 4 },
    priceRange: "₩3,000,000 – ₩8,000,000+",
    silhouette: "Korean — precise, architectural, refined",
    construction: "Full canvas, bespoke and MTM",
    signature: "Seoul's finest bespoke house — precision construction with a distinctly Korean aesthetic",
    knownFor: ["Korean bespoke tradition", "Architectural precision", "International clientele"],
    clients: ["Seoul business community", "International collectors", "Menswear connoisseurs"],
    description: "B&Tailor is Seoul's most respected bespoke house — a studio that has elevated Korean tailoring to international recognition. Founded in 2010, the house combines full canvas construction with a distinctly Korean aesthetic: precise, architectural, and refined. B&Tailor has attracted a global clientele of menswear connoisseurs who seek the precision of Korean craft alongside a silhouette that is neither Italian nor British but something entirely its own.",
    address: "Seoul, South Korea",
    website: "en.bntailor.com",
  },
  {
    id: "solito",
    name: "Solito",
    city: "Naples",
    country: "Italy",
    tradition: "Neapolitan",
    founded: 1890,
    tier: "Bespoke",
    services: ["Bespoke"],
    scores: { houseStyle: 3, fabrication: 3, handwork: 4, customisation: 4 },
    priceRange: "€4,500 – €10,000+",
    silhouette: "Neapolitan — the definitive spalla camicia, floating chest, fluid drape",
    construction: "Full canvas, entirely bespoke",
    signature: "The living standard of Neapolitan tailoring — Gennaro Solito's work is considered definitive of the soft school",
    knownFor: ["Spalla camicia shoulder", "Floating chest", "Neapolitan bespoke canon"],
    clients: ["International connoisseurs", "Menswear editors", "Collectors of Neapolitan craft"],
    description: "Solito is the living standard of Neapolitan tailoring. Gennaro Solito's work — the spalla camicia shoulder, the floating chest, the fluid drape — is considered by many to be the definitive expression of the soft Neapolitan school. A house without marketing, without retail, and without compromise: the garment speaks entirely for itself.",
    address: "Via Chiaia 149, 80121 Naples, Italy",
    website: "sartoriasolito.it",
  },
  {
    id: "orazio-luciano",
    name: "Orazio Luciano",
    city: "Naples",
    country: "Italy",
    tradition: "Neapolitan",
    founded: 1990,
    tier: "Bespoke",
    services: ["Bespoke", "RTW"],
    scores: { houseStyle: 2, fabrication: 3, handwork: 4, customisation: 3 },
    priceRange: "€2,800 – €6,000+",
    silhouette: "Neapolitan — soft, wearable, refined",
    construction: "Full canvas, bespoke and MTM",
    signature: "The finest entry point into serious Neapolitan bespoke — exceptional quality at a relatively accessible price",
    knownFor: ["Quality-to-value ratio", "Neapolitan soft construction", "Entry-level bespoke excellence"],
    clients: ["First-time bespoke clients", "Professionals", "Menswear enthusiasts"],
    description: "Orazio Luciano is widely considered the finest entry point into serious Neapolitan bespoke — a house where the quality of construction rivals houses charging twice the price. The soft Neapolitan silhouette is fully present: floating chest, spalla camicia shoulder, fluid drape. For the professional seeking their first serious bespoke garment, Orazio Luciano is the natural starting point.",
    address: "Naples, Italy",
    website: "orazioluciano.com",
  },
  {
    id: "sartoria-dalcuore",
    name: "Sartoria Dalcuore",
    city: "Naples",
    country: "Italy",
    tradition: "Neapolitan",
    founded: 1965,
    tier: "Bespoke",
    services: ["Bespoke"],
    scores: { houseStyle: 2, fabrication: 3, handwork: 4, customisation: 4 },
    priceRange: "€4,000 – €9,000+",
    silhouette: "Neapolitan — refined, understated, deeply personal",
    construction: "Full canvas, entirely bespoke",
    signature: "A quiet house with an exceptionally devoted following — the connoisseur's Neapolitan tailor",
    knownFor: ["Connoisseur following", "Understated excellence", "Deeply personal bespoke"],
    clients: ["Neapolitan tailoring devotees", "Collectors", "Those who know"],
    description: "Sartoria Dalcuore is the connoisseur's Neapolitan tailor — a quiet house without the international profile of Kiton or the editorial attention of Solito, but with an exceptionally devoted following among those who know. The construction is orthodox Neapolitan: full canvas, entirely handmade, built around the individual. The aesthetic is understated to the point of invisibility — which is precisely the point.",
    address: "Naples, Italy",
    website: "sartoriadalcuore.com",
  },

  {
    id: "dege-and-skinner",
    name: "Dege & Skinner",
    city: "London",
    country: "United Kingdom",
    tradition: "Savile Row",
    founded: 1865,
    tier: "Bespoke",
    services: ["Bespoke"],
    scores: { houseStyle: 2, fabrication: 3, handwork: 4, customisation: 4 },
    priceRange: "£5,000 – £11,000+",
    silhouette: "English — military precision, structured shoulder, clean line",
    construction: "Full canvas, bespoke",
    signature: "The Row's most respected military tailor — also produces exceptional civilian bespoke",
    knownFor: ["Military tailoring", "Royal warrant", "Civilian bespoke excellence"],
    clients: ["Military officers", "Royal household", "British establishment"],
    description: "Dege & Skinner is the Row's foremost military tailor — a house that has dressed officers of the British armed forces for over 150 years. The military precision of the construction carries directly into their civilian bespoke: a clean, structured silhouette with an exactness that is unmistakably Savile Row. Holders of a royal warrant, their civilian work is among the finest on the Row.",
    address: "10 Savile Row, London W1S 3PF",
    website: "dege-skinner.co.uk",
  },
  {
    id: "welsh-and-jefferies",
    name: "Welsh & Jefferies",
    city: "London",
    country: "United Kingdom",
    tradition: "Savile Row",
    founded: 1720,
    tier: "Bespoke",
    services: ["Bespoke"],
    scores: { houseStyle: 2, fabrication: 4, handwork: 4, customisation: 4 },
    priceRange: "£5,000 – £10,000+",
    silhouette: "English — deeply traditional, structured, understated",
    construction: "Full canvas, bespoke",
    signature: "The Row's oldest surviving house — rarely discussed outside connoisseur circles, deeply traditional",
    knownFor: ["Oldest Row house", "Deep tradition", "Connoisseur following"],
    clients: ["British establishment", "Military", "Those who value tradition above all"],
    description: "Welsh & Jefferies traces its origins to the 1720s, making it the oldest surviving tailoring house on Savile Row. It is rarely discussed outside the most devoted connoisseur circles — a house that has never sought attention, never modernised its aesthetic, and never compromised its standard. For those who value tradition above all else, Welsh & Jefferies is the Row in its purest form.",
    address: "20 Savile Row, London W1S 3PR",
    website: "welshandjefferies.co",
  },
  {
    id: "turnbull-and-asser",
    name: "Turnbull & Asser",
    city: "London",
    country: "United Kingdom",
    tradition: "British",
    founded: 1885,
    tier: "Bespoke",
    services: ["Bespoke", "RTW"],
    scores: { houseStyle: 2, fabrication: 3, handwork: 3, customisation: 4 },
    specialty: "shirt",
    priceRange: "£350 – £1,200+ (shirts)",
    silhouette: "Jermyn Street — precise, formal, impeccably finished",
    construction: "Bespoke and made-to-measure shirts",
    signature: "Churchill's shirtmaker — the definitive Jermyn Street house, royal warrant holder",
    knownFor: ["Bespoke shirts", "Royal warrant", "Churchill and Bond connection"],
    clients: ["Winston Churchill", "James Bond (costume)", "British establishment", "International professionals"],
    description: "Founded in 1885, Turnbull & Asser is the essential Jermyn Street shirtmaker — Churchill's shirtmaker, a royal warrant holder, and the house that dressed James Bond. Their bespoke shirts are made in their Gloucester factory to an exacting standard: the collar, the cuff, the placket, the button — each detail considered and executed with the precision that defines the Jermyn Street tradition.",
    address: "71–72 Jermyn Street, London SW1Y 6PF",
    website: "turnbullandasser.co.uk",
  },
  {
    id: "sartoria-vestrucci",
    name: "Sartoria Vestrucci",
    city: "Florence",
    country: "Italy",
    tradition: "Florentine",
    founded: 1935,
    tier: "Bespoke",
    services: ["Bespoke"],
    scores: { houseStyle: 2, fabrication: 3, handwork: 4, customisation: 4 },
    priceRange: "€4,500 – €10,000+",
    silhouette: "Florentine — refined, structured, quietly authoritative",
    construction: "Full canvas, entirely bespoke",
    signature: "A quiet Florentine house with an exceptionally refined hand — less known than Liverano, equally serious",
    knownFor: ["Florentine bespoke tradition", "Refined construction", "Connoisseur following"],
    clients: ["Florentine establishment", "International collectors", "Connoisseurs of Italian craft"],
    description: "Sartoria Vestrucci is one of Florence's most serious tailoring houses — a quiet atelier with an exceptionally refined hand and a devoted following among those who know. Less celebrated internationally than Liverano & Liverano, the construction and finish are equally serious: full canvas, entirely handmade, with a Florentine structure that is authoritative without being rigid.",
    address: "Via dei Fossi 25r, 50123 Florence, Italy",
    website: "instagram.com/sartoriavestrucci/",
  },
  {
    id: "ferdinando-caraceni",
    name: "Ferdinando Caraceni",
    city: "Milan",
    country: "Italy",
    tradition: "Italian",
    founded: 1925,
    tier: "Bespoke",
    services: ["Bespoke"],
    scores: { houseStyle: 3, fabrication: 4, handwork: 4, customisation: 4 },
    priceRange: "€5,500 – €13,000+",
    silhouette: "Roman-Milanese — structured, fluid, the other Caraceni line",
    construction: "Full canvas, entirely bespoke",
    signature: "The other Caraceni branch — a separate house with its own distinguished lineage and devoted clientele",
    knownFor: ["Caraceni lineage", "Roman-Milanese bespoke", "Separate from A. Caraceni"],
    clients: ["Milanese establishment", "International collectors", "Connoisseurs of Italian bespoke"],
    description: "Ferdinando Caraceni is the other branch of the great Caraceni tailoring dynasty — a separate house from A. Caraceni, with its own distinguished lineage and devoted clientele. Founded by Ferdinando, a cousin of Augusto, the house maintains the Roman-Milanese bespoke tradition with the same rigour: full canvas, entirely handmade, built to last. Two houses, one name, one standard.",
    address: "Via Manzoni 7, 20121 Milan, Italy",
    website: "caracenitailor.com",
  },
  {
    id: "arnys",
    name: "Arnys",
    city: "Paris",
    country: "France",
    tradition: "Parisian",
    founded: 1933,
    tier: "Bespoke",
    services: ["Bespoke", "RTW"],
    scores: { houseStyle: 4, fabrication: 5, handwork: 5, customisation: 4 },
    priceRange: "€4,000 – €10,000+",
    silhouette: "Parisian — relaxed, intellectual, the Forestière jacket",
    construction: "Full canvas, bespoke and MTM",
    signature: "The Forestière jacket — a Parisian icon; a house with a devoted following among artists and intellectuals",
    knownFor: ["Forestière jacket", "Parisian intellectual clientele", "Relaxed bespoke tradition"],
    clients: ["Parisian intellectuals", "Artists", "Writers", "International connoisseurs"],
    description: "Arnys is the Parisian tailor of artists and intellectuals — a house with a devoted following that has always valued the relaxed, the considered, and the unconventional. The Forestière jacket, Arnys's most iconic creation, is a garment of extraordinary simplicity: a field jacket elevated to the level of art. The house's bespoke work carries the same spirit — precise construction, relaxed silhouette, deeply personal.",
    address: "14 Rue de Sèvres, 75006 Paris, France",
    website: null,
  },
  {
    id: "camps-de-luca",
    name: "Camps de Luca",
    city: "Paris",
    country: "France",
    tradition: "Parisian",
    founded: 1938,
    tier: "Bespoke",
    services: ["Bespoke"],
    scores: { houseStyle: 2, fabrication: 3, handwork: 4, customisation: 4 },
    priceRange: "€5,000 – €12,000+",
    silhouette: "Parisian — structured, precise, technically rigorous",
    construction: "Full canvas, entirely bespoke",
    signature: "The most technically rigorous Parisian bespoke house — a benchmark for French tailoring construction",
    knownFor: ["Technical rigour", "French bespoke benchmark", "Parisian construction mastery"],
    clients: ["Parisian establishment", "International collectors", "Connoisseurs of French tailoring"],
    description: "Camps de Luca is the most technically rigorous bespoke house in Paris — a benchmark for French tailoring construction that is rarely discussed outside the most devoted connoisseur circles. The construction is meticulous: full canvas, entirely handmade, with a precision that reflects the French tradition of craft as discipline. For those who seek the French answer to Savile Row, Camps de Luca is the definitive response.",
    address: "46 Rue du Faubourg Saint-Honoré, 75008 Paris, France",
    website: "campsdeluca.com",
  },
  {
    id: "ascot-chang",
    name: "Ascot Chang",
    city: "Hong Kong",
    country: "Hong Kong",
    tradition: "Hong Kong",
    founded: 1953,
    tier: "Bespoke",
    services: ["Bespoke", "RTW"],
    scores: { houseStyle: 2, fabrication: 3, handwork: 3, customisation: 4 },
    specialty: "shirt",
    priceRange: "HKD 3,500 – HKD 12,000+ (shirts)",
    silhouette: "Hong Kong — precise, formal, impeccably finished",
    construction: "Bespoke and made-to-measure shirts",
    signature: "The definitive Hong Kong shirtmaker — trusted by heads of state for over seventy years",
    knownFor: ["Hong Kong bespoke shirts", "Peninsula Hotel heritage", "Heads of state clientele"],
    clients: ["Heads of state", "Business leaders", "Hong Kong establishment", "International professionals"],
    description: "Founded in 1953, Ascot Chang is the most established shirtmaker in Hong Kong — a house with over seventy years of continuous operation and a client base that spans the city's business and diplomatic community. Their bespoke shirts are made in-house: the collar, the cuff, the placket, and the buttonholes are each executed by hand, using fine cottons sourced from the leading European mills. Ascot Chang also carries suits and stocks brands including Isaia, but the shirts are the reason to visit. Multiple locations across Hong Kong and regular trunk shows internationally.",
    address: "The Peninsula Hotel, Salisbury Road, Tsim Sha Tsui, Hong Kong",
    website: "ascotchang.com",
  },
  {
    id: "dorsia",
    name: "Dorsia",
    city: "Hong Kong",
    country: "Hong Kong",
    tradition: "Hong Kong",
    founded: 2010,
    tier: "Bespoke",
    services: ["Bespoke", "MTM"],
    scores: { houseStyle: 4, fabrication: 3, handwork: 4, customisation: 4 },
    priceRange: "HKD 12,800 – HKD 35,000+",
    silhouette: "Contemporary — clean lines, modern proportions",
    construction: "Full canvas bespoke; MTM programme available",
    signature: "Contemporary Hong Kong bespoke — accessible entry point without compromising construction",
    knownFor: ["Contemporary bespoke", "Transparent pricing", "First-commission experience"],
    clients: ["Professionals", "First-time bespoke clients", "Corporate wardrobe"],
    description: "Dorsia is a contemporary Hong Kong menswear house offering bespoke and made-to-measure suits, shirts, and tailored separates. The house is positioned at the intersection of traditional bespoke craft and contemporary design sensibility — a combination that appeals to professionals who want the fit and construction quality of bespoke without the conservative aesthetic of the older Shanghainese houses. Dorsia's fabric library draws from leading European mills, and their construction standards — full canvas, hand-finishing, multiple fittings — are consistent with the best bespoke houses in the city. Well-suited to the first-time bespoke client: the consultation process is thorough, pricing is transparent, and the team is experienced in guiding clients through fabric and construction choices.",
    address: "Central, Hong Kong",
    website: "dorsiamen.com",
    specialty: null,
  },


  // ── NEAPOLITAN (ADDITIONAL) ─────────────────────────────────────────────────
  {
    id: "caliendo",
    name: "Sartoria Caliendo",
    city: "Naples",
    country: "Italy",
    tradition: "Neapolitan",
    founded: 1961,
    tier: "Bespoke",
    services: ["Bespoke"],
    scores: { houseStyle: 3, fabrication: 3, handwork: 4, customisation: 3 },
    priceRange: "€4,000 – €9,000+",
    silhouette: "Soft Neapolitan, natural shoulder",
    construction: "Hand-padded chest, spalla camicia, hand-embroidered buttonholes, hand backstitch",
    signature: "The Neapolitan 'waterfall' sleeve — gathered, puckered, and unmistakably Caliendo",
    knownFor: ["Waterfall sleeve effect", "Hand-embroidered buttonholes", "Direct client relationships"],
    clients: ["Neapolitan connoisseurs", "International bespoke clients"],
    description: "Founded in February 1961 by Biagio Caliendo, who began tailoring at the age of six, Sartoria Caliendo is one of the most respected ateliers in the Neapolitan tradition. His son Elia joined in 1992, bringing renewed energy and expanding the house's reach with showrooms in Milan and regular trunk shows in London. The house is defined by its extraordinary spalla camicia — the gathered, puckered shirt-sleeve shoulder that creates a distinctive 'waterfall' effect — and its insistence on direct, personal client relationships.",
    address: "Via Santa Maria di Cappella Vecchia 6, Naples",
    website: "sartoriacaliendo.com",
  },
  {
    id: "luca-avitabile",
    name: "Luca Avitabile",
    city: "Naples",
    country: "Italy",
    tradition: "Neapolitan",
    founded: 1948,
    tier: "Bespoke",
    services: ["Bespoke", "MTM", "RTW"],
    specialty: "shirt",
    scores: { houseStyle: 3, fabrication: 4, handwork: 4, customisation: 4 },
    priceRange: "€220 – €370 (shirts)",
    silhouette: "Soft Neapolitan, natural shoulder",
    construction: "Hand-cut patterns, hand-stitched details, hand-drawn collar interlining",
    signature: "The finest Neapolitan shirtmaker — every shirt hand-cut by Luca himself",
    knownFor: ["Neapolitan shirtmaking", "Exceptional collar roll", "Obsessive hand-finishing"],
    clients: ["International connoisseurs", "Permanent Style readers"],
    description: "Luca Avitabile carries on a family shirtmaking legacy that began in Naples in 1948. Each shirt is hand-cut by Luca himself, with a focus on perfect fit and the use of refined fabrics from the finest mills. The house is particularly celebrated for its collar roll — the gentle, natural curve that distinguishes a truly hand-made collar from a machine-pressed one. Luca Avitabile is among the most documented shirtmakers on Permanent Style, with over 70 articles attesting to his craft.",
    address: "Via Toledo 256, Naples",
    website: "lucavitabile.it",
  },

  // ── SCANDINAVIAN ─────────────────────────────────────────────────────────────
  {
    id: "saman-amel",
    name: "Atelier Saman Amel",
    city: "Stockholm",
    country: "Sweden",
    tradition: "Scandinavian",
    founded: 2015,
    tier: "Brand",
    services: ["MTM"],
    scores: { houseStyle: 3, fabrication: 3, handwork: 3, customisation: 3 },
    priceRange: "£2,300 – £3,500+",
    silhouette: "Soft, slightly extended shoulder, clean chest, wide lapels, high gorgeline",
    construction: "Soft shoulder, hand-padded lapels, hand-attached lining, hand-sewn buttonholes, hand-picked stitching",
    signature: "Craftsmanship at the core of modernity — Scandinavian restraint with Neapolitan hand-finishing",
    knownFor: ["Handmade MTM", "Scandinavian restraint", "Exceptional value for handwork"],
    clients: ["Scandinavian professionals", "International MTM clients"],
    description: "Atelier Saman Amel was founded in Stockholm in 2015 by childhood friends Saman Amel and Dag Granath, with the ambition to build a house where craftsmanship sits at the very centre of modernity. Rooted in the Neapolitan tradition of handwork but filtered through Scandinavian restraint, the house produces made-to-measure garments with a level of hand-finishing rare at this price point. Wide lapels, a high gorgeline, and clean, close chest define the house aesthetic — subtle, discreet, and built to last decades.",
    address: "Kommendörsgatan 14, Stockholm",
    website: "samanamel.com",
  },
];

// ── Tier badge colours ─────────────────────────────────────────────────────────
const TIER_COLORS: Record<string, { bg: string; text: string }> = {
  "Bespoke":  { bg: "#111",    text: "#fff" },
  "Brand":    { bg: "#3a3a3a", text: "#e8d5a3" },
};
const SERVICE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "Bespoke": { bg: "#fff",    text: "#111",  border: "#111" },
  "MTM":     { bg: "#fff",    text: "#555",  border: "#888" },
  "RTW":     { bg: "#f5f5f5", text: "#888",  border: "#ccc" },
};

const TRADITIONS = ["All", "Savile Row", "Neapolitan", "Italian", "Florentine", "Parisian", "American", "British", "Japanese", "Korean", "Hong Kong"];

export default function WorldTailors() {
  // ── SEO ─────────────────────────────────────────────────────────────────
  useSEO({
    title: "The World's Best Tailoring Houses | Tailors.hk",
    description: "The world's finest bespoke and made-to-measure tailoring houses — Savile Row, Neapolitan, Milanese, Japanese, and Hong Kong. Independently profiled and assessed by Tailors.hk.",
    canonical: "https://tailors.hk/worlds-best-tailoring",
    schema: [
      SCHEMAS.organization(),
      SCHEMAS.breadcrumb([
        { name: "Home", url: "/" },
        { name: "World's Best Tailoring", url: "/worlds-best-tailoring" },
      ]),
      SCHEMAS.speakable(["h1", "h2"]),
      SCHEMAS.itemList(
        TAILORS.map(t => ({
          name: t.name,
          url: "/worlds-best-tailoring",
          description: t.description,
        }))
      ),
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": "https://tailors.hk/worlds-best-tailoring#webpage",
        "name": "The World's Best Tailoring Houses",
        "description": "The world's finest bespoke and made-to-measure tailoring houses. Independently profiled and assessed by Tailors.hk.",
        "url": "https://tailors.hk/worlds-best-tailoring",
        "isPartOf": { "@type": "WebSite", "@id": "https://tailors.hk/#website" },
        "about": { "@type": "Thing", "name": "Bespoke Tailoring Houses" }
      },
    ],
  });

  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  const rawSearch = useSearch();
  const initialQ = useMemo(() => new URLSearchParams(rawSearch).get("q") || "", []);
  const initialTradition = useMemo(() => new URLSearchParams(rawSearch).get("tradition") || "All", []);
  const [activeTradition, setActiveTradition] = useState(initialTradition);
  const [activeTier, setActiveTier] = useState("All");
  const [activeService, setActiveService] = useState("All");
  const [search, setSearch] = useState(initialQ);
  const [expanded, setExpanded] = useState<string | null>(null);
  // Scroll to results when arriving with a pre-filled search or tradition filter
  useEffect(() => {
    if (initialQ || initialTradition !== "All") {
      setTimeout(() => {
        const el = document.getElementById("tailor-results");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      }, 150);
    }
  }, []);
  const [sortBy, setSortBy] = useState<string>("default");
  const TIERS = ["All", "Bespoke", "Brand"];
  const SERVICES = ["All", "Bespoke", "MTM", "RTW"];

  const SORT_CRITERIA: { key: string; label: string }[] = [
    { key: "default",       label: "DEFAULT" },
    { key: "houseStyle",    label: "HOUSE STYLE" },
    { key: "fabrication",   label: "FABRICATION" },
    { key: "handwork",      label: "HANDWORK" },
    { key: "customisation", label: "CUSTOMISATION" },
  ];
  const SCORE_TOOLTIPS: Record<string, string> = {
    houseStyle:    "How distinctive and globally influential the house's own aesthetic is",
    fabrication:   "Quality and exclusivity of cloth — from mill selection to proprietary fabrics",
    handwork:      "Degree of hand-finishing: canvas, buttonholes, pick-stitching, felled linings",
    customisation: "Range and depth of personalisation: bespoke options, MTM adjustments, fabric choices",
  };
  const SCORE_LEGEND_ITEMS = [
    { key: "houseStyle",    label: "HOUSE STYLE",    desc: SCORE_TOOLTIPS.houseStyle },
    { key: "fabrication",   label: "FABRICATION",   desc: SCORE_TOOLTIPS.fabrication },
    { key: "handwork",      label: "HANDWORK",      desc: SCORE_TOOLTIPS.handwork },
    { key: "customisation", label: "CUSTOMISATION", desc: SCORE_TOOLTIPS.customisation },
  ];
  const [scoreLegendOpen, setScoreLegendOpen] = useState<string | null>(null);
  const filtered = useMemo(() => {
    const list = TAILORS.filter((t) => {
      const matchTradition = activeTradition === "All" || t.tradition === activeTradition || ((t as any).regions || []).includes(activeTradition);
      const matchTier = activeTier === "All" || t.tier === activeTier;
      const matchService = activeService === "All" || ((t as any).services || []).includes(activeService);
      const q = search.toLowerCase();
      const matchSearch = !q || t.name.toLowerCase().includes(q) || t.city.toLowerCase().includes(q) || t.tradition.toLowerCase().includes(q);
      return matchTradition && matchTier && matchService && matchSearch;
    });
    if (sortBy !== "default") {
      list.sort((a, b) => {
        const sa = ((a as any).scores?.[sortBy] ?? 0) as number;
        const sb = ((b as any).scores?.[sortBy] ?? 0) as number;
        return sb - sa;
      });
    }
    return list;
  }, [activeTradition, activeTier, activeService, search, sortBy]);

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      <Navigation />

      {/* ── Hero ── */}
      <section style={{ position: "relative", backgroundColor: "#111", color: "#fff", padding: "clamp(80px, 12vw, 120px) 0 clamp(48px, 6vw, 60px)", overflow: "hidden" }}>
        <img
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/JocirFuxVRRDODTn.png"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", opacity: 0.35, pointerEvents: "none" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", color: "#666", display: "block", marginBottom: "16px" }}>
            THE INDEX · GLOBAL TAILORING
          </span>
          <h1 style={{ fontFamily: F.display, fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1.05, marginBottom: "20px", color: "#fff" }}>
            The World's<br />Best Tailoring
          </h1>
          <p style={{ fontFamily: F.body, fontSize: "15px", lineHeight: 1.7, color: "#aaa", maxWidth: "560px", marginBottom: "32px" }}>
            The world's most significant tailoring houses — from the founding ateliers of Savile Row to the soft-shouldered masters of Naples, the precision of Tokyo, and the contemporary craft of Hong Kong. Independently profiled and assessed.
          </p>
          <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
            {[
              { value: TAILORS.length.toString(), label: "Houses Profiled" },
              { value: "8", label: "Traditions" },
              { value: "12", label: "Cities" },
              { value: "1771", label: "Oldest Founded" },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontFamily: F.display, fontSize: "28px", fontWeight: 600, color: "#fff", letterSpacing: "0.04em" }}>{stat.value}</div>
                <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: "#666", textTransform: "uppercase" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filter bar ── */}
      <section style={{ borderBottom: "1px solid #e0e0e0", backgroundColor: "#fafafa", position: "sticky", top: "60px", zIndex: 40 }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: "0", overflowX: "auto", paddingBottom: "1px" }}>
            {TRADITIONS.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTradition(t)}
                style={{
                  fontFamily: F.mono,
                  fontSize: "8px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "14px 16px",
                  border: "none",
                  borderBottom: activeTradition === t ? "2px solid #111" : "2px solid transparent",
                  backgroundColor: "transparent",
                  color: activeTradition === t ? "#111" : "#999",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  fontWeight: activeTradition === t ? 700 : 400,
                  transition: "all 0.15s",
                }}
              >
                {t}
              </button>
            ))}
            <div style={{ marginLeft: "auto", padding: "8px 0", flexShrink: 0 }}>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  fontFamily: F.mono,
                  fontSize: "9px",
                  letterSpacing: "0.08em",
                  border: "1px solid #ddd",
                  padding: "6px 12px",
                  backgroundColor: "#fff",
                  color: "#111",
                  outline: "none",
                  width: isMobile ? "100px" : "160px",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Tier filter row ── */}
      <div style={{ borderBottom: "1px solid #e0e0e0", backgroundColor: "#fff", overflowX: "auto", WebkitOverflowScrolling: "touch" as any, scrollbarWidth: "none" as any }}>
        <div className="container" style={{ display: "flex", alignItems: "center", gap: "0", paddingTop: 0, paddingBottom: 0 }}>
          {TIERS.map((tier) => {
            const tc = TIER_COLORS[tier];
            const isActive = activeTier === tier;
            return (
              <button
                key={tier}
                onClick={() => setActiveTier(tier)}
                style={{
                  fontFamily: F.mono,
                  fontSize: "8px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  padding: "10px 14px",
                  border: "none",
                  borderBottom: isActive ? "2px solid #111" : "2px solid transparent",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  whiteSpace: "nowrap" as const,
                  transition: "all 0.15s",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: isActive ? "#111" : "#aaa",
                  fontWeight: isActive ? 700 : 400,
                }}
              >
                {tier !== "All" && tc && (
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: tc.bg, border: "none", flexShrink: 0 }} />
                )}
                {tier}
              </button>
            );
          })}
        </div>
      </div>
      {/* ── Service filter row ── */}
      <div style={{ borderBottom: "1px solid #e0e0e0", backgroundColor: "#fafaf8", overflowX: "auto", WebkitOverflowScrolling: "touch" as any, scrollbarWidth: "none" as any }}>
        <div className="container" style={{ display: "flex", alignItems: "center", gap: "0", paddingTop: 0, paddingBottom: 0 }}>
          <span style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.1em", color: "#bbb", paddingRight: "12px", whiteSpace: "nowrap" as const }}>SERVICE</span>
          {SERVICES.map((svc) => {
            const isActive = activeService === svc;
            return (
              <button
                key={svc}
                onClick={() => setActiveService(svc)}
                style={{
                  fontFamily: F.mono,
                  fontSize: "8px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  padding: "8px 12px",
                  border: "none",
                  borderBottom: isActive ? "2px solid #555" : "2px solid transparent",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  whiteSpace: "nowrap" as const,
                  transition: "all 0.15s",
                  color: isActive ? "#555" : "#bbb",
                  fontWeight: isActive ? 700 : 400,
                }}
              >
                {svc}
              </button>
            );
          })}
        </div>
      </div>
      {/* ── Sort row ── */}
      <div style={{ borderBottom: "1px solid #e0e0e0", backgroundColor: "#f5f5f3", overflowX: "auto", WebkitOverflowScrolling: "touch" as any, scrollbarWidth: "none" as any }}>
        <div className="container" style={{ display: "flex", alignItems: "center", gap: "0", paddingTop: 0, paddingBottom: 0 }}>
          <span style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.1em", color: "#bbb", paddingRight: "12px", whiteSpace: "nowrap" as const }}>SORT BY</span>
          {SORT_CRITERIA.map(({ key, label }) => {
            const isActive = sortBy === key;
            return (
              <button
                key={key}
                onClick={() => setSortBy(key)}
                style={{
                  fontFamily: F.mono,
                  fontSize: "8px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  padding: "8px 12px",
                  border: "none",
                  borderBottom: isActive ? "2px solid #888" : "2px solid transparent",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  whiteSpace: "nowrap" as const,
                  transition: "all 0.15s",
                  color: isActive ? "#555" : "#bbb",
                  fontWeight: isActive ? 700 : 400,
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
      {/* ── Results count ── */}
      <div className="container" style={{ paddingTop: "16px" }}>
        <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: "#aaa" }}>
          {filtered.length} HOUSE{filtered.length !== 1 ? "S" : ""} · {[activeTradition !== "All" ? activeTradition : "", activeTier !== "All" ? activeTier : "", activeService !== "All" ? activeService : ""].filter(Boolean).join(" · ").toUpperCase() || "ALL TRADITIONS"}
        </span>
      </div>

      {/* ── Tailor grid ── */}
      <section id="tailor-results" style={{ padding: "24px 0 80px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))", gap: "1px", backgroundColor: "transparent" }}>
            {filtered.map((tailor) => {
              const isExpanded = expanded === tailor.id;
              const tierColor = TIER_COLORS[tailor.tier] ?? TIER_COLORS["Brand"];
              return (
                <div
                  key={tailor.id}
                  style={{ backgroundColor: "#fff", cursor: "pointer" }}
                  onClick={() => setExpanded(isExpanded ? null : tailor.id)}
                >
                  {/* Card header */}
                  <div style={{ padding: "24px 24px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                      <div>
                        <span style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.12em", color: "#aaa", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                          {tailor.tradition} · Est. {tailor.founded}
                        </span>
                        <h3 style={{ fontFamily: F.display, fontSize: "20px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#111", lineHeight: 1.1, margin: 0 }}>
                          {tailor.name}

                        </h3>
                        <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.08em", color: "#888" }}>
                          {tailor.city}, {tailor.country}
                        </span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "flex-end" }}>
                        <span style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.08em", padding: "3px 8px", backgroundColor: tierColor.bg, color: tierColor.text, whiteSpace: "nowrap" }}>
                          {tailor.tier}
                        </span>
                        {(tailor as any).specialty === "shirt" && (
                          <span style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.08em", padding: "2px 6px", backgroundColor: "#e8f0e8", color: "#3a6b3a", whiteSpace: "nowrap", border: "1px solid #c8dcc8" }}>
                            SHIRT HOUSE
                          </span>
                        )}
                        {(tailor as any).regions && activeTradition === "Hong Kong" && (tailor as any).tradition !== "Hong Kong" && (
                          <span style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.08em", padding: "2px 6px", backgroundColor: "#f0f0e8", color: "#6b6b3a", whiteSpace: "nowrap", border: "1px solid #dcdcc8" }}>
                            HK OUTPOST
                          </span>
                        )}
                        <div style={{ display: "flex", gap: "3px", flexWrap: "wrap", justifyContent: "flex-end" }}>
                          {((tailor as any).services || []).map((svc: string) => {
                            const sc = SERVICE_COLORS[svc] || SERVICE_COLORS["RTW"];
                            return (
                              <span key={svc} style={{ fontFamily: F.mono, fontSize: "6px", letterSpacing: "0.08em", padding: "2px 5px", backgroundColor: sc.bg, color: sc.text, border: `1px solid ${sc.border}`, whiteSpace: "nowrap" }}>
                                {svc}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Signature */}
                    <p style={{ fontFamily: F.body, fontSize: "12px", lineHeight: 1.6, color: "#666", margin: "0 0 12px", fontStyle: "italic" }}>
                      "{tailor.signature}"
                    </p>

                    {/* Quick facts */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      <div>
                        <div style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.1em", color: "#bbb", marginBottom: "2px" }}>SILHOUETTE</div>
                        <div style={{ fontFamily: F.body, fontSize: "11px", color: "#555" }}>{tailor.silhouette}</div>
                      </div>
                      <div>
                        <div style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.1em", color: "#bbb", marginBottom: "2px" }}>PRICE RANGE</div>
                        <div style={{ fontFamily: F.body, fontSize: "11px", color: "#555" }}>{tailor.priceRange}</div>
                      </div>
                    </div>
                  </div>

                  {/* Score bars */}
                  {(tailor as any).scores && (
                    <div style={{ padding: "10px 24px 4px" }}>
                      {/* Legend trigger */}
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                        <span style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#bbb" }}>Scores</span>
                        <div style={{ position: "relative", display: "inline-block" }}>
                          <button
                            onClick={(e) => { e.stopPropagation(); setScoreLegendOpen(scoreLegendOpen === tailor.id ? null : tailor.id); }}
                            style={{ background: "none", border: "1px solid #ddd", borderRadius: "50%", width: "13px", height: "13px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, color: "#bbb", fontFamily: F.mono, fontSize: "7px", lineHeight: 1 }}
                            title="Score dimensions explained"
                          >?</button>
                          {scoreLegendOpen === tailor.id && (
                            <>
                              <div onClick={() => setScoreLegendOpen(null)} style={{ position: "fixed", inset: 0, zIndex: 99 }} />
                              <div style={{ position: "absolute", left: "16px", top: 0, zIndex: 100, background: "#fff", border: "1px solid #e8e4df", padding: "12px 14px", width: "220px", boxShadow: "0 4px 16px rgba(0,0,0,0.10)" }}>
                                <div style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa", marginBottom: "10px" }}>Score Dimensions</div>
                                {SCORE_LEGEND_ITEMS.map(({ key, label, desc }) => (
                                  <div key={key} style={{ marginBottom: "8px" }}>
                                    <div style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#333", marginBottom: "2px" }}>{label}</div>
                                    <div style={{ fontFamily: F.body, fontSize: "10px", lineHeight: 1.5, color: "#777" }}>{desc}</div>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      {([
                        { key: "houseStyle",    label: "HOUSE STYLE" },
                        { key: "fabrication",   label: "FABRICATION" },
                        { key: "handwork",      label: "HANDWORK" },
                        { key: "customisation", label: "CUSTOMISATION" },
                      ] as { key: string; label: string }[]).map(({ key, label }) => {
                        const score: number = (tailor as any).scores[key] ?? 0;
                        return (
                          <div key={key} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
                            <span
                              title={SCORE_TOOLTIPS[key] ?? ""}
                              style={{ fontFamily: F.mono, fontSize: "6px", letterSpacing: "0.08em", color: "#bbb", width: "82px", flexShrink: 0, cursor: "help" }}
                            >{label}</span>
                            <div style={{ flex: 1, display: "flex", gap: "2px" }}>
                              {[1,2,3,4,5].map((pip) => (
                                <div key={pip} style={{ flex: 1, height: "3px", backgroundColor: pip <= score ? "#111" : "#e8e8e8" }} />
                              ))}
                            </div>
                            <span style={{ fontFamily: F.mono, fontSize: "6px", color: "#bbb", width: "8px", textAlign: "right" }}>{score}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {/* Expand button */}
                  <div style={{ padding: "0 24px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {tailor.knownFor.slice(0, 2).map((k) => (
                        <span key={k} style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.06em", color: "#888", border: "1px solid #e0e0e0", padding: "2px 6px", textTransform: "uppercase" as const }}>{k}</span>
                      ))}
                    </div>
                    <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.08em", color: "#aaa" }}>
                      {isExpanded ? "LESS ↑" : "MORE ↓"}
                    </span>
                  </div>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div style={{ padding: "0 24px 24px", borderTop: "1px solid #f0f0f0" }}>
                      <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.75, color: "#555", margin: "16px 0" }}>
                        {tailor.description}
                      </p>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                        <div>
                          <div style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.1em", color: "#bbb", marginBottom: "4px" }}>CONSTRUCTION</div>
                          <div style={{ fontFamily: F.body, fontSize: "11px", color: "#555", lineHeight: 1.5 }}>{tailor.construction}</div>
                        </div>
                        <div>
                          <div style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.1em", color: "#bbb", marginBottom: "4px" }}>KNOWN FOR</div>
                          <div style={{ fontFamily: F.body, fontSize: "11px", color: "#555", lineHeight: 1.5 }}>{tailor.knownFor.join(" · ")}</div>
                        </div>
                      </div>
                      {tailor.clients && tailor.clients.length > 0 && (
                        <div style={{ marginBottom: "16px" }}>
                          <div style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.1em", color: "#bbb", marginBottom: "4px" }}>NOTABLE CLIENTS</div>
                          <div style={{ fontFamily: F.body, fontSize: "11px", color: "#555" }}>{tailor.clients.join(", ")}</div>
                        </div>
                      )}
                      {tailor.website && (
                      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <a
                          href={`https://${tailor.website}`}
                          target="_blank"
                          rel={["noopener", "noreferrer", ...(tailor.website === "magnusandnovus.com" || tailor.website === "dorsiamen.com" ? [] : ["nofollow"])].join(" ")}
                          onClick={(e) => e.stopPropagation()}
                          style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: "#111", textDecoration: "none", border: "1px solid #111", padding: "6px 12px", transition: "all 0.15s" }}
                        >
                          VISIT →
                        </a>
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
              NO HOUSES MATCH YOUR SEARCH
            </div>
          )}
        </div>
      </section>

      {/* ── Editorial note ── */}
      <section style={{ backgroundColor: "#111", color: "#fff", padding: "60px 0" }}>
        <div className="container" style={{ maxWidth: "680px" }}>
          <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#555", display: "block", marginBottom: "12px" }}>
            EDITORIAL NOTE
          </span>
          <h2 style={{ fontFamily: F.display, fontSize: "24px", fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", marginBottom: "16px" }}>
            ON SELECTION CRITERIA
          </h2>
          <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.8, color: "#888" }}>
            This index profiles houses selected for their documented contribution to tailoring craft, their historical significance, or their contemporary excellence. Inclusion is based on construction quality, heritage, and the distinctiveness of their aesthetic contribution — not commercial relationships. Price ranges are approximate and subject to change; contact each house directly for current pricing.
          </p>

          <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #222" }}>
            <p style={{ fontFamily: F.body, fontSize: "12px", lineHeight: 1.8, color: "#666" }}>
              <strong style={{ color: "#888" }}>About this index:</strong> The world's finest tailoring houses span eight traditions — Savile Row (London), Neapolitan (Naples), Italian Bespoke (Rome, Milan, Florence), Parisian (Paris), Japanese (Tokyo, Osaka), and Hong Kong Bespoke. This index profiles {TAILORS.length} houses across 12 cities, independently assessed across house style, fabrication quality, handwork, and customisation. Prices range from HK$28,000 for Hong Kong bespoke to £14,000+ for Savile Row couture. Each profile includes construction method, silhouette, price band, and an editorial assessment.
            </p>
          </div>

          <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid #222" }}>
            <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.12em", color: "#555", display: "block", marginBottom: "12px" }}>SCORING METHODOLOGY</span>
            <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.8, color: "#888", marginBottom: "16px" }}>
              Each house is assessed across four dimensions: <strong style={{ color: "#aaa" }}>House Style</strong> (strength and distinctiveness of the signature aesthetic), <strong style={{ color: "#aaa" }}>Fabrication</strong> (cloth sourcing, mill relationships, and material quality), <strong style={{ color: "#aaa" }}>Handwork</strong> (proportion of hand operations per garment), and <strong style={{ color: "#aaa" }}>Customisation</strong> (breadth of client-directed options). Scores are on a 1–5 scale and reflect the editorial assessment of Tailors.hk, informed by published reviews, client accounts, and direct atelier visits where possible.
            </p>
            <p style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.08em", color: "#555" }}>
              INDEX LAST REVIEWED: MAY 2026
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
