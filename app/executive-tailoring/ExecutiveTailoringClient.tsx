"use client";
import dynamic from "next/dynamic";
const ExecutiveTailoring = dynamic(() => import("@/page-components/ExecutiveTailoring"), { ssr: false });
export default function ExecutiveTailoringClient(props: any) {
  return <ExecutiveTailoring {...props} />;
}
