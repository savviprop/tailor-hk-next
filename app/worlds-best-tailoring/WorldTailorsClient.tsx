"use client";
import dynamic from "next/dynamic";
const WorldTailors = dynamic(() => import("@/page-components/WorldTailors"), { ssr: false });
export default function WorldTailorsClient(props: any) {
  return <WorldTailors {...props} />;
}
