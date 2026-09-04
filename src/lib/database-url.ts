import { mkdirSync } from "node:fs";
import path from "node:path";

/** Prisma schema requires DATABASE_URL even for `prisma generate`. */
export function ensureDatabaseUrl() {
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = "file:./data/addhyan.db";
  }
  if (process.env.DATABASE_URL.startsWith("file:")) {
    const filePath = process.env.DATABASE_URL.replace(/^file:/, "");
    if (path.isAbsolute(filePath)) {
      mkdirSync(path.dirname(filePath), { recursive: true });
    } else {
      mkdirSync(path.join(process.cwd(), "data"), { recursive: true });
    }
  }
}
