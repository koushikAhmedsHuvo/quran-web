export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Quran API",
    description:
      "REST API for Quran text, surahs, ayahs, editions and search — powered by Hono + Bun.",
    version: "1.0.0",
  },
  servers: [{ url: "http://localhost:3000", description: "Local dev server" }],
  tags: [
    { name: "Quran", description: "General Quran endpoints" },
    { name: "Surah", description: "Surah (chapter) endpoints" },
    { name: "Editions", description: "Text editions & translations" },
    { name: "Search", description: "Full-text search over translations" },
  ],
  paths: {
    "/quran/surahs": {
      get: {
        tags: ["Quran"],
        summary: "Get all surahs (id + name)",
        operationId: "getQuranSurahs",
        responses: {
          "200": {
            description: "Array of surahs",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/SurahSummary" },
                },
              },
            },
          },
        },
      },
    },
    "/surah": {
      get: {
        tags: ["Surah"],
        summary: "Get all 114 surahs with full metadata",
        operationId: "getAllSurahs",
        responses: {
          "200": {
            description: "Array of all surahs",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Surah" },
                },
              },
            },
          },
        },
      },
    },
    "/surah/{number}": {
      get: {
        tags: ["Surah"],
        summary: "Get a surah by its number",
        operationId: "getSurahByNumber",
        parameters: [
          {
            name: "number",
            in: "path",
            required: true,
            schema: { type: "integer", minimum: 1, maximum: 114 },
            description: "Surah number (1–114)",
          },
        ],
        responses: {
          "200": {
            description: "Surah object",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Surah" },
              },
            },
          },
          "404": { description: "Surah not found" },
        },
      },
    },
    "/surah/{number}/ayahs": {
      get: {
        tags: ["Surah"],
        summary: "Get paginated ayahs of a surah",
        operationId: "getAyahsBySurah",
        parameters: [
          {
            name: "number",
            in: "path",
            required: true,
            schema: { type: "integer", minimum: 1, maximum: 114 },
            description: "Surah number (1–114)",
          },
          {
            name: "page",
            in: "query",
            required: false,
            schema: { type: "integer", default: 1, minimum: 1 },
          },
          {
            name: "limit",
            in: "query",
            required: false,
            schema: { type: "integer", default: 10, minimum: 1 },
          },
          {
            name: "editionId",
            in: "query",
            required: false,
            schema: { type: "integer" },
            description:
              "Edition ID to include translation alongside Arabic text",
          },
        ],
        responses: {
          "200": {
            description: "Paginated list of ayahs",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/PaginatedAyahs" },
              },
            },
          },
          "404": { description: "Surah not found" },
        },
      },
    },
    "/editions": {
      get: {
        tags: ["Editions"],
        summary: "Get text editions / translations",
        operationId: "getEditions",
        parameters: [
          {
            name: "type",
            in: "query",
            required: false,
            schema: { type: "string", enum: ["translation", "tafsir"] },
            description: "Filter by edition type",
          },
        ],
        responses: {
          "200": {
            description: "Array of editions",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Edition" },
                },
              },
            },
          },
        },
      },
    },
    "/search": {
      get: {
        tags: ["Search"],
        summary: "Search ayahs by translation text",
        operationId: "searchAyahs",
        parameters: [
          {
            name: "q",
            in: "query",
            required: true,
            schema: { type: "string" },
            description: "Search query",
          },
          {
            name: "page",
            in: "query",
            required: false,
            schema: { type: "integer", default: 1, minimum: 1 },
          },
          {
            name: "limit",
            in: "query",
            required: false,
            schema: { type: "integer", default: 10, minimum: 1 },
          },
          {
            name: "editionId",
            in: "query",
            required: false,
            schema: { type: "integer" },
            description: "Filter results to a specific edition",
          },
        ],
        responses: {
          "200": {
            description: "Paginated search results",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/PaginatedSearchResults" },
              },
            },
          },
          "400": { description: "Missing or empty query parameter q" },
        },
      },
    },
  },
  components: {
    schemas: {
      SurahSummary: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "Al-Fatiha" },
        },
      },
      Surah: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          number: { type: "integer", example: 1 },
          nameAr: { type: "string", example: "الفاتحة" },
          nameEn: { type: "string", example: "Al-Fatiha" },
          nameEnTranslation: { type: "string", example: "The Opening" },
          type: { type: "string", example: "Meccan" },
          totalAyahs: { type: "integer", example: 7 },
        },
      },
      Ayah: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          number: { type: "integer", example: 1 },
          numberInSurah: { type: "integer", example: 1 },
          surahId: { type: "integer", example: 1 },
          text: {
            type: "string",
            example: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
          },
          juzId: { type: "integer", example: 1 },
          page: { type: "integer", example: 1 },
          sajda: { type: "boolean", example: false },
          translation: {
            type: "string",
            nullable: true,
            example:
              "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
          },
        },
      },
      PaginationMeta: {
        type: "object",
        properties: {
          total: { type: "integer", example: 7 },
          page: { type: "integer", example: 1 },
          limit: { type: "integer", example: 10 },
          totalPages: { type: "integer", example: 1 },
        },
      },
      PaginatedAyahs: {
        type: "object",
        properties: {
          data: { type: "array", items: { $ref: "#/components/schemas/Ayah" } },
          meta: { $ref: "#/components/schemas/PaginationMeta" },
        },
      },
      Edition: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          identifier: { type: "string", example: "en.sahih" },
          language: { type: "string", example: "en" },
          name: { type: "string", example: "Saheeh International" },
          englishName: { type: "string", example: "Saheeh International" },
          format: { type: "string", example: "text" },
          type: { type: "string", example: "translation" },
        },
      },
      SearchResult: {
        type: "object",
        properties: {
          id: { type: "integer" },
          ayahId: { type: "integer" },
          editionId: { type: "integer" },
          translation: { type: "string" },
          ayah: { $ref: "#/components/schemas/Ayah" },
        },
      },
      PaginatedSearchResults: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: { $ref: "#/components/schemas/SearchResult" },
          },
          meta: { $ref: "#/components/schemas/PaginationMeta" },
        },
      },
    },
  },
};
