"use client";

import React, { useEffect } from "react";
import { useSettingsContext } from "@/context/SettingsContext";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { fetchEditions } from "@/lib/api";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { setEditions, setSelectedEditionId, isSidebarOpen, closeSidebar } =
    useSettingsContext();

  useEffect(() => {
    fetchEditions("translation")
      .then((editions) => {
        setEditions(editions);
        // Auto-select English translation only if no preference is saved
        try {
          const stored = localStorage.getItem("quran_settings");
          const parsed = stored ? JSON.parse(stored) : {};
          if (!parsed.selectedEditionId && editions.length > 0) {
            const english =
              editions.find((e) => e.identifier === "en.sahih") ??
              editions.find((e) => e.language === "en") ??
              editions[0];
            if (english) setSelectedEditionId(english.id);
          }
        } catch {
          if (editions.length > 0) {
            const english =
              editions.find((e) => e.identifier === "en.sahih") ??
              editions.find((e) => e.language === "en") ??
              editions[0];
            if (english) setSelectedEditionId(english.id);
          }
        }
      })
      .catch(() => {
        // Backend may not be running — fail silently
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Navbar />
      <main className="flex-1">{children}</main>

      {/* Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <Sidebar />
    </div>
  );
}
