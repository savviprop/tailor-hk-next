"use client";
/**
 * TAILOR.HK — NAVIGATION
 * Design: Technical editorial — status bar + megamenu panels
 * Fonts: Barlow Condensed (nav links) + JetBrains Mono (status bar data)
 * Desktop: Full-width megamenu panels with grouped columns + featured highlight
 * Mobile: Hamburger → full-screen overlay with section-numbered links
 * Favourites: Slide-out enquiry list drawer with WhatsApp CTA
 */

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "@/lib/wouter-shim";
import { Menu, X, ChevronDown, ShoppingBag, Trash2, Search, ArrowRight, Bookmark } from "lucide-react";
import { useReadingList } from "@/contexts/ReadingListContext";
import { useFavourites } from "@/contexts/FavouritesContext";
import { pageEnquiryUrl } from "@/lib/whatsapp";

const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  mono:    '"JetBrains Mono", "Courier New", monospace',
  body:    '"Barlow", Arial, sans-serif',
};

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
  { id: "liverano", name: "Liverano & Liverano", city: "Florence", tradition: "Florentine" },
  { id: "chittleborough-morgan", name: "Chittleborough & Morgan", city: "London", tradition: "Savile Row" },
  { id: "richard-james", name: "Richard James", city: "London", tradition: "Savile Row" },
  { id: "ozwald-boateng", name: "Ozwald Boateng", city: "London", tradition: "Savile Row" },
  { id: "edward-sexton", name: "Edward Sexton", city: "London", tradition: "Savile Row" },
  { id: "thom-sweeney", name: "Thom Sweeney", city: "London", tradition: "Savile Row" },
  { id: "b-and-tailor", name: "B&Tailor", city: "Seoul", tradition: "Korean" },
  { id: "solito", name: "Solito", city: "Naples", tradition: "Neapolitan" },
  { id: "dege-and-skinner", name: "Dege & Skinner", city: "London", tradition: "Savile Row" },
  { id: "ascot-chang", name: "Ascot Chang", city: "Hong Kong", tradition: "Hong Kong" },
  { id: "dorsia", name: "Dorsia", city: "Hong Kong", tradition: "Hong Kong" },
  { id: "saman-amel", name: "Atelier Saman Amel", city: "Stockholm", tradition: "Scandinavian" },
];

// ── MEGAMENU DATA ─────────────────────────────────────────────────────────────
// Each nav item defines columns (groups of links) and an optional featured panel

