-- AlterTable
ALTER TABLE `achievement` ADD COLUMN `category` VARCHAR(10) NOT NULL DEFAULT '기타';

-- AlterTable
ALTER TABLE `neighbor` MODIFY `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
