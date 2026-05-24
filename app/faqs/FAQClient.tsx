"use client";
import dynamic from "next/dynamic";
const FAQ = dynamic(() => import("@/page-components/FAQ"), { ssr: false });
export default function FAQClient(props: any) {
  return <FAQ {...props} />;
}
