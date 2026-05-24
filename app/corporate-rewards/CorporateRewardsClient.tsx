"use client";
import dynamic from "next/dynamic";
const CorporateRewards = dynamic(() => import("@/page-components/CorporateRewards"), { ssr: false });
export default function CorporateRewardsClient(props: any) {
  return <CorporateRewards {...props} />;
}
