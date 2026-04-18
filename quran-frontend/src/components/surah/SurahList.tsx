import React from "react";
import Link from "next/link";
import { SurahCard } from "./SurahCard";
import type { Surah } from "@/types/surah";

interface SurahListProps {
  surahs: Surah[];
  arabicFont: string;
}

export const SurahList: React.FC<SurahListProps> = ({ surahs, arabicFont }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
    {surahs.map((surah) => (
      <Link key={surah.number} href={`/surah/${surah.number}`}>
        <SurahCard surah={surah} arabicFont={arabicFont} />
      </Link>
    ))}
  </div>
);
