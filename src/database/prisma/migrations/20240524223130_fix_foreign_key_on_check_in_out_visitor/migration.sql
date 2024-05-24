/*
  Warnings:

  - You are about to alter the column `date_check_in` on the `check_in_out_collaborator` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `date_check_in` on the `check_in_out_suplier` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `visitorId` on the `check_in_out_visitor` table. All the data in the column will be lost.
  - You are about to alter the column `date_check_in` on the `check_in_out_visitor` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `check_in_out_visitor` DROP FOREIGN KEY `check_in_out_visitor_visitorId_fkey`;

-- AlterTable
ALTER TABLE `check_in_out_collaborator` MODIFY `date_check_in` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `check_in_out_suplier` MODIFY `date_check_in` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `check_in_out_visitor` DROP COLUMN `visitorId`,
    MODIFY `date_check_in` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `check_in_out_visitor` ADD CONSTRAINT `check_in_out_visitor_visitor_id_fkey` FOREIGN KEY (`visitor_id`) REFERENCES `visitor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
