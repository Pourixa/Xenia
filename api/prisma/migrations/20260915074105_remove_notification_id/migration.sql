/*
  Warnings:

  - You are about to drop the column `notificationId` on the `followship` table. All the data in the column will be lost.
  - You are about to drop the column `notificationId` on the `like` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "followship" DROP COLUMN "notificationId";

-- AlterTable
ALTER TABLE "like" DROP COLUMN "notificationId";
