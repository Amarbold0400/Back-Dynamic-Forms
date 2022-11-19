-- DropForeignKey
ALTER TABLE "Style" DROP CONSTRAINT "Style_formId_fkey";

-- AddForeignKey
ALTER TABLE "Style" ADD CONSTRAINT "Style_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;
