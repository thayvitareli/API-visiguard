-- CreateTable
CREATE TABLE `check_in_out_visitor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date_check_in` DATETIME NOT NULL,
    `date_check_out` DATETIME(3) NULL,
    `plate` VARCHAR(7) NULL,
    `visitor_id` INTEGER NOT NULL,
    `visitorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `check_in_out_collaborator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date_check_in` DATETIME NOT NULL,
    `date_check_out` DATETIME(3) NULL,
    `plate` VARCHAR(7) NULL,
    `collaborator_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `check_in_out_suplier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date_check_in` DATETIME NOT NULL,
    `date_check_out` DATETIME(3) NULL,
    `plate` VARCHAR(7) NULL,
    `name_employee` VARCHAR(75) NOT NULL,
    `rg_empoyee` VARCHAR(20) NOT NULL,
    `suplier_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `check_in_out_visitor` ADD CONSTRAINT `check_in_out_visitor_visitorId_fkey` FOREIGN KEY (`visitorId`) REFERENCES `visitor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `check_in_out_collaborator` ADD CONSTRAINT `check_in_out_collaborator_collaborator_id_fkey` FOREIGN KEY (`collaborator_id`) REFERENCES `collaborator`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `check_in_out_suplier` ADD CONSTRAINT `check_in_out_suplier_suplier_id_fkey` FOREIGN KEY (`suplier_id`) REFERENCES `suplier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
