/*
  Warnings:

  - You are about to drop the column `is_accepted` on the `Rent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Rent" DROP COLUMN "is_accepted",
ADD COLUMN     "is_completed" BOOLEAN NOT NULL DEFAULT false;
