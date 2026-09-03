# Addhyan Academy website

Public marketing site for **Addhyan Academy**, part of Yati Resource Private Limited. Programmes cover job readiness, career growth and practical AI skills.

This first release is the public catalogue and enquiry flows (planning phases 1–7). Login, payments, the student dashboard and the lesson player are **not** implemented yet.

## Run locally

```bash
npm install
npm run dev
```

The app listens on [http://127.0.0.1:43123](http://127.0.0.1:43123).

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## What is in this release

- Home, courses catalogue, reusable course pages from `src/data/offerings.ts`
- About, FAQ, Contact, Terms, Privacy
- Career Counselling, Corporate Training, Franchise, Find My Course, CSR
- Enquiry API at `POST /api/enquiries` (validated, rate-limited, honeypot)
- Rule-based course matching in `src/data/recommendation-rules.ts`

Enquiries are written to `data/enquiries.json` on the server filesystem (gitignored). Replace `src/lib/enquiries/store.ts` with a database adapter later.

## Brand

The official logo lives at `public/brand/addhyan-academy-logo.png`. Do not redraw or replace it.

## Contact placeholders

Phone, email and postal address in `src/data/site.ts` are placeholders until official details are provided.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.
