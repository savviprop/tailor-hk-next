"use client";
import dynamic from "next/dynamic";
const Home = dynamic(() => import("@/page-components/Home"), { ssr: false });
export default function HomeClient(props: any) {
  return <Home {...props} />;
}
