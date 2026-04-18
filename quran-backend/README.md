# Quran Backend

Hono + Bun backend for the Quran API, using SQLite (via Bun's native `bun:sqlite`).

## Requirements

- [Bun](https://bun.sh) v1.0+

## Setup

```bash
# 1. Install dependencies
bun install

# 2. Copy env file and fill in values
cp .env.example .env

# 3. Migrate existing MySQL data to SQLite (one-time)
#    Set DB_HOST / DB_PORT / DB_USERNAME / DB_PASSWORD / DB_DATABASE in .env first
bun run migrate

# 4. Start the server
bun run dev        # hot-reload
bun run start      # production
```

The SQLite database (`quran.db`) is written to the project root by default.  
Override with `DB_PATH=/path/to/your.db` in `.env`.

## API Endpoints

| Method | Path                   | Description                                                |
| ------ | ---------------------- | ---------------------------------------------------------- |
| GET    | `/quran/surahs`        | All surahs (id + name)                                     |
| GET    | `/surah`               | All 114 surahs with full metadata                          |
| GET    | `/surah/:number`       | Single surah by number                                     |
| GET    | `/surah/:number/ayahs` | Paginated ayahs (`?page=&limit=&editionId=`)               |
| GET    | `/editions`            | Text editions/translations (`?type=translation\|tafsir`)   |
| GET    | `/search`              | Search by translation text (`?q=&page=&limit=&editionId=`) |
