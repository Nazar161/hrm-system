-- CreateEnum
CREATE TYPE "InterviewStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'NOT_COMPLETED');

-- CreateEnum
CREATE TYPE "TestTaskStatus" AS ENUM ('NOT_ASKED', 'COMPLETED', 'NOT_COMPLETED', 'REFUSAL_TO_COMPLETE');

-- CreateEnum
CREATE TYPE "refusalReason" AS ENUM ('CANDIDATE_REFUSAL', 'HR_REFUSAL', 'TECH_REFUSAL');

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "hrInterview" "InterviewStatus",
ADD COLUMN     "hrInterviewComment" TEXT,
ADD COLUMN     "jobStartComment" TEXT,
ADD COLUMN     "offer" BOOLEAN,
ADD COLUMN     "offerComment" TEXT,
ADD COLUMN     "refusalReason" "refusalReason",
ADD COLUMN     "refusalReasonComment" TEXT,
ADD COLUMN     "techInterview" "InterviewStatus",
ADD COLUMN     "techInterviewComment" TEXT,
ADD COLUMN     "telInterview" "InterviewStatus",
ADD COLUMN     "telInterviewComment" TEXT,
ADD COLUMN     "testTask" "TestTaskStatus",
ADD COLUMN     "testTaskComment" TEXT;
