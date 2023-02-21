/*
  Warnings:

  - You are about to drop the `example` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `account` MODIFY `refresh_token` TEXT NULL,
    MODIFY `access_token` MEDIUMTEXT NULL,
    MODIFY `id_token` TEXT NULL;

-- DropTable
DROP TABLE `example`;
