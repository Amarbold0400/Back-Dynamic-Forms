/*
  Warnings:

  - Changed the type of `themeGlobalFontSize` on the `Style` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `themeHelpTextFontSize` on the `Style` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `themeInputBorderRadius` on the `Style` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `themeLabelFontSize` on the `Style` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `themeLabelFontWeight` on the `Style` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `themeLabelMarginBottom` on the `Style` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Style" DROP COLUMN "themeGlobalFontSize",
ADD COLUMN     "themeGlobalFontSize" INTEGER NOT NULL,
DROP COLUMN "themeHelpTextFontSize",
ADD COLUMN     "themeHelpTextFontSize" INTEGER NOT NULL,
DROP COLUMN "themeInputBorderRadius",
ADD COLUMN     "themeInputBorderRadius" INTEGER NOT NULL,
DROP COLUMN "themeLabelFontSize",
ADD COLUMN     "themeLabelFontSize" INTEGER NOT NULL,
DROP COLUMN "themeLabelFontWeight",
ADD COLUMN     "themeLabelFontWeight" INTEGER NOT NULL,
DROP COLUMN "themeLabelMarginBottom",
ADD COLUMN     "themeLabelMarginBottom" INTEGER NOT NULL;
