/*
  Warnings:

  - The primary key for the `Application` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `candidateId` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `hrInterview` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `hrInterviewComment` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `jobStartComment` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `offerComment` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `refusalReason` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `refusalReasonComment` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `techInterview` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `techInterviewComment` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `telInterview` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `telInterviewComment` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `testTask` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `testTaskComment` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `vacancyId` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `candidateId` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `resumeFormat` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `resumeTitle` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `resumeUrl` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hashedPassword` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hashedRefreshToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Vacancy` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Vacancy` table. All the data in the column will be lost.
  - You are about to drop the column `maxSalary` on the `Vacancy` table. All the data in the column will be lost.
  - You are about to drop the column `minSalary` on the `Vacancy` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Vacancy` table. All the data in the column will be lost.
  - Added the required column `candidate_id` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vacancy_id` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_of_birth` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `candidate_id` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resume_format` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resume_title` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resume_url` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashed_password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `Vacancy` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_vacancyId_fkey";

-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Resume" DROP CONSTRAINT "Resume_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "Vacancy" DROP CONSTRAINT "Vacancy_createdById_fkey";

-- AlterTable
ALTER TABLE "Application" DROP CONSTRAINT "Application_pkey",
DROP COLUMN "candidateId",
DROP COLUMN "createdAt",
DROP COLUMN "createdById",
DROP COLUMN "hrInterview",
DROP COLUMN "hrInterviewComment",
DROP COLUMN "jobStartComment",
DROP COLUMN "offerComment",
DROP COLUMN "refusalReason",
DROP COLUMN "refusalReasonComment",
DROP COLUMN "techInterview",
DROP COLUMN "techInterviewComment",
DROP COLUMN "telInterview",
DROP COLUMN "telInterviewComment",
DROP COLUMN "testTask",
DROP COLUMN "testTaskComment",
DROP COLUMN "updatedAt",
DROP COLUMN "vacancyId",
ADD COLUMN     "candidate_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by_id" TEXT NOT NULL,
ADD COLUMN     "hr_interview" "InterviewStatus",
ADD COLUMN     "hr_interview_comment" TEXT,
ADD COLUMN     "job_start_comment" TEXT,
ADD COLUMN     "offer_comment" TEXT,
ADD COLUMN     "refusal_reason" "RefusalReason",
ADD COLUMN     "refusal_reason_comment" TEXT,
ADD COLUMN     "tech_interview" "InterviewStatus",
ADD COLUMN     "tech_interview_comment" TEXT,
ADD COLUMN     "tel_interview" "InterviewStatus",
ADD COLUMN     "tel_interview_comment" TEXT,
ADD COLUMN     "test_task" "TestTaskStatus",
ADD COLUMN     "test_task_comment" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "vacancy_id" TEXT NOT NULL,
ADD CONSTRAINT "Application_pkey" PRIMARY KEY ("candidate_id", "vacancy_id");

-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "createdAt",
DROP COLUMN "createdById",
DROP COLUMN "dateOfBirth",
DROP COLUMN "firstName",
DROP COLUMN "imageUrl",
DROP COLUMN "lastName",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by_id" TEXT NOT NULL,
ADD COLUMN     "date_of_birth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "candidateId",
DROP COLUMN "resumeFormat",
DROP COLUMN "resumeTitle",
DROP COLUMN "resumeUrl",
ADD COLUMN     "candidate_id" TEXT NOT NULL,
ADD COLUMN     "resume_format" "ResumeFormat" NOT NULL,
ADD COLUMN     "resume_title" TEXT NOT NULL,
ADD COLUMN     "resume_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "firstName",
DROP COLUMN "hashedPassword",
DROP COLUMN "hashedRefreshToken",
DROP COLUMN "lastName",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "hashed_password" TEXT NOT NULL,
ADD COLUMN     "hashed_refresh_token" TEXT,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Vacancy" DROP COLUMN "createdAt",
DROP COLUMN "createdById",
DROP COLUMN "maxSalary",
DROP COLUMN "minSalary",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by_id" TEXT NOT NULL,
ADD COLUMN     "max_salary" INTEGER,
ADD COLUMN     "min_salary" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacancy" ADD CONSTRAINT "Vacancy_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_vacancy_id_fkey" FOREIGN KEY ("vacancy_id") REFERENCES "Vacancy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
