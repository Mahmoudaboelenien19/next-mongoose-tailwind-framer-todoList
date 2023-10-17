import { userCollection } from "@/lib/mongoose/usersSchema";
import { NextRequest, NextResponse } from "next/server";
type Props = {
  params: {
    id: string;
  };
};
export const GET = async (_: unknown, { params: { id } }: Props) => {
  const todos = await userCollection.findById(id, { todos: 1 });
  console.log(todos);
  return NextResponse.json({
    todos,
  });
};
