-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- AlterTable
ALTER TABLE "Answer" ALTER COLUMN "questionId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Style" (
    "id" SERIAL NOT NULL,
    "formId" INTEGER NOT NULL,
    "themeButtonBackground" TEXT NOT NULL,
    "themeButtonBorderColor" TEXT NOT NULL,
    "themeButtonColor" TEXT NOT NULL,
    "themeFormGroupBackgroundColor" TEXT NOT NULL,
    "themeFormGroupBackgroundHoverColor" TEXT NOT NULL,
    "themeFormGroupBorderColor" TEXT NOT NULL,
    "themeFormGroupBorderHoverColor" TEXT NOT NULL,
    "themeFormGroupBorderStyle" TEXT NOT NULL,
    "themeFormGroupBorderWidth" TEXT NOT NULL,
    "themeGlobalBackgroundColor" TEXT NOT NULL,
    "themeGlobalFontColor" TEXT NOT NULL,
    "themeGlobalFontFamily" TEXT NOT NULL,
    "themeGlobalFontSize" TEXT NOT NULL,
    "themeGlobalLinkColor" TEXT NOT NULL,
    "themeHelpTextColor" TEXT NOT NULL,
    "themeHelpTextFontSize" TEXT NOT NULL,
    "themeHelpTextMarginTop" TEXT NOT NULL,
    "themeInputBorderColor" TEXT NOT NULL,
    "themeInputBorderRadius" TEXT NOT NULL,
    "themeInputFocusBorderColor" TEXT NOT NULL,
    "themeInputHoverBorderColor" TEXT NOT NULL,
    "themeInputShadowColor" TEXT NOT NULL,
    "themeLabelFontSize" TEXT NOT NULL,
    "themeLabelFontWeight" TEXT NOT NULL,
    "themeLabelMarginBottom" TEXT NOT NULL,
    "themePrimaryColor" TEXT NOT NULL,

    CONSTRAINT "Style_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Style_formId_key" ON "Style"("formId");

-- AddForeignKey
ALTER TABLE "Style" ADD CONSTRAINT "Style_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;
