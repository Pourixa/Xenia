-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_commenterId_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "followship" DROP CONSTRAINT "followship_followerId_fkey";

-- DropForeignKey
ALTER TABLE "followship" DROP CONSTRAINT "followship_followingId_fkey";

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_likerId_fkey";

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_postId_fkey";

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_authorId_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "about" TEXT,
ADD COLUMN     "avatar_url" TEXT,
ADD COLUMN     "name" TEXT;

-- AddForeignKey
ALTER TABLE "followship" ADD CONSTRAINT "followship_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "followship" ADD CONSTRAINT "followship_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_likerId_fkey" FOREIGN KEY ("likerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_commenterId_fkey" FOREIGN KEY ("commenterId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
