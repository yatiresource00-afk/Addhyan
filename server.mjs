import { createServer } from "node:http";
import { parse } from "node:url";
import { readFileSync } from "node:fs";
import next from "next";

try {
  const envFile = readFileSync(new URL("./.env", import.meta.url), "utf8");
  for (const line of envFile.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
} catch {
  // Hosting platforms inject env vars; a local .env is optional.
}

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "file:./data/addhyan.db";
}

const port = Number.parseInt(process.env.PORT ?? "43123", 10);
const hostname = process.env.HOST ?? "0.0.0.0";
const dev = process.env.NODE_ENV === "development";

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

await app.prepare();

const server = createServer((req, res) => {
  const parsedUrl = parse(req.url ?? "/", true);
  handle(req, res, parsedUrl).catch((error) => {
    console.error(error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  });
});

server.listen(port, hostname, () => {
  console.log(
    `Addhyan Academy ready on http://${hostname === "0.0.0.0" ? "127.0.0.1" : hostname}:${port}`
  );
});
