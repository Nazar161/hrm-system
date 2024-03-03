/*
  Warnings:

  - The values [UNKWNOWN] on the enum `Sex` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Sex_new" AS ENUM ('MALE', 'FEMALE', 'UNKNOWN');
ALTER TABLE "Candidate" ALTER COLUMN "sex" DROP DEFAULT;
ALTER TABLE "Candidate" ALTER COLUMN "sex" TYPE "Sex_new" USING ("sex"::text::"Sex_new");
ALTER TYPE "Sex" RENAME TO "Sex_old";
ALTER TYPE "Sex_new" RENAME TO "Sex";
DROP TYPE "Sex_old";
ALTER TABLE "Candidate" ALTER COLUMN "sex" SET DEFAULT 'UNKNOWN';
COMMIT;

-- AlterTable
ALTER TABLE "Candidate" ALTER COLUMN "sex" SET DEFAULT 'UNKNOWN';
