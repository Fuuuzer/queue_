/*
  Warnings:

  - Added the required column `userId` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tickets" ADD COLUMN "userId" TEXT;

-- update to add userId to all tables of tickets
UPDATE "tickets" SET "userId" = 'e45c65e8-cca3-476d-aae5-e439d864633b';

--ALTER TABLE AGAIN
ALTER TABLE "tickets" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
