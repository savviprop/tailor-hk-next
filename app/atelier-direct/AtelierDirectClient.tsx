"use client";
import dynamic from "next/dynamic";
const AtelierDirect = dynamic(() => import("@/page-components/AtelierDirect"), { ssr: false });
export default function AtelierDirectClient(props: any) {
  return <AtelierDirect {...props} />;
}
