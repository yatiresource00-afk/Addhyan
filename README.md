<<<<<<< HEAD
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

## Deploy on Railway (GitHub → live site)

**Full step-by-step:** **[docs/RAILWAY.md](docs/RAILWAY.md)**

- GitHub: https://github.com/yatiresource00-afk/Addhyan
- Railway: https://railway.com/project/da6761a8-5482-4e5a-931b-3d38f8125378

You must push this project to GitHub `main` from WSL first. Railway cannot build an empty GitHub repo.

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
=======
# Addhyan
>>>>>>> 3f48ab6e57d469eda823473707dc2d2f2a11abf0
