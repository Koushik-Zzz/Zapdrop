/*
  Warnings:

  - You are about to drop the column `downloadCount` on the `files` table. All the data in the column will be lost.
  - You are about to drop the column `storagePath` on the `files` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "files" DROP COLUMN "downloadCount",
DROP COLUMN "storagePath";
