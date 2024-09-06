/*
  Warnings:

  - A unique constraint covering the columns `[user_no,character_no]` on the table `character_locker` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_no,item_no]` on the table `inventory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[receiver_no,sender_no]` on the table `like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_no,achievement_no]` on the table `user_achievement` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `neighbor` MODIFY `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX `character_locker_user_no_character_no_key` ON `character_locker`(`user_no`, `character_no`);

-- CreateIndex
CREATE UNIQUE INDEX `inventory_user_no_item_no_key` ON `inventory`(`user_no`, `item_no`);

-- CreateIndex
CREATE UNIQUE INDEX `receiver_no_sender_no` ON `like`(`receiver_no`, `sender_no`);

-- CreateIndex
CREATE UNIQUE INDEX `user_achievement_user_no_achievement_no_key` ON `user_achievement`(`user_no`, `achievement_no`);
