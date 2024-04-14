-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `password` VARCHAR(75) NOT NULL,
    `CPF` CHAR(11) NOT NULL,
    `privilege` TINYINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plate` CHAR(7) NOT NULL,
    `type` TINYINT NOT NULL,
    `brand` VARCHAR(75) NOT NULL,
    `model` VARCHAR(75) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `suplier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(75) NOT NULL,
    `phone` CHAR(11) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `CNPJ` CHAR(14) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `visitor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(75) NOT NULL,
    `phone` CHAR(11) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `rg` VARCHAR(20) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `collaborator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(75) NOT NULL,
    `register_employ` CHAR(15) NOT NULL,
    `position` VARCHAR(30) NOT NULL,
    `department` VARCHAR(20) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `delivery_received` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_delivery_person` VARCHAR(75) NOT NULL,
    `register_employ` CHAR(15) NOT NULL,
    `type` VARCHAR(30) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `Observation` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
