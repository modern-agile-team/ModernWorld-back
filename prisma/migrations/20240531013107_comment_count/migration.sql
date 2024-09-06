/*
  Warnings:

  - You are about to drop the column `commet_count` on the `legend` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `legend` DROP COLUMN `commet_count`,
    ADD COLUMN `comment_count` INTEGER UNSIGNED NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `neighbor` MODIFY `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
