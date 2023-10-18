import React from "react";
import Task from "./Task";
import { getAllTodos } from "@/lib/todos/getAllTodos";
import { TodoType } from "@/lib/types/todo";
import { AnimatePresence } from "framer-motion";
import FramerWrapperFadeIn from "../nav/(shared)/framerWrapperFadeIn";

const Tasks = async () => {
  const promise = await getAllTodos("652dc832a357b0fc4b93d5d7");
  const todos = promise?.todos?.todos || [];

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
