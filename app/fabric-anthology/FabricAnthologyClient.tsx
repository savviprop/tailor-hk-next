"use client";
import dynamic from "next/dynamic";
const FabricAnthology = dynamic(() => import("@/page-components/FabricAnthology"), { ssr: false });
export default function FabricAnthologyClient(props: any) {
  return <FabricAnthology {...props} />;
}
