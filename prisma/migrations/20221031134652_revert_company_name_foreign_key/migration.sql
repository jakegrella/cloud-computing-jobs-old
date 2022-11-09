/*
  Warnings:

  - You are about to drop the column `companyName` on the `Job` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Job` DROP FOREIGN KEY `Job_companyId_companyName_fkey`;

-- DropIndex
DROP INDEX `Company_id_name_key` ON `Company`;

-- AlterTable
ALTER TABLE `Job` DROP COLUMN `companyName`;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
