"use client";
import { useSEO, SCHEMAS } from "@/hooks/useSEO";
/**
 * TailorCompare.tsx
 * Design: Tailors.hk editorial register aesthetic — dark toolbar, off-white body,
 * Barlow Condensed display, mono labels, editorial grid.
 * Comparison of up to 5 world-class bespoke / MTM tailoring houses side-by-side.
 */

import { useState, useMemo } from "react";
import { X, Plus, ChevronDown, ChevronUp, ExternalLink, BarChart2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
// SEO handled by generateMetadata in page.tsx

const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body: '"Barlow", Arial, sans-serif',
  mono: '"JetBrains Mono", "Courier New", monospace',
};

// ─── HOUSE DATA ──────────────────────────────────────────────────────────────

type Tier = "Couture" | "Investment" | "Premium" | "Accessible";
type Construction = "Full Bespoke" | "MTM Bespoke" | "Made-to-Measure" | "RTW/Bespoke" | "Made-to-Measure / RTW" | "Su Misura (MTM)";
type Rating = 1 | 2 | 3 | 4 | 5;

interface TailorHouse {
  id: string;
  name: string;
  city: string;
  country: string;
  tradition: string;
  founded: number;
  tier: Tier;
  // Comparison fields
  construction: Construction;
  priceRange: string;          // e.g. "HK$80,000 – 200,000"
  priceNote: string;           // e.g. "for a two-piece suit"
  leadTime: string;            // e.g. "4 – 6 months"
  fittings: string;            // e.g. "3 – 5 fittings"
  clothSources: string[];      // e.g. ["Loro Piana", "Scabal", "Holland & Sherry"]
  canvasType: string;          // "Full canvas" | "Half canvas" | "Fused" | "Full canvas (hand-padded)"
  houseStyle: string;          // 2–3 sentence editorial description
  strengths: string[];         // 3 key strengths
  bestFor: string;             // one-liner
  website: string;
  // Ratings (1–5)
  ratings: {
    houseStyle: Rating;       // strength and distinctiveness of the house signature
    craftsmanship: Rating;
    clothSelection: Rating;
    fitPrecision: Rating;
    heritage: Rating;
    value: Rating;
    easeOfCommission: Rating;  // ease of commissioning, English-speaking, trunk shows, etc.
  };
  // Optional secondary category tags (e.g. a British house based in HK)
  tags?: string[];
}

