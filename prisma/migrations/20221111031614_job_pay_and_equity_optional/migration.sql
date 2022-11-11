-- AlterTable
ALTER TABLE `Job` MODIFY `equityRangeMax` DECIMAL(65, 30) NULL,
    MODIFY `equityRangeMin` DECIMAL(65, 30) NULL,
    MODIFY `payRangeMax` DECIMAL(65, 30) NULL,
    MODIFY `payRangeMin` DECIMAL(65, 30) NULL,
    MODIFY `payRangeTimeFrame` VARCHAR(191) NULL;
