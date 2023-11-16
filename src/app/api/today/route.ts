import { Todo } from "@/context-api/todo-context";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const data = await prisma.todo.findMany({
    where: { completed: false },
  });

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { id, completed, description, task_name }: Todo = await req.json();
  try {
    const data = await prisma.todo.create({
      data: {
        completed,
        description,
        task_name,
      },
    });
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json("Something went wrong!");
  }
}

export async function DELETE(req: NextRequest) {
  const { id }: { id: string } = await req.json();
  console.log(id);
  const res = await prisma.todo.delete({
    where: {
      id: id,
    },
  });
  console.log(res);
  return NextResponse.json(res);
}

export async function PUT(req: NextRequest) {
  const { id, description, task_name, completed }: Todo = await req.json();
  // console.log(body);
  try {
    const data = await prisma.todo.update({
      where: { id: id },
      data: {
        completed,
        description,
        task_name,
      },
    });
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}
