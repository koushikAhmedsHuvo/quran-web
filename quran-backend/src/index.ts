import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { swaggerUI } from "@hono/swagger-ui";
import quranRoutes from "./routes/quran";
import surahRoutes from "./routes/surah";
import editionsRoutes from "./routes/editions";
import searchRoutes from "./routes/search";
import { openApiSpec } from "./openapi";

const app = new Hono();

// CORS
const corsOrigin = process.env.CORS_ORIGIN || "*";
app.use(
  "*",
  cors({
    origin: corsOrigin === "*" ? "*" : corsOrigin.split(","),
  }),
);

app.use("*", logger());

// OpenAPI JSON spec
app.get("/doc", (c) => c.json(openApiSpec));

// Swagger UI — visit http://localhost:3000/api
app.get("/api", swaggerUI({ url: "/doc" }));

// Routes
app.route("/quran", quranRoutes);
app.route("/surah", surahRoutes);
app.route("/editions", editionsRoutes);
app.route("/search", searchRoutes);

const port = Number(process.env.PORT) || 3000;

console.log(`\n🚀 Server running:  http://localhost:${port}`);
console.log(`📚 Swagger UI:      http://localhost:${port}/api`);
console.log(`📄 OpenAPI JSON:    http://localhost:${port}/doc\n`);

export default {
  port,
  fetch: app.fetch,
};
