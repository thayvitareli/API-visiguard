/*
  Warnings:

  - You are about to alter the column `position` on the `collaborator` table. The data in that column could be lost. The data in that column will be cast from `VarChar(30)` to `TinyInt`.
  - You are about to alter the column `department` on the `collaborator` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.
  - You are about to drop the column `register_employ` on the `delivery_received` table. All the data in the column will be lost.
  - You are about to alter the column `type` on the `delivery_received` table. The data in that column could be lost. The data in that column will be cast from `VarChar(30)` to `TinyInt`.
  - You are about to drop the column `status` on the `visitor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `collaborator` MODIFY `register_employ` CHAR(75) NOT NULL,
    MODIFY `position` TINYINT NOT NULL,
    MODIFY `department` TINYINT NOT NULL;

-- AlterTable
ALTER TABLE `delivery_received` DROP COLUMN `register_employ`,
    MODIFY `type` TINYINT NOT NULL,
    MODIFY `Observation` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `visitor` DROP COLUMN `status`,
    MODIFY `phone` CHAR(14) NOT NULL;

-- CreateTable
CREATE TABLE `report` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` TEXT NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `report` ADD CONSTRAINT `report_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
