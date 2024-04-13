/*
  Warnings:

  - You are about to drop the column `userId` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Vacancy` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Vacancy` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_userId_fkey";

-- DropForeignKey
ALTER TABLE "Vacancy" DROP CONSTRAINT "Vacancy_userId_fkey";

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "createdById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Candidate" RENAME COLUMN "userId" TO "createdById";

-- AlterTable
ALTER TABLE "Vacancy" RENAME COLUMN "userId" TO "createdById";

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacancy" ADD CONSTRAINT "Vacancy_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
