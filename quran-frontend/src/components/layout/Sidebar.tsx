"use client";

import React from "react";
import { useSettingsContext } from "@/context/SettingsContext";
import { ARABIC_FONTS } from "@/lib/constants";

export const Sidebar: React.FC = () => {
  const {
    isSidebarOpen,
    closeSidebar,
    arabicFont,
    setArabicFont,
    arabicFontSize,
    setArabicFontSize,
    translationFontSize,
    setTranslationFontSize,
    selectedEditionId,
    setSelectedEditionId,
    editions,
  } = useSettingsContext();

  return (
    <aside
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
      aria-label="Settings panel"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-emerald-800 text-white shrink-0">
        <div className="flex items-center gap-2">
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
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
            />
          </svg>
          <h2 className="text-sm font-semibold">Reading Settings</h2>
        </div>
        <button
          onClick={closeSidebar}
          className="p-1.5 rounded-lg hover:bg-emerald-700 transition-colors"
          aria-label="Close settings"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-7">
        {/* ── Arabic Font ── */}
        <section>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Arabic Font
          </h3>
          <div className="space-y-2">
            {ARABIC_FONTS.map((font) => (
              <button
                key={font.value}
                onClick={() => setArabicFont(font.value)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm transition-all ${
                  arabicFont === font.value
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm"
                    : "border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="font-medium">{font.label}</span>
                <span
                  className="text-xl text-gray-700"
                  style={{ fontFamily: font.value }}
                >
                  بسم الله
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ── Arabic Font Size ── */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Arabic Font Size
            </h3>
            <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              {arabicFontSize}px
            </span>
          </div>
          <input
            type="range"
            min={18}
            max={60}
            step={1}
            value={arabicFontSize}
            onChange={(e) => setArabicFontSize(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1 mb-3">
            <span>18px</span>
            <span>60px</span>
          </div>
          {/* Live preview */}
          <div
            className="p-3 bg-stone-50 rounded-lg text-center text-gray-700 leading-relaxed border border-stone-200"
            style={{
              fontFamily: arabicFont,
              fontSize: arabicFontSize,
              direction: "rtl",
              lineHeight: "1.8",
            }}
          >
            ٱلْحَمْدُ لِلَّهِ
          </div>
        </section>

        {/* ── Translation Font Size ── */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Translation Font Size
            </h3>
            <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              {translationFontSize}px
            </span>
          </div>
          <input
            type="range"
            min={12}
            max={28}
            step={1}
            value={translationFontSize}
            onChange={(e) => setTranslationFontSize(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1 mb-3">
            <span>12px</span>
            <span>28px</span>
          </div>
          {/* Live preview */}
          <div
            className="p-3 bg-stone-50 rounded-lg text-gray-600 leading-relaxed border border-stone-200"
            style={{ fontSize: translationFontSize }}
          >
            In the name of Allah, the Entirely Merciful.
          </div>
        </section>

        {/* ── Translation / Edition ── */}
        {editions.length > 0 && (
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Translation
            </h3>
            <select
              value={selectedEditionId ?? ""}
              onChange={(e) =>
                setSelectedEditionId(
                  e.target.value ? Number(e.target.value) : null,
                )
              }
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
            >
              <option value="">— No translation —</option>
              {editions.map((edition) => (
                <option key={edition.id} value={edition.id}>
                  {edition.englishName} ({edition.language.toUpperCase()})
                </option>
              ))}
            </select>
          </section>
        )}
      </div>

      {/* Footer note */}
      <div className="px-5 py-3 border-t border-gray-100 shrink-0">
        <p className="text-xs text-gray-400 text-center">
          Settings are saved automatically
        </p>
      </div>
    </aside>
  );
};
