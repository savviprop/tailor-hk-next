"use client";
import { useSEO, SCHEMAS } from "@/hooks/useSEO";
/**
 * TAILOR.HK — GUIDE ARTICLE TEMPLATE
 * Design: Precision Dark — editorial article layout
 * SEO: Article schema, breadcrumbs, internal linking
 */

import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "@/lib/wouter-shim";
import { ArrowRight, ArrowLeft, ChevronRight } from "lucide-react";
// SEO handled by generateMetadata in page.tsx
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { pageEnquiryUrl } from "@/lib/whatsapp";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButton from "@/components/ShareButton";

// Verified guide thumbnail images sourced directly from Tailors.hk CDN
const CDN = "https://images.squarespace-cdn.com/content/v1/68fb7bffc7f5256a863ed907";
const THUMB_FABRICS      = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/prqGrMlrEOEEDwqq.jpeg";
const THUMB_BESPOKE5     = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/JocirFuxVRRDODTn.png";
const THUMB_MTM16        = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/sBvBwNIutekhAVDb.webp";
const THUMB_TALL_SHORT   = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/xnwszfnBnyzwBjvQ.png";
const THUMB_SHIRT_FABRIC = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/ZykpTgDqCRlbFqgL.png";
const THUMB_BRANDS       = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/SmaMsjHhEgNoicVP.jpeg";
const THUMB_BIZ_SHIRT    = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/cxYMBJJJLPLejyTt.png";
const THUMB_QUALITY_SHIRT= "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/xSAEdhySXqdKlJEA.png";
const THUMB_SHOES        = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/xhvgPYaFQjTAqyNj.jpeg";
const THUMB_SUPERIOR_SUIT= "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/INJQJnMGaXUHzrAO.jpeg";
const THUMB_MTM_RTW      = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/shLtnQaQLmeQtCVt.png";
const THUMB_BESPOKE_HERO = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/VeTDsTFJhpLJVXfo.png";

interface ArticleContent {
  title: string;
  category: string;
  excerpt: string;
  heroImg: string;
  heroImgPosition?: string;
  thumbnail?: string;
  readTime: string;
  sections: { heading: string; content: string }[];
  relatedGuides: { title: string; slug: string }[];
  priceTierLegend?: { symbol: string; label: string; description: string }[];
  productRail?: { img: string; name: string; href: string }[];
  productRailViewAll?: { href: string; label: string };
  ctaBlock?: { label: string; heading: string; body: string; primaryHref: string; primaryLabel: string; secondaryHref?: string; secondaryLabel?: string };
}

