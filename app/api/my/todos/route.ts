// import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
// import { useSession } from "next-auth/react";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//To display all todos
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
//check if session is valid or not
    if (!session || !session.user || !session.user.id) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: No valid session" }),
        { status: 401 }
      );
    }
//Find in database
    const todos = await prisma.todo.findMany({
      where: { userId: Number(session.user.id) }
    });

    return new Response(JSON.stringify({ todos }), { status: 200 });
  } catch (error) {
    console.error("Fetch Todos Error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch todos",
        details: (error as Error).message
      }),
      { status: 500 }
    );
  }
}

//Mark a todo as completed
export async function PATCH(req: Request) {
  try {
    const { todoId } = await req.json();

    if (!todoId) {
      return new Response(JSON.stringify({ error: "todoId is required" }), {
        status: 400
      });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data: { isCompleted: true }
    });

    return new Response(JSON.stringify({ todo: updatedTodo }), { status: 200 });
  } catch (error: any) {
    console.error("Error in PATCH method:", error); // Log error details
    return new Response(
      JSON.stringify({
        error: "Failed to mark todo as done",
        details: error.message
      }),
      { status: 500 }
    );
  }
}

//For deleting a todo
export async function DELETE(req: Request) {
  try {
    const { todoId } = await req.json();

    if (!todoId) {
      return new Response(JSON.stringify({ error: "todoId is required" }), {
        status: 400
      });
    }

    await prisma.todo.delete({
      where: { id: todoId }
    });

    return new Response(
      JSON.stringify({ message: "Todo deleted successfully" }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in DELETE method:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to delete todo",
        details: error.message
      }),
      { status: 500 }
    );
  }
}

// For create a new todo
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: No valid session" }),
        { status: 401 }
      );
    }

    const data = await req.json();

    const newTodo = await prisma.todo.create({
      data: {
        title: data.title,
        description: data.description || undefined,
        priority: data.priority ? data.priority.toUpperCase() : "MEDIUM",
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        userId: Number(session.user.id)
      }
    });

    return new Response(
      JSON.stringify({ message: "Todo created", todo: newTodo }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Todo Creation Error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to create todo",
        details: (error as Error).message
      }),
      { status: 500 }
    );
  }
}
