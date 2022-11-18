/*
  Warnings:

  - Made the column `isPlaceholderVisible` on table `Question` required. This step will fail if there are existing NULL values in that column.
  - Made the column `placeholder` on table `Question` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "text" SET DEFAULT 'TextInput',
ALTER COLUMN "isPlaceholderVisible" SET NOT NULL,
ALTER COLUMN "isPlaceholderVisible" SET DEFAULT false,
ALTER COLUMN "placeholder" SET NOT NULL,
ALTER COLUMN "placeholder" SET DEFAULT 'Input placeholder here...';
