"use client";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { FavouritesProvider } from "@/contexts/FavouritesContext";
import { ReadingListProvider } from "@/contexts/ReadingListContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <FavouritesProvider>
        <ReadingListProvider>
          {children}
        </ReadingListProvider>
      </FavouritesProvider>
    </ThemeProvider>
  );
}