const HOUSES: TailorHouse[] = [
  {
    id: "huntsman",
    name: "Huntsman",
    city: "London",
    country: "United Kingdom",
    tradition: "Savile Row",
    founded: 1849,
    tier: "Couture",
    construction: "Full Bespoke",
    priceRange: "£6,500 – £14,000+",
    priceNote: "two-piece bespoke suit",
    leadTime: "6 – 12 months",
    fittings: "4 – 6 fittings",
    clothSources: ["Holland & Sherry", "Scabal", "Dormeuil", "Loro Piana"],
    canvasType: "Full canvas (hand-padded)",
    houseStyle: "Huntsman is the definitive expression of the Savile Row military cut — a high, structured shoulder, suppressed waist, and a single-button stance that is immediately recognisable. The house has dressed royalty, heads of state, and film stars since 1849, and its standards have not softened.",
    strengths: ["Unmatched shoulder construction", "Military precision and formality", "Exceptional cloth archive"],
    bestFor: "Those who want the most authoritative English suit in existence",
    website: "https://www.h-huntsman.com",
    ratings: { houseStyle: 4, craftsmanship: 4, clothSelection: 4, fitPrecision: 4, heritage: 4, value: 1, easeOfCommission: 3 },
  },
  {
    id: "anderson-sheppard",
    name: "Anderson & Sheppard",
    city: "London",
    country: "United Kingdom",
    tradition: "Savile Row",
    founded: 1906,
    tier: "Couture",
    construction: "Full Bespoke",
    priceRange: "£6,000 – £12,000+",
    priceNote: "two-piece bespoke suit",
    leadTime: "4 – 8 months",
    fittings: "3 – 5 fittings",
    clothSources: ["Holland & Sherry", "Scabal", "Loro Piana", "Dugdale Bros"],
    canvasType: "Full canvas (hand-padded)",
    houseStyle: "Anderson & Sheppard is the antithesis of Huntsman — soft, unstructured, and draped. The house pioneered the 'soft English' style beloved by Fred Astaire and the Duke of Windsor, producing suits that move with the body rather than imposing a silhouette upon it.",
    strengths: ["Soft drape construction", "Exceptional comfort and movement", "Understated English elegance"],
    bestFor: "Clients who prize comfort and natural movement over formality",
    website: "https://www.anderson-sheppard.co.uk",
    ratings: { houseStyle: 4, craftsmanship: 4, clothSelection: 4, fitPrecision: 4, heritage: 4, value: 1, easeOfCommission: 3 },
  },
  {
    id: "kiton",
    name: "Kiton",
    city: "Naples",
    country: "Italy",
    tradition: "Neapolitan",
    founded: 1956,
    tier: "Couture",
    construction: "Full Bespoke",
    priceRange: "€6,000 – €20,000+",
    priceNote: "two-piece bespoke suit",
    leadTime: "3 – 6 months",
    fittings: "2 – 4 fittings",
    clothSources: ["Proprietary Kiton cloth", "Loro Piana", "Caccioppoli"],
    canvasType: "Full canvas (hand-padded)",
    houseStyle: "Kiton is the benchmark against which all Neapolitan tailoring is measured. The house employs over 300 craftsmen, each trained exclusively in-house, and produces fewer than 25,000 garments per year. The result is a suit of extraordinary lightness, hand-stitched throughout, with the characteristic Neapolitan open quarters and a soft, unpadded shoulder.",
    strengths: ["Finest hand-stitching in production tailoring", "Extraordinary cloth quality", "Neapolitan lightness and drape"],
    bestFor: "The connoisseur who wants the finest production bespoke in the world",
    website: "https://www.kiton.com",
    ratings: { houseStyle: 3, craftsmanship: 5, clothSelection: 4, fitPrecision: 5, heritage: 3, value: 1, easeOfCommission: 3 },
  },
  {
    id: "brioni",
    name: "Brioni",
    city: "Rome",
    country: "Italy",
    tradition: "Roman Bespoke",
    founded: 1945,
    tier: "Couture",
    construction: "Full Bespoke",
    priceRange: "€7,000 – €25,000+",
    priceNote: "two-piece bespoke suit",
    leadTime: "4 – 8 months",
    fittings: "3 – 5 fittings",
    clothSources: ["Proprietary Brioni cloth", "Loro Piana", "Scabal"],
    canvasType: "Full canvas (hand-padded)",
    houseStyle: "Brioni invented the concept of Italian luxury tailoring as a global proposition. The Roman house is characterised by a broader shoulder than the Neapolitan tradition, a cleaner chest, and an emphasis on drama and presence. Brioni suits are built to command a room.",
    strengths: ["Roman grandeur and presence", "Exceptional cloth archive", "Consistent global service"],
    bestFor: "Executives and public figures who require commanding presence",
    website: "https://www.brioni.com",
    ratings: { houseStyle: 4, craftsmanship: 4, clothSelection: 4, fitPrecision: 4, heritage: 4, value: 1, easeOfCommission: 4 },
  },
  {
    id: "cifonelli",
    name: "Cifonelli",
    city: "Paris",
    country: "France",
    tradition: "Parisian",
    founded: 1880,
    tier: "Couture",
    construction: "Full Bespoke",
    priceRange: "€6,000 – €14,000+",
    priceNote: "two-piece bespoke suit",
    leadTime: "5 – 9 months",
    fittings: "4 – 6 fittings",
    clothSources: ["Dormeuil", "Scabal", "Holland & Sherry", "Loro Piana"],
    canvasType: "Full canvas (hand-padded)",
    houseStyle: "Cifonelli is the most architecturally precise house in Paris — its signature is the 'Cifonelli shoulder', a concave, rope-like construction that creates an extraordinary silhouette. The house combines French precision with Italian softness, producing suits of remarkable sculptural quality.",
    strengths: ["Signature rope shoulder construction", "French architectural precision", "Exceptional silhouette"],
    bestFor: "Those who want the most distinctive and sculptural silhouette in bespoke",
    website: "https://www.cifonelli.com",
    ratings: { houseStyle: 4, craftsmanship: 4, clothSelection: 4, fitPrecision: 4, heritage: 4, value: 1, easeOfCommission: 4 },
  },
  {
    id: "rubinacci",
    name: "Rubinacci",
    city: "Naples",
    country: "Italy",
    tradition: "Neapolitan",
    founded: 1932,
    tier: "Couture",
    construction: "Full Bespoke",
    priceRange: "€5,000 – €12,000+",
    priceNote: "two-piece bespoke suit",
    leadTime: "4 – 8 months",
    fittings: "3 – 5 fittings",
    clothSources: ["Caccioppoli", "Loro Piana", "Drapers"],
    canvasType: "Full canvas (hand-padded)",
    houseStyle: "Rubinacci is the intellectual heart of Neapolitan tailoring — the house that codified the tradition and made it a global conversation. Luca Rubinacci has brought the house to a younger audience without compromising its standards. The suits are supremely light, with an open chest and a casual elegance that is unique to the Neapolitan school.",
    strengths: ["Purest Neapolitan tradition", "Exceptional lightness", "Cultural authority in menswear"],
    bestFor: "The menswear intellectual who wants the most authentic Neapolitan expression",
    website: "https://www.rubinacci.net",
    ratings: { houseStyle: 4, craftsmanship: 5, clothSelection: 4, fitPrecision: 5, heritage: 4, value: 2, easeOfCommission: 4 },
  },
  {
    id: "liverano",
    name: "Liverano & Liverano",
    city: "Florence",
    country: "Italy",
    tradition: "Florentine",
    founded: 1949,
    tier: "Couture",
    construction: "Full Bespoke",
    priceRange: "€4,500 – €10,000+",
    priceNote: "two-piece bespoke suit",
    leadTime: "6 – 12 months",
    fittings: "3 – 5 fittings",
    clothSources: ["Loro Piana", "Drapers", "Caccioppoli"],
    canvasType: "Full canvas (hand-padded)",
    houseStyle: "Liverano & Liverano is the guardian of the Florentine tradition — a style that sits between the English structure and the Neapolitan softness. The house is known for its extraordinary attention to proportion, its mastery of pattern, and a quiet confidence that requires no announcement.",
    strengths: ["Florentine proportion mastery", "Exceptional pattern work", "Quiet, authoritative elegance"],
    bestFor: "The discerning client who prizes proportion and restraint above all",
    website: "https://www.liverano.com",
    ratings: { houseStyle: 4, craftsmanship: 4, clothSelection: 4, fitPrecision: 4, heritage: 3, value: 2, easeOfCommission: 3 },
  },
  {
    id: "ww-chan",
    name: "W.W. Chan & Sons",
    city: "Hong Kong",
    country: "Hong Kong",
    tradition: "Hong Kong Bespoke",
    founded: 1952,
    tier: "Investment",
    construction: "Full Bespoke",
    priceRange: "HKD 12,000 – HKD 35,000+",
    priceNote: "two-piece bespoke suit",
    leadTime: "2 – 4 months",
    fittings: "2 – 3 fittings",
    clothSources: ["Holland & Sherry", "Loro Piana", "Scabal", "Dormeuil"],
    canvasType: "Full canvas (hand-padded)",
    houseStyle: "W.W. Chan is the most internationally respected Hong Kong tailoring house — a family operation that has dressed four generations of clients with a consistent standard of English-influenced construction at a fraction of Savile Row prices. The house is known for its precision, its cloth selection, and its ability to produce suits that travel and perform.",
    strengths: ["Exceptional value for full bespoke", "English-influenced precision", "Extensive cloth selection"],
    bestFor: "The international client who wants Savile Row quality at Hong Kong prices",
    website: "https://www.wwchan.com",
    ratings: { houseStyle: 2, craftsmanship: 3, clothSelection: 4, fitPrecision: 4, heritage: 3, value: 4, easeOfCommission: 4 },
  },
  {
    id: "norton-sons",
    name: "Norton & Sons",
    city: "London",
    country: "United Kingdom",
    tradition: "Savile Row",
    founded: 1821,
    tier: "Couture",
    construction: "Full Bespoke",
    priceRange: "£5,500 – £11,000+",
    priceNote: "two-piece bespoke suit",
    leadTime: "4 – 8 months",
    fittings: "3 – 5 fittings",
    clothSources: ["Holland & Sherry", "Scabal", "Dugdale Bros", "Loro Piana"],
    canvasType: "Full canvas (hand-padded)",
    houseStyle: "Norton & Sons is one of the oldest houses on Savile Row, and under Patrick Grant it has become one of the most dynamic. The house produces suits of exceptional English quality with a slightly more modern sensibility than its neighbours — broader lapels, a cleaner chest, and a silhouette that reads as contemporary without abandoning tradition.",
    strengths: ["Modern Savile Row sensibility", "Exceptional heritage", "Strong cloth archive"],
    bestFor: "The client who wants English tradition with a contemporary edge",
    website: "https://www.nortonandsons.co.uk",
    ratings: { houseStyle: 3, craftsmanship: 3, clothSelection: 3, fitPrecision: 3, heritage: 4, value: 1, easeOfCommission: 3 },
  },
  {
    id: "henry-poole",
    name: "Henry Poole & Co",
    city: "London",
    country: "United Kingdom",
    tradition: "Savile Row",
    founded: 1806,
    tier: "Couture",
    construction: "Full Bespoke",
    priceRange: "£6,000 – £13,000+",
    priceNote: "two-piece bespoke suit",
    leadTime: "4 – 8 months",
    fittings: "3 – 5 fittings",
    clothSources: ["Holland & Sherry", "Scabal", "Dormeuil"],
    canvasType: "Full canvas (hand-padded)",
    houseStyle: "Henry Poole is the oldest house on Savile Row and is credited with inventing the dinner jacket. The house has dressed Napoleon III, the Emperor of Japan, and the Prince of Wales. Its style is classically English — structured, precise, and formal — with a history that gives every commission a particular weight.",
    strengths: ["Oldest house on Savile Row", "Invented the dinner jacket", "Formal English precision"],
    bestFor: "Those for whom historical provenance and English formality are paramount",
    website: "https://www.henrypoole.com",
    ratings: { houseStyle: 4, craftsmanship: 4, clothSelection: 3, fitPrecision: 3, heritage: 4, value: 1, easeOfCommission: 2 },
  },
  {
    id: "cesare-attolini",
    name: "Cesare Attolini",
    city: "Naples",
    country: "Italy",
    tradition: "Neapolitan",
    founded: 1930,
    tier: "Investment",
    construction: "MTM Bespoke",
    priceRange: "€3,500 – €8,000+",
    priceNote: "two-piece suit",
    leadTime: "6 – 10 weeks",
    fittings: "1 – 2 fittings",
    clothSources: ["Caccioppoli", "Loro Piana", "Drapers"],
    canvasType: "Full canvas (hand-padded)",
    houseStyle: "Cesare Attolini is the most accessible entry point into authentic Neapolitan tailoring. The house produces suits of genuine quality — full canvas, hand-stitched — at prices that are a fraction of the full bespoke houses. The style is classically Neapolitan: light, unstructured, and effortlessly elegant.",
    strengths: ["Authentic Neapolitan quality at accessible prices", "Full canvas construction", "Excellent cloth selection"],
    bestFor: "The client who wants genuine Neapolitan quality without the full bespoke commitment",
    website: "https://www.cesare-attolini.com",
    ratings: { houseStyle: 4, craftsmanship: 5, clothSelection: 4, fitPrecision: 5, heritage: 3, value: 3, easeOfCommission: 2 },
  },
  {
    id: "b-and-tailor",
    name: "B&Tailor",
    city: "Seoul",
    country: "South Korea",
    tradition: "Korean Bespoke",
    founded: 2012,
    tier: "Investment",
    construction: "Full Bespoke",
    priceRange: "₩3,000,000 – ₩8,000,000+",
    priceNote: "two-piece bespoke suit",
    leadTime: "2 – 4 months",
    fittings: "2 – 3 fittings",
    clothSources: ["Holland & Sherry", "Loro Piana", "Scabal", "Caccioppoli"],
    canvasType: "Full canvas (hand-padded)",
    houseStyle: "B&Tailor has established Seoul as a serious destination for bespoke tailoring. The house combines Neapolitan construction techniques with Korean precision and a distinctly modern sensibility — producing suits that are simultaneously traditional in construction and contemporary in silhouette.",
    strengths: ["Neapolitan construction at Korean prices", "Modern silhouette", "Exceptional precision"],
    bestFor: "The modern client who wants full bespoke quality with a contemporary aesthetic",
    website: "https://www.bandtailor.com",
    ratings: { houseStyle: 3, craftsmanship: 4, clothSelection: 3, fitPrecision: 4, heritage: 1, value: 3, easeOfCommission: 3 },
  },
  {
    id: "dorsia",
    name: "Dorsia",
    city: "Hong Kong",
    country: "Hong Kong",
    tradition: "Hong Kong Bespoke",
    founded: 2010,
    tier: "Investment",
    construction: "Full Bespoke",
    priceRange: "HKD 12,800 – HKD 35,000+",
    priceNote: "two-piece bespoke suit",
    leadTime: "6 – 10 weeks",
    fittings: "2 – 3 fittings",
    clothSources: ["Holland & Sherry", "Loro Piana", "Scabal"],
    canvasType: "Full canvas",
    houseStyle: "Dorsia represents the new generation of Hong Kong bespoke — technically accomplished, internationally aware, and priced for the professional rather than the plutocrat. The house produces clean, modern suits with a strong emphasis on fit precision and cloth quality.",
    strengths: ["Accessible Hong Kong bespoke", "Modern sensibility", "Strong fit precision"],
    bestFor: "The Hong Kong professional seeking quality bespoke at a professional price point",
    website: "https://www.dorsiabespoke.com",
    ratings: { houseStyle: 4, craftsmanship: 3, clothSelection: 3, fitPrecision: 4, heritage: 1, value: 5, easeOfCommission: 3 },
  },
  {
    id: "saman-amel",
    name: "Atelier Saman Amel",
    city: "Stockholm",
    country: "Sweden",
    tradition: "Scandinavian",
    founded: 2012,
    tier: "Investment",
    construction: "Full Bespoke",
    priceRange: "HK$55,000 – 130,000",
    priceNote: "two-piece bespoke suit",
    leadTime: "3 – 6 months",
    fittings: "2 – 4 fittings",
    clothSources: ["Loro Piana", "Holland & Sherry", "Caccioppoli"],
    canvasType: "Full canvas (hand-padded)",
    houseStyle: "Saman Amel has done more than any other house to establish Scandinavian tailoring as a serious tradition. The Stockholm atelier produces suits of remarkable refinement — clean, minimal, and precise — that combine Neapolitan construction with a Nordic restraint that is entirely its own.",
    strengths: ["Nordic restraint and precision", "Neapolitan construction techniques", "Exceptional modern sensibility"],
    bestFor: "The client who wants full bespoke quality with a clean, modern Scandinavian aesthetic",
    website: "https://www.samanamelbespoke.com",
    ratings: { houseStyle: 3, craftsmanship: 3, clothSelection: 3, fitPrecision: 4, heritage: 1, value: 2, easeOfCommission: 2 },
  },
  {
    id: "magnus-novus",
    name: "Magnus & Novus",
    city: "Hong Kong",
    country: "Hong Kong",
    tradition: "British",
    founded: 2015,
    tier: "Investment",
    construction: "Full Bespoke",
    priceRange: "HK$33,800 – HK$120,000+",
    priceNote: "two-piece bespoke suit",
    leadTime: "8 – 14 weeks",
    fittings: "3 – 5 fittings",
    clothSources: ["Proprietary house textiles", "Holland & Sherry", "Loro Piana"],
    canvasType: "Full canvas (entirely handcrafted)",
    houseStyle: "Magnus & Novus is a British menswear house of singular aesthetic conviction — understated, precise, and built to endure. The bespoke programme is structured around a defining house silhouette that clients return to commission repeatedly — the design is not a starting point for adaptation, but the destination itself. The result is a body of work that occupies the space between tailoring and investment craft.",
    strengths: ["Over 5,000 stitches per garment", "Proprietary house textiles", "Investment-grade artisanal craft"],
    bestFor: "The client who wants a singular, authoritative British house silhouette — built to endure and commission repeatedly",
    website: "https://www.magnusandnovus.com",
    ratings: { houseStyle: 5, craftsmanship: 5, clothSelection: 4, fitPrecision: 5, heritage: 3, value: 2, easeOfCommission: 4 },
    tags: ["Hong Kong Bespoke"],
  },
  {
    id: "brioni",
    name: "Brioni",
    city: "Hong Kong (Landmark)",
    country: "Italy / Hong Kong",
    tradition: "Roman",
    founded: 1945,
    tier: "Investment",
    construction: "Made-to-Measure",
    priceRange: "HK$90,000+",
    priceNote: "made-to-measure two-piece suit",
    leadTime: "8 – 12 weeks",
    fittings: "1 – 2 fittings",
    clothSources: ["Brioni proprietary archive", "Loro Piana", "Scabal"],
    canvasType: "Full canvas, hand-finished",
    houseStyle: "Brioni is the definitive Roman tailoring house — broader-shouldered, more dramatic, and built to command attention. The house's made-to-measure programme in Hong Kong provides access to Brioni's proprietary cloth archive and the craftsmanship of the Penne atelier, without requiring a trip to Rome.",
    strengths: ["Roman authority and heritage", "Proprietary cloth archive", "Exceptional hand-finishing"],
    bestFor: "The client who wants the authority of a Roman house with a strong, recognisable silhouette",
    website: "https://www.brioni.com",
    ratings: { houseStyle: 4, craftsmanship: 4, clothSelection: 4, fitPrecision: 3, heritage: 4, value: 2, easeOfCommission: 2 },
  },
  {
    id: "brunello-cucinelli",
    name: "Brunello Cucinelli",
    city: "Hong Kong (Landmark)",
    country: "Italy / Hong Kong",
    tradition: "Umbrian",
    founded: 1978,
    tier: "Investment",
    construction: "Made-to-Measure / RTW",
    priceRange: "HK$28,000 – 60,000+",
    priceNote: "RTW from HK$28,000; MTM from HK$60,000",
    leadTime: "6 – 10 weeks (MTM)",
    fittings: "1 – 2 fittings",
    clothSources: ["Cucinelli proprietary cashmere", "Loro Piana", "Zegna"],
    canvasType: "Full canvas (MTM); structured RTW",
    houseStyle: "Brunello Cucinelli has made restraint and quiet authority its defining proposition. The house controls its own cashmere supply chain and produces garments at the Solomeo atelier in Umbria. The aesthetic is deliberately understated — the choice of the client who has moved beyond the need for a strong house signature.",
    strengths: ["Proprietary cashmere supply chain", "Understated luxury positioning", "Solomeo atelier craftsmanship"],
    bestFor: "The client who wants the finest cloth and impeccable construction without a strong house signature",
    website: "https://www.brunellocucinelli.com",
    ratings: { houseStyle: 3, craftsmanship: 4, clothSelection: 4, fitPrecision: 3, heritage: 3, value: 2, easeOfCommission: 2 },
  },
  {
    id: "zegna",
    name: "Ermenegildo Zegna",
    city: "Hong Kong (Landmark, IFC)",
    country: "Italy / Hong Kong",
    tradition: "Biellese",
    founded: 1910,
    tier: "Premium",
    construction: "Su Misura (MTM)",
    priceRange: "HK$18,000 – 45,000+",
    priceNote: "RTW from HK$18,000; Su Misura from HK$45,000",
    leadTime: "6 – 8 weeks",
    fittings: "1 – 2 fittings",
    clothSources: ["Zegna proprietary Biella wools", "Oasi Cashmere", "Silk blends"],
    canvasType: "Full canvas (Su Misura)",
    houseStyle: "Zegna is the most commercially established Italian tailoring house in Hong Kong. The house controls its own wool supply chain from Biella, and the Su Misura programme provides access to this cloth archive with reliable, well-managed production at the Trivero atelier.",
    strengths: ["Proprietary Biella wool supply chain", "Multiple HK locations", "Consistent Su Misura quality"],
    bestFor: "The professional who wants exceptional cloth and reliable construction from a major house",
    website: "https://www.zegna.com",
    ratings: { houseStyle: 3, craftsmanship: 3, clothSelection: 4, fitPrecision: 3, heritage: 4, value: 3, easeOfCommission: 3 },
  },
  {
    id: "tom-ford",
    name: "Tom Ford",
    city: "Hong Kong (Landmark)",
    country: "USA / Hong Kong",
    tradition: "American / Italian",
    founded: 2005,
    tier: "Investment",
    construction: "Made-to-Measure / RTW",
    priceRange: "HK$25,000 – 80,000+",
    priceNote: "RTW from HK$25,000; MTM from HK$80,000",
    leadTime: "6 – 10 weeks (MTM)",
    fittings: "1 – 2 fittings",
    clothSources: ["Zegna", "Loro Piana", "Holland & Sherry"],
    canvasType: "Full canvas, hand-finished",
    houseStyle: "Tom Ford's tailoring is the most overtly glamorous proposition in Hong Kong's premium menswear landscape — a sharp, elongated silhouette with a strong shoulder and exceptional construction. It is not the house for those who want to disappear into a room; it is the house for those who want to own it.",
    strengths: ["Distinctive glamorous silhouette", "Exceptional construction standards", "Strong brand authority"],
    bestFor: "The client who wants a suit with a strong, recognisable aesthetic that communicates confidence and theatricality",
    website: "https://www.tomford.com",
    ratings: { houseStyle: 4, craftsmanship: 4, clothSelection: 3, fitPrecision: 3, heritage: 1, value: 2, easeOfCommission: 2 },
  },
  {
    id: "suitsupply",
    name: "Suitsupply",
    city: "Hong Kong (IFC Mall)",
    country: "Netherlands / Hong Kong",
    tradition: "Dutch",
    founded: 2000,
    tier: "Accessible",
    construction: "Made-to-Measure / RTW",
    priceRange: "HK$2,500 – 4,500",
    priceNote: "RTW from HK$2,500; MTM from HK$4,500",
    leadTime: "2 – 3 weeks",
    fittings: "1 fitting",
    clothSources: ["Vitale Barberis", "Reda", "Thomas Mason (shirts)"],
    canvasType: "Half canvas (most models); full canvas on upper tier",
    houseStyle: "Suitsupply is the most rational entry point in Hong Kong's tailored menswear landscape — a Dutch brand that delivers well-constructed suits at an accessible price point. The house is not bespoke and does not pretend to be; it competes on value, consistency, and availability.",
    strengths: ["Exceptional value for construction quality", "Fast turnaround", "Accessible entry point for first-time buyers"],
    bestFor: "The professional new to tailoring, or who needs a well-presented suit without the investment of a full bespoke commission",
    website: "https://www.suitsupply.com",
    ratings: { houseStyle: 2, craftsmanship: 2, clothSelection: 2, fitPrecision: 2, heritage: 1, value: 4, easeOfCommission: 4 },
  },
];

