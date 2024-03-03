/*
  Warnings:

  - Changed the type of `resumeFormat` on the `Resume` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ResumeFormat" AS ENUM ('DOCX', 'PDF');

-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "resumeFormat",
ADD COLUMN     "resumeFormat" "ResumeFormat" NOT NULL;

-- DropEnum
DROP TYPE "FileFormat";
