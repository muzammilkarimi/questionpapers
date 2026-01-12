/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Question` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `difficulty` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "difficulty" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Question_slug_key" ON "Question"("slug");