const MAX_COMPARE = 5;

const TIER_COLORS: Record<Tier, { bg: string; text: string; border: string }> = {
  "Couture":    { bg: "#1a1a1a", text: "#c8a96e", border: "#c8a96e" },
  "Investment": { bg: "#f5f0e8", text: "#6b5a3e", border: "#c8a96e" },
  "Premium":    { bg: "#f0f4f8", text: "#2d4a6e", border: "#2d4a6e" },
  "Accessible": { bg: "#f0f8f0", text: "#2d5a2d", border: "#2d5a2d" },
};

const COMPARE_ROWS = [
  { key: "tradition",    label: "Tradition" },
  { key: "founded",      label: "Founded" },
  { key: "construction", label: "Construction" },
  { key: "priceRange",   label: "Price Range" },
  { key: "leadTime",     label: "Lead Time" },
  { key: "fittings",     label: "Fittings" },
  { key: "canvasType",   label: "Canvas" },
  { key: "clothSources", label: "Cloth Sources" },
  { key: "bestFor",      label: "Best For" },
];

const RATING_LEGEND = [
  { key: "House Style",         desc: "Strength and distinctiveness of the house's own aesthetic signature" },
  { key: "Craftsmanship",       desc: "Quality of hand work — canvas, buttonholes, pick-stitching, felled linings" },
  { key: "Cloth Selection",     desc: "Breadth and exclusivity of cloth — mill relationships, proprietary fabrics" },
  { key: "Fit Precision",       desc: "Accuracy and refinement of the cut across multiple fittings" },
  { key: "Heritage",            desc: "Depth of tailoring lineage and historical significance" },
  { key: "Value",               desc: "Construction quality relative to price — not an absolute affordability score" },
  { key: "Ease of Commission",  desc: "English-speaking staff, trunk shows, response time, and accessibility of the commissioning process" },
];

