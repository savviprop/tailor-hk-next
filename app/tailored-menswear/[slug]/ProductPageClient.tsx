"use client";
import dynamic from "next/dynamic";
const ProductPage = dynamic(() => import("@/page-components/ProductPage"), { ssr: false });
export default function ProductPageClient(props: any) {
  return <ProductPage {...props} />;
}
