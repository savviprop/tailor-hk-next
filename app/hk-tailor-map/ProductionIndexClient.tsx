"use client";
import dynamic from "next/dynamic";
const ProductionIndex = dynamic(() => import("@/page-components/ProductionIndex"), { ssr: false });
export default function ProductionIndexClient(props: any) {
  return <ProductionIndex {...props} />;
}
