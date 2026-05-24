"use client";
import dynamic from "next/dynamic";
const SuitsByTailor = dynamic(() => import("@/page-components/SuitsByTailor"), { ssr: false });
export default function SuitsByTailorClient(props: any) {
  return <SuitsByTailor {...props} />;
}
