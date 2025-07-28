import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(){
  const users = await prisma.users.findMany({
    where: {
      deletedAt: null
    }
  })

  return NextResponse.json(users, {
    status: 200,
  });
}

export async function POST(request: NextRequest){
  const body = await request.json();
  const { name, email, password } = body;
  const newUser = await prisma.users.create({
    data: { name, email, password }
  })
  console.log(newUser, 24);
  return NextResponse.json(newUser, {
    status: 201,
  });
}

export async function PATCH(request: NextRequest){
  const body = await request.json();
  const { id, name, email, password } = body;

  const updateUser = await prisma.users.update({
    where: { id },
    data: { name, email, password }
  })

  return NextResponse.json(updateUser, {
    status: 200,
  })
}

export async function DELETE(request: NextRequest){
  const body = await request.json();
  const { id } = body;

  const deleteUser = await prisma.users.update({
    where: { id },
    data: { deletedAt: new Date() }
  })

  return NextResponse.json(deleteUser, {
    status: 200,
  });
}