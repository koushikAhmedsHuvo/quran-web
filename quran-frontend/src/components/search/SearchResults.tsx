import React from "react";
import Link from "next/link";
import type { SearchResult } from "@/types/ayah";
import type { Surah } from "@/types/surah";

interface SearchResultsProps {
  results: SearchResult[];
  surahMap: Map<number, Surah>;
  arabicFont: string;
  arabicFontSize: number;
  translationFontSize: number;
  query: string;
}

function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-yellow-200 text-yellow-900 rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  surahMap,
  arabicFont,
  arabicFontSize,
  translationFontSize,
  query,
}) => {
  if (results.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <svg
          className="w-12 h-12 mx-auto mb-3 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 0 1 5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
          />
        </svg>
        <p className="text-base">No results found for &ldquo;{query}&rdquo;</p>
        <p className="text-sm mt-1">Try different keywords</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result) => {
        const surah = surahMap.get(result.ayah.surahId);
        return (
          <Link
            key={result.id}
            href={`/surah/${result.ayah.surahId}`}
            className="block bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all"
          >
            {/* Reference header */}
            <div className="flex items-center flex-wrap gap-2 mb-3">
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">
                {surah?.nameEn ?? `Surah ${result.ayah.surahId}`}
              </span>
              {surah && (
                <span
                  className="text-base text-gray-500"
                  style={{ fontFamily: arabicFont }}
                >
                  {surah.nameAr}
                </span>
              )}
              <span className="ml-auto text-xs text-gray-400 font-medium">
                Verse {result.ayah.numberInSurah}
              </span>
            </div>

            {/* Arabic text */}
            <div
              className="text-right text-gray-700 mb-3 leading-relaxed"
              dir="rtl"
              style={{
                fontFamily: arabicFont,
                fontSize: Math.max(arabicFontSize * 0.75, 18),
                lineHeight: "2",
              }}
            >
              {result.ayah.text}
            </div>

            {/* Translation with highlight */}
            <div
              className="text-gray-600 leading-relaxed border-t border-gray-50 pt-2"
              style={{ fontSize: translationFontSize }}
            >
              {highlightText(result.translation, query)}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
