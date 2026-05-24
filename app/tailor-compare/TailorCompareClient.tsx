"use client";
import dynamic from "next/dynamic";
const TailorCompare = dynamic(() => import("@/page-components/TailorCompare"), { ssr: false });
export default function TailorCompareClient(props: any) {
  return <TailorCompare {...props} />;
}
