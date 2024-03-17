-- CreateTable
CREATE TABLE "Vacancy" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Vacancy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "candidateId" TEXT NOT NULL,
    "vacancyId" TEXT NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("candidateId","vacancyId")
);

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "Vacancy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
