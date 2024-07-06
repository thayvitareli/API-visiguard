/*
  Warnings:

  - You are about to alter the column `date_check_in` on the `check_in_out_collaborator` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `date_check_in` on the `check_in_out_suplier` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `date_check_in` on the `check_in_out_visitor` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `check_in_out_collaborator` MODIFY `date_check_in` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `check_in_out_suplier` MODIFY `date_check_in` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `check_in_out_visitor` MODIFY `date_check_in` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true;
