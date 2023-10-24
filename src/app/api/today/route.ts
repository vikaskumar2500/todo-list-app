import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const data = await prisma.todo.findMany({
    where: { completed: false },
  });

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { completed, description, task_name } = await req.json();
  const response = await prisma.todo.create({
    data: {
      completed,
      description,
      task_name,
    },
  });
  return NextResponse.json(response);
}


export async function DELETE(req: NextRequest) {
  const { id }: { id: string } = await req.json();

  const res = await prisma.todo.deleteMany({
    where: {
      id: id,
    },
  });
  return NextResponse.json(res);
}
