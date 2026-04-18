import React from "react";
import { AyahItem } from "./AyahItem";
import type { Ayah } from "@/types/ayah";

interface AyahListProps {
  ayahs: Ayah[];
  arabicFont: string;
  arabicFontSize: number;
  translationFontSize: number;
}

export const AyahList: React.FC<AyahListProps> = ({
  ayahs,
  arabicFont,
  arabicFontSize,
  translationFontSize,
}) => (
  <div className="space-y-4">
    {ayahs.map((ayah) => (
      <AyahItem
        key={ayah.id}
        ayah={ayah}
        arabicFont={arabicFont}
        arabicFontSize={arabicFontSize}
        translationFontSize={translationFontSize}
      />
    ))}
  </div>
);
