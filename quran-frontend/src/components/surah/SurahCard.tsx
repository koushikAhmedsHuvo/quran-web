import React from "react";
import type { Surah } from "@/types/surah";

interface SurahCardProps {
  surah: Surah;
  arabicFont: string;
}

export const SurahCard: React.FC<SurahCardProps> = ({ surah, arabicFont }) => (
  <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-200 p-4 flex items-center gap-3 cursor-pointer">
    {/* Number badge */}
    <div className="shrink-0 w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
      <span className="text-sm font-bold text-emerald-700">{surah.number}</span>
    </div>

    {/* Names */}
    <div className="flex-1 min-w-0">
      <div className="text-sm font-semibold text-gray-800 truncate">
        {surah.nameEn}
      </div>
      <div className="text-xs text-gray-500 truncate">
        {surah.nameEnTranslation}
      </div>
      <span
        className={`inline-block mt-1 text-xs px-1.5 py-0.5 rounded font-medium ${
          surah.type === "Meccan"
            ? "bg-amber-50 text-amber-700"
            : "bg-sky-50 text-sky-700"
        }`}
      >
        {surah.type}
      </span>
    </div>

    {/* Arabic name */}
    <div
      className="shrink-0 text-xl text-gray-700 group-hover:text-emerald-700 transition-colors"
      style={{ fontFamily: arabicFont }}
      dir="rtl"
    >
      {surah.nameAr}
    </div>
  </div>
);
