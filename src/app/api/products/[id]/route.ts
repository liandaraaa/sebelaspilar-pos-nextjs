
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
   request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
){
  const products = await prisma.products.findMany({
    where:{
      id:(await params).id
    }
  })

  return NextResponse.json(products[0], {
    status: 200,
  });
}


export async function PATCH(request: NextRequest){
  const body = await request.json();
  const { id, name, price, description, stock, category, imageUrl, buyPrice, supplier, status  } = body;

  const updateProduct = await prisma.products.update({
    where: { id },
    data: { name, price, description, stock, category, imageUrl, buyPrice, supplier, status  }
  })

  return NextResponse.json(updateProduct, {
    status: 200,
  })
}

export async function DELETE(request: NextRequest, 
  { params }: { params: Promise<{ id: string }> },){
  const id = (await params).id;

  const deleteProduct = await prisma.products.delete({
    where: { id }
  })

  return NextResponse.json(deleteProduct, {
    status: 200,
  });
}
