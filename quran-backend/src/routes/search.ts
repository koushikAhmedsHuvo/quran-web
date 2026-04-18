import { Hono } from "hono";
import { ayahs, ayahEditions } from "../data/loader";
import { paginate, getPagination } from "../utils/pagination";

const app = new Hono();

// GET /search?q=&page=&limit=&editionId=
app.get("/", (c) => {
  const q = c.req.query("q");
  if (!q || q.trim().length === 0) {
    return c.json({ message: 'Search query "q" is required' }, 400);
  }

  const { page, limit } = getPagination(
    c.req.query("page"),
    c.req.query("limit"),
  );
  const editionIdStr = c.req.query("editionId");
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
      (ayahMap.get(a.ayahId)?.number ?? 0) -
      (ayahMap.get(b.ayahId)?.number ?? 0),
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

  return c.json(paginate(data, total, page, limit));
});

export default app;
