"use client";
import { useSEO, SCHEMAS } from "@/hooks/useSEO";
/**
 * TAILOR.HK — TAILOR GUIDES INDEX
 * Design: Technical editorial — Barlow Condensed + JetBrains Mono
 */

import { useState, useEffect } from "react";
import { Link } from "@/lib/wouter-shim";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
// SEO handled by generateMetadata in page.tsx
import BookmarkButton from "@/components/BookmarkButton";
import ShareButton from "@/components/ShareButton";

const CDN = "https://images.squarespace-cdn.com/content/v1/68fb7bffc7f5256a863ed907";

const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body:    '"Barlow", Arial, sans-serif',
  mono:    '"JetBrains Mono", "Courier New", monospace',
};

const guides = [
  {
    slug: "hk-finest-tailoring",
    title: "Hong Kong's Finest Tailoring: The Definitive Guide",
    category: "Hong Kong Tailoring",
    excerpt: "Profiles of Hong Kong's established tailoring houses — Magnus & Novus, W.W. Chan, A Man Hing Cheong, The Armoury, Dorsia, and Ascot Chang — with pricing, addresses, and what to expect.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/JocirFuxVRRDODTn.png",
    featured: true,
  },

  {
    slug: "bespoke-made-to-measure-and-ready-to-wear-suit-guide",
    title: "Bespoke, Made-to-Measure and Ready-to-Wear: A Complete Guide",
    category: "Suit Education",
    excerpt: "The definitive guide to the three tiers of suit construction — what they mean, how they differ, and which is right for you.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/SmaMsjHhEgNoicVP.jpeg",
    featured: true,
  },

  {
    slug: "essential-guide-to-suit-fabrics",
    title: "The Essential Guide to Suit Fabrics",
    category: "Fabrics",
    excerpt: "Everything you need to know about suit fabrics — from Super 100s wool to cashmere blends, and how to choose the right material for Hong Kong's climate.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/prqGrMlrEOEEDwqq.jpeg",
    featured: false,
  },
  {
    slug: "menswear-made-to-measure-services-in-hong-kong",
    title: "16 Menswear Made-to-Measure Services in Hong Kong",
    category: "Hong Kong Tailoring",
    excerpt: "An overview of Hong Kong's made-to-measure menswear services, with pricing, specialisations, and locations.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/sBvBwNIutekhAVDb.webp",
    featured: false,
  },
  {
    slug: "art-of-acquiring-a-superior-suit",
    title: "The Art of Acquiring a Superior Suit",
    category: "Suit Education",
    excerpt: "A guide to the principles behind a truly great suit — construction, fit, fabric, and the details that separate the exceptional from the ordinary.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/ELTmQJGEAkQMOFIc.png",
    featured: false,
  },
  {
    slug: "flattering-menswear-for-tall-and-short",
    title: "Flattering Menswear for the Tall and the Short",
    category: "Style Guide",
    excerpt: "How to use tailoring to flatter your proportions — specific guidance for taller and shorter frames on cut, lapel width, and trouser break.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/xnwszfnBnyzwBjvQ.png",
    featured: false,
  },
  {
    slug: "how-to-choose-the-perfect-shirt-fabric",
    title: "How to Choose the Perfect Shirt Fabric",
    category: "Shirts",
    excerpt: "A practical guide to shirt fabrics — from Oxford cloth to Sea Island cotton — and how to match them to occasion and climate.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/ZykpTgDqCRlbFqgL.png",
    featured: false,
  },
  {
    slug: "essential-guide-to-business-shirt-fabrics",
    title: "The Essential Guide to Business Shirt Fabrics",
    category: "Shirts",
    excerpt: "Which fabrics work best for business shirts in Hong Kong's humid climate? A practical guide for the professional wardrobe.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/cxYMBJJJLPLejyTt.png",
    featured: false,
  },
  {
    slug: "what-makes-a-quality-shirt",
    title: "What Makes a Quality Shirt: A Concise Guide",
    category: "Shirts",
    excerpt: "The key indicators of shirt quality — thread count, construction, collar construction, and the details that define a superior shirt.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/xSAEdhySXqdKlJEA.png",
    featured: false,
  },
  {
    slug: "worlds-best-tailoring-menswear-brands",
    title: "The World's Best Tailoring and Menswear Brands",
    category: "Brands",
    excerpt: "An editorial overview of the world's most significant tailoring houses and menswear brands, from Savile Row to Naples.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/UxjspNPkZkmSMCkU.jpg",
    featured: false,
  },
  {
    slug: "how-to-buy-quality-shoes",
    title: "How to Buy Quality Shoes: A Concise Guide",
    category: "Style Guide",
    excerpt: "A guide to investing in quality footwear — construction methods, leather grades, and the shoes that complement a tailored wardrobe.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/xhvgPYaFQjTAqyNj.jpeg",
    featured: false,
  },
  {
    slug: "making-the-cut",
    title: "Making the Cut: The Methodology of Fine Tailoring",
    category: "Suit Education",
    excerpt: "A research-driven examination of the principles, techniques, and decisions that define fine tailoring — from pattern construction to final pressing.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/VeTDsTFJhpLJVXfo.png",
    featured: true,
  },
  {
    slug: "how-to-fit-a-suit",
    title: "How to Fit a Suit: The Complete Guide to Suit Fit",
    category: "Suit Education",
    excerpt: "Shoulder, chest, sleeve, and trouser — every measurement point explained, with guidance on what good fit actually looks like.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/OpuwXoQlRIPulEtb.webp",
    featured: false,
  },
  {
    slug: "suit-colour-guide",
    title: "The Suit Colour Guide: From Navy to Charcoal and Beyond",
    category: "Suit Education",
    excerpt: "Colour is the most immediate signal a suit sends. The full spectrum of suit colours — formality hierarchy, seasonal suitability, and occasion guidance.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/INJQJnMGaXUHzrAO.jpeg",
    featured: false,
  },
  {
    slug: "double-breasted-suit-guide",
    title: "The Double-Breasted Suit: A Complete Guide",
    category: "Suit Education",
    excerpt: "History, construction, and how to wear the double-breasted suit — a garment that rewards considered commissioning.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/ELTmQJGEAkQMOFIc.png",
    featured: false,
  },
  {
    slug: "dress-codes-explained",
    title: "Dress Codes Explained: From Black Tie to Business Casual",
    category: "Style Guide",
    excerpt: "Dress codes are a language. White tie, black tie, lounge suit, smart casual — precise definitions, common mistakes, and Hong Kong context.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/wuVUEwBUxwzrsfrP.webp",
    featured: false,
  },
  {
    slug: "overcoat-guide",
    title: "The Overcoat Guide: Choosing and Wearing the Perfect Coat",
    category: "Style Guide",
    excerpt: "Chesterfield, polo coat, Crombie, raglan — every major overcoat style covered with guidance on fabric, fit, and building a coat wardrobe.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/dCJwGvvgletTwYmp.jpg",
    featured: false,
  },
  {
    slug: "trouser-fit-guide",
    title: "The Trouser Fit Guide: Rise, Break, and Proportion",
    category: "Suit Education",
    excerpt: "Trouser fit is the most neglected element of a man's wardrobe. Rise, seat, thigh, knee, hem, and break — how each affects the overall silhouette.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/hAFlbGnCWtBCVlux.jpeg",
    featured: false,
  },
  {
    slug: "capsule-wardrobe-guide",
    title: "Building a Capsule Wardrobe: The Professional Man's Guide",
    category: "Style Guide",
    excerpt: "A framework for building a professional wardrobe — garments that work together to create maximum versatility from a considered selection.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/xhvgPYaFQjTAqyNj.jpeg",
    featured: false,
  },
  {
    slug: "hallmarks-of-true-bespoke-tailoring-hk",
    title: "Hallmarks of True Bespoke Tailoring in Hong Kong",
    category: "Bespoke",
    excerpt: "How to distinguish genuine bespoke work from the imitations — the construction details, the fitting process, and the practical tests that separate a true bespoke suit from a made-to-measure garment sold as bespoke.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/mQHAtWFfDfwbPGzM.webp",
    featured: false,
  },
  {
    slug: "commissioning-your-first-bespoke-suit",
    title: "Commissioning Your First Bespoke Suit: A Step-by-Step Guide",
    category: "Hong Kong Tailoring",
    excerpt: "Everything a first-time client needs to know before walking into a Hong Kong tailor — from the initial consultation and fabric selection to fittings, delivery, and aftercare.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/INJQJnMGaXUHzrAO.jpeg",
    featured: false,
  },
  {
    slug: "az-glossary-suit-fabrics",
    title: "A\u2013Z Glossary of Suit Fabrics & Cloth Terms",
    category: "Fabrics",
    excerpt: "A comprehensive reference covering every cloth term you are likely to encounter when commissioning a bespoke suit — from Super numbers to pick weaves.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/jirbYEpGxVsviHhD.jpeg",
    featured: false,
  },
  {
    slug: "history-of-hong-kong-tailors",
    title: "A History of Hong Kong Tailors",
    category: "Hong Kong Tailoring",
    excerpt: "From the Shanghainese master tailors who arrived in the 1940s to the grand maisons operating today, the story of Hong Kong tailoring is one of craft, adaptation, and quiet excellence.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/IAWhtRLrlsVXGteB.webp",
    featured: false,
  },
  {
    slug: "tailoring-for-body-types",
    title: "Tailoring for Different Body Types",
    category: "Suit Education",
    excerpt: "The purpose of bespoke tailoring is to make every body look its best. Understanding how a skilled cutter addresses different proportions is the first step to a successful commission.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/hInsithUBDBnxfje.webp",
    featured: false,
  },
  {
    slug: "what-to-look-for-in-a-quality-suit",
    title: "What to Look for in a Quality Suit",
    category: "Suit Education",
    excerpt: "The specific details — in construction, cloth, and finish — that distinguish a well-made suit from a mediocre one, whether bespoke, made-to-measure, or ready-to-wear.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/OJSkWQhVEqhwNaOl.webp",
    featured: false,
  },
  {
    slug: "four-season-suit",
    title: "The Four-Season Suit",
    category: "Fabrics",
    excerpt: "How to build a wardrobe that works across climates and seasons — the fabrics, weights, and constructions that make a suit genuinely versatile.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/OpuwXoQlRIPulEtb.webp",
    featured: false,
  },
  {
    slug: "bespoke-not-bespoke",
    title: "Why Most Bespoke Suits in Hong Kong Are Not Bespoke",
    category: "Bespoke",
    excerpt: "The word has been applied so broadly it has ceased to communicate anything precise. This guide explains what bespoke actually requires — and how to identify the handful of houses in Hong Kong that still produce it.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/mQHAtWFfDfwbPGzM.webp",
    featured: true,
    externalHref: "/bespoke-not-bespoke",
  },
  {
    slug: "loro-piana-anthology",
    title: "Loro Piana Fabric Anthology",
    category: "Fabrics",
    excerpt: "The complete Loro Piana Spring/Summer 2026 fabric collection — 30 collections profiled with composition, weight, garment suitability, and price tier. The definitive reference for discerning cloth selection.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/prqGrMlrEOEEDwqq.jpeg",
    featured: true,
    externalHref: "/loro-piana-anthology",
  },
  {
    slug: "holland-sherry-anthology",
    title: "Holland & Sherry Fabric Anthology",
    category: "Fabrics",
    excerpt: "A complete reference to Holland & Sherry's fabric collections — from the benchmark Target suiting to Harris Tweed, Cashique overcoating, and the ultra-fine Masterpiece Gold. 41 collections spanning wool, cashmere, linen, silk, and specialist blends.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/FlUtZXQmAETyFHRl.jpeg",
    featured: true,
    externalHref: "/holland-sherry-anthology",
  },
  {
    slug: "vbc-anthology",
    title: "Vitale Barberis Canonico Fabric Anthology",
    category: "Fabrics",
    excerpt: "A complete reference to VBC's fabric collections — from the Classic Icons and Solaro suiting to the sustainable H.O.P.E. range and the Offlimits casual line. 17 collections from the world's oldest wool mill, established 1663 in Biella, Italy.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/BXAsZfqUdLFfTqpX.jpg",
    featured: false,
    externalHref: "/vbc-anthology",
  },
  {
    slug: "dormeuil-anthology",
    title: "Dormeuil Fabric Anthology",
    category: "Fabrics",
    excerpt: "A complete reference to Dormeuil's fabric bunches — from the benchmark Amadeus suiting and ultra-fine 15 Point 7 to pure cashmere and the sustainable Forever Green collection. 17 bunches from the House of Dormeuil, established 1842 in Reims, France.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/PKJoscCNPdnsQqhg.jpg",
    featured: false,
    externalHref: "/dormeuil-anthology",
  },
  {
    slug: "scabal-anthology",
    title: "Scabal Fabric Anthology",
    category: "Fabrics",
    excerpt: "A complete reference to Scabal's fabric collections — from the flagship New Deluxe and Nobility luxury ranges to Pure Vicuña, cashmere lifestyle fabrics, and specialist velvet collections. 73 collections from Scabal, established 1938 in Brussels, Belgium.",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/ZejCtjgeenPpZlxu.jpg",
    featured: false,
    externalHref: "/scabal-anthology",
  },
];

