/*
  Warnings:

  - Added the required column `equityRangeMax` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `equityRangeMin` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payRangeMax` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payRangeMin` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payRangeTimeframe` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Job` ADD COLUMN `equityRangeMax` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `equityRangeMin` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `experience` VARCHAR(191) NOT NULL,
    ADD COLUMN `payRangeMax` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `payRangeMin` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `payRangeTimeframe` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;
