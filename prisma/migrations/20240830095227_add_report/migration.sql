-- AlterTable
ALTER TABLE `neighbor` MODIFY `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE `report` (
    `no` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `sender_no` INTEGER UNSIGNED NULL,
    `receiver_no` INTEGER UNSIGNED NULL,
    `content` VARCHAR(300) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `category` ENUM('spam', 'harmfulContent', 'scamImpersonation', 'copyrightInfringement', 'explicitContent', 'abusiveBehavior', 'misinformation', 'duplicateContent', 'hateSpeech', 'technicalIssue', 'other') NOT NULL DEFAULT 'other',

    INDEX `receiver_no`(`receiver_no`),
    INDEX `sender_no`(`sender_no`),
    PRIMARY KEY (`no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `report` ADD CONSTRAINT `report_sender_ibfk` FOREIGN KEY (`sender_no`) REFERENCES `user`(`no`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `report` ADD CONSTRAINT `report_receiver_ibfk` FOREIGN KEY (`receiver_no`) REFERENCES `user`(`no`) ON DELETE SET NULL ON UPDATE CASCADE;
