"use client";
import dynamic from "next/dynamic";
const TailorFinderQuiz = dynamic(() => import("@/page-components/TailorFinderQuiz"), { ssr: false });
export default function TailorFinderQuizClient(props: any) {
  return <TailorFinderQuiz {...props} />;
}
