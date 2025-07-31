import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(){
  const products = await prisma.products.findMany()

  return NextResponse.json(products, {
    status: 200,
  });
}

export async function POST(request: NextRequest){
  const body = await request.json();
  const { name, price, description, stock, category, imageUrl, buyPrice, supplier, status } = body;
  const newProduct = await prisma.products.create({
    data: {name, price, description, stock, category, imageUrl, buyPrice, supplier, status  }
  })
  console.log(newProduct, 24);
  return NextResponse.json(newProduct, {
    status: 201,
  });
}