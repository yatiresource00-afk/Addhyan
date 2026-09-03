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

## Host with Node.js

This site is a Next.js app served by a Node.js HTTP server (`server.mjs`). You need **Node.js 20+**.

```bash
npm install
npm run build
npm start
```

`npm start` runs `NODE_ENV=production node server.mjs`.

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `43123` | Listen port |
| `HOST` | `0.0.0.0` | Bind address (`0.0.0.0` is required behind most hosts/proxies) |
| `NODE_ENV` | `production` when using `npm start` | Production mode |

Example:

```bash
PORT=8080 HOST=0.0.0.0 npm start
```

Put a reverse proxy (Nginx, Caddy, or your host’s load balancer) in front if you want HTTPS. Do not commit secrets; this public site does not require API keys to run.

## What is in this release

- Home, courses catalogue, reusable course pages from `src/data/offerings.ts`
- About, FAQ, Contact, Terms, Privacy
- Career Counselling, Corporate Training, Franchise, Find My Course, CSR
- **Coming soon (not fake-working):** enrolment/payment, counselling booking, corporate requests, franchise enquiries, contact message form, CSR applications
- **Live in the browser:** Find My Course rule matcher (does not email Addhyan)

Enquiry API code remains for a later phase. Do not treat local JSON storage as a live inbox.

## Brand

The official logo lives at `public/brand/addhyan-academy-logo.png`. Do not redraw or replace it.

## Contact placeholders

Phone, email and postal address in `src/data/site.ts` are placeholders until official details are provided.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.
