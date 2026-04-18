"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SearchBar } from "@/components/search/SearchBar";
import { SearchResults } from "@/components/search/SearchResults";
import { fetchSurahs, searchAyahs } from "@/lib/api";
import { useSettingsContext } from "@/context/SettingsContext";
import type { SearchResult } from "@/types/ayah";
import type { Surah } from "@/types/surah";

export default function SearchPage() {
  const { arabicFont, arabicFontSize, translationFontSize, selectedEditionId } =
    useSettingsContext();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [surahMap, setSurahMap] = useState<Map<number, Surah>>(new Map());
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  // Pre-load surah map for result display
  useEffect(() => {
    fetchSurahs()
      .then((surahs) => setSurahMap(new Map(surahs.map((s) => [s.number, s]))))
      .catch(() => {});
  }, []);

  async function doSearch() {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const res = await searchAyahs(query.trim(), 1, 30, selectedEditionId);
      setResults(res.data);
      setTotal(res.meta.total);
    } catch (e) {
      setError((e as Error).message);
      setResults([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Page header */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-emerald-700 hover:text-emerald-900 mb-4 font-medium transition-colors"
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
        <h1 className="text-2xl font-bold text-gray-800">Search the Quran</h1>
        <p className="text-gray-500 text-sm mt-1">
          Search for words or phrases in translations
        </p>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={doSearch}
          isLoading={loading}
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full" />
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="text-center py-8">
          <p className="text-red-500 font-medium">{error}</p>
          <p className="text-sm text-gray-400 mt-1">
            Make sure the backend is running
          </p>
        </div>
      )}

      {/* Results */}
      {!loading && searched && !error && (
        <>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              {total > 0
                ? `${total} result${total !== 1 ? "s" : ""} for "${query}"`
                : `No results for "${query}"`}
            </p>
            {total > 30 && (
              <span className="text-xs text-gray-400">Showing first 30</span>
            )}
          </div>
          <SearchResults
            results={results}
            surahMap={surahMap}
            arabicFont={arabicFont}
            arabicFontSize={arabicFontSize}
            translationFontSize={translationFontSize}
            query={query}
          />
        </>
      )}

      {/* Empty state */}
      {!searched && !loading && (
        <div className="text-center py-16">
          <div
            className="text-5xl text-emerald-700 mb-4"
            style={{ fontFamily: arabicFont }}
          >
            ٱقْرَأْ
          </div>
          <p className="text-gray-400 text-sm">
            Start typing to search through translations
          </p>
          <p className="text-gray-300 text-xs mt-1">
            e.g. &ldquo;mercy&rdquo;, &ldquo;paradise&rdquo;,
            &ldquo;prayer&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}
