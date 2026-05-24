"use client";
import dynamic from "next/dynamic";
const Procurement = dynamic(() => import("@/page-components/Procurement"), { ssr: false });
export default function ProcurementClient(props: any) {
  return <Procurement {...props} />;
}
