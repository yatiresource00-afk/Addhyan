"use server";

import { randomBytes } from "node:crypto";
import { unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireStaff } from "@/lib/auth/session";
import { uploadsDirectory } from "@/lib/uploads";

export type ImageState = { error?: string; ok?: string };

const allowed = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
]);

export async function uploadSiteImageAction(
  _prev: ImageState,
  formData: FormData
): Promise<ImageState> {
  const staff = await requireStaff();
  if (!staff) return { error: "Administration access required." };

  const file = formData.get("image");
  const alt = String(formData.get("alt") || "").trim();
  const placement = String(formData.get("placement") || "gallery");
  if (!(file instanceof File) || file.size === 0) return { error: "Choose an image file." };
  if (file.size > 5 * 1024 * 1024) return { error: "Use an image smaller than 5 MB." };
  const extension = allowed.get(file.type);
  if (!extension) return { error: "Use a JPG, PNG, or WebP image." };
  if (alt.length < 2) return { error: "Add a short description of the image." };
  if (placement !== "hero" && placement !== "gallery") return { error: "Choose where to show the image." };

  const filename = `${Date.now()}-${randomBytes(6).toString("hex")}${extension}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadsDirectory(), filename), bytes);

  if (placement === "hero") {
    await prisma.siteImage.updateMany({
      where: { placement: "hero" },
      data: { placement: "gallery" },
    });
  }

  await prisma.siteImage.create({
    data: { filename, alt, placement },
  });

  revalidatePath("/");
  revalidatePath("/admin/images");
  return { ok: placement === "hero" ? "Homepage image updated." : "Image added to the gallery." };
}

export async function deleteSiteImageAction(
  _prev: ImageState,
  formData: FormData
): Promise<ImageState> {
  const staff = await requireStaff();
  if (!staff) return { error: "Administration access required." };
  const id = String(formData.get("id") || "");
  const image = await prisma.siteImage.findUnique({ where: { id } });
  if (!image) return { error: "Image not found." };

  await prisma.siteImage.delete({ where: { id } });
  await unlink(path.join(uploadsDirectory(), image.filename)).catch(() => undefined);
  revalidatePath("/");
  revalidatePath("/admin/images");
  return { ok: "Image removed." };
}