const articles: Record<string, ArticleContent> = {
  "hk-finest-tailoring": {
    title: "Hong Kong's Finest Tailoring: The Definitive Guide",
    category: "Hong Kong Tailoring",
    excerpt: "The definitive guide to Hong Kong's finest tailoring houses — from Shanghainese bespoke masters to contemporary British menswear. Profiles, pricing, and what to expect.",
    heroImg: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/JocirFuxVRRDODTn.png",
    readTime: "14 min read",
    priceTierLegend: [
      { symbol: '◆', label: 'Accessible', description: 'Entry-level tailoring; RTW and basic MTM' },
      { symbol: '◆◆', label: 'Mid-range', description: 'Established houses; quality MTM and entry bespoke' },
      { symbol: '◆◆◆', label: 'Premium', description: 'Full-service bespoke; elite cloth selection' },
      { symbol: '◆◆◆◆', label: 'Luxury', description: 'International luxury houses; exceptional construction' },
      { symbol: '◆◆◆◆◆', label: 'Ultra-luxury', description: 'The highest tier; proprietary textiles, full handcraft' },
    ],
    sections: [
      {
        heading: "Hong Kong's Tailoring Tradition",
        content: `Hong Kong's tailoring heritage traces directly to the 1950s, when a wave of Shanghainese master tailors relocated to the city following the political upheaval on the mainland. They brought with them a tradition characterised by precision cutting, meticulous hand-finishing, and an instinct for fit developed across generations of practice.\n\nOver the following decades, the city built one of the densest concentrations of skilled tailoring talent in Asia. Today, that tradition coexists with a new generation of contemporary houses — some rooted in the Shanghainese lineage, others drawing on British and Italian influences — that have elevated Hong Kong's standing in the global menswear conversation.\n\nThe city's tailoring market spans an enormous range: from the tourist-facing establishments of Tsim Sha Tsui to private ateliers accessible only by appointment. The houses profiled here represent the upper tier — those whose construction, fabric standards, and client experience hold up against international benchmarks.`,
      },
      {
        heading: "What to Look for in a Hong Kong Tailor",
        content: `Evaluating a bespoke tailor in Hong Kong requires looking beyond the showroom. The most reliable indicators of quality are: whether the jacket is fully canvassed or fused; the experience and training of the cutters; the range and provenance of fabrics available; the number of fittings offered; and the quality of hand-finishing on completed garments.\n\nAsk to see examples of finished work. Examine the buttonholes — are they hand-sewn? Look at the lapels — do they roll naturally without lying flat against the chest? Check the lining — is it cut generously? These details reveal more about a tailor's standards than any marketing material.\n\nThe fitting process is equally telling. A tailor who rushes the consultation or discourages questions is a tailor who prioritises volume over quality. The finest houses in Hong Kong treat the fitting as a collaboration, not a formality.`,
      },
      {
        heading: "Magnus & Novus ◆◆◆◆◆",
        content: `Magnus & Novus is a British menswear house of singular aesthetic conviction — understated, precise, and built to endure. Every garment is entirely handcrafted, with over 5,000 individual stitches per piece and proprietary textiles developed exclusively for the house. The bespoke programme is structured around a defining house silhouette that clients return to commission repeatedly — the design is not a starting point for adaptation, but the destination itself. The result is a body of work that occupies the space between tailoring and investment craft.\n\nThe house also produces bespoke shirts from HK$3,800, and their ready-to-wear collections are fully canvassed — consistent with the house's uncompromising standards across every tier of its offering. Magnus & Novus has curated wedding wardrobes for Four Seasons Hong Kong and serves as a bespoke partner for Lane Crawford.

Bespoke suits from HK$33,800, placing the house at the higher end of Hong Kong's bespoke market. Appointments advised at Lane Crawford IFC, Level 3, IFC Mall, and Lane Crawford Times Square, 1 Matheson Street, Causeway Bay.`,
      },
      {
        heading: "W.W. Chan & Sons ◆◆◆",
        content: `Founded in Shanghai in 1952 and relocated to Hong Kong, W.W. Chan & Sons is the most consistently recommended bespoke house in the city among serious menswear writers and well-travelled clients. Their construction follows the Shanghai tradition: full canvas, hand-padded lapels, and a fitting process that prioritises anatomical precision over speed.\n\nThe house does not impose a strong signature aesthetic — the client's preference drives the cut — which makes it particularly well-suited to those who know exactly what they want. Patrons may introduce personal nuances while working within the house's framework of structured yet supple construction, with extensive handwork producing exceptional breathability and fit.\n\nW.W. Chan's international trunk show programme has introduced the house to clients in New York, London, and across Asia. Their suits are built for longevity: full canvas construction, elite textiles, and a commitment to perpetual alterations mean a W.W. Chan suit is genuinely a long-term investment.\n\nSuits from HK$20,000, inclusive of adjustments. Unit B, 8/F, Entertainment Building, 30 Queen's Road Central.`,
      },
      {
        heading: "A Man Hing Cheong ◆◆◆",
        content: `Founded in 1898, A Man Hing Cheong is Hong Kong's oldest continuously operating tailor — a distinction that carries genuine weight in a city where many establishments have come and gone. The house occupies the mezzanine of the Mandarin Oriental Hotel in Central, a location that reflects both its heritage and its clientele.\n\nA Man Hing Cheong specialises in traditional English-style bespoke suits and shirting. The aesthetic is conservative and precise — this is not a house for those seeking a contemporary or fashion-forward silhouette, but for those who want a correctly made, classically proportioned suit that will serve them for decades. In-house construction, superior cloths, and a house idiom that emphasises fit and resilience over trend have sustained the house's reputation across generations of clients.\n\nSuits from HK$15,000. Mezzanine Floor, Mandarin Oriental Hotel, 5 Connaught Road Central.`,
      },
      {
        heading: "The Armoury ◆◆◆◆",
        content: `The Armoury occupies a unique position in Hong Kong's tailoring landscape: it is not a tailor in the conventional sense, but a retailer and intermediary that provides access to some of the world's finest independent tailoring houses through a curated trunk show programme.\n\nThrough The Armoury, Hong Kong clients can commission bespoke suits from Italian, Japanese, and other international ateliers — houses that would otherwise require a trip to Naples, Florence, or Tokyo. The in-house team provides guidance on house selection, fabric, and construction, and manages the fitting process across multiple trunk show visits.\n\nThe trade-off is time and logistics: commissions through The Armoury require patience, as the fitting process spans multiple trunk show visits over several months. For clients who are well-travelled or who have specific international house preferences, the access The Armoury provides is unmatched in Hong Kong.\n\nSuits from HK$25,000, depending on the atelier. Pedder Arcade, Level 5, Pedder Building, 12 Pedder Street, Central. By appointment at Carlyle Club, Rosewood Hong Kong.`,
      },
      {
        heading: "Dorsia ◆◆",
        content: `Dorsia is a contemporary Hong Kong menswear house offering bespoke and made-to-measure suits, shirts, and tailored separates. The house is positioned at the intersection of traditional bespoke craft and contemporary design sensibility — a combination that appeals to professionals who want the fit and construction quality of bespoke without the conservative aesthetic of the older Shanghainese houses.\n\nDorsia's fabric library draws from leading European mills, and their construction standards — full canvas, hand-finishing, multiple fittings — are consistent with the best bespoke houses in the city. The house also offers a made-to-measure programme for clients who want a faster turnaround without sacrificing fit quality.\n\nThe house is well-suited to the first-time bespoke client: the consultation process is thorough, the pricing is transparent, and the team is experienced in guiding clients through fabric and construction choices. Suits from HK$12,800.`,
      },
      {
        heading: "Ascot Chang ◆◆",
        content: `Founded in 1953, Ascot Chang is the most established shirtmaker in Hong Kong — a house with over seventy years of continuous operation and a client base that spans the city's business and diplomatic community. The shirts are the reason to visit: bespoke shirts made in-house, with the collar, cuff, placket, and buttonholes each executed by hand, using fine cottons sourced from leading European mills.\n\nAscot Chang also carries suits and stocks brands including Isaia, but the shirts are the core offering. For the professional building a wardrobe in Hong Kong, a commission at Ascot Chang for shirts — paired with a bespoke suit from one of the houses above — represents the standard combination recommended by experienced dressers in the city.\n\nShirts from HK$1,500. Suits from HK$15,000 if required. Multiple locations including Shop 113-114, Prince's Building, 10 Chater Road, Central, and The Peninsula Hong Kong.`,
      },
      {
        heading: "Brioni ◆◆◆◆◆",
        content: `Brioni is one of the most distinguished names in Italian tailoring, and the house maintains a presence in Hong Kong through its flagship boutique at Landmark, Central. Founded in Rome in 1945, Brioni built its reputation on a broader-shouldered, more dramatic silhouette than the Neapolitan tradition — suits built to command attention in a boardroom or at a state dinner.

The Hong Kong boutique offers Brioni's made-to-measure programme, which allows clients to select from the house's proprietary cloth archive — among the finest in the world — and have garments constructed to their measurements by Brioni's craftsmen in Penne, Abruzzo. The process typically involves one or two fittings and a lead time of eight to twelve weeks.

For those who want the authority of a Roman house without travelling to Italy, the Hong Kong boutique provides a credible and well-managed entry point. The made-to-measure programme is not bespoke in the traditional sense, but the construction standards — full canvas, hand-finishing, proprietary cloth — are consistent with the house's global reputation.

Made-to-measure suits from HK$90,000. Shop 209, The Landmark, 15 Queen's Road Central.`,
      },
      {
        heading: "Brunello Cucinelli ◆◆◆◆◆",
        content: `Brunello Cucinelli occupies a singular position in the luxury menswear landscape — a house that has made restraint and quiet authority its defining proposition. The brand's tailoring is characterised by exceptional cloth quality (the house controls its own cashmere supply chain), a relaxed but precise silhouette, and an aesthetic that is deliberately understated.

In Hong Kong, Brunello Cucinelli is available at its boutique in Landmark, Central, and through select concessions at Lane Crawford. The house does not offer a traditional bespoke programme, but its made-to-measure service — available through the boutique — allows clients to commission garments in the house's proprietary fabrics with adjustments to fit and specification.

The Cucinelli client is typically someone who has moved beyond the need for a strong house signature — someone who wants the finest cloth, impeccable construction, and a suit that will not date. The price reflects the cloth quality and the artisanal production standards at the Solomeo atelier in Umbria.

Ready-to-wear suits from HK$28,000. Made-to-measure from HK$60,000. Shop 219, The Landmark, 15 Queen's Road Central.`,
      },
      {
        heading: "Ermenegildo Zegna ◆◆◆◆",
        content: `Zegna is the most commercially established Italian tailoring house in Hong Kong, with multiple boutiques across the city and a made-to-measure programme that is among the most accessible of the international houses. The house's strength lies in its cloth: Zegna controls its own wool supply chain from the Biella region of northern Italy, and the fabrics available through the made-to-measure programme are among the finest in production.

The Zegna made-to-measure service — Su Misura — is available at the flagship boutique in Landmark and at IFC Mall. Clients select from an extensive cloth archive, specify construction details, and have garments produced at the Trivero atelier. The process is well-managed and the results are consistently reliable, if not as architecturally distinctive as the best bespoke houses.

For the professional who wants a well-made suit in exceptional cloth, delivered with the reliability of a major house, Zegna's Su Misura programme is one of the most practical options available in Hong Kong. The house also produces a strong ready-to-wear collection that serves as an excellent entry point.

Su Misura suits from HK$45,000. Ready-to-wear from HK$18,000. Multiple locations including Shop 115, The Landmark, and Shop 3041, IFC Mall.`,
      },
      {
        heading: "Tom Ford ◆◆◆◆◆",
        content: `Tom Ford's tailoring occupies a specific and deliberate position: it is the most overtly glamorous proposition in Hong Kong's premium menswear landscape. The house's suits are characterised by a sharp, elongated silhouette, a strong shoulder, and a construction standard that is genuinely exceptional — full canvas, hand-finishing, and a cloth archive that draws from the finest Italian and English mills.

The Hong Kong boutique at Landmark offers Tom Ford's made-to-measure programme alongside the ready-to-wear collection. The made-to-measure service allows clients to commission garments in house fabrics with adjustments to fit, lining, and detailing. The process is more streamlined than a traditional bespoke commission, but the results are among the most polished available in the city.

Tom Ford is the right choice for the client who wants a suit with a strong, recognisable aesthetic — one that communicates confidence and a degree of theatricality. It is not the house for those who want to disappear into a room; it is the house for those who want to own it.

Made-to-measure suits from HK$80,000. Ready-to-wear from HK$25,000. Shop 209A, The Landmark, 15 Queen's Road Central.`,
      },
      {
        heading: "Suitsupply ◆",
        content: `Suitsupply represents the most accessible entry point in Hong Kong's tailored menswear landscape — a Dutch brand that has built its reputation on delivering well-constructed suits at a price point that would have been unimaginable a decade ago. The house is not bespoke, and it does not pretend to be: it is a made-to-measure and ready-to-wear operation that competes on value, consistency, and availability.

The Hong Kong store at IFC Mall offers Suitsupply's made-to-measure programme, which allows clients to select from a broad cloth range and have garments adjusted to their measurements. The construction is half-canvas on most models, with full canvas available on the upper tier. The fit is reliable and the turnaround is fast — typically two to three weeks.

For the professional who is new to tailoring, or who needs a well-presented suit without the investment of a full bespoke commission, Suitsupply is the most rational starting point in the city. It is also an excellent option for occasional-wear suits — garments that will be worn a handful of times per year and do not warrant the investment of a bespoke commission.

Ready-to-wear suits from HK$2,500. Made-to-measure from HK$4,500. Shop 3003, Podium Level 3, IFC Mall, 8 Finance Street, Central.`,
      },
      {
        heading: "How to Commission Your First Bespoke Suit in Hong Kong",
        content: `For those approaching bespoke tailoring for the first time, the process is more straightforward than it appears. A first consultation with any of the houses above will typically last between 45 minutes and an hour. The tailor will ask about your lifestyle, the occasions you dress for, your existing wardrobe, and your aesthetic preferences. They will take a comprehensive set of measurements and discuss fabric options in detail.\n\nBring reference images if you have them. Photographs of suits you admire — from magazines, online sources, or garments you have seen in person — are enormously helpful in communicating aesthetic preferences that can be difficult to articulate verbally.\n\nExpect two to three fittings over a period of four to eight weeks. The first fitting is typically a basted shell — a roughly constructed version of the garment that allows the fit to be assessed and adjusted before the final fabric is cut. Subsequent fittings refine the fit progressively until the garment is complete.\n\nBe patient with the process. A well-made suit takes time. Resist the temptation to rush the fittings or accept a result that is not quite right. The investment you are making deserves the time required to do it properly.`,
      },
    ],
    relatedGuides: [
      { title: "Understanding Bespoke, MTM & RTW Suits", slug: "bespoke-made-to-measure-and-ready-to-wear-suit-guide" },
      { title: "The Essential Guide to Suit Fabrics", slug: "essential-guide-to-suit-fabrics" },
    ],
  },
  "bespoke-made-to-measure-and-ready-to-wear-suit-guide": {
    title: "Understanding Bespoke, Made-to-Measure & Ready-to-Wear",
    category: "Education",
    excerpt: "The definitive guide to the three tiers of suit construction — what they mean, how they differ, and which is right for you.",
    heroImg: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/SmaMsjHhEgNoicVP.jpeg",
    readTime: "10 min read",
    productRail: [
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/pVEPkPApyWtkArag.jpg", name: "Midnight Blue Suit", href: "/tailored-menswear/midnight-blue-suit" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/iiwfHtsspNExjqdN.jpg", name: "Navy Suit", href: "/tailored-menswear/navy-suit" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/TNxmCQSagTsnBwFW.jpg", name: "Charcoal Grey Suit", href: "/tailored-menswear/charcoal-grey-suit" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/OEkbqFLSaAsYpDdV.jpg", name: "Mid Grey Suit", href: "/tailored-menswear/mid-grey-suit" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/lGOiLNUXUbdGKjAk.jpg", name: "Light Grey Suit", href: "/tailored-menswear/light-grey-suit" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/BiulTpyoJMPOqBrQ.jpg", name: "Charcoal Pinstripe DB", href: "/tailored-menswear/charcoal-grey-pinstripe-db" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/ZJmCUyhPTHiSBKEX.jpg", name: "Dark Grey DB", href: "/tailored-menswear/dark-grey-double-breasted" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/heiIXvqutPSXYsQT.jpg", name: "Black Suit", href: "/tailored-menswear/black-suit" },
    ],
    productRailViewAll: { href: "/tailored-menswear", label: "Shop Suits" },
    sections: [
      {
        heading: "The Three Tiers of Suit Construction",
        content: `When shopping for a suit, you will encounter three distinct approaches to construction: ready-to-wear, made-to-measure, and bespoke. Understanding the differences between them is essential to making an informed decision about where to invest your money.\n\nEach tier represents a different balance of cost, convenience, and quality. Ready-to-wear offers immediate availability at the lowest price point. Made-to-measure provides a closer fit and some personalisation at a moderate premium. Bespoke delivers the highest level of craftsmanship, fit, and personalisation — at a corresponding investment.`,
      },
      {
        heading: "Ready-to-Wear: Convenience and Accessibility",
        content: `Ready-to-wear (RTW) suits are manufactured in standard sizes and sold from stock. They represent the entry point of the market and range from fast-fashion garments to high-quality offerings from established luxury houses.\n\nThe primary advantage of ready-to-wear is convenience — a suit can be purchased and worn immediately, with minor alterations carried out by an in-house tailor. The limitation is that a standard-sized garment can never account for the full range of individual body proportions. A man with broad shoulders and a slim waist, or a shorter torso and longer legs, will always find that ready-to-wear requires significant alteration to achieve a satisfactory fit.\n\nAt the higher end of the ready-to-wear market, construction quality can be excellent. Fully canvassed suits from established houses offer genuine longevity and a superior drape compared to fused garments. However, the fit will always be a compromise.`,
      },
      {
        heading: "Made-to-Measure: A Closer Fit",
        content: `Made-to-measure (MTM) sits between ready-to-wear and bespoke. A standard block pattern is adjusted to the client's measurements, and a range of personalisation options — fabric, lining, buttons, lapel style — are typically available.\n\nThe result is a garment that fits considerably better than off-the-rack, without the time and investment required for full bespoke. For many professionals, made-to-measure represents an excellent balance of quality, fit, and value.\n\nIt is important to note, however, that made-to-measure is not bespoke. The pattern is modified rather than created from scratch, which means that unusual proportions or significant asymmetries may not be fully accommodated. The level of hand-finishing also varies considerably between providers.`,
      },
      {
        heading: "Bespoke: The Highest Standard",
        content: `Bespoke tailoring is the creation of a garment from a pattern made exclusively for the individual client. The word derives from the English tailoring tradition — a cloth was said to have been "bespoken" when it was set aside for a specific client.\n\nIn true bespoke tailoring, the cutter takes a comprehensive set of measurements and creates a unique pattern that accounts for the client's precise proportions, posture, and any asymmetries. A toile or basted shell is typically made first, allowing the fit to be assessed and refined before the final fabric is cut.\n\nThe construction of a bespoke garment involves a significant amount of hand-work: the canvas interlining is hand-padded to the shape of the client's chest; the lapels are hand-rolled; the buttonholes are hand-sewn. These techniques, which take years to master, produce a garment that moves with the body in a way that no machine-made garment can replicate.\n\nThe investment in bespoke is substantial — both in terms of cost and time. A bespoke suit typically requires multiple fittings over several weeks. But the result is a garment that fits perfectly, improves with wear, and can last decades with proper care.`,
      },
      {
        heading: "Which is Right for You?",
        content: `The right choice depends on your budget, timeline, and priorities.\n\nIf you need a suit quickly and your budget is limited, a well-chosen ready-to-wear suit with good alterations can serve you well. Focus on finding a suit where the shoulders fit correctly — the one element that cannot easily be altered.\n\nIf you want a closer fit and some personalisation, and are willing to invest a moderate amount, made-to-measure is an excellent option. It offers a significant step up from ready-to-wear in both fit and quality.\n\nIf you are building a professional wardrobe that will serve you for years, or if you have proportions that ready-to-wear does not accommodate well, bespoke is the appropriate investment. The cost per wearing over the lifetime of a well-made bespoke suit is often lower than that of a succession of ready-to-wear garments.\n\nFor a personalised recommendation, take our Tailor Finder Brief.`,
      },
    ],
    relatedGuides: [
      { title: "The Essential Guide to Suit Fabrics", slug: "essential-guide-to-suit-fabrics" },
      { title: "The Art of Acquiring a Superior Suit", slug: "art-of-acquiring-a-superior-suit" },
    ],
  },
  "essential-guide-to-suit-fabrics": {
    title: "The Essential Guide to Suit Fabrics",
    category: "Fabrics",
    excerpt: "Everything you need to know about suit fabrics — from Super 100s wool to cashmere blends, and how to choose the right material for Hong Kong's climate.",
    heroImg: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/prqGrMlrEOEEDwqq.jpeg",
    readTime: "12 min read",
    sections: [
      {
        heading: "Why Fabric is the Foundation of a Great Suit",
        content: `The fabric of a suit is not merely its surface — it is the foundation of everything. The weight, weave, and fibre content of a cloth determine how a suit drapes, how it breathes, how long it lasts, and how it responds to the body over time. A superbly cut suit in a poor fabric will always disappoint; a well-chosen cloth can elevate even a modest construction.\n\nFor those commissioning a bespoke or made-to-measure suit in Hong Kong, fabric selection is one of the most important decisions in the process. Understanding the key variables — fibre, weave, weight, and mill — will help you make a choice you will not regret.`,
      },
      {
        heading: "Wool: The Benchmark Fabric",
        content: `Wool is the benchmark fabric for suiting, and for good reason. It is breathable, resilient, drapes beautifully, and responds well to pressing. It is also naturally crease-resistant and has a degree of moisture-wicking that makes it comfortable across a range of temperatures.\n\nThe quality of wool suiting is often expressed in terms of "Super" numbers — Super 100s, Super 120s, Super 150s, and so on. These numbers refer to the fineness of the wool fibre: a higher number indicates a finer, softer fibre. Super 100s to Super 130s represent the practical sweet spot for most suits — fine enough to drape beautifully, robust enough to withstand regular wear. Super 150s and above are extraordinarily soft but require careful handling.\n\nFor Hong Kong's climate — hot and humid for much of the year — a lightweight tropical wool in the 9–11 oz range is the most practical choice for year-round business wear.`,
      },
      {
        heading: "Cashmere and Luxury Blends",
        content: `Cashmere is the most luxurious of the natural suiting fibres. Pure cashmere suits are extraordinarily soft and have an unmatched lustre, but they are less resilient than wool and require more careful maintenance. For most clients, a cashmere-wool blend — typically 10–30% cashmere — offers a practical compromise: the softness and warmth of cashmere combined with the durability and structure of wool.\n\nOther luxury blends include silk-wool (which adds a subtle sheen and lightness), linen-wool (ideal for warmer months), and mohair-wool (which produces a distinctive bright finish popular for evening wear and summer suiting).`,
      },
      {
        heading: "Weave Structures: Plain, Twill, and Beyond",
        content: `Beyond fibre content, the weave structure of a cloth significantly affects its appearance and performance. The most common weave structures in suiting are:\n\nPlain weave produces a smooth, even surface with a matte finish. It is versatile and works well for both business and formal wear. Flannel is a plain-woven wool with a slightly brushed surface, giving it a softer, more casual character.\n\nTwill weave creates a diagonal rib pattern on the surface of the cloth. Serge and gabardine are both twill-woven wools — gabardine in particular is known for its smooth, firm surface and excellent crease resistance, making it a favourite for business trousers.\n\nHerringbone and houndstooth are pattern weaves that create distinctive visual textures. They add character to a suit and are particularly well-suited to sport coats and country-wear contexts.`,
      },
      {
        heading: "The World's Leading Fabric Mills",
        content: `The provenance of a fabric matters. The world's finest suiting cloths come from a handful of mills with centuries of expertise — primarily in England, Italy, and Scotland.\n\nEnglish mills such as Holland & Sherry produce cloths of exceptional quality, with a particular strength in traditional patterns and robust business weights. Italian mills — Loro Piana, Zegna, Vitale Barberis — are known for their extraordinarily fine wools and innovative blends. Scottish mills excel in tweeds and heavier country cloths.\n\nWhen commissioning a bespoke suit, ask your tailor about the provenance of the fabrics they carry. A tailor with access to a broad selection from these leading mills is in a position to offer you genuinely exceptional cloth.`,
      },
      {
        heading: "Choosing the Right Fabric for Hong Kong",
        content: `Hong Kong's climate presents a specific challenge for suiting. The city is hot and humid from April to October, with temperatures regularly exceeding 30°C and humidity levels that can make even a lightweight suit uncomfortable.\n\nFor year-round business wear, a tropical-weight wool in the 8–10 oz range is the most practical choice. These cloths are woven with an open structure that allows air to circulate, keeping the wearer cooler than a denser fabric would. Despite their lightness, good tropical wools drape well and hold a crease effectively.\n\nFor the cooler months from November to February, a medium-weight flannel or tweed in the 11–13 oz range offers warmth without being oppressive in Hong Kong's mild winters.\n\nFor formal occasions, a Super 120s or 130s wool in a plain or fine twill weave is appropriate year-round — the finer fibre compensates for the slightly denser weave.`,
      },
    ],
    productRail: [
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/FlUtZXQmAETyFHRl.jpeg", name: "Holland & Sherry", href: "/holland-sherry-anthology" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/BXAsZfqUdLFfTqpX.jpg", name: "Vitale Barberis", href: "/vbc-anthology" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/PKJoscCNPdnsQqhg.jpg", name: "Dormeuil", href: "/dormeuil-anthology" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/ZejCtjgeenPpZlxu.jpg", name: "Scabal", href: "/scabal-anthology" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/prqGrMlrEOEEDwqq.jpeg", name: "Loro Piana", href: "/loro-piana-anthology" },
    ],
    productRailViewAll: { href: "/loro-piana-anthology", label: "Browse Mills" },
    relatedGuides: [
      { title: "Understanding Bespoke, MTM & RTW Suits", slug: "bespoke-made-to-measure-and-ready-to-wear-suit-guide" },
      { title: "How to Choose the Perfect Shirt Fabric", slug: "how-to-choose-the-perfect-shirt-fabric" },
      { title: "HK's Finest Tailoring", slug: "hk-finest-tailoring" },
    ],
  },
  "menswear-made-to-measure-services-in-hong-kong": {
    title: "16 Menswear Made-to-Measure Services in Hong Kong",
    excerpt: "A 2026 directory of global brands offering made-to-measure suiting in Hong Kong — from Kiton and Brioni to Suitsupply — with pricing, locations, and craftsmanship analysis.",
    category: "Hong Kong Tailoring",
    readTime: "12 min",
    heroImg: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/sBvBwNIutekhAVDb.webp",
    thumbnail: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/sBvBwNIutekhAVDb.webp",
    sections: [
      {
        heading: "Made-to-Measure in Hong Kong",
        content: `In the vibrant menswear landscape of Hong Kong, made-to-measure (MTM) services offer an ideal blend of personalisation, quality, and convenience. Unlike bespoke, which involves extensive fittings and a pattern created from scratch, MTM adjusts pre-existing patterns to your measurements — delivering a tailored fit at a fraction of the time and cost. The following is a 2026 directory of global brands offering MTM services in the city.`,
      },
      {
        heading: "1. Ermenegildo Zegna: Italian Mastery",
        content: `Zegna's Made to Measure service is available at their Peking Road boutique, emphasising heritage and textile innovation.\n\n**Style and Craftsmanship:** Soft shoulders, structured fits; proprietary wools including Trofeo. Full-canvas construction, breathable for Hong Kong's climate.\n\n**Services:** Suits, jackets; 1–3 months turnaround.\n\n**Pricing:** HK$15,000–30,000. Sustainable fabric options available.\n\n**Assessment:** Legendary in textiles and timeless suiting — a benchmark for Italian MTM.`,
      },
      {
        heading: "2. Kiton: Neapolitan Luxury",
        content: `Kiton's made-to-measure services are available at their Hong Kong boutique in Elements Mall (Shop 2009, Second Level, 1 Austin Road West, Tsim Sha Tsui).\n\n**Style and Craftsmanship:** Signature Neapolitan style with soft, unstructured shoulders, lightweight construction, and hand-stitched details including padded chests and seamless lapels. Ultra-fine fabrics such as cashmere and vicuña for a refined silhouette comfortable in humid climates.\n\n**Services:** Suits, blazers, overcoats, shirts; 1–2 months turnaround with in-store measurements and fittings. The Lasa service blends MTM and bespoke elements for superior handwork.\n\n**Pricing:** HK$30,000–60,000.\n\n**Assessment:** The pinnacle of Italian tailoring — timeless luxury at a premium.`,
      },
      {
        heading: "3. Brioni: Roman Customisation",
        content: `Brioni's Made to Order service is available at their IFC Mall store, focused on opulent Roman tailoring.\n\n**Style and Craftsmanship:** Bold lapels, slim fits; vicuña blends. Hand-sewn throughout for a premium hand.\n\n**Services:** Suits, tuxedos; 1–3 months.\n\n**Pricing:** HK$20,000–40,000.\n\n**Assessment:** Elegant and understated — the Roman school at its most refined.`,
      },
      {
        heading: "4. Tom Ford: Contemporary American MTM",
        content: `Tom Ford's made-to-measure offerings are available at their IFC Mall boutique.\n\n**Style and Craftsmanship:** Sharp, precisely cut silhouettes in luxurious fabrics. Strongly defined shoulders and a close-fitting chest.\n\n**Services:** Suits, tuxedos; 1–3 months.\n\n**Pricing:** HK$15,000–35,000.\n\n**Assessment:** Stylish and contemporary — ideal for clients seeking a modern, assertive silhouette.`,
      },
      {
        heading: "5. Magnus & Novus: Timeless Iconic Menswear",
        content: `Magnus & Novus offers MTM at their Sheung Wan studio and through Lane Crawford partners at IFC Mall.\n\n**Style and Craftsmanship:** Bespoke-inspired construction; hand-stitched throughout. Fuller, considered proportions with ethical sourcing. Lifetime alterations included.\n\n**Services:** Suits, shirts; 1–3 months.\n\n**Pricing:** HK$30,000–50,000.\n\n**Assessment:** A focus on timeless iconic design, handcraft, and fabrication — the standout Hong Kong-based MTM house.`,
      },
      {
        heading: "6. Hermès: French Prestige MTM",
        content: `Hermès' made-to-measure services are available at stores including Lee Gardens.\n\n**Style and Craftsmanship:** Refined and luxurious; shirts and suits with superior leathers and silks.\n\n**Services:** Shirts, accessories; 2–3 months. Exclusive private lounges for consultations.\n\n**Pricing:** HK$20,000 and above.\n\n**Assessment:** The ultimate in prestige — unique customisations for the most discerning client.`,
      },
      {
        heading: "7. Brunello Cucinelli: Humanistic Italian MTM",
        content: `Brunello Cucinelli's MTM service is available at their IFC Mall boutique, embodying ethical luxury.\n\n**Style and Craftsmanship:** Relaxed, cashmere-infused cuts; neutral palettes with soft shoulders. Handcrafted for comfort using the finest Italian materials.\n\n**Services:** Suits, knitwear; 1–3 months, in-store fittings.\n\n**Pricing:** HK$20,000–40,000. Personalisation in Solomeo-inspired settings.\n\n**Assessment:** Timeless, humanistic appeal — particularly well-suited to broader frames.`,
      },
      {
        heading: "8. Ralph Lauren: American Tailoring",
        content: `Ralph Lauren's Made to Measure service is available at their Landmark Prince's flagship.\n\n**Style and Craftsmanship:** Elegant Americana; customisable fabrics with impeccable construction. Purple Label upgrades available for the most discerning commissions.\n\n**Services:** Suits, furnishings; 1–3 months.\n\n**Pricing:** HK$20,000–35,000.\n\n**Assessment:** Stylish and versatile — a reliable choice for the professional wardrobe.`,
      },
      {
        heading: "9. Thom Browne: Avant-Garde American MTM",
        content: `Thom Browne's MTM service is available at their Harbour City boutique.\n\n**Style and Craftsmanship:** Shrunken suits, playful proportions; precise and uncompromising tailoring. Conceptual designs that challenge conventional suiting.\n\n**Services:** Suits; 1–3 months.\n\n**Pricing:** HK$15,000–30,000.\n\n**Assessment:** One-of-a-kind styling — for clients who wear their wardrobe as a statement.`,
      },
      {
        heading: "10. Dior: Parisian Couture-Inspired MTM",
        content: `Dior's Made to Measure service is available at their Landmark boutique, Landmark Atrium.\n\n**Style and Craftsmanship:** Elegant, structured cuts with a focus on Parisian flair; soft shoulders and refined silhouettes in premium wools and cashmere. Hand-finished details evoke couture heritage.\n\n**Services:** Suits, jackets, trousers; 1–3 months, with in-boutique consultations and fittings.\n\n**Pricing:** HK$20,000–40,000.\n\n**Assessment:** Celebrates Dior's couture roots — ideal for sophisticated, theatrical styles.`,
      },
      {
        heading: "11. The Armoury: Curated Japanese-Italian MTM",
        content: `The Armoury's Central hub features Ring Jacket MTM alongside their curated selection of international tailoring.\n\n**Style and Craftsmanship:** Padded and unpadded options; hand-attached collars. A connoisseur's range of styles from Japanese and Italian makers.\n\n**Services:** Suits; trunk shows and in-store consultations.\n\n**Pricing:** HK$12,000–28,000.\n\n**Assessment:** Diverse styles for the informed client — a destination for those who know what they want.`,
      },
      {
        heading: "12. Suitsupply: Contemporary MTM for Urban Professionals",
        content: `Suitsupply's Custom Made programme is available at their Central boutique (10 Ice House Street).\n\n**Style and Craftsmanship:** Slim, contemporary cuts with Italian fabrics including Vitale Barberis. Half-canvas construction ensures durability; particularly well-regarded for athletic fits.\n\n**Services:** Suits, blazers, shirts; 3–4 weeks turnaround with one fitting. App-based customisation available.\n\n**Pricing:** HK$4,000–8,000.\n\n**Assessment:** The most accessible entry point to MTM — modern, well-made, and efficiently delivered.`,
      },
      {
        heading: "13. Canali: Classic Italian Business Tailoring",
        content: `Canali's MTM service is available at their Harbour City boutique.\n\n**Style and Craftsmanship:** Padded shoulders, nipped waists; Super 130s wools. Hand-stitched details for longevity and a clean finish.\n\n**Services:** Suits, blazers; 1–3 months.\n\n**Pricing:** HK$12,000–25,000.\n\n**Assessment:** Practical Italian menswear — dependable quality for the business wardrobe.`,
      },
      {
        heading: "14. Dunhill: British Elegance in MTM",
        content: `Dunhill's Made to Measure services are available at their Harbour City boutique.\n\n**Style and Craftsmanship:** Signature British cuts with three distinct silhouettes, emphasising structured shoulders, refined waists, and seasonal fabrics including Prince of Wales checks and Glenchecks. Premium wools and silks throughout.\n\n**Services:** Tailoring, shirting, coats, eveningwear; 4–6 weeks turnaround with in-store measurements and fittings.\n\n**Pricing:** HK$20,000–40,000. Complimentary services for select clients.\n\n**Assessment:** Timeless British sophistication — excels in formal and eveningwear commissions.`,
      },
      {
        heading: "15. Prada: Italian Avant-Garde MTM",
        content: `Prada's Made to Measure services are available at their Hong Kong boutiques, including dedicated areas in their Harbour City flagship.\n\n**Style and Craftsmanship:** Modern Italian silhouettes with slim fits, innovative fabrics, and couture-inspired details. Soft shoulders, tailored waists, and options for unique prints or leather accents.\n\n**Services:** Suits, shirts, coats, leather garments; 4–6 weeks with in-boutique consultations, measurements, and fittings. Virtual reality previews available for select items.\n\n**Pricing:** HK$25,000–50,000. Double Match personalisation for striking print combinations.\n\n**Assessment:** Exclusive and fashion-forward — for clients who wish to push the boundaries of tailored dress.`,
      },
      {
        heading: "16. Giorgio Armani: Sophisticated Italian MTM",
        content: `Giorgio Armani's Made to Measure services are available at their Hong Kong boutiques, including the Canton Road store in Harbour City.\n\n**Style and Craftsmanship:** Timeless Italian elegance with structured yet comfortable cuts; soft shoulders, refined silhouettes, and premium fabrics including fine wools and silks. Hand-finished details emphasise couture-level precision.\n\n**Services:** Suits, jackets, trousers, shirts, eveningwear; 4–6 weeks turnaround with in-boutique consultations, measurements, and fittings. Access to visiting Italian tailors for enhanced experiences.\n\n**Pricing:** HK$25,000–50,000. Exclusive fabrics and digital customisation tools available.\n\n**Assessment:** The epitome of sophisticated luxury — understated refinement that blends tradition with modernity.`,
      },
      {
        heading: "Atelier Direct: Access by Enquiry",
        content: `At Tailors.hk, our partners produce some of the finest tailoring in the city. Private clients gain access to bespoke, MTM, and made-to-order services from HK$12,800 — multiple fittings, 2–4 weeks, with exclusive member rates available on enquiry. Enquire to begin your tailoring journey.`,
      },
    ],
    relatedGuides: [
      { title: "Understanding Bespoke, MTM & RTW Suits", slug: "bespoke-made-to-measure-and-ready-to-wear-suit-guide" },
      { title: "16 Made-to-Measure Services in Hong Kong", slug: "menswear-made-to-measure-services-in-hong-kong" },
    ],
  },
  "art-of-acquiring-a-superior-suit": {
    title: "The Art of Acquiring a Superior Suit",
    category: "Education",
    excerpt: "A guide to the principles behind a truly great suit — construction, fit, fabric, and the details that separate the exceptional from the ordinary.",
    heroImg: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/ELTmQJGEAkQMOFIc.png",
    readTime: "9 min read",
    productRail: [
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/pVEPkPApyWtkArag.jpg", name: "Midnight Blue Suit", href: "/tailored-menswear/midnight-blue-suit" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/iiwfHtsspNExjqdN.jpg", name: "Navy Suit", href: "/tailored-menswear/navy-suit" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/TNxmCQSagTsnBwFW.jpg", name: "Charcoal Grey Suit", href: "/tailored-menswear/charcoal-grey-suit" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/OEkbqFLSaAsYpDdV.jpg", name: "Mid Grey Suit", href: "/tailored-menswear/mid-grey-suit" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/lGOiLNUXUbdGKjAk.jpg", name: "Light Grey Suit", href: "/tailored-menswear/light-grey-suit" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/BiulTpyoJMPOqBrQ.jpg", name: "Charcoal Pinstripe DB", href: "/tailored-menswear/charcoal-grey-pinstripe-db" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/ZJmCUyhPTHiSBKEX.jpg", name: "Dark Grey DB", href: "/tailored-menswear/dark-grey-double-breasted" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/heiIXvqutPSXYsQT.jpg", name: "Black Suit", href: "/tailored-menswear/black-suit" },
    ],
    productRailViewAll: { href: "/tailored-menswear", label: "Shop Suits" },
    sections: [
      {
        heading: "What Separates a Superior Suit from an Ordinary One",
        content: `A truly superior suit is not merely a well-fitting garment. It is the product of a set of decisions — about construction, fabric, proportion, and detail — that, taken together, produce something that transcends its constituent parts.\n\nThe difference between an ordinary suit and an exceptional one is not always immediately visible. It reveals itself over time: in the way the garment holds its shape after a long day; in the way the lapels roll naturally rather than lying flat; in the way the shoulder sits without pulling or creasing. These qualities are the product of skilled construction and good fabric — and they cannot be replicated by any shortcut.`,
      },
      {
        heading: "Construction: The Foundation of Quality",
        content: `The single most important factor in suit quality is construction — specifically, whether the jacket is fused or canvassed.\n\nA fused jacket has its front panels bonded to an interlining using heat and adhesive. This is the standard construction method for most ready-to-wear suits. It is fast and inexpensive, but it produces a jacket that feels stiff, does not breathe well, and tends to delaminate over time — particularly in humid climates like Hong Kong's.\n\nA canvassed jacket uses a layer of woven horsehair canvas that is hand-padded to the shape of the wearer's chest. This canvas is not bonded to the fabric — it floats between the outer cloth and the lining, allowing the jacket to mould to the wearer's body over time. The result is a garment that improves with wear, drapes more naturally, and lasts far longer than a fused equivalent.\n\nHalf-canvas construction — where the canvas extends through the chest and lapels but not the full front — is a practical compromise, offering many of the benefits of full canvas at a lower cost.`,
      },
      {
        heading: "Fit: The Non-Negotiable",
        content: `No amount of quality fabric or skilled construction can compensate for poor fit. A suit that does not fit correctly will always look wrong, regardless of its other qualities.\n\nThe shoulder is the most critical element of fit and the hardest to alter. The seam where the sleeve meets the jacket body should sit precisely at the edge of the shoulder — not overhanging it, not pulled inward. A shoulder that is even slightly off will affect the entire appearance of the jacket.\n\nThe chest should button without pulling across the front. When buttoned, you should be able to slide a flat hand inside the jacket, but no more. The waist suppression — the degree to which the jacket tapers at the waist — should reflect your body's natural shape without being so tight as to restrict movement.\n\nThe trouser fit is equally important. The waistband should sit at the natural waist without requiring a belt to stay in place. The seat should have enough room to sit comfortably without excess fabric bunching at the back.`,
      },
      {
        heading: "The Details That Define a Superior Suit",
        content: `Beyond construction and fit, a number of details distinguish a superior suit from an ordinary one.\n\nButtonholes are one of the most reliable indicators of quality. Hand-sewn buttonholes have a slightly irregular, organic quality that machine-made buttonholes cannot replicate. On a quality bespoke suit, the sleeve buttons will be functional — they will actually unbutton — a detail known as "surgeon's cuffs."\n\nThe pick-stitching on the lapels — the line of hand-stitching that runs along the edge — is another marker of quality. On a bespoke garment, this stitching is done by hand and has a slight irregularity that gives the lapel its characteristic roll.\n\nThe lining should be cut generously enough to allow free movement without pulling. A quality lining in a fine silk or Bemberg will breathe better and last longer than a synthetic alternative.`,
      },
    ],
    relatedGuides: [
      { title: "Understanding Bespoke, MTM & RTW Suits", slug: "bespoke-made-to-measure-and-ready-to-wear-suit-guide" },
      { title: "The Essential Guide to Suit Fabrics", slug: "essential-guide-to-suit-fabrics" },
      { title: "HK's Finest Tailoring", slug: "hk-finest-tailoring" },
    ],
  },

  "flattering-menswear-for-tall-and-short": {
    title: "Flattering Menswear for the Tall & the Short",
    category: "Style",
    excerpt: "How to use tailoring to flatter your proportions — specific guidance for taller and shorter frames on cut, lapel width, and trouser break.",
    heroImg: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/xnwszfnBnyzwBjvQ.png",
    readTime: "7 min read",
    sections: [
      {
        heading: "Why Proportion Matters in Tailoring",
        content: `One of the most powerful things a well-tailored garment can do is optimise the visual proportions of the wearer. The relationship between jacket length, lapel width, button stance, and trouser break creates a visual system that can elongate, broaden, slim, or balance a figure with remarkable effectiveness.\n\nThis is one of the key advantages of bespoke and made-to-measure tailoring over ready-to-wear: the ability to adjust these proportional elements specifically for the individual, rather than accepting the standard proportions built into an off-the-rack garment.`,
      },
      {
        heading: "Tailoring for Taller Frames",
        content: `Taller men have the advantage of being able to carry a wider range of suit proportions, but there are specific choices that will flatter a tall frame most effectively.\n\nA slightly longer jacket length — proportional to the torso — prevents the jacket from looking too short relative to the legs. Wider lapels balance a broader chest and prevent the jacket from looking narrow. A lower button stance creates a longer visual line through the torso.\n\nFor trousers, a fuller break — where the trouser rests on the shoe with a slight fold — can help to visually shorten very long legs. Pleated trousers add volume at the hip and thigh, which can balance a lean frame.\n\nThe key principle for taller men is to avoid proportions that emphasise height at the expense of balance. Very slim lapels, a high button stance, and a very short jacket length can make a tall man look disproportionately long in the torso.`,
      },
      {
        heading: "Tailoring for Shorter Frames",
        content: `For shorter men, the goal of tailoring is typically to create the impression of greater height and a longer, leaner silhouette. Several specific choices help achieve this.\n\nA shorter jacket length — ending at the natural seat — creates a longer visual line for the leg. Narrower lapels in proportion to the chest prevent the jacket from overwhelming the frame. A higher button stance draws the eye upward and creates the impression of a longer torso.\n\nFor trousers, a minimal break — where the trouser just grazes the top of the shoe — elongates the leg. Avoid excessive pleating or volume at the hip, which can add visual bulk.\n\nVertical elements — pinstripes, chalk stripes, and fine herringbone patterns — reinforce the vertical line and contribute to the impression of height. Avoid strong horizontal patterns, which interrupt the vertical line.`,
      },
      {
        heading: "The Universal Principles of Good Proportion",
        content: `Regardless of height, certain principles of proportion apply universally to tailored menswear.\n\nThe jacket should end at approximately the middle of the seat — long enough to cover the seat of the trousers, short enough not to make the legs appear short. The sleeves should show approximately half an inch of shirt cuff. The collar of the shirt should be visible above the jacket collar.\n\nThese are not rigid rules but guidelines developed over centuries of tailoring practice. A skilled tailor will apply them with sensitivity to the individual client's proportions, adjusting them where necessary to achieve the most flattering result.`,
      },
    ],
    relatedGuides: [
      { title: "The Art of Acquiring a Superior Suit", slug: "art-of-acquiring-a-superior-suit" },
      { title: "Understanding Bespoke, MTM & RTW Suits", slug: "bespoke-made-to-measure-and-ready-to-wear-suit-guide" },
      { title: "The Essential Guide to Suit Fabrics", slug: "essential-guide-to-suit-fabrics" },
    ],
  },
  "how-to-choose-the-perfect-shirt-fabric": {
    title: "How to Choose the Perfect Shirt Fabric",
    category: "Fabrics",
    excerpt: "A practical guide to shirt fabrics — from Oxford cloth to Sea Island cotton — and how to match them to occasion and climate.",
    heroImg: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/ZykpTgDqCRlbFqgL.png",
    readTime: "8 min read",
    sections: [
      {
        heading: "The Importance of Shirt Fabric",
        content: `The fabric of a shirt determines not only how it looks but how it feels against the skin, how it breathes in Hong Kong's climate, and how well it holds up to regular wear and laundering. Choosing the right fabric is as important as choosing the right cut.\n\nFor bespoke shirts, the range of available fabrics is vast — from the everyday utility of a good Oxford cloth to the extraordinary luxury of Sea Island cotton. Understanding the key variables will help you build a shirt wardrobe that is both practical and refined.`,
      },
      {
        heading: "Cotton: The Foundation of the Shirt Wardrobe",
        content: `Cotton is the standard fabric for dress and business shirts, and for good reason. It is breathable, comfortable against the skin, easy to launder, and available in a remarkable range of qualities and weave structures.\n\nThe quality of cotton is measured by the fineness of the fibre (expressed as thread count or yarn count) and the length of the staple. Longer-staple cottons — Egyptian, Pima, and Sea Island — produce finer, stronger, and more lustrous yarns than shorter-staple varieties. Two-ply fabrics, where two yarns are twisted together before weaving, are more durable and have a superior drape compared to single-ply equivalents.\n\nFor business shirts in Hong Kong's climate, a two-ply poplin or twill in a 100s or 120s yarn count offers an excellent balance of quality, durability, and comfort.`,
      },
      {
        heading: "Weave Structures for Shirts",
        content: `The weave structure of a shirt fabric affects its texture, sheen, and formality.\n\nPoplin (or broadcloth) is a plain weave that produces a smooth, fine surface with a slight sheen. It is the most formal of the common shirt weaves and works well for business and dress shirts.\n\nTwill weave creates a diagonal rib pattern and produces a fabric with more texture and drape than poplin. Twill shirts are slightly less formal than poplin but are extremely versatile and comfortable.\n\nOxford cloth is a basket weave that produces a heavier, more textured fabric with a casual character. It is ideal for button-down collar shirts and casual business wear, but too informal for formal occasions.\n\nEnd-on-end (or fil-à-fil) is a fine plain weave using alternating coloured and white yarns, producing a subtle two-tone effect. It is an excellent choice for business shirts — formal enough for most professional environments, with more visual interest than a plain white poplin.`,
      },
      {
        heading: "Linen: The Summer Essential",
        content: `Linen is the ideal fabric for warm-weather shirts. It is highly breathable, wicks moisture effectively, and has a natural, relaxed character that suits Hong Kong's summer months.\n\nThe trade-off is that linen creases readily — a characteristic that some consider a mark of authenticity and others find frustrating. Linen-cotton blends offer a practical compromise, retaining much of the breathability of pure linen while being more resistant to creasing.\n\nFor formal occasions in warm weather, a fine linen or linen-cotton blend in white or pale blue is an elegant choice. For more casual contexts, the natural texture and slight irregularity of pure linen adds character.`,
      },
    ],
    productRail: [
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/KVgzkgDrbzwsZQhk.jpg", name: "White Shirt", href: "/tailored-menswear/white-shirt" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/WqPUqZQVzSZcZbCo.jpg", name: "Light Blue Shirt", href: "/tailored-menswear/light-blue-shirt" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/muEGXoshhQGCUQTr.jpg", name: "Light Pink Shirt", href: "/tailored-menswear/light-pink-shirt" },
    ],
    productRailViewAll: { href: "/tailored-menswear", label: "Shop Shirts" },
    relatedGuides: [
      { title: "The Essential Guide to Business Shirt Fabrics", slug: "essential-guide-to-business-shirt-fabrics" },
      { title: "What Makes a Quality Shirt", slug: "what-makes-a-quality-shirt" },
      { title: "The Essential Guide to Suit Fabrics", slug: "essential-guide-to-suit-fabrics" },
    ],
  },
  "essential-guide-to-business-shirt-fabrics": {
    title: "The Essential Guide to Business Shirt Fabrics",
    category: "Fabrics",
    excerpt: "Which fabrics work best for business shirts in Hong Kong's humid climate? A practical guide for the professional wardrobe.",
    heroImg: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/cxYMBJJJLPLejyTt.png",
    readTime: "7 min read",
    sections: [
      {
        heading: "Dressing for Hong Kong's Business Environment",
        content: `Hong Kong's business culture demands a standard of dress that is both professional and practical. The city's climate — hot and humid for much of the year — creates specific challenges for the business wardrobe, and the choice of shirt fabric is one of the most important decisions a professional can make.\n\nThe wrong fabric will leave you uncomfortable and dishevelled by mid-morning. The right fabric will keep you looking composed and feeling comfortable throughout the longest working day.`,
      },
      {
        heading: "The Best Fabrics for Hong Kong Business Shirts",
        content: `For Hong Kong's climate, the most practical business shirt fabrics share a common characteristic: they breathe well and manage moisture effectively.\n\nTwo-ply poplin in a 100s or 120s yarn count is the workhorse of the business shirt wardrobe. It is smooth, formal, and durable. In a fine quality, it has a subtle lustre that reads as polished and professional. It launders well and holds its shape over time.\n\nFine twill in a similar yarn count offers slightly more texture and drape than poplin. It is fractionally less formal but extremely versatile — appropriate for most business contexts and more forgiving in terms of visible creasing.\n\nFor the warmest months, a fine voile or batiste — extremely lightweight plain-weave cottons — offer maximum breathability. They are more delicate than poplin or twill and require more careful laundering, but in the height of summer they are unmatched for comfort.`,
      },
      {
        heading: "Fabrics to Approach with Caution",
        content: `Certain fabrics that look attractive in a temperate climate perform poorly in Hong Kong's heat and humidity.\n\nHeavy Oxford cloth, while excellent for casual contexts, retains heat and moisture and is not well-suited to formal business wear in warm weather. Flannel and brushed cotton are winter fabrics that have no place in a Hong Kong summer wardrobe.\n\nSynthetic fibres — polyester, nylon, and their blends — should generally be avoided for business shirts. They do not breathe, they retain odour, and they have a visual quality that is difficult to mistake for natural fibre. In a professional context, the difference between a natural and synthetic shirt is immediately apparent.`,
      },
    ],
    productRail: [
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/KVgzkgDrbzwsZQhk.jpg", name: "White Shirt", href: "/tailored-menswear/white-shirt" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/WqPUqZQVzSZcZbCo.jpg", name: "Light Blue Shirt", href: "/tailored-menswear/light-blue-shirt" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/muEGXoshhQGCUQTr.jpg", name: "Light Pink Shirt", href: "/tailored-menswear/light-pink-shirt" },
    ],
    productRailViewAll: { href: "/tailored-menswear", label: "Shop Shirts" },
    relatedGuides: [
      { title: "How to Choose the Perfect Shirt Fabric", slug: "how-to-choose-the-perfect-shirt-fabric" },
      { title: "What Makes a Quality Shirt", slug: "what-makes-a-quality-shirt" },
      { title: "The Essential Guide to Suit Fabrics", slug: "essential-guide-to-suit-fabrics" },
    ],
  },
  "what-makes-a-quality-shirt": {
    title: "What Makes a Quality Shirt: A Concise Guide",
    category: "Education",
    excerpt: "The key indicators of shirt quality — thread count, construction, collar construction, and the details that define a superior shirt.",
    heroImg: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/xSAEdhySXqdKlJEA.png",
    readTime: "6 min read",
    sections: [
      {
        heading: "Recognising Quality in a Dress Shirt",
        content: `A quality dress shirt is not always immediately distinguishable from a mediocre one on the hanger. The differences reveal themselves in the details — details that are easy to overlook if you do not know what to look for.\n\nThe following indicators will help you assess the quality of any dress shirt, whether you are buying ready-to-wear or commissioning a bespoke garment.`,
      },
      {
        heading: "Fabric Quality",
        content: `The fabric is the foundation of shirt quality. A high-quality shirt will use a two-ply cotton in a fine yarn count — 100s or above. The fabric should feel smooth and substantial without being stiff. Hold it up to the light: a quality fabric will have an even weave with no loose threads or irregularities.\n\nThe best shirt fabrics come from specialist mills in Italy, Switzerland, and England. When commissioning a bespoke shirt, ask your tailor about the provenance of the fabrics they carry.`,
      },
      {
        heading: "Construction Details",
        content: `The construction of a quality shirt is characterised by a high stitch count — typically 18 or more stitches per inch — and even, consistent seams. The side seams should be single-needle stitched, producing a single line of stitching on the outside and a clean finish on the inside. Double-needle stitching, which produces two parallel lines of stitching, is a sign of mass-market construction.\n\nThe buttons should be mother-of-pearl or a high-quality resin — not plastic. They should be sewn with a cross-stitch pattern that holds them securely without being bulky. The buttonholes should be cleanly cut with no fraying, and the stitching around them should be dense and even.`,
      },
      {
        heading: "Collar Construction",
        content: `The collar is the most visible element of a dress shirt and the most important indicator of quality. A well-constructed collar will hold its shape throughout the day without wilting or losing its form.\n\nThe collar interlining — the layer between the outer fabric and the lining — determines how the collar holds its shape. A quality interlining will be fused or sewn in a way that allows the collar to roll naturally rather than lying flat. The collar points should be even in length and should lie flat against the chest without curling.\n\nFor bespoke shirts, the collar can be constructed to your precise preferences — the height, the spread, the point length, and the degree of stiffness are all variables that a skilled shirtmaker can adjust to suit your face shape and personal style.`,
      },
    ],
    productRail: [
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/KVgzkgDrbzwsZQhk.jpg", name: "White Shirt", href: "/tailored-menswear/white-shirt" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/WqPUqZQVzSZcZbCo.jpg", name: "Light Blue Shirt", href: "/tailored-menswear/light-blue-shirt" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/muEGXoshhQGCUQTr.jpg", name: "Light Pink Shirt", href: "/tailored-menswear/light-pink-shirt" },
    ],
    productRailViewAll: { href: "/tailored-menswear", label: "Shop Shirts" },
    relatedGuides: [
      { title: "How to Choose the Perfect Shirt Fabric", slug: "how-to-choose-the-perfect-shirt-fabric" },
      { title: "The Essential Guide to Business Shirt Fabrics", slug: "essential-guide-to-business-shirt-fabrics" },
      { title: "How to Buy Quality Shoes", slug: "how-to-buy-quality-shoes" },
    ],
  },
  "how-to-buy-quality-shoes": {
    title: "How to Buy Quality Shoes: A Concise Guide",
    category: "Style",
    excerpt: "A guide to investing in quality footwear — construction methods, leather grades, and the shoes that complement a tailored wardrobe.",
    heroImg: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/xhvgPYaFQjTAqyNj.jpeg",
    readTime: "7 min read",
    sections: [
      {
        heading: "Why Quality Shoes Matter",
        content: `A well-tailored suit deserves well-made shoes. The two are inseparable elements of a coherent professional wardrobe, and the quality of the footwear will either elevate or undermine the impression created by the tailoring.\n\nInvesting in quality shoes is also a practical decision. A well-constructed shoe, properly cared for, will outlast multiple pairs of cheaper alternatives. The cost per wearing over the lifetime of a quality shoe is invariably lower than that of a succession of poorly made ones.`,
      },
      {
        heading: "Construction Methods",
        content: `The most important variable in shoe quality is the construction method — specifically, how the upper is attached to the sole.\n\nGoodyear welt construction is the benchmark for quality dress shoes. The upper is stitched to a welt — a strip of leather — which is then stitched to the sole. This construction allows the sole to be replaced when it wears out, extending the life of the shoe indefinitely. Goodyear welted shoes also have a cork filling between the insole and outsole that moulds to the foot over time, providing a custom fit that improves with wear.\n\nBlake construction stitches the upper directly to the sole in a single seam. It produces a slimmer, more elegant profile than Goodyear welt and is favoured by many Italian shoemakers. The trade-off is that resoling is more difficult and the shoe is less water-resistant.\n\nCemented construction — where the upper is glued to the sole — is the standard for mass-market shoes. It is the least durable method and does not allow for resoling.`,
      },
      {
        heading: "Leather Quality and Care",
        content: `The quality of the leather is as important as the construction. Full-grain leather — the highest grade, where the natural grain of the hide is preserved — is the most durable and develops the richest patina over time. Corrected-grain leather has been sanded to remove imperfections and then embossed with an artificial grain pattern. It is less durable and does not develop a patina in the same way.\n\nQuality shoes require regular care to maintain their condition and extend their life. Cleaning and conditioning the leather regularly prevents it from drying out and cracking. Using shoe trees — ideally cedar — after each wearing helps the shoe retain its shape and absorbs moisture. Rotating between multiple pairs allows each pair to dry fully between wearings.`,
      },
      {
        heading: "Styles That Complement a Tailored Wardrobe",
        content: `For a tailored wardrobe, a small selection of well-chosen shoes will serve most occasions.\n\nThe Oxford — a closed-lacing shoe with a clean, formal profile — is the most versatile dress shoe and the natural companion to a business suit. In black calf leather, it is appropriate for the most formal occasions; in tan or dark brown, it works equally well for business and smart casual contexts.\n\nThe Derby — an open-lacing shoe — is slightly less formal than the Oxford but more comfortable for extended wear. It is an excellent choice for business wear and works well with both suits and tailored separates.\n\nThe loafer — whether in a classic penny or tassel style — is the most casual of the dress shoe family and is best reserved for smart casual contexts or summer business wear. In a quality suede or calf leather, it is an elegant complement to tailored trousers and a blazer.`,
      },
    ],
    productRail: [
      { img: "https://www.mrporter.com/variants/images/46376663163009896/in/w764_q60.jpg", name: "John Lobb City II Oxford", href: "https://www.mrporter.com/en-hk/mens/product/john-lobb/shoes/oxford-shoes/city-ii-leather-oxford-shoes/46376663163009896" },
      { img: "https://www.mrporter.com/variants/images/46376663163009905/in/w764_q60.jpg", name: "John Lobb Lopez Loafer", href: "https://www.mrporter.com/en-hk/mens/product/john-lobb/shoes/loafers/lopez-embellished-leather-penny-loafers/46376663163009905" },
      { img: "https://www.mrporter.com/variants/images/1647597351318348/in/w764_q60.jpg", name: "Edward Green Dover Derby", href: "https://www.mrporter.com/en-hk/mens/product/edward-green/shoes/derby-shoes/dover-suede-derby-shoes/1647597351318348" },
      { img: "https://www.mrporter.com/variants/images/1647597346187937/in/w764_q60.jpg", name: "The Row Nobilis Slip-On", href: "https://www.mrporter.com/en-hk/mens/product/the-row/shoes/derby-shoes/nobilis-leather-slip-on-shoes/1647597346187937" },
    ],
    productRailViewAll: { href: "/ready-to-wear", label: "Shop Shoes" },
    relatedGuides: [
      { title: "What Makes a Quality Shirt", slug: "what-makes-a-quality-shirt" },
      { title: "The Art of Acquiring a Superior Suit", slug: "art-of-acquiring-a-superior-suit" },
      { title: "Flattering Menswear for the Tall & the Short", slug: "flattering-menswear-for-tall-and-short" },
    ],
  },
  "making-the-cut": {
    title: "Making the Cut: The Methodology of Fine Tailoring",
    category: "Methodology",
    excerpt: "A rigorous, step-by-step examination of what separates a truly well-made garment from everything else — from the first consultation to the final fitting.",
    heroImg: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/VeTDsTFJhpLJVXfo.png",
    readTime: "14 min read",
    sections: [
      {
        heading: "Why Methodology Matters",
        content: `The word \"tailor\" is used loosely in Hong Kong. It appears on shopfronts along Nathan Road promising suits in 24 hours, and on the business cards of private cutters who have spent four decades developing their craft. The word alone tells you almost nothing.\n\nWhat distinguishes a genuinely fine garment from a mediocre one is not the label, the location, or the price. It is methodology — the sequence of decisions, techniques, and standards that govern how a garment is conceived, constructed, and refined. Understanding that methodology is the most reliable way to evaluate any tailor, at any price point.\n\nThis guide sets out the methodology that underpins fine tailoring. It is not a ranking of tailors, nor a price comparison. It is a framework for understanding what a well-made garment actually requires — and what questions to ask before you commission one.`,
      },
      {
        heading: "Stage One: The Consultation",
        content: `A serious consultation is not a sales conversation. It is a diagnostic process — an attempt by the cutter to understand not just your measurements, but your body, your lifestyle, and your professional context.\n\nA thorough first consultation will typically last between 45 minutes and an hour. The cutter will ask about the occasions you dress for, the environments you work in, and the garments you already own. They will observe your posture, your natural stance, and any asymmetries in your build. They will ask about your aesthetic preferences — not to flatter you, but to understand the constraints within which they are working.\n\nThis stage is where the relationship between client and tailor is established. A cutter who rushes the consultation, who does not ask questions, or who does not listen carefully to the answers is unlikely to produce a garment that genuinely fits. The consultation is the foundation of everything that follows.\n\nFor a first commission, it is reasonable to visit two or three tailors for consultations before committing. The quality of the consultation is itself a reliable indicator of the quality of the finished garment.`,
      },
      {
        heading: "Stage Two: Measurement and Pattern Cutting",
        content: `Measurement is the most technically demanding stage of the process, and the one that most clearly separates bespoke from made-to-measure construction.\n\nA made-to-measure service will typically take 15 to 20 measurements and use them to adjust a standard block pattern. The result can be excellent — and is a significant improvement on off-the-rack — but the block pattern imposes its own assumptions about proportion that may not match the individual client.\n\nIn true bespoke construction, the cutter takes a comprehensive set of measurements — typically 30 or more — and uses them to draft a pattern from a blank sheet. Every seam line, dart, and ease allowance is calculated specifically for the individual. The cutter accounts not only for size but for posture: a client who carries one shoulder higher than the other, or who stands with a slight forward lean, requires a pattern that accommodates those characteristics rather than ignoring them.\n\nThe quality of the pattern is the single most important determinant of fit. A garment cut from a poor pattern cannot be corrected at the fitting stage — the errors are structural. A garment cut from a precise pattern, by contrast, will require only minor refinements at the fitting.`,
      },
      {
        heading: "Stage Three: The Basted Shell",
        content: `Before the final fabric is cut, a bespoke tailor will construct a basted shell — sometimes called a toile — from an inexpensive cloth. This shell is assembled loosely, with long temporary stitches, and worn by the client at the first fitting.\n\nThe purpose of the basted shell is to test the pattern before committing to the final fabric. It allows the cutter to assess the fit in three dimensions — on the client's body, in motion — and to identify any adjustments required before a single cut is made in the cloth that has been selected.\n\nThis stage is the most reliable indicator of whether a tailor is genuinely working to bespoke standards. Many establishments that market themselves as bespoke do not produce a basted shell — they cut directly into the final fabric and make adjustments at the fitting. This is not bespoke construction. It is a made-to-measure process using bespoke language.\n\nThe basted shell fitting is also the stage at which the client's input is most valuable. This is the moment to raise any concerns about the proposed silhouette, the position of the pockets, or the length of the jacket. Changes made at this stage cost nothing. Changes made after the final fabric has been cut are expensive and sometimes impossible.`,
      },
      {
        heading: "Stage Four: Construction and Canvassing",
        content: `Once the pattern has been confirmed, the final fabric is cut and construction begins. The most important technical decision in this stage is the interlining — the internal structure that gives the jacket its shape and drape.\n\nA fused jacket bonds its interlining to the outer fabric using heat and adhesive. This is the standard construction method for the majority of suits sold globally. It is fast, inexpensive, and produces a consistent result — but it also produces a jacket that feels stiff, does not breathe well, and tends to delaminate over time, particularly in humid climates.\n\nA canvassed jacket uses a woven interlining — traditionally horsehair canvas — that is hand-padded to the shape of the wearer's chest. This canvas is not bonded to the fabric. It floats between the outer cloth and the lining, held in place by the tailor's stitching. Over time, as the jacket is worn, the canvas moulds to the contours of the wearer's body. The result is a garment that improves with wear — that becomes, over months and years, increasingly personal.\n\nFull canvas construction, in which the canvas extends through the entire front of the jacket, is the standard for genuine bespoke. Half canvas, in which the canvas covers only the chest and lapels, is a practical and legitimate compromise for made-to-measure garments. Fused construction has no place in a garment that is marketed as bespoke.`,
      },
      {
        heading: "Stage Five: Hand-Finishing",
        content: `The degree of hand-finishing in a garment is the most visible expression of the tailor's craft — and the most reliable indicator of quality for the informed observer.\n\nThe lapels of a well-made jacket are hand-rolled: the tailor folds and stitches the lapel by hand, creating a natural roll that follows the curve of the chest. A machine-pressed lapel lies flat against the jacket front in a way that is immediately recognisable to anyone who knows what to look for.\n\nThe buttonholes of a bespoke jacket are hand-sewn — a technique that requires significant skill and time, and produces a result that is both more durable and more refined than a machine-cut buttonhole. The pick-stitching along the lapel edges, if present, should be executed by hand in a thread that is slightly heavier than the cloth, creating a subtle visual texture.\n\nThe sleeve head — the point at which the sleeve is attached to the jacket body — is one of the most technically demanding elements of jacket construction. In a well-made garment, the sleeve head is hand-sewn with a slight ease that allows the sleeve to hang naturally from the shoulder. In a poorly made garment, the sleeve is set mechanically, often producing a pulling or puckering at the shoulder point.\n\nThese details are not merely aesthetic. They are structural — they determine how the garment moves, how it holds its shape, and how long it lasts.`,
      },
      {
        heading: "Stage Six: The Fitting Process",
        content: `A bespoke garment requires a minimum of two fittings after the basted shell — typically a forward fitting, at which the garment is partially assembled, and a final fitting, at which it is complete. Some cutters prefer three or four fittings, particularly for a first commission.\n\nThe fitting is a collaborative process. The client's role is to wear the garment naturally — to stand, sit, and move as they would in daily life — and to communicate honestly about any areas of discomfort or dissatisfaction. The tailor's role is to observe, diagnose, and adjust.\n\nA skilled cutter will assess the garment from every angle, looking for signs of strain, pulling, or imbalance. They will check the position of the collar, the roll of the lapel, the hang of the sleeve, and the break of the trouser. Each adjustment is marked in chalk and transferred to the pattern for future commissions.\n\nThe fitting is also the stage at which the client's eye is most valuable. If something does not look right — if the jacket feels too long, or the trouser break is not what was discussed — this is the moment to say so. A good tailor will welcome the feedback. The fitting is not a formality; it is the mechanism by which the garment is refined.`,
      },
      {
        heading: "The Standard to Expect",
        content: `Fine tailoring is not defined by price alone. It is defined by the rigour of the process — the quality of the consultation, the precision of the pattern, the integrity of the construction, and the patience of the fitting process.\n\nA garment that has been through this process — genuinely bespoke, properly canvassed, carefully fitted — will serve its owner for decades. It will improve with wear. It will hold its shape through a full working day in Hong Kong's humidity. It will fit in a way that no off-the-rack garment ever can.\n\nThe methodology described in this guide is not a luxury reserved for a small elite. It is the standard that any professional commissioning a tailored garment has the right to expect — and the standard against which any tailor should be willing to be measured.\n\nWhen you understand what fine tailoring actually requires, you are in a position to ask the right questions, to recognise the right answers, and to invest your money with confidence.`,
      },
    ],
    relatedGuides: [
      { title: "Understanding Bespoke, MTM & RTW Suits", slug: "bespoke-made-to-measure-and-ready-to-wear-suit-guide" },
      { title: "The Essential Guide to Suit Fabrics", slug: "essential-guide-to-suit-fabrics" },
      { title: "The Art of Acquiring a Superior Suit", slug: "art-of-acquiring-a-superior-suit" },
    ],
  },
  "worlds-best-tailoring-menswear-brands": {
    title: "The World's Best Tailoring & Menswear Brands",
    category: "Brands",
    excerpt: "An authoritative overview of the world's most respected tailoring houses and menswear brands, from Savile Row to Naples.",
    heroImg: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/UxjspNPkZkmSMCkU.jpg",
    readTime: "10 min read",
    ctaBlock: {
      label: "The Tailors.hk Index",
      heading: "Explore the World's Finest Tailoring Houses",
      body: "An independently curated index of 47 houses — scored across House Style, Craftsmanship, Fabrication, and Customisation. Compare Savile Row, Neapolitan, Milanese, Parisian, and Hong Kong Bespoke traditions side by side.",
      primaryHref: "/worlds-best-tailoring",
      primaryLabel: "View the Full Index",
      secondaryHref: "/compare",
      secondaryLabel: "Compare Houses",
    },
    sections: [
      {
        heading: "The Global Landscape of Fine Tailoring",
        content: `The world's great tailoring traditions are rooted in a handful of cities — London, Naples, Milan, and, increasingly, Hong Kong. Each has developed a distinct aesthetic and technical approach that reflects the culture and climate of its origin.\n\nUnderstanding these traditions — and the brands and houses associated with them — provides a useful framework for developing your own aesthetic preferences and for communicating them effectively to your tailor. The **[Tailors World's Best Tailoring Index](/worlds-best-tailoring)** profiles 47 of the world's most respected houses across all five traditions.`,
      },
      {
        heading: "The English Tradition: Structure and Authority",
        content: `English tailoring, centred on Savile Row in London's Mayfair, is characterised by a structured silhouette, a suppressed waist, and a padded, roped shoulder. The English suit is built to project authority — it is formal, precise, and uncompromising in its standards of construction.\n\nThe great houses of Savile Row — Huntsman, Anderson & Sheppard, Henry Poole, Norton & Sons, and Chittleborough & Morgan among them — many of which have been in continuous operation for over a century, represent the pinnacle of the bespoke tradition. Their cutters serve long apprenticeships and develop a mastery of their craft that takes decades to achieve. Explore each house in detail in the **[Savile Row section of the Tailors index](/worlds-best-tailoring?tradition=Savile+Row)**.`,
      },
      {
        heading: "The Neapolitan Tradition: Softness and Elegance",
        content: `Neapolitan tailoring, from the workshops of Naples in southern Italy, represents a very different aesthetic. Where the English suit is structured and formal, the Neapolitan suit is soft and relaxed. The shoulder is unpadded — sometimes described as a "spalla camicia" or shirt shoulder — and the construction is lighter, with less canvas and more hand-sewing.\n\nThe result is a garment that feels almost like a second skin — extraordinarily comfortable and natural in its drape. Houses such as Rubinacci, Cesare Attolini, and Kiton define this tradition. Each is profiled in full in the **[Tailors Neapolitan index](/worlds-best-tailoring?tradition=Neapolitan)**.`,
      },
      {
        heading: "The Milanese Tradition: Contemporary Elegance",
        content: `Milan's tailoring tradition occupies a middle ground between the structure of London and the softness of Naples. Milanese suits tend to be clean-lined and contemporary, with a moderate amount of structure and a strong emphasis on fabric quality.\n\nMilan is also home to many of the world's leading luxury menswear brands — Brioni, Canali, and Ermenegildo Zegna among them — houses that have taken the principles of Italian tailoring and applied them to a broader range of garments and accessories. These brands are covered in the **[Italian Bespoke section of the Tailors index](/worlds-best-tailoring?tradition=Italian)**.`,
      },
      {
        heading: "Hong Kong: The Eastern Tailoring Tradition",
        content: `Hong Kong's tailoring tradition is distinct from both the English and Italian schools, though it has been influenced by both. The city's tailors developed a style that combines the precision of the English approach with a lightness of construction suited to the local climate.\n\nHong Kong tailors are particularly skilled at working with lightweight tropical wools and producing garments that are comfortable in hot, humid conditions without sacrificing the formality required by the city's business culture. The best Hong Kong tailors — W.W. Chan & Sons, Dorsia, and Magnus & Novus among them — offer a level of craftsmanship fully comparable to the great houses of London and Naples. All are profiled in the **[Hong Kong Bespoke section of the Tailors index](/worlds-best-tailoring?tradition=Hong+Kong)**.`,
      },
    ],
    relatedGuides: [
      { title: "HK's Finest Tailoring", slug: "hk-finest-tailoring" },
      { title: "The Art of Acquiring a Superior Suit", slug: "art-of-acquiring-a-superior-suit" },
      { title: "Understanding Bespoke, MTM & RTW Suits", slug: "bespoke-made-to-measure-and-ready-to-wear-suit-guide" },
    ],
  },

  "how-to-fit-a-suit": {
    title: "How to Fit a Suit: The Complete Guide to Suit Fit",
    excerpt: "A perfectly fitted suit is the foundation of every great wardrobe. This guide covers every measurement point — from shoulder width to trouser break — with data-backed benchmarks from the world's leading tailors.",
    category: "Suit Education",
    readTime: "11 min",
    heroImg: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/OpuwXoQlRIPulEtb.webp",
    productRail: [
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/pVEPkPApyWtkArag.jpg", name: "Midnight Blue Suit", href: "/tailored-menswear/midnight-blue-suit" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/iiwfHtsspNExjqdN.jpg", name: "Navy Suit", href: "/tailored-menswear/navy-suit" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/TNxmCQSagTsnBwFW.jpg", name: "Charcoal Grey Suit", href: "/tailored-menswear/charcoal-grey-suit" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/OEkbqFLSaAsYpDdV.jpg", name: "Mid Grey Suit", href: "/tailored-menswear/mid-grey-suit" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/lGOiLNUXUbdGKjAk.jpg", name: "Light Grey Suit", href: "/tailored-menswear/light-grey-suit" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/BiulTpyoJMPOqBrQ.jpg", name: "Charcoal Pinstripe DB", href: "/tailored-menswear/charcoal-grey-pinstripe-db" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/ZJmCUyhPTHiSBKEX.jpg", name: "Dark Grey DB", href: "/tailored-menswear/dark-grey-double-breasted" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/heiIXvqutPSXYsQT.jpg", name: "Black Suit", href: "/tailored-menswear/black-suit" },
    ],
    productRailViewAll: { href: "/tailored-menswear", label: "Shop Suits" },
    sections: [
      {
        heading: "Why Fit Overrides Everything Else",
        content: `The single most important factor in how a suit looks is fit — not the fabric, not the brand, not the price. A well-fitted suit in a modest fabric will always outperform a poorly fitted suit in the finest Super 180s wool.\n\nThis is not opinion. The Savile Row Bespoke Association, in its published guidelines for bespoke tailoring, identifies fit as the primary criterion by which a bespoke garment is judged. The entire rationale for spending HK$30,000 or more on a bespoke suit is the fit — every other benefit is secondary.\n\nUnderstanding fit means understanding anatomy. The human body is asymmetrical — most people have one shoulder slightly lower than the other, one arm slightly longer, one hip slightly higher. A bespoke suit is constructed to accommodate these asymmetries. An off-the-rack suit is constructed for a statistical average that fits almost nobody perfectly.`,
      },
      {
        heading: "The Shoulder: The Most Critical Measurement",
        content: `The shoulder seam is the most important measurement in a jacket, and the hardest to alter. A skilled tailor can take in the waist, shorten the sleeves, and adjust the chest — but moving the shoulder seam requires essentially rebuilding the jacket from scratch.\n\nThe shoulder seam should sit exactly at the edge of your shoulder — the bony prominence where the shoulder meets the arm. It should not extend beyond this point (too wide) or fall short of it (too narrow). A shoulder that is even 1cm too wide will make the entire jacket look sloppy and ill-fitting.\n\nA common mistake is buying a jacket that fits the chest but has shoulders that are too wide. This is particularly common with off-the-rack suits designed for broader body types. The chest can be taken in; the shoulder cannot.`,
      },
      {
        heading: "Chest and Waist: The Suppression Ratio",
        content: `The chest measurement determines the base size of the jacket. In bespoke tailoring, the chest is measured at the fullest point, and the jacket is constructed with a specific amount of ease — typically 3–5cm for a fitted silhouette, 6–8cm for a classic fit.\n\nThe waist suppression — the degree to which the jacket is taken in at the waist relative to the chest — is what creates the silhouette. Italian tailoring tends toward more suppression; English tailoring tends toward less.\n\nA well-fitted jacket should show a clear waist when the button is fastened, but should not pull or create horizontal creases across the chest or back. The lapels should lie flat against the chest without gaping.`,
      },
      {
        heading: "Sleeve Length: The Shirt Cuff Rule",
        content: `The standard rule for sleeve length is that 1–1.5cm of shirt cuff should be visible below the jacket sleeve. This is not merely aesthetic — it protects the jacket cuff from wear and signals that the suit was made or altered to the wearer's measurements.\n\nSleeve length is one of the easiest alterations to make on a jacket, provided the sleeve is not canvassed to the cuff. Most tailors can shorten or lengthen sleeves by up to 3cm without affecting the silhouette.\n\nThe sleeve should also hang straight from the shoulder without twisting. A twisted sleeve is a sign of a poorly constructed jacket or a jacket that does not fit the arm correctly.`,
      },
      {
        heading: "Jacket Length: The Thumb Rule",
        content: `The traditional rule for jacket length is that the hem should fall at the point where the fingers curl when the arm hangs naturally at the side — roughly at the knuckle of the thumb. This places the hem at approximately mid-seat level.\n\nModern tailoring has moved toward slightly shorter jackets — particularly in the Italian and contemporary British traditions — which can make the wearer appear taller and the silhouette more dynamic. However, a jacket that is too short will expose too much of the seat and look disproportionate.\n\nJacket length is difficult to alter significantly. Adding length requires letting down the hem or adding a facing. Shortening is more straightforward but changes the proportions of the jacket.`,
      },
      {
        heading: "Trouser Fit: Break, Rise, and Width",
        content: `Trouser fit is determined by three primary measurements: the rise (the distance from the waistband to the crotch seam), the width through the thigh and knee, and the break (the amount of fabric that rests on the shoe).\n\nThe rise determines where the trousers sit on the body. High-rise trousers (worn at the natural waist) are more comfortable, more flattering for most body types, and more formal. Low-rise trousers (worn at the hips) are more casual.\n\nThe break is a matter of personal preference. A full break is traditional and formal. A half break is contemporary and versatile. No break is modern and works best with slim-cut trousers.`,
      },
    ],
    relatedGuides: [
      { title: "Bespoke, MTM & RTW: A Complete Guide", slug: "bespoke-made-to-measure-and-ready-to-wear-suit-guide" },
      { title: "The Art of Acquiring a Superior Suit", slug: "art-of-acquiring-a-superior-suit" },
      { title: "Making the Cut: The Methodology of Fine Tailoring", slug: "making-the-cut" },
    ],
  },
   "suit-colour-guide": {
    title: "The Suit Colour Guide: From Navy to Charcoal and Beyond",
    excerpt: "Colour is the most immediate signal a suit sends. This guide covers the full spectrum of suit colours — their formality hierarchy, seasonal suitability, and the occasions each serves best.",
    category: "Suit Education",
    readTime: "9 min",
    heroImg: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/INJQJnMGaXUHzrAO.jpeg",
    productRail: [
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/pVEPkPApyWtkArag.jpg", name: "Midnight Blue Suit", href: "/tailored-menswear/midnight-blue-suit" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/iiwfHtsspNExjqdN.jpg", name: "Navy Suit", href: "/tailored-menswear/navy-suit" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/TNxmCQSagTsnBwFW.jpg", name: "Charcoal Grey Suit", href: "/tailored-menswear/charcoal-grey-suit" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/OEkbqFLSaAsYpDdV.jpg", name: "Mid Grey Suit", href: "/tailored-menswear/mid-grey-suit" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/lGOiLNUXUbdGKjAk.jpg", name: "Light Grey Suit", href: "/tailored-menswear/light-grey-suit" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/BiulTpyoJMPOqBrQ.jpg", name: "Charcoal Pinstripe DB", href: "/tailored-menswear/charcoal-grey-pinstripe-db" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/ZJmCUyhPTHiSBKEX.jpg", name: "Dark Grey DB", href: "/tailored-menswear/dark-grey-double-breasted" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/heiIXvqutPSXYsQT.jpg", name: "Black Suit", href: "/tailored-menswear/black-suit" },
    ],
    productRailViewAll: { href: "/tailored-menswear", label: "Shop Suits" },
    sections: [
      {
        heading: "The Formality Hierarchy of Suit Colours",
        content: `Suit colours exist on a spectrum from most to least formal. Understanding this hierarchy allows you to dress appropriately for any occasion without overthinking the decision.\n\nAt the most formal end: charcoal grey and midnight navy. These colours are appropriate for the most serious professional and formal occasions — board meetings, court appearances, black-tie-adjacent events. They read as authoritative, serious, and controlled.\n\nIn the middle: medium grey, mid-navy, and dark brown. These are versatile business colours that work across a wide range of professional contexts.\n\nAt the less formal end: lighter greys, camel, tan, and cream. These colours are appropriate for daytime events, summer occasions, and less formal business environments.`,
      },
      {
        heading: "Navy: The Most Versatile Suit Colour",
        content: `Navy is widely considered the most versatile suit colour in a man's wardrobe. It is formal enough for the most serious business occasions, but not so severe as to feel oppressive. It pairs well with almost every shirt and tie combination, and it is flattering on most skin tones.\n\nThe range within navy is significant. Midnight navy (almost black) is the most formal and is appropriate for black-tie events where a dinner suit is not required. Mid-navy is the classic business colour. Bright or electric navy is less formal and more fashion-forward.\n\nNavy suits work particularly well in fine wool — the colour shows the texture and sheen of quality fabric to excellent effect.`,
      },
      {
        heading: "Charcoal Grey: The Power Colour",
        content: `Charcoal grey is the colour of authority. It is the suit worn by executives, lawyers, and politicians when they need to project seriousness and competence. In studies of professional dress perception, charcoal grey consistently ranks as the most authoritative suit colour.\n\nThe reason is partly psychological — dark grey is associated with precision, reliability, and control — and partly practical. Charcoal grey is the most versatile dark colour: it pairs with white, blue, and pale pink shirts; with almost any tie colour; and with black, dark brown, or burgundy shoes.\n\nCharcoal grey is also one of the most flattering colours for a wide range of skin tones.`,
      },
      {
        heading: "Grey: The Full Spectrum",
        content: `Grey suits span an enormous range — from the near-black of charcoal to the near-white of pearl grey. Each shade has its own character and appropriate occasions.\n\nMedium grey (mid-grey) is perhaps the most underrated suit colour. It is formal enough for most business occasions, but lighter and more approachable than charcoal. It pairs beautifully with blue shirts and burgundy ties.\n\nLight grey is a summer colour — it works best in lightweight wools, linens, and fresco fabrics. It is appropriate for daytime weddings, garden parties, and summer business occasions.\n\nPinstripes in grey are a classic variation — the stripe adds visual interest and can make the suit feel more distinctive.`,
      },
      {
        heading: "Brown and Earth Tones",
        content: `Brown suits have a complicated history in professional dress. The old rule — "no brown in town" — reflected a time when brown was considered too casual for city business. This rule has largely relaxed, and mid-to-dark brown suits are now accepted in most professional environments outside the most conservative industries.\n\nDark brown (chocolate brown, tobacco) is the most versatile brown. It pairs well with cream, pale yellow, and mid-blue shirts, and with brown or tan shoes. It is a warmer alternative to charcoal for autumn and winter.\n\nCamel and tan suits are seasonal — they work best in spring and summer, and in lighter fabrics.`,
      },
      {
        heading: "Building a Suit Wardrobe by Colour",
        content: `If you are building a suit wardrobe from scratch, start with the most versatile colours and add more distinctive pieces as the wardrobe grows.\n\nFirst suit: Navy or charcoal grey. These two colours cover the widest range of occasions and are the foundation of any professional wardrobe.\n\nSecond suit: The one you didn't buy first. Together, navy and charcoal cover virtually every professional occasion.\n\nThird suit: Medium grey or mid-brown. This adds versatility for less formal occasions.\n\nFourth suit onwards: Lighter colours, patterns (pinstripes, windowpane checks), and more distinctive pieces that reflect personal style.`,
      },
    ],
    relatedGuides: [
      { title: "The Essential Guide to Suit Fabrics", slug: "essential-guide-to-suit-fabrics" },
      { title: "How to Fit a Suit", slug: "how-to-fit-a-suit" },
      { title: "The Art of Acquiring a Superior Suit", slug: "art-of-acquiring-a-superior-suit" },
    ],
  },
  "double-breasted-suit-guide": {
    title: "The Double-Breasted Suit: A Complete Guide",
    excerpt: "The double-breasted suit is the most powerful garment in a man's wardrobe — and the most misunderstood. This guide covers its history, construction, how to wear it, and why it is experiencing a sustained revival.",
    category: "Suit Education",
    readTime: "10 min",
    heroImg: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/ELTmQJGEAkQMOFIc.png",
    productRail: [
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/pVEPkPApyWtkArag.jpg", name: "Midnight Blue Suit", href: "/tailored-menswear/midnight-blue-suit" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/iiwfHtsspNExjqdN.jpg", name: "Navy Suit", href: "/tailored-menswear/navy-suit" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/TNxmCQSagTsnBwFW.jpg", name: "Charcoal Grey Suit", href: "/tailored-menswear/charcoal-grey-suit" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/OEkbqFLSaAsYpDdV.jpg", name: "Mid Grey Suit", href: "/tailored-menswear/mid-grey-suit" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/BiulTpyoJMPOqBrQ.jpg", name: "Charcoal Pinstripe DB", href: "/tailored-menswear/charcoal-grey-pinstripe-db" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/ZJmCUyhPTHiSBKEX.jpg", name: "Dark Grey DB", href: "/tailored-menswear/dark-grey-double-breasted" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/HwrJYhmgykzHojMx.jpg", name: "Black Tuxedo", href: "/tailored-menswear/black-tuxedo" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/heiIXvqutPSXYsQT.jpg", name: "Black Suit", href: "/tailored-menswear/black-suit" },
    ],
    productRailViewAll: { href: "/tailored-menswear", label: "Shop Suits" },
    sections: [
      {
        heading: "What Defines a Double-Breasted Suit",
        content: `A double-breasted jacket is defined by its overlapping front panels and two parallel rows of buttons. Unlike a single-breasted jacket, which fastens with a single row of buttons at the centre front, a double-breasted jacket wraps one side of the front over the other, creating a more substantial, more formal silhouette.\n\nThe most common configurations are 6x2 (six buttons, two to fasten), 6x1 (six buttons, one to fasten), and 4x2 (four buttons, two to fasten). The 6x2 is the most traditional and formal; the 4x2 is more contemporary.\n\nDouble-breasted jackets should always be worn fastened. Unlike a single-breasted jacket, which can be worn open casually, a double-breasted jacket that is unbuttoned looks incomplete and sloppy.`,
      },
      {
        heading: "The History of the Double-Breasted Suit",
        content: `The double-breasted jacket has its origins in naval dress — specifically the reefer jacket worn by naval officers in the 19th century. The overlapping front panels provided additional protection against the elements at sea, and the style was adopted by civilian dress in the late Victorian era.\n\nThe double-breasted suit reached its peak popularity in the 1930s and 1940s, when it was the dominant silhouette in both American and European tailoring. The wide-shouldered, high-waisted double-breasted suits of this era — worn by figures such as the Duke of Windsor and Cary Grant — remain among the most admired examples of men's tailoring.\n\nThe current revival — which began around 2015 — has been more refined, drawing on the elegance of the 1930s rather than the excess of the 1980s.`,
      },
      {
        heading: "Proportions and Fit",
        content: `A double-breasted jacket is less forgiving of fit errors than a single-breasted jacket. The overlapping front panels add visual weight to the chest, which can make a poorly fitted jacket look bulky or overwhelming.\n\nThe key proportions to get right are: the shoulder width (which should be precise), the chest (which should have minimal ease — a double-breasted jacket should fit closely), and the length (which should be slightly longer than a single-breasted jacket to balance the visual weight of the front panels).\n\nThe waist suppression should be moderate — enough to show a clear silhouette, but not so extreme as to look constricted.`,
      },
      {
        heading: "How to Wear a Double-Breasted Suit",
        content: `The double-breasted suit is inherently more formal than its single-breasted equivalent. It is appropriate for the same occasions as a single-breasted suit, but it makes a stronger statement and requires more confidence to carry off.\n\nThe most important rule: always keep it fastened. A double-breasted jacket worn open looks unfinished and defeats the purpose of the garment. When sitting, it is acceptable to unbutton — but refasten when standing.\n\nShirt and tie combinations should be relatively simple. The double-breasted jacket already makes a strong statement; a complex pattern or bold colour in the shirt or tie can create visual competition.`,
      },
      {
        heading: "The Current Revival: Why It Matters",
        content: `The double-breasted suit has been experiencing a sustained revival since approximately 2015, driven by a broader return to classic tailoring values and a reaction against the extremely slim, unstructured suits that dominated the previous decade.\n\nThe revival has been led by the world's finest tailors — Savile Row houses such as Anderson & Sheppard and Huntsman have reported significant increases in double-breasted commissions, and Italian houses such as Kiton and Cesare Attolini have made the double-breasted suit central to their collections.\n\nThe contemporary double-breasted suit tends to be less structured than its 1980s predecessor — softer shoulders, less padding, and a more natural silhouette — while retaining the authority and elegance of the classic form.`,
      },
    ],
    relatedGuides: [
      { title: "How to Fit a Suit", slug: "how-to-fit-a-suit" },
      { title: "The Suit Colour Guide", slug: "suit-colour-guide" },
      { title: "Making the Cut: The Methodology of Fine Tailoring", slug: "making-the-cut" },
    ],
  },
  "dress-codes-explained": {
    title: "Dress Codes Explained: From Black Tie to Business Casual",
    excerpt: "Dress codes are a language. This guide translates every major dress code — black tie, white tie, business formal, smart casual, and more — with precise definitions, common mistakes, and Hong Kong-specific context.",
    category: "Style Guide",
    readTime: "12 min",
    heroImg: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/wuVUEwBUxwzrsfrP.webp",
    sections: [
      {
        heading: "Why Dress Codes Matter",
        content: `Dress codes are a form of social communication. They signal respect for the occasion and the host, demonstrate awareness of context, and — when executed correctly — allow the wearer to project confidence and ease.\n\nThe anxiety most men feel about dress codes comes from uncertainty: what exactly does "smart casual" mean? Is a lounge suit appropriate for a black-tie event? Can I wear brown shoes with a navy suit to a business meeting?\n\nThe answer to most dress code questions is not complicated — it requires only a clear understanding of the hierarchy of formality and the conventions that govern each level.`,
      },
      {
        heading: "White Tie: The Pinnacle of Formal Dress",
        content: `White tie (also called "full evening dress") is the most formal dress code in existence. It is reserved for the most significant ceremonial occasions: state banquets, royal events, the most prestigious charity balls, and certain academic ceremonies.\n\nThe white tie dress code requires: a black tailcoat, matching black trousers with double silk braid, a white marcella waistcoat, a white marcella dress shirt with a stiff front, a white bow tie (hand-tied), and black patent leather shoes.\n\nWhite tie is rarely encountered in Hong Kong, but it is occasionally required for diplomatic functions and events at Government House.`,
      },
      {
        heading: "Black Tie: The Modern Formal Standard",
        content: `Black tie is the most commonly encountered formal dress code. It is required for gala dinners, charity balls, award ceremonies, and formal evening events. In Hong Kong, black-tie events are common in the business and social calendar, particularly in the financial and legal sectors.\n\nThe black tie dress code requires: a black or midnight navy dinner jacket, matching trousers with a single silk braid, a white dress shirt, a black bow tie (hand-tied), and black patent leather or highly polished shoes.\n\nCommon mistakes: wearing a pre-tied bow tie (always hand-tie), wearing a regular suit tie instead of a bow tie, wearing a coloured shirt, or wearing brown shoes.`,
      },
      {
        heading: "Lounge Suit: The Business Formal Standard",
        content: `"Lounge suit" on an invitation means a business suit — the standard two-piece or three-piece suit in a dark colour. This is the dress code for most formal daytime events: weddings, races, business lunches, and professional functions.\n\nFor lounge suit occasions, the appropriate choice is a dark navy or charcoal grey suit, a white or pale blue shirt, a silk tie, and black or dark brown Oxford shoes.\n\nIn Hong Kong's business culture, the lounge suit is the default professional dress code. Most client meetings, formal presentations, and business social events fall into this category.`,
      },
      {
        heading: "Smart Casual: The Most Misunderstood Dress Code",
        content: `"Smart casual" is the dress code that causes the most confusion, because it is defined by what it is not rather than what it is. It is not formal (no suit required), but it is not casual (no jeans, trainers, or t-shirts).\n\nThe smart casual dress code typically means: tailored trousers or chinos (not jeans), a collared shirt (not a t-shirt), and leather shoes or clean leather trainers. A blazer or sports jacket is appropriate but not required.\n\nIn Hong Kong, smart casual is the dress code for many restaurant dinners, cocktail parties, and social events.`,
      },
      {
        heading: "Business Casual: The Office Standard",
        content: `Business casual is the default dress code for most Hong Kong offices that do not require a full suit. It typically means: chinos or tailored trousers, a collared shirt (tucked in), and leather shoes. A blazer or sports jacket is optional but elevates the look.\n\nThe most common business casual mistake is dressing too casually — wearing jeans, trainers, or untucked shirts in environments where these are not appropriate. The "business" part of "business casual" should be taken seriously.\n\nIn client-facing roles, it is generally better to err on the side of formality.`,
      },
    ],
    relatedGuides: [
      { title: "The Suit Colour Guide", slug: "suit-colour-guide" },
      { title: "How to Fit a Suit", slug: "how-to-fit-a-suit" },
      { title: "The Art of Acquiring a Superior Suit", slug: "art-of-acquiring-a-superior-suit" },
    ],
  },
  "overcoat-guide": {
    title: "The Overcoat Guide: Choosing and Wearing the Perfect Coat",
    excerpt: "The overcoat is the most visible garment a man wears. This guide covers every major style — the Chesterfield, the Crombie, the polo coat, the raglan — with guidance on fabric, fit, and how to build a coat wardrobe.",
    category: "Style Guide",
    readTime: "10 min",
    heroImg: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/dCJwGvvgletTwYmp.jpg",
    heroImgPosition: "center 20%",
    productRail: [
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/HOkQPWLKCHoIdruX.jpg", name: "Black Overcoat", href: "/tailored-menswear/black-overcoat" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/vBwbKqfoaJHEtjQC.jpg", name: "Dark Grey Overcoat", href: "/tailored-menswear/dark-grey-overcoat" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/VwArcFQaPquFIJZs.jpg", name: "Dark Navy Overcoat", href: "/tailored-menswear/dark-navy-overcoat" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/nFWodFNNZKgiIfRJ.jpg", name: "Navy Overcoat", href: "/tailored-menswear/navy-overcoat" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/olGPRdncWTHtdQNq.jpg", name: "Light Grey Overcoat", href: "/tailored-menswear/light-grey-overcoat" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/BYULNImuvqmTYmBW.jpg", name: "Mid Brown Overcoat", href: "/tailored-menswear/mid-brown-overcoat" },
    ],
    productRailViewAll: { href: "/tailored-menswear", label: "Shop Overcoats" },
    sections: [
      {
        heading: "Why the Overcoat Matters",
        content: `The overcoat is the first and last garment people see. In cold weather, it covers everything underneath — which means that a poor overcoat undermines even the most carefully assembled suit and shirt combination beneath it.\n\nConversely, a well-chosen overcoat elevates every outfit it covers. A fine Chesterfield in dark charcoal cashmere, worn over a navy suit, creates an impression of effortless authority that no other garment can match.\n\nThe overcoat is also one of the most cost-effective investments in a man's wardrobe. A well-made overcoat in a classic style will last 20–30 years with proper care.`,
      },
      {
        heading: "The Chesterfield: The Classic Choice",
        content: `The Chesterfield is the most formal and most versatile overcoat style. It is characterised by its straight, unfitted silhouette, its concealed button placket, and its velvet collar — though the velvet collar is optional.\n\nThe Chesterfield is appropriate over a suit for almost any occasion — business, formal events, and smart casual contexts. In dark charcoal or midnight navy, it is the most authoritative overcoat a man can wear. In camel or mid-grey, it is slightly less formal but equally elegant.\n\nThe finest Chesterfields are made in cashmere or a cashmere-wool blend. The weight should be substantial enough to provide warmth — typically 500–600g/m².`,
      },
      {
        heading: "The Polo Coat: The American Classic",
        content: `The polo coat originated in the 1920s as a garment worn by polo players between chukkas. It is characterised by its camel colour, its double-breasted front, its belted back, and its patch pockets.\n\nThe polo coat is less formal than the Chesterfield but more distinctive. It is particularly well-suited to daytime occasions — weekend events, travel, and smart casual contexts. In camel, it pairs beautifully with grey or navy suits and with casual separates.\n\nThe polo coat is one of the few overcoat styles that works equally well over a suit and over casual clothes.`,
      },
      {
        heading: "Fabric: Wool, Cashmere, and Blends",
        content: `The fabric of an overcoat determines its warmth, its drape, and its longevity. The finest overcoats are made in pure cashmere or in cashmere-wool blends from the great British and Italian mills — Loro Piana and Holland & Sherry are the most respected sources.\n\nPure cashmere is the warmest and most luxurious option, but it is also the most delicate. A cashmere-wool blend (typically 70% cashmere, 30% wool) offers most of the warmth and softness of pure cashmere with greater durability.\n\nFor Hong Kong's mild winters, a medium-weight wool or wool-cashmere blend (400–500g/m²) is appropriate for most of the year.`,
      },
      {
        heading: "Fit: How an Overcoat Should Fit",
        content: `An overcoat should fit over a suit jacket without restriction. The shoulders should align with the jacket shoulders beneath — not wider, not narrower. The chest should have enough ease to accommodate a jacket without pulling or constricting.\n\nThe length is a matter of style and personal preference. A classic overcoat falls to just below the knee — approximately mid-calf. A shorter coat (ending at the knee or above) is more contemporary and works better for active wear.\n\nThe sleeves should be long enough to cover the jacket sleeve, with approximately 1cm of shirt cuff visible. The collar should lie flat against the neck without gaping.`,
      },
    ],
    relatedGuides: [
      { title: "The Essential Guide to Suit Fabrics", slug: "essential-guide-to-suit-fabrics" },
      { title: "The Suit Colour Guide", slug: "suit-colour-guide" },
      { title: "How to Fit a Suit", slug: "how-to-fit-a-suit" },
    ],
  },
  "trouser-fit-guide": {
    title: "The Trouser Fit Guide: Rise, Break, and Proportion",
    excerpt: "Trouser fit is the most neglected element of a man's wardrobe. This guide covers every measurement point — rise, seat, thigh, knee, hem, and break — with guidance on how each affects the overall silhouette.",
    category: "Suit Education",
    readTime: "8 min",
    heroImg: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/hAFlbGnCWtBCVlux.jpeg",
    thumbnail: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/hAFlbGnCWtBCVlux.jpeg",
    sections: [
      {
        heading: "Why Trouser Fit Is Underrated",
        content: `Most men focus their tailoring attention on the jacket — the shoulders, the chest, the lapels. The trousers are treated as an afterthought. This is a mistake.\n\nPoorly fitted trousers undermine even the finest jacket. Trousers that are too tight across the seat create horizontal creases that are visible from behind. Trousers that are too loose through the thigh look shapeless and sloppy.\n\nConversely, well-fitted trousers — with a clean line from waist to hem, a proper break at the shoe, and a seat that fits without pulling — make the entire suit look better.`,
      },
      {
        heading: "The Rise: Where Trousers Should Sit",
        content: `The rise is the distance from the waistband to the crotch seam. It determines where the trousers sit on the body and has a significant effect on both comfort and appearance.\n\nHigh-rise trousers (worn at the natural waist, typically 2–3cm above the navel) are the traditional and formal choice. They are more comfortable for most body types, they lengthen the appearance of the leg, and they are more flattering for men with a longer torso.\n\nLow-rise trousers (worn at the hips) are more casual and contemporary. They work best on men with a shorter torso and longer legs.`,
      },
      {
        heading: "The Seat and Thigh: The Comfort Zone",
        content: `The seat and thigh measurements determine the comfort and appearance of the trouser through the most critical area. Too tight, and the trouser will pull and create horizontal creases; too loose, and it will look shapeless and add visual bulk.\n\nThe seat should fit smoothly without pulling. When standing, there should be no horizontal creases across the seat. When sitting, the trouser should accommodate the movement without the waistband pulling away from the body.\n\nThe thigh should have enough ease to allow comfortable movement — typically 3–5cm of ease for a fitted trouser, 6–8cm for a classic fit.`,
      },
      {
        heading: "The Break: How Much Fabric at the Shoe",
        content: `The break is the amount of fabric that rests on the shoe when the wearer is standing. It is largely a matter of personal preference and current fashion.\n\nNo break: the trouser hem just clears the top of the shoe. This is the most contemporary option. It works best with slim-cut trousers and shows off the shoe.\n\nHalf break: a slight fold of fabric rests on the shoe. This is the most versatile option — it works with most trouser widths and most occasions. It is the choice of most Savile Row tailors for standard business suits.\n\nFull break: a substantial fold of fabric rests on the shoe. This is the most traditional option and is appropriate for very formal occasions.`,
      },
      {
        heading: "Trouser Width: The Silhouette Decision",
        content: `The width of the trouser leg — measured at the knee and the hem — determines the overall silhouette of the suit. This is a decision influenced by both personal preference and current fashion.\n\nThe trouser width should be proportional to the jacket. A slim jacket with wide trousers looks disproportionate; a fuller jacket with very slim trousers looks equally wrong.\n\nFor most business contexts, a trouser width of 18–20cm at the hem (for a standard-height man) is appropriate — slim enough to look contemporary, but not so slim as to restrict movement or look fashion-forward in conservative environments.`,
      },
    ],
    productRail: [
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/UWwCBVIXIYjINQjZ.jpg", name: "Grey Flannel Trousers", href: "/tailored-menswear/light-grey-flannel-pants" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/egwIBWRfgUJZMEch.jpg", name: "Ivory Chinos", href: "/tailored-menswear/ivory-chinos" },
    ],
    productRailViewAll: { href: "/tailored-menswear", label: "Shop Trousers" },
    relatedGuides: [
      { title: "How to Fit a Suit", slug: "how-to-fit-a-suit" },
      { title: "Bespoke, MTM & RTW: A Complete Guide", slug: "bespoke-made-to-measure-and-ready-to-wear-suit-guide" },
      { title: "Making the Cut: The Methodology of Fine Tailoring", slug: "making-the-cut" },
    ],
  },
  "capsule-wardrobe-guide": {
    title: "Building a Capsule Wardrobe: The Professional Man's Guide",
    excerpt: "A capsule wardrobe is a curated collection of garments that work together to create a maximum number of outfits from a minimum number of pieces. This guide provides a framework for building a professional wardrobe that is both versatile and distinctive.",
    category: "Style Guide",
    readTime: "11 min",
    heroImg: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/xhvgPYaFQjTAqyNj.jpeg",
    sections: [
      {
        heading: "The Philosophy of the Capsule Wardrobe",
        content: `The capsule wardrobe concept was popularised by fashion consultant Susie Faux in the 1970s and later refined by Donna Karan in her influential "Seven Easy Pieces" collection of 1985. The core principle is simple: invest in fewer, better pieces that work together, rather than accumulating many cheap pieces that don't.\n\nFor professional men, the capsule wardrobe has a specific application: building a wardrobe that covers every professional occasion — from board meetings to client dinners to weekend events — with a collection of garments that are versatile, high-quality, and cohesive.\n\nThe key to a successful capsule wardrobe is the concept of cost-per-wear. A suit that costs HK$15,000 but is worn 100 times has a cost-per-wear of HK$150. A suit that costs HK$3,000 but is worn 10 times before it wears out has a cost-per-wear of HK$300. Quality always wins over time.`,
      },
      {
        heading: "The Foundation: Two Suits",
        content: `The foundation of any professional capsule wardrobe is two suits in the most versatile colours: navy and charcoal grey. These two suits, properly fitted and in quality fabrics, cover virtually every professional occasion.\n\nThe navy suit should be in a mid-weight wool (260–320g/m²) that works year-round in Hong Kong's climate. A plain weave or subtle herringbone adds texture without limiting versatility. The charcoal grey suit should be in a similar weight, in a plain weave or fine pinstripe.\n\nBoth suits should be bespoke or made-to-measure — the investment in fit pays dividends in how the suits look and how long they last.`,
      },
      {
        heading: "The Shirts: Five Essential Pieces",
        content: `Five shirts form the core of a professional capsule wardrobe: two white, two pale blue, and one pale pink or pale grey. This combination covers every professional occasion and provides enough variety to avoid repetition across a working week.\n\nThe white shirts should be in slightly different fabrics — one in a crisp poplin for formal occasions, one in a softer twill for everyday wear. The pale blue shirts should similarly vary — one in a fine Oxford cloth, one in a twill or herringbone.\n\nAll shirts should be made-to-measure or bespoke. The collar should fit precisely — neither too tight nor too loose.`,
      },
      {
        heading: "The Ties: A Working Collection",
        content: `A working tie collection for a professional capsule wardrobe requires approximately eight ties: three solid colours (navy, burgundy, and mid-grey), three subtle patterns (small dots, fine stripes, and a small geometric), and two seasonal ties (a lighter silk for summer, a wool or grenadine for winter).\n\nThis collection provides enough variety to avoid repetition across a working month while maintaining a coherent and professional aesthetic. The solid ties are the workhorses — they pair with almost everything.\n\nAll ties should be in silk from reputable makers. The investment in quality ties is one of the best in a man's wardrobe — a fine silk tie lasts 10–20 years with proper care.`,
      },
      {
        heading: "The Shoes: The Foundation of the Outfit",
        content: `Shoes are the most important accessory in a man's wardrobe. They are the first thing many people notice, and they signal more about a man's attention to detail than almost any other element of his dress.\n\nA professional capsule wardrobe requires three pairs of shoes: black Oxford brogues (for the most formal occasions), dark brown Derby brogues (for business and smart casual), and a pair of tan or mid-brown loafers (for smart casual and weekend wear).\n\nAll shoes should be in calf leather from reputable makers — Crockett & Jones, Edward Green, or Church's from England; Carmina from Spain. They should be resoled rather than replaced when the soles wear out.`,
      },
      {
        heading: "Expanding the Capsule: The Next Additions",
        content: `Once the foundation is in place, the capsule wardrobe can be expanded systematically. The next additions, in order of priority, are: a sports jacket or blazer (for smart casual occasions), a third suit in a lighter colour or pattern (for variety), an overcoat (for cold weather and travel), and a selection of knitwear (for layering and casual occasions).\n\nEach addition should be chosen to maximise the number of new outfit combinations it creates. A navy blazer, for example, pairs with the grey trousers from the charcoal suit, with chinos, and with jeans — creating multiple new outfit options from a single garment.\n\nThe goal is not to have many clothes, but to have the right clothes.`,
      },
    ],
    relatedGuides: [
      { title: "The Suit Colour Guide", slug: "suit-colour-guide" },
      { title: "How to Fit a Suit", slug: "how-to-fit-a-suit" },
      { title: "The Essential Guide to Suit Fabrics", slug: "essential-guide-to-suit-fabrics" },
    ],
  },

  // ─── GUIDE 1: A-Z Glossary of Suit Fabrics & Cloth Terms ───────────────────
  "az-glossary-suit-fabrics": {
    title: "A–Z Glossary of Suit Fabrics & Cloth Terms",
    category: "Cloth",
    readTime: "12 min read",
    heroImg: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/jirbYEpGxVsviHhD.jpeg",
    thumbnail: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/jirbYEpGxVsviHhD.jpeg",
    excerpt: "A comprehensive reference covering every cloth term you are likely to encounter when commissioning a bespoke suit — from Super numbers to pick weaves.",
    sections: [
      {
        heading: "Why Cloth Vocabulary Matters",
        content: `When you sit down with a tailor and open a cloth book, you will encounter a vocabulary that has evolved over centuries of trade between mills, merchants, and craftsmen. Understanding these terms is not pedantry — it is the difference between commissioning exactly what you want and accepting whatever the tailor recommends. This glossary covers the terms you will encounter most frequently, arranged alphabetically for easy reference.`,
      },
      {
        heading: "A–C",
        content: `**Armure** — A small, repeating geometric weave pattern that creates a subtle texture on the cloth surface. Often used in formal suiting.

**Barathea** — A closely woven fabric with a fine, broken rib texture. Traditionally used for evening wear and formal occasions. Barathea has a smooth, almost matte surface that drapes well.

**Bird's Eye** — A small, regular pattern of tiny dots resembling a bird's eye, created by contrasting yarns in the weave. A classic business suiting pattern.

**Birdseye Piqué** — A variation of bird's eye with a more pronounced texture, typically used in waistcoats and formal accessories.

**Broadcloth** — A tightly woven, plain-weave fabric with a smooth, lustrous finish. Originally woven on a wide loom, hence the name. Used for formal suiting and overcoats.

**Cashmere** — Fibre from the undercoat of the Cashmere goat, primarily from Mongolia and China. Exceptionally soft, lightweight, and warm. Cashmere suiting is rare and expensive; it is more commonly blended with wool to add softness.

**Cavalry Twill** — A strong, diagonal twill weave with a pronounced rib. Originally developed for military use. Hardwearing and formal in appearance.

**Chalk Stripe** — A wide stripe pattern that resembles a line drawn with chalk on a dark background. Wider and softer than a pinstripe. Associated with 1930s and 1940s suiting.

**Charcoal** — Not a weave but a colour: a very dark grey that reads almost as black in low light. One of the most versatile suiting colours, appropriate for business and formal occasions.

**Cheviot** — A rough, open-weave tweed originally from the Cheviot Hills on the English-Scottish border. Hardwearing and casual in character.

**Covert** — A tightly woven twill fabric, typically in a tan or khaki colour with a flecked appearance created by two-ply yarns. Originally used for hunting coats; now a classic choice for overcoats.

**Crepe** — A fabric with a crinkled or granular surface texture, achieved through highly twisted yarns or a specific weave structure. Crepe suiting drapes beautifully and is particularly suited to warmer climates.`,
      },
      {
        heading: "D–H",
        content: `**Doeskin** — A smooth, tightly woven fabric with a soft, velvety nap. Traditionally used for formal breeches; now occasionally used for formal waistcoats and trousers.

**Donegal Tweed** — A tweed originating from County Donegal, Ireland, characterised by coloured flecks of yarn woven into a plain or twill ground. Casual and distinctive.

**Drill** — A strong, durable twill weave fabric, typically in cotton or linen. Used for trousers and summer suiting.

**Flannel** — One of the great suiting fabrics. A loosely woven wool fabric with a soft, napped surface. Grey flannel is a wardrobe essential. Flannel drapes beautifully, is comfortable to wear, and improves with age.

**Fresco** — An open, porous weave that allows air circulation. Developed specifically for warm-weather suiting. Fresco holds its shape well, resists creasing, and is one of the finest choices for tropical climates. Made by Harrisons of Edinburgh and a handful of other mills.

**Glen Plaid (Glen Urquhart Check)** — A complex woven pattern combining a small houndstooth check with a larger overcheck. Named after Glen Urquhart in Scotland. One of the most sophisticated suiting patterns.

**Gunclub Check** — A two-colour check pattern, typically in muted tones, with a secondary overcheck. A classic country suiting pattern that works well in town.

**Harris Tweed** — A handwoven tweed produced exclusively in the Outer Hebrides of Scotland, protected by Act of Parliament. Characterised by its distinctive texture and earthy colour palette.

**Herringbone** — A V-shaped weave pattern resembling the skeleton of a herring. One of the most versatile suiting patterns, available in weights from light worsted to heavy tweed.

**Hopsack** — An open, basket-weave fabric with a rough texture. Breathable and casual in character. Often used for summer jackets and blazers.

**Houndstooth** — A broken check pattern with a distinctive pointed, irregular edge. Available in sizes from micro to large. A classic suiting pattern associated with country and sporting dress.`,
      },
      {
        heading: "I–P",
        content: `**Linen** — A natural fibre from the flax plant. Linen suiting is exceptionally breathable and ideal for hot climates. It wrinkles readily, which is considered part of its character. Pure linen suits are casual; linen-wool blends offer a compromise between breathability and structure.

**Melton** — A heavy, tightly woven fabric with a smooth, felted surface. Used primarily for overcoats. Melton is wind-resistant and very warm.

**Mohair** — Fibre from the Angora goat. Mohair adds lustre and resilience to suiting cloth. Mohair-wool blends are popular for formal and evening wear; the fabric has a distinctive sheen and holds a crease well.

**Moquette** — A cut-pile fabric used for upholstery and, occasionally, for very formal waistcoats.

**Mouliné** — A yarn made by twisting together two or more threads of different colours. Creates a subtle, heathered effect in the finished cloth.

**Nailhead** — A small, regular pattern of tiny squares or dots that resembles the head of a nail. A subtle business suiting pattern.

**Pick-and-Pick (Sharkskin)** — A fine, alternating weave of two colours, typically black and white or navy and grey, creating a subtle, shimmering effect. Associated with 1950s and 1960s suiting.

**Pinstripe** — A narrow stripe pattern, typically white on a dark ground, created by a single thread or a very narrow band of contrasting colour. A classic business suiting pattern. The width of the stripe and the spacing between stripes vary considerably.

**Prince of Wales Check** — A large, complex check pattern combining a glen plaid with a coloured overcheck. Named after the Prince of Wales (later Edward VIII). One of the most recognisable suiting patterns.`,
      },
      {
        heading: "S–W: Super Numbers & Finishing Terms",
        content: `**Saxony** — A fine, soft woollen fabric with a slight nap, originally from Saxony in Germany. Used for formal suiting and overcoats.

**Serge** — A twill-weave fabric with a diagonal rib on both sides. Traditionally used for naval and military uniforms; now a classic suiting fabric. Serge is hardwearing and holds a crease well.

**Super Numbers (Super 100s, 120s, 150s, 180s)** — A grading system for worsted wool based on the fineness of the fibre, measured in microns. Super 100s uses fibres of approximately 18.5 microns; Super 150s uses fibres of approximately 15.5 microns; Super 180s uses fibres of approximately 14 microns. Finer fibres produce softer, more lustrous cloth but are also more fragile. For everyday suiting, Super 100s to 120s offers the best balance of softness and durability. Super 150s and above are best reserved for occasional wear.

**Thornproof Tweed** — A tightly woven tweed designed to resist thorns and brambles. Originally developed for country sports.

**Tweed** — A rough, open-weave woollen fabric, typically in earthy colours. Originally from the Scottish Borders. Tweed is casual, hardwearing, and characterful.

**Twill** — A weave structure in which the weft thread passes over one or more warp threads in a regular, diagonal pattern. Twill weaves are stronger than plain weaves and drape better.

**Venetian** — A smooth, lustrous fabric with a satin-like finish, woven in a twill structure. Used for formal suiting and dress uniforms.

**Vicuña** — The rarest and most expensive natural fibre in the world, from the vicuña, a South American camelid. Exceptionally soft and warm. A vicuña suit is a significant investment.

**Worsted** — Wool that has been combed to align the fibres before spinning, producing a smooth, strong yarn. Worsted suiting is the standard for business and formal wear. Contrasts with woollen cloth, in which the fibres are carded rather than combed, producing a softer, more textured fabric.`,
      },
    ],
    productRail: [
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/FlUtZXQmAETyFHRl.jpeg", name: "Holland & Sherry", href: "/holland-sherry-anthology" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/BXAsZfqUdLFfTqpX.jpg", name: "Vitale Barberis", href: "/vbc-anthology" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/PKJoscCNPdnsQqhg.jpg", name: "Dormeuil", href: "/dormeuil-anthology" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/ZejCtjgeenPpZlxu.jpg", name: "Scabal", href: "/scabal-anthology" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/jirbYEpGxVsviHhD.jpeg", name: "Loro Piana", href: "/loro-piana-anthology" },
    ],
    productRailViewAll: { href: "/fabric-compendium", label: "Browse Mills" },
    relatedGuides: [
      { title: "The Essential Guide to Suit Fabrics", slug: "essential-guide-to-suit-fabrics" },
      { title: "The Four-Season Suit", slug: "four-season-suit" },
      { title: "Hallmarks of True Bespoke Tailoring in Hong Kong", slug: "hallmarks-of-true-bespoke-tailoring-hk" },
    ],
  },

  // ─── GUIDE 2: A History of Hong Kong Tailors ────────────────────────────────
  "history-of-hong-kong-tailors": {
    title: "A History of Hong Kong Tailors",
    category: "Hong Kong",
    readTime: "10 min read",
    heroImg: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/IAWhtRLrlsVXGteB.webp",
    thumbnail: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/IAWhtRLrlsVXGteB.webp",
    excerpt: "From the Shanghainese master tailors who arrived in the 1940s to the grand maisons operating today, the story of Hong Kong tailoring is one of craft, adaptation, and quiet excellence.",
    sections: [
      {
        heading: "The Shanghai Migration",
        content: `The story of Hong Kong tailoring begins not in Hong Kong but in Shanghai. In the 1930s and 1940s, Shanghai was the most cosmopolitan city in Asia — a centre of commerce, culture, and craft where a sophisticated clientele demanded the finest Western dress. The tailors who served this clientele were predominantly from the Ningbo region of Zhejiang province, and they had developed a tradition of Western tailoring that was technically accomplished and commercially astute.

When the Communist Party came to power in 1949, many of these tailors fled south, bringing their skills, their patterns, and their clientele with them. Hong Kong, then a British Crown Colony with a growing commercial class and a steady flow of expatriates, was the natural destination. Within a decade, the colony had become one of the world's most productive tailoring centres.`,
      },
      {
        heading: "The Golden Age: 1950s–1970s",
        content: `The 1950s and 1960s were the golden age of Hong Kong tailoring. The combination of skilled Shanghainese craftsmen, abundant cheap labour, and a constant stream of visiting businessmen, diplomats, and military personnel created conditions for a thriving industry. A suit that would cost a week's wages in London could be made in Hong Kong in 24 hours for a fraction of the price.

The reputation for speed, however, was a double-edged sword. While it attracted enormous volume, it also established an association with haste and compromise that would prove difficult to shake. The most skilled tailors — those who had brought the full Shanghainese tradition with them — were producing work of genuine quality. But the industry also attracted operators who were willing to cut corners to meet the demand for ever-faster, ever-cheaper suits.

Tsim Sha Tsui, on the Kowloon peninsula, became the centre of the trade. Nathan Road and its surrounding streets were lined with tailoring establishments catering to every level of the market. The best of them — A Man Hing Cheong, W.W. Chan, Ascot Chang — were building reputations that would endure for generations.`,
      },
      {
        heading: "The Craft Tradition",
        content: `What distinguished the finest Hong Kong tailors from the tourist-trade operators was the preservation of the full Shanghainese craft tradition. This tradition emphasised a particular approach to construction: a clean, structured silhouette with a strong shoulder, a high armhole, and a precise fit through the chest and waist. The work was predominantly hand-sewn, with hand-padded canvas, hand-stitched lapels, and hand-sewn buttonholes as standard.

The Shanghainese tradition was distinct from Savile Row in its approach to the shoulder and the chest. Where the English tradition sought a natural, slightly soft shoulder, the Shanghainese tradition favoured a cleaner, more defined line. Where the English tradition allowed for a certain ease through the chest, the Shanghainese tradition cut closer to the body. The result was a suit that looked sharp and precise rather than relaxed and draped.

This tradition was transmitted through apprenticeship. A young cutter would spend years learning the trade under a master, absorbing not just the technical skills but the aesthetic sensibility that informed every decision. The best houses maintained this apprenticeship tradition into the twenty-first century.`,
      },
      {
        heading: "The 1980s and the Challenge of Prêt-à-Porter",
        content: `The 1980s brought new challenges. The rise of Italian and British ready-to-wear — Armani, Boss, Paul Smith — offered a new kind of well-dressed man an alternative to bespoke. At the same time, Hong Kong's own economic development was transforming the labour market. The craftsmen who had fled Shanghai in 1949 were ageing; their children were becoming lawyers and bankers, not tailors. The apprenticeship pipeline was narrowing.

The industry responded in different ways. Some houses moved upmarket, positioning themselves explicitly as bespoke ateliers for a discerning international clientele. Others expanded into made-to-measure, offering a more accessible service that could be delivered more quickly. A few diversified into shirts, shoes, and accessories.

The houses that survived and thrived were those that had built genuine reputations — not on price or speed, but on the quality of their work and the loyalty of their clients. W.W. Chan, which had been operating since 1952, continued to attract clients from around the world. A Man Hing Cheong, established in 1898, maintained its position as one of the colony's most respected houses.`,
      },
      {
        heading: "The Contemporary Scene",
        content: `Today, Hong Kong tailoring occupies a distinctive position in the global landscape. It is no longer the cheapest option — that distinction belongs to other Asian cities. But it retains a genuine craft tradition that is increasingly rare. The best Hong Kong tailors offer a level of handwork and personalisation that is comparable to the finest European houses, at a price point that is significantly lower than London or Naples.

The contemporary scene is characterised by a clear division between the established houses — W.W. Chan, A Man Hing Cheong, Ascot Chang — and a newer generation of ateliers that have emerged in the past two decades. Magnus & Novus, founded with an explicit commitment to the grand maison tradition, represents the ambition of this newer generation: to build a house that can stand alongside the great European ateliers on merit, not just on price.

The trunk show circuit has also transformed the landscape. European ateliers — Cifonelli, Liverano & Liverano, Solito — now visit Hong Kong regularly, bringing their own traditions and aesthetics to a clientele that is increasingly sophisticated and internationally minded. For the serious dresser in Hong Kong, the choice has never been richer.`,
      },
    ],
    relatedGuides: [
      { title: "HK's Finest Tailoring", slug: "hk-finest-tailoring" },
      { title: "Hallmarks of True Bespoke Tailoring in Hong Kong", slug: "hallmarks-of-true-bespoke-tailoring-hk" },
      { title: "HK's Finest Tailoring", slug: "hk-finest-tailoring" },
    ],
  },

  // ─── GUIDE 3: Tailoring for Different Body Types ────────────────────────────
  "tailoring-for-body-types": {
    title: "Tailoring for Different Body Types",
    category: "Fit",
    readTime: "9 min read",
    heroImg: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/hInsithUBDBnxfje.webp",
    thumbnail: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/hInsithUBDBnxfje.webp",
    excerpt: "The purpose of bespoke tailoring is to make every body look its best. Understanding how a skilled cutter addresses different proportions is the first step to a successful commission.",
    sections: [
      {
        heading: "The Principle of Optical Correction",
        content: `A skilled bespoke cutter does not simply record your measurements and cut to them. They observe your posture, your proportions, and the way your body moves, and they make a series of deliberate decisions to present you at your best. This is the art of optical correction — using the geometry of the garment to balance, elongate, or broaden as required.

The tools available to the cutter are considerable: the placement of the button stance, the width and angle of the lapel, the height of the gorge, the positioning of the pocket, the cut of the trouser, the choice of cloth. Each of these decisions affects how the eye reads the finished garment, and therefore how the wearer appears.`,
      },
      {
        heading: "The Shorter Figure",
        content: `For a shorter man, the primary objective is elongation. The cutter will typically raise the button stance slightly, creating a longer visual line from the waist to the hem. A higher gorge — the point where the collar meets the lapel — draws the eye upward. Narrower lapels, in proportion to the chest, avoid overwhelming the frame.

Trousers should be cut with a higher rise and worn at the natural waist, not the hips. This lengthens the leg visually. A slight taper through the leg, without being tight, maintains the elongating line. Trouser break should be minimal — a slight break or no break at all.

Cloth choice matters too. Vertical patterns — pinstripes, chalk stripes — reinforce the elongating effect. Horizontal patterns, large checks, and wide plaids work against it.`,
      },
      {
        heading: "The Taller Figure",
        content: `A tall man has more latitude in his choices, but also specific considerations. The primary risk is appearing gangly or disproportionate — too much leg, not enough jacket. The cutter will typically lower the button stance slightly and lengthen the jacket body to maintain proportion.

Wider lapels are appropriate and add visual weight to the chest. A fuller chest and a slightly softer shoulder avoid the angular, skeletal appearance that can afflict a very tall, lean man in a poorly cut suit.

Trousers benefit from a fuller cut through the thigh and a more generous break. Horizontal elements — a wider stripe, a larger check — add visual width and break up the vertical line.`,
      },
      {
        heading: "The Broader Figure",
        content: `For a broader or heavier man, the objective is to create the impression of a defined waist without constriction. The cutter will suppress the waist in the jacket — taking it in through the side seams — to create a shape that reads as tailored rather than boxy. The chest should be cut with enough ease to move comfortably, but not so much that the jacket hangs like a sack.

The shoulder is critical. A clean, well-defined shoulder line — not too wide, not too narrow — frames the figure. A shoulder that is too wide exaggerates breadth; one that is too narrow makes the chest appear to overflow.

Cloth choice should favour darker, solid colours or subtle patterns. Avoid large, bold patterns that draw attention to the breadth of the figure. A slight sheen in the cloth — mohair, for instance — can add a sense of lightness.`,
      },
      {
        heading: "Posture and Asymmetry",
        content: `Most bodies are asymmetrical. One shoulder is typically higher than the other; one hip may be higher; the spine may curve slightly. A skilled bespoke cutter will observe and account for these asymmetries, cutting the left and right sides of the jacket differently if necessary.

Posture is equally important. A man who stands with rounded shoulders requires a different back cut than one who stands upright. A forward head posture affects the collar fit. A sway back requires adjustment to the trouser seat.

This is the fundamental argument for bespoke over made-to-measure: a block-based MTM system can adjust for measurements but cannot account for posture and asymmetry. Only a cutter who observes the client in person, takes a basted fitting, and adjusts the pattern accordingly can address these subtleties. The result is a garment that fits not just the measurements but the body — in motion, at rest, and in every posture in between.`,
      },
    ],
    relatedGuides: [
      { title: "Commissioning Your First Bespoke Suit", slug: "commissioning-your-first-bespoke-suit" },
      { title: "Hallmarks of True Bespoke Tailoring in Hong Kong", slug: "hallmarks-of-true-bespoke-tailoring-hk" },
      { title: "Understanding Bespoke, MTM & RTW", slug: "understanding-bespoke-mtm-rtw" },
    ],
  },

  // ─── GUIDE 4: Hallmarks of True Bespoke Tailoring (expanded) ────────────────
  "hallmarks-of-true-bespoke-tailoring-hk": {
    title: "Hallmarks of True Bespoke Tailoring in Hong Kong",
    category: "Bespoke",
    readTime: "11 min read",
    heroImg: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/mQHAtWFfDfwbPGzM.webp",
    thumbnail: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/mQHAtWFfDfwbPGzM.webp",
    excerpt: "How to distinguish genuine bespoke work from the imitations — the construction details, the fitting process, and the practical tests that separate a true bespoke suit from a made-to-measure garment sold as bespoke.",
    sections: [
      {
        heading: "The Problem of Definition",
        content: `The word "bespoke" has been so thoroughly diluted by marketing that it has become almost meaningless in casual usage. Airlines offer bespoke travel experiences. Hotels offer bespoke concierge services. In tailoring, the term is applied to everything from a genuinely hand-crafted garment cut from a unique paper pattern to a factory-made suit with a few measurements taken at the point of sale.

In Hong Kong, where the tailoring industry ranges from the finest ateliers to the most aggressive tourist-trade operators, the ability to distinguish genuine bespoke work is a practical skill. This guide sets out the hallmarks of true bespoke tailoring — the construction details, the fitting process, and the practical tests that allow you to assess what you are actually buying.`,
      },
      {
        heading: "The Pattern",
        content: `The first hallmark of true bespoke tailoring is the pattern. In genuine bespoke, a unique paper pattern is cut for each client, based on their measurements and the cutter's observations of their posture and proportions. This pattern is the intellectual property of the house and is retained for future commissions.

In made-to-measure, by contrast, an existing block pattern is adjusted to the client's measurements. The adjustments may be extensive — a good MTM system can account for many variations — but the starting point is a standard template, not a unique pattern. The difference matters most for clients with unusual proportions or significant postural asymmetries, for whom a block-based system will always be a compromise.

Ask the tailor directly: do you cut a unique pattern for each client? A reputable bespoke house will answer yes without hesitation.`,
      },
      {
        heading: "Canvas Construction",
        content: `The second hallmark is the construction of the chest. In a genuine bespoke suit, the chest is supported by a floating canvas — a layer of horsehair canvas that is hand-padded to the underside of the front of the jacket. This canvas is not glued; it is stitched, in a process called pad-stitching, in which hundreds of tiny hand stitches attach the canvas to the wool interlining. The result is a chest that is firm but responsive — it moves with the body, breathes with it, and over time moulds to the wearer's chest.

In a fused suit, the chest is supported by a layer of adhesive interlining that is bonded to the outer cloth under heat and pressure. Fusing is faster and cheaper than canvas construction, but it produces a stiffer, less responsive chest that does not breathe and will eventually delaminate — the adhesive bond fails, producing a bubbled or puckered appearance.

To test for canvas construction, pinch the lapel between your thumb and forefinger and roll it gently. In a canvassed suit, you will feel three distinct layers — the outer cloth, the canvas, and the lining — moving independently. In a fused suit, the layers will feel bonded together and will not move independently.`,
      },
      {
        heading: "Hand-Stitching and Finishing",
        content: `The third hallmark is the degree of hand-stitching. In a true bespoke suit, the following elements are typically hand-sewn: the lapel pad-stitching, the collar attachment, the sleeve attachment, the buttonholes, the pick-stitching along the lapel and pocket edges, and the lining attachment. The degree of hand-work varies between houses and traditions — a Neapolitan suit will typically have more hand-sewing than a Hong Kong suit, which in turn will have more than a standard MTM garment.

Buttonholes are a reliable indicator. A hand-sewn buttonhole has an irregular, slightly uneven appearance that is the result of being worked by hand. It is finished with a small bar tack at one end and a keyhole at the other. A machine-sewn buttonhole is perfectly regular and uniform. Run your finger along the edge of the buttonhole: a hand-sewn buttonhole has a slightly raised, textured edge; a machine-sewn one is flat and smooth.

Pick-stitching — the row of small, visible hand stitches along the edge of the lapel and pocket flaps — is another indicator. In the finest bespoke work, this stitching is done by hand and is slightly irregular. Machine pick-stitching is perfectly regular.`,
      },
      {
        heading: "The Fitting Process",
        content: `The fourth hallmark is the fitting process. True bespoke tailoring involves at least two fittings: a basted fitting, in which the garment is assembled in a temporary state with long, easily removed stitches, and a forward fitting, in which the corrections from the basted fitting have been incorporated and the garment is closer to its finished state. Some houses require three or more fittings for a first commission.

The basted fitting is the critical one. It is at this stage that the cutter observes how the garment sits on the body, identifies any fit issues, and marks the corrections. A client who accepts a suit without a basted fitting — or who is told that fittings are not necessary — is not receiving true bespoke service.

The fitting process is also where the relationship between client and tailor is established. A good cutter will ask questions about how the client intends to wear the suit, what activities they will perform in it, and what their aesthetic preferences are. They will offer guidance on cloth, construction, and detail. They will listen.`,
      },
      {
        heading: "Practical Tests",
        content: `Beyond the construction details, there are practical tests you can apply when assessing a finished suit.

**The shoulder test**: Place your hand flat on the shoulder of the jacket. The shoulder should lie flat and smooth, with no pulling or bunching. A well-cut shoulder follows the natural line of the shoulder without distorting it.

**The collar test**: The collar should sit flat against the back of the neck with no gap. A gap between the collar and the neck — known as collar stand — indicates a fit issue that a skilled cutter will have addressed.

**The chest test**: Button the jacket and stand naturally. The chest should lie flat with no pulling across the button. There should be enough ease to move comfortably but not so much that the jacket hangs away from the body.

**The seat test**: Sit down in the jacket. A well-cut jacket will accommodate the movement of sitting without pulling across the back or riding up at the collar. The back should remain smooth.

**The movement test**: Raise your arms to shoulder height. The jacket should rise with the arms but return to its natural position when the arms are lowered. If the jacket stays raised, the armhole is too low.`,
      },
    ],
    relatedGuides: [
      { title: "Commissioning Your First Bespoke Suit", slug: "commissioning-your-first-bespoke-suit" },
      { title: "Understanding Bespoke, MTM & RTW", slug: "understanding-bespoke-mtm-rtw" },
      { title: "A–Z Glossary of Suit Fabrics & Cloth Terms", slug: "az-glossary-suit-fabrics" },
    ],
  },

  // ─── GUIDE 5: What to Look for in a Quality Suit ────────────────────────────
  "what-to-look-for-in-a-quality-suit": {
    title: "What to Look for in a Quality Suit",
    category: "Quality",
    readTime: "8 min read",
    heroImg: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/OJSkWQhVEqhwNaOl.webp",
    thumbnail: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/OJSkWQhVEqhwNaOl.webp",
    excerpt: "The specific details — in construction, cloth, and finish — that distinguish a well-made suit from a mediocre one, whether bespoke, made-to-measure, or ready-to-wear.",
    sections: [
      {
        heading: "The Case for Knowing What You Are Buying",
        content: `The price of a suit tells you very little about its quality. A suit costing HK$30,000 from a reputable bespoke house may be better made than one costing HK$80,000 from a luxury brand. A suit costing HK$8,000 from a skilled MTM tailor may outperform one costing HK$25,000 from a department store. Price is a proxy for quality only when you are buying from a house whose standards you already know.

The alternative to trusting price is knowing what to look for. The following details are the ones that matter — the indicators of quality that separate a well-made suit from a mediocre one, regardless of the label.`,
      },
      {
        heading: "Cloth",
        content: `Quality begins with the cloth. A well-made suit in mediocre cloth will always be a mediocre suit. The cloth determines how the garment drapes, how it breathes, how it wears, and how it ages.

The key indicators of cloth quality are handle and drape. Pick up the cloth and hold it in your hand: quality cloth has a certain weight and substance without being stiff. It falls naturally when released. It recovers its shape after being crushed. Cheap cloth feels thin and papery, or stiff and synthetic.

For worsted suiting, look for cloth from the established English and Italian mills: Dormeuil, Holland & Sherry, Loro Piana, Caccioppoli, Vitale Barberis. These mills have maintained consistent standards for generations. The Super number is a guide to fineness but not to quality: a Super 120s cloth from a reputable mill will outperform a Super 180s cloth from an unknown source.`,
      },
      {
        heading: "Construction",
        content: `After cloth, construction is the most important determinant of quality. The key question is whether the chest is canvassed or fused. A canvassed chest — whether full canvas or half canvas — produces a garment that drapes better, breathes better, and lasts longer than a fused chest. The test is described in the Hallmarks guide: pinch the lapel and feel for three independent layers.

Beyond the chest, look at the seam allowances. In a well-made suit, the seam allowances are generous — at least 2.5 cm — allowing for future alterations. In a cheap suit, the seam allowances are minimal, making alteration difficult or impossible.

Look at the lining. In a quality suit, the lining is attached by hand along the front edge and the hem, with a small amount of ease to allow the lining to move independently of the outer cloth. A lining that is machine-stitched flat to the outer cloth will pull and distort over time.`,
      },
      {
        heading: "Finishing Details",
        content: `The finishing details are where quality is most visible to the eye, even if their structural importance is secondary.

**Buttonholes**: As noted in the Hallmarks guide, hand-sewn buttonholes are the mark of quality. They should be firm, evenly worked, and finished with a clean bar tack. The working surgeon's cuffs — buttonholes that actually unbutton — are a traditional mark of bespoke work, though they are now available on some MTM garments.

**Buttons**: Quality suits use horn buttons — made from buffalo horn, corozo nut, or mother of pearl — rather than plastic. Horn buttons have a natural variation in colour and texture; plastic buttons are uniform and slightly shiny.

**Pick-stitching**: A row of visible hand stitching along the edge of the lapel and pocket flaps indicates hand-finishing. It should be slightly irregular — a sign that it was done by hand.

**Pattern matching**: In a quality suit made from a patterned cloth, the pattern should match at the side seams, the sleeve head, and the pocket flaps. Mismatched patterns are a sign of careless cutting.

**Lining**: The lining should be of good quality — a silk or high-quality bemberg — and should be attached with enough ease to prevent pulling. The inside of the jacket should be as carefully finished as the outside.`,
      },
      {
        heading: "Fit",
        content: `All of the above is secondary to fit. A well-made suit in mediocre cloth that fits perfectly will look better than a poorly fitting suit in the finest cloth. Fit is the primary determinant of how a suit looks on the body.

The key fit points are: the shoulder (the seam should sit at the edge of the shoulder, not hanging over it or pulling inward), the chest (flat with no pulling across the button), the collar (lying flat against the neck with no gap), the sleeve length (showing approximately 1.5 cm of shirt cuff), and the trouser seat (smooth with no pulling or excess fabric).

These fit points can be achieved in bespoke, in good MTM, and occasionally in well-chosen RTW. The advantage of bespoke is that the cutter addresses all of them simultaneously, accounting for the specific proportions and posture of the individual client.`,
      },
    ],
    relatedGuides: [
      { title: "Hallmarks of True Bespoke Tailoring in Hong Kong", slug: "hallmarks-of-true-bespoke-tailoring-hk" },
      { title: "Understanding Bespoke, MTM & RTW", slug: "understanding-bespoke-mtm-rtw" },
      { title: "A–Z Glossary of Suit Fabrics & Cloth Terms", slug: "az-glossary-suit-fabrics" },
    ],
  },

  // ─── GUIDE 6: The Four-Season Suit ──────────────────────────────────────────
  "four-season-suit": {
    title: "The Four-Season Suit",
    category: "Cloth",
    readTime: "8 min read",
    heroImg: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/OpuwXoQlRIPulEtb.webp",
    thumbnail: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/OpuwXoQlRIPulEtb.webp",
    excerpt: "How to build a wardrobe that works across climates and seasons — the fabrics, weights, and constructions that make a suit genuinely versatile.",
    sections: [
      {
        heading: "The Myth of the Year-Round Suit",
        content: `The idea of a single suit that works in every season and every climate is largely a marketing fiction. A suit that is comfortable in a Hong Kong summer — when temperatures exceed 35°C and humidity approaches 90% — will be uncomfortably warm in a London winter. A suit that is warm enough for a January morning in Edinburgh will be unwearable in a July afternoon in Hong Kong.

The practical approach is not to seek a single year-round suit but to understand which fabrics work in which conditions, and to build a wardrobe accordingly. For most men in Hong Kong, this means prioritising fabrics that perform well in heat and humidity, with a secondary consideration for the cooler months of November to February.`,
      },
      {
        heading: "Summer Fabrics: Heat and Humidity",
        content: `Hong Kong's climate from April to October demands fabrics that breathe. The key properties are openness of weave — allowing air circulation — and natural fibre content, which absorbs and releases moisture more effectively than synthetics.

**Fresco** is the finest choice for hot-weather suiting. An open, porous weave developed specifically for tropical conditions, fresco allows air to circulate through the cloth while maintaining enough structure to hold a clean line. It resists creasing, holds its shape, and improves with wear. The best fresco comes from Harrisons of Edinburgh and is available in weights from 280g to 320g per metre.

**Tropical worsted** is a lighter-weight worsted suiting, typically 200–240g per metre, with an open weave that allows more air circulation than standard worsted. It is less distinctive in texture than fresco but more versatile in appearance.

**Linen** is the most breathable natural fabric but wrinkles readily. Pure linen suits are casual in character; linen-wool blends offer a compromise. A 70% wool, 30% linen blend in a 260g weight is a practical choice for Hong Kong summers.

**Silk blends** — typically wool-silk or wool-silk-linen — add lustre and a slight coolness to the touch. They are appropriate for formal occasions where appearance is paramount.`,
      },
      {
        heading: "Winter Fabrics: November to February",
        content: `Hong Kong winters are mild by European standards — temperatures rarely fall below 10°C — but the combination of cool temperatures and air-conditioned interiors means that a slightly heavier cloth is welcome from November to February.

**Flannel** is the great winter suiting fabric. A loosely woven wool with a soft, napped surface, flannel drapes beautifully, is comfortable to wear, and improves with age. Grey flannel in particular is one of the most versatile and enduring suiting choices. A weight of 320–380g per metre is appropriate for Hong Kong winters.

**Tweed** is appropriate for casual and country occasions. The range of available tweeds — Harris, Donegal, Cheviot, Shetland — offers considerable variety in texture and colour.

**Heavier worsteds** — 280–320g per metre — are appropriate for business suiting in the cooler months. They hold a crease better than lighter weights and have a more substantial presence.`,
      },
      {
        heading: "The Versatile Middle Ground",
        content: `For a man who wants a single suit that works across the widest possible range of conditions, the answer is a mid-weight worsted in the 260–280g range. This weight is comfortable in air-conditioned environments in summer and in outdoor conditions in winter. It is not the best choice for either extreme — it will be warm in the height of summer and cool in a cold winter — but it is the most practical single choice.

The cloth should be a plain weave or a fine twill in a dark, solid colour — navy or charcoal — which reads as appropriate in the widest range of contexts. Avoid heavy textures, which read as too casual for formal occasions, and avoid very fine weights, which are too fragile for regular wear.

For a man commissioning his first bespoke suit in Hong Kong, a 260g navy worsted in a plain or fine twill weave is the most rational starting point. It will serve in business meetings, at formal dinners, and in most social occasions. It is the foundation on which a wardrobe can be built.`,
      },
      {
        heading: "Building a Wardrobe by Season",
        content: `A practical Hong Kong wardrobe might be structured as follows:

**Core (year-round)**: Two suits in 260–280g worsted — one navy, one charcoal. These form the backbone of the wardrobe and cover the majority of occasions.

**Summer additions**: One suit in fresco or tropical worsted for the hottest months. One linen or linen-blend suit for casual summer occasions.

**Winter additions**: One suit in flannel for the cooler months. One tweed jacket for casual occasions.

This six-piece wardrobe — four suits, two jackets — covers the full range of Hong Kong's climate and social occasions. Each piece should be commissioned with the specific conditions in mind: the summer suits in lighter, more open weaves; the winter pieces in heavier, more substantial cloths.

The investment in quality at each stage is justified by longevity. A well-made flannel suit, properly cared for, will last 20 years. A fresco suit will outlast several cheaper alternatives. The cost-per-wearing of quality tailoring, amortised over its lifetime, is consistently lower than the equivalent in fast fashion.`,
      },
    ],
    relatedGuides: [
      { title: "The Essential Guide to Suit Fabrics", slug: "essential-guide-to-suit-fabrics" },
      { title: "A–Z Glossary of Suit Fabrics & Cloth Terms", slug: "az-glossary-suit-fabrics" },
      { title: "Commissioning Your First Bespoke Suit", slug: "commissioning-your-first-bespoke-suit" },
    ],
    productRail: [
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/prqGrMlrEOEEDwqq.jpeg", name: "Summertime", href: "/loro-piana-anthology" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/OpuwXoQlRIPulEtb.webp", name: "Helios", href: "/loro-piana-anthology" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/jirbYEpGxVsviHhD.jpeg", name: "Tasmanian\u00ae", href: "/loro-piana-anthology" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/UWwCBVIXIYjINQjZ.jpg", name: "Wool & Cashmere Flannels", href: "/loro-piana-anthology" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/vKnOFrsPkulZuMdk.webp", name: "Suitmate", href: "/loro-piana-anthology" },
      { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/TkBztkkzndumsmvs.jpeg", name: "Noblesse", href: "/loro-piana-anthology" },
    ],
    productRailViewAll: { href: "/loro-piana-anthology", label: "Browse Collections" },
  },
};

