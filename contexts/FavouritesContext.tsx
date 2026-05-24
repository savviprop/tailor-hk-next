"use client";
/**
 * TAILORS.HK — FAVOURITES / ENQUIRY LIST CONTEXT
 * Persists to localStorage. Clients add products to a list,
 * add per-item notes, then send a WhatsApp enquiry or book a consultation.
 */
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { buildInclusionsBlock, WHATSAPP_NUMBER } from "@/lib/whatsapp";

export interface FavouriteItem {
  id: string;
  name: string;
  category: string;
  price: string;
  img: string;
  mill?: string;
  note?: string;
}

interface FavouritesContextType {
  favourites: FavouriteItem[];
  addFavourite: (item: FavouriteItem) => void;
  removeFavourite: (id: string) => void;
  isFavourite: (id: string) => boolean;
  toggleFavourite: (item: FavouriteItem) => void;
  updateNote: (id: string, note: string) => void;
  clearFavourites: () => void;
  count: number;
  sendEnquiry: (isMTM?: boolean) => void;
  bookConsultation: (isMTM?: boolean) => void;
}

const FavouritesContext = createContext<FavouritesContextType | null>(null);

export function FavouritesProvider({ children }: { children: ReactNode }) {
  const [favourites, setFavourites] = useState<FavouriteItem[]>(() => {
    try {
      const stored = localStorage.getItem("tailor-hk-favourites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("tailor-hk-favourites", JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (item: FavouriteItem) => {
    setFavourites(prev => prev.find(f => f.id === item.id) ? prev : [...prev, item]);
  };

  const removeFavourite = (id: string) => {
    setFavourites(prev => prev.filter(f => f.id !== id));
  };

  const isFavourite = (id: string) => favourites.some(f => f.id === id);

  const toggleFavourite = (item: FavouriteItem) => {
    isFavourite(item.id) ? removeFavourite(item.id) : addFavourite(item);
  };

  const updateNote = (id: string, note: string) => {
    setFavourites(prev => prev.map(f => f.id === id ? { ...f, note } : f));
  };

  const clearFavourites = () => setFavourites([]);

  const buildItemList = () =>
    favourites.map((f, i) => {
      let line = `${i + 1}. ${f.name} · ${f.category} · ${f.price}`;
      if (f.mill) line += ` · ${f.mill}`;
      if (f.note) line += `\n   Note: ${f.note}`;
      return line;
    }).join("\n");

  const sendEnquiry = (isMTM = false) => {
    if (favourites.length === 0) return;
    const lines = [
      `*ATELIER DIRECT ENQUIRY — TAILORS.HK*`,
      `Source: Enquiry List (${favourites.length} item${favourites.length > 1 ? 's' : ''})`,
      `Service Preference: ${isMTM ? 'Made-to-Measure (MTM)' : 'Bespoke'}`,
      ``,
      `*Garments Selected:*`,
      buildItemList(),
      ``,
      buildInclusionsBlock(isMTM),
      ``,
      `I would like to discuss these commissions. Please advise on availability and next steps.`,
    ].join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`, "_blank");
  };

  const bookConsultation = (isMTM = false) => {
    if (favourites.length === 0) return;
    const lines = [
      `*ATELIER DIRECT CONSULTATION — TAILORS.HK*`,
      `Source: Enquiry List — Consultation Request`,
      `Service Preference: ${isMTM ? 'Made-to-Measure (MTM)' : 'Bespoke'}`,
      ``,
      `*Garments to Discuss:*`,
      buildItemList(),
      ``,
      buildInclusionsBlock(isMTM),
      ``,
      `I would like to book a consultation to discuss these commissions. Please advise on your available appointment times.`,
    ].join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`, "_blank");
  };

  return (
    <FavouritesContext.Provider value={{
      favourites,
      addFavourite,
      removeFavourite,
      isFavourite,
      toggleFavourite,
      updateNote,
      clearFavourites,
      count: favourites.length,
      sendEnquiry,
      bookConsultation,
    }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const ctx = useContext(FavouritesContext);
  if (!ctx) throw new Error("useFavourites must be used within FavouritesProvider");
  return ctx;
}
