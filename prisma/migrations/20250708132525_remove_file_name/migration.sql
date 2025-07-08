/*
  Warnings:

  - You are about to drop the column `fileName` on the `files` table. All the data in the column will be lost.
  - You are about to drop the column `maxDownloads` on the `files` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "files" DROP COLUMN "fileName",
DROP COLUMN "maxDownloads";