interface MegaLink { label: string; href: string; note?: string; isAnchor?: boolean; thumb?: string }
interface MegaColumn { heading: string; links: MegaLink[] }
interface MegaFeatured { label: string; headline: string; body: string; cta: string; href: string; img?: string }
interface NavItem {
  label: string;
  href: string;
  columns?: MegaColumn[];
  featured?: MegaFeatured;
  simple?: boolean; // no megamenu
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Tailoring",
    href: "/tailored-menswear",
    columns: [
      {
        heading: "BESPOKE & MTM",
        links: [
          { label: "Tailored Menswear", href: "/tailored-menswear", note: "FULL PRODUCT CATALOGUE" },
          { label: "How It Works", href: "/how-it-works", note: "THE COMMISSION PROCESS" },
          { label: "Suits by Tailor", href: "/suits-by-tailor", note: "BY HOUSE & TRADITION" },
          { label: "Executive Tailoring", href: "/executive-tailoring", note: "CORPORATE WARDROBE" },
        ],
      },
      {
        heading: "PRODUCTS",
        links: [
          { label: "Suits", href: "/tailored-menswear?cat=suits", note: "FROM HK$12,800", thumb: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/pVEPkPApyWtkArag.jpg" },
          { label: "Blazers & Sport Coats", href: "/tailored-menswear?cat=blazers", note: "FROM HK$8,800", thumb: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/obhGYlwXMWixoiXP.jpg" },
          { label: "Trousers & Chinos", href: "/tailored-menswear?cat=trousers", note: "FROM HK$2,800", thumb: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/UWwCBVIXIYjINQjZ.jpg" },
          { label: "Dress Shirts", href: "/tailored-menswear?cat=shirts", note: "FROM HK$1,800", thumb: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/KVgzkgDrbzwsZQhk.jpg" },
          { label: "Overcoats", href: "/tailored-menswear?cat=overcoats", note: "FROM HK$10,800", thumb: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/HOkQPWLKCHoIdruX.jpg" },
        ],
      },
    ],
    featured: {
      label: "ATELIER DIRECT",
      headline: "ACCESS WORLD CRAFT",
      body: "Bespoke and MTM at atelier-direct rates. No intermediary. Full floating canvas, hand-padded lapels, working surgeon's cuffs.",
      cta: "VIEW TIERS →",
      href: "/atelier-direct",
      img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/pVEPkPApyWtkArag.jpg",
    },
  },
  {
    label: "Ready to Wear",
    href: "/ready-to-wear",
    columns: [
      {
        heading: "CATEGORIES",
        links: [
          { label: "Blazers", href: "/ready-to-wear", note: "KITON, TOM FORD, BRIONI", thumb: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/PmAHRBUiaBlSGhii.jpg" },
          { label: "Suits", href: "/ready-to-wear?cat=suits", note: "INVESTMENT-GRADE RTW", isAnchor: true, thumb: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/iiwfHtsspNExjqdN.jpg" },
          { label: "Shoes", href: "/ready-to-wear?cat=shoes", note: "JOHN LOBB, BERLUTI", isAnchor: true, thumb: "https://www.mrporter.com/variants/images/3607804572092314/in/w764_q60.jpg" },
        ],
      },
      {
        heading: "CONSULTANCY",
        links: [
          { label: "Wardrobe Consultancy", href: "/wardrobe-consultancy", note: "FULL WARDROBE AUDIT" },
          { label: "Build a Look", href: "/ready-to-wear", note: "JACKET + SHOE PAIRING" },
          { label: "Tailor Finder Brief", href: "/tailor-finder-quiz", note: "PERSONALISED RECOMMENDATION" },
        ],
      },
    ],
    featured: {
      label: "EDITORIAL",
      headline: "WORLD'S BEST TAILORING",
      body: "50+ houses profiled — Savile Row, Neapolitan, Parisian, and Hong Kong. Scoring across construction, cloth, and value.",
      cta: "EXPLORE HOUSES →",
      href: "/worlds-best-tailoring",
      img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/ELTmQJGEAkQMOFIc.png",
    },
  },
  {
    label: "Services",
    href: "/how-it-works",
    columns: [
      {
        heading: "ATELIER SERVICES",
        links: [
          { label: "Atelier Direct", href: "/atelier-direct", note: "ENTRY · MID · INVESTMENT · ULTRA" },
          { label: "How It Works", href: "/how-it-works", note: "COMMISSION PROCESS" },
          { label: "Concierge", href: "/concierge", note: "WHITE-GLOVE SERVICE" },
          { label: "Procurement", href: "/procurement", note: "FABRIC & MILL SOURCING" },
        ],
      },
      {
        heading: "CORPORATE",
        links: [
          { label: "Executive Tailoring", href: "/executive-tailoring", note: "C-SUITE WARDROBE" },
          { label: "Corporate Rewards", href: "/corporate-rewards", note: "TEAM GIFTING & UNIFORMS" },
          { label: "Wardrobe Consultancy", href: "/wardrobe-consultancy", note: "FULL WARDROBE AUDIT" },
        ],
      },
    ],
    featured: {
      label: "START HERE",
      headline: "BEGIN YOUR BRIEF",
      body: "Six questions. A personalised tailor recommendation with tier, cloth, and price guidance matched to your requirements.",
      cta: "START THE BRIEF →",
      href: "/tailor-finder-quiz",
      img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/TkBztkkzndumsmvs.jpeg",
    },
  },
  {
    label: "Guides",
    href: "/tailor-guides",
    columns: [
      {
        heading: "HONG KONG TAILORING",
        links: [
          { label: "Hong Kong's Finest Tailoring", href: "/tailor-guides/hk-finest-tailoring", note: "DEFINITIVE HOUSE PROFILES", thumb: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/JocirFuxVRRDODTn.png" },
          { label: "History of HK Tailors", href: "/tailor-guides/history-of-hong-kong-tailors", note: "FROM 1940S TO TODAY", thumb: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/vZohfRHuGkfkYyNX.webp" },
          { label: "16 MTM Services in HK", href: "/tailor-guides/menswear-made-to-measure-services-in-hong-kong", note: "FULL DIRECTORY", thumb: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/sBvBwNIutekhAVDb.webp" },
        ],
      },
      {
        heading: "EDUCATION",
        links: [
          { label: "Bespoke vs MTM vs RTW", href: "/tailor-guides/bespoke-made-to-measure-and-ready-to-wear-suit-guide", note: "THE DEFINITIVE GUIDE", thumb: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/shLtnQaQLmeQtCVt.png" },
          { label: "Hallmarks of Bespoke", href: "/tailor-guides/hallmarks-of-true-bespoke-tailoring-hk", note: "WHAT TO LOOK FOR", thumb: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/BCPCFwhZtBZhFCnB.webp" },
          { label: "Suit Fabrics Guide", href: "/tailor-guides/essential-guide-to-suit-fabrics", note: "MILLS & WEIGHTS", thumb: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/prqGrMlrEOEEDwqq.jpeg" },
          { label: "Fabric A–Z Glossary", href: "/tailor-guides/az-glossary-suit-fabrics", note: "COMPLETE REFERENCE", thumb: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/UrBEPCFHfGPUREui.webp" },
          { label: "How to Fit a Suit", href: "/tailor-guides/how-to-fit-a-suit", note: "EVERY MEASUREMENT POINT", thumb: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/uwaKhgkUgoVlFbTn.webp" },
        ],
      },
      {
        heading: "REFERENCE",
        links: [
          { label: "All Guides", href: "/tailor-guides", note: "25+ EDITORIAL GUIDES", thumb: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/giuPnOgOQMqYhiOV.webp" },
          { label: "Production Index", href: "/production-index", note: "RESEARCH & DATA", thumb: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/cFAyiwvtfArxrpOB.webp" },
          { label: "World's Best Tailoring", href: "/worlds-best-tailoring", note: "50+ HOUSES", thumb: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/INJQJnMGaXUHzrAO.jpeg" },
          { label: "Compare Houses", href: "/compare", note: "SIDE-BY-SIDE ANALYSIS", thumb: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/OXMIPsxwTZzHVBjB.webp" },
          { label: "Fabric Compendium", href: "/loro-piana-anthology", note: "MILLS & COLLECTIONS", thumb: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/prqGrMlrEOEEDwqq.jpeg" },
        ],
      },
    ],
    featured: {
      label: "INTERACTIVE",
      headline: "TAILOR FINDER BRIEF",
      body: "Answer six questions for a personalised recommendation — tradition, tier, cloth, and price guidance tailored to you.",
      cta: "START THE BRIEF →",
      href: "/tailor-finder-quiz",
      img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/prqGrMlrEOEEDwqq.jpeg",
    },
  },
  { label: "About", href: "/about", simple: true },
  { label: "Contact", href: "/contact", simple: true },
];

// Flat list for mobile menu (same as before)
const NAV_LINKS = NAV_ITEMS.map(item => ({
  label: item.label,
  href: item.href,
  children: item.columns
    ? item.columns.flatMap(col => col.links.map(l => ({ label: l.label, href: l.href, isAnchor: l.isAnchor })))
    : undefined,
}));

function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return scrolled;
}

function useIsMobile(bp = 1024) {
  const [mobile, setMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < bp : false
  );
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < bp);
    window.addEventListener("resize", fn, { passive: true });
    return () => window.removeEventListener("resize", fn);
  }, [bp]);
  return mobile;
}

function useHKTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-HK", {
          timeZone: "Asia/Hong_Kong",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [favOpen, setFavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<typeof TAILOR_INDEX>([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [isMTM, setIsMTM] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchOverlayRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const scrolled = useScrolled();
  const isMobile = useIsMobile();
  const hkTime = useHKTime();
  const [location, navigate] = useLocation();
  const { favourites, removeFavourite, count, sendEnquiry, clearFavourites, updateNote, bookConsultation } = useFavourites();
  const { bookmarks } = useReadingList();

  useEffect(() => { setMenuOpen(false); setActiveMenu(null); }, [location]);
  useEffect(() => {
    document.body.style.overflow = (menuOpen || favOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, favOpen]);

  // Close search on outside click
  useEffect(() => {
    if (!searchOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (searchOverlayRef.current && !searchOverlayRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSearchQuery("");
        setShowSearchSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [searchOpen]);

  // Close search on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
        setShowSearchSuggestions(false);
        setActiveMenu(null);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [searchOpen]);

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (q.trim().length < 1) { setSearchSuggestions([]); setShowSearchSuggestions(false); return; }
    const lower = q.toLowerCase();
    const matches = TAILOR_INDEX.filter(
      (t) => t.name.toLowerCase().includes(lower) || t.city.toLowerCase().includes(lower) || t.tradition.toLowerCase().includes(lower)
    ).slice(0, 6);
    setSearchSuggestions(matches);
    setShowSearchSuggestions(true);
  };

  const handleSearchSelect = (tailor: { id: string; name: string }) => {
    setSearchQuery("");
    setShowSearchSuggestions(false);
    setSearchOpen(false);
    navigate(`/worlds-best-tailoring?q=${encodeURIComponent(tailor.name)}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchSuggestions(false);
      setSearchOpen(false);
      navigate(`/worlds-best-tailoring?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 60);
  };

  const activeItem = NAV_ITEMS.find(item => item.label === activeMenu);

  return (
    <>
      {/* ── STATUS BAR ── */}
      <div style={{ backgroundColor: "#111", borderBottom: "1px solid #222" }}>
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "5px 20px",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px", overflow: "hidden" }}>
            <span style={{
              display: "flex", alignItems: "center", gap: "5px",
              fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.06em", color: "#888",
              whiteSpace: "nowrap",
            }}>
              <span style={{
                display: "inline-block", width: "5px", height: "5px",
                borderRadius: "50%", background: "#22c55e", flexShrink: 0,
                animation: "pulse-dot 2.5s ease-in-out infinite",
              }} />
              ATELIER ONLINE
            </span>
            {!isMobile && (
              <>
                <span style={{ color: "#333", fontFamily: F.mono, fontSize: "9px" }}>|</span>
                <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.06em", color: "#666", whiteSpace: "nowrap" }}>
                  BY APPOINTMENT · HONG KONG
                </span>
                <span style={{ color: "#333", fontFamily: F.mono, fontSize: "9px" }}>|</span>
                <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.06em", color: "#666", whiteSpace: "nowrap" }}>
                  ATELIER DIRECT · ACCESS BY ENQUIRY
                </span>
              </>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
            {!isMobile && (
              <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.06em", color: "#555", whiteSpace: "nowrap" }}>
                HKT {hkTime}
              </span>
            )}
            <a
              href={pageEnquiryUrl("Navigation")}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.06em", color: "#22c55e", whiteSpace: "nowrap" }}
            >
              WHATSAPP →
            </a>
          </div>
        </div>
      </div>

      {/* ── MAIN NAV ── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: "#fff",
          borderBottom: activeMenu ? "none" : "1px solid #e2e2e2",
          transition: "box-shadow 0.2s",
          boxShadow: scrolled && !activeMenu ? "0 1px 12px rgba(0,0,0,0.06)" : "none",
        }}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div
          className="container"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "52px" }}
        >
          {/* Logo */}
          <Link href="/">
            <span style={{
              fontFamily: F.display,
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#111",
              userSelect: "none",
            }}>
              TAILORS
            </span>
          </Link>

          {/* Desktop nav items */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center" }}>
              {NAV_ITEMS.map((item) =>
                item.simple ? (
                  <Link key={item.label} href={item.href}>
                    <span
                      style={{
                        display: "inline-flex", alignItems: "center",
                        padding: "0 14px", height: "52px",
                        fontFamily: F.display, fontSize: "11px", fontWeight: 600,
                        letterSpacing: "0.14em", textTransform: "uppercase",
                        color: location === item.href ? "#111" : "#666",
                        borderBottom: location === item.href ? "2px solid #111" : "2px solid transparent",
                        transition: "color 0.15s, border-color 0.15s", whiteSpace: "nowrap",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.color = "#111"; setActiveMenu(null); }}
                      onMouseLeave={(e) => { if (location !== item.href) (e.currentTarget as HTMLSpanElement).style.color = "#666"; }}
                    >
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <div
                    key={item.label}
                    style={{ position: "relative", height: "52px", display: "flex", alignItems: "center" }}
                    onMouseEnter={() => setActiveMenu(item.label)}
                  >
                    <Link href={item.href}>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: "3px",
                        padding: "0 14px", height: "52px",
                        fontFamily: F.display, fontSize: "11px", fontWeight: 600,
                        letterSpacing: "0.14em", textTransform: "uppercase",
                        color: activeMenu === item.label || location.startsWith(item.href) ? "#111" : "#666",
                        borderBottom: activeMenu === item.label ? "2px solid #111" : location.startsWith(item.href) ? "2px solid #111" : "2px solid transparent",
                        transition: "color 0.15s, border-color 0.15s", whiteSpace: "nowrap",
                        cursor: "pointer",
                      }}>
                        {item.label}
                        <ChevronDown size={10} style={{
                          transition: "transform 0.2s",
                          transform: activeMenu === item.label ? "rotate(180deg)" : "none",
                          marginTop: "1px",
                        }} />
                      </span>
                    </Link>
                  </div>
                )
              )}
            </div>
          )}

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {!isMobile && (
              <Link href="/tailor-finder-quiz">
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "5px",
                  padding: "7px 16px", border: "1px solid #111", background: "transparent",
                  fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em",
                  color: "#111", transition: "background 0.18s, color 0.18s", whiteSpace: "nowrap",
                  cursor: "pointer",
                }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLSpanElement; el.style.background = "#111"; el.style.color = "#fff"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLSpanElement; el.style.background = "transparent"; el.style.color = "#111"; }}
                >
                  START YOUR BRIEF →
                </span>
              </Link>
            )}
            {/* Reading list icon */}
            <a
              href="/reading-list"
              style={{ background: "none", border: "none", padding: "4px", display: "flex", alignItems: "center", position: "relative", cursor: "pointer", textDecoration: "none" }}
              aria-label="Reading list"
            >
              <Bookmark size={17} color="#111" fill={bookmarks.length > 0 ? "#111" : "none"} />
              {bookmarks.length > 0 && (
                <span style={{
                  position: "absolute", top: "-2px", right: "-4px",
                  backgroundColor: "#c9a96e", color: "#fff",
                  borderRadius: "50%", width: "14px", height: "14px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: F.mono, fontSize: "7px", fontWeight: 700,
                }}>{bookmarks.length}</span>
              )}
            </a>
            {/* Search icon */}
            <button
              onClick={openSearch}
              style={{ background: "none", border: "none", padding: "4px", display: "flex", alignItems: "center", cursor: "pointer" }}
              aria-label="Search houses"
            >
              <Search size={17} color="#111" />
            </button>
            {/* Enquiry list icon */}
            <button
              onClick={() => setFavOpen(true)}
              style={{ background: "none", border: "none", padding: "4px", display: "flex", alignItems: "center", position: "relative", cursor: "pointer" }}
              aria-label="Enquiry list"
            >
              <ShoppingBag size={18} color="#111" />
              {count > 0 && (
                <span style={{
                  position: "absolute", top: "-2px", right: "-4px",
                  backgroundColor: "#111", color: "#fff",
                  borderRadius: "50%", width: "14px", height: "14px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: F.mono, fontSize: "7px", fontWeight: 700,
                }}>{count}</span>
              )}
            </button>
            {isMobile && (
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{ background: "none", border: "none", padding: "4px", display: "flex", alignItems: "center" }}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                {menuOpen ? <X size={20} color="#111" /> : <Menu size={20} color="#111" />}
              </button>
            )}
          </div>
        </div>

        {/* ── MEGAMENU PANEL ── */}
        {!isMobile && activeItem && !activeItem.simple && (
          <div
            ref={megaMenuRef}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: "#fff",
              borderTop: "1px solid #e2e2e2",
              borderBottom: "2px solid #111",
              boxShadow: "0 12px 40px rgba(0,0,0,0.10)",
              zIndex: 200,
              animation: "megaSlideDown 0.18s ease-out",
            }}
          >
            <div className="container" style={{ padding: "0 20px" }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: activeItem.columns
                  ? `${activeItem.columns.map(() => "1fr").join(" ")} 300px`
                  : "1fr 300px",
                gap: "0",
                minHeight: "280px",
              }}>
                {/* Link columns */}
                {activeItem.columns?.map((col, ci) => (
                  <div
                    key={ci}
                    style={{
                      padding: "32px 32px 32px 0",
                      borderRight: "1px solid #f0f0f0",
                      paddingRight: "32px",
                      paddingLeft: ci === 0 ? "0" : "32px",
                    }}
                  >
                    <div style={{
                      fontFamily: F.mono,
                      fontSize: "8px",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "#bbb",
                      marginBottom: "18px",
                      paddingBottom: "10px",
                      borderBottom: "1px solid #f0f0f0",
                    }}>
                      {col.heading}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      {col.links.map((link, li) => (
                        link.isAnchor ? (
                          <a
                            key={li}
                            href={link.href}
                            style={{ textDecoration: "none", display: "block" }}
                          >
                            <MegaLinkItem link={link} F={F} />
                          </a>
                        ) : (
                          <Link key={li} href={link.href}>
                            <MegaLinkItem link={link} F={F} />
                          </Link>
                        )
                      ))}
                    </div>
                  </div>
                ))}

                {/* Featured panel */}
                {activeItem.featured && (
                  <div style={{
                    padding: "0",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    overflow: "hidden",
                    position: "relative",
                    minHeight: "280px",
                    alignSelf: "stretch",
                    backgroundImage: activeItem.featured.img
                      ? `url(${activeItem.featured.img})`
                      : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                    backgroundColor: "#111",
                  }}>
                    {/* gradient overlay for text legibility */}
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.88) 100%)",
                      zIndex: 1,
                    }} />
                    <div style={{ position: "relative", zIndex: 2, padding: "28px 24px", display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
                    <div>
                      <div style={{
                        fontFamily: F.mono,
                        fontSize: "8px",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "#c9a96e",
                        marginBottom: "14px",
                      }}>
                        {activeItem.featured.label}
                      </div>
                      <div style={{
                        fontFamily: F.display,
                        fontSize: "22px",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#fff",
                        lineHeight: 1.1,
                        marginBottom: "12px",
                      }}>
                        {activeItem.featured.headline}
                      </div>
                      <p style={{
                        fontFamily: F.body,
                        fontSize: "12.5px",
                        lineHeight: 1.7,
                        color: "rgba(255,255,255,0.55)",
                        margin: 0,
                      }}>
                        {activeItem.featured.body}
                      </p>
                    </div>
                    <Link href={activeItem.featured.href}>
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        marginTop: "20px",
                        fontFamily: F.mono,
                        fontSize: "9px",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#c9a96e",
                        cursor: "pointer",
                        transition: "color 0.15s",
                      }}>
                        {activeItem.featured.cta} <ArrowRight size={10} />
                      </span>
                    </Link>
                    </div>{/* end inner wrapper */}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── SEARCH OVERLAY ── */}
        {searchOpen && (
          <div
            ref={searchOverlayRef}
            style={{
              position: "absolute", top: "100%", left: 0, right: 0,
              backgroundColor: "#fff",
              borderBottom: "2px solid #111",
              boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
              zIndex: 300,
              padding: "20px",
              animation: "slideDown 0.18s ease-out",
            }}
          >
            <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: "0", maxWidth: "600px", margin: "0 auto" }}>
              <div style={{ position: "relative", flex: 1 }}>
                <Search size={14} color="#999" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search 50+ tailoring houses by name, city, or tradition..."
                  style={{
                    width: "100%",
                    fontFamily: F.mono,
                    fontSize: "11px",
                    letterSpacing: "0.04em",
                    padding: "11px 14px 11px 36px",
                    backgroundColor: "#f8f8f8",
                    border: "1px solid #e2e2e2",
                    borderRight: "none",
                    color: "#111",
                    outline: "none",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  padding: "11px 20px",
                  backgroundColor: "#111", color: "#fff",
                  border: "none", cursor: "pointer",
                  fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em",
                  textTransform: "uppercase", whiteSpace: "nowrap",
                }}
              >
                SEARCH
              </button>
            </form>
            {showSearchSuggestions && searchSuggestions.length > 0 && (
              <div style={{ maxWidth: "600px", margin: "0 auto", marginTop: "4px", border: "1px solid #e2e2e2", borderTop: "none", backgroundColor: "#fff" }}>
                {searchSuggestions.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleSearchSelect(t)}
                    style={{
                      display: "flex", alignItems: "center", gap: "6px",
                      width: "100%", padding: "9px 14px",
                      backgroundColor: "transparent", border: "none",
                      cursor: "pointer", textAlign: "left",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#f8f8f8"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}
                  >
                    <span style={{ fontFamily: F.body, fontSize: "13px", color: "#111", letterSpacing: "0.01em" }}>{t.name}</span>
                    <span style={{ fontFamily: F.mono, fontSize: "8px", color: "#888", letterSpacing: "0.08em", textTransform: "uppercase" }}>{t.city} · {t.tradition}</span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => { setShowSearchSuggestions(false); setSearchOpen(false); navigate(`/worlds-best-tailoring?q=${encodeURIComponent(searchQuery.trim())}`); setSearchQuery(""); }}
                  style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    width: "100%", padding: "9px 14px",
                    backgroundColor: "transparent", border: "none",
                    cursor: "pointer", textAlign: "left",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#f8f8f8"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}
                >
                  <span style={{ fontFamily: F.mono, fontSize: "8px", color: "#888", letterSpacing: "0.1em", textTransform: "uppercase" }}>View all results for "{searchQuery}" →</span>
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* ── MOBILE MENU ── */}
      {isMobile && menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 150,
          backgroundColor: "#fff", overflowY: "auto",
          display: "flex", flexDirection: "column",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", height: "52px", borderBottom: "1px solid #e2e2e2" }}>
            <Link href="/">
              <span style={{ fontFamily: F.display, fontSize: "22px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "#111" }}>TAILORS</span>
            </Link>
            <button onClick={() => setMenuOpen(false)} style={{ background: "none", border: "none", padding: "4px", display: "flex" }}>
              <X size={20} color="#111" />
            </button>
          </div>
          <nav style={{ flex: 1, padding: "24px 20px" }}>
            {NAV_LINKS.map((link, idx) => (
              <div key={link.label} style={{ borderBottom: "1px solid #f0f0f0" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0" }}>
                  <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: "#bbb", marginRight: "12px" }}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <Link href={link.href} style={{ flex: 1 }}>
                    <span style={{ fontFamily: F.display, fontSize: "18px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#111" }}>
                      {link.label}
                    </span>
                  </Link>
                </div>
                {link.children && (
                  <div style={{ paddingLeft: "28px", paddingBottom: "12px" }}>
                    {link.children.map((child) => {
                      if ((child as { isAnchor?: boolean }).isAnchor) {
                        return (
                          <a
                            key={child.label}
                            href={child.href}
                            style={{ display: "block", padding: "7px 0", fontFamily: F.display, fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", textDecoration: "none" }}
                          >
                            {child.label}
                          </a>
                        );
                      }
                      return (
                        <Link key={child.label} href={child.href}>
                          <span style={{ display: "block", padding: "7px 0", fontFamily: F.display, fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666" }}>
                            {child.label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div style={{ padding: "20px", borderTop: "1px solid #e2e2e2" }}>
            <Link href="/tailor-finder-quiz">
              <span style={{
                display: "block", textAlign: "center", padding: "14px",
                backgroundColor: "#111", color: "#fff",
                fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase",
              }}>
                START YOUR BRIEF →
              </span>
            </Link>
          </div>
        </div>
      )}

      {/* ── FAVOURITES DRAWER ── */}
      {favOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex" }}
          onClick={() => setFavOpen(false)}
        >
          {/* Backdrop */}
          <div style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.35)" }} />
          {/* Panel */}
          <div
            style={{
              width: "min(400px, 100vw)", backgroundColor: "#fff",
              display: "flex", flexDirection: "column", height: "100%",
              boxShadow: "-4px 0 24px rgba(0,0,0,0.12)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ padding: "20px", borderBottom: "1px solid #e8e8e8", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontFamily: F.display, fontSize: "14px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#111" }}>
                  ENQUIRY LIST
                </div>
                <div style={{ fontFamily: F.mono, fontSize: "8px", color: "#888", letterSpacing: "0.08em", marginTop: "2px" }}>
                  {count} {count === 1 ? "ITEM" : "ITEMS"} SELECTED
                </div>
              </div>
              <button onClick={() => setFavOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
                <X size={18} color="#111" />
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: "auto", padding: "0" }}>
              {favourites.length === 0 ? (
                <div style={{ padding: "40px 20px", textAlign: "center" }}>
                  <ShoppingBag size={32} color="#ccc" style={{ margin: "0 auto 12px" }} />
                  <div style={{ fontFamily: F.mono, fontSize: "9px", color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    No items selected
                  </div>
                  <div style={{ fontFamily: F.body, fontSize: "12px", color: "#bbb", marginTop: "6px" }}>
                    Add garments from the catalogue to compare and enquire
                  </div>
                </div>
              ) : (
                favourites.map((fav) => (
                  <div key={fav.id} style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: F.display, fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111" }}>
                          {fav.name}
                        </div>
                        {(fav.category || fav.price) && (
                          <div style={{ fontFamily: F.mono, fontSize: "8px", color: "#888", letterSpacing: "0.08em", marginTop: "2px" }}>
                            {fav.category}{fav.price ? ` · ${fav.price}` : ""}
                          </div>
                        )}
                        {fav.mill && (
                          <div style={{ fontFamily: F.mono, fontSize: "8px", color: "#c9a96e", letterSpacing: "0.06em", marginTop: "2px" }}>
                            {fav.mill}
                          </div>
                        )}
                        <textarea
                          value={fav.note || ""}
                          onChange={(e) => updateNote(fav.id, e.target.value)}
                          placeholder="Add a note (optional)..."
                          rows={2}
                          style={{
                            marginTop: "8px", width: "100%",
                            fontFamily: F.mono, fontSize: "9px", color: "#555",
                            border: "1px solid #e8e8e8", padding: "6px 8px",
                            resize: "none", outline: "none", backgroundColor: "#fafafa",
                            letterSpacing: "0.04em",
                          }}
                        />
                      </div>
                      <button
                        onClick={() => removeFavourite(fav.id)}
                        style={{ background: "none", border: "none", cursor: "pointer", padding: "2px", flexShrink: 0 }}
                      >
                        <Trash2 size={14} color="#ccc" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer actions */}
            {favourites.length > 0 && (
              <div style={{ padding: "16px 20px", borderTop: "1px solid #e8e8e8", display: "flex", flexDirection: "column", gap: "10px" }}>
                {/* Service toggle */}
                <div style={{ display: "flex", gap: "0", border: "1px solid #ddd", overflow: "hidden" }}>
                  <button
                    onClick={() => setIsMTM(false)}
                    style={{
                      flex: 1, padding: "9px 0", border: "none", cursor: "pointer",
                      fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase",
                      backgroundColor: !isMTM ? "#111" : "transparent",
                      color: !isMTM ? "#fff" : "#888",
                      transition: "all 0.15s",
                    }}
                  >
                    BESPOKE
                  </button>
                  <button
                    onClick={() => setIsMTM(true)}
                    style={{
                      flex: 1, padding: "9px 0", border: "none", borderLeft: "1px solid #ddd", cursor: "pointer",
                      fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase",
                      backgroundColor: isMTM ? "#111" : "transparent",
                      color: isMTM ? "#fff" : "#888",
                      transition: "all 0.15s",
                    }}
                  >
                    MTM
                  </button>
                </div>
                <button
                  onClick={() => bookConsultation(isMTM)}
                  style={{
                    padding: "13px", backgroundColor: "#111", color: "#fff",
                    border: "none", cursor: "pointer",
                    fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase",
                  }}
                >
                  BOOK A CONSULTATION →
                </button>
                <button
                  onClick={() => sendEnquiry(isMTM)}
                  style={{
                    padding: "13px", backgroundColor: "transparent", color: "#111",
                    border: "1px solid #111", cursor: "pointer",
                    fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase",
                  }}
                >
                  SEND ENQUIRY VIA WHATSAPP
                </button>
                <button
                  onClick={clearFavourites}
                  style={{
                    padding: "8px", backgroundColor: "transparent", color: "#aaa",
                    border: "none", cursor: "pointer",
                    fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase",
                  }}
                >
                  CLEAR LIST
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes megaSlideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

// ── MEGA LINK ITEM ─────────────────────────────────────────────────────────────
function MegaLinkItem({ link, F }: { link: MegaLink; F: { display: string; mono: string; body: string } }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "8px 10px",
        backgroundColor: hovered ? "#f8f8f8" : "transparent",
        transition: "background 0.12s",
        cursor: "pointer",
        borderLeft: hovered ? "2px solid #111" : "2px solid transparent",
        marginLeft: "-2px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {link.thumb && (
        <div style={{
          width: "36px",
          height: "46px",
          flexShrink: 0,
          overflow: "hidden",
          backgroundColor: "#f0f0f0",
        }}>
          <img
            src={link.thumb}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
              opacity: hovered ? 1 : 0.85,
              transition: "opacity 0.12s",
            }}
          />
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: F.display,
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: hovered ? "#111" : "#333",
          transition: "color 0.12s",
          lineHeight: 1.2,
        }}>
          {link.label}
        </div>
        {link.note && (
          <div style={{
            fontFamily: F.mono,
            fontSize: "8px",
            letterSpacing: "0.08em",
            color: "#aaa",
            marginTop: "2px",
            lineHeight: 1.3,
          }}>
            {link.note}
          </div>
        )}
      </div>
    </div>
  );
}