function RatingsLegend() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{ background: "none", border: "1px solid #ddd", borderRadius: "50%", width: "14px", height: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, color: "#aaa", fontFamily: F.mono, fontSize: "8px", lineHeight: 1 }}
        title="Rating dimensions explained"
      >?</button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 99 }} />
          <div style={{ position: "absolute", left: "18px", top: 0, zIndex: 100, background: "#fff", border: "1px solid #e8e4df", padding: "12px 14px", width: "240px", boxShadow: "0 4px 16px rgba(0,0,0,0.10)" }}>
            <div style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa", marginBottom: "10px" }}>Rating Dimensions</div>
            {RATING_LEGEND.map(({ key, desc }) => (
              <div key={key} style={{ marginBottom: "8px" }}>
                <div style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#333", marginBottom: "2px" }}>{key}</div>
                <div style={{ fontFamily: F.body, fontSize: "10px", lineHeight: 1.5, color: "#777" }}>{desc}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function RatingBar({ value, label }: { value: Rating; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
      <span style={{ fontFamily: F.mono, fontSize: "7px", letterSpacing: "0.08em", color: "#888", width: "88px", flexShrink: 0, textTransform: "uppercase" }}>{label}</span>
      <div style={{ flex: 1, display: "flex", gap: "2px" }}>
        {[1,2,3,4,5].map((pip) => (
          <div key={pip} style={{ flex: 1, height: "3px", backgroundColor: pip <= value ? "#c8a96e" : "#333" }} />
        ))}
      </div>
      <span style={{ fontFamily: F.mono, fontSize: "7px", color: "#666", width: "10px", textAlign: "right" }}>{value}</span>
    </div>
  );
}

function HouseCard({ house, onRemove }: { house: TailorHouse; onRemove: () => void }) {
  const tier = TIER_COLORS[house.tier];
  return (
    <div style={{ background: "#fff", border: "1px solid #e8e4df", position: "relative", minWidth: 0 }}>
      {/* Header */}
      <div style={{ background: "#111", padding: "20px 16px 16px", position: "relative" }}>
        <button
          onClick={onRemove}
          style={{ position: "absolute", top: "10px", right: "10px", background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer", padding: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}
          title="Remove from comparison"
        >
          <X size={12} color="#888" />
        </button>
        <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.15em", color: "#666", textTransform: "uppercase", marginBottom: "6px" }}>
          {house.city} · Est. {house.founded}
        </div>
        <div style={{ fontFamily: F.display, fontSize: "22px", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "#fff", lineHeight: 1.1, marginBottom: "10px" }}>
          {house.name}
        </div>
        <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 8px", border: `1px solid ${tier.border}`, color: tier.text, background: "transparent" }}>
          {house.tier}
        </span>
      </div>

      {/* Ratings */}
      <div style={{ padding: "16px", borderBottom: "1px solid #f0ece8" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
          <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa" }}>Ratings</span>
          <RatingsLegend />
        </div>
        <RatingBar value={house.ratings.houseStyle} label="House Style" />
        <RatingBar value={house.ratings.craftsmanship} label="Craftsmanship" />
        <RatingBar value={house.ratings.clothSelection} label="Cloth Selection" />
        <RatingBar value={house.ratings.fitPrecision} label="Fit Precision" />
        <RatingBar value={house.ratings.heritage} label="Heritage" />
        <RatingBar value={house.ratings.value} label="Value" />
        <RatingBar value={house.ratings.easeOfCommission} label="Ease of Commission" />
      </div>

      {/* House style */}
      <div style={{ padding: "16px", borderBottom: "1px solid #f0ece8" }}>
        <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", marginBottom: "8px" }}>Editorial Assessment</div>
        <p style={{ fontFamily: F.body, fontSize: "12px", lineHeight: 1.7, color: "#444", margin: 0 }}>{house.houseStyle}</p>
      </div>

      {/* Strengths */}
      <div style={{ padding: "16px", borderBottom: "1px solid #f0ece8" }}>
        <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", marginBottom: "8px" }}>Key Strengths</div>
        {house.strengths.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "6px" }}>
            <span style={{ fontFamily: F.mono, fontSize: "9px", color: "#c8a96e", flexShrink: 0, marginTop: "1px" }}>—</span>
            <span style={{ fontFamily: F.body, fontSize: "12px", color: "#444", lineHeight: 1.5 }}>{s}</span>
          </div>
        ))}
      </div>

      {/* Specs table */}
      <div style={{ padding: "16px" }}>
        <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", marginBottom: "12px" }}>Specifications</div>
        {COMPARE_ROWS.map(row => (
          <div key={row.key} style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "12px", paddingBottom: "12px", borderBottom: "1px solid #f5f2ef" }}>
            <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa" }}>{row.label}</span>
            <span style={{ fontFamily: F.body, fontSize: "12px", color: "#333", lineHeight: 1.5 }}>
              {row.key === "clothSources"
                ? (house[row.key as keyof TailorHouse] as string[]).join(", ")
                : row.key === "founded"
                ? `Est. ${house[row.key as keyof TailorHouse]}`
                : String(house[row.key as keyof TailorHouse])}
            </span>
          </div>
        ))}
        <a
          href={house.website}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase",
            color: "#666", textDecoration: "none", borderBottom: "1px solid #ddd", paddingBottom: "2px",
            transition: "color 0.15s, border-color 0.15s",
          }}
        >
          Visit {house.name} <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
}

