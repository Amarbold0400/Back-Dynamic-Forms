/*
  Warnings:

  - You are about to drop the column `questionOptionId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `questionTypeId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the `QuestionType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionId` to the `QuestionOption` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_questionOptionId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_questionTypeId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "questionOptionId",
DROP COLUMN "questionTypeId",
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "QuestionOption" ADD COLUMN     "questionId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "QuestionType";

-- AddForeignKey
ALTER TABLE "QuestionOption" ADD CONSTRAINT "QuestionOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
