# Deploy Addhyan Academy on Railway

This app runs as a **Node.js** service (`server.mjs`) with **SQLite** (accounts). Railway provides the public URL and can attach a **volume** so the database survives redeploys.

## 1. Create a Railway project

1. Open [https://railway.app](https://railway.app) and sign in.
2. **New Project** → **Deploy from GitHub repo** (or **Empty Project** and connect later).
3. Select the GitHub repository: `yatiresource00-afk/Addhyan`.

Railway project: [https://railway.com/project/da6761a8-5482-4e5a-931b-3d38f8125378](https://railway.com/project/da6761a8-5482-4e5a-931b-3d38f8125378)

GitHub source: [https://github.com/yatiresource00-afk/Addhyan](https://github.com/yatiresource00-afk/Addhyan)

## If GitHub or Railway build fails

1. **GitHub must contain the full Next.js app** (`package.json`, `src/`, `prisma/`). An empty repo will fail both GitHub Actions and Railway.
2. Push `main` from your machine (this cloud environment cannot log in to GitHub):

```bash
cd addhyan-blueprint
git remote add github https://github.com/yatiresource00-afk/Addhyan.git
git push -u github main
```

3. On Railway, set `AUTH_SECRET` and attach a volume at `/data` with `DATABASE_URL=file:/data/addhyan.db`.
4. Redeploy after the GitHub push.

Build no longer requires `DATABASE_URL` at compile time (`prisma generate` uses a fallback file URL). Prisma CLI is a production dependency so Nixpacks `npm ci` can generate the client.

## 2. Add a persistent volume (required for accounts)

SQLite must live on disk that persists across deploys.

1. In your Railway service, open **Volumes**.
2. **Add Volume** → mount path: `/data`
3. Set this variable on the service:

```env
DATABASE_URL=file:/data/addhyan.db
```

Without a volume, account data is lost on every redeploy.

## 3. Required environment variables

In the service **Variables** tab:

| Variable | Value | Notes |
|---|---|---|
| `AUTH_SECRET` | Long random string (32+ characters) | Signs login cookies — **required** |
| `DATABASE_URL` | `file:/data/addhyan.db` | Use after volume is mounted at `/data` |
| `NODE_ENV` | `production` | Set automatically on deploy |
| `HOST` | `0.0.0.0` | Optional; default in `server.mjs` |

Railway sets `PORT` automatically — do not override it.

Generate a secret (WSL / macOS / Linux):

```bash
openssl rand -base64 32
```

## 4. Build and start (automatic)

- **Build:** `npm run build` (`postinstall` runs `prisma generate`)
- **Start:** `npm start` → `prisma migrate deploy` then `node server.mjs`

## 5. Public URL

1. Open the service **Settings** → **Networking** → **Generate Domain**.
2. You get a URL like `https://addhyan-blueprint-production.up.railway.app`.
3. Optional: add a custom domain (e.g. `addhyan.academy`) under **Custom Domain**.

Update `site.url` in [`src/data/site.ts`](src/data/site.ts) when the production domain is final (for sitemap/metadata).

## 6. Local parity

```bash
cp .env.example .env
# Edit AUTH_SECRET and DATABASE_URL=file:../data/addhyan.db
npm install
npx prisma migrate deploy
npm run dev
```

Local URL: [http://127.0.0.1:43123](http://127.0.0.1:43123)

## Troubleshooting

| Issue | Fix |
|---|---|
| App crashes on start | Set `AUTH_SECRET` (min 16 chars) |
| Accounts disappear after deploy | Add volume at `/data` and `DATABASE_URL=file:/data/addhyan.db` |
| Build fails on Prisma | Ensure `postinstall` runs (`prisma generate`); check build logs |
| Health check fails | Service must respond on `PORT`; health check path is `/` |

## Browse codebase online

- [https://cursor.com/codebase/yati-resource-accounts/addhyan-blueprint](https://cursor.com/codebase/yati-resource-accounts/addhyan-blueprint) (private; change visibility in settings on that page)

## Clone locally (Windows → use WSL)

```bash
# Run in WSL (Origin CLI is not available in PowerShell)
curl -fsSL https://downloads.cursor.com/origin/install.sh | sh
origin auth login
origin repo clone yati-resource-accounts/addhyan-blueprint
```

If `origin` is not found:

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

Origin CLI docs: [https://cursor.com/docs/origin/cli](https://cursor.com/docs/origin/cli)
