
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
   request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
){
  const receiveables = await prisma.receiveables.findMany({
    where:{
      orderId:(await params).id
    }
  })

  return NextResponse.json(receiveables[0], {
    status: 200,
  });
}


export async function PATCH(request: NextRequest){
  const body = await request.json();
  const { orderId, total } = body;

  const updatedReceiveable = await prisma.receiveables.update({
    where: { orderId },
    data: { orderId, total  }
  })

  return NextResponse.json(updatedReceiveable, {
    status: 200,
  })
}

export async function DELETE(request: NextRequest, 
  { params }: { params: Promise<{ id: string }> },){
  const orderId = (await params).id;

  const deletedReceiveable = await prisma.receiveables.delete({
    where: { orderId }
  })

  return NextResponse.json(deletedReceiveable, {
    status: 200,
  });
}
