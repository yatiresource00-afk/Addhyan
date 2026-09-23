import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { DeleteImageButton, UploadImageForm } from "@/components/admin/ImageForms";

export const metadata: Metadata = {
  title: "Images · Administration",
  robots: { index: false, follow: false },
};

export default async function AdminImagesPage() {
  const images = await prisma.siteImage.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Website images</h1>
        <p className="text-muted-foreground mt-2">
          Upload JPG, PNG, or WebP photos. One image can be the homepage photo. The rest appear in the gallery.
        </p>
      </div>
      <UploadImageForm />
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((image) => (
          <article key={image.id} className="overflow-hidden rounded-xl border border-border bg-white">
            <img
              src={`/media/${image.filename}`}
              alt={image.alt}
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="flex items-start justify-between gap-3 p-4">
              <div>
                <p className="text-sm font-medium text-navy">{image.alt}</p>
                <p className="text-muted-foreground mt-1 text-xs">
                  {image.placement === "hero" ? "Homepage main photo" : "Gallery"}
                </p>
              </div>
              <DeleteImageButton id={image.id} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
