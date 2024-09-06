-- DropForeignKey
ALTER TABLE `token` DROP FOREIGN KEY `token_user_no_fkey`;

-- AlterTable
ALTER TABLE `neighbor` MODIFY `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE `token` ADD CONSTRAINT `token_user_no_fkey` FOREIGN KEY (`user_no`) REFERENCES `user`(`no`) ON DELETE CASCADE ON UPDATE CASCADE;
