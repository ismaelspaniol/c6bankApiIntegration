-- CreateTable
CREATE TABLE "public"."BankSlip" (
    "id" SERIAL NOT NULL,
    "externalReferenceId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "instructions" TEXT[],
    "discount" JSONB NOT NULL,
    "interest" JSONB NOT NULL,
    "fine" JSONB NOT NULL,
    "billingScheme" TEXT NOT NULL,
    "ourNumber" TEXT NOT NULL,
    "payerName" TEXT NOT NULL,
    "payerTaxId" TEXT NOT NULL,
    "payerEmail" TEXT NOT NULL,
    "payerAddress" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BankSlip_pkey" PRIMARY KEY ("id")
);
