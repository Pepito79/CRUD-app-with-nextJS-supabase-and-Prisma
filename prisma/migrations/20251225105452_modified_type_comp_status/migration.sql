/*
  Warnings:

  - The `comp_status` column on the `UserWorkingInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "CompanySituation" AS ENUM ('PENDING_SIRET', 'LESS_THAN_3_MONTHS', 'FROM_3_MONTHS_TO_1_YEAR', 'MORE_THAN_1_YEAR', 'NO_BUSINESS');

-- AlterTable
ALTER TABLE "UserWorkingInfo" DROP COLUMN "comp_status",
ADD COLUMN     "comp_status" "CompanySituation";
