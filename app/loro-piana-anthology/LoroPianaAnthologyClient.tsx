"use client";
import dynamic from "next/dynamic";
const LoroPianaAnthology = dynamic(() => import("@/page-components/LoroPianaAnthology"), { ssr: false });
export default function LoroPianaAnthologyClient(props: any) {
  return <LoroPianaAnthology {...props} />;
}
