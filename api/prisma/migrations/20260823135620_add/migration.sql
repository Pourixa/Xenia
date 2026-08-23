/*
  Warnings:

  - You are about to drop the column `avatar_url` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[githubAccountID]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "avatar_url",
ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "githubAccountID" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_githubAccountID_key" ON "user"("githubAccountID");
