import type { Surah, Edition } from "@/types/surah";
import type { Ayah, PaginatedResponse, SearchResult } from "@/types/ayah";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function fetchSurahs(): Promise<Surah[]> {
  const res = await fetch(`${API_BASE}/surah`);
  if (!res.ok) throw new Error("Failed to fetch surahs");
  return res.json();
}

export async function fetchSurah(number: number): Promise<Surah> {
  const res = await fetch(`${API_BASE}/surah/${number}`);
  if (!res.ok) throw new Error(`Failed to fetch surah ${number}`);
  return res.json();
}

export async function fetchAyahs(
  surahNumber: number,
  page = 1,
  limit = 300,
  editionId?: number | null,
): Promise<PaginatedResponse<Ayah>> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (editionId) params.set("editionId", String(editionId));
  const res = await fetch(`${API_BASE}/surah/${surahNumber}/ayahs?${params}`);
  if (!res.ok) throw new Error("Failed to fetch ayahs");
  return res.json();
}

export async function fetchEditions(type?: string): Promise<Edition[]> {
  const url = type
    ? `${API_BASE}/editions?type=${encodeURIComponent(type)}`
    : `${API_BASE}/editions`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch editions");
  return res.json();
}

export async function searchAyahs(
  q: string,
  page = 1,
  limit = 20,
  editionId?: number | null,
): Promise<PaginatedResponse<SearchResult>> {
  const params = new URLSearchParams({
    q,
    page: String(page),
    limit: String(limit),
  });
  if (editionId) params.set("editionId", String(editionId));
  const res = await fetch(`${API_BASE}/search?${params}`);
  if (!res.ok) throw new Error("Search failed");
  return res.json();
}
