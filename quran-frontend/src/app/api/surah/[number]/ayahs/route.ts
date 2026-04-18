import { NextRequest, NextResponse } from "next/server";
import {
  surahs,
  ayahs,
  ayahEditions,
  paginate,
  getPagination,
} from "../../../_data/loader";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ number: string }> },
) {
  const { number } = await params;
  const num = parseInt(number);
  if (isNaN(num)) {
    return NextResponse.json(
      { message: "Invalid surah number" },
      { status: 400 },
    );
  }
  const surah = surahs.find((s) => s.number === num);
  if (!surah) {
    return NextResponse.json(
      { message: `Surah ${num} not found` },
      { status: 404 },
    );
  }

  const { searchParams } = new URL(req.url);
  const { page, limit } = getPagination(
    searchParams.get("page"),
    searchParams.get("limit"),
  );
  const editionIdStr = searchParams.get("editionId");
  const editionId = editionIdStr ? parseInt(editionIdStr) : undefined;
  const skip = (page - 1) * limit;

  const surahAyahs = ayahs
    .filter((a) => a.surahId === num)
    .sort((a, b) => a.numberInSurah - b.numberInSurah);

  const total = surahAyahs.length;
  const pageAyahs = surahAyahs.slice(skip, skip + limit);

  if (!editionId) {
    return NextResponse.json(paginate(pageAyahs, total, page, limit));
  }

  const ayahIdSet = new Set(pageAyahs.map((a) => a.id));
  const translationMap = new Map<number, string>();
  for (const ae of ayahEditions) {
    if (ayahIdSet.has(ae.ayahId) && ae.editionId === editionId && !ae.isAudio) {
      translationMap.set(ae.ayahId, ae.data);
    }
  }

  const data = pageAyahs.map((ayah) => ({
    ...ayah,
    translation: translationMap.get(ayah.id) ?? null,
  }));

  return NextResponse.json(paginate(data, total, page, limit));
}
