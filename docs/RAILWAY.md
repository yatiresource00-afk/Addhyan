# Addhyan Academy — GitHub to Railway (full setup)

This is the complete path: get the code → GitHub → Railway → live website.

**GitHub repo:** https://github.com/yatiresource00-afk/Addhyan  
**Railway project:** https://railway.com/project/da6761a8-5482-4e5a-931b-3d38f8125378  
**Origin codebase (private):** https://cursor.com/codebase/yati-resource-accounts/addhyan-blueprint  

You need:

- A Windows PC with **WSL** (Ubuntu) — Origin CLI does not run in PowerShell
- A GitHub account that can push to `yatiresource00-afk/Addhyan`
- A Railway account that can open the project above

---

## Part A — Put the code on GitHub

Railway builds **whatever is on GitHub `main`**. If GitHub is empty, the Railway build fails.

### A1. Open WSL (not PowerShell)

Start **Ubuntu** from the Start menu, or in Windows Terminal choose **Ubuntu**.

### A2. Install Origin CLI (first time only)

```bash
curl -fsSL https://downloads.cursor.com/origin/install.sh | sh
```

If the command `origin` is not found:

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

Origin CLI docs: https://cursor.com/docs/origin/cli

### A3. Sign in and clone

```bash
origin auth login
origin repo clone yati-resource-accounts/addhyan-blueprint
cd addhyan-blueprint
```

### A4. Connect GitHub and push `main`

```bash
git remote add github https://github.com/yatiresource00-afk/Addhyan.git
git push -u github main
```

GitHub will ask you to log in (browser or a **Personal Access Token** with `repo` scope).

If GitHub already has a README-only commit and the push is rejected:

```bash
git push -u github main --force
```

Only do `--force` if you are sure the GitHub repo should match this project.

### A5. Confirm GitHub is not empty

Open https://github.com/yatiresource00-afk/Addhyan

You must see at least:

- `package.json`
- `src/`
- `prisma/`
- `server.mjs`
- `railway.toml`

### A6. Confirm GitHub Actions (optional)

GitHub → **Actions** → workflow **Build**.

- Green = the same `npm run build` Railway will run succeeded
- Red = open the failed job and fix before Railway can succeed

---

## Part B — Connect Railway to GitHub

### B1. Open the Railway project

https://railway.com/project/da6761a8-5482-4e5a-931b-3d38f8125378

### B2. Add or select the service

If there is no service yet:

1. **New** → **GitHub Repo**
2. Authorize Railway to read GitHub if asked
3. Choose **`yatiresource00-afk/Addhyan`**
4. Branch: **`main`**

If a service already exists:

1. Open the service
2. **Settings** → **Source**
3. Repo: `yatiresource00-afk/Addhyan`
4. Branch: `main`

### B3. Wait for the first deploy (it may fail until variables exist)

That is normal. Continue Part C, then **Redeploy**.

---

## Part C — Railway variables and disk (required)

### C1. Environment variables

Open the service → **Variables** → add:

| Name | Value |
|---|---|
| `AUTH_SECRET` | A long random string (32+ characters) |
| `DATABASE_URL` | `file:/data/addhyan.db` |
| `HOST` | `0.0.0.0` |

**Do not set `PORT`.** Railway injects it.

Generate `AUTH_SECRET` in WSL:

```bash
openssl rand -base64 32
```

Paste the output as the value. No quotes.

### C2. Persistent volume (accounts)

Without this, every redeploy wipes registered users.

1. Open the service → **Settings** → **Volumes** (or **Storage**)
2. **Add volume**
3. Mount path: **`/data`**
4. Save

`DATABASE_URL` must stay `file:/data/addhyan.db` so SQLite lives on that volume.

### C3. Public URL

1. Service → **Settings** → **Networking**
2. **Generate domain**

You get a URL like:

`https://addhyan-production-xxxx.up.railway.app`

That is the live site.

Optional: **Custom domain** → add `addhyan.academy` (or similar) and set the DNS records Railway shows.

---

## Part D — Deploy and verify

### D1. Redeploy

Service → **Deployments** → **Deploy** / **Redeploy**.

Build should:

1. `npm ci`
2. `prisma generate` (postinstall / build)
3. `next build`

Start should:

1. `prisma migrate deploy`
2. `node server.mjs`

### D2. Check the site

Open the generated Railway domain.

| Check | Expected |
|---|---|
| Home | Addhyan logo, Learn / Grow / Succeed |
| `/courses` | JRP, JRP Advance, Basic AI, Advanced AI |
| `/register` then `/login` | Account page at `/account` |
| Enrol / Book / Contact forms | **Coming soon** (not fake working forms) |

### D3. If it still fails

Open the failed **Deployment** → **View logs**.

| Log message | Fix |
|---|---|
| `Cannot find package.json` / empty clone | Part A: GitHub `main` is empty — push the app |
| `Environment variable not found: DATABASE_URL` | Set `DATABASE_URL=file:/data/addhyan.db` |
| `AUTH_SECRET` / crash on login | Set `AUTH_SECRET` (32+ chars) |
| `prisma: not found` | You are on an old commit — push latest `main` |
| Health check failed | Generate a domain; confirm start command is `npm start` |
| Build OK, site 502 | Volume + `DATABASE_URL` mismatch; check start logs |

---

## Part E — Everyday updates later

After the first successful deploy:

```bash
cd addhyan-blueprint
git add -A
git commit -m "Describe the change"
git push github main
```

Railway rebuilds automatically from GitHub `main`.

Keep Origin in sync if you still use Cursor Origin:

```bash
git push origin main
```

---

## Commands cheat sheet

```bash
# Local preview (WSL)
cp .env.example .env
# set AUTH_SECRET in .env
npm install
npx prisma migrate deploy
npm run dev
# http://127.0.0.1:43123

# Production on Railway
npm start
# uses PORT from Railway, HOST=0.0.0.0, DATABASE_URL=file:/data/addhyan.db
```

Local Node URL: **http://127.0.0.1:43123**
