"use client";
import dynamic from "next/dynamic";
const TailorGuides = dynamic(() => import("@/page-components/TailorGuides"), { ssr: false });
export default function TailorGuidesClient(props: any) {
  return <TailorGuides {...props} />;
}
