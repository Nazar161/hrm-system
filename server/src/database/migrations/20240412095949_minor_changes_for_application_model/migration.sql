/*
  Warnings:

  - The `refusalReason` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "RefusalReason" AS ENUM ('CANDIDATE_REFUSAL', 'HR_REFUSAL', 'TECH_REFUSAL');

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "refusalReason",
ADD COLUMN     "refusalReason" "RefusalReason";

-- DropEnum
DROP TYPE "refusalReason";
