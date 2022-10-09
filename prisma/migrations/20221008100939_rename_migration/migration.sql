/*
  Warnings:

  - You are about to drop the column `class` on the `Question` table. All the data in the column will be lost.
  - Added the required column `class_name` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "class",
ADD COLUMN     "class_name" TEXT NOT NULL;
