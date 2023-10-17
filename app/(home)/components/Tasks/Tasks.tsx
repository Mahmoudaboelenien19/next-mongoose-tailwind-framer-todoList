import React from "react";
import Task from "./Task";
import { getAllTodos } from "@/lib/todos/getAllTodos";
import { TodoType } from "@/lib/types/todo";

const Tasks = async () => {
  const promise = await getAllTodos("652dc832a357b0fc4b93d5d7");
  const todos = promise?.todos?.todos || [];

  return (
    <div className=" mx-auto flex flex-col gap-4">
      {todos?.map((todo: TodoType, i: number) => {
        return <Task key={todo._id} {...todo} i={i} />;
      })}
    </div>
  );
};

export default Tasks;
