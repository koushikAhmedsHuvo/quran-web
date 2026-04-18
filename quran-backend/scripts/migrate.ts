/**
 * Download Quran data from api.alquran.cloud and save as JSON files.
 *
 * Usage:
 *   bun run download
 *
 * By default downloads Arabic text + Saheeh International (en.sahih).
 * Pass edition identifiers as arguments to download more:
 *   bun run download en.sahih ur.ahmed fr.hamidullah
 *
 * After running, start the server: bun run dev
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve } from "path";

const DATA_DIR = resolve(import.meta.dir, "../src/data");
const BASE_URL = "https://api.alquran.cloud/v1";
const DEFAULT_EDITIONS = ["en.sahih"];

type AlquranEdition = {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
};

type AlquranAyah = {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  page: number;
  sajda: boolean | { id: string; recommended: boolean; obligatory: boolean };
};

type AlquranSurah = {
  number: number;
  ayahs: AlquranAyah[];
};

async function fetchJson<T>(url: string): Promise<T> {
  console.log(`  → GET ${url}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  const json = (await res.json()) as { code: number; data: T };
  if (json.code !== 200) throw new Error(`API error: ${JSON.stringify(json)}`);
  return json.data;
}

function save(filename: string, data: unknown) {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(
    resolve(DATA_DIR, filename),
    JSON.stringify(data, null, 2),
    "utf-8",
  );
  const count = Array.isArray(data) ? ` (${data.length} records)` : "";
  console.log(`  ✓ Saved ${filename}${count}`);
}

async function run() {
  const requestedEditions =
    process.argv.slice(2).length > 0 ? process.argv.slice(2) : DEFAULT_EDITIONS;

  console.log("\n📥 Downloading Quran data from api.alquran.cloud …\n");

  // 1. All text editions
  console.log("Fetching editions list …");
  const rawEditions = await fetchJson<AlquranEdition[]>(
    `${BASE_URL}/edition?format=text`,
  );
  const editions = rawEditions.map((e, i) => ({
    id: i + 1,
    identifier: e.identifier,
    language: e.language,
    name: e.name,
    englishName: e.englishName,
    format: e.format,
    type: e.type,
  }));
  save("editions.json", editions);

  const editionIdMap = new Map(editions.map((e) => [e.identifier, e.id]));

  // 2. Arabic Quran text
  console.log("\nFetching Arabic Quran (quran-uthmani) …");
  const arabicData = await fetchJson<{ surahs: AlquranSurah[] }>(
    `${BASE_URL}/quran/quran-uthmani`,
  );

  const ayahs: object[] = [];
  let ayahId = 1;
  for (const surah of arabicData.surahs) {
    for (const ayah of surah.ayahs) {
      ayahs.push({
        id: ayahId++,
        number: ayah.number,
        numberInSurah: ayah.numberInSurah,
        surahId: surah.number,
        text: ayah.text,
        juzId: ayah.juz,
        page: ayah.page,
        sajda: typeof ayah.sajda === "object" ? true : (ayah.sajda as boolean),
      });
    }
  }
  save("ayahs.json", ayahs);

  // Build global ayah number → id map
  const ayahNumberToId = new Map(
    (ayahs as { number: number; id: number }[]).map((a) => [a.number, a.id]),
  );

  // 3. Requested translations
  const ayahEditions: object[] = [];
  let aeId = 1;

  for (const identifier of requestedEditions) {
    const editionId = editionIdMap.get(identifier);
    if (!editionId) {
      console.warn(`\n  ⚠️  Edition "${identifier}" not found – skipping`);
      continue;
    }
    console.log(`\nFetching edition: ${identifier} …`);
    try {
      const data = await fetchJson<{ surahs: AlquranSurah[] }>(
        `${BASE_URL}/quran/${identifier}`,
      );
      for (const surah of data.surahs) {
        for (const ayah of surah.ayahs) {
          const mappedId = ayahNumberToId.get(ayah.number);
          if (!mappedId) continue;
          ayahEditions.push({
            id: aeId++,
            ayahId: mappedId,
            editionId,
            data: ayah.text,
            isAudio: false,
          });
        }
      }
    } catch (err) {
      console.error(`  ✗ Failed to fetch ${identifier}:`, err);
    }
  }

  save("ayah_editions.json", ayahEditions);

  console.log(
    `\n✅ Done! ${ayahs.length} ayahs · ${editions.length} editions · ${ayahEditions.length} translation entries\n`,
  );
  console.log("Start the server:  bun run dev\n");
}

run().catch((err) => {
  console.error("\nDownload failed:", err);
  process.exit(1);
});