export default function TailorCompare() {
  useSEO({
    title: "Compare the World's Best Tailoring Houses | Tailors.hk",
    description: "Compare up to 5 of the world's finest bespoke and MTM tailoring houses side-by-side — Huntsman, Kiton, Brioni, Cifonelli, Magnus & Novus and more. Tradition, price, construction, lead time, and cloth selection.",
    canonical: "https://tailors.hk/compare",
    keywords: "bespoke tailor comparison, Huntsman vs Kiton, best bespoke tailor world, Savile Row vs Neapolitan, tailoring houses comparison",
    schema: [
      SCHEMAS.organization(),
      SCHEMAS.breadcrumb([
        { name: "Home", url: "/" },
        { name: "Compare Tailoring Houses", url: "/compare" },
      ]),
      SCHEMAS.itemList(
        HOUSES.map(h => ({
          name: h.name,
          url: "/compare",
          description: `${h.tradition} tailoring house — ${h.city}. ${h.houseStyle.slice(0, 120)}`
        }))
      ),
      {
        "@context": "https://schema.org",
        "@type": "Dataset",
        "name": "World's Best Tailoring Houses — Comparison Index",
        "description": "A structured comparison of the world's finest bespoke and made-to-measure tailoring houses across tradition, construction, price, lead time, cloth selection, and editorial assessment.",
        "url": "https://tailors.hk/compare",
        "creator": { "@type": "Organization", "@id": "https://tailors.hk/#organization" },
        "keywords": "bespoke tailoring, Savile Row, Neapolitan tailoring, Hong Kong bespoke, tailoring house comparison",
        "variableMeasured": ["House Style", "Craftsmanship", "Cloth Selection", "Fit Precision", "Heritage", "Value", "Ease of Commission"]
      }
    ],
  });

  const [selected, setSelected] = useState<TailorHouse[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [filterTradition, setFilterTradition] = useState<string>("all");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const traditions = useMemo(() => Array.from(new Set(HOUSES.map(h => h.tradition))).sort(), []);

  const filteredHouses = useMemo(() => {
    return HOUSES.filter(h => {
      const matchesSearch = searchQuery.trim() === "" ||
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.tradition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTradition = filterTradition === "all" || h.tradition === filterTradition || (h.tags && h.tags.includes(filterTradition));
      const notSelected = !selected.find(s => s.id === h.id);
      return matchesSearch && matchesTradition && notSelected;
    });
  }, [searchQuery, filterTradition, selected]);

  const addHouse = (house: TailorHouse) => {
    if (selected.length >= MAX_COMPARE) return;
    setSelected(prev => [...prev, house]);
    setShowSearch(false);
    setSearchQuery("");
  };

  const removeHouse = (id: string) => {
    setSelected(prev => prev.filter(h => h.id !== id));
  };

  return (
    <div style={{ background: "#faf9f7", minHeight: "100vh" }}>
      <Navigation />

      {/* ── HERO ── */}
      <section style={{ position: "relative", background: "#111", color: "#fff", paddingTop: "clamp(80px, 12vw, 120px)", paddingBottom: "clamp(48px, 6vw, 56px)", overflow: "hidden" }}>
        <img
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/shLtnQaQLmeQtCVt.png"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", opacity: 0.3, pointerEvents: "none" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: "20px" }}>
            <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.15em", color: "#555", textTransform: "uppercase" }}>
              § 04 · TAILORING HOUSE COMPARISON
            </span>
            <div style={{ width: "32px", height: "1px", background: "#444", marginTop: "6px" }} />
          </div>
          <h1 style={{ fontFamily: F.display, fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#fff", lineHeight: 1.05, marginBottom: "20px" }}>
            Compare the<br />World's Finest<br />Tailoring Houses
          </h1>
          <p style={{ fontFamily: F.body, fontSize: "16px", lineHeight: 1.75, color: "#888", maxWidth: "520px", margin: 0 }}>
            Select up to {MAX_COMPARE} houses to compare side-by-side across tradition, construction, price, lead time, cloth selection, and editorial assessment.
          </p>
        </div>
      </section>

      {/* ── SELECTOR ── */}
      <section style={{ background: "#fff", borderBottom: "1px solid #e8e4df", padding: "20px 0", position: "sticky", top: "64px", zIndex: 40 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            {/* Selected pills */}
            {selected.map(h => (
              <div key={h.id} style={{ display: "flex", alignItems: "center", gap: "6px", background: "#111", padding: "6px 12px", border: "1px solid #333" }}>
                <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff" }}>{h.name}</span>
                <button onClick={() => removeHouse(h.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "0", display: "flex", alignItems: "center" }}>
                  <X size={10} color="#888" />
                </button>
              </div>
            ))}

            {/* Add button */}
            {selected.length < MAX_COMPARE && (
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setShowSearch(s => !s)}
                  style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase",
                    padding: "6px 12px", border: "1px dashed #bbb", background: "transparent",
                    color: "#666", cursor: "pointer", transition: "all 0.15s",
                  }}
                >
                  <Plus size={10} /> Add House ({selected.length}/{MAX_COMPARE})
                </button>

                {/* Search dropdown */}
                {showSearch && (
                  <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, width: "340px", background: "#fff", border: "1px solid #e0dbd5", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", zIndex: 100 }}>
                    <div style={{ padding: "12px", borderBottom: "1px solid #f0ece8" }}>
                      <input
                        autoFocus
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search by name, city, or tradition…"
                        style={{
                          width: "100%", padding: "8px 10px", border: "1px solid #e0dbd5",
                          fontFamily: F.mono, fontSize: "11px", color: "#333", background: "#faf9f7",
                          outline: "none", boxSizing: "border-box",
                        }}
                      />
                    </div>
                    {/* Tradition filter */}
                    <div style={{ padding: "8px 12px", borderBottom: "1px solid #f0ece8", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "nowrap", width: "max-content" }}>
                      {["all", "Savile Row", "Neapolitan", "Italian Bespoke", "Parisian", "Hong Kong Bespoke"].map(t => (
                        <button
                          key={t}
                          onClick={() => setFilterTradition(t)}
                          style={{
                            fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.06em", textTransform: "uppercase",
                            padding: "3px 8px", border: "1px solid",
                            borderColor: filterTradition === t ? "#111" : "#e0dbd5",
                            background: filterTradition === t ? "#111" : "transparent",
                            color: filterTradition === t ? "#fff" : "#666",
                            cursor: "pointer",
                          }}
                        >
                          {t === "all" ? "All" : t}
                        </button>
                      ))}
                    </div>
                    </div>
                    {/* House list */}
                    <div style={{ maxHeight: "280px", overflowY: "auto" }}>
                      {filteredHouses.length === 0 ? (
                        <div style={{ padding: "16px", fontFamily: F.mono, fontSize: "10px", color: "#aaa", textAlign: "center" }}>No houses found</div>
                      ) : filteredHouses.map(h => (
                        <button
                          key={h.id}
                          onClick={() => addHouse(h)}
                          style={{
                            width: "100%", padding: "12px 16px", border: "none", borderBottom: "1px solid #f5f2ef",
                            background: "transparent", cursor: "pointer", textAlign: "left",
                            transition: "background 0.1s",
                          }}
                          onMouseEnter={e => (e.currentTarget.style.background = "#faf9f7")}
                          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div>
                              <div style={{ fontFamily: F.display, fontSize: "14px", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "#111" }}>{h.name}</div>
                              <div style={{ fontFamily: F.mono, fontSize: "9px", color: "#888", marginTop: "2px" }}>{h.city} · {h.tradition}</div>
                            </div>
                            <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.08em", textTransform: "uppercase", padding: "2px 6px", border: `1px solid ${TIER_COLORS[h.tier].border}`, color: TIER_COLORS[h.tier].text, flexShrink: 0, marginLeft: "8px" }}>
                              {h.tier}
                            </span>
                          </div>
                          <div style={{ fontFamily: F.mono, fontSize: "9px", color: "#aaa", marginTop: "4px" }}>{h.priceRange}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {selected.length > 0 && (
              <button
                onClick={() => setSelected([])}
                style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 12px", border: "1px solid #e0dbd5", background: "transparent", color: "#888", cursor: "pointer", marginLeft: "auto" }}
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── COMPARISON GRID ── */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px 24px" }}>
        {selected.length === 0 ? (
          /* Empty state */
          <div style={{ textAlign: "center", padding: "80px 24px" }}>
            <div style={{ fontFamily: F.mono, fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#bbb", marginBottom: "16px" }}>No houses selected</div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 700, textTransform: "uppercase", color: "#222", marginBottom: "16px" }}>Begin Your Comparison</h2>
            <p style={{ fontFamily: F.body, fontSize: "15px", color: "#666", lineHeight: 1.7, maxWidth: "480px", margin: "0 auto 32px" }}>
              Select up to {MAX_COMPARE} tailoring houses using the search above to compare their traditions, construction methods, pricing, and editorial assessments side-by-side.
            </p>
            {/* Quick-start suggestions */}
            <div style={{ marginBottom: "12px" }}>
              <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa", marginBottom: "12px" }}>Suggested comparisons</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
                {[
                  { label: "Savile Row Classics", ids: ["huntsman", "anderson-sheppard", "norton-sons", "henry-poole"] },
                  { label: "Neapolitan Masters", ids: ["kiton", "rubinacci", "cesare-attolini"] },
                  { label: "Hong Kong Houses", ids: ["ww-chan", "dorsia", "magnus-novus"] },
                  { label: "World vs Hong Kong", ids: ["huntsman", "kiton", "brioni", "magnus-novus"] },
                  { label: "Value Comparison", ids: ["magnus-novus", "dorsia", "cesare-attolini", "b-and-tailor"] },
                ].map(preset => (
                  <button
                    key={preset.label}
                    onClick={() => setSelected(preset.ids.map(id => HOUSES.find(h => h.id === id)!).filter(Boolean))}
                    style={{
                      fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase",
                      padding: "8px 16px", border: "1px solid #e0dbd5", background: "#fff",
                      color: "#555", cursor: "pointer", transition: "all 0.15s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#111"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#555"; e.currentTarget.style.borderColor = "#e0dbd5"; }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", margin: "0 -24px", padding: "0 24px 16px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${selected.length}, minmax(260px, 1fr))`,
                gap: "16px",
                alignItems: "start",
                minWidth: selected.length > 1 ? `${selected.length * 276}px` : "auto",
              }}
            >
              {selected.map(house => (
                <HouseCard key={house.id} house={house} onRemove={() => removeHouse(house.id)} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── EDITORIAL NOTE ── */}
      <section style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ borderTop: "1px solid #e8e4df", paddingTop: "40px" }}>
          <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", marginBottom: "16px" }}>Editorial Note</div>
          <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.8, color: "#666" }}>
            Prices shown are indicative ranges for a two-piece suit in standard cloth. Final prices depend on cloth selection, complexity of cut, and number of fittings. Lead times are approximate and subject to each house's current order book. Ratings reflect editorial assessment based on documented standards, client accounts, and industry reputation — not commercial relationships. Tailors.hk has no commercial affiliation with any house listed.
          </p>
          <p style={{ fontFamily: F.body, fontSize: "12px", lineHeight: 1.8, color: "#aaa", marginTop: "16px" }}>
            <strong style={{ color: "#888" }}>About this tool:</strong> This comparison covers {HOUSES.length} houses spanning Savile Row, Neapolitan, Italian Bespoke, Parisian, and Hong Kong Bespoke traditions. Each house is assessed across seven scored dimensions — House Style, Craftsmanship, Cloth Selection, Fit Precision, Heritage, Value, and Ease of Commission — based on documented standards, client accounts, and industry reputation.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
