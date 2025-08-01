-- CreateTable
CREATE TABLE "public"."receiveables" (
    "orderId" TEXT NOT NULL,
    "total" INTEGER NOT NULL,

    CONSTRAINT "receiveables_pkey" PRIMARY KEY ("orderId")
);
