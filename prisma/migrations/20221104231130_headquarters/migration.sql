/*
  Warnings:

  - Added the required column `headquartersId` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Made the column `companyId` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Job` DROP FOREIGN KEY `Job_companyId_fkey`;

-- AlterTable
ALTER TABLE `Company` ADD COLUMN `headquartersId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Job` MODIFY `companyId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_JobToLocation` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_JobToLocation_AB_unique`(`A`, `B`),
    INDEX `_JobToLocation_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CompanyToLocation` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CompanyToLocation_AB_unique`(`A`, `B`),
    INDEX `_CompanyToLocation_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_headquartersId_fkey` FOREIGN KEY (`headquartersId`) REFERENCES `Location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_JobToLocation` ADD CONSTRAINT `_JobToLocation_A_fkey` FOREIGN KEY (`A`) REFERENCES `Job`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_JobToLocation` ADD CONSTRAINT `_JobToLocation_B_fkey` FOREIGN KEY (`B`) REFERENCES `Location`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CompanyToLocation` ADD CONSTRAINT `_CompanyToLocation_A_fkey` FOREIGN KEY (`A`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CompanyToLocation` ADD CONSTRAINT `_CompanyToLocation_B_fkey` FOREIGN KEY (`B`) REFERENCES `Location`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
