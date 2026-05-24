"use client";
import dynamic from "next/dynamic";
const WardrobeConsultancy = dynamic(() => import("@/page-components/WardrobeConsultancy"), { ssr: false });
export default function WardrobeConsultancyClient(props: any) {
  return <WardrobeConsultancy {...props} />;
}
