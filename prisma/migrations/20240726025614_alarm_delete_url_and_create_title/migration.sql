/*
  Warnings:

  - You are about to drop the column `url` on the `alarm` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `alarm` DROP COLUMN `url`,
    ADD COLUMN `title` VARCHAR(20) NOT NULL DEFAULT '기타';

-- AlterTable
ALTER TABLE `neighbor` MODIFY `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
