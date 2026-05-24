"use client";
import dynamic from "next/dynamic";
const ReadyToWear = dynamic(() => import("@/page-components/ReadyToWear"), { ssr: false });
export default function ReadyToWearClient(props: any) {
  return <ReadyToWear {...props} />;
}
