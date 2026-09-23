-- CreateTable
CREATE TABLE "SiteImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "placement" TEXT NOT NULL DEFAULT 'gallery',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "SiteImage_filename_key" ON "SiteImage"("filename");
