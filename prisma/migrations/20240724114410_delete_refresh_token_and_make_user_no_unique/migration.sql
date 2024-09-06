/*
  Warnings:

  - You are about to drop the column `service_refresh` on the `token` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_no]` on the table `token` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `neighbor` MODIFY `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE `token` DROP COLUMN `service_refresh`;

-- CreateIndex
CREATE UNIQUE INDEX `token_user_no_key` ON `token`(`user_no`);
