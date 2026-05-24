"use client";
import dynamic from "next/dynamic";
const TailoredMenswear = dynamic(() => import("@/page-components/TailoredMenswear"), { ssr: false });
export default function TailoredMenswearClient(props: any) {
  return <TailoredMenswear {...props} />;
}
