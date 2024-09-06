/*
  Warnings:

  - You are about to drop the column `like` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `neighbor` MODIFY `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `like`;
