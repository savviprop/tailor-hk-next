"use client";
import dynamic from "next/dynamic";
const ScabalAnthology = dynamic(() => import("@/page-components/ScabalAnthology"), { ssr: false });
export default function ScabalAnthologyClient(props: any) {
  return <ScabalAnthology {...props} />;
}
