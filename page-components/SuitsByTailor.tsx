"use client";
import { useSEO, SCHEMAS } from "@/hooks/useSEO";
/**
 * TAILOR.HK — SUITS BY TAILOR
 * Design: Technical editorial — Barlow Condensed + JetBrains Mono
 */

import { Link } from "@/lib/wouter-shim";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
// SEO handled by generateMetadata in page.tsx
import { pageEnquiryUrl } from "@/lib/whatsapp";

const CDN = "https://images.squarespace-cdn.com/content/v1/68fb7bffc7f5256a863ed907";

const F = {
  display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body:    '"Barlow", Arial, sans-serif',
  mono:    '"JetBrains Mono", "Courier New", monospace',
};

const suits = [
  { id: "001", name: "Midnight Blue Suit", fabric: "Super 120s Wool", weight: "260g/m²", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/pVEPkPApyWtkArag.jpg" },
  { id: "002", name: "Mid Grey Suit", fabric: "Super 110s Wool", weight: "240g/m²", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/OEkbqFLSaAsYpDdV.jpg" },
  { id: "003", name: "Charcoal Grey Suit", fabric: "Super 120s Wool", weight: "260g/m²", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/TNxmCQSagTsnBwFW.jpg" },
  { id: "004", name: "Navy Suit", fabric: "Super 120s Wool", weight: "260g/m²", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/iiwfHtsspNExjqdN.jpg" },
  { id: "005", name: "Light Grey Suit", fabric: "Super 120s Wool", weight: "220g/m²", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/lGOiLNUXUbdGKjAk.jpg" },
  { id: "006", name: "Charcoal Grey Pinstripe DB", fabric: "Super 120s Wool", weight: "270g/m²", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/BiulTpyoJMPOqBrQ.jpg" },
  { id: "007", name: "Dark Grey Double Breasted", fabric: "Super 120s Wool", weight: "270g/m²", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/ZJmCUyhPTHiSBKEX.jpg" },
  { id: "008", name: "Black Suit", fabric: "Super 120s Wool", weight: "260g/m²", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/heiIXvqutPSXYsQT.jpg" },
  { id: "009", name: "Black Tuxedo", fabric: "Super 120s Wool / Silk Lapels", weight: "260g/m²", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/HwrJYhmgykzHojMx.jpg" },
  { id: "010", name: "Dark Navy Blazer", fabric: "Super 120s Wool", weight: "260g/m²", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/obhGYlwXMWixoiXP.jpg" },
];

const fabricHouses = [
  { name: "Dormeuil", origin: "France / UK", specialty: "Luxury wools and cashmere blends" },
  { name: "Loro Piana", origin: "Italy", specialty: "Ultra-fine wools and cashmere" },
  { name: "Scabal", origin: "Belgium / UK", specialty: "Premium suiting and luxury blends" },
  { name: "Holland & Sherry", origin: "Scotland / UK", specialty: "Traditional English suiting" },
  { name: "Vitale Barberis", origin: "Italy", specialty: "Fine Italian wools" },
  { name: "Caccioppoli", origin: "Naples, Italy", specialty: "Neapolitan suiting fabrics" },
];

export default function SuitsByTailor() {
  useSEO({
    title: "Suits by Tailor — Find Your Perfect Tailor in Hong Kong | Tailors.hk",
    description: "Browse suits and menswear by tailor. Compare Hong Kong's finest bespoke tailors by style, price, and specialisation to find the perfect match for your wardrobe.",
    canonical: "https://tailors.hk/suits-by-tailor",
    keywords: "Hong Kong tailor comparison, best tailor Hong Kong, bespoke tailor HK, find tailor Hong Kong",
    ogType: "website",
    schema: [
      SCHEMAS.breadcrumb([
        { name: "Home", url: "/" },
        { name: "Suits by Tailor", url: "/suits-by-tailor" },
      ]),
      SCHEMAS.speakable(["h1", "h2"]),
            {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Suits by Tailor",
        "url": "https://tailors.hk/suits-by-tailor",
        "description": "Browse and compare Hong Kong's finest bespoke tailors"
      }
    ],
  });

  return (
    <main style={{ backgroundColor: "#fff", overflowX: "hidden" }}>
      <Navigation />

      <section style={{ position: "relative", borderBottom: "1px solid #1a1a1a", padding: "100px 0 60px", background: "#111", color: "#fff", overflow: "hidden" }}>
        <img
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/iiwfHtsspNExjqdN.jpg"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", opacity: 0.35, pointerEvents: "none" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#666", display: "block", marginBottom: "12px" }}>§ 04 · THE COLLECTION</span>
          <h1 style={{ fontFamily: F.display, fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", lineHeight: 1.05, marginBottom: "16px" }}>Suits by Tailor</h1>
          <p style={{ fontFamily: F.body, fontSize: "15px", lineHeight: 1.75, color: "#aaa", maxWidth: "520px" }}>
          Our curated collection of bespoke and made-to-measure suits. Each garment is crafted to your exact measurements using premium fabrics from the world's finest mills.
        </p>
        </div>
      </section>

      {/* Product grid */}
      <section style={{ padding: "56px 0", borderBottom: "1px solid #e5e5e5" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))", gap: "32px" }}>
            {suits.map((suit) => (
              <div key={suit.id} className="product-card">
                <img
                  src={suit.img}
                  alt={`${suit.name} — Bespoke tailored suit Hong Kong`}
                  loading="lazy"
                  style={{ width: "100%", aspectRatio: "2/3", objectFit: "cover", display: "block" }}
                />
                <p style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#bbb", marginTop: "8px" }}>{suit.id}</p>
                <p style={{ fontFamily: F.display, fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", marginTop: "4px" }}>{suit.name}</p>
                <div style={{ display: "flex", gap: "12px", marginTop: "6px", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.08em", color: "#555" }}>{suit.fabric}</span>
                  <span style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.08em", color: "#aaa" }}>{suit.weight}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "48px" }}>
            <Link href="/contact?type=bespoke">
              <span className="btn-outline">Enquire About a Suit</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Fabric houses */}
      <section style={{ padding: "56px 0", borderBottom: "1px solid #e5e5e5", backgroundColor: "#f7f7f7" }}>
        <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: "48px", alignItems: "start" }}>
            <div>
              <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "12px" }}>OUR FABRIC LIBRARY</span>
              <h2 style={{ fontFamily: F.display, fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", lineHeight: 1.1, marginBottom: "20px" }}>Fabrics from the<br />World's Finest Mills</h2>
              <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.8, color: "#666", marginBottom: "28px" }}>
                We source our fabrics exclusively from the world's most respected mills. Every cloth in our library has been selected for its quality, character, and suitability for Hong Kong's professional environment.
              </p>
              <Link href="/tailor-guides/essential-guide-to-suit-fabrics">
                <span className="btn-outline">Read the Fabric Guide</span>
              </Link>
            </div>
            <div>
              {fabricHouses.map((house, i) => (
                <div
                  key={house.name}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    padding: "14px 0",
                    borderBottom: i < fabricHouses.length - 1 ? "1px solid #e5e5e5" : "none",
                    borderTop: i === 0 ? "1px solid #e5e5e5" : "none",
                  }}
                >
                  <div>
                    <p style={{ fontFamily: F.display, fontSize: "13px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#111" }}>{house.name}</p>
                    <p style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.1em", color: "#aaa", marginTop: "3px" }}>{house.origin}</p>
                  </div>
                  <p style={{ fontFamily: F.body, fontSize: "12px", color: "#777", textAlign: "right", maxWidth: "180px" }}>{house.specialty}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "64px 0", textAlign: "center" }}>
        <div className="container">
          <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.1em", color: "#aaa", display: "block", marginBottom: "10px" }}>COMMISSION A SUIT</span>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", lineHeight: 1.1, marginBottom: "16px" }}>Ready to Begin?</h2>
          <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.75, color: "#777", maxWidth: "440px", margin: "0 auto 28px" }}>
            Contact us to arrange a private consultation and begin your tailoring journey.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={pageEnquiryUrl("Suits by Tailor")} target="_blank" rel="noopener noreferrer">
              <span className="btn-outline">Enquire via WhatsApp</span>
            </a>
            <Link href="/contact?type=bespoke">
              <span className="btn-filled">Book a Consultation</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
