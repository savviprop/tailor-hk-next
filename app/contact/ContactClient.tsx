"use client";
import dynamic from "next/dynamic";
const Contact = dynamic(() => import("@/page-components/Contact"), { ssr: false });
export default function ContactClient(props: any) {
  return <Contact {...props} />;
}
