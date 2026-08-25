/*
  Warnings:

  - Changed the type of `githubAccountID` on the `user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "githubAccountID",
ADD COLUMN     "githubAccountID" BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_githubAccountID_key" ON "user"("githubAccountID");
