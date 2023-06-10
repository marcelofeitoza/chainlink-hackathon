/*
  Warnings:

  - You are about to drop the column `status` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Proposal` table. All the data in the column will be lost.
  - Added the required column `description` to the `Proposal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Proposal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalVotes` to the `Proposal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Proposal" DROP COLUMN "status",
DROP COLUMN "text",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "executed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "totalVotes" INTEGER NOT NULL;
