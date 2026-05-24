"use client";
/**
 * Wouter shim for Next.js App Router migration.
 * All original SPA page-components import from "wouter" — this shim
 * intercepts those imports and maps them to Next.js equivalents.
 * Never modify page-components to work around missing exports — add them here.
 */
import NextLink from "next/link";
import { useRouter, usePathname, useParams as nextUseParams, useSearchParams } from "next/navigation";
import React from "react";

// Link — wraps next/link, same API as wouter Link
export const Link = NextLink;

// useLocation — returns [pathname, navigate] matching wouter's API
export function useLocation(): [string, (to: string) => void] {
  const pathname = usePathname();
  const router = useRouter();
  return [pathname, (to: string) => router.push(to)];
}

// useParams — wraps next/navigation useParams
export function useParams<T extends Record<string, string>>(): T {
  return nextUseParams() as T;
}

// useSearch — returns the query string (without leading "?")
export function useSearch(): string {
  const searchParams = useSearchParams();
  return searchParams ? searchParams.toString() : "";
}

// Route — renders children, ignores path (routing handled by Next.js file system)
export function Route({
  children,
}: {
  path?: string;
  component?: React.ComponentType;
  children?: React.ReactNode;
}) {
  return <>{children}</>;
}

// Redirect — navigates on mount
export function Redirect({ to }: { to: string }) {
  const router = useRouter();
  React.useEffect(() => { router.replace(to); }, [router, to]);
  return null;
}
