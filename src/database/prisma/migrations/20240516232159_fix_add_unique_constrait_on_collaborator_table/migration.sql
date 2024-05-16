/*
  Warnings:

  - A unique constraint covering the columns `[register_employ]` on the table `collaborator` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[CNPJ]` on the table `suplier` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[CPF]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rg]` on the table `visitor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `collaborator_register_employ_key` ON `collaborator`(`register_employ`);

-- CreateIndex
CREATE UNIQUE INDEX `suplier_CNPJ_key` ON `suplier`(`CNPJ`);

-- CreateIndex
CREATE UNIQUE INDEX `user_CPF_key` ON `user`(`CPF`);

-- CreateIndex
CREATE UNIQUE INDEX `visitor_rg_key` ON `visitor`(`rg`);
