/*
  Warnings:

  - Changed the type of `comp_status` on the `UserWorkingInfo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "UserWorkingInfo" DROP COLUMN "comp_status",
ADD COLUMN     "comp_status" INTEGER NOT NULL;
