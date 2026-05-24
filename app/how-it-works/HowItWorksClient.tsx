"use client";
import dynamic from "next/dynamic";
const HowItWorks = dynamic(() => import("@/page-components/HowItWorks"), { ssr: false });
export default function HowItWorksClient(props: any) {
  return <HowItWorks {...props} />;
}
