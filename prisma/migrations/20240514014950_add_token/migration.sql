/*
  Warnings:

  - You are about to drop the column `font_color` on the `achievement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `achievement` DROP COLUMN `font_color`;

-- AlterTable
ALTER TABLE `neighbor` MODIFY `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE `token` (
    `no` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_no` INTEGER UNSIGNED NOT NULL,
    `social_access` VARCHAR(300) NULL,
    `social_refresh` VARCHAR(300) NULL,
    `service_refresh` VARCHAR(300) NULL,

    INDEX `user_no`(`user_no`),
    PRIMARY KEY (`no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `token` ADD CONSTRAINT `token_user_no_fkey` FOREIGN KEY (`user_no`) REFERENCES `user`(`no`) ON DELETE RESTRICT ON UPDATE CASCADE;
