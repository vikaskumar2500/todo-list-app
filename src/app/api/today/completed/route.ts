import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const res = await prisma.todo.findMany({
    where: {
      completed: true,
    },
  });

  return NextResponse.json(res);
}

export const DELETE = async (req: NextRequest) => {
  const { id }: { id: string } = await req.json();

  const res = await prisma.todo.deleteMany({
    where: { id: id },
  });
  return NextResponse.json(res);
};
