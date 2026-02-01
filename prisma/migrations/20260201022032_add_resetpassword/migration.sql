-- AlterTable
ALTER TABLE "User" ADD COLUMN     "expiredTokenPassword" TIMESTAMP(3),
ADD COLUMN     "resetTokenPassword" TEXT;
