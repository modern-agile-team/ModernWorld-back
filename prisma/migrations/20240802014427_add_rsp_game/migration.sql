-- AlterTable
ALTER TABLE `neighbor` MODIFY `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE `RSP_game_record` (
    `no` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_no` INTEGER UNSIGNED NOT NULL,
    `user_choice` VARCHAR(10) NOT NULL,
    `computer_choice` VARCHAR(10) NOT NULL,
    `result` ENUM('win', 'lose', 'draw') NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `user_no`(`user_no`),
    PRIMARY KEY (`no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RSP_game_record` ADD CONSTRAINT `RSP_game_record_ibfk_1` FOREIGN KEY (`user_no`) REFERENCES `user`(`no`) ON DELETE CASCADE ON UPDATE CASCADE;
