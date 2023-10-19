import { connectToMongoose } from "@/lib/mongoose/ConnectToMongoose";
import { userCollection } from "@/lib/mongoose/usersSchema";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
type Props = {
  params: {
    email: string;
  };
};

(async () => await connectToMongoose())();

export const GET = async (_: unknown, { params: { email } }: Props) => {
  const todos = await userCollection.find({ email }, { todos: 1 });

  return NextResponse.json(
    {
      todos,
    },
    { status: 200 }
  );
};

export const DELETE = async (
  req: NextRequest,
  { params: { email } }: Props
) => {
  const { searchParams } = req.nextUrl;
  const todoId = searchParams.get("todoId");
  await userCollection.updateOne(
    { email },
    {
      $pull: { todos: { _id: todoId } },
    }
  );
  return NextResponse.json(
    {
      msg: "Todo deleted successfully",
    },
    { status: 200 }
  );
};

export const POST = async (req: NextRequest, { params: { email } }: Props) => {
  const newTodo = await req.json();
  const todos = await userCollection.updateOne(
    { email },
    {
      $push: { todos: newTodo },
    }
  );

  return NextResponse.json({
    todos,
    msg: "Todo added successfully",
  });
};

export const PATCH = async (req: NextRequest, { params: { email } }: Props) => {
  try {
    const { isChecked, content } = await req.json();
    const { searchParams } = req.nextUrl;
    const todoId = searchParams.get("todoId");
    const type = searchParams.get("type");
    console.log({ todoId, type, content });
    if (type === "update") {
      await userCollection.updateOne(
        { email, "todos._id": new ObjectId(todoId as string) },
        {
          $set: { "todos.$.content": content, "todos.$.isChecked": false },
        }
      );

      return NextResponse.json(
        {
          msg: "Todo updated successfully",
        },
        { status: 200 }
      );
    } else {
      await userCollection.updateOne(
        { email, "todos._id": new ObjectId(todoId as string) },
        {
          $set: { "todos.$.isChecked": isChecked },
        }
      );

      return NextResponse.json(
        {
          msg: "Todo updated successfully",
        },
        { status: 200 }
      );
    }
  } catch (err) {
    console.log(err);
  }
};
