-- CreateTable
CREATE TABLE `achievement` (
    `no` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `description` VARCHAR(100) NOT NULL,
    `title` VARCHAR(20) NOT NULL,
    `font_color` VARCHAR(10) NOT NULL,
    `level` ENUM('one', 'two', 'three') NOT NULL,
    `point` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `character` (
    `no` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(15) NOT NULL,
    `description` VARCHAR(100) NOT NULL,
    `image` VARCHAR(400) NOT NULL,
    `species` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `character_locker` (
    `no` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `character_no` INTEGER UNSIGNED NOT NULL,
    `user_no` INTEGER UNSIGNED NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,

    INDEX `character_no`(`character_no`),
    INDEX `user_no`(`user_no`),
    PRIMARY KEY (`no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment` (
    `no` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `receiver_no` INTEGER UNSIGNED NULL,
    `sender_no` INTEGER UNSIGNED NULL,
    `content` VARCHAR(300) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    INDEX `receiver_no`(`receiver_no`),
    INDEX `sender_no`(`sender_no`),
    PRIMARY KEY (`no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventory` (
    `no` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_no` INTEGER UNSIGNED NOT NULL,
    `item_no` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` BOOLEAN NOT NULL DEFAULT false,

    INDEX `item_no`(`item_no`),
    INDEX `user_no`(`user_no`),
    PRIMARY KEY (`no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item` (
    `no` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(15) NOT NULL,
    `description` VARCHAR(150) NOT NULL,
    `image` VARCHAR(400) NOT NULL,
    `theme` VARCHAR(10) NOT NULL,
    `type` VARCHAR(20) NOT NULL,
    `price` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `legend` (
    `user_no` INTEGER UNSIGNED NOT NULL,
    `attendance_count` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `commet_count` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `item_count` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `present_count` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `like_count` INTEGER UNSIGNED NOT NULL DEFAULT 0,

    PRIMARY KEY (`user_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `like` (
    `no` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `receiver_no` INTEGER UNSIGNED NOT NULL,
    `sender_no` INTEGER UNSIGNED NOT NULL,

    INDEX `receiver_no`(`receiver_no`),
    INDEX `sender_no`(`sender_no`),
    PRIMARY KEY (`no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `neighbor` (
    `no` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `sender_no` INTEGER UNSIGNED NOT NULL,
    `receiver_no` INTEGER UNSIGNED NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX `receiver_no`(`receiver_no`),
    INDEX `sender_no`(`sender_no`),
    PRIMARY KEY (`no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post` (
    `no` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `sender_no` INTEGER UNSIGNED NULL,
    `receiver_no` INTEGER UNSIGNED NULL,
    `content` VARCHAR(150) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `check` BOOLEAN NOT NULL DEFAULT false,
    `sender_delete` BOOLEAN NOT NULL DEFAULT false,
    `receiver_delete` BOOLEAN NOT NULL DEFAULT false,

    INDEX `receiver_no`(`receiver_no`),
    INDEX `sender_no`(`sender_no`),
    PRIMARY KEY (`no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `present` (
    `no` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `item_no` INTEGER UNSIGNED NOT NULL,
    `sender_no` INTEGER UNSIGNED NULL,
    `receiver_no` INTEGER UNSIGNED NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` ENUM('unread', 'read', 'accept', 'reject') NOT NULL DEFAULT 'unread',
    `sender_delete` BOOLEAN NOT NULL DEFAULT false,
    `receiver_delete` BOOLEAN NOT NULL DEFAULT false,

    INDEX `item_no`(`item_no`),
    INDEX `receiver_no`(`receiver_no`),
    INDEX `sender_no`(`sender_no`),
    PRIMARY KEY (`no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reply` (
    `no` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `comment_no` INTEGER UNSIGNED NOT NULL,
    `user_no` INTEGER UNSIGNED NULL,
    `content` VARCHAR(300) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    INDEX `comment_no`(`comment_no`),
    INDEX `user_no`(`user_no`),
    PRIMARY KEY (`no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `no` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(10) NULL,
    `current_point` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `accumulation_point` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `description` VARCHAR(150) NULL,
    `attendance` JSON NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `like` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,
    `admin` BOOLEAN NOT NULL DEFAULT false,
    `unique_identifier` VARCHAR(300) NOT NULL,
    `social_name` VARCHAR(200) NOT NULL,
    `image` VARCHAR(300) NULL DEFAULT 'https://wang0514.s3.ap-northeast-2.amazonaws.com/page/BaseProfileImage/pngwing.com.png',
    `domain` ENUM('naver', 'kakao', 'google') NOT NULL,

    UNIQUE INDEX `nickname`(`nickname`),
    UNIQUE INDEX `unique_identifier`(`unique_identifier`),
    PRIMARY KEY (`no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_achievement` (
    `no` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_no` INTEGER UNSIGNED NOT NULL,
    `achievement_no` INTEGER UNSIGNED NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,

    INDEX `achievement_no`(`achievement_no`),
    INDEX `user_no`(`user_no`),
    PRIMARY KEY (`no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `character_locker` ADD CONSTRAINT `character_locker_ibfk_1` FOREIGN KEY (`character_no`) REFERENCES `character`(`no`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_locker` ADD CONSTRAINT `character_locker_ibfk_2` FOREIGN KEY (`user_no`) REFERENCES `user`(`no`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`sender_no`) REFERENCES `user`(`no`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`receiver_no`) REFERENCES `user`(`no`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory` ADD CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`user_no`) REFERENCES `user`(`no`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory` ADD CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`item_no`) REFERENCES `item`(`no`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `legend` ADD CONSTRAINT `legend_ibfk_1` FOREIGN KEY (`user_no`) REFERENCES `user`(`no`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `like` ADD CONSTRAINT `like_ibfk_1` FOREIGN KEY (`sender_no`) REFERENCES `user`(`no`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `like` ADD CONSTRAINT `like_ibfk_2` FOREIGN KEY (`receiver_no`) REFERENCES `user`(`no`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `neighbor` ADD CONSTRAINT `neighbor_ibfk_1` FOREIGN KEY (`sender_no`) REFERENCES `user`(`no`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `neighbor` ADD CONSTRAINT `neighbor_ibfk_2` FOREIGN KEY (`receiver_no`) REFERENCES `user`(`no`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`sender_no`) REFERENCES `user`(`no`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_ibfk_2` FOREIGN KEY (`receiver_no`) REFERENCES `user`(`no`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `present` ADD CONSTRAINT `present_ibfk_1` FOREIGN KEY (`item_no`) REFERENCES `item`(`no`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `present` ADD CONSTRAINT `present_ibfk_2` FOREIGN KEY (`sender_no`) REFERENCES `user`(`no`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `present` ADD CONSTRAINT `present_ibfk_3` FOREIGN KEY (`receiver_no`) REFERENCES `user`(`no`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reply` ADD CONSTRAINT `reply_ibfk_1` FOREIGN KEY (`user_no`) REFERENCES `user`(`no`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reply` ADD CONSTRAINT `reply_ibfk_2` FOREIGN KEY (`comment_no`) REFERENCES `comment`(`no`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_achievement` ADD CONSTRAINT `user_achievement_ibfk_1` FOREIGN KEY (`user_no`) REFERENCES `user`(`no`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_achievement` ADD CONSTRAINT `user_achievement_ibfk_2` FOREIGN KEY (`achievement_no`) REFERENCES `achievement`(`no`) ON DELETE CASCADE ON UPDATE CASCADE;
