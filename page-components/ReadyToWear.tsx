"use client";
import { useSEO, SCHEMAS } from "@/hooks/useSEO";
/*
 * TAILOR.HK — READY TO WEAR
 * Design: Technical editorial — Barlow Condensed + JetBrains Mono
 * Features: Wishlist, Comparison (up to 4), Build-a-Look, Bespoke estimates, Fabric tags, Editorial verdicts
 */
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { Link } from "@/lib/wouter-shim";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
// SEO handled by generateMetadata in page.tsx
import { ExternalLink, X, Bookmark, BookmarkCheck, BarChart2, Layers, Share2, Check, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body:    '"Barlow", Arial, sans-serif',
  mono:    '"JetBrains Mono", "Courier New", monospace',
};

// ─── REGION DETECTION ────────────────────────────────────────────────────────

type Region = 'APAC' | 'US' | 'UK' | 'AU';

const REGION_CONFIG: Record<Region, { locale: string; tag: string; label: string; currency: string; symbol: string; fromHKD: (hkd: number) => number }> = {
  APAC: { locale: 'en-hk', tag: '1110luYp7', label: 'Asia Pacific', currency: 'HKD', symbol: 'HK$', fromHKD: (hkd) => hkd },
  US:   { locale: 'en-us', tag: '1110luYpf', label: 'United States', currency: 'USD', symbol: '$',   fromHKD: (hkd) => Math.round(hkd / 7.8) },
  UK:   { locale: 'en-gb', tag: '1110luYpe', label: 'United Kingdom', currency: 'GBP', symbol: '£',  fromHKD: (hkd) => Math.round(hkd / 9.85) },
  AU:   { locale: 'en-au', tag: '1110luYp',  label: 'Australia',      currency: 'AUD', symbol: 'A$', fromHKD: (hkd) => Math.round(hkd / 5.05) },
};

function fmtPrice(hkd: number, region: Region): string {
  const cfg = REGION_CONFIG[region];
  const val = cfg.fromHKD(hkd);
  return `${cfg.symbol}${val.toLocaleString()}`;
}

// Timezone → Region mapping (covers major timezones)
const TZ_TO_REGION: Record<string, Region> = {
  // US
  'America/New_York': 'US', 'America/Chicago': 'US', 'America/Denver': 'US',
  'America/Los_Angeles': 'US', 'America/Phoenix': 'US', 'America/Anchorage': 'US',
  'America/Honolulu': 'US', 'America/Detroit': 'US', 'America/Indiana/Indianapolis': 'US',
  // UK/IE
  'Europe/London': 'UK', 'Europe/Dublin': 'UK',
  // AU
  'Australia/Sydney': 'AU', 'Australia/Melbourne': 'AU', 'Australia/Brisbane': 'AU',
  'Australia/Perth': 'AU', 'Australia/Adelaide': 'AU', 'Australia/Darwin': 'AU',
  // APAC
  'Asia/Hong_Kong': 'APAC', 'Asia/Singapore': 'APAC', 'Asia/Tokyo': 'APAC',
  'Asia/Shanghai': 'APAC', 'Asia/Taipei': 'APAC', 'Asia/Seoul': 'APAC',
  'Asia/Kuala_Lumpur': 'APAC', 'Asia/Bangkok': 'APAC', 'Asia/Jakarta': 'APAC',
  'Asia/Manila': 'APAC', 'Asia/Dubai': 'APAC', 'Asia/Kolkata': 'APAC',
};

function detectRegion(): Region {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (TZ_TO_REGION[tz]) return TZ_TO_REGION[tz];
    const lang = navigator.language || '';
    if (lang.startsWith('en-AU')) return 'AU';
    if (lang.startsWith('en-GB') || lang.startsWith('en-IE')) return 'UK';
    if (lang.startsWith('en-US')) return 'US';
    const offset = -new Date().getTimezoneOffset();
    if (offset >= 480 && offset <= 660) return 'APAC';
    if (offset === 0 || offset === 60) return 'UK';
    if (offset <= -300 && offset >= -600) return 'US';
  } catch { /* ignore */ }
  return 'APAC';
}

