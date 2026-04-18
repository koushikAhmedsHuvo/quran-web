import React from "react";
import type { Ayah } from "@/types/ayah";

interface AyahItemProps {
  ayah: Ayah;
  arabicFont: string;
  arabicFontSize: number;
  translationFontSize: number;
}

export const AyahItem: React.FC<AyahItemProps> = ({
  ayah,
  arabicFont,
  arabicFontSize,
  translationFontSize,
}) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5">
    {/* Verse header */}
    <div className="flex items-center justify-between mb-4">
      <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
        <span className="text-xs font-bold text-white">
          {ayah.numberInSurah}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {ayah.sajda && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-medium">
            Sajda
          </span>
        )}
        <span className="text-xs text-gray-400">Page {ayah.page}</span>
      </div>
    </div>

    {/* Arabic text */}
    <div
      className="text-right text-gray-800 mb-4"
      dir="rtl"
      style={{
        fontFamily: arabicFont,
        fontSize: arabicFontSize,
        lineHeight: "2.2",
      }}
    >
      {ayah.text}
    </div>

    {/* Translation */}
    {ayah.translation && (
      <div
        className="text-gray-600 border-t border-gray-100 pt-3 leading-relaxed"
        style={{ fontSize: translationFontSize }}
      >
        {ayah.translation}
      </div>
    )}
  </div>
);
