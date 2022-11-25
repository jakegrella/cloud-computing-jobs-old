/*
  Warnings:

  - You are about to drop the column `headquartersId` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the `_CompanyToLocation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `administrativeArea` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locality` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `premise` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thoroughfare` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Company` DROP FOREIGN KEY `Company_headquartersId_fkey`;

-- DropForeignKey
ALTER TABLE `_CompanyToLocation` DROP FOREIGN KEY `_CompanyToLocation_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CompanyToLocation` DROP FOREIGN KEY `_CompanyToLocation_B_fkey`;

-- AlterTable
ALTER TABLE `Company` DROP COLUMN `headquartersId`;

-- AlterTable
ALTER TABLE `Location` DROP COLUMN `city`,
    DROP COLUMN `state`,
    ADD COLUMN `administrativeArea` VARCHAR(191) NOT NULL,
    ADD COLUMN `companyId` INTEGER NOT NULL,
    ADD COLUMN `headquarters` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `locality` VARCHAR(191) NOT NULL,
    ADD COLUMN `postalCode` INTEGER NOT NULL,
    ADD COLUMN `premise` VARCHAR(191) NOT NULL,
    ADD COLUMN `thoroughfare` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_CompanyToLocation`;

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `Location_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
