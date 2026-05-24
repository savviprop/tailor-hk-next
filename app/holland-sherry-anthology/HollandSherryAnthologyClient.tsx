"use client";
import dynamic from "next/dynamic";
const HollandSherryAnthology = dynamic(() => import("@/page-components/HollandSherryAnthology"), { ssr: false });
export default function HollandSherryAnthologyClient(props: any) {
  return <HollandSherryAnthology {...props} />;
}
