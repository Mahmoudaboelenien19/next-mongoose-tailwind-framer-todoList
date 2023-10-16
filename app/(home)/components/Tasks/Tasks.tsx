import React from "react";
import Task from "./Task";

const Tasks = () => {
  return (
    <div className=" mx-auto flex flex-col gap-4">
      <Task />
      <Task />
    </div>
  );
};

export default Tasks;
