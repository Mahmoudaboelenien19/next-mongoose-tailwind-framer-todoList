import React from "react";
import { AiFillDelete, AiFillCheckCircle } from "react-icons/ai";
import { HiPencilAlt } from "react-icons/hi";
const Task = () => {
  return (
    <div className="flex items-center w-full h-12 border-2 border-white/80 text-white/70 px-2 justify-between">
      <span>Task</span>

      <div className="flex gap-2 justify-center items-center w-1/5">
        <AiFillCheckCircle color="#a59c3a" />
        <HiPencilAlt color="#178283" />
        <AiFillDelete color="#ee7c75" />
      </div>
    </div>
  );
};

export default Task;
