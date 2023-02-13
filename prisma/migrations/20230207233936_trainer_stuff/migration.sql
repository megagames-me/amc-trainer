-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "curProblemId" INTEGER,
ADD COLUMN     "problemsRight" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "problemsSkip" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "problemsWrong" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_curProblemId_fkey" FOREIGN KEY ("curProblemId") REFERENCES "Problem"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
