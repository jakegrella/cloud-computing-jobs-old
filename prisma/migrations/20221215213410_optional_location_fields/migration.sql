-- AlterTable
ALTER TABLE `Location` ADD COLUMN `neighborhood` VARCHAR(191) NULL,
    MODIFY `postalCode` VARCHAR(191) NULL,
    MODIFY `premise` VARCHAR(191) NULL,
    MODIFY `thoroughfare` VARCHAR(191) NULL;
