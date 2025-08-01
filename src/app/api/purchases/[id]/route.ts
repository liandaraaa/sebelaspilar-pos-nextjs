
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
   request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
){
  const purchases = await prisma.purchases.findMany({
    where:{
      id:(await params).id
    }
  })

  return NextResponse.json(purchases[0], {
    status: 200,
  });
}


export async function PATCH(request: NextRequest){
  const body = await request.json();
  const { id, productId, quantity, total, status  } = body;

  const updatedPurchase = await prisma.purchases.update({
    where: { id },
    data: { productId, quantity, total, status  }
  })

  return NextResponse.json(updatedPurchase, {
    status: 200,
  })
}

export async function DELETE(request: NextRequest, 
  { params }: { params: Promise<{ id: string }> },){
  const id = (await params).id;

  const deletedPurchase = await prisma.purchases.delete({
    where: { id }
  })

  return NextResponse.json(deletedPurchase, {
    status: 200,
  });
}
