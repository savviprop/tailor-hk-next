"use client";
import dynamic from "next/dynamic";
const DormeuIlAnthology = dynamic(() => import("@/page-components/DormeuIlAnthology"), { ssr: false });
export default function DormeuIlAnthologyClient(props: any) {
  return <DormeuIlAnthology {...props} />;
}
