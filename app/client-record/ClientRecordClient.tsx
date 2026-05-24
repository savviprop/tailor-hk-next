"use client";
import dynamic from "next/dynamic";
const ClientRecord = dynamic(() => import("@/page-components/ClientRecord"), { ssr: false });
export default function ClientRecordClient(props: any) {
  return <ClientRecord {...props} />;
}
