import React from "react";
import Task from "./Task/Task";
import { getAllTodos } from "@/lib/todos/getAllTodos";
import { TodoType } from "@/lib/types/todo";
import { getServerSession } from "next-auth";
import FramerWrapperFadeIn from "../../components/(shared)/animations/framerWrapperFadeIn";
import { authOptions } from "@/lib/auth/AuthOptions";
import FadeIn from "../../components/(shared)/animations/FadeIn";

const Tasks = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.userId;
  const promise = await getAllTodos(userId);

  const todos = await promise?.todos;
  console.log({ todos });
  return (
    <div className="tasks overflow-y-auto overflow-x-hidden mx-auto flex flex-col gap-4  h-[65%] ">
      {todos?.length ? (
        <>
          {todos?.map((todo: TodoType, i: number) => {
            return (
              <FramerWrapperFadeIn
                key={todo._id}
                i={i}
                _id={todo._id + "50" || ""}
                className="flex items-center w-full min-h-[50px] border-2 border-white/80 text-white/70 px-2 justify-between"
              >
                <Task {...todo} i={i} />
              </FramerWrapperFadeIn>
            );
          })}
        </>
      ) : (
        <FadeIn key="no-todos" className="m-auto text-white/60   ">
          No todos to show
        </FadeIn>
      )}
    </div>
  );
};

export default Tasks;
