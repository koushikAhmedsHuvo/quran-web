import { existsSync, readFileSync } from "fs";
import { join } from "path";

const DATA_DIR = join(import.meta.dir);

function load<T>(filename: string): T[] {
  const path = join(DATA_DIR, filename);
  if (!existsSync(path)) return [];
  try {
    return JSON.parse(readFileSync(path, "utf-8")) as T[];
  } catch {
    return [];
  }
}

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

export const surahs: Surah[] = load<Surah>("surahs.json");
export const ayahs: Ayah[] = load<Ayah>("ayahs.json");
export const editions: Edition[] = load<Edition>("editions.json");
export const ayahEditions: AyahEdition[] =
  load<AyahEdition>("ayah_editions.json");
