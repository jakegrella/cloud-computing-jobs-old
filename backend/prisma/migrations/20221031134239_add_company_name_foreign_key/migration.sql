/*
  Warnings:

  - A unique constraint covering the columns `[id,name]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Job` DROP FOREIGN KEY `Job_companyId_fkey`;

-- AlterTable
ALTER TABLE `Job` ADD COLUMN `companyName` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Company_id_name_key` ON `Company`(`id`, `name`);

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_companyId_companyName_fkey` FOREIGN KEY (`companyId`, `companyName`) REFERENCES `Company`(`id`, `name`) ON DELETE SET NULL ON UPDATE CASCADE;
