/*
  Warnings:

  - A unique constraint covering the columns `[uniqueId]` on the table `files` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uniqueId` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "files" ADD COLUMN     "uniqueId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "files_uniqueId_key" ON "files"("uniqueId");
