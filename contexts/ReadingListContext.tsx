"use client";
/**
 * TAILOR.HK — READING LIST CONTEXT
 * Persists bookmarked guides to localStorage
 */

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface BookmarkedGuide {
  slug: string;
  title: string;
  category: string;
  img: string;
  excerpt: string;
}

interface ReadingListContextType {
  bookmarks: BookmarkedGuide[];
  isBookmarked: (slug: string) => boolean;
  toggleBookmark: (guide: BookmarkedGuide) => void;
  clearAll: () => void;
}

const ReadingListContext = createContext<ReadingListContextType | null>(null);

export function ReadingListProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<BookmarkedGuide[]>(() => {
    try {
      const stored = localStorage.getItem("tailor-hk-reading-list");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("tailor-hk-reading-list", JSON.stringify(bookmarks));
    } catch {
      // localStorage unavailable
    }
  }, [bookmarks]);

  const isBookmarked = (slug: string) => bookmarks.some((b) => b.slug === slug);

  const toggleBookmark = (guide: BookmarkedGuide) => {
    setBookmarks((prev) =>
      prev.some((b) => b.slug === guide.slug)
        ? prev.filter((b) => b.slug !== guide.slug)
        : [guide, ...prev]
    );
  };

  const clearAll = () => setBookmarks([]);

  return (
    <ReadingListContext.Provider value={{ bookmarks, isBookmarked, toggleBookmark, clearAll }}>
      {children}
    </ReadingListContext.Provider>
  );
}

export function useReadingList() {
  const ctx = useContext(ReadingListContext);
  if (!ctx) throw new Error("useReadingList must be used within ReadingListProvider");
  return ctx;
}