// Slug alias: the canonical URL was renamed from hk-finest-tailoring to expert-guide-to-best-tailors-in-hong-kong
articles["expert-guide-to-best-tailors-in-hong-kong"] = articles["hk-finest-tailoring"];

/** Converts inline markdown (**bold**, *italic*, [text](url), **[text](url)**) to React elements */
function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // Order matters: bold-link must come before plain bold and plain link
  const regex = /\*\*\[(.+?)\]\((.+?)\)\*\*|\[(.+?)\]\((.+?)\)|\*\*(.+?)\*\*|\*(.+?)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1] !== undefined && m[2] !== undefined) {
      // bold link **[text](url)**
      const href = m[2];
      const isExternal = href.startsWith('http');
      parts.push(
        isExternal
          ? <a key={m.index} href={href} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, color: '#111', textDecoration: 'underline', textUnderlineOffset: '3px' }}>{m[1]}</a>
          : <Link key={m.index} href={href} style={{ fontWeight: 600, color: '#111', textDecoration: 'underline', textUnderlineOffset: '3px' }}>{m[1]}</Link>
      );
    } else if (m[3] !== undefined && m[4] !== undefined) {
      // plain link [text](url)
      const href = m[4];
      const isExternal = href.startsWith('http');
      parts.push(
        isExternal
          ? <a key={m.index} href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#111', textDecoration: 'underline', textUnderlineOffset: '3px' }}>{m[3]}</a>
          : <Link key={m.index} href={href} style={{ color: '#111', textDecoration: 'underline', textUnderlineOffset: '3px' }}>{m[3]}</Link>
      );
    } else if (m[5] !== undefined) {
      parts.push(<strong key={m.index} style={{ fontWeight: 600, color: '#222' }}>{m[5]}</strong>);
    } else if (m[6] !== undefined) {
      parts.push(<em key={m.index}>{m[6]}</em>);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export default function GuideArticle() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const article = articles[slug];

  // ── Per-article SEO ────────────────────────────────────────────────────────
  useSEO(article ? {
    title: `${article.title} | Tailors.hk`,
    description: article.excerpt,
    canonical: `https://tailors.hk/tailor-guides/${slug}`,
    schema: [
      SCHEMAS.article({
        title: article.title,
        description: article.excerpt,
        url: `/tailor-guides/${slug}`,
        image: article.heroImg,
        datePublished: "2024-01-01",
        dateModified: "2026-05-01",
        keywords: [article.category, "Hong Kong tailor", "bespoke suit", "tailoring guide"],
        wordCount: article.sections.reduce((acc, s) => acc + s.content.split(" ").length, 0),
      }),
      SCHEMAS.breadcrumb([
        { name: "Home", url: "/" },
        { name: "Guides", url: "/tailor-guides" },
        { name: article.title, url: `/tailor-guides/${slug}` },
      ]),
    ],
  } : {
    title: "Guide Not Found | Tailors.hk",
    description: "This tailoring guide is coming soon.",
    canonical: `https://tailors.hk/tailor-guides/${slug}`,
    schema: [],
  });

  // ── Design system fonts ────────────────────────────────────────────────────
  const F = {
    display: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
    body:    '"Barlow", Arial, sans-serif',
    mono:    '"JetBrains Mono", "Courier New", monospace',
  };
  const label   = { fontFamily: F.mono,    fontSize: '9px',  letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#aaa' };
  const heading = { fontFamily: F.display, fontWeight: 600,  letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#111', lineHeight: 1.1 };
  const body    = { fontFamily: F.body,    fontSize: '15px', lineHeight: '1.8',       color: '#444' };

  // ── Active section tracking via IntersectionObserver ────────────────────
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!article) return;
    const sectionEls = article.sections.map((_, i) => document.getElementById(`section-${i}`)).filter(Boolean) as HTMLElement[];
    if (sectionEls.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible section
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          const id = visible[0].target.id;
          const idx = parseInt(id.replace('section-', ''), 10);
          if (!isNaN(idx)) setActiveSection(idx);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    sectionEls.forEach(el => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, [article]);

  if (!article) {
    return (
      <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
        <Navigation />
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', padding: '80px 20px' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ ...label, marginBottom: '16px' }}>Guide Not Found</p>
            <h1 style={{ ...heading, fontSize: '24px', marginBottom: '24px' }}>
              This guide is coming soon.
            </h1>
            <Link href="/tailor-guides">
              <span className="btn-filled" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <ArrowLeft size={13} /> Back to All Guides
              </span>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <Navigation />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', height: '70vh', minHeight: '560px', overflow: 'hidden' }}>
        <img
          src={article.heroImg}
          alt={article.title}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.72)', objectPosition: article.heroImgPosition ?? 'center center' }}
          loading="eager"
        />
        {/* Gradient: strong at bottom, fades to transparent */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)' }} />

        {/* Breadcrumb — top left */}
        <div className="container" style={{ position: 'absolute', top: '28px', left: 0, right: 0 }}>
          <nav style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }} aria-label="Breadcrumb">
            <Link href="/tailor-guides">
              <span style={{ fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.55)', transition: 'color 0.2s', lineHeight: 1 }}>
                Guides
              </span>
            </Link>
            <span style={{ fontFamily: F.mono, fontSize: '9px', color: 'rgba(255,255,255,0.3)', lineHeight: 1 }}>·</span>
            <span style={{ fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.75)', lineHeight: 1 }}>
              {article.category}
            </span>
          </nav>
        </div>

        {/* Title block — bottom left */}
        <div className="container" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingBottom: '52px' }}>
          <div style={{ maxWidth: '780px' }}>
            <p style={{ fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.45)', marginBottom: '14px', display: 'flex', gap: '16px', flexWrap: 'wrap' as const }}>
              <span>{article.readTime}</span>
              <span style={{ opacity: 0.5 }}>·</span>
              <span>Last reviewed: May 2026</span>
            </p>
            <h1 style={{
              fontFamily: F.display,
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase' as const,
              color: '#fff',
              lineHeight: 1.0,
              marginBottom: '20px',
            }}>
              {article.title}
            </h1>
            <p style={{ fontFamily: F.body, fontSize: '15px', lineHeight: 1.65, color: 'rgba(255,255,255,0.7)', maxWidth: '560px' }}>
              {article.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* ── ARTICLE BODY ───────────────────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: '#fff', position: 'relative' }}>
        {/* ── LEFT PRODUCT RAIL (absolutely positioned in left margin, never affects layout) ── */}
        {!isMobile && article.productRail && article.productRail.length > 0 && (
          <div style={{ position: 'absolute', left: 'max(12px, calc(50% - 660px - 124px))', top: '72px', width: '108px', zIndex: 10 }}>
            <div style={{ position: 'sticky', top: '96px', display: 'flex', flexDirection: 'column', gap: '0', paddingRight: '4px' }}>
              <div style={{ fontFamily: F.mono, fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#bbb', marginBottom: '12px', paddingTop: '4px', textAlign: 'center' }}>Shop</div>
              {article.productRail.map((item, idx) => (
                <Link key={idx} href={item.href}>
                  <div style={{ marginBottom: '10px', cursor: 'pointer' }}>
                    <div style={{ width: '100px', height: '126px', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
                      <img
                        src={item.img}
                        alt={item.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', transition: 'transform 0.3s ease' }}
                        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                      />
                    </div>
                    <div style={{ fontFamily: F.mono, fontSize: '8px', letterSpacing: '0.06em', color: '#888', lineHeight: 1.3, marginTop: '5px', textAlign: 'center', textTransform: 'uppercase', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100px' }}>{item.name}</div>
                  </div>
                </Link>
              ))}
              {article.productRailViewAll && (
                <Link href={article.productRailViewAll.href}>
                  <div style={{ marginTop: '8px', textAlign: 'center', width: '100px' }}>
                    <span style={{ fontFamily: F.mono, fontSize: '8px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#555', borderBottom: '1px solid #ccc', paddingBottom: '2px', cursor: 'pointer' }}>
                      {article.productRailViewAll.label} →
                    </span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        )}

        <div className="container" style={{ paddingTop: isMobile ? '32px' : '72px', paddingBottom: 0 }}>
          <div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 600px) 280px', gap: isMobile ? '0' : '80px', alignItems: 'start' }}>        {/* ── MAIN CONTENT ── */}
            <article>
              {/* Price tier legend — shown only for articles that define it */}
              {article.priceTierLegend && (
                <div style={{
                  marginBottom: '0',
                  paddingTop: '32px',
                  paddingBottom: '32px',
                  borderBottom: '1px solid #ebebeb',
                }}>
                  <div style={{ fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: '16px' }}>
                    Price Tier Key
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {article.priceTierLegend.map((tier) => (
                      <div key={tier.symbol} style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                        <span style={{ fontFamily: F.mono, fontSize: '11px', color: '#b8860b', letterSpacing: '0.04em', flexShrink: 0, minWidth: '60px' }}>{tier.symbol}</span>
                        <span style={{ fontFamily: F.display, fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#333', flexShrink: 0, minWidth: '90px' }}>{tier.label}</span>
                        <span style={{ fontFamily: F.body, fontSize: '12.5px', color: '#777', lineHeight: 1.5 }}>{tier.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Section list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {article.sections.map((section, i) => {
                  const paragraphs = section.content.split('\n\n');
                  const sectionId = `section-${i}`;
                  return (
                    <div
                      key={i}
                      id={sectionId}
                      style={{
                        paddingTop: '48px',
                        paddingBottom: '48px',
                        borderBottom: i < article.sections.length - 1 ? '1px solid #ebebeb' : 'none',
                        scrollMarginTop: '100px',
                      }}
                    >
                      {/* Section number + heading */}
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px', marginBottom: '24px' }}>
                        <span style={{
                          fontFamily: F.mono,
                          fontSize: '9px',
                          letterSpacing: '0.12em',
                          color: '#c8c8c8',
                          flexShrink: 0,
                          paddingTop: '3px',
                        }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h2 style={{
                          fontFamily: F.display,
                          fontSize: 'clamp(13px, 1.4vw, 16px)',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase' as const,
                          color: '#111',
                          lineHeight: 1.2,
                          margin: 0,
                        }}>
                          {(() => {
                            const match = section.heading.match(/^(.*?)(◆+)\s*$/);
                            if (match) return <>{match[1]}<span style={{ color: '#b8860b', letterSpacing: '0.06em' }}>{match[2]}</span></>;
                            return section.heading;
                          })()}
                        </h2>
                      </div>

                      {/* Body paragraphs — first paragraph gets a subtle left rule */}
                      <div style={{ paddingLeft: isMobile ? '14px' : '29px' }}>
                        {paragraphs.map((para, j) => (
                          <p
                            key={j}
                            style={{
                              fontFamily: F.body,
                              fontSize: '15.5px',
                              lineHeight: 1.85,
                              color: j === 0 ? '#333' : '#555',
                              marginBottom: j < paragraphs.length - 1 ? '18px' : 0,
                              fontWeight: j === 0 ? 400 : 400,
                            }}
                          >
                            {renderInline(para)}
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ── ARTICLE-SPECIFIC CTA BLOCK ── */}
              {article.ctaBlock && (
                <div style={{
                  marginTop: '64px',
                  marginBottom: '0',
                  backgroundColor: '#f7f5f2',
                  border: '1px solid #e2ddd8',
                  padding: isMobile ? '28px 20px' : '40px 44px',
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
                  gap: isMobile ? '20px' : '32px',
                  alignItems: 'center',
                }}>
                  <div>
                    <p style={{ fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: '#999', marginBottom: '10px' }}>
                      {article.ctaBlock.label}
                    </p>
                    <h3 style={{ fontFamily: F.display, fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: '#111', lineHeight: 1.1, marginBottom: '10px' }}>
                      {article.ctaBlock.heading}
                    </h3>
                    <p style={{ fontFamily: F.body, fontSize: '13.5px', lineHeight: 1.7, color: '#666', margin: 0 }}>
                      {article.ctaBlock.body}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0 }}>
                    <Link href={article.ctaBlock.primaryHref}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.16em',
                        textTransform: 'uppercase' as const,
                        backgroundColor: '#111', color: '#fff',
                        padding: '12px 20px', whiteSpace: 'nowrap' as const, width: isMobile ? '100%' : undefined, justifyContent: isMobile ? 'center' : undefined,
                      }}>
                        {article.ctaBlock.primaryLabel} <ArrowRight size={11} />
                      </span>
                    </Link>
                    {article.ctaBlock.secondaryHref && (
                      <Link href={article.ctaBlock.secondaryHref}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '8px',
                          fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.16em',
                          textTransform: 'uppercase' as const,
                          border: '1px solid #ccc', color: '#555',
                          padding: '12px 20px', whiteSpace: 'nowrap' as const, width: isMobile ? '100%' : undefined, justifyContent: isMobile ? 'center' : undefined,
                        }}>
                          {article.ctaBlock.secondaryLabel}
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {/* ── IN-ARTICLE CTA ── */}
              <div style={{
                marginTop: '64px',
                marginBottom: '64px',
                backgroundColor: '#111',
                padding: isMobile ? '28px 20px' : '40px 44px',
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
                gap: isMobile ? '20px' : '32px',
                alignItems: 'center',
              }}>
                <div>
                  <p style={{ fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.4)', marginBottom: '10px' }}>
                    Ready to Commission
                  </p>
                  <h3 style={{ fontFamily: F.display, fontSize: 'clamp(18px, 2vw, 26px)', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: '#fff', lineHeight: 1.1, marginBottom: '10px' }}>
                    Begin Your Tailoring Journey
                  </h3>
                  <p style={{ fontFamily: F.body, fontSize: '13.5px', lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', margin: 0 }}>
                    Consultations are complimentary and by appointment only.
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0 }}>
                  <Link href="/contact?type=bespoke">
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.16em',
                      textTransform: 'uppercase' as const,
                      backgroundColor: '#fff', color: '#111',
                      padding: '12px 20px', whiteSpace: 'nowrap' as const, width: isMobile ? '100%' : undefined, justifyContent: isMobile ? 'center' : undefined,
                    }}>
                      Book Consultation <ArrowRight size={11} />
                    </span>
                  </Link>
                  <Link href="/tailor-finder-quiz">
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.16em',
                      textTransform: 'uppercase' as const,
                      border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.7)',
                      padding: '12px 20px', whiteSpace: 'nowrap' as const, width: isMobile ? '100%' : undefined, justifyContent: isMobile ? 'center' : undefined,
                    }}>
                      Start the Brief
                    </span>
                  </Link>
                </div>
              </div>
            </article>

            {/* ── SIDEBAR ── */}
            <aside>
              <div style={{ position: 'sticky', top: '96px', display: isMobile ? 'none' : 'flex', flexDirection: 'column', gap: '0', paddingRight: '4px' }}>

                {/* Meta block */}
                <div style={{ borderTop: '2px solid #111', paddingTop: '20px', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                    <span style={{ fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#aaa' }}>Category</span>
                    <span style={{ fontFamily: F.display, fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#111' }}>{article.category}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#aaa' }}>Read time</span>
                    <span style={{ fontFamily: F.display, fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#111' }}>{article.readTime}</span>
                  </div>
                </div>

                {/* Table of contents */}
                <div style={{ marginBottom: '36px' }}>
                  <p style={{ fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: '#aaa', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid #ebebeb' }}>
                    Contents
                  </p>
                  {article.sections.map((section, i) => (
                    <a
                      key={i}
                      href={`#section-${i}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(`section-${i}`);
                        if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
                      }}
                      style={{
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '12px',
                        padding: '7px 0',
                        borderBottom: '1px solid #f5f5f5',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        borderLeft: activeSection === i ? '2px solid #111' : '2px solid transparent',
                        paddingLeft: activeSection === i ? '8px' : '0',
                        marginLeft: '-2px',
                      }}
                    >
                      <span style={{ fontFamily: F.mono, fontSize: '8px', color: activeSection === i ? '#111' : '#ccc', flexShrink: 0, transition: 'color 0.2s' }}>{String(i + 1).padStart(2, '0')}</span>
                      <span style={{ fontFamily: F.body, fontSize: '12.5px', color: activeSection === i ? '#111' : '#888', lineHeight: 1.45, fontWeight: activeSection === i ? 500 : 400, transition: 'color 0.2s' }}>{section.heading}</span>
                    </a>
                  ))}
                </div>

                {/* Related guides */}
                <div style={{ marginBottom: '36px' }}>
                  <p style={{ fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: '#aaa', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid #ebebeb' }}>
                    Related Guides
                  </p>
                  {article.relatedGuides.map((guide) => (
                    <Link key={guide.slug} href={`/tailor-guides/${guide.slug}`}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '9px 0', borderBottom: '1px solid #f5f5f5' }}>
                        <ArrowRight size={11} style={{ color: '#bbb', flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ fontFamily: F.body, fontSize: '12.5px', color: '#555', lineHeight: 1.45 }}>
                          {guide.title}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Save & Share */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                  <BookmarkButton
                    item={{ slug: slug!, title: article.title, category: article.category, img: article.heroImg, excerpt: article.excerpt }}
                    variant="label"
                    scheme="light"
                    style={{ flex: 1 }}
                  />
                  <ShareButton
                    title={article.title}
                    text={article.excerpt}
                    variant="label"
                    scheme="light"
                    style={{ flex: 1 }}
                  />
                </div>

                {/* Brief CTA */}
                <div style={{ backgroundColor: '#f7f5f2', padding: '24px 20px', borderLeft: '3px solid #111' }}>
                  <p style={{ fontFamily: F.mono, fontSize: '8px', letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: '#aaa', marginBottom: '8px' }}>Interactive Tool</p>
                  <h4 style={{ fontFamily: F.display, fontSize: '16px', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: '#111', marginBottom: '8px', lineHeight: 1.2 }}>
                    Find Your Perfect Tailor
                  </h4>
                  <p style={{ fontFamily: F.body, fontSize: '12.5px', color: '#777', lineHeight: 1.6, marginBottom: '16px' }}>
                    Answer six questions for a personalised recommendation.
                  </p>
                  <Link href="/tailor-finder-quiz">
                    <span style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.14em',
                      textTransform: 'uppercase' as const,
                      backgroundColor: '#111', color: '#fff',
                      padding: '11px 14px',
                    }}>
                      Start the Brief <ArrowRight size={11} />
                    </span>
                  </Link>
                </div>

              </div>
            </aside>
          </div>{/* end inner grid */}
          </div>{/* end outer flex */}
        </div>

        {/* ── BACK TO GUIDES ── */}
        <div className="container" style={{ paddingTop: isMobile ? '32px' : '48px', paddingBottom: isMobile ? '100px' : '64px' }}>
          <Link href="/tailor-guides">
            <span style={{ fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: '#999', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'color 0.2s' }}>
              <ArrowLeft size={11} /> Back to All Guides
            </span>
          </Link>
        </div>
      </div>

      {/* Sticky mobile CTA bar */}
      {isMobile && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
          backgroundColor: '#fff', borderTop: '1px solid #e8e8e8',
          padding: '12px 20px',
          display: 'flex', gap: '10px',
          boxShadow: '0 -4px 16px rgba(0,0,0,0.06)',
        }}>
          <BookmarkButton
            item={{ slug: slug!, title: article.title, category: article.category, img: article.heroImg, excerpt: article.excerpt }}
            variant="icon"
            scheme="light"
          />
          <ShareButton
            title={article.title}
            text={article.excerpt}
            variant="icon"
            scheme="light"
          />
          <Link href="/tailor-finder-quiz" style={{ flex: 1, display: 'flex' }}>
            <span style={{
              flex: 1, fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.12em',
              textTransform: 'uppercase', padding: '13px 10px',
              border: '1px solid #111', backgroundColor: 'transparent', color: '#111',
              cursor: 'pointer', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              FIND YOUR TAILOR
            </span>
          </Link>
          <a
            href={pageEnquiryUrl(`Guide — ${article.title}`, `I read your guide and would like to start my bespoke brief.`)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 2, fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.12em',
              textTransform: 'uppercase', padding: '13px 10px',
              border: 'none', backgroundColor: '#111', color: '#fff',
              cursor: 'pointer', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none',
            }}
          >
            START YOUR BRIEF →
          </a>
        </div>
      )}

      <Footer />
    </div>
  );
}
