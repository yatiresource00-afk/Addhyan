import { mkdirSync } from "node:fs";
import path from "node:path";

export function uploadsDirectory() {
  const databaseUrl = process.env.DATABASE_URL || "file:./data/addhyan.db";
  if (databaseUrl.startsWith("file:")) {
    const filePath = databaseUrl.replace(/^file:/, "");
    const absolute = path.isAbsolute(filePath)
      ? filePath
      : path.join(process.cwd(), filePath);
    const directory = path.join(path.dirname(absolute), "uploads");
    mkdirSync(directory, { recursive: true });
    return directory;
  }
  const directory = path.join(process.cwd(), "data", "uploads");
  mkdirSync(directory, { recursive: true });
  return directory;
}

export function safeUploadName(filename: string) {
  if (!/^[a-zA-Z0-9._-]+$/.test(filename) || filename.includes("..")) return null;
  return filename;
}
