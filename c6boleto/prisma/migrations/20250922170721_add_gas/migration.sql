-- CreateEnum
CREATE TYPE "public"."StockMovimentType" AS ENUM ('INPUT', 'OUTPUT');

-- CreateEnum
CREATE TYPE "public"."CashFlowType" AS ENUM ('INPUT', 'OUTPUT');

-- CreateEnum
CREATE TYPE "public"."OrderType" AS ENUM ('SALE', 'RETURN');

-- CreateTable
CREATE TABLE "public"."product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "enterprise_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    "city_ibge_code" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "bullshit" TEXT NOT NULL,
    "enterprise_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."city" (
    "ibge_code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "ibge_state_code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("ibge_code")
);

-- CreateTable
CREATE TABLE "public"."customer_phone" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_phone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."stock_movement" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "public"."StockMovimentType" NOT NULL,
    "product_id" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "observation" TEXT NOT NULL,
    "enterprise_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stock_movement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."cash_flow" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "public"."CashFlowType" NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "observation" TEXT NOT NULL,
    "enterprise_id" INTEGER NOT NULL,
    "cash_flow_group_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cash_flow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."cash_flow_group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "enterprise_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cash_flow_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."order" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "enterprise_id" INTEGER NOT NULL,
    "cash_flow_group_id" INTEGER NOT NULL,
    "type" "public"."OrderType" NOT NULL,
    "observation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."order_product" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "public"."enterprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."customer" ADD CONSTRAINT "customer_city_ibge_code_fkey" FOREIGN KEY ("city_ibge_code") REFERENCES "public"."city"("ibge_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."customer" ADD CONSTRAINT "customer_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "public"."enterprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."customer_phone" ADD CONSTRAINT "customer_phone_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stock_movement" ADD CONSTRAINT "stock_movement_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stock_movement" ADD CONSTRAINT "stock_movement_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "public"."enterprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."cash_flow" ADD CONSTRAINT "cash_flow_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "public"."enterprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."cash_flow" ADD CONSTRAINT "cash_flow_cash_flow_group_id_fkey" FOREIGN KEY ("cash_flow_group_id") REFERENCES "public"."cash_flow_group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."cash_flow_group" ADD CONSTRAINT "cash_flow_group_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "public"."enterprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order" ADD CONSTRAINT "order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order" ADD CONSTRAINT "order_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "public"."enterprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order" ADD CONSTRAINT "order_cash_flow_group_id_fkey" FOREIGN KEY ("cash_flow_group_id") REFERENCES "public"."cash_flow_group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_product" ADD CONSTRAINT "order_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_product" ADD CONSTRAINT "order_product_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
