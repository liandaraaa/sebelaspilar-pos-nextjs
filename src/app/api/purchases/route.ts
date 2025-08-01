import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(){
  const purchases = await prisma.purchases.findMany()

  return NextResponse.json(purchases, {
    status: 200,
  });
}

export async function POST(request: NextRequest){
  const body = await request.json();
  const { productId, quantity, total, status } = body;
  const newPurchase = await prisma.purchases.create({
    data: {productId, quantity, total, status  }
  })
  console.log(newPurchase, 24);
  return NextResponse.json(newPurchase, {
    status: 201,
  });
}