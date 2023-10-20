import React from "react";
import Task from "./Task";
import { getAllTodos } from "@/lib/todos/getAllTodos";
import { TodoType } from "@/lib/types/todo";
import { getServerSession } from "next-auth";
import FramerWrapperFadeIn from "../(shared)/animations/framerWrapperFadeIn";
import { authOptions } from "@/lib/auth/AuthOptions";

const Tasks = async () => {
  const session = await getServerSession(authOptions);

  const userId = session?.user?.userId || "";
  const promise = await getAllTodos(userId);
  console.log({ userId });

  const res = await promise?.json();

  const todos = res?.todos?.todos;

  return (
    <div className=" mx-auto flex flex-col gap-4">
      {todos?.map((todo: TodoType, i: number) => {
        return (
          <FramerWrapperFadeIn
            key={todo._id}
            i={i}
            _id={todo._id + "50" || ""}
            className="flex items-center w-full h-12 border-2 border-white/80 text-white/70 px-2 justify-between"
          >
            <Task {...todo} i={i} />
          </FramerWrapperFadeIn>
        );
      })}
    </div>
  );
};

export default Tasks;
