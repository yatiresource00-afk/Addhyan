import { mkdirSync } from "node:fs";
import path from "node:path";

/** Prisma schema requires DATABASE_URL even for `prisma generate`. */
export function ensureDatabaseUrl() {
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = "file:./data/addhyan.db";
  }
  if (process.env.DATABASE_URL.startsWith("file:")) {
    const filePath = process.env.DATABASE_URL.replace(/^file:/, "");
    const dir = path.isAbsolute(filePath)
      ? path.dirname(filePath)
      : path.dirname(path.join(process.cwd(), filePath));
    mkdirSync(dir, { recursive: true });
  }
}
