"use client";
import dynamic from "next/dynamic";
const About = dynamic(() => import("@/page-components/About"), { ssr: false });
export default function AboutClient(props: any) {
  return <About {...props} />;
}