function rewriteUrl(url: string, region: Region): string {
  const cfg = REGION_CONFIG[region];
  const localeSwapped = url.replace(/\/en-[a-z]{2}\//i, `/${cfg.locale}/`);
  const separator = localeSwapped.includes('?') ? '&' : '?';
  return `${localeSwapped}${separator}affil=${cfg.tag}`;
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const BLAZERS = [
  { id: '01', brand: 'KITON', name: 'Houndstooth Wool, Cashmere, Silk and Linen-Blend Blazer', priceGBP: 6410, priceHKD: 67946, url: 'https://www.mrporter.com/en-hk/mens/product/kiton/clothing/single-breasted-blazers/houndstooth-wool-cashmere-silk-and-linen-blend-blazer/46376663163007049', img: 'https://www.mrporter.com/variants/images/46376663163007049/in/w764_q60.jpg' },
  { id: '02', brand: 'TOM FORD', name: 'Double-Breasted Silk-Gabardine Blazer', priceGBP: 5945, priceHKD: 63017, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/double-breasted-blazers/double-breasted-silk-gabardine-blazer/46376663163003044', img: 'https://www.mrporter.com/variants/images/46376663163003044/in/w764_q60.jpg' },
  { id: '03', brand: 'TOM FORD', name: 'Double-Breasted Silk-Gabardine Blazer', priceGBP: 5945, priceHKD: 63017, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/double-breasted-blazers/double-breasted-silk-gabardine-blazer/46376663163003048', img: 'https://www.mrporter.com/variants/images/46376663163003048/in/w764_q60.jpg' },
  { id: '04', brand: 'TOM FORD', name: 'Double-Breasted Silk Blazer', priceGBP: 5380, priceHKD: 57028, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/double-breasted-blazers/double-breasted-silk-blazer/46376663163003047', img: 'https://www.mrporter.com/variants/images/46376663163003047/in/w764_q60.jpg' },
  { id: '05', brand: 'TOM FORD', name: 'Double-Breasted Cashmere-Blend Blazer', priceGBP: 5360, priceHKD: 56816, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/double-breasted-blazers/double-breasted-cashmere-blend-blazer/46376663162903421', img: 'https://www.mrporter.com/variants/images/46376663162903421/in/w764_q60.jpg' },
  { id: '06', brand: 'TOM FORD', name: 'Double-Breasted Silk-Hopsack Blazer', priceGBP: 5350, priceHKD: 56710, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/double-breasted-blazers/double-breasted-silk-hopsack-blazer/46376663163003028', img: 'https://www.mrporter.com/variants/images/46376663163003028/in/w764_q60.jpg' },
  { id: '07', brand: 'TOM FORD', name: 'Double-Breasted Polka-Dot Mulberry Silk-Duchesse Satin Tuxedo Jacket', priceGBP: 5340, priceHKD: 56604, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/tuxedo-jackets/double-breasted-polka-dot-mulberry-silk-duchesse-satin-tuxedo-jacket/46376663162903411', img: 'https://www.mrporter.com/variants/images/46376663162903411/in/w764_q60.jpg' },
  { id: '08', brand: 'TOM FORD', name: 'Dyllan Double-Breasted Striped Metallic Wool and Silk-Blend Suit Jacket', priceGBP: 5295, priceHKD: 56127, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/suit-jackets/dyllan-double-breasted-striped-metallic-wool-and-silk-blend-suit-jacket/46376663162880942', img: 'https://www.mrporter.com/variants/images/46376663162880942/in/w764_q60.jpg' },
  { id: '09', brand: 'TOM FORD', name: 'Double-Breasted Sequined Wool-Blend Suit Jacket', priceGBP: 5295, priceHKD: 56127, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/suit-jackets/double-breasted-sequined-wool-blend-suit-jacket/46376663162903397', img: 'https://www.mrporter.com/variants/images/46376663162903397/in/w764_q60.jpg' },
  { id: '10', brand: 'TOM FORD', name: 'Double-Breasted Sequinned Wool-Blend Suit Jacket', priceGBP: 5295, priceHKD: 56127, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/suit-jackets/double-breasted-sequinned-wool-blend-suit-jacket/46376663162903430', img: 'https://www.mrporter.com/variants/images/46376663162903430/in/w764_q60.jpg' },
  { id: '11', brand: 'ZEGNA', name: 'Layered Cashmere Blazer', priceGBP: 5240, priceHKD: 55544, url: 'https://www.mrporter.com/en-hk/mens/product/zegna/clothing/single-breasted-blazers/layered-cashmere-blazer/46376663162903576', img: 'https://www.mrporter.com/variants/images/46376663162903576/in/w764_q60.jpg' },
  { id: '12', brand: 'LORO PIANA', name: 'Paolo Double-Faced Baby Cashmere Blazer', priceGBP: 5080, priceHKD: 53848, url: 'https://www.mrporter.com/en-hk/mens/product/loro-piana/clothing/single-breasted-blazers/paolo-double-faced-baby-cashmere-blazer/46376663162903825', img: 'https://www.mrporter.com/variants/images/46376663162903825/in/w764_q60.jpg' },
  { id: '13', brand: 'LORO PIANA', name: 'Paolo Double-Faced Baby Cashmere Blazer', priceGBP: 5080, priceHKD: 53848, url: 'https://www.mrporter.com/en-hk/mens/product/loro-piana/clothing/single-breasted-blazers/paolo-double-faced-baby-cashmere-blazer/46376663162903864', img: 'https://www.mrporter.com/variants/images/46376663162903864/in/w764_q60.jpg' },
  { id: '14', brand: 'TOM FORD', name: 'Shelton Brushed Wool and Cashmere-Blend Blazer', priceGBP: 5035, priceHKD: 53371, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/suit-jackets/shelton-brushed-wool-and-cashmere-blend-blazer/46376663162881062', img: 'https://www.mrporter.com/variants/images/46376663162881062/in/w764_q60.jpg' },
  { id: '15', brand: 'GABRIELA HEARST', name: 'Irving Suede-Corduroy Blazer', priceGBP: 4890, priceHKD: 51834, url: 'https://www.mrporter.com/en-hk/mens/product/gabriela-hearst/clothing/single-breasted-blazers/irving-suede-corduroy-blazer/46376663162996383', img: 'https://www.mrporter.com/variants/images/46376663162996383/in/w764_q60.jpg' },
  { id: '16', brand: 'BRIONI', name: 'Cashmere-Gauze Blazer', priceGBP: 4840, priceHKD: 51304, url: 'https://www.mrporter.com/en-hk/mens/product/brioni/clothing/single-breasted-blazers/cashmere-gauze-blazer/46376663162851112', img: 'https://www.mrporter.com/variants/images/46376663162851112/in/w764_q60.jpg' },
  { id: '17', brand: 'BRUNELLO CUCINELLI', name: 'Double-Breasted Silk and Linen-Blend Twill Blazer', priceGBP: 4825, priceHKD: 51145, url: 'https://www.mrporter.com/en-hk/mens/product/brunello-cucinelli/clothing/double-breasted-blazers/double-breasted-silk-and-linen-blend-twill-blazer/46376663163115418', img: 'https://www.mrporter.com/variants/images/46376663163115418/in/w764_q60.jpg' },
  { id: '18', brand: 'RALPH LAUREN PURPLE LABEL', name: 'Herringbone Wool Jacket', priceGBP: 4790, priceHKD: 50774, url: 'https://www.mrporter.com/en-hk/mens/product/ralph-lauren-purple-label/clothing/single-breasted-blazers/herringbone-wool-jacket/46376663162996697', img: 'https://www.mrporter.com/variants/images/46376663162996697/in/w764_q60.jpg' },
  { id: '19', brand: 'LORO PIANA', name: 'Rivoli Storm System® Cashmere-Blend Blazer', priceGBP: 4750, priceHKD: 50350, url: 'https://www.mrporter.com/en-hk/mens/product/loro-piana/clothing/single-breasted-blazers/rivoli-storm-systemr-cashmere-blend-blazer/1647597293237953', img: 'https://www.mrporter.com/variants/images/1647597293237953/in/w764_q60.jpg' },
  { id: '20', brand: 'BRUNELLO CUCINELLI', name: 'Double-Breasted Puppytooth Cashmere and Silk-Blend Suit Jacket', priceGBP: 4750, priceHKD: 50350, url: 'https://www.mrporter.com/en-hk/mens/product/brunello-cucinelli/clothing/suit-jackets/double-breasted-puppytooth-cashmere-and-silk-blend-suit-jacket/46376663162997746', img: 'https://www.mrporter.com/variants/images/46376663162997746/in/w764_q60.jpg' },
  { id: '21', brand: 'BRUNELLO CUCINELLI', name: 'Prince of Wales Checked Linen, Silk and Wool-Blend Tweed Blazer', priceGBP: 4720, priceHKD: 50032, url: 'https://www.mrporter.com/en-hk/mens/product/brunello-cucinelli/clothing/double-breasted-blazers/prince-of-wales-checked-linen-silk-and-wool-blend-tweed-blazer/46376663163018843', img: 'https://www.mrporter.com/variants/images/46376663163018843/in/w764_q60.jpg' },
  { id: '22', brand: 'TOM FORD', name: 'Double-Breasted Cotton and Silk-Blend Satin Tuxedo Jacket', priceGBP: 4580, priceHKD: 48548, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/tuxedo-jackets/double-breasted-cotton-and-silk-blend-satin-tuxedo-jacket/46376663162903405', img: 'https://www.mrporter.com/variants/images/46376663162903405/in/w764_q60.jpg' },
  { id: '23', brand: 'LORO PIANA', name: 'Umberto Unstructured Cashmere Blazer', priceGBP: 4390, priceHKD: 46534, url: 'https://www.mrporter.com/en-hk/mens/product/loro-piana/clothing/single-breasted-blazers/umberto-unstructured-cashmere-blazer/1647597352030263', img: 'https://www.mrporter.com/variants/images/1647597352030263/in/w764_q60.jpg' },
  { id: '24', brand: 'BRUNELLO CUCINELLI', name: 'Double-Breasted Checked Linen-Blend Suit Jacket', priceGBP: 4265, priceHKD: 45209, url: 'https://www.mrporter.com/en-hk/mens/product/brunello-cucinelli/clothing/suit-jackets/double-breasted-checked-linen-blend-suit-jacket/46376663163118554', img: 'https://www.mrporter.com/variants/images/46376663163118554/in/w764_q60.jpg' },
  { id: '25', brand: 'SAINT LAURENT', name: 'Double-Breasted Silk Blazer', priceGBP: 4260, priceHKD: 45156, url: 'https://www.mrporter.com/en-hk/mens/product/saint-laurent/clothing/double-breasted-blazers/double-breasted-silk-blazer/46376663163025190', img: 'https://www.mrporter.com/variants/images/46376663163025190/in/w764_q60.jpg' },
  { id: '26', brand: 'TOM FORD', name: 'O\'Connor Silk-Twill Suit Jacket', priceGBP: 4175, priceHKD: 44255, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/suit-jackets/o-connor-silk-twill-suit-jacket/1647597354467877', img: 'https://www.mrporter.com/variants/images/1647597354467877/in/w764_q60.jpg' },
  { id: '27', brand: 'TOM FORD', name: 'Dyllan Double-Breasted Silk Suit Jacket', priceGBP: 4165, priceHKD: 44149, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/suit-jackets/dyllan-double-breasted-silk-suit-jacket/1647597351555282', img: 'https://www.mrporter.com/variants/images/1647597351555282/in/w764_q60.jpg' },
  { id: '28', brand: 'TOM FORD', name: 'Shelton Wool-Blend Blazer', priceGBP: 4120, priceHKD: 43672, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/single-breasted-blazers/shelton-wool-blend-blazer/46376663163003179', img: 'https://www.mrporter.com/variants/images/46376663163003179/in/w764_q60.jpg' },
  { id: '29', brand: 'TOM FORD', name: 'Dyllan Wool, Silk and Linen-Blend Blazer', priceGBP: 4120, priceHKD: 43672, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/single-breasted-blazers/dyllan-wool-silk-and-linen-blend-blazer/46376663163003200', img: 'https://www.mrporter.com/variants/images/46376663163003200/in/w764_q60.jpg' },
  { id: '30', brand: 'ZEGNA', name: 'Wool and Cashmere-Blend Suit Jacket', priceGBP: 4105, priceHKD: 43513, url: 'https://www.mrporter.com/en-hk/mens/product/zegna/clothing/suit-jackets/wool-and-cashmere-blend-suit-jacket/46376663162934747', img: 'https://www.mrporter.com/variants/images/46376663162934747/in/w764_q60.jpg' },
  { id: '31', brand: 'TOM FORD', name: 'Hopsack Double-Breasted Wool Suit Jacket', priceGBP: 4085, priceHKD: 43301, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/suit-jackets/hopsack-double-breasted-wool-suit-jacket/46376663162903429', img: 'https://www.mrporter.com/variants/images/46376663162903429/in/w764_q60.jpg' },
  { id: '32', brand: 'TOM FORD', name: 'Dyllan Double-Breasted Striped Wool-Twill Suit Jacket', priceGBP: 4005, priceHKD: 42453, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/suit-jackets/dyllan-double-breasted-striped-wool-twill-suit-jacket/46376663162880934', img: 'https://www.mrporter.com/variants/images/46376663162880934/in/w764_q60.jpg' },
  { id: '33', brand: 'ZEGNA', name: 'Double-Breasted Linen, Wool and Silk-Blend Blazer', priceGBP: 3915, priceHKD: 41499, url: 'https://www.mrporter.com/en-hk/mens/product/zegna/clothing/double-breasted-blazers/double-breasted-linen-wool-and-silk-blend-blazer/46376663162999304', img: 'https://www.mrporter.com/variants/images/46376663162999304/in/w764_q60.jpg' },
  { id: '34', brand: 'MCQUEEN', name: 'Slim-Fit Crystal-Embellished Wool Blazer', priceGBP: 3904, priceHKD: 41382, url: 'https://www.mrporter.com/en-hk/mens/product/mcqueen/clothing/single-breasted-blazers/slim-fit-crystal-embellished-wool-blazer/46376663162858257', img: 'https://www.mrporter.com/variants/images/46376663162858257/in/w764_q60.jpg' },
  { id: '35', brand: 'TOM FORD', name: 'Slim-Fit Double-Breasted Wool-Twill Blazer', priceGBP: 3765, priceHKD: 39909, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/suit-jackets/slim-fit-double-breasted-wool-twill-blazer/46376663163003034', img: 'https://www.mrporter.com/variants/images/46376663163003034/in/w764_q60.jpg' },
  { id: '36', brand: 'TOM FORD', name: 'Shelton Slim-Fit Prince of Wales Checked Wool and Silk-Blend Suit Jacket', priceGBP: 3755, priceHKD: 39803, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/suit-jackets/shelton-slim-fit-prince-of-wales-checked-wool-and-silk-blend-suit-jacket/46376663162880961', img: 'https://www.mrporter.com/variants/images/46376663162880961/in/w764_q60.jpg' },
  { id: '37', brand: 'TOM FORD', name: 'Shelton Grain de Poudre Wool and Mohair-Blend Suit Jacket', priceGBP: 3755, priceHKD: 39803, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/suit-jackets/shelton-grain-de-poudre-wool-and-mohair-blend-suit-jacket/46376663162881058', img: 'https://www.mrporter.com/variants/images/46376663162881058/in/w764_q60.jpg' },
  { id: '38', brand: 'TOM FORD', name: 'Double-Breasted Birdseye Wool Suit Jacket', priceGBP: 3755, priceHKD: 39803, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/suit-jackets/double-breasted-birdseye-wool-suit-jacket/46376663162903383', img: 'https://www.mrporter.com/variants/images/46376663162903383/in/w764_q60.jpg' },
  { id: '39', brand: 'BRUNELLO CUCINELLI', name: 'Herringbone Wool and Cashmere-Blend Blazer', priceGBP: 3710, priceHKD: 39326, url: 'https://www.mrporter.com/en-hk/mens/product/brunello-cucinelli/clothing/single-breasted-blazers/herringbone-wool-and-cashmere-blend-blazer/46376663162997736', img: 'https://www.mrporter.com/variants/images/46376663162997736/in/w764_q60.jpg' },
  { id: '40', brand: 'BRUNELLO CUCINELLI', name: 'Herringbone Wool and Cashmere-Blend Blazer', priceGBP: 3685, priceHKD: 39061, url: 'https://www.mrporter.com/en-hk/mens/product/brunello-cucinelli/clothing/single-breasted-blazers/herringbone-wool-and-cashmere-blend-blazer/46376663162902634', img: 'https://www.mrporter.com/variants/images/46376663162902634/in/w764_q60.jpg' },
  { id: '41', brand: 'TOM FORD', name: 'Shelton Wool-Herringbone Blazer', priceGBP: 3635, priceHKD: 38531, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/single-breasted-blazers/shelton-wool-herringbone-blazer/46376663162880959', img: 'https://www.mrporter.com/variants/images/46376663162880959/in/w764_q60.jpg' },
  { id: '42', brand: 'BRUNELLO CUCINELLI', name: 'Double-Breasted Silk and Linen-Blend Blazer', priceGBP: 3625, priceHKD: 38425, url: 'https://www.mrporter.com/en-hk/mens/product/brunello-cucinelli/clothing/double-breasted-blazers/double-breasted-silk-and-linen-blend-blazer/46376663163000481', img: 'https://www.mrporter.com/variants/images/46376663163000481/in/w764_q60.jpg' },
  { id: '43', brand: 'BRUNELLO CUCINELLI', name: 'Double-Breasted Silk and Linen-Blend Blazer', priceGBP: 3625, priceHKD: 38425, url: 'https://www.mrporter.com/en-hk/mens/product/brunello-cucinelli/clothing/double-breasted-blazers/double-breasted-silk-and-linen-blend-blazer/46376663163000475', img: 'https://www.mrporter.com/variants/images/46376663163000475/in/w764_q60.jpg' },
  { id: '44', brand: 'LORO PIANA', name: 'Spagna Nehru-Collar Unstructured Cashmere-Blend Jersey Suit Jacket', priceGBP: 3555, priceHKD: 37683, url: 'https://www.mrporter.com/en-hk/mens/product/loro-piana/clothing/suit-jackets/spagna-nehru-collar-unstructured-cashmere-blend-jersey-suit-jacket/1647597355403658', img: 'https://www.mrporter.com/variants/images/1647597355403658/in/w764_q60.jpg' },
  { id: '45', brand: 'TOM FORD', name: 'Dyllan Slim-Fit Pinstriped Wool-Twill Suit Jacket', priceGBP: 3535, priceHKD: 37471, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/suit-jackets/dyllan-slim-fit-pinstriped-wool-twill-suit-jacket/46376663162880995', img: 'https://www.mrporter.com/variants/images/46376663162880995/in/w764_q60.jpg' },
  { id: '46', brand: 'TOM FORD', name: 'Stretch-Wool Flannel Suit Jacket', priceGBP: 3480, priceHKD: 36888, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/suit-jackets/stretch-wool-flannel-suit-jacket/46376663162880951', img: 'https://www.mrporter.com/variants/images/46376663162880951/in/w764_q60.jpg' },
  { id: '47', brand: 'TOM FORD', name: 'Checked Wool Suit Jacket', priceGBP: 3480, priceHKD: 36888, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/suit-jackets/checked-wool-suit-jacket/46376663162880940', img: 'https://www.mrporter.com/variants/images/46376663162880940/in/w764_q60.jpg' },
  { id: '48', brand: 'TOM FORD', name: 'Houndstooth Wool Blazer', priceGBP: 3460, priceHKD: 36676, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/single-breasted-blazers/houndstooth-wool-blazer/46376663162880909', img: 'https://www.mrporter.com/variants/images/46376663162880909/in/w764_q60.jpg' },
  { id: '49', brand: 'THE ROW', name: 'Poe Wool Blazer', priceGBP: 3440, priceHKD: 36464, url: 'https://www.mrporter.com/en-hk/mens/product/the-row/clothing/single-breasted-blazers/poe-wool-blazer/46376663162960175', img: 'https://www.mrporter.com/variants/images/46376663162960175/in/w764_q60.jpg' },
  { id: '50', brand: 'ZEGNA', name: 'Houndstooth Silk and Cashmere-Blend Blazer', priceGBP: 3405, priceHKD: 36093, url: 'https://www.mrporter.com/en-hk/mens/product/zegna/clothing/single-breasted-blazers/houndstooth-silk-and-cashmere-blend-blazer/46376663162903530', img: 'https://www.mrporter.com/variants/images/46376663162903530/in/w764_q60.jpg' },
  { id: '51', brand: 'TOM FORD', name: 'Dyllan Houndstooth Wool-Blend Suit Jacket', priceGBP: 3335, priceHKD: 35351, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/suit-jackets/dyllan-houndstooth-wool-blend-suit-jacket/46376663162881059', img: 'https://www.mrporter.com/variants/images/46376663162881059/in/w764_q60.jpg' },
  { id: '52', brand: 'TOM FORD', name: 'Dyllan Super 130s Grain de Poudre Wool Suit Jacket', priceGBP: 3335, priceHKD: 35351, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/suit-jackets/dyllan-super-130s-grain-de-poudre-wool-suit-jacket/46376663162880932', img: 'https://www.mrporter.com/variants/images/46376663162880932/in/w764_q60.jpg' },
  { id: '53', brand: 'UMIT BENAN B+', name: 'Richard Double-Breasted Silk and Wool-Blend Blazer', priceGBP: 3320, priceHKD: 35192, url: 'https://www.mrporter.com/en-hk/mens/product/umit-benan-bplus/clothing/double-breasted-blazers/richard-double-breasted-silk-and-wool-blend-blazer/46376663163004111', img: 'https://www.mrporter.com/variants/images/46376663163004111/in/w764_q60.jpg' },
  { id: '54', brand: 'LORO PIANA', name: 'Unstructured Jersey Novalis Blazer', priceGBP: 3260, priceHKD: 34556, url: 'https://www.mrporter.com/en-hk/mens/product/loro-piana/clothing/single-breasted-blazers/unstructured-jersey-novalis-blazer/46376663162903870', img: 'https://www.mrporter.com/variants/images/46376663162903870/in/w764_q60.jpg' },
  { id: '55', brand: 'UMIT BENAN', name: 'Norman Flecked Cashmere and Silk-Blend Blazer', priceGBP: 3250, priceHKD: 34450, url: 'https://www.mrporter.com/en-hk/mens/product/umit-benan/clothing/single-breasted-blazers/norman-flecked-cashmere-and-silk-blend-blazer/46376663163004092', img: 'https://www.mrporter.com/variants/images/46376663163004092/in/w764_q60.jpg' },
  { id: '56', brand: 'TOM FORD', name: 'Dyllan Double-Breasted Wool-Flannel Suit Jacket', priceGBP: 3230, priceHKD: 34238, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/suit-jackets/dyllan-double-breasted-wool-flannel-suit-jacket/46376663162881069', img: 'https://www.mrporter.com/variants/images/46376663162881069/in/w764_q60.jpg' },
  { id: '57', brand: 'ENFANTS RICHES DÉPRIMÉS', name: 'The Pierre Doubled-Breasted Pinstriped Virgin Wool-Twill Blazer', priceGBP: 3195, priceHKD: 33867, url: 'https://www.mrporter.com/en-hk/mens/product/enfants-riches-deprimes/clothing/single-breasted-blazers/the-pierre-doubled-breasted-pinstriped-virgin-wool-twill-blazer/46376663162916526', img: 'https://www.mrporter.com/variants/images/46376663162916526/in/w764_q60.jpg' },
  { id: '58', brand: 'TOM FORD', name: 'Shelton Super 120s Wool Blazer', priceGBP: 3180, priceHKD: 33708, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/suit-jackets/shelton-super-120s-wool-blazer/46376663163003158', img: 'https://www.mrporter.com/variants/images/46376663163003158/in/w764_q60.jpg' },
  { id: '59', brand: 'LORO PIANA', name: 'Linen Suit Jacket', priceGBP: 3175, priceHKD: 33655, url: 'https://www.mrporter.com/en-hk/mens/product/loro-piana/clothing/suit-jackets/linen-suit-jacket/46376663162830318', img: 'https://www.mrporter.com/variants/images/46376663162830318/in/w764_q60.jpg' },
  { id: '60', brand: 'LORO PIANA', name: 'Linen Suit Jacket', priceGBP: 3175, priceHKD: 33655, url: 'https://www.mrporter.com/en-hk/mens/product/loro-piana/clothing/suit-jackets/linen-suit-jacket/46376663162830345', img: 'https://www.mrporter.com/variants/images/46376663162830345/in/w764_q60.jpg' },
  { id: '61', brand: 'THE ROW', name: 'Mazzy Double-Breasted Wool Jacket', priceGBP: 3155, priceHKD: 33443, url: 'https://www.mrporter.com/en-hk/mens/product/the-row/clothing/double-breasted-blazers/mazzy-double-breasted-wool-jacket/46376663162960214', img: 'https://www.mrporter.com/variants/images/46376663162960214/in/w764_q60.jpg' },
  { id: '62', brand: 'ENFANTS RICHES DÉPRIMÉS', name: 'Austrian Alchemist Virgin Wool and Silk-Blend Blazer', priceGBP: 3135, priceHKD: 33231, url: 'https://www.mrporter.com/en-hk/mens/product/enfants-riches-deprimes/clothing/single-breasted-blazers/austrian-alchemist-virgin-wool-and-silk-blend-blazer/46376663162916512', img: 'https://www.mrporter.com/variants/images/46376663162916512/in/w764_q60.jpg' },
  { id: '63', brand: 'THE ROW', name: 'Sabriel Grain de Poudre Wool and Mohair-Blend Blazer', priceGBP: 3045, priceHKD: 32277, url: 'https://www.mrporter.com/en-hk/mens/product/the-row/clothing/single-breasted-blazers/sabriel-grain-de-poudre-wool-and-mohair-blend-blazer/46376663162895938', img: 'https://www.mrporter.com/variants/images/46376663162895938/in/w764_q60.jpg' },
  { id: '64', brand: 'TOM FORD', name: 'Wool-Blend Jacket', priceGBP: 2970, priceHKD: 31482, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/cardigans/wool-blend-jacket/46376663163003367', img: 'https://www.mrporter.com/variants/images/46376663163003367/in/w764_q60.jpg' },
  { id: '65', brand: 'RALPH LAUREN PURPLE LABEL', name: 'Double-Breasted Satin-Trimmed Linen-Canvas Blazer', priceGBP: 2959, priceHKD: 31365, url: 'https://www.mrporter.com/en-hk/mens/product/ralph-lauren-purple-label/clothing/double-breasted-blazers/double-breasted-satin-trimmed-linen-canvas-blazer/46376663162878544', img: 'https://www.mrporter.com/variants/images/46376663162878544/in/w764_q60.jpg' },
  { id: '66', brand: 'BRUNELLO CUCINELLI', name: 'Linen Blazer', priceGBP: 2950, priceHKD: 31270, url: 'https://www.mrporter.com/en-hk/mens/product/brunello-cucinelli/clothing/single-breasted-blazers/linen-blazer/46376663163018847', img: 'https://www.mrporter.com/variants/images/46376663163018847/in/w764_q60.jpg' },
  { id: '67', brand: 'LORO PIANA', name: 'Torino Linen Suit Jacket', priceGBP: 2940, priceHKD: 31164, url: 'https://www.mrporter.com/en-hk/mens/product/loro-piana/clothing/suit-jackets/torino-linen-suit-jacket/1647597340250022', img: 'https://www.mrporter.com/variants/images/1647597340250022/in/w764_q60.jpg' },
  { id: '68', brand: 'MCQUEEN', name: 'Double-Breasted Asymmetric Wool-Gabardine Blazer', priceGBP: 2933, priceHKD: 31089, url: 'https://www.mrporter.com/en-hk/mens/product/mcqueen/clothing/double-breasted-blazers/double-breasted-asymmetric-wool-gabardine-blazer/46376663162956449', img: 'https://www.mrporter.com/variants/images/46376663162956449/in/w764_q60.jpg' },
  { id: '69', brand: 'GUCCI', name: 'Slim-Fit Logo-Jacquard Woven Blazer', priceGBP: 2920, priceHKD: 30952, url: 'https://www.mrporter.com/en-hk/mens/product/gucci/clothing/single-breasted-blazers/slim-fit-logo-jacquard-woven-blazer/46376663163067718', img: 'https://www.mrporter.com/variants/images/46376663163067718/in/w764_q60.jpg' },
  { id: '70', brand: 'BRUNELLO CUCINELLI', name: 'Houndstooth Wool, Linen and Silk-Blend Blazer', priceGBP: 2915, priceHKD: 30899, url: 'https://www.mrporter.com/en-hk/mens/product/brunello-cucinelli/clothing/single-breasted-blazers/houndstooth-wool-linen-and-silk-blend-blazer/46376663163000365', img: 'https://www.mrporter.com/variants/images/46376663163000365/in/w764_q60.jpg' },
  { id: '71', brand: 'DUNHILL', name: 'Double-Breasted Cashmere Blazer', priceGBP: 2915, priceHKD: 30899, url: 'https://www.mrporter.com/en-hk/mens/product/dunhill/clothing/double-breasted-blazers/double-breasted-cashmere-blazer/46376663162903655', img: 'https://www.mrporter.com/variants/images/46376663162903655/in/w764_q60.jpg' },
  { id: '72', brand: 'LORO PIANA', name: 'Cashmere and Silk-Blend Blazer', priceGBP: 2890, priceHKD: 30634, url: 'https://www.mrporter.com/en-hk/mens/product/loro-piana/clothing/single-breasted-blazers/cashmere-and-silk-blend-blazer/1647597355398651', img: 'https://www.mrporter.com/variants/images/1647597355398651/in/w764_q60.jpg' },
  { id: '73', brand: 'ZEGNA', name: 'Cotton-Blend Corduroy Blazer', priceGBP: 2870, priceHKD: 30422, url: 'https://www.mrporter.com/en-hk/mens/product/zegna/clothing/single-breasted-blazers/cotton-blend-corduroy-blazer/46376663162903615', img: 'https://www.mrporter.com/variants/images/46376663162903615/in/w764_q60.jpg' },
  { id: '74', brand: 'ZEGNA', name: 'Cotton-Blend Corduroy Blazer', priceGBP: 2870, priceHKD: 30422, url: 'https://www.mrporter.com/en-hk/mens/product/zegna/clothing/single-breasted-blazers/cotton-blend-corduroy-blazer/46376663162903556', img: 'https://www.mrporter.com/variants/images/46376663162903556/in/w764_q60.jpg' },
  { id: '75', brand: 'THE ROW', name: 'Mazzy Double-Breasted Wool Jacket', priceGBP: 2835, priceHKD: 30051, url: 'https://www.mrporter.com/en-hk/mens/product/the-row/clothing/double-breasted-blazers/mazzy-double-breasted-wool-jacket/46376663162960221', img: 'https://www.mrporter.com/variants/images/46376663162960221/in/w764_q60.jpg' },
  { id: '76', brand: 'BRUNELLO CUCINELLI', name: 'Cotton-Corduroy Blazer', priceGBP: 2815, priceHKD: 29839, url: 'https://www.mrporter.com/en-hk/mens/product/brunello-cucinelli/clothing/suit-jackets/cotton-corduroy-blazer/46376663162902645', img: 'https://www.mrporter.com/variants/images/46376663162902645/in/w764_q60.jpg' },
  { id: '77', brand: 'RALPH LAUREN PURPLE LABEL', name: 'Double-Breasted Wool-Flannel Blazer', priceGBP: 2790, priceHKD: 29574, url: 'https://www.mrporter.com/en-hk/mens/product/ralph-lauren-purple-label/clothing/double-breasted-blazers/double-breasted-wool-flannel-blazer/46376663162996673', img: 'https://www.mrporter.com/variants/images/46376663162996673/in/w764_q60.jpg' },
  { id: '78', brand: 'MCQUEEN', name: 'Slim-Fit Silk-Trimmed Grain de Poudre Wool Blazer', priceGBP: 2788, priceHKD: 29552, url: 'https://www.mrporter.com/en-hk/mens/product/mcqueen/clothing/single-breasted-blazers/slim-fit-silk-trimmed-grain-de-poudre-wool-blazer/1647597356426242', img: 'https://www.mrporter.com/variants/images/1647597356426242/in/w764_q60.jpg' },
  { id: '79', brand: 'THOM BROWNE', name: 'Cashmere Blazer', priceGBP: 2785, priceHKD: 29521, url: 'https://www.mrporter.com/en-hk/mens/product/thom-browne/clothing/single-breasted-blazers/cashmere-blazer/46376663162942020', img: 'https://www.mrporter.com/variants/images/46376663162942020/in/w764_q60.jpg' },
  { id: '80', brand: 'BRUNELLO CUCINELLI', name: 'Double-Breasted Prince of Wales Checked Wool-Blend Blazer', priceGBP: 2750, priceHKD: 29150, url: 'https://www.mrporter.com/en-hk/mens/product/brunello-cucinelli/clothing/double-breasted-blazers/double-breasted-prince-of-wales-checked-wool-blend-blazer/46376663163000342', img: 'https://www.mrporter.com/variants/images/46376663163000342/in/w764_q60.jpg' },
];

const SUITS = [
  { id: '01', brand: 'TOM FORD', name: 'Shelton Brushed Wool and Cashmere-Blend Blazer', priceGBP: 5035, priceHKD: 53371, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/suit-jackets/shelton-brushed-wool-and-cashmere-blend-blazer/46376663162881062', img: 'https://www.mrporter.com/variants/images/46376663162881062/in/w764_q60.jpg' },
  { id: '02', brand: 'BRUNELLO CUCINELLI', name: 'Double-Breasted Puppytooth Cashmere and Silk-Blend Suit Jacket', priceGBP: 4750, priceHKD: 50350, url: 'https://www.mrporter.com/en-hk/mens/product/brunello-cucinelli/clothing/suit-jackets/double-breasted-puppytooth-cashmere-and-silk-blend-suit-jacket/46376663162997746', img: 'https://www.mrporter.com/variants/images/46376663162997746/in/w764_q60.jpg' },
  { id: '03', brand: 'BRUNELLO CUCINELLI', name: 'Double-Breasted Checked Linen-Blend Suit Jacket', priceGBP: 4265, priceHKD: 45209, url: 'https://www.mrporter.com/en-hk/mens/product/brunello-cucinelli/clothing/suit-jackets/double-breasted-checked-linen-blend-suit-jacket/46376663163118554', img: 'https://www.mrporter.com/variants/images/46376663163118554/in/w764_q60.jpg' },
  { id: '04', brand: 'ZEGNA', name: 'Wool and Cashmere-Blend Suit Jacket', priceGBP: 4105, priceHKD: 43513, url: 'https://www.mrporter.com/en-hk/mens/product/zegna/clothing/suit-jackets/wool-and-cashmere-blend-suit-jacket/46376663162934747', img: 'https://www.mrporter.com/variants/images/46376663162934747/in/w764_q60.jpg' },
  { id: '05', brand: 'BRUNELLO CUCINELLI', name: 'Wool Suit Jacket', priceGBP: 3860, priceHKD: 40916, url: 'https://www.mrporter.com/en-hk/mens/product/brunello-cucinelli/clothing/suit-jackets/wool-suit-jacket/46376663163018844', img: 'https://www.mrporter.com/variants/images/46376663163018844/in/w764_q60.jpg' },
  { id: '06', brand: 'TOM FORD', name: 'Slim-Fit Double-Breasted Wool-Twill Blazer', priceGBP: 3765, priceHKD: 39909, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/suit-jackets/slim-fit-double-breasted-wool-twill-blazer/46376663163003034', img: 'https://www.mrporter.com/variants/images/46376663163003034/in/w764_q60.jpg' },
  { id: '07', brand: 'TOM FORD', name: 'Double-Breasted Birdseye Wool Suit Jacket', priceGBP: 3755, priceHKD: 39803, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/suit-jackets/double-breasted-birdseye-wool-suit-jacket/46376663162903383', img: 'https://www.mrporter.com/variants/images/46376663162903383/in/w764_q60.jpg' },
  { id: '08', brand: 'TOM FORD', name: 'Dyllan Houndstooth Wool-Blend Suit Jacket', priceGBP: 3335, priceHKD: 35351, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/suit-jackets/dyllan-houndstooth-wool-blend-suit-jacket/46376663162881059', img: 'https://www.mrporter.com/variants/images/46376663162881059/in/w764_q60.jpg' },
  { id: '09', brand: 'TOM FORD', name: 'Shelton Super 120s Wool Blazer', priceGBP: 3180, priceHKD: 33708, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/clothing/suit-jackets/shelton-super-120s-wool-blazer/46376663163003158', img: 'https://www.mrporter.com/variants/images/46376663163003158/in/w764_q60.jpg' },
  { id: '10', brand: 'ZEGNA', name: 'Wool, Silk and Linen-Blend Seersucker Jacket', priceGBP: 2690, priceHKD: 28514, url: 'https://www.mrporter.com/en-hk/mens/product/zegna/clothing/suit-jackets/wool-silk-and-linen-blend-seersucker-jacket/46376663163016482', img: 'https://www.mrporter.com/variants/images/46376663163016482/in/w764_q60.jpg' },
  { id: '11', brand: 'ZEGNA', name: 'Wool, Linen and Silk-Blend Suit Jacket', priceGBP: 2685, priceHKD: 28461, url: 'https://www.mrporter.com/en-hk/mens/product/zegna/clothing/suit-jackets/wool-linen-and-silk-blend-suit-jacket/46376663162999257', img: 'https://www.mrporter.com/variants/images/46376663162999257/in/w764_q60.jpg' },
  { id: '12', brand: 'GABRIELA HEARST', name: 'Irving Wool and Cashmere-Blend Flannel Suit Jacket', priceGBP: 1880, priceHKD: 19928, url: 'https://www.mrporter.com/en-hk/mens/product/gabriela-hearst/clothing/suit-jackets/irving-wool-and-cashmere-blend-flannel-suit-jacket/46376663162996494', img: 'https://www.mrporter.com/variants/images/46376663162996494/in/w764_q60.jpg' },
  { id: '13', brand: 'RALPH LAUREN PURPLE LABEL', name: 'Double-Breasted Linen, Cotton and Silk-Blend Suit Jacket', priceGBP: 1835, priceHKD: 19451, url: 'https://www.mrporter.com/en-hk/mens/product/ralph-lauren-purple-label/clothing/suit-jackets/double-breasted-linen-cotton-and-silk-blend-suit-jacket/46376663163123855', img: 'https://www.mrporter.com/variants/images/46376663163123855/in/w764_q60.jpg' },
  { id: '14', brand: 'RALPH LAUREN PURPLE LABEL', name: 'Silk and Linen-Blend Suit Jacket', priceGBP: 1835, priceHKD: 19451, url: 'https://www.mrporter.com/en-hk/mens/product/ralph-lauren-purple-label/clothing/suit-jackets/silk-and-linen-blend-suit-jacket/46376663163123863', img: 'https://www.mrporter.com/variants/images/46376663163123863/in/w764_q60.jpg' },
  { id: '15', brand: 'SAMAN AMEL', name: 'Cotton-Blend Twill Suit Jacket', priceGBP: 1770, priceHKD: 18762, url: 'https://www.mrporter.com/en-hk/mens/product/saman-amel/clothing/suit-jackets/cotton-blend-twill-suit-jacket/46376663162998710', img: 'https://www.mrporter.com/variants/images/46376663162998710/in/w764_q60.jpg' },
  { id: '16', brand: 'CANALI', name: 'Kei Slim-Fit Cotton-Blend Corduroy Suit Jacket', priceGBP: 1575, priceHKD: 16695, url: 'https://www.mrporter.com/en-hk/mens/product/canali/clothing/suit-jackets/kei-slim-fit-cotton-blend-corduroy-suit-jacket/46376663162941431', img: 'https://www.mrporter.com/variants/images/46376663162941431/in/w764_q60.jpg' },
  { id: '17', brand: 'CANALI', name: 'Kei Slim-Fit Unstructured Super 150s Wool Blazer', priceGBP: 1325, priceHKD: 14045, url: 'https://www.mrporter.com/en-hk/mens/product/canali/clothing/suit-jackets/kei-slim-fit-unstructured-super-150s-wool-blazer/46376663162941418', img: 'https://www.mrporter.com/variants/images/46376663162941418/in/w764_q60.jpg' },
  { id: '18', brand: 'CANALI', name: 'Wool-Twill Suit Jacket', priceGBP: 1125, priceHKD: 11925, url: 'https://www.mrporter.com/en-hk/mens/product/canali/clothing/suit-jackets/wool-twill-suit-jacket/46376663162881289', img: 'https://www.mrporter.com/variants/images/46376663162881289/in/w764_q60.jpg' },
  { id: '19', brand: 'SID MASHBURN', name: 'Kincaid No. 3 Wool Suit Jacket', priceGBP: 1115, priceHKD: 11819, url: 'https://www.mrporter.com/en-hk/mens/product/sid-mashburn/clothing/suit-jackets/kincaid-no-3-wool-suit-jacket/46376663163000030', img: 'https://www.mrporter.com/variants/images/46376663163000030/in/w764_q60.jpg' },
  { id: '20', brand: 'HUSBANDS', name: 'Pinstriped Wool Suit Jacket', priceGBP: 1105, priceHKD: 11713, url: 'https://www.mrporter.com/en-hk/mens/product/husbands/clothing/suit-jackets/pinstriped-wool-suit-jacket/46376663162998394', img: 'https://www.mrporter.com/variants/images/46376663162998394/in/w764_q60.jpg' },
  { id: '21', brand: 'CANALI', name: 'Kei Linen Suit Jacket', priceGBP: 1040, priceHKD: 11024, url: 'https://www.mrporter.com/en-hk/mens/product/canali/clothing/suit-jackets/kei-linen-suit-jacket/46376663163006788', img: 'https://www.mrporter.com/variants/images/46376663163006788/in/w764_q60.jpg' },
  { id: '22', brand: 'CANALI', name: 'Wool-Blend Suit Jacket', priceGBP: 1040, priceHKD: 11024, url: 'https://www.mrporter.com/en-hk/mens/product/canali/clothing/suit-jackets/wool-blend-suit-jacket/46376663162941415', img: 'https://www.mrporter.com/variants/images/46376663162941415/in/w764_q60.jpg' },
  { id: '23', brand: 'CANALI', name: 'Double-Breasted Wool-Twill Suit Jacket', priceGBP: 1040, priceHKD: 11024, url: 'https://www.mrporter.com/en-hk/mens/product/canali/clothing/suit-jackets/double-breasted-wool-twill-suit-jacket/46376663163003872', img: 'https://www.mrporter.com/variants/images/46376663163003872/in/w764_q60.jpg' },
  { id: '24', brand: 'J MUESER', name: 'Weaverly Virgin Wool Suit Jacket', priceGBP: 960, priceHKD: 10176, url: 'https://www.mrporter.com/en-hk/mens/product/j-mueser/clothing/suit-jackets/weaverly-virgin-wool-suit-jacket/46376663163006935', img: 'https://www.mrporter.com/variants/images/46376663163006935/in/w764_q60.jpg' },
  { id: '25', brand: 'MR P.', name: 'Double-Breasted Cashmere-Blend Flannel Suit Jacket', priceGBP: 845, priceHKD: 8957, url: 'https://www.mrporter.com/en-hk/mens/product/mr-p/clothing/suit-jackets/double-breasted-cashmere-blend-flannel-suit-jacket/46376663162897864', img: 'https://www.mrporter.com/variants/images/46376663162897864/in/w764_q60.jpg' },
  { id: '26', brand: 'ATON', name: 'Linen and Wool-Blend Suit Jacket', priceGBP: 715, priceHKD: 7579, url: 'https://www.mrporter.com/en-hk/mens/product/aton/clothing/suit-jackets/linen-and-wool-blend-suit-jacket/46376663162978308', img: 'https://www.mrporter.com/variants/images/46376663162978308/in/w764_q60.jpg' },
  { id: '27', brand: 'POLO RALPH LAUREN', name: 'Double-Breasted Striped Cotton Suit Jacket', priceGBP: 705, priceHKD: 7473, url: 'https://www.mrporter.com/en-hk/mens/product/polo-ralph-lauren/clothing/suit-jackets/double-breasted-striped-cotton-suit-jacket/46376663163040723', img: 'https://www.mrporter.com/variants/images/46376663163040723/in/w764_q60.jpg' },
  { id: '28', brand: 'MR P.', name: 'Luxe Slim-Fit Wool and Silk-Blend Suit Jacket', priceGBP: 695, priceHKD: 7367, url: 'https://www.mrporter.com/en-hk/mens/product/mr-p/clothing/suit-jackets/luxe-slim-fit-wool-and-silk-blend-suit-jacket/46376663162889356', img: 'https://www.mrporter.com/variants/images/46376663162889356/in/w764_q60.jpg' },
  { id: '29', brand: 'SLOWEAR', name: 'Cotton-Blend Suit Jacket', priceGBP: 685, priceHKD: 7261, url: 'https://www.mrporter.com/en-hk/mens/product/slowear/clothing/suit-jackets/cotton-blend-suit-jacket/46376663163019254', img: 'https://www.mrporter.com/variants/images/46376663163019254/in/w764_q60.jpg' },
  { id: '30', brand: 'DRAKE\'S', name: 'Games Herringbone Cotton Suit Jacket', priceGBP: 665, priceHKD: 7049, url: 'https://www.mrporter.com/en-hk/mens/product/drake-s/clothing/suit-jackets/games-herringbone-cotton-suit-jacket/46376663163066492', img: 'https://www.mrporter.com/variants/images/46376663163066492/in/w764_q60.jpg' },
  { id: '31', brand: 'DRAKE\'S', name: 'Games Herringbone Cotton Suit Jacket', priceGBP: 665, priceHKD: 7049, url: 'https://www.mrporter.com/en-hk/mens/product/drake-s/clothing/suit-jackets/games-herringbone-cotton-suit-jacket/46376663163066486', img: 'https://www.mrporter.com/variants/images/46376663163066486/in/w764_q60.jpg' },
  { id: '32', brand: 'PAUL SMITH', name: 'Cotton and Linen-Blend Blazer', priceGBP: 625, priceHKD: 6625, url: 'https://www.mrporter.com/en-hk/mens/product/paul-smith/clothing/suit-jackets/cotton-and-linen-blend-blazer/46376663163069679', img: 'https://www.mrporter.com/variants/images/46376663163069679/in/w764_q60.jpg' },
  { id: '33', brand: 'PAUL SMITH', name: 'Linen Suit Jacket', priceGBP: 625, priceHKD: 6625, url: 'https://www.mrporter.com/en-hk/mens/product/paul-smith/clothing/suit-jackets/linen-suit-jacket/46376663163000925', img: 'https://www.mrporter.com/variants/images/46376663163000925/in/w764_q60.jpg' },
  { id: '34', brand: 'PAUL SMITH', name: 'Linen Suit Jacket', priceGBP: 625, priceHKD: 6625, url: 'https://www.mrporter.com/en-hk/mens/product/paul-smith/clothing/suit-jackets/linen-suit-jacket/46376663163000921', img: 'https://www.mrporter.com/variants/images/46376663163000921/in/w764_q60.jpg' },
  { id: '35', brand: 'PAUL SMITH', name: 'Slim-Fit Unstructured Cotton-Corduroy Suit Jacket', priceGBP: 625, priceHKD: 6625, url: 'https://www.mrporter.com/en-hk/mens/product/paul-smith/clothing/suit-jackets/slim-fit-unstructured-cotton-corduroy-suit-jacket/46376663162897545', img: 'https://www.mrporter.com/variants/images/46376663162897545/in/w764_q60.jpg' },
  { id: '36', brand: 'POLO RALPH LAUREN', name: 'Striped Cotton-Seersucker Blazer', priceGBP: 620, priceHKD: 6572, url: 'https://www.mrporter.com/en-hk/mens/product/polo-ralph-lauren/clothing/suit-jackets/striped-cotton-seersucker-blazer/46376663163040701', img: 'https://www.mrporter.com/variants/images/46376663163040701/in/w764_q60.jpg' },
  { id: '37', brand: 'PAUL SMITH', name: 'Linen and Wool-Blend Twill Suit Jacket', priceGBP: 585, priceHKD: 6201, url: 'https://www.mrporter.com/en-hk/mens/product/paul-smith/clothing/suit-jackets/linen-and-wool-blend-twill-suit-jacket/46376663163000901', img: 'https://www.mrporter.com/variants/images/46376663163000901/in/w764_q60.jpg' },
  { id: '38', brand: 'FRESCOBOL CARIOCA', name: 'Paulo Linen and Virgin Wool-Blend Suit Jacket', priceGBP: 580, priceHKD: 6148, url: 'https://www.mrporter.com/en-hk/mens/product/frescobol-carioca/clothing/suit-jackets/paulo-linen-and-virgin-wool-blend-suit-jacket/46376663163012949', img: 'https://www.mrporter.com/variants/images/46376663163012949/in/w764_q60.jpg' },
  { id: '39', brand: 'KARTIK RESEARCH', name: 'Linen and Wool-Blend Suit Jacket', priceGBP: 430, priceHKD: 4558, url: 'https://www.mrporter.com/en-hk/mens/product/kartik-research/clothing/suit-jackets/linen-and-wool-blend-suit-jacket/46376663162975423', img: 'https://www.mrporter.com/variants/images/46376663162975423/in/w764_q60.jpg' },
  { id: '40', brand: 'MR P.', name: 'Double-Breasted Houndstooth Linen Suit Jacket', priceGBP: 425, priceHKD: 4505, url: 'https://www.mrporter.com/en-hk/mens/product/mr-p/clothing/suit-jackets/double-breasted-houndstooth-linen-suit-jacket/46376663163004742', img: 'https://www.mrporter.com/variants/images/46376663163004742/in/w764_q60.jpg' },
  { id: '41', brand: 'MR P.', name: 'Pinstriped Linen Suit Jacket', priceGBP: 425, priceHKD: 4505, url: 'https://www.mrporter.com/en-hk/mens/product/mr-p/clothing/suit-jackets/pinstriped-linen-suit-jacket/46376663163004701', img: 'https://www.mrporter.com/variants/images/46376663163004701/in/w764_q60.jpg' },
  { id: '42', brand: 'MR P.', name: 'Striped Linen Suit Jacket', priceGBP: 425, priceHKD: 4505, url: 'https://www.mrporter.com/en-hk/mens/product/mr-p/clothing/suit-jackets/striped-linen-suit-jacket/46376663163004676', img: 'https://www.mrporter.com/variants/images/46376663163004676/in/w764_q60.jpg' },
  { id: '43', brand: 'MR P.', name: 'Delave Linen Check Suit Jacket', priceGBP: 425, priceHKD: 4505, url: 'https://www.mrporter.com/en-hk/mens/product/mr-p/clothing/suit-jackets/delave-linen-check-suit-jacket/46376663163004716', img: 'https://www.mrporter.com/variants/images/46376663163004716/in/w764_q60.jpg' },
  { id: '44', brand: 'MR P.', name: 'Double-Breasted Checked Wool-Blend Suit Jacket', priceGBP: 425, priceHKD: 4505, url: 'https://www.mrporter.com/en-hk/mens/product/mr-p/clothing/suit-jackets/double-breasted-checked-wool-blend-suit-jacket/46376663163004675', img: 'https://www.mrporter.com/variants/images/46376663163004675/in/w764_q60.jpg' },
  { id: '45', brand: 'MR P.', name: 'Delave Linen Check Jacket', priceGBP: 425, priceHKD: 4505, url: 'https://www.mrporter.com/en-hk/mens/product/mr-p/clothing/suit-jackets/delave-linen-check-jacket/46376663163004711', img: 'https://www.mrporter.com/variants/images/46376663163004711/in/w764_q60.jpg' },
  { id: '46', brand: 'MR P.', name: 'Striped Linen Suit Jacket', priceGBP: 425, priceHKD: 4505, url: 'https://www.mrporter.com/en-hk/mens/product/mr-p/clothing/suit-jackets/striped-linen-suit-jacket/46376663162965547', img: 'https://www.mrporter.com/variants/images/46376663162965547/in/w764_q60.jpg' },
  { id: '47', brand: 'MR P.', name: 'Slim-Fit Double-Breasted Cotton and Cashmere-Blend Corduroy Tuxedo Jacket', priceGBP: 425, priceHKD: 4505, url: 'https://www.mrporter.com/en-hk/mens/product/mr-p/clothing/suit-jackets/slim-fit-double-breasted-cotton-and-cashmere-blend-corduroy-tuxedo-jacket/46376663162889359', img: 'https://www.mrporter.com/variants/images/46376663162889359/in/w764_q60.jpg' },
  { id: '48', brand: 'MR P.', name: 'Wool-Blend Seersucker Suit Jacket', priceGBP: 395, priceHKD: 4187, url: 'https://www.mrporter.com/en-hk/mens/product/mr-p/clothing/suit-jackets/wool-blend-seersucker-suit-jacket/46376663163004678', img: 'https://www.mrporter.com/variants/images/46376663163004678/in/w764_q60.jpg' },
  { id: '49', brand: 'MR P.', name: 'Oversized Wool Blazer', priceGBP: 395, priceHKD: 4187, url: 'https://www.mrporter.com/en-hk/mens/product/mr-p/clothing/suit-jackets/oversized-wool-blazer/46376663163004684', img: 'https://www.mrporter.com/variants/images/46376663163004684/in/w764_q60.jpg' },
  { id: '50', brand: 'A.P.C.', name: 'Leo Cotton Blazer', priceGBP: 385, priceHKD: 4081, url: 'https://www.mrporter.com/en-hk/mens/product/apc/clothing/suit-jackets/leo-cotton-blazer/46376663163034823', img: 'https://www.mrporter.com/variants/images/46376663163034823/in/w764_q60.jpg' },
];

const SHOES = [
  { id: '01', brand: 'BERLUTI', name: 'Andy Leather Loafers', priceGBP: 2220, priceHKD: 23532, url: 'https://www.mrporter.com/en-hk/mens/product/berluti/shoes/loafers/andy-leather-loafers/3607804572092314', img: 'https://www.mrporter.com/variants/images/3607804572092314/in/w764_q60.jpg' },
  { id: '02', brand: 'BERLUTI', name: 'Leather Oxford Shoes', priceGBP: 2220, priceHKD: 23532, url: 'https://www.mrporter.com/en-hk/mens/product/berluti/shoes/oxford-shoes/leather-oxford-shoes/10375442619243722', img: 'https://www.mrporter.com/variants/images/10375442619243722/in/w764_q60.jpg' },
  { id: '03', brand: 'BERLUTI', name: 'Blake Whole-Cut Venezia Leather Oxford Shoes', priceGBP: 2220, priceHKD: 23532, url: 'https://www.mrporter.com/en-hk/mens/product/berluti/shoes/oxford-shoes/blake-whole-cut-venezia-leather-oxford-shoes/10375442619171503', img: 'https://www.mrporter.com/variants/images/10375442619171503/in/w764_q60.jpg' },
  { id: '04', brand: 'BERLUTI', name: 'Andy Demesure Venezia Leather Loafers', priceGBP: 2055, priceHKD: 21783, url: 'https://www.mrporter.com/en-hk/mens/product/berluti/shoes/loafers/andy-demesure-venezia-leather-loafers/46376663163016415', img: 'https://www.mrporter.com/variants/images/46376663163016415/in/w764_q60.jpg' },
  { id: '05', brand: 'BERLUTI', name: 'Alessandro Demesure Leather Oxford Shoes', priceGBP: 2055, priceHKD: 21783, url: 'https://www.mrporter.com/en-hk/mens/product/berluti/shoes/oxford-shoes/alessandro-demesure-leather-oxford-shoes/46376663163016411', img: 'https://www.mrporter.com/variants/images/46376663163016411/in/w764_q60.jpg' },
  { id: '06', brand: 'THE ROW', name: 'Novus Woven Leather Derby Shoes', priceGBP: 2045, priceHKD: 21677, url: 'https://www.mrporter.com/en-hk/mens/product/the-row/shoes/derby-shoes/novus-woven-leather-derby-shoes/46376663162980007', img: 'https://www.mrporter.com/variants/images/46376663162980007/in/w764_q60.jpg' },
  { id: '07', brand: 'BERLUTI', name: 'New Oslo Full-Grain Leather Derby Shoes', priceGBP: 1900, priceHKD: 20140, url: 'https://www.mrporter.com/en-hk/mens/product/berluti/shoes/derby-shoes/new-oslo-full-grain-leather-derby-shoes/46376663163000016', img: 'https://www.mrporter.com/variants/images/46376663163000016/in/w764_q60.jpg' },
  { id: '08', brand: 'JOHN LOBB', name: 'Marldon Whole-Cut Leather Oxford Shoes', priceGBP: 1855, priceHKD: 19663, url: 'https://www.mrporter.com/en-hk/mens/product/john-lobb/shoes/oxford-shoes/marldon-whole-cut-leather-oxford-shoes/46376663162894149', img: 'https://www.mrporter.com/variants/images/46376663162894149/in/w764_q60.jpg' },
  { id: '09', brand: 'JOHN LOBB', name: 'Marldon Whole-Cut Patent-Leather Oxford Shoes', priceGBP: 1855, priceHKD: 19663, url: 'https://www.mrporter.com/en-hk/mens/product/john-lobb/shoes/oxford-shoes/marldon-whole-cut-patent-leather-oxford-shoes/46376663162894143', img: 'https://www.mrporter.com/variants/images/46376663162894143/in/w764_q60.jpg' },
  { id: '10', brand: 'JOHN LOBB', name: 'Marldon Whole-Cut Leather Oxford Shoes', priceGBP: 1855, priceHKD: 19663, url: 'https://www.mrporter.com/en-hk/mens/product/john-lobb/shoes/oxford-shoes/marldon-whole-cut-leather-oxford-shoes/46376663162894166', img: 'https://www.mrporter.com/variants/images/46376663162894166/in/w764_q60.jpg' },
  { id: '11', brand: 'BERLUTI', name: 'Alessio Venezia Leather Loafers', priceGBP: 1750, priceHKD: 18550, url: 'https://www.mrporter.com/en-hk/mens/product/berluti/shoes/loafers/alessio-venezia-leather-loafers/46376663162937263', img: 'https://www.mrporter.com/variants/images/46376663162937263/in/w764_q60.jpg' },
  { id: '12', brand: 'BERLUTI', name: 'Alessio Leather Derby Shoes', priceGBP: 1750, priceHKD: 18550, url: 'https://www.mrporter.com/en-hk/mens/product/berluti/shoes/derby-shoes/alessio-leather-derby-shoes/1647597341730175', img: 'https://www.mrporter.com/variants/images/1647597341730175/in/w764_q60.jpg' },
  { id: '13', brand: 'BERLUTI', name: 'Alessio Leather Brogues', priceGBP: 1750, priceHKD: 18550, url: 'https://www.mrporter.com/en-hk/mens/product/berluti/shoes/brogues/alessio-leather-brogues/46376663162869780', img: 'https://www.mrporter.com/variants/images/46376663162869780/in/w764_q60.jpg' },
  { id: '14', brand: 'TOM FORD', name: 'Elkan Leather Monk-Strap Shoes', priceGBP: 1740, priceHKD: 18444, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/shoes/monk-strap-shoes/elkan-leather-monk-strap-shoes/46376663162965124', img: 'https://www.mrporter.com/variants/images/46376663162965124/in/w764_q60.jpg' },
  { id: '15', brand: 'JOHN LOBB', name: 'Bill Leather Loafers', priceGBP: 1700, priceHKD: 18020, url: 'https://www.mrporter.com/en-hk/mens/product/john-lobb/shoes/loafers/bill-leather-loafers/1647597352372086', img: 'https://www.mrporter.com/variants/images/1647597352372086/in/w764_q60.jpg' },
  { id: '16', brand: 'TOM FORD', name: 'Elkan Croc-Effect Leather Oxford Shoes', priceGBP: 1640, priceHKD: 17384, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/shoes/oxford-shoes/elkan-croc-effect-leather-oxford-shoes/46376663162965102', img: 'https://www.mrporter.com/variants/images/46376663162965102/in/w764_q60.jpg' },
  { id: '17', brand: 'JOHN LOBB', name: 'City II Leather Oxford Shoes', priceGBP: 1580, priceHKD: 16748, url: 'https://www.mrporter.com/en-hk/mens/product/john-lobb/shoes/oxford-shoes/city-ii-leather-oxford-shoes/46376663163009896', img: 'https://www.mrporter.com/variants/images/46376663163009896/in/w764_q60.jpg' },
  { id: '18', brand: 'JOHN LOBB', name: 'City II Leather Oxford Shoes', priceGBP: 1575, priceHKD: 16695, url: 'https://www.mrporter.com/en-hk/mens/product/john-lobb/shoes/oxford-shoes/city-ii-leather-oxford-shoes/46376663163009897', img: 'https://www.mrporter.com/variants/images/46376663163009897/in/w764_q60.jpg' },
  { id: '19', brand: 'JOHN LOBB', name: 'Lopez Embellished Leather Penny Loafers', priceGBP: 1555, priceHKD: 16483, url: 'https://www.mrporter.com/en-hk/mens/product/john-lobb/shoes/loafers/lopez-embellished-leather-penny-loafers/46376663163009905', img: 'https://www.mrporter.com/variants/images/46376663163009905/in/w764_q60.jpg' },
  { id: '20', brand: 'JOHN LOBB', name: 'Lopez Embellished Leather Loafers', priceGBP: 1555, priceHKD: 16483, url: 'https://www.mrporter.com/en-hk/mens/product/john-lobb/shoes/loafers/lopez-embellished-leather-loafers/46376663163009906', img: 'https://www.mrporter.com/variants/images/46376663163009906/in/w764_q60.jpg' },
  { id: '21', brand: 'JOHN LOBB', name: 'Lopez Embellished Leather Penny Loafers', priceGBP: 1555, priceHKD: 16483, url: 'https://www.mrporter.com/en-hk/mens/product/john-lobb/shoes/loafers/lopez-embellished-leather-penny-loafers/46376663163009890', img: 'https://www.mrporter.com/variants/images/46376663163009890/in/w764_q60.jpg' },
  { id: '22', brand: 'TOM FORD', name: 'Gigi Crackled Patent-Leather Penny Loafers', priceGBP: 1540, priceHKD: 16324, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/shoes/loafers/gigi-crackled-patent-leather-penny-loafers/46376663162937872', img: 'https://www.mrporter.com/variants/images/46376663162937872/in/w764_q60.jpg' },
  { id: '23', brand: 'TOM FORD', name: 'Whole-Cut Leather Oxford Shoes', priceGBP: 1540, priceHKD: 16324, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/shoes/oxford-shoes/whole-cut-leather-oxford-shoes/46376663162965106', img: 'https://www.mrporter.com/variants/images/46376663162965106/in/w764_q60.jpg' },
  { id: '24', brand: 'TOM FORD', name: 'Gigi Leather-Trimmed Croc-Effect Velvet Penny Loafers', priceGBP: 1540, priceHKD: 16324, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/shoes/loafers/gigi-leather-trimmed-croc-effect-velvet-penny-loafers/46376663162937870', img: 'https://www.mrporter.com/variants/images/46376663162937870/in/w764_q60.jpg' },
  { id: '25', brand: 'TOM FORD', name: 'Elkan Leather Oxford Shoes', priceGBP: 1540, priceHKD: 16324, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/shoes/oxford-shoes/elkan-leather-oxford-shoes/1647597348348279', img: 'https://www.mrporter.com/variants/images/1647597348348279/in/w764_q60.jpg' },
  { id: '26', brand: 'TOM FORD', name: 'Gigi Leather-Trimmed Croc-Effect Velvet Penny Loafers', priceGBP: 1540, priceHKD: 16324, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/shoes/loafers/gigi-leather-trimmed-croc-effect-velvet-penny-loafers/46376663162937877', img: 'https://www.mrporter.com/variants/images/46376663162937877/in/w764_q60.jpg' },
  { id: '27', brand: 'THE ROW', name: 'Nobilis Leather Slip-On Shoes', priceGBP: 1490, priceHKD: 15794, url: 'https://www.mrporter.com/en-hk/mens/product/the-row/shoes/derby-shoes/nobilis-leather-slip-on-shoes/1647597346187937', img: 'https://www.mrporter.com/variants/images/1647597346187937/in/w764_q60.jpg' },
  { id: '28', brand: 'EDWARD GREEN', name: 'Dover Suede Derby Shoes', priceGBP: 1490, priceHKD: 15794, url: 'https://www.mrporter.com/en-hk/mens/product/edward-green/shoes/derby-shoes/dover-suede-derby-shoes/1647597351318348', img: 'https://www.mrporter.com/variants/images/1647597351318348/in/w764_q60.jpg' },
  { id: '29', brand: 'TOM FORD', name: 'Elkan Whole-Cut Glossed-Leather Oxford Shoes', priceGBP: 1485, priceHKD: 15741, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/shoes/oxford-shoes/elkan-whole-cut-glossed-leather-oxford-shoes/1647597304986243', img: 'https://www.mrporter.com/variants/images/1647597304986243/in/w764_q60.jpg' },
  { id: '30', brand: 'THE ROW', name: 'Lars Leather Loafers', priceGBP: 1460, priceHKD: 15476, url: 'https://www.mrporter.com/en-hk/mens/product/the-row/shoes/loafers/lars-leather-loafers/1647597353955687', img: 'https://www.mrporter.com/variants/images/1647597353955687/in/w764_q60.jpg' },
  { id: '31', brand: 'EDWARD GREEN', name: 'Dover Full-Grain Leather Derby Shoes', priceGBP: 1440, priceHKD: 15264, url: 'https://www.mrporter.com/en-hk/mens/product/edward-green/shoes/derby-shoes/dover-full-grain-leather-derby-shoes/46376663162968085', img: 'https://www.mrporter.com/variants/images/46376663162968085/in/w764_q60.jpg' },
  { id: '32', brand: 'EDWARD GREEN', name: 'Dover Leather Derby Shoes', priceGBP: 1440, priceHKD: 15264, url: 'https://www.mrporter.com/en-hk/mens/product/edward-green/shoes/derby-shoes/dover-leather-derby-shoes/46376663162968078', img: 'https://www.mrporter.com/variants/images/46376663162968078/in/w764_q60.jpg' },
  { id: '33', brand: 'EDWARD GREEN', name: 'Putney Horsebit-Embellished Full-Grain Leather Loafers', priceGBP: 1415, priceHKD: 14999, url: 'https://www.mrporter.com/en-hk/mens/product/edward-green/shoes/loafers/putney-horsebit-embellished-full-grain-leather-loafers/46376663163014721', img: 'https://www.mrporter.com/variants/images/46376663163014721/in/w764_q60.jpg' },
  { id: '34', brand: 'EDWARD GREEN', name: 'Putney Horsebit-Embellished Full-Grain Leather Loafers', priceGBP: 1415, priceHKD: 14999, url: 'https://www.mrporter.com/en-hk/mens/product/edward-green/shoes/loafers/putney-horsebit-embellished-full-grain-leather-loafers/46376663163014715', img: 'https://www.mrporter.com/variants/images/46376663163014715/in/w764_q60.jpg' },
  { id: '35', brand: 'TOM FORD', name: 'Elkan Whole-Cut Patent-Leather Oxford Shoes', priceGBP: 1385, priceHKD: 14681, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/shoes/oxford-shoes/elkan-whole-cut-patent-leather-oxford-shoes/1647597304986172', img: 'https://www.mrporter.com/variants/images/1647597304986172/in/w764_q60.jpg' },
  { id: '36', brand: 'TOM FORD', name: 'Elkan Patent-Leather Oxford Shoes', priceGBP: 1385, priceHKD: 14681, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/shoes/oxford-shoes/elkan-patent-leather-oxford-shoes/46376663162965120', img: 'https://www.mrporter.com/variants/images/46376663162965120/in/w764_q60.jpg' },
  { id: '37', brand: 'THE ROW', name: 'Oiled-Leather Slip-On Loafers', priceGBP: 1370, priceHKD: 14522, url: 'https://www.mrporter.com/en-hk/mens/product/the-row/shoes/loafers/oiled-leather-slip-on-loafers/46376663162906813', img: 'https://www.mrporter.com/variants/images/46376663162906813/in/w764_q60.jpg' },
  { id: '38', brand: 'JOHN LOBB', name: 'Land Rugged Suede Derby Shoes', priceGBP: 1370, priceHKD: 14522, url: 'https://www.mrporter.com/en-hk/mens/product/john-lobb/shoes/derby-shoes/land-rugged-suede-derby-shoes/1647597328941439', img: 'https://www.mrporter.com/variants/images/1647597328941439/in/w764_q60.jpg' },
  { id: '39', brand: 'JOHN LOBB', name: 'Land Rugged Nubuck Derby Shoes', priceGBP: 1370, priceHKD: 14522, url: 'https://www.mrporter.com/en-hk/mens/product/john-lobb/shoes/derby-shoes/land-rugged-nubuck-derby-shoes/46376663162876607', img: 'https://www.mrporter.com/variants/images/46376663162876607/in/w764_q60.jpg' },
  { id: '40', brand: 'JOHN LOBB', name: 'William Leather Monk-Strap Shoes', priceGBP: 1360, priceHKD: 14416, url: 'https://www.mrporter.com/en-hk/mens/product/john-lobb/shoes/monk-strap-shoes/william-leather-monk-strap-shoes/1647597327562595', img: 'https://www.mrporter.com/variants/images/1647597327562595/in/w764_q60.jpg' },
  { id: '41', brand: 'JOHN LOBB', name: 'William Leather Monk-Strap Shoes', priceGBP: 1360, priceHKD: 14416, url: 'https://www.mrporter.com/en-hk/mens/product/john-lobb/shoes/monk-strap-shoes/william-leather-monk-strap-shoes/46376663162894171', img: 'https://www.mrporter.com/variants/images/46376663162894171/in/w764_q60.jpg' },
  { id: '42', brand: 'TOM FORD', name: 'Steven Grosgrain-Trimmed Croc-Effect Leather Loafers', priceGBP: 1340, priceHKD: 14204, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/shoes/loafers/steven-grosgrain-trimmed-croc-effect-leather-loafers/46376663162964380', img: 'https://www.mrporter.com/variants/images/46376663162964380/in/w764_q60.jpg' },
  { id: '43', brand: 'JOHN LOBB', name: 'City II Cap-Toe Suede Oxford Shoes', priceGBP: 1340, priceHKD: 14204, url: 'https://www.mrporter.com/en-hk/mens/product/john-lobb/shoes/oxford-shoes/city-ii-cap-toe-suede-oxford-shoes/1647597344908412', img: 'https://www.mrporter.com/variants/images/1647597344908412/in/w764_q60.jpg' },
  { id: '44', brand: 'JOHN LOBB', name: 'City II Burnished-Leather Oxford Shoes', priceGBP: 1340, priceHKD: 14204, url: 'https://www.mrporter.com/en-hk/mens/product/john-lobb/shoes/oxford-shoes/city-ii-burnished-leather-oxford-shoes/4068790126374741', img: 'https://www.mrporter.com/variants/images/4068790126374741/in/w764_q60.jpg' },
  { id: '45', brand: 'JOHN LOBB', name: 'City II Leather Oxford Shoes', priceGBP: 1340, priceHKD: 14204, url: 'https://www.mrporter.com/en-hk/mens/product/john-lobb/shoes/oxford-shoes/city-ii-leather-oxford-shoes/24062987016570059', img: 'https://www.mrporter.com/variants/images/24062987016570059/in/w764_q60.jpg' },
  { id: '46', brand: 'TOM FORD', name: 'Steven Grosgrain-Trimmed Croc-Effect Leather Loafers', priceGBP: 1340, priceHKD: 14204, url: 'https://www.mrporter.com/en-hk/mens/product/tom-ford/shoes/loafers/steven-grosgrain-trimmed-croc-effect-leather-loafers/46376663162964378', img: 'https://www.mrporter.com/variants/images/46376663162964378/in/w764_q60.jpg' },
  { id: '47', brand: 'BRUNELLO CUCINELLI', name: 'Leather Loafers', priceGBP: 1310, priceHKD: 13886, url: 'https://www.mrporter.com/en-hk/mens/product/brunello-cucinelli/shoes/loafers/leather-loafers/46376663163009962', img: 'https://www.mrporter.com/variants/images/46376663163009962/in/w764_q60.jpg' },
  { id: '48', brand: 'BRUNELLO CUCINELLI', name: 'Leather Loafers', priceGBP: 1310, priceHKD: 13886, url: 'https://www.mrporter.com/en-hk/mens/product/brunello-cucinelli/shoes/loafers/leather-loafers/46376663163009999', img: 'https://www.mrporter.com/variants/images/46376663163009999/in/w764_q60.jpg' },
  { id: '49', brand: 'BRUNELLO CUCINELLI', name: 'Leather Derby Shoes', priceGBP: 1310, priceHKD: 13886, url: 'https://www.mrporter.com/en-hk/mens/product/brunello-cucinelli/shoes/derby-shoes/leather-derby-shoes/46376663163010018', img: 'https://www.mrporter.com/variants/images/46376663163010018/in/w764_q60.jpg' },
  { id: '50', brand: 'JOHN LOBB', name: 'Lopez Full-Grain Leather Penny Loafers', priceGBP: 1300, priceHKD: 13780, url: 'https://www.mrporter.com/en-hk/mens/product/john-lobb/shoes/loafers/lopez-full-grain-leather-penny-loafers/46376663162894157', img: 'https://www.mrporter.com/variants/images/46376663162894157/in/w764_q60.jpg' },
];

// ─── EDITORIAL METADATA ──────────────────────────────────────────────────────

// Bespoke multiplier: RTW price × factor = estimated bespoke equivalent
const BESPOKE_FACTOR: Record<string, number> = {
  'BRUNELLO CUCINELLI': 0.9,
  'KITON': 0.85,
  'TOM FORD': 1.1,
  'BRIONI': 0.8,
  'LORO PIANA': 0.95,
  'ZEGNA': 1.0,
  'RALPH LAUREN PURPLE LABEL': 1.2,
  'BERLUTI': 1.3,
  'JOHN LOBB': 1.1,
  'EDWARD GREEN': 0.95,
  'CHURCH\'S': 1.0,
};

function getBespokeEstimate(item: Product): string {
  const factor = BESPOKE_FACTOR[item.brand] ?? 1.0;
  const low = Math.round(item.priceHKD * factor * 0.9 / 1000) * 1000;
  const high = Math.round(item.priceHKD * factor * 1.4 / 1000) * 1000;
  return `HK$${low.toLocaleString()}–${high.toLocaleString()}`;
}

// Fabric origin tags derived from product name keywords
function getFabricTag(item: Product): string | null {
  const n = item.name.toLowerCase();
  if (n.includes('cashmere') && n.includes('silk')) return 'Cashmere-Silk';
  if (n.includes('baby cashmere')) return 'Baby Cashmere';
  if (n.includes('cashmere')) return 'Cashmere';
  if (n.includes('venezia leather')) return 'Venezia Leather';
  if (n.includes('full-grain leather')) return 'Full-Grain';
  if (n.includes('suede')) return 'Suede';
  if (n.includes('silk')) return 'Silk';
  if (n.includes('linen')) return 'Linen';
  if (n.includes('wool')) return 'Wool';
  return null;
}

// Value tier badge
function getValueTier(item: Product): { label: string; color: string } {
  if (item.priceHKD >= 50000) return { label: 'Investment', color: '#8B6914' };
  if (item.priceHKD >= 25000) return { label: 'Premium', color: '#555' };
  return { label: 'Entry', color: '#2d6a4f' };
}

// Editorial verdict (short, for select items)
const VERDICTS: Record<string, string> = {
  'KITON': 'Neapolitan hand-construction at its finest — a benchmark for bespoke comparison.',
  'BRIONI': 'Roman tailoring heritage; the construction translates well to bespoke commission.',
  'BRUNELLO CUCINELLI': 'Exceptional cloth weight for Hong Kong\'s climate. Versatile across seasons.',
  'LORO PIANA': 'The cloth is the story — Loro Piana fabric at source price is rarely bettered.',
  'TOM FORD': 'Impeccable drape; the cut is conservative enough to replicate in bespoke.',
  'BERLUTI': 'Patina leather work unmatched in RTW. Bespoke equivalent would cost significantly more.',
  'JOHN LOBB': 'The City II remains the benchmark Oxford. Last construction is exceptional.',
  'EDWARD GREEN': 'Northampton craftsmanship at its best. Dover last is a perennial classic.',
  'ZEGNA': 'Oasi Cashmere is Zegna\'s finest cloth — worth the premium over standard wool.',
};

// ─── WISHLIST HOOK ────────────────────────────────────────────────────────────

const WISHLIST_KEY = 'tailor-hk-rtw-wishlist';

interface WishlistItem {
  category: string;
  id: string;
  brand: string;
  name: string;
  priceHKD: number;
  priceGBP: number;
  url: string;
  img: string;
}

function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    try {
      const raw = localStorage.getItem(WISHLIST_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem(WISHLIST_KEY, JSON.stringify(items)); } catch { /* ignore */ }
  }, [items]);

  const toggle = useCallback((category: string, item: Product) => {
    setItems(prev => {
      const key = `${category}-${item.id}`;
      const exists = prev.find(w => `${w.category}-${w.id}` === key);
      if (exists) return prev.filter(w => `${w.category}-${w.id}` !== key);
      return [...prev, { category, id: item.id, brand: item.brand, name: item.name, priceHKD: item.priceHKD, priceGBP: item.priceGBP, url: item.url, img: item.img }];
    });
  }, []);

  const isWishlisted = useCallback((category: string, id: string) => {
    return items.some(w => w.category === category && w.id === id);
  }, [items]);

  const clear = useCallback(() => setItems([]), []);

  const addLook = useCallback((lookName: string, jacket: Product, shoe: Product) => {
    // Add both items tagged with the look name
    setItems(prev => {
      const jacketKey = `look-${jacket.id}`;
      const shoeKey = `look-${shoe.id}`;
      const filtered = prev.filter(w => w.id !== jacketKey && w.id !== shoeKey);
      const jacketEntry: WishlistItem = {
        category: 'look',
        id: `${jacket.id}-look`,
        brand: jacket.brand,
        name: `[${lookName}] ${jacket.name}`,
        priceHKD: jacket.priceHKD,
        priceGBP: jacket.priceGBP,
        url: jacket.url,
        img: jacket.img,
      };
      const shoeEntry: WishlistItem = {
        category: 'look',
        id: `${shoe.id}-look`,
        brand: shoe.brand,
        name: `[${lookName}] ${shoe.name}`,
        priceHKD: shoe.priceHKD,
        priceGBP: shoe.priceGBP,
        url: shoe.url,
        img: shoe.img,
      };
      return [...filtered, jacketEntry, shoeEntry];
    });
  }, []);

  return { items, toggle, isWishlisted, clear, addLook, count: items.length };
}

// ─── SHARE WISHLIST ───────────────────────────────────────────────────────────

function buildShareUrl(items: WishlistItem[], region: Region): string {
  const ids = items.map(w => `${w.category[0]}${w.id}`).join(',');
  const base = window.location.origin + '/ready-to-wear';
  return `${base}?wishlist=${encodeURIComponent(ids)}&region=${region}`;
}

function buildWhatsAppMessage(items: WishlistItem[], region: Region): string {
  const regionCfg = REGION_CONFIG[region];
  const total = items.reduce((s, i) => s + i.priceHKD, 0);
  const totalGBP = items.reduce((s, i) => s + i.priceGBP, 0);
  const count = items.length;

  // Group by category for a cleaner summary
  const byCategory: Record<string, WishlistItem[]> = {};
  items.forEach(item => {
    if (!byCategory[item.category]) byCategory[item.category] = [];
    byCategory[item.category].push(item);
  });

  const lines = items.map((item, i) => {
    const url = rewriteUrl(item.url, region);
    return `${i + 1}. ${item.brand} — ${item.name}\n   HK$${item.priceHKD.toLocaleString()} (£${item.priceGBP.toLocaleString()})\n   ${url}`;
  });

  const categoryBreakdown = Object.entries(byCategory)
    .map(([cat, catItems]) => {
      const catTotal = catItems.reduce((s, i) => s + i.priceHKD, 0);
      return `  ${cat.charAt(0).toUpperCase() + cat.slice(1)}: ${catItems.length} item${catItems.length !== 1 ? 's' : ''} — HK$${catTotal.toLocaleString()}`;
    })
    .join('\n');

  const msg = [
    `Hello,`,
    ``,
    `I've been browsing Tailors.hk's curated Ready-to-Wear edit and have put together a wishlist of ${count} item${count !== 1 ? 's' : ''} I'm interested in — I'd love your thoughts on these selections and whether any would translate well to bespoke.`,
    ``,
    `─── MY WISHLIST (${regionCfg.label}) ───`,
    ``,
    ...lines,
    ``,
    `─── SUMMARY ───`,
    ``,
    categoryBreakdown,
    ``,
    `Total: HK$${total.toLocaleString()} (approx. £${totalGBP.toLocaleString()})`,
    ``,
    `Curated via Tailors.hk — Hong Kong's leading bespoke tailoring resource.`,
    `https://tailors.hk/ready-to-wear`,
  ].join('\n');
  return `https://wa.me/?text=${encodeURIComponent(msg)}`;
}

// ─── RECENTLY VIEWED HOOK ─────────────────────────────────────────────────────

const RECENTLY_VIEWED_KEY = 'tailor_hk_recently_viewed';
const MAX_RECENTLY_VIEWED = 6;

function useRecentlyViewed() {
  const [ids, setIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });

  const track = (id: string) => {
    setIds(prev => {
      const next = [id, ...prev.filter(x => x !== id)].slice(0, MAX_RECENTLY_VIEWED);
      try { localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  };

  const clear = () => {
    setIds([]);
    try { localStorage.removeItem(RECENTLY_VIEWED_KEY); } catch { /* ignore */ }
  };

  return { ids, track, clear };
}

// ─── COMPARISON HOOK ──────────────────────────────────────────────────────────

const MAX_COMPARE = 4;

function useComparison() {
  const [items, setItems] = useState<(WishlistItem & { category: string })[]>([]);

  const toggle = useCallback((category: string, item: Product) => {
    setItems(prev => {
      const key = `${category}-${item.id}`;
      const exists = prev.find(c => `${c.category}-${c.id}` === key);
      if (exists) return prev.filter(c => `${c.category}-${c.id}` !== key);
      if (prev.length >= MAX_COMPARE) {
        toast.error(`MAXIMUM ${MAX_COMPARE} ITEMS FOR COMPARISON`);
        return prev;
      }
      return [...prev, { category, id: item.id, brand: item.brand, name: item.name, priceHKD: item.priceHKD, priceGBP: item.priceGBP, url: item.url, img: item.img }];
    });
  }, []);

  const isComparing = useCallback((category: string, id: string) => {
    return items.some(c => c.category === category && c.id === id);
  }, [items]);

  const clear = useCallback(() => setItems([]), []);

  return { items, toggle, isComparing, clear, count: items.length };
}

// ─── TYPES ────────────────────────────────────────────────────────────────────

type Category = 'blazers' | 'suits' | 'shoes';

const CATEGORY_META: Record<Category, { label: string; count: number; desc: string; mrporterUrl: string; heroImg: string }> = {
  blazers: {
    label: 'Blazers',
    count: BLAZERS.length,
    desc: 'The finest sport coats and blazers from the world\'s leading luxury houses — from Brunello Cucinelli cashmere to Tom Ford silk-gabardine.',
    mrporterUrl: 'https://www.mrporter.com/en-hk/mens/clothing/blazers?orderBy=9',
    heroImg: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/miuxWfyziElLdgHf.webp',
  },
  suits: {
    label: 'Suits',
    count: SUITS.length,
    desc: 'Exceptional suit jackets from Kiton, Brioni, Zegna and beyond — each a study in cloth, construction and cut.',
    mrporterUrl: 'https://www.mrporter.com/en-hk/mens/clothing/suits?orderBy=9',
    heroImg: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/DWLsiPeBjGwwFqjT.webp',
  },
  shoes: {
    label: 'Shoes',
    count: SHOES.length,
    desc: 'Berluti, John Lobb, Edward Green and Tom Ford — the definitive selection of fine leather footwear for the discerning gentleman.',
    mrporterUrl: 'https://www.mrporter.com/en-hk/mens/shoes?orderBy=9',
    heroImg: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/NoSFBZLFHvQpbvFj.webp',
  },
};

interface Product {
  id: string;
  brand: string;
  name: string;
  priceGBP: number;
  priceHKD: number;
  url: string;
  img: string;
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────

function ProductCard({
  item, index, href, category,
  wishlisted, onWishlist,
  comparing, onCompare,
  onView, region,
}: {
  item: Product; index: number; href: string; category: Category;
  wishlisted: boolean; onWishlist: () => void;
  comparing: boolean; onCompare: () => void;
  onView: () => void; region: Region;
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const rankLabel = String(index + 1).padStart(2, '0');
  const fabricTag = getFabricTag(item);
  const valueTier = getValueTier(item);
  const verdict = VERDICTS[item.brand];

  return (
    <div style={{ position: 'relative' }} className="group">
      {/* Action buttons — always visible */}
      <div style={{
        position: 'absolute', top: '10px', right: '10px', zIndex: 10,
        display: 'flex', flexDirection: 'column', gap: '4px',
      }}>
        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); onWishlist(); toast(wishlisted ? 'REMOVED FROM WISHLIST' : 'SAVED TO WISHLIST'); }}
          title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          style={{
            width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: wishlisted ? '#111' : 'rgba(255,255,255,0.92)',
            border: '1px solid',
            borderColor: wishlisted ? '#111' : '#ddd',
            cursor: 'pointer', transition: 'all 0.15s',
          }}
        >
          {wishlisted
            ? <BookmarkCheck size={14} color="#fff" />
            : <Bookmark size={14} color="#111" />
          }
        </button>
        {/* Compare */}
        <button
          onClick={(e) => { e.stopPropagation(); onCompare(); }}
          title={comparing ? 'Remove from comparison' : 'Add to comparison'}
          style={{
            width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: comparing ? '#111' : 'rgba(255,255,255,0.92)',
            border: '1px solid',
            borderColor: comparing ? '#111' : '#ddd',
            cursor: 'pointer', transition: 'all 0.15s',
          }}
        >
          <BarChart2 size={14} color={comparing ? '#fff' : '#111'} />
        </button>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onView}
        style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
      >
        <div style={{
          background: '#fff',
          border: '1px solid',
          borderColor: comparing ? '#111' : wishlisted ? '#c8a96e' : '#e8e4df',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          boxShadow: comparing ? '0 0 0 2px #111' : wishlisted ? '0 0 0 1px #c8a96e' : 'none',
        }}>
          {/* Image */}
          <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: '#f5f3f0' }}>
            {/* Rank badge */}
            <div style={{
              position: 'absolute', top: '10px', left: '10px', zIndex: 2,
              background: '#111', color: '#fff',
              fontFamily: F.mono, fontSize: '10px', letterSpacing: '0.05em',
              padding: '2px 6px',
            }}>
              #{rankLabel}
            </div>
            {/* Value tier */}
            <div style={{
              position: 'absolute', bottom: '10px', left: '10px', zIndex: 2,
              background: 'rgba(255,255,255,0.92)',
              fontFamily: F.mono, fontSize: '8px', letterSpacing: '0.1em',
              padding: '2px 6px', color: valueTier.color,
              border: `1px solid ${valueTier.color}22`,
            }}>
              {valueTier.label.toUpperCase()}
            </div>
            {/* Fabric tag */}
            {fabricTag && (
              <div style={{
                position: 'absolute', bottom: '10px', right: '10px', zIndex: 2,
                background: 'rgba(17,17,17,0.75)', color: '#e8e4df',
                fontFamily: F.mono, fontSize: '8px', letterSpacing: '0.08em',
                padding: '2px 6px',
              }}>
                {fabricTag.toUpperCase()}
              </div>
            )}
            <img
              src={item.img}
              alt={`${item.brand} ${item.name}`}
              width={382}
              height={509}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                opacity: imgLoaded ? 1 : 0,
                transition: 'opacity 0.4s, transform 0.4s',
              }}
              className="group-hover:scale-[1.03]"
            />
            {/* Hover overlay */}
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(17,17,17,0.0)', transition: 'background 0.2s',
            }} className="group-hover:bg-black/10">
              <div style={{
                background: '#111', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px',
                fontFamily: F.display, fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '8px 14px', opacity: 0, transform: 'translateY(6px)',
                transition: 'opacity 0.2s, transform 0.2s',
              }} className="group-hover:opacity-100 group-hover:translate-y-0">
                VIEW ON MR PORTER <ExternalLink size={11} />
              </div>
            </div>
          </div>

          {/* Info */}
          <div style={{ padding: '12px 14px 14px' }}>
            <div style={{ fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.12em', color: '#888', textTransform: 'uppercase', marginBottom: '4px' }}>
              {item.brand}
            </div>
            <div style={{ fontFamily: F.display, fontSize: '14px', letterSpacing: '0.02em', color: '#111', lineHeight: 1.3, marginBottom: '8px', minHeight: '36px' }}>
              {item.name}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', justifyContent: 'space-between', marginBottom: verdict ? '8px' : 0 }}>
              <span style={{ fontFamily: F.mono, fontSize: '13px', color: '#111', fontWeight: 600 }}>
                {fmtPrice(item.priceHKD, region)}
              </span>
              {region !== 'UK' && (
                <span style={{ fontFamily: F.mono, fontSize: '10px', color: '#999' }}>
                  £{item.priceGBP.toLocaleString()}
                </span>
              )}
            </div>
            {/* Bespoke estimate */}
            <div style={{
              fontFamily: F.mono, fontSize: '9px', color: '#888', letterSpacing: '0.06em',
              borderTop: '1px solid #f0ece8', paddingTop: '8px', marginTop: '4px',
            }}>
              <span style={{ color: '#bbb' }}>BESPOKE EST. </span>
              {getBespokeEstimate(item)}
            </div>
            {/* Verdict */}
            {verdict && (
              <div style={{
                fontFamily: F.body, fontSize: '11px', color: '#888', lineHeight: 1.5,
                borderTop: '1px solid #f0ece8', paddingTop: '8px', marginTop: '8px',
                fontStyle: 'italic',
              }}>
                "{verdict}"
              </div>
            )}
          </div>
        </div>
      </a>
    </div>
  );
}

// ─── COMPARISON PANEL ─────────────────────────────────────────────────────────

function ComparisonPanel({ items, region, onRemove, onClear }: {
  items: (WishlistItem & { category: string })[];
  region: Region;
  onRemove: (category: string, id: string) => void;
  onClear: () => void;
}) {
  if (items.length === 0) return null;
  const totalHKD = items.reduce((s, i) => s + i.priceHKD, 0);
  const cheapest = Math.min(...items.map(i => i.priceHKD));
  const mostExpensive = Math.max(...items.map(i => i.priceHKD));

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
      background: '#111', color: '#fff',
      borderTop: '2px solid #333',
      padding: '16px 24px',
      boxShadow: '0 -8px 32px rgba(0,0,0,0.4)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BarChart2 size={14} color="#fff" />
            <span style={{ fontFamily: F.display, fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              COMPARING {items.length} ITEM{items.length > 1 ? 'S' : ''}
            </span>
            {items.length > 1 && (
              <span style={{ fontFamily: F.mono, fontSize: '10px', color: '#888' }}>
                · PRICE SPREAD: {fmtPrice(mostExpensive - cheapest, region)}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {items.length >= 2 && (
              <span style={{ fontFamily: F.mono, fontSize: '11px', color: '#aaa' }}>
                Combined: {fmtPrice(totalHKD, region)}
              </span>
            )}
            <button
              onClick={onClear}
              style={{
                fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '4px 10px', border: '1px solid #444', background: 'transparent',
                color: '#888', cursor: 'pointer',
              }}
            >
              CLEAR ALL
            </button>
          </div>
        </div>

        {/* Items */}
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
          {items.map(item => {
            const priceDiff = item.priceHKD - cheapest;
            return (
              <div key={`${item.category}-${item.id}`} style={{
                display: 'flex', gap: '10px', alignItems: 'center',
                background: '#1a1a1a', border: '1px solid #333',
                padding: '8px 12px', minWidth: '260px', flexShrink: 0,
              }}>
                <img src={item.img} alt={item.name} width={40} height={53} style={{ objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: F.mono, fontSize: '8px', color: '#666', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {item.brand} · {item.category}
                  </div>
                  <div style={{ fontFamily: F.display, fontSize: '12px', color: '#fff', lineHeight: 1.3, marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <span style={{ fontFamily: F.mono, fontSize: '11px', color: '#fff', fontWeight: 600 }}>
                      {fmtPrice(item.priceHKD, region)}
                    </span>
                    {priceDiff > 0 && (
                      <span style={{ fontFamily: F.mono, fontSize: '9px', color: '#c8a96e' }}>
                        +{fmtPrice(priceDiff, region)}
                      </span>
                    )}
                    {priceDiff === 0 && items.length > 1 && (
                      <span style={{ fontFamily: F.mono, fontSize: '9px', color: '#2d6a4f' }}>LOWEST</span>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flexShrink: 0 }}>
                  <a
                    href={rewriteUrl(item.url, region)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: '28px', height: '28px',
                      background: '#333', border: '1px solid #444', color: '#fff',
                    }}
                    title="View on MR PORTER"
                  >
                    <ExternalLink size={11} />
                  </a>
                  <button
                    onClick={() => onRemove(item.category, item.id)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: '28px', height: '28px',
                      background: 'transparent', border: '1px solid #333', color: '#666', cursor: 'pointer',
                    }}
                    title="Remove"
                  >
                    <X size={11} />
                  </button>
                </div>
              </div>
            );
          })}
          {/* Add more placeholder */}
          {items.length < MAX_COMPARE && (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              minWidth: '120px', border: '1px dashed #333', color: '#555',
              fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase',
              flexShrink: 0,
            }}>
              + Add item
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── WISHLIST PANEL ───────────────────────────────────────────────────────────

function WishlistPanel({ items, region, onRemove, onClear, onClose }: {
  items: WishlistItem[];
  region: Region;
  onRemove: (category: string, id: string) => void;
  onClear: () => void;
  onClose: () => void;
}) {
  const totalHKD = items.reduce((s, i) => s + i.priceHKD, 0);

  const handleShare = () => {
    const url = buildShareUrl(items, region);
    navigator.clipboard.writeText(url).then(() => {
      toast.success('WISHLIST LINK COPIED TO CLIPBOARD');
    }).catch(() => {
      toast.error('COULD NOT COPY LINK');
    });
  };

  const handleWhatsApp = () => {
    const url = buildWhatsAppMessage(items, region);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      display: 'flex', justifyContent: 'flex-end',
    }}>
      {/* Overlay */}
      <div
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }}
        onClick={onClose}
      />
      {/* Panel */}
      <div style={{
        position: 'relative', width: '420px', maxWidth: '100vw',
        background: '#fff', height: '100%', overflowY: 'auto',
        display: 'flex', flexDirection: 'column',
        boxShadow: '-8px 0 32px rgba(0,0,0,0.2)',
      }}>
        {/* Header */}
        <div style={{
          padding: '24px', borderBottom: '1px solid #e8e4df',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, background: '#fff', zIndex: 1,
        }}>
          <div>
            <div style={{ fontFamily: F.display, fontSize: '20px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#111' }}>
              My Wishlist
            </div>
            <div style={{ fontFamily: F.mono, fontSize: '10px', color: '#888', marginTop: '4px' }}>
              {items.length} item{items.length !== 1 ? 's' : ''} · {fmtPrice(totalHKD, region)} total
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <X size={20} color="#111" />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', fontFamily: F.mono, fontSize: '11px', color: '#aaa', letterSpacing: '0.1em' }}>
              NO ITEMS SAVED YET<br />
              <span style={{ fontSize: '10px', marginTop: '8px', display: 'block' }}>Click the bookmark icon on any product</span>
            </div>
          )}
          {items.map(item => (
            <div key={`${item.category}-${item.id}`} style={{
              display: 'flex', gap: '12px', alignItems: 'flex-start',
              border: '1px solid #e8e4df', padding: '12px',
            }}>
              <img src={item.img} alt={item.name} width={60} height={80} style={{ objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: F.mono, fontSize: '8px', color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {item.brand} · {item.category}
                </div>
                <div style={{ fontFamily: F.display, fontSize: '14px', color: '#111', lineHeight: 1.3, margin: '4px 0' }}>
                  {item.name}
                </div>
                <div style={{ fontFamily: F.mono, fontSize: '12px', color: '#111', fontWeight: 600 }}>
                  {fmtPrice(item.priceHKD, region)}
                  {region !== 'UK' && <span style={{ color: '#999', fontWeight: 400, marginLeft: '8px', fontSize: '10px' }}>£{item.priceGBP.toLocaleString()}</span>}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flexShrink: 0 }}>
                <a
                  href={rewriteUrl(item.url, region)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '32px', height: '32px',
                    background: '#111', border: '1px solid #111', color: '#fff',
                  }}
                  title="View on MR PORTER"
                >
                  <ExternalLink size={12} />
                </a>
                <button
                  onClick={() => onRemove(item.category, item.id)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '32px', height: '32px',
                    background: 'transparent', border: '1px solid #e8e4df', color: '#999', cursor: 'pointer',
                  }}
                  title="Remove"
                >
                  <X size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{
            padding: '16px 24px', borderTop: '1px solid #e8e4df',
            position: 'sticky', bottom: 0, background: '#fff',
            display: 'flex', flexDirection: 'column', gap: '8px',
          }}>
            {/* WhatsApp share */}
            <button
              onClick={handleWhatsApp}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                fontFamily: F.display, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '12px', background: '#25D366', color: '#fff', border: 'none', cursor: 'pointer',
                width: '100%',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Send via WhatsApp
            </button>
            {/* Copy link */}
            <button
              onClick={handleShare}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                fontFamily: F.display, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '12px', background: '#111', color: '#fff', border: 'none', cursor: 'pointer',
                width: '100%',
              }}
            >
              <Share2 size={13} /> Copy Wishlist Link
            </button>
            {/* Bespoke CTA */}
            <Link
              href={`/tailor-finder-quiz?wishlist=${items.map(w => w.name).join(', ')}`}
              onClick={onClose}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                fontFamily: F.display, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '12px', background: 'transparent', color: '#111',
                border: '1px solid #e8e4df', textDecoration: 'none',
              }}
            >
              Commission These in Bespoke
            </Link>
            <button
              onClick={onClear}
              style={{
                fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '8px', background: 'transparent', color: '#bbb', border: 'none', cursor: 'pointer',
              }}
            >
              Clear wishlist
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── BUILD A LOOK ─────────────────────────────────────────────────────────────

function BuildALook({ region, onClose, onSaveLook }: {
  region: Region;
  onClose: () => void;
  onSaveLook: (lookName: string, jacket: Product, shoe: Product) => void;
}) {
  const [jacket, setJacket] = useState<Product | null>(null);
  const [shoe, setShoe] = useState<Product | null>(null);
  const [jacketSearch, setJacketSearch] = useState('');
  const [shoeSearch, setShoeSearch] = useState('');
  const [showJacketList, setShowJacketList] = useState(false);
  const [showShoeList, setShowShoeList] = useState(false);
  const [lookName, setLookName] = useState('');
  const [lookSaved, setLookSaved] = useState(false);

  const allJackets = [...BLAZERS, ...SUITS];
  const filteredJackets = jacketSearch
    ? allJackets.filter(j => j.brand.toLowerCase().includes(jacketSearch.toLowerCase()) || j.name.toLowerCase().includes(jacketSearch.toLowerCase()))
    : allJackets.slice(0, 12);
  const filteredShoes = shoeSearch
    ? SHOES.filter(s => s.brand.toLowerCase().includes(shoeSearch.toLowerCase()) || s.name.toLowerCase().includes(shoeSearch.toLowerCase()))
    : SHOES.slice(0, 12);

  const total = (jacket?.priceHKD ?? 0) + (shoe?.priceHKD ?? 0);
  const bespokeTotal = jacket && shoe
    ? `HK$${(Math.round((jacket.priceHKD + shoe.priceHKD) * 1.2 / 1000) * 1000).toLocaleString()}–${(Math.round((jacket.priceHKD + shoe.priceHKD) * 1.8 / 1000) * 1000).toLocaleString()}`
    : null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} onClick={onClose} />
      <div style={{
        position: 'relative', width: '100%', maxWidth: '900px',
        background: '#faf9f7', maxHeight: '85vh', overflowY: 'auto',
        borderTop: '2px solid #111',
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px', background: '#111', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 1,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layers size={16} color="#fff" />
            <span style={{ fontFamily: F.display, fontSize: '16px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Build a Look
            </span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={20} color="#fff" />
          </button>
        </div>

        <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: typeof window !== 'undefined' && window.innerWidth < 768 ? '1fr' : '1fr 1fr', gap: '24px' }}>
          {/* Jacket selector */}
          <div>
            <div style={{ fontFamily: F.mono, fontSize: '10px', letterSpacing: '0.12em', color: '#888', textTransform: 'uppercase', marginBottom: '12px' }}>
              01 · Select Jacket / Blazer
            </div>
            {jacket ? (
              <div style={{ border: '2px solid #111', padding: '12px', display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px'
 }}>
                <img src={jacket.img} alt={jacket.name} width={50} height={67} style={{ objectFit: 'cover', flexShrink: 0 }} referrerPolicy="no-referrer" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: F.mono, fontSize: '8px', color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{jacket.brand}</div>
                  <div style={{ fontFamily: F.display, fontSize: '13px', color: '#111', lineHeight: 1.3, marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{jacket.name}</div>
                  <div style={{ fontFamily: F.mono, fontSize: '12px', color: '#111', fontWeight: 600, marginTop: '4px' }}>{fmtPrice(jacket.priceHKD, region)}</div>
                </div>
                <button onClick={() => setJacket(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}><X size={14} color="#888" /></button>
              </div>
            ) : null}
            <input
              type="text"
              placeholder="Search blazers & suits..."
              value={jacketSearch}
              onChange={e => { setJacketSearch(e.target.value); setShowJacketList(true); }}
              onFocus={() => setShowJacketList(true)}
              style={{
                width: '100%', padding: '10px 12px', border: '1px solid #ddd', background: '#fff',
                fontFamily: F.mono, fontSize: '11px', outline: 'none', boxSizing: 'border-box',
              }}
            />
            {showJacketList && (
              <div style={{ border: '1px solid #ddd', borderTop: 'none', background: '#fff', maxHeight: '200px', overflowY: 'auto' }}>
                {filteredJackets.map(j => (
                  <button
                    key={`${j.id}-${j.brand}`}
                    onClick={() => { setJacket(j); setShowJacketList(false); setJacketSearch(''); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                      padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer',
                      textAlign: 'left', borderBottom: '1px solid #f0ece8',
                    }}
                  >
                    <img src={j.img} alt={j.name} width={30} height={40} style={{ objectFit: 'cover', flexShrink: 0 }} referrerPolicy="no-referrer" />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: F.mono, fontSize: '8px', color: '#888', textTransform: 'uppercase' }}>{j.brand}</div>
                      <div style={{ fontFamily: F.display, fontSize: '12px', color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{j.name}</div>
                    </div>
                    <span style={{ fontFamily: F.mono, fontSize: '10px', color: '#555', flexShrink: 0 }}>{fmtPrice(j.priceHKD, region)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Shoe selector */}
          <div>
            <div style={{ fontFamily: F.mono, fontSize: '10px', letterSpacing: '0.12em', color: '#888', textTransform: 'uppercase', marginBottom: '12px' }}>
              02 · Select Shoes
            </div>
            {shoe ? (
              <div style={{ border: '2px solid #111', padding: '12px', display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                <img src={shoe.img} alt={shoe.name} width={50} height={67} style={{ objectFit: 'cover', flexShrink: 0 }} referrerPolicy="no-referrer" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: F.mono, fontSize: '8px', color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{shoe.brand}</div>
                  <div style={{ fontFamily: F.display, fontSize: '13px', color: '#111', lineHeight: 1.3, marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{shoe.name}</div>
                  <div style={{ fontFamily: F.mono, fontSize: '12px', color: '#111', fontWeight: 600, marginTop: '4px' }}>{fmtPrice(shoe.priceHKD, region)}</div>
                </div>
                <button onClick={() => setShoe(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}><X size={14} color="#888" /></button>
              </div>
            ) : null}
            <input
              type="text"
              placeholder="Search shoes..."
              value={shoeSearch}
              onChange={e => { setShoeSearch(e.target.value); setShowShoeList(true); }}
              onFocus={() => setShowShoeList(true)}
              style={{
                width: '100%', padding: '10px 12px', border: '1px solid #ddd', background: '#fff',
                fontFamily: F.mono, fontSize: '11px', outline: 'none', boxSizing: 'border-box',
              }}
            />
            {showShoeList && (
              <div style={{ border: '1px solid #ddd', borderTop: 'none', background: '#fff', maxHeight: '200px', overflowY: 'auto' }}>
                {filteredShoes.map(s => (
                  <button
                    key={`${s.id}-${s.brand}`}
                    onClick={() => { setShoe(s); setShowShoeList(false); setShoeSearch(''); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                      padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer',
                      textAlign: 'left', borderBottom: '1px solid #f0ece8',
                    }}
                  >
                    <img src={s.img} alt={s.name} width={30} height={40} style={{ objectFit: 'cover', flexShrink: 0 }} referrerPolicy="no-referrer" />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: F.mono, fontSize: '8px', color: '#888', textTransform: 'uppercase' }}>{s.brand}</div>
                      <div style={{ fontFamily: F.display, fontSize: '12px', color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</div>
                    </div>
                    <span style={{ fontFamily: F.mono, fontSize: '10px', color: '#555', flexShrink: 0 }}>{fmtPrice(s.priceHKD, region)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Look summary */}
        {(jacket || shoe) && (
          <div style={{ margin: '0 24px 24px', background: '#111', color: '#fff', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ fontFamily: F.mono, fontSize: '9px', color: '#666', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }}>
                  LOOK TOTAL
                </div>
                <div style={{ fontFamily: F.display, fontSize: '32px', fontWeight: 700, letterSpacing: '-0.01em', color: '#fff' }}>
                  {fmtPrice(total, region)}
                </div>
                {bespokeTotal && (
                  <div style={{ fontFamily: F.mono, fontSize: '10px', color: '#888', marginTop: '4px' }}>
                    Bespoke equivalent: {bespokeTotal}
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {jacket && (
                  <a
                    href={rewriteUrl(jacket.url, region)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      fontFamily: F.display, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase',
                      padding: '10px 16px', background: '#fff', color: '#111', textDecoration: 'none',
                    }}
                  >
                    Buy Jacket <ExternalLink size={10} />
                  </a>
                )}
                {shoe && (
                  <a
                    href={rewriteUrl(shoe.url, region)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      fontFamily: F.display, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase',
                      padding: '10px 16px', border: '1px solid #444', color: '#aaa', textDecoration: 'none',
                    }}
                  >
                    Buy Shoes <ExternalLink size={10} />
                  </a>
                )}
                <Link
                  href="/tailor-finder-quiz"
                  onClick={onClose}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    fontFamily: F.display, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '10px 16px', border: '1px solid #555', color: '#888', textDecoration: 'none',
                  }}
                >
                  Commission in Bespoke
                </Link>
              </div>
            </div>
            {/* Save Look */}
            {jacket && shoe && (
              <div style={{ marginTop: '16px', borderTop: '1px solid #333', paddingTop: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Name this look (e.g. Board Meeting)..."
                  value={lookName}
                  onChange={e => { setLookName(e.target.value); setLookSaved(false); }}
                  style={{
                    flex: 1, padding: '10px 12px', background: '#222', border: '1px solid #444',
                    color: '#fff', fontFamily: F.mono, fontSize: '11px', outline: 'none',
                  }}
                />
                <button
                  onClick={() => {
                    if (!jacket || !shoe) return;
                    const name = lookName.trim() || 'My Look';
                    onSaveLook(name, jacket, shoe);
                    setLookSaved(true);
                    toast.success(`${name.toUpperCase()} — SAVED TO YOUR WISHLIST`);
                  }}
                  disabled={lookSaved}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    fontFamily: F.display, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '10px 16px',
                    background: lookSaved ? '#2d6a4f' : '#c8a96e',
                    color: '#fff', border: 'none', cursor: lookSaved ? 'default' : 'pointer',
                    whiteSpace: 'nowrap', transition: 'background 0.2s',
                  }}
                >
                  {lookSaved ? (
                    <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg> Saved</>
                  ) : (
                    <><Bookmark size={12} /> Save Look</>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function ReadyToWear() {
  useSEO({
    title: 'Ready to Wear Essentials — MR PORTER | Tailors.hk',
    description: 'The finest ready-to-wear blazers, suits and shoes from MR PORTER — curated by Tailors.hk. Brunello Cucinelli, Tom Ford, Berluti, John Lobb and more.',
    canonical: 'https://tailors.hk/ready-to-wear',
    schema: [
      SCHEMAS.organization(),
      SCHEMAS.breadcrumb([
        { name: 'Home', url: '/' },
        { name: 'Ready to Wear', url: '/ready-to-wear' },
      ]),
      SCHEMAS.itemList([
        { name: 'Brunello Cucinelli Ready-to-Wear', url: '/ready-to-wear', description: 'Luxury Italian ready-to-wear from Brunello Cucinelli, curated by Tailors.hk' },
        { name: 'Tom Ford Suits and Blazers', url: '/ready-to-wear', description: 'Tom Ford ready-to-wear suits and tailoring, curated by Tailors.hk' },
        { name: 'Berluti Shoes', url: '/ready-to-wear', description: 'Berluti luxury shoes and leather goods, curated by Tailors.hk' },
        { name: 'John Lobb Shoes', url: '/ready-to-wear', description: 'John Lobb bespoke and ready-to-wear shoes, curated by Tailors.hk' },
        { name: 'Kiton Ready to Wear', url: '/ready-to-wear', description: 'Kiton Neapolitan ready-to-wear tailoring, curated by Tailors.hk' },
        { name: 'Loro Piana Blazers', url: '/ready-to-wear', description: 'Loro Piana luxury cashmere and wool blazers, curated by Tailors.hk' },
        { name: 'Brioni Ready-to-Wear', url: '/ready-to-wear', description: 'Brioni Roman bespoke-quality ready-to-wear, curated by Tailors.hk' },
      ]),
    ],
  });

  const [activeCategory, setActiveCategory] = useState<Category>('blazers');
  const [brandFilter, setBrandFilter] = useState<string>('all');
  const [priceSort, setPriceSort] = useState<'desc' | 'asc'>('desc');
  const [region, setRegion] = useState<Region>('APAC');
  const REGION_KEY = 'tailor_hk_region';
  const [showWishlist, setShowWishlist] = useState(false);
  const [showBuildALook, setShowBuildALook] = useState(false);

  const wishlist = useWishlist();
  const comparison = useComparison();
  const recentlyViewed = useRecentlyViewed();

  // Auto-detect region once on mount; also read URL params and localStorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // Read category from URL param (?cat=suits / ?cat=shoes)
    const catParam = params.get('cat') as Category | null;
    if (catParam && ['blazers', 'suits', 'shoes'].includes(catParam)) {
      setActiveCategory(catParam);
    }
    // Region: URL param > localStorage > auto-detect
    const regionParam = params.get('region') as Region | null;
    if (regionParam && ['APAC', 'US', 'UK', 'AU'].includes(regionParam)) {
      setRegion(regionParam);
    } else {
      try {
        const saved = localStorage.getItem(REGION_KEY) as Region | null;
        if (saved && ['APAC', 'US', 'UK', 'AU'].includes(saved)) {
          setRegion(saved);
        } else {
          setRegion(detectRegion());
        }
      } catch {
        setRegion(detectRegion());
      }
    }
    // Restore wishlist from URL if shared
    const wishlistParam = params.get('wishlist');
    if (wishlistParam) {
      setShowWishlist(true);
    }
  }, []);

  const regionCfg = REGION_CONFIG[region];
  const currentData: Product[] = activeCategory === 'blazers' ? BLAZERS : activeCategory === 'suits' ? SUITS : SHOES;

  const brands = useMemo(() => {
    return Array.from(new Set(currentData.map(i => i.brand))).sort();
  }, [activeCategory]);

  const filtered = useMemo(() => {
    let items = [...currentData];
    if (brandFilter !== 'all') items = items.filter(i => i.brand === brandFilter);
    items.sort((a, b) => priceSort === 'desc' ? b.priceHKD - a.priceHKD : a.priceHKD - b.priceHKD);
    return items;
  }, [currentData, brandFilter, priceSort]);

  const meta = CATEGORY_META[activeCategory];
  const categoryUrl = rewriteUrl(meta.mrporterUrl, region);

  return (
    <div style={{ background: '#faf9f7', minHeight: '100vh', paddingBottom: comparison.count > 0 ? '120px' : 0 }}>
      <Navigation />

      {/* ── HERO ── */}
      <section style={{ position: 'relative', color: '#fff', paddingTop: '120px', paddingBottom: '60px', overflow: 'hidden', background: '#111' }}>
        {/* Hero background image */}
        <img
          src={meta.heroImg}
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.4, pointerEvents: 'none' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.8) 100%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb */}
          <div style={{ fontFamily: F.mono, fontSize: '10px', letterSpacing: '0.12em', color: '#666', marginBottom: '32px', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Link href="/" style={{ color: '#666', textDecoration: 'none' }}>HOME</Link>
            <span>/</span>
            <span style={{ color: '#aaa' }}>READY TO WEAR</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <div style={{ fontFamily: F.mono, fontSize: '10px', letterSpacing: '0.15em', color: '#666', marginBottom: '12px' }}>
                CURATED FROM MR PORTER · {regionCfg.label.toUpperCase()}
              </div>
              <h1 style={{ fontFamily: F.display, fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 0.9, margin: 0, textTransform: 'uppercase' }}>
                READY<br />TO WEAR
              </h1>
            </div>
            <div style={{ maxWidth: '360px' }}>
              <p style={{ fontFamily: F.body, fontSize: '14px', color: '#aaa', lineHeight: 1.7, margin: 0 }}>
                The finest tailored clothing, shoes and accessories — curated by our editorial team. Every piece selected for cloth quality, construction and lasting value.
              </p>
              {/* Region selector */}
              <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: F.mono, fontSize: '10px', color: '#555', letterSpacing: '0.08em' }}>
                  PRICES IN HKD · LINKS FOR:
                </span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {(['APAC', 'US', 'UK', 'AU'] as Region[]).map(r => (
                    <button
                      key={r}
                      onClick={() => {
                        setRegion(r);
                        try { localStorage.setItem(REGION_KEY, r); } catch { /* ignore */ }
                      }}
                      style={{
                        fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.1em',
                        padding: '3px 8px', border: '1px solid',
                        borderColor: region === r ? '#fff' : '#444',
                        background: region === r ? '#fff' : 'transparent',
                        color: region === r ? '#111' : '#666',
                        cursor: 'pointer', transition: 'all 0.15s',
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                {region !== detectRegion() && (
                  <button
                    onClick={() => {
                      const auto = detectRegion();
                      setRegion(auto);
                      try { localStorage.removeItem(REGION_KEY); } catch { /* ignore */ }
                    }}
                    style={{
                      fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.08em',
                      color: '#555', background: 'none', border: 'none',
                      cursor: 'pointer', textDecoration: 'underline', padding: 0,
                    }}
                  >
                    reset
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#333', marginTop: '48px', borderTop: '1px solid #333' }}>
            {[
              { label: 'Blazers', value: BLAZERS.length },
              { label: 'Suit Jackets', value: SUITS.length },
              { label: 'Shoes', value: SHOES.length },
              { label: 'Saved', value: wishlist.count, action: () => setShowWishlist(true) },
            ].map(s => (
              <div
                key={s.label}
                style={{ background: '#111', padding: '16px 20px', cursor: s.action ? 'pointer' : 'default' }}
                onClick={s.action}
              >
                <div style={{ fontFamily: F.mono, fontSize: '24px', color: s.action && s.value > 0 ? '#c8a96e' : '#fff', letterSpacing: '-0.02em' }}>{s.value}</div>
                <div style={{ fontFamily: F.mono, fontSize: '9px', color: '#555', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '2px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOOLBAR ── */}
      <section style={{ background: '#fff', borderBottom: '1px solid #e8e4df', position: 'sticky', top: '64px', zIndex: 40 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Category tabs */}
          <div style={{ display: 'flex' }}>
            {(Object.keys(CATEGORY_META) as Category[]).map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setBrandFilter('all'); }}
                style={{
                  fontFamily: F.display, fontSize: '14px', letterSpacing: '0.08em', textTransform: 'uppercase',
                  padding: '18px 24px', border: 'none',
                  borderBottom: activeCategory === cat ? '2px solid #111' : '2px solid transparent',
                  background: 'transparent',
                  color: activeCategory === cat ? '#111' : '#888',
                  cursor: 'pointer', transition: 'color 0.15s',
                }}
              >
                {CATEGORY_META[cat].label}
                <span style={{ fontFamily: F.mono, fontSize: '10px', marginLeft: '6px', color: activeCategory === cat ? '#555' : '#bbb' }}>
                  ({CATEGORY_META[cat].count})
                </span>
              </button>
            ))}
          </div>
          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {/* Build a Look */}
            <button
              onClick={() => setShowBuildALook(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                fontFamily: F.mono, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '8px 12px', border: '1px solid #ddd', background: '#fff',
                color: '#555', cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              <Layers size={12} /> Build a Look
            </button>
            {/* Wishlist */}
            <button
              onClick={() => setShowWishlist(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                fontFamily: F.mono, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '8px 12px', border: '1px solid',
                borderColor: wishlist.count > 0 ? '#c8a96e' : '#ddd',
                background: wishlist.count > 0 ? '#fffbf5' : '#fff',
                color: wishlist.count > 0 ? '#8B6914' : '#555',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              <Bookmark size={12} />
              Wishlist {wishlist.count > 0 && `(${wishlist.count})`}
            </button>
            {/* Compare */}
            {comparison.count > 0 && (
              <button
                onClick={() => {}}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  fontFamily: F.mono, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '8px 12px', border: '1px solid #111', background: '#111',
                  color: '#fff', cursor: 'pointer',
                }}
              >
                <BarChart2 size={12} /> Comparing ({comparison.count})
              </button>
            )}

          </div>
        </div>

        {/* Brand filter — always visible */}
        <div style={{ borderTop: '1px solid #f0ece8', background: '#fff', padding: '10px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.12em', color: '#aaa', textTransform: 'uppercase', marginRight: '4px', whiteSpace: 'nowrap' }}>Brand</span>
            {['all', ...brands].map(b => (
              <button
                key={b}
                onClick={() => setBrandFilter(b)}
                style={{
                  fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.06em', textTransform: 'uppercase',
                  padding: '4px 10px', border: '1px solid',
                  borderColor: brandFilter === b ? '#111' : '#e0dbd5',
                  background: brandFilter === b ? '#111' : 'transparent',
                  color: brandFilter === b ? '#fff' : '#666',
                  cursor: 'pointer', transition: 'all 0.15s',
                  borderRadius: '2px',
                }}
              >
                {b === 'all' ? 'All' : b}
              </button>
            ))}
            {/* Sort on the right */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}>
              <span style={{ fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.12em', color: '#aaa', textTransform: 'uppercase' }}>Sort</span>
              {[{ val: 'desc' as const, label: 'High → Low' }, { val: 'asc' as const, label: 'Low → High' }].map(s => (
                <button
                  key={s.val}
                  onClick={() => setPriceSort(s.val)}
                  style={{
                    fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.06em',
                    padding: '4px 10px', border: '1px solid',
                    borderColor: priceSort === s.val ? '#111' : '#e0dbd5',
                    background: priceSort === s.val ? '#111' : 'transparent',
                    color: priceSort === s.val ? '#fff' : '#666',
                    cursor: 'pointer', transition: 'all 0.15s',
                    borderRadius: '2px',
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY HEADER ── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid #e8e4df', paddingBottom: '24px' }}>
          <div>
            <h2 style={{ fontFamily: F.display, fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, letterSpacing: '-0.01em', textTransform: 'uppercase', margin: '0 0 8px', color: '#111' }}>
              {meta.label}
            </h2>
            <p style={{ fontFamily: F.body, fontSize: '14px', color: '#666', lineHeight: 1.6, margin: 0, maxWidth: '560px' }}>
              {meta.desc}
            </p>
          </div>
          <a
            href={categoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: F.display, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '10px 20px', border: '1px solid #111', background: '#111', color: '#fff',
              textDecoration: 'none', transition: 'background 0.15s', whiteSpace: 'nowrap',
            }}
          >
            View All on MR PORTER <ExternalLink size={12} />
          </a>
        </div>
        <div style={{ fontFamily: F.mono, fontSize: '10px', letterSpacing: '0.1em', color: '#888', marginTop: '16px' }}>
          {filtered.length} {filtered.length === 1 ? 'ITEM' : 'ITEMS'}
          {brandFilter !== 'all' && ` · ${brandFilter}`}
          {comparison.count > 0 && ` · ${comparison.count} in comparison`}
        </div>
      </section>

      {/* ── RECENTLY VIEWED ── */}
      {recentlyViewed.ids.length > 0 && (() => {
        const allProducts = [...BLAZERS, ...SUITS, ...SHOES];
        const rvItems = recentlyViewed.ids
          .map(id => allProducts.find(p => p.id === id))
          .filter(Boolean) as Product[];
        if (rvItems.length === 0) return null;
        return (
          <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 40px' }}>
            <div style={{ borderBottom: '1px solid #e8e4df', paddingBottom: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.15em', color: '#888', textTransform: 'uppercase' }}>Recently Viewed</div>
              <div style={{ flex: 1, height: '1px', background: '#e8e4df' }} />
              <button
                onClick={recentlyViewed.clear}
                style={{
                  fontFamily: F.mono, fontSize: '8px', letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0',
                  flexShrink: 0,
                }}
                title="Clear browsing history"
              >
                Clear
              </button>
            </div>
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
              {rvItems.map(item => {
                const cat: Category = BLAZERS.some(b => b.id === item.id) ? 'blazers' : SUITS.some(s => s.id === item.id) ? 'suits' : 'shoes';
                return (
                  <a
                    key={item.id}
                    href={rewriteUrl(item.url, region)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => recentlyViewed.track(item.id)}
                    style={{ textDecoration: 'none', color: 'inherit', flexShrink: 0, width: '140px' }}
                  >
                    <div style={{ border: '1px solid #e8e4df', background: '#fff' }}>
                      <div style={{ aspectRatio: '3/4', overflow: 'hidden', background: '#f5f3f0' }}>
                        <img src={item.img} alt={item.name} width={140} height={187} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ padding: '8px 10px' }}>
                        <div style={{ fontFamily: F.mono, fontSize: '8px', color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px' }}>{item.brand}</div>
                        <div style={{ fontFamily: F.display, fontSize: '11px', color: '#111', lineHeight: 1.3, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{item.name}</div>
                        <div style={{ fontFamily: F.mono, fontSize: '10px', color: '#111', fontWeight: 600, marginTop: '4px' }}>HK${item.priceHKD.toLocaleString()}</div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })()}

      {/* ── PRODUCT GRID ── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '16px',
        }}>
          {filtered.map((item, i) => (
            <ProductCard
              key={item.id + item.brand}
              item={item}
              index={i}
              href={rewriteUrl(item.url, region)}
              category={activeCategory}
              wishlisted={wishlist.isWishlisted(activeCategory, item.id)}
              onWishlist={() => wishlist.toggle(activeCategory, item)}
              comparing={comparison.isComparing(activeCategory, item.id)}
              onCompare={() => comparison.toggle(activeCategory, item)}
              onView={() => recentlyViewed.track(item.id)}
              region={region}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', fontFamily: F.mono, fontSize: '12px', color: '#aaa', letterSpacing: '0.1em' }}>
            NO ITEMS MATCH YOUR FILTERS
          </div>
        )}
      </section>

      {/* ── BESPOKE CTA ── */}
      <section style={{ background: '#111', color: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: F.mono, fontSize: '10px', letterSpacing: '0.15em', color: '#555', marginBottom: '20px' }}>
            § THE TAILOR.HK PROPOSITION
          </div>
          <h2 style={{ fontFamily: F.display, fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 700, letterSpacing: '-0.01em', textTransform: 'uppercase', margin: '0 0 24px', lineHeight: 0.95 }}>
            READY TO WEAR<br />IS JUST THE START
          </h2>
          <p style={{ fontFamily: F.body, fontSize: '16px', color: '#aaa', lineHeight: 1.8, margin: '0 0 40px' }}>
            Every piece here represents the finest that ready-to-wear can offer. But for a suit that fits your exact measurements, your posture, your cloth preference — bespoke tailoring from Hong Kong's finest houses offers something no rack can match.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/tailored-menswear"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontFamily: F.display, fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '14px 28px', background: '#fff', color: '#111',
                textDecoration: 'none', transition: 'background 0.15s',
              }}
            >
              Explore Bespoke Tailoring
            </Link>
            <Link
              href="/tailor-finder-quiz"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontFamily: F.display, fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '14px 28px', border: '1px solid #444', color: '#aaa',
                textDecoration: 'none', transition: 'border-color 0.15s, color 0.15s',
              }}
            >
              Find Your Tailor
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* ── OVERLAYS ── */}
      {showWishlist && (
        <WishlistPanel
          items={wishlist.items}
          region={region}
          onRemove={(cat, id) => {
            const item = [...BLAZERS, ...SUITS, ...SHOES].find(p => p.id === id);
            if (item) wishlist.toggle(cat as Category, item);
          }}
          onClear={wishlist.clear}
          onClose={() => setShowWishlist(false)}
        />
      )}

      {showBuildALook && (
        <BuildALook
          region={region}
          onClose={() => setShowBuildALook(false)}
          onSaveLook={(lookName, jacket, shoe) => {
            wishlist.addLook(lookName, jacket, shoe);
          }}
        />
      )}

      {/* ── COMPARISON BAR ── */}
      <ComparisonPanel
        items={comparison.items}
        region={region}
        onRemove={(cat, id) => {
          const item = [...BLAZERS, ...SUITS, ...SHOES].find(p => p.id === id);
          if (item) comparison.toggle(cat as Category, item);
        }}
        onClear={comparison.clear}
      />
    </div>
  );
}
