import { Hono } from "hono";
import { surahs, ayahs, ayahEditions } from "../data/loader";
import { paginate, getPagination } from "../utils/pagination";

const app = new Hono();

// GET /surah — all 114 surahs
app.get("/", (c) => {
  return c.json(surahs);
});

// GET /surah/:number — single surah
app.get("/:number", (c) => {
  const number = parseInt(c.req.param("number"));
  if (isNaN(number)) {
    return c.json({ message: "Invalid surah number" }, 400);
  }
  const surah = surahs.find((s) => s.number === number);
  if (!surah) {
    return c.json({ message: `Surah ${number} not found` }, 404);
  }
  return c.json(surah);
});

// GET /surah/:number/ayahs?page=&limit=&editionId=
app.get("/:number/ayahs", (c) => {
  const number = parseInt(c.req.param("number"));
  if (isNaN(number)) {
    return c.json({ message: "Invalid surah number" }, 400);
  }

  const surah = surahs.find((s) => s.number === number);
  if (!surah) {
    return c.json({ message: `Surah ${number} not found` }, 404);
  }

  const { page, limit } = getPagination(
    c.req.query("page"),
    c.req.query("limit"),
  );
  const editionIdStr = c.req.query("editionId");
  const editionId = editionIdStr ? parseInt(editionIdStr) : undefined;
  const skip = (page - 1) * limit;

  const surahAyahs = ayahs
    .filter((a) => a.surahId === number)
    .sort((a, b) => a.numberInSurah - b.numberInSurah);

  const total = surahAyahs.length;
  const pageAyahs = surahAyahs.slice(skip, skip + limit);

  if (!editionId) {
    return c.json(paginate(pageAyahs, total, page, limit));
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

  return c.json(paginate(data, total, page, limit));
});

export default app;
