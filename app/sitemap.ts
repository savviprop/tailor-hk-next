import { MetadataRoute } from "next";

const BASE = "https://tailors.hk";

const STATIC_ROUTES = [
  "", "about", "contact", "tailored-menswear", "atelier-direct",
  "tailor-guides", "worlds-best-tailoring", "how-it-works", "faqs",
  "fabric-anthology", "dormeuil-anthology", "holland-sherry-anthology",
  "loro-piana-anthology", "scabal-anthology", "vbc-anthology",
  "executive-tailoring", "corporate-rewards", "wardrobe-consultancy",
  "concierge", "procurement", "bespoke-not-bespoke", "tailor-finder-quiz",
  "tailor-compare", "suits-by-tailor", "ready-to-wear", "reading-list",
  "client-record", "hk-tailor-map",
];

const PRODUCT_SLUGS = [
  "navy-suit", "charcoal-suit", "mid-grey-suit", "light-grey-suit",
  "dark-grey-double-breasted", "navy-double-breasted", "black-tuxedo",
  "navy-tuxedo", "morning-coat", "tweed-suit",
  "white-shirt", "blue-shirt", "striped-shirt", "poplin-shirt",
  "grey-trousers", "navy-trousers", "charcoal-trousers",
  "camel-overcoat", "navy-overcoat", "navy-blazer", "grey-blazer",
];

const GUIDE_SLUGS = [
  "how-to-commission-bespoke-suit", "fabric-guide-super-numbers",
  "savile-row-vs-hong-kong", "suit-construction-guide",
  "bespoke-shirt-guide", "trouser-guide", "overcoat-guide",
  "suit-fit-guide", "fabric-weight-guide", "lining-guide",
  "button-guide", "lapel-guide", "pocket-guide",
  "suit-care-guide", "wardrobe-building-guide",
  "hong-kong-tailor-guide", "loro-piana-fabric-guide", "dormeuil-fabric-guide",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split("T")[0];
  const entries: MetadataRoute.Sitemap = [];

  for (const route of STATIC_ROUTES) {
    entries.push({
      url: route ? `${BASE}/${route}` : BASE,
      lastModified: today,
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1.0 : 0.8,
    });
  }
  for (const slug of PRODUCT_SLUGS) {
    entries.push({ url: `${BASE}/tailored-menswear/${slug}`, lastModified: today, changeFrequency: "monthly", priority: 0.9 });
  }
  for (const slug of GUIDE_SLUGS) {
    entries.push({ url: `${BASE}/tailor-guides/${slug}`, lastModified: today, changeFrequency: "monthly", priority: 0.85 });
  }
  return entries;
}
