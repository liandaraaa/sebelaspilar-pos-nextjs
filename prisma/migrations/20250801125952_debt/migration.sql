-- CreateTable
CREATE TABLE "public"."debts" (
    "id" TEXT NOT NULL,
    "debtName" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "debts_pkey" PRIMARY KEY ("id")
);
