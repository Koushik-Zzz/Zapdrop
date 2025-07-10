/*
  Warnings:

  - You are about to drop the column `shareId` on the `files` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[key]` on the table `files` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "files_shareId_key";

-- AlterTable
ALTER TABLE "files" DROP COLUMN "shareId",
ADD COLUMN     "key" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "files_key_key" ON "files"("key");
