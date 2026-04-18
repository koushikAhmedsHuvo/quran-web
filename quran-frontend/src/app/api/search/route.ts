import { NextRequest, NextResponse } from "next/server";
import { ayahs, ayahEditions, paginate, getPagination } from "../_data/loader";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  if (!q || q.trim().length === 0) {
    return NextResponse.json({ message: 'Search query "q" is required' }, { status: 400 });
  }

  const { page, limit } = getPagination(searchParams.get("page"), searchParams.get("limit"));
  const editionIdStr = searchParams.get("editionId");
  const editionId = editionIdStr ? parseInt(editionIdStr) : undefined;
  const skip = (page - 1) * limit;
  const term = q.trim().toLowerCase();

  let filtered = ayahEditions.filter(
    (ae) => !ae.isAudio && ae.data.toLowerCase().includes(term),
  );
  if (editionId) {
    filtered = filtered.filter((ae) => ae.editionId === editionId);
  }

  const ayahMap = new Map(ayahs.map((a) => [a.id, a]));

  filtered.sort(
    (a, b) =>
      (ayahMap.get(a.ayahId)?.number ?? 0) - (ayahMap.get(b.ayahId)?.number ?? 0),
  );

  const total = filtered.length;
  const pageData = filtered.slice(skip, skip + limit);

  const data = pageData.map((ae) => {
    const ayah = ayahMap.get(ae.ayahId);
    return {
      id: ae.id,
      ayahId: ae.ayahId,
      editionId: ae.editionId,
      translation: ae.data,
      ayah: ayah
        ? {
            id: ayah.id,
            number: ayah.number,
            text: ayah.text,
            numberInSurah: ayah.numberInSurah,
            surahId: ayah.surahId,
            juzId: ayah.juzId,
            page: ayah.page,
            sajda: ayah.sajda,
          }
        : null,
    };
  });

  return NextResponse.json(paginate(data, total, page, limit));
}
