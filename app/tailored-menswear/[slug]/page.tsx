import type { Metadata } from "next";
import ProductPageClient from "./ProductPageClient";

const PRODUCT_META: Record<string, { title: string; desc: string }> = {
  "navy-suit": { title: "Navy Bespoke Suit Hong Kong — From HK$8,800", desc: "Commission a bespoke navy suit in Hong Kong. Classic navy worsted, atelier-direct from HK$8,800." },
  "charcoal-suit": { title: "Charcoal Bespoke Suit Hong Kong — From HK$8,800", desc: "Commission a bespoke charcoal suit in Hong Kong. The essential business suit, atelier-direct from HK$8,800." },
  "mid-grey-suit": { title: "Mid Grey Bespoke Suit Hong Kong — From HK$8,800", desc: "Commission a bespoke mid grey suit in Hong Kong. Versatile and elegant, atelier-direct from HK$8,800." },
  "light-grey-suit": { title: "Light Grey Bespoke Suit Hong Kong — From HK$8,800", desc: "Commission a bespoke light grey suit in Hong Kong. Perfect for summer and events, from HK$8,800." },
  "dark-grey-double-breasted": { title: "Dark Grey Double Breasted Suit Hong Kong — From HK$12,800", desc: "Commission a bespoke dark grey double breasted suit in Hong Kong. Vitale Barberis Canonico cloth, from HK$12,800." },
  "navy-double-breasted": { title: "Navy Double Breasted Suit Hong Kong — From HK$12,800", desc: "Commission a bespoke navy double breasted suit in Hong Kong. Atelier-direct from HK$12,800." },
  "black-tuxedo": { title: "Bespoke Black Tuxedo Hong Kong — From HK$12,800", desc: "Commission a bespoke black tuxedo in Hong Kong. Peak or shawl lapel, atelier-direct from HK$12,800." },
  "navy-tuxedo": { title: "Bespoke Navy Tuxedo Hong Kong — From HK$12,800", desc: "Commission a bespoke navy tuxedo in Hong Kong. The modern alternative to black tie, from HK$12,800." },
  "morning-coat": { title: "Bespoke Morning Coat Hong Kong — From HK$14,800", desc: "Commission a bespoke morning coat in Hong Kong. Perfect for weddings and formal occasions." },
  "tweed-suit": { title: "Bespoke Tweed Suit Hong Kong — From HK$10,800", desc: "Commission a bespoke tweed suit in Hong Kong. Scottish and Irish tweeds, atelier-direct from HK$10,800." },
  "white-shirt": { title: "Bespoke White Shirt Hong Kong — From HK$1,280", desc: "Commission a bespoke white shirt in Hong Kong. Swiss cotton from HK$1,800, Italian cotton from HK$1,280." },
  "blue-shirt": { title: "Bespoke Blue Shirt Hong Kong — From HK$1,280", desc: "Commission a bespoke blue shirt in Hong Kong. Swiss cotton from HK$1,800, Italian cotton from HK$1,280." },
  "striped-shirt": { title: "Bespoke Striped Shirt Hong Kong — From HK$1,280", desc: "Commission a bespoke striped shirt in Hong Kong. Classic Bengal and Hairline stripes, from HK$1,280." },
  "poplin-shirt": { title: "Bespoke Poplin Shirt Hong Kong — From HK$1,280", desc: "Commission a bespoke poplin shirt in Hong Kong. The finest Egyptian cotton poplin, from HK$1,280." },
  "grey-trousers": { title: "Bespoke Grey Trousers Hong Kong — From HK$2,800", desc: "Commission bespoke grey trousers in Hong Kong. Fine worsted wool, atelier-direct from HK$2,800." },
  "navy-trousers": { title: "Bespoke Navy Trousers Hong Kong — From HK$2,800", desc: "Commission bespoke navy trousers in Hong Kong. Versatile and elegant, from HK$2,800." },
  "charcoal-trousers": { title: "Bespoke Charcoal Trousers Hong Kong — From HK$2,800", desc: "Commission bespoke charcoal trousers in Hong Kong. The essential business trouser, from HK$2,800." },
  "camel-overcoat": { title: "Bespoke Camel Overcoat Hong Kong — From HK$14,800", desc: "Commission a bespoke camel overcoat in Hong Kong. Cashmere and fine wool, from HK$14,800." },
  "navy-overcoat": { title: "Bespoke Navy Overcoat Hong Kong — From HK$14,800", desc: "Commission a bespoke navy overcoat in Hong Kong. Loro Piana and premium wools, from HK$14,800." },
  "navy-blazer": { title: "Bespoke Navy Blazer Hong Kong — From HK$8,800", desc: "Commission a bespoke navy blazer in Hong Kong. The most versatile garment in menswear, from HK$8,800." },
  "grey-blazer": { title: "Bespoke Grey Blazer Hong Kong — From HK$8,800", desc: "Commission a bespoke grey blazer in Hong Kong. Atelier-direct from HK$8,800." },
};

export async function generateStaticParams() {
  return [{"slug": "navy-suit"}, {"slug": "charcoal-suit"}, {"slug": "mid-grey-suit"}, {"slug": "light-grey-suit"}, {"slug": "dark-grey-double-breasted"}, {"slug": "navy-double-breasted"}, {"slug": "black-tuxedo"}, {"slug": "navy-tuxedo"}, {"slug": "morning-coat"}, {"slug": "tweed-suit"}, {"slug": "white-shirt"}, {"slug": "blue-shirt"}, {"slug": "striped-shirt"}, {"slug": "poplin-shirt"}, {"slug": "grey-trousers"}, {"slug": "navy-trousers"}, {"slug": "charcoal-trousers"}, {"slug": "camel-overcoat"}, {"slug": "navy-overcoat"}, {"slug": "navy-blazer"}, {"slug": "grey-blazer"}];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = PRODUCT_META[slug] ?? {
    title: `Bespoke ${slug.replace(/-/g, " ")} Hong Kong | Tailors.hk`,
    desc: `Commission a bespoke ${slug.replace(/-/g, " ")} in Hong Kong. Atelier-direct pricing from HK$8,800.`,
  };
  const canonical = `https://tailors.hk/tailored-menswear/${slug}`;
  return {
    title: meta.title,
    description: meta.desc,
    alternates: { canonical },
    openGraph: { title: meta.title, description: meta.desc, url: canonical, type: "website" },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const meta = PRODUCT_META[slug] ?? { title: "", desc: "" };
  const canonical = `https://tailors.hk/tailored-menswear/${slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: meta.title,
    description: meta.desc,
    url: canonical,
    brand: { "@type": "Brand", name: "Tailors.hk" },
    offers: { "@type": "Offer", priceCurrency: "HKD", price: "8800", availability: "https://schema.org/InStock" },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ProductPageClient />
    </>
  );
}
