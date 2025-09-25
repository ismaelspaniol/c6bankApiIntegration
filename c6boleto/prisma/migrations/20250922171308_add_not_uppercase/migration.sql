/*
  Warnings:

  - Changed the type of `type` on the `cash_flow` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `stock_movement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."stock_moviment_type" AS ENUM ('INPUT', 'OUTPUT');

-- CreateEnum
CREATE TYPE "public"."cash_flow_type" AS ENUM ('INPUT', 'OUTPUT');

-- CreateEnum
CREATE TYPE "public"."order_type" AS ENUM ('SALE', 'RETURN');

-- AlterTable
ALTER TABLE "public"."cash_flow" DROP COLUMN "type",
ADD COLUMN     "type" "public"."cash_flow_type" NOT NULL;

-- AlterTable
ALTER TABLE "public"."order" DROP COLUMN "type",
ADD COLUMN     "type" "public"."order_type" NOT NULL;

-- AlterTable
ALTER TABLE "public"."stock_movement" DROP COLUMN "type",
ADD COLUMN     "type" "public"."stock_moviment_type" NOT NULL;

-- DropEnum
DROP TYPE "public"."CashFlowType";

-- DropEnum
DROP TYPE "public"."OrderType";

-- DropEnum
DROP TYPE "public"."StockMovimentType";
