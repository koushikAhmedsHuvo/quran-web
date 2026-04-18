import surahsRaw from "@/data/surahs.json";
import ayahsRaw from "@/data/ayahs.json";
import editionsRaw from "@/data/editions.json";
import ayahEditionsRaw from "@/data/ayah_editions.json";

export type Surah = {
  id: number;
  number: number;
  nameAr: string;
  nameEn: string;
  nameEnTranslation: string;
  type: string;
  totalAyahs: number;
};

export type Ayah = {
  id: number;
  number: number;
  numberInSurah: number;
  surahId: number;
  text: string;
  juzId: number;
  page: number;
  sajda: boolean;
};

export type Edition = {
  id: number;
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
};

export type AyahEdition = {
  id: number;
  ayahId: number;
  editionId: number;
  data: string;
  isAudio: boolean;
};

export const surahs = surahsRaw as Surah[];
export const ayahs = ayahsRaw as Ayah[];
export const editions = editionsRaw as Edition[];
export const ayahEditions = ayahEditionsRaw as AyahEdition[];

export function paginate<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
) {
  return {
    data,
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
  };
}

export function getPagination(pageStr: string | null, limitStr: string | null) {
  const page = Math.max(1, parseInt(pageStr || "1") || 1);
  const limit = Math.max(1, Math.min(300, parseInt(limitStr || "10") || 10));
  return { page, limit };
}