const categories = ["All", "Hong Kong Tailoring", "Bespoke", "Suit Education", "Fabrics", "Shirts", "Style Guide", "Brands"];

function useIsMobile(bp = 768) {
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

export default function TailorGuides() {
  const isMobile = useIsMobile();
  useSEO({
    title: "Men's Tailoring Guides — Expert Advice on Suits, Fabrics & Style | Tailors.hk",
    description: "20 expert guides on bespoke tailoring, suit fabrics, Hong Kong tailors, dress codes, and building a professional wardrobe. Research-driven, E-E-A-T optimised content from Tailors.hk.",
    canonical: "https://tailors.hk/tailor-guides",
    keywords: "tailoring guides, suit guide, bespoke suit guide, how to buy a suit, suit fabric guide, Hong Kong tailor guide",
    ogType: "website",
    schema: [
      SCHEMAS.breadcrumb([
        { name: "Home", url: "/" },
        { name: "Tailoring Guides", url: "/tailor-guides" },
      ]),
      SCHEMAS.speakable(["h1", "h2"]),
            {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Men's Tailoring Guides",
        "url": "https://tailors.hk/tailor-guides",
        "description": "Expert guides on bespoke tailoring, suit fabrics, Hong Kong tailors, and building a professional wardrobe"
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Tailoring Guides",
        "itemListElement": [
          {"@type": "ListItem", "position": 1, "name": "Hong Kong's Finest Tailoring: The Definitive Guide", "url": "https://tailors.hk/tailor-guides/hk-finest-tailoring"},
          {"@type": "ListItem", "position": 2, "name": "Bespoke, Made-to-Measure and Ready-to-Wear", "url": "https://tailors.hk/tailor-guides/bespoke-made-to-measure-and-ready-to-wear-suit-guide"},
          {"@type": "ListItem", "position": 3, "name": "The Essential Guide to Suit Fabrics", "url": "https://tailors.hk/tailor-guides/essential-guide-to-suit-fabrics"}
        ]
      }
    ],
  });

  const [activeCategory, setActiveCategory] = useState("All");
  const featured = guides.filter((g) => g.featured);
  const filtered = activeCategory === "All" ? guides : guides.filter((g) => g.category === activeCategory);

  return (
    <main style={{ backgroundColor: "#fff", overflowX: "hidden" }}>
      <Navigation />

      <section style={{ position: "relative", borderBottom: "1px solid #1a1a1a", padding: "clamp(80px, 12vw, 120px) 0 clamp(48px, 6vw, 60px)", background: "#111", color: "#fff", overflow: "hidden" }}>
        <img
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/INJQJnMGaXUHzrAO.jpeg"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.3, pointerEvents: "none" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#666", display: "block", marginBottom: "12px" }}>§ 05 · KNOWLEDGE CENTRE</span>
          <h1 style={{ fontFamily: F.display, fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#fff", lineHeight: 1.05, marginBottom: "16px" }}>Men's Tailoring Guides</h1>
          <p style={{ fontFamily: F.body, fontSize: "15px", lineHeight: 1.75, color: "#aaa", maxWidth: "520px" }}>Expert guides on bespoke tailoring, suit fabrics, Hong Kong tailors, and building a professional wardrobe.</p>
        </div>
      </section>

      <div style={{ borderBottom: "1px solid #e2e2e2", display: "flex", justifyContent: "flex-start", overflowX: "auto", WebkitOverflowScrolling: "touch" as any, scrollbarWidth: "none" as any, padding: "0 16px" }}>
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", padding: "14px 16px", color: activeCategory === cat ? "#111" : "#aaa", background: "none", border: "none", borderBottom: activeCategory === cat ? "2px solid #111" : "2px solid transparent", cursor: "pointer", whiteSpace: "nowrap" }}>{cat}</button>
        ))}
      </div>

      <div className="container" style={{ paddingTop: isMobile ? "40px" : "56px", paddingBottom: isMobile ? "40px" : "56px" }}>
        {activeCategory === "All" && (
          <div style={{ marginBottom: "56px" }}>
            <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "20px" }}>FEATURED GUIDES</span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(320px, 100%), 1fr))", gap: "24px" }}>
              {featured.map((guide) => (
                <Link key={guide.slug} href={(guide as any).externalHref ?? `/tailor-guides/${guide.slug}`}>
                  <div className="guide-card" style={{ cursor: "pointer" }}>
                    <div style={{ overflow: "hidden" }}>
                      <img
                        src={guide.img}
                        alt={guide.title}
                        loading="lazy"
                        style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
                      />
                    </div>
                    <p style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", marginTop: "10px" }}>{guide.category}</p>
                    <p style={{ fontFamily: F.display, fontSize: "13px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#111", lineHeight: 1.4, marginTop: "6px" }}>{guide.title}</p>
                    <p style={{ fontFamily: F.body, fontSize: "12px", lineHeight: 1.7, color: "#777", marginTop: "6px" }}>{guide.excerpt}</p>
                    <div style={{ display: "flex", gap: "6px", marginTop: "12px" }} onClick={(e) => e.preventDefault()}>
                      <BookmarkButton item={{ slug: guide.slug, title: guide.title, category: guide.category, img: guide.img, excerpt: guide.excerpt }} variant="icon" scheme="light" />
                      <ShareButton title={guide.title} text={guide.excerpt} variant="icon" scheme="light" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All guides grid */}
        <div>
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "20px" }}>{activeCategory === "All" ? "ALL GUIDES" : activeCategory.toUpperCase()}</span>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fill, minmax(220px, 1fr))", gap: isMobile ? "16px" : "28px" }}>
            {filtered.map((guide) => (
              <Link key={guide.slug} href={(guide as any).externalHref ?? `/tailor-guides/${guide.slug}`}>
                <div className="guide-card" style={{ cursor: "pointer" }}>
                  <div style={{ overflow: "hidden" }}>
                    <img
                      src={guide.img}
                      alt={guide.title}
                      loading="lazy"
                      style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
                    />
                  </div>
                  <p style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", marginTop: "10px" }}>{guide.category}</p>
                  <p style={{ fontFamily: F.display, fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#111", lineHeight: 1.4, marginTop: "6px" }}>{guide.title}</p>
                  <div style={{ display: "flex", gap: "6px", marginTop: "10px" }} onClick={(e) => e.preventDefault()}>
                    <BookmarkButton item={{ slug: guide.slug, title: guide.title, category: guide.category, img: guide.img, excerpt: guide.excerpt ?? "" }} variant="icon" scheme="light" />
                    <ShareButton title={guide.title} text={guide.excerpt ?? guide.title} variant="icon" scheme="light" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Brief CTA */}
        <div style={{ borderTop: "1px solid #e2e2e2", marginTop: "64px", paddingTop: "48px", textAlign: "center" }}>
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "10px" }}>INTERACTIVE TOOL</span>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", lineHeight: 1.1, marginBottom: "16px" }}>Find Your Perfect Tailor</h2>
          <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.75, color: "#777", maxWidth: "440px", margin: "0 auto 28px" }}>Answer a few short questions about your style, budget, and requirements. We will match you with the right tailoring service.</p>
          <Link href="/tailor-finder-quiz">
            <span className="btn-filled">Start the Brief</span>
          </Link>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #e2e2e2", padding: "40px 16px", maxWidth: "760px", margin: "0 auto" }}>
        <p style={{ fontFamily: F.body, fontSize: "12px", lineHeight: 1.8, color: "#aaa" }}>
          <strong style={{ color: "#888" }}>About this library:</strong> An independent editorial library covering every stage of the tailoring decision — bespoke vs made-to-measure vs ready-to-wear, how to commission a first suit, suit fabrics, fit, dress codes, and Hong Kong's finest tailoring houses. Written for clients who want to understand the craft, not just find a price. All content is independently researched without commercial affiliation.
        </p>
      </div>

      <Footer />
    </main>
  );
}
