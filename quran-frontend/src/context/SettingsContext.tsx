"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { Edition } from "@/types/surah";

interface Settings {
  arabicFont: string;
  arabicFontSize: number;
  translationFontSize: number;
  selectedEditionId: number | null;
}

interface SettingsContextType extends Settings {
  setArabicFont: (font: string) => void;
  setArabicFontSize: (size: number) => void;
  setTranslationFontSize: (size: number) => void;
  setSelectedEditionId: (id: number | null) => void;
  editions: Edition[];
  setEditions: (editions: Edition[]) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const STORAGE_KEY = "quran_settings";

const defaultSettings: Settings = {
  arabicFont: "Amiri",
  arabicFontSize: 28,
  translationFontSize: 16,
  selectedEditionId: null,
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [editions, setEditions] = useState<Edition[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<Settings>;
        setSettings((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // ignore
    }
  }, []);

  function update<K extends keyof Settings>(key: K, value: Settings[K]) {
    setSettings((prev) => {
      const next = { ...prev, [key]: value };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }

  const ctx: SettingsContextType = {
    ...settings,
    setArabicFont: (v) => update("arabicFont", v),
    setArabicFontSize: (v) => update("arabicFontSize", v),
    setTranslationFontSize: (v) => update("translationFontSize", v),
    setSelectedEditionId: (v) => update("selectedEditionId", v),
    editions,
    setEditions,
    isSidebarOpen,
    toggleSidebar: () => setIsSidebarOpen((p) => !p),
    closeSidebar: () => setIsSidebarOpen(false),
  };

  return (
    <SettingsContext.Provider value={ctx}>{children}</SettingsContext.Provider>
  );
}

export function useSettingsContext() {
  const ctx = useContext(SettingsContext);
  if (!ctx)
    throw new Error("useSettingsContext must be used within SettingsProvider");
  return ctx;
}
