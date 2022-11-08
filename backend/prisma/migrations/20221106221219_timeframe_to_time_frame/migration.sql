/*
  Warnings:

  - You are about to drop the column `payRangeTimeframe` on the `Job` table. All the data in the column will be lost.
  - Added the required column `payRangeTimeFrame` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Job` DROP COLUMN `payRangeTimeframe`,
    ADD COLUMN `payRangeTimeFrame` VARCHAR(191) NOT NULL;
