-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "date" TEXT,
    "total" INTEGER NOT NULL,
    "statusOrder" TEXT,
    "statusPayment" TEXT,
    "deadline" TEXT NOT NULL,
    "products" JSONB NOT NULL,
    "deliveryDate" TEXT NOT NULL,
    "deliveryAddress" TEXT NOT NULL,
    "statusDelivery" TEXT,
    "note" TEXT,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
