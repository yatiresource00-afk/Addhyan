import { spawnSync } from "node:child_process";
import path from "node:path";

process.env.DATABASE_URL ||= "file:./data/addhyan.db";

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("Usage: node scripts/with-database-url.mjs <prisma-args|seed>");
  process.exit(1);
}

if (args[0] === "seed") {
  const result = spawnSync(process.execPath, [path.join(process.cwd(), "prisma", "seed.mjs")], {
    stdio: "inherit",
    env: process.env,
  });
  process.exit(result.status ?? 1);
}

const prismaBin = path.join(
  process.cwd(),
  "node_modules",
  ".bin",
  process.platform === "win32" ? "prisma.cmd" : "prisma"
);

const result = spawnSync(prismaBin, args, {
  stdio: "inherit",
  env: process.env,
});
process.exit(result.status ?? 1);
