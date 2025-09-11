/*
  Warnings:

  - You are about to drop the column `c6banckReturned` on the `BankSlip` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."BankSlip" DROP COLUMN "c6banckReturned",
ADD COLUMN     "banckReturned" JSONB,
ADD COLUMN     "banckReturnedError" JSONB;
