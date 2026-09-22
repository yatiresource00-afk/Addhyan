# Addhyan Academy website

Public site + learning portal for **Addhyan Academy**, part of Yati Resource Private Limited.

**GitHub:** [https://github.com/yatiresource00-afk/Addhyan](https://github.com/yatiresource00-afk/Addhyan)

## Run locally

```bash
npm install
cp .env.example .env   # set AUTH_SECRET
npm run db:setup       # migrate + seed demo users/lessons
npm run dev
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

### Demo accounts (after seed)

| Role | Email | Password |
|---|---|---|
| Director | `director@addhyan.academy` | `Director@Addhyan1` |
| Moderator | `moderator@addhyan.academy` | `Moderator@Addhyan1` |
| Student | `student@addhyan.academy` | `Student@Addhyan1` |

Student WhatsApp demo number: `+919900000003` · Director: `+919900000001`

## Sign-in options

- **Students:** `/login` — password, email OTP, or WhatsApp OTP → `/learn`
- **Moderators / Directors:** `/admin/login` — same methods → `/admin`
- Without `RESEND_API_KEY` / Twilio keys, OTP is logged and shown in the UI (dev mode)

## Environment

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | SQLite path |
| `AUTH_SECRET` | JWT session secret |
| `RESEND_API_KEY` / `EMAIL_FROM` | Live email OTP |
| `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_WHATSAPP_FROM` | Live WhatsApp OTP |

## Deploy on Railway

See **[docs/RAILWAY.md](docs/RAILWAY.md)**. After deploy, run seed once (or set a one-off start command) so admin/student demos and lessons exist:

```bash
npm run db:seed
```

## What is included

- Marketing pages (home, courses, about, FAQ, contact, …)
- Student portal: enrolled courses, video modules, progress
- Administration: users, roles, enrolments, lessons, site settings
- OTP login (email + WhatsApp) with provider hooks
- **Coming soon:** paid checkout, public enquiry forms that need an inbox

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Prisma + SQLite, Node `server.mjs`.
