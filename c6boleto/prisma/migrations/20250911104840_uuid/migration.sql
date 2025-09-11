/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `BankSlip` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uuid` to the `BankSlip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."BankSlip" ADD COLUMN     "uuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BankSlip_uuid_key" ON "public"."BankSlip"("uuid");
