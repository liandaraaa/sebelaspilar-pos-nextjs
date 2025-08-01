import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(){
  const receiveables = await prisma.receiveables.findMany()

  return NextResponse.json(receiveables, {
    status: 200,
  });
}

export async function POST(request: NextRequest){
  const body = await request.json();
  const { orderId, total } = body;
  const newReceiveable = await prisma.receiveables.create({
    data: {orderId, total  }
  })
  console.log(newReceiveable, 24);
  return NextResponse.json(newReceiveable, {
    status: 201,
  });
}