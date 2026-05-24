"use client";
import dynamic from "next/dynamic";
const GuideArticle = dynamic(() => import("@/page-components/GuideArticle"), { ssr: false });
export default function GuideArticleClient(props: any) {
  return <GuideArticle {...props} />;
}
