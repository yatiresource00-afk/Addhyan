import { readFile } from "node:fs/promises";
import path from "node:path";
import { safeUploadName, uploadsDirectory } from "@/lib/uploads";

const types: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ filename: string }> }
) {
  const { filename } = await context.params;
  const safe = safeUploadName(filename);
  if (!safe) return new Response("Not found", { status: 404 });

  const filePath = path.join(uploadsDirectory(), safe);
  try {
    const bytes = await readFile(filePath);
    const type = types[path.extname(safe).toLowerCase()] || "application/octet-stream";
    return new Response(bytes, {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
