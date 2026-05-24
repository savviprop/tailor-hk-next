"use client";
import dynamic from "next/dynamic";
const VBCAnthology = dynamic(() => import("@/page-components/VBCAnthology"), { ssr: false });
export default function VBCAnthologyClient(props: any) {
  return <VBCAnthology {...props} />;
}
