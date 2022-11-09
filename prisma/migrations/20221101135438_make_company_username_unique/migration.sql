/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Company_username_key` ON `Company`(`username`);
