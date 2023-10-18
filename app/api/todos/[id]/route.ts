import { userCollection } from "@/lib/mongoose/usersSchema";
import { NextRequest, NextResponse } from "next/server";
type Props = {
  params: {
    id: string;
  };
};
export const GET = async (_: unknown, { params: { id } }: Props) => {
  const todos = await userCollection
    .findById(id, { todos: 1 })
    .sort({ _id: -1 });
  return NextResponse.json({
    todos,
  });
};

export const DELETE = async (req: NextRequest, { params: { id } }: Props) => {
  const { searchParams } = req.nextUrl;
  const todoId = searchParams.get("todoId");
  await userCollection.findByIdAndUpdate(id, {
    $pull: { todos: { _id: todoId } },
  });

  return NextResponse.json(
    {
      msg: "Todo deleted successfully",
    },
    { status: 200 }
  );
};

export const POST = async (req: NextRequest, { params: { id } }: Props) => {
  const newTodo = await req.json();
  const todos = await userCollection.findByIdAndUpdate(
    id,
    {
      $push: { todos: newTodo },
    },
    { new: true }
  );

  return NextResponse.json({
    todos,
    msg: "Todo added successfully",
  });
};
