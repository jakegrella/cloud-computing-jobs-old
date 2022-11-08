/*
  Warnings:

  - Added the required column `overview` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Company` ADD COLUMN `overview` VARCHAR(191) NOT NULL;
