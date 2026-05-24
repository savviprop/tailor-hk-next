"use client";
/**
 * TAILOR.HK — useSEO
 * Injects dynamic <title>, <meta>, <link rel="canonical">, Open Graph,
 * Twitter Card, and JSON-LD structured data into the document <head>.
 *
 * Usage:
 *   useSEO({ title, description, canonical, schema })
 */

import { useEffect } from "react";

export interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  ogType?: "website" | "article";
  ogImage?: string;
  keywords?: string;
  /** One or more JSON-LD schema objects */
  schema?: object | object[];
  /** Article-specific */
  articlePublished?: string;
  articleModified?: string;
  noIndex?: boolean;
}

const SITE_NAME = "Tailors.hk";
const DOMAIN    = "https://tailors.hk";
const DEFAULT_OG_IMAGE = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456325909/shLtnQaQLmeQtCVt.png";

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function setSchema(schemas: object[]) {
  // Remove all existing dynamic LD+JSON scripts (those with data-dynamic attr)
  document.querySelectorAll('script[type="application/ld+json"][data-dynamic]').forEach(s => s.remove());
  schemas.forEach(schema => {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.setAttribute("data-dynamic", "true");
    s.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(s);
  });
}

export function useSEO({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  keywords,
  schema,
  articlePublished,
  articleModified,
  noIndex = false,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    // Core meta
    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    setMeta("robots", noIndex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    setMeta("author", "Tailors.hk Editorial Team");
    setMeta("language", "en");

    // Canonical
    setLink("canonical", `${DOMAIN}${canonical}`);

    // Open Graph
    setMeta("og:title",       fullTitle,    "property");
    setMeta("og:description", description,  "property");
    setMeta("og:type",        ogType,       "property");
    setMeta("og:url",         `${DOMAIN}${canonical}`, "property");
    setMeta("og:image",       ogImage,      "property");
    setMeta("og:site_name",   SITE_NAME,    "property");
    setMeta("og:locale",      "en_HK",      "property");

    // Twitter Card
    setMeta("twitter:card",        "summary_large_image");
    setMeta("twitter:title",       fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image",       ogImage);
    setMeta("twitter:site",        "@tailorhk");

    // Article-specific
    if (ogType === "article" && articlePublished) {
      setMeta("article:published_time", articlePublished, "property");
    }
    if (ogType === "article" && articleModified) {
      setMeta("article:modified_time",  articleModified,  "property");
    }

    // JSON-LD schemas
    if (schema) {
      const schemas = Array.isArray(schema) ? schema : [schema];
      setSchema(schemas);
    }
  }, [title, description, canonical, ogType, ogImage, keywords, schema, articlePublished, articleModified, noIndex]);
}

// ── Pre-built schema builders ────────────────────────────────────────────────

export const SCHEMAS = {

  /** WebSite with Sitelinks Searchbox */
  webSite: () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://tailors.hk/#website",
    "name": "Tailors.hk",
    "alternateName": ["Tailor Hong Kong", "TailorHK", "Hong Kong Tailor"],
    "url": "https://tailors.hk",
    "description": "A world-leading supplier of handcrafted tailored suits. Atelier direct rates from HK$12,800 — trusted by professionals for over 25 years.",
    "inLanguage": "en-HK",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://tailors.hk/tailor-guides?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }),

  /** LocalBusiness — TailorShop */
  localBusiness: () => ({
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ClothingStore"],
    "@id": "https://tailors.hk/#business",
    "name": "Tailor Hong Kong",
    "alternateName": ["Tailors.hk", "Dorsia Tailoring", "Dorsia Hong Kong"],
    "description": "A world-leading supplier of handcrafted tailored suits, producing for major international tailoring brands. Private clients access atelier direct rates from HK$12,800.",
    "url": "https://tailors.hk",
    "telephone": "+852-0000-0000",
    "email": "info@tailors.hk",
    "foundingDate": "2000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "28/F Connaught Marina, 48 Connaught Road West",
      "addressLocality": "Sheung Wan",
      "addressRegion": "Hong Kong Island",
      "postalCode": "000000",
      "addressCountry": "HK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 22.2855,
      "longitude": 114.1488
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        "opens": "10:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "17:00"
      }
    ],
    "priceRange": "HK$880 – HK$33,800+",
    "currenciesAccepted": "HKD",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "areaServed": [
      { "@type": "City", "name": "Hong Kong" },
      { "@type": "Country", "name": "Hong Kong" }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 22.2855, "longitude": 114.1488 },
      "geoRadius": "50000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Bespoke Tailored Menswear",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bespoke Suit" }, "priceCurrency": "HKD", "price": "12800", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "12800", "priceCurrency": "HKD" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bespoke Shirt" }, "priceCurrency": "HKD", "price": "880" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bespoke Blazer" }, "priceCurrency": "HKD", "price": "8800" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bespoke Trousers" }, "priceCurrency": "HKD", "price": "3800" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bespoke Overcoat" }, "priceCurrency": "HKD", "price": "10800" }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "312",
      "bestRating": "5",
      "worstRating": "1"
    },
    "award": ["Hong Kong's Leading Tailor 2025/26", "Best Bespoke Tailor Hong Kong 2024"],
    "sameAs": [
      "https://tailors.hk",
      "https://www.instagram.com/tailorhk",
      "https://www.linkedin.com/company/tailorhk"
    ]
  }),

  /** Organization */
  organization: () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://tailors.hk/#organization",
    "name": "Tailors.hk",
    "url": "https://tailors.hk",
    "logo": {
      "@type": "ImageObject",
      "url": "https://tailors.hk/logo.png",
      "width": 400,
      "height": 100
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "info@tailors.hk",
      "availableLanguage": ["English", "Cantonese", "Mandarin"]
    },
    "knowsAbout": [
      "Bespoke Tailoring",
      "Made-to-Measure Suits",
      "Hong Kong Tailoring",
      "Suit Fabrics",
      "Menswear",
      "Savile Row",
      "Neapolitan Tailoring"
    ]
  }),

  /** BreadcrumbList */
  breadcrumb: (items: { name: string; url: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": `https://tailors.hk${item.url}`
    }))
  }),

  /** Article / Guide */
  article: (opts: {
    title: string;
    description: string;
    url: string;
    image: string;
    datePublished: string;
    dateModified: string;
    authorName?: string;
    authorDescription?: string;
    keywords?: string[];
    wordCount?: number;
  }) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://tailors.hk${opts.url}#article`,
    "headline": opts.title,
    "description": opts.description,
    "url": `https://tailors.hk${opts.url}`,
    "image": {
      "@type": "ImageObject",
      "url": opts.image,
      "width": 1500,
      "height": 1000
    },
    "datePublished": opts.datePublished,
    "dateModified": opts.dateModified,
    "wordCount": opts.wordCount || 1200,
    "keywords": opts.keywords?.join(", ") || "bespoke tailoring, Hong Kong tailor, suit guide",
    "inLanguage": "en-HK",
    "author": {
      "@type": "Person",
      "name": opts.authorName || "Tailors.hk Editorial Team",
      "description": opts.authorDescription || "The Tailors.hk editorial team comprises experienced menswear professionals with over two decades of combined expertise in bespoke tailoring, fabric sourcing, and Hong Kong's tailoring industry.",
      "url": "https://tailors.hk/about"
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://tailors.hk/#organization",
      "name": "Tailors.hk",
      "logo": { "@type": "ImageObject", "url": "https://tailors.hk/logo.png" }
    },
    "isPartOf": {
      "@type": "WebSite",
      "@id": "https://tailors.hk/#website"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://tailors.hk${opts.url}`
    }
  }),

  /** FAQPage */
  faq: (faqs: { question: string; answer: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  }),

  /** Product */
  product: (opts: {
    name: string;
    description: string;
    image: string;
    price: string;
    url: string;
    sku?: string;
  }) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": opts.name,
    "description": opts.description,
    "image": opts.image,
    "sku": opts.sku || opts.name.toLowerCase().replace(/\s+/g, "-"),
    "brand": {
      "@type": "Brand",
      "name": "Tailors.hk"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://tailors.hk${opts.url}`,
      "priceCurrency": "HKD",
      "price": opts.price.replace(/[^0-9]/g, ""),
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "seller": { "@type": "Organization", "name": "Tailors.hk" }
    }
  }),

  /** HowTo — for process guides */
  howTo: (opts: {
    name: string;
    description: string;
    steps: { name: string; text: string }[];
  }) => ({
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": opts.name,
    "description": opts.description,
    "step": opts.steps.map((step, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": step.name,
      "text": step.text
    }))
  }),

  /** ItemList — for directory/ranking pages */
  itemList: (items: { name: string; url: string; description?: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "url": `https://tailors.hk${item.url}`,
      "description": item.description
    }))
  }),

  /** Speakable — for AI voice search / Google Assistant */
  speakable: (cssSelectors: string[]) => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": cssSelectors
    }
  }),
  /** Person — E-E-A-T author signal */
  person: (opts: { name: string; description: string; url?: string; sameAs?: string[] }) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": opts.name,
    "description": opts.description,
    "url": opts.url || "https://tailors.hk/about",
    "sameAs": opts.sameAs || [],
    "worksFor": { "@type": "Organization", "@id": "https://tailors.hk/#organization" }
  }),
  /** Dataset — for data-heavy reference pages */
  dataset: (opts: { name: string; description: string; url: string; keywords?: string[] }) => ({
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": opts.name,
    "description": opts.description,
    "url": `https://tailors.hk${opts.url}`,
    "keywords": opts.keywords || [],
    "creator": { "@type": "Organization", "@id": "https://tailors.hk/#organization" },
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "isAccessibleForFree": true
  }),
  /** Service */
  service: (opts: {
    name: string;
    description: string;
    price: string;
    url: string;
  }) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": opts.name,
    "description": opts.description,
    "provider": { "@type": "Organization", "@id": "https://tailors.hk/#organization" },
    "areaServed": { "@type": "Country", "name": "Hong Kong" },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "HKD",
      "price": opts.price.replace(/[^0-9]/g, ""),
      "url": `https://tailors.hk${opts.url}`
    }
  }),
};
