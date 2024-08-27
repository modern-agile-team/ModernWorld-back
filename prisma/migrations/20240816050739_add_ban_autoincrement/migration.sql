/*
  Warnings:

  - The primary key for the `ban` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `no` on the `ban` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.

*/
-- AlterTable
ALTER TABLE `ban` DROP PRIMARY KEY,
    MODIFY `no` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`no`);

-- AlterTable
ALTER TABLE `neighbor` MODIFY `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
