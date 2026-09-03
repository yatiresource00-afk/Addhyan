# Addhyan Academy website

Public marketing site for **Addhyan Academy**, part of Yati Resource Private Limited. Programmes cover job readiness, career growth and practical AI skills.

Includes register / sign in (SQLite on the Node server). Enrolment, payments and the lesson player are still **coming soon**.

**Browse codebase:** [cursor.com/codebase/yati-resource-accounts/addhyan-blueprint](https://cursor.com/codebase/yati-resource-accounts/addhyan-blueprint) (private)

## Run locally

```bash
npm install
cp .env.example .env   # set AUTH_SECRET
npx prisma migrate deploy
npm run dev
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Deploy on Railway

Full steps: **[docs/RAILWAY.md](docs/RAILWAY.md)**

Summary:

1. Connect GitHub repo `yati-resource-accounts/addhyan-blueprint` on [Railway](https://railway.app).
2. Add a **volume** mounted at `/data`.
3. Set variables: `AUTH_SECRET`, `DATABASE_URL=file:/data/addhyan.db`.
4. Generate a public domain in Railway networking.

Build: `npm run build` · Start: `npm start` (migrations + `server.mjs`).

## Host with Node.js (any VPS)

```bash
npm install
npx prisma migrate deploy
npm run build
npm start
```

| Variable | Local | Railway |
|---|---|---|
| `DATABASE_URL` | `file:../data/addhyan.db` | `file:/data/addhyan.db` |
| `AUTH_SECRET` | required in production | required |
| `PORT` | `43123` | set by Railway |
| `HOST` | `0.0.0.0` | `0.0.0.0` |

## What is in this release

- Home, courses catalogue, reusable course pages from `src/data/offerings.ts`
- Register, sign in, account page (SQLite)
- About, FAQ, Contact, Terms, Privacy
- Career Counselling, Corporate Training, Franchise, Find My Course, CSR
- **Coming soon:** enrolment/payment, counselling booking, corporate/franchise/contact forms, CSR applications
- **Live in browser:** Find My Course rule matcher

## Clone (Windows → WSL)

```bash
curl -fsSL https://downloads.cursor.com/origin/install.sh | sh
origin auth login
origin repo clone yati-resource-accounts/addhyan-blueprint
```

Origin CLI docs: [cursor.com/docs/origin/cli](https://cursor.com/docs/origin/cli)

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Prisma + SQLite, Node `server.mjs`.
