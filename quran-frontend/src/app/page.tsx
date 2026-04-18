"use client";

import React, { useEffect, useState, useMemo } from "react";
import { fetchSurahs } from "@/lib/api";
import { SurahList } from "@/components/surah/SurahList";
import { useSettingsContext } from "@/context/SettingsContext";
import type { Surah } from "@/types/surah";

export default function HomePage() {
  const { arabicFont } = useSettingsContext();
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchSurahs()
      .then(setSurahs)
      .catch((e) => setError((e as Error).message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return surahs;
    return surahs.filter(
      (s) =>
        s.nameEn.toLowerCase().includes(q) ||
        s.nameEnTranslation.toLowerCase().includes(q) ||
        String(s.number) === q,
    );
  }, [surahs, filter]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-8">
        <h1
          className="text-5xl sm:text-6xl text-emerald-800 mb-2 leading-tight"
          style={{ fontFamily: arabicFont }}
        >
          القرآن الكريم
        </h1>
        <p className="text-gray-500 text-base">The Holy Quran — 114 Surahs</p>
      </div>

      {/* Filter input */}
      <div className="relative mb-6 max-w-sm mx-auto">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by name or number…"
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-gray-700 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
        />
        {filter && (
          <button
            onClick={() => setFilter("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-16">
          <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center py-12">
          <p className="text-red-500 font-medium">Failed to load surahs</p>
          <p className="text-sm mt-1 text-gray-400">
            Make sure the backend is running at{" "}
            <code className="bg-gray-100 px-1 rounded">localhost:3000</code>
          </p>
          <p className="text-xs text-gray-400 mt-1">{error}</p>
        </div>
      )}

      {/* Surah grid */}
      {!loading && !error && (
        <>
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              No surahs match &ldquo;{filter}&rdquo;
            </div>
          ) : (
            <>
              {filter && (
                <p className="text-sm text-gray-500 mb-3">
                  {filtered.length} surah{filtered.length !== 1 ? "s" : ""}{" "}
                  found
                </p>
              )}
              <SurahList surahs={filtered} arabicFont={arabicFont} />
            </>
          )}
        </>
      )}
    </div>
  );
}
