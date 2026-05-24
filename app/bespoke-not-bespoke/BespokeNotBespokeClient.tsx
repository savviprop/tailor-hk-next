"use client";
import dynamic from "next/dynamic";
const BespokeNotBespoke = dynamic(() => import("@/page-components/BespokeNotBespoke"), { ssr: false });
export default function BespokeNotBespokeClient(props: any) {
  return <BespokeNotBespoke {...props} />;
}
