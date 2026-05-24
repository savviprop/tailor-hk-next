"use client";
import dynamic from "next/dynamic";
const ReadingList = dynamic(() => import("@/page-components/ReadingList"), { ssr: false });
export default function ReadingListClient(props: any) {
  return <ReadingList {...props} />;
}
