-- AlterTable
ALTER TABLE `neighbor` MODIFY `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE `ban` (
    `no` INTEGER NOT NULL,
    `unique_identifier` VARCHAR(300) NOT NULL,
    `content` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `expired_at` DATETIME(0) NULL,

    UNIQUE INDEX `ban_unique_identifier_key`(`unique_identifier`),
    PRIMARY KEY (`no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
