/*
  Warnings:

  - Added the required column `username` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Company` ADD COLUMN `username` VARCHAR(191) NOT NULL;
