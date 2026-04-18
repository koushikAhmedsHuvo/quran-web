"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { fetchSurah, fetchAyahs } from "@/lib/api";
import { AyahList } from "@/components/ayah/AyahList";
import { useSettingsContext } from "@/context/SettingsContext";
import type { Surah } from "@/types/surah";
import type { Ayah } from "@/types/ayah";

export default function SurahPage() {
  const params = useParams();
  const surahId = Number(params.id);
  const { arabicFont, arabicFontSize, translationFontSize, selectedEditionId } =
    useSettingsContext();

  const [surah, setSurah] = useState<Surah | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!surahId || isNaN(surahId)) return;
    setLoading(true);
    setError(null);
    setSurah(null);
    setAyahs([]);

    // Fall back to Saheeh International (id 20) so translations always show
    const editionId = selectedEditionId ?? 20;

    Promise.all([fetchSurah(surahId), fetchAyahs(surahId, 1, 300, editionId)])
      .then(([surahData, ayahsData]) => {
        setSurah(surahData);
        setAyahs(ayahsData.data);
      })
      .catch((e) => setError((e as Error).message))
      .finally(() => setLoading(false));
  }, [surahId, selectedEditionId]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Back navigation */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-emerald-700 hover:text-emerald-900 mb-6 font-medium transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        All Surahs
      </Link>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center py-16 gap-3">
          <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full" />
          <p className="text-sm text-gray-400">Loading surah…</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-center py-12">
          <p className="text-red-500 font-medium">{error}</p>
        </div>
      )}

      {/* Content */}
      {!loading && !error && surah && (
        <>
          {/* Surah header card */}
          <div className="text-center mb-8 p-6 bg-emerald-800 rounded-2xl text-white shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                {surah.number}
              </span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                  surah.type === "Meccan"
                    ? "bg-amber-400/30 text-amber-200"
                    : "bg-sky-400/30 text-sky-200"
                }`}
              >
                {surah.type}
              </span>
            </div>
            <h1
              className="text-5xl mb-2"
              style={{ fontFamily: arabicFont, lineHeight: "1.4" }}
            >
              {surah.nameAr}
            </h1>
            <p className="text-emerald-100 text-xl font-semibold mt-1">
              {surah.nameEn}
            </p>
            <p className="text-emerald-200 text-sm mt-1">
              {surah.nameEnTranslation}
            </p>
            <p className="text-emerald-300 text-xs mt-3">
              {ayahs.length} verse{ayahs.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Bismillah — omit for Surah At-Tawbah (9) */}
          {surah.number !== 9 && (
            <div
              className="text-center text-gray-600 mb-6 py-3"
              style={{
                fontFamily: arabicFont,
                fontSize: arabicFontSize * 0.85,
                direction: "rtl",
                lineHeight: "2",
              }}
            >
              بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
            </div>
          )}

          {/* Ayah list */}
          <AyahList
            ayahs={ayahs}
            arabicFont={arabicFont}
            arabicFontSize={arabicFontSize}
            translationFontSize={translationFontSize}
          />
        </>
      )}
    </div>
  );
}
