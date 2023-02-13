-- CreateEnum
CREATE TYPE "ContestType" AS ENUM ('AMC8', 'AMC10', 'AMC12', 'AHSME');

-- CreateTable
CREATE TABLE "Contest" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "year" SMALLINT NOT NULL,
    "formattedTitle" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "type" "ContestType" NOT NULL,

    CONSTRAINT "Contest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Problem" (
    "id" SERIAL NOT NULL,
    "formattedTitle" TEXT NOT NULL,
    "contestId" SMALLINT NOT NULL,
    "link" TEXT NOT NULL,
    "answer" VARCHAR(3) NOT NULL,
    "problem" TEXT NOT NULL,
    "solutions" JSONB NOT NULL,
    "type" "ContestType" NOT NULL,
    "problemNum" SMALLINT NOT NULL,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
