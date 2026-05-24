"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ label = "Back" }: { label?: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm tracking-wider uppercase mb-8"
    >
      <ArrowLeft size={16} />
      {label}
    </button>
  );
}
