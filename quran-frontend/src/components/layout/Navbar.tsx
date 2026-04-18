"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSettingsContext } from "@/context/SettingsContext";

export const Navbar: React.FC = () => {
  const { toggleSidebar } = useSettingsContext();
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-30 bg-emerald-800 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span
            className="text-2xl leading-none text-white"
            style={{ fontFamily: "Amiri, serif" }}
          >
            القرآن
          </span>
          <span className="text-sm font-semibold text-emerald-100 hidden sm:inline group-hover:text-white transition-colors">
            Al-Quran
          </span>
        </Link>

        {/* Nav links + settings */}
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === "/"
                ? "bg-emerald-700 text-white"
                : "text-emerald-100 hover:bg-emerald-700 hover:text-white"
            }`}
          >
            Surahs
          </Link>
          <Link
            href="/search"
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === "/search"
                ? "bg-emerald-700 text-white"
                : "text-emerald-100 hover:bg-emerald-700 hover:text-white"
            }`}
          >
            Search
          </Link>

          {/* Search icon — mobile only */}
          <Link
            href="/search"
            className="sm:hidden p-2 rounded-lg hover:bg-emerald-700 transition-colors"
            aria-label="Search"
          >
            <svg
              className="w-5 h-5"
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
          </Link>

          {/* Settings button */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-emerald-700 transition-colors ml-1"
            aria-label="Open settings"
          >
            <svg
              className="w-5 h-5"
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
          </button>
        </div>
      </div>
    </nav>
  );
};
