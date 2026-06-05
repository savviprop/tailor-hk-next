import type { Metadata } from "next";
import GuideArticleClient from "./GuideArticleClient";

const GUIDE_META: Record<string, { title: string; desc: string }> = {
  "how-to-commission-bespoke-suit": { title: "How to Commission a Bespoke Suit in Hong Kong", desc: "A complete guide to commissioning your first bespoke suit in Hong Kong. Process, pricing, and what to expect." },
  "fabric-guide-super-numbers": { title: "Fabric Guide: Understanding Super Numbers", desc: "What do Super 100s, 130s, 150s mean? The definitive guide to understanding suiting fabric super numbers." },
  "savile-row-vs-hong-kong": { title: "Savile Row vs Hong Kong Tailoring — The Complete Comparison", desc: "A detailed comparison of Savile Row and Hong Kong bespoke tailoring traditions, pricing, and quality." },
  "suit-construction-guide": { title: "Suit Construction Guide — Fused, Half Canvas, Full Canvas", desc: "Understanding the three types of suit construction and why full canvas matters for bespoke tailoring." },
  "bespoke-shirt-guide": { title: "Bespoke Shirt Guide — Everything You Need to Know", desc: "The complete guide to commissioning a bespoke shirt in Hong Kong. Fabrics, collars, cuffs, and pricing." },
  "trouser-guide": { title: "Bespoke Trouser Guide — Cut, Rise, and Fit", desc: "Everything you need to know about commissioning bespoke trousers. Cut, rise, pleats, and fit explained." },
  "overcoat-guide": { title: "Bespoke Overcoat Guide — The Essential Winter Garment", desc: "A guide to commissioning a bespoke overcoat. Fabrics, styles, and what makes a great winter coat." },
  "suit-fit-guide": { title: "Suit Fit Guide — How a Bespoke Suit Should Fit", desc: "The definitive guide to bespoke suit fit. Shoulders, chest, waist suppression, and trouser break explained." },
  "fabric-weight-guide": { title: "Fabric Weight Guide — Choosing the Right Weight for Hong Kong", desc: "How to choose the right fabric weight for Hong Kong's climate. From 7oz tropical to 14oz flannel." },
  "lining-guide": { title: "Suit Lining Guide — Full, Half, and Quarter Lined", desc: "Understanding suit lining options. Full, half, and quarter lining explained for Hong Kong's climate." },
  "button-guide": { title: "Suit Button Guide — Horn, Mother of Pearl, and More", desc: "A guide to suit button materials and styles. Horn, corozo, mother of pearl, and metal buttons explained." },
  "lapel-guide": { title: "Lapel Guide — Notch, Peak, and Shawl Lapels Explained", desc: "Understanding suit lapel styles. Notch, peak, and shawl lapels — when to wear each and how to choose." },
  "pocket-guide": { title: "Suit Pocket Guide — Jetted, Patch, and Flap Pockets", desc: "A guide to suit pocket styles. Jetted, patch, flap, and ticket pockets explained." },
  "suit-care-guide": { title: "Suit Care Guide — How to Care for a Bespoke Suit", desc: "How to care for your bespoke suit. Pressing, storage, cleaning, and maintenance tips." },
  "wardrobe-building-guide": { title: "Wardrobe Building Guide — The Essential Bespoke Wardrobe", desc: "How to build a complete bespoke wardrobe. The essential pieces and the order to commission them." },
  "hong-kong-tailor-guide": { title: "Hong Kong Tailor Guide — How to Choose the Right Tailor", desc: "How to choose the right bespoke tailor in Hong Kong. What to look for, questions to ask, and red flags." },
  "expert-guide-to-best-tailors-in-hong-kong": { title: "Expert Guide to the Best Tailors in Hong Kong", desc: "Profiles of Hong Kong's finest tailoring houses — Magnus & Novus, W.W. Chan, Ascot Chang, Dorsia, and more. Pricing, addresses, and what to expect from each house." },
  "hk-finest-tailoring": { title: "Hong Kong's Finest Tailoring: The Definitive Guide", desc: "Profiles of Hong Kong's established tailoring houses — Magnus & Novus, W.W. Chan, A Man Hing Cheong, The Armoury, Dorsia, and Ascot Chang — with pricing, addresses, and what to expect." },
  "loro-piana-fabric-guide": { title: "Loro Piana Fabric Guide — The World's Finest Wool and Cashmere", desc: "An in-depth guide to Loro Piana's suiting fabrics. Tasmanian wool, cashmere, and their finest collections." },
  "dormeuil-fabric-guide": { title: "Dormeuil Fabric Guide — French Suiting Excellence", desc: "A guide to Dormeuil's finest suiting fabrics. From Amadeus to Vanquish II — the French mill's heritage." },
};

export async function generateStaticParams() {
  return Object.keys(GUIDE_META).map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = GUIDE_META[slug] ?? {
    title: `${slug.replace(/-/g, " ")} | Tailoring Guide`,
    desc: `Expert guide on ${slug.replace(/-/g, " ")} from Tailors.hk.`,
  };
  const canonical = `https://tailors.hk/tailor-guides/${slug}`;
  return {
    title: meta.title,
    description: meta.desc,
    alternates: { canonical },
    openGraph: {
      title: meta.title,
      description: meta.desc,
      url: canonical,
      type: "article",
      siteName: "Tailors.hk",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.desc,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const meta = GUIDE_META[slug] ?? { title: "", desc: "" };
  const canonical = `https://tailors.hk/tailor-guides/${slug}`;
  const publishDate = "2024-01-01T00:00:00+08:00";

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${canonical}/#article`,
      "headline": meta.title,
      "description": meta.desc,
      "url": canonical,
      "datePublished": publishDate,
      "dateModified": publishDate,
      "author": { "@type": "Organization", "name": "Tailors.hk", "url": "https://tailors.hk" },
      "publisher": {
        "@type": "Organization",
        "name": "Tailors.hk",
        "url": "https://tailors.hk",
        "logo": { "@type": "ImageObject", "url": "https://tailors.hk/favicon.ico" }
      },
      "isPartOf": { "@id": "https://tailors.hk/#website" },
      "mainEntityOfPage": { "@type": "WebPage", "@id": canonical },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tailors.hk" },
        { "@type": "ListItem", "position": 2, "name": "Tailor Guides", "item": "https://tailors.hk/tailor-guides" },
        { "@type": "ListItem", "position": 3, "name": meta.title, "item": canonical },
      ]
    }
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <GuideArticleClient />
    </>
  );
}
