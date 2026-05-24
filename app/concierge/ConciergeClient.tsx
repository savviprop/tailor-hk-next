"use client";
import dynamic from "next/dynamic";
const Concierge = dynamic(() => import("@/page-components/Concierge"), { ssr: false });
export default function ConciergeClient(props: any) {
  return <Concierge {...props} />;
}
