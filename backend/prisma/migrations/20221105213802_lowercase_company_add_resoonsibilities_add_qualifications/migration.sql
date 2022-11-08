/*
  Warnings:

  - Added the required column `qualifications` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsibilities` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Job` ADD COLUMN `qualifications` TEXT NOT NULL,
    ADD COLUMN `responsibilities` TEXT NOT NULL;
