import { Hono } from "hono";
import { surahs } from "../data/loader";

const app = new Hono();

// GET /quran/surahs — list all surahs (id + English name)
app.get("/surahs", (c) => {
  return c.json(surahs.map((s) => ({ id: s.id, name: s.nameEn })));
});

export default app;
