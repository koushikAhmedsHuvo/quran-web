import { Hono } from "hono";
import { editions } from "../data/loader";

const app = new Hono();

// GET /editions?type=translation|tafsir
app.get("/", (c) => {
  const type = c.req.query("type");

  let result = editions.filter((e) => e.format === "text");
  if (type) result = result.filter((e) => e.type === type);
  result = result.slice().sort((a, b) => a.language.localeCompare(b.language));

  return c.json(result);
});

export default app;
