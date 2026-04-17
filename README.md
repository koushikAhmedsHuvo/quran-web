# Quran App

A full-stack Quran application built with **NestJS** (backend) and **Next.js** (frontend). It serves Quran surahs, ayahs, and search functionality via a REST API backed by a MySQL database.

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- [MySQL](https://www.mysql.com/) 8.0 or higher

---

## Project Structure

```
quran/
├── quran-backend/    # NestJS REST API
├── quran-frontend/   # Next.js web app
└── quran-backend/quran.sql/  # MySQL database dump
```

---

## 1. Database Setup

1. Create a MySQL database:

   ```sql
   CREATE DATABASE quran;
   ```

2. Import the SQL dump:

   ```bash
   mysql -u <your_user> -p quran < quran-backend/quran.sql/quran.sql
   ```

---

## 2. Backend Setup (NestJS)

### Install dependencies

```bash
cd quran-backend
npm install
```

### Configure environment

Copy the example env file and fill in your database credentials:

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_DATABASE=quran
```

### Run the backend

**Development (watch mode):**

```bash
npm run start:dev
```

**Production:**

```bash
npm run build
npm run start
```

The API will be available at: `http://localhost:3000`  
Swagger API docs: `http://localhost:3000/api`

---

## 3. Frontend Setup (Next.js)

### Install dependencies

```bash
cd quran-frontend
npm install
```

### Configure environment

Create a `.env.local` file in the `quran-frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Run the frontend

**Development:**

```bash
npm run dev
```

**Production:**

```bash
npm run build
npm run start
```

The app will be available at: `http://localhost:3001`

> **Note:** If port 3000 is already taken by the backend, Next.js will automatically use the next available port (e.g., 3001).

---

## 4. Running Both Together

Open two terminals and run each service simultaneously:

**Terminal 1 — Backend:**

```bash
cd quran-backend
npm run start:dev
```

**Terminal 2 — Frontend:**

```bash
cd quran-frontend
npm run dev
```

---

## API Endpoints

| Method | Endpoint           | Description            |
| ------ | ------------------ | ---------------------- |
| GET    | `/surah`           | List all surahs        |
| GET    | `/surah/:id`       | Get a specific surah   |
| GET    | `/surah/:id/ayahs` | Get ayahs for a surah  |
| GET    | `/ayah`            | List ayahs (paginated) |
| GET    | `/search?q=...`    | Search ayahs           |

Full interactive documentation is available at `http://localhost:3000/api` (Swagger UI).

---

## Tech Stack

| Layer    | Technology                         |
| -------- | ---------------------------------- |
| Backend  | NestJS, TypeORM, MySQL, Swagger    |
| Frontend | Next.js 16, React 19, Tailwind CSS |
| Database | MySQL 8                            |
