/*
  Warnings:

  - The `numb_workers` column on the `UserWorkingInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "NumWokers" AS ENUM ('ALONE', 'ONE', 'TWO_TO_TEN', 'MORE_THAN_TEN');

-- AlterTable
ALTER TABLE "UserWorkingInfo" DROP COLUMN "numb_workers",
ADD COLUMN     "numb_workers" "NumWokers";
