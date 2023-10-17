import FramerWrapperFadeIn from "@/app/(shared)/framerWrapperFadeIn";
import { TodoType } from "@/lib/types/todo";
import React from "react";
import { AiFillDelete, AiFillCheckCircle } from "react-icons/ai";
import { HiPencilAlt } from "react-icons/hi";

type Props = {
  i: number;
} & TodoType;
const Task = ({ _id, content, isChecked, i }: Props) => {
  return (
    <FramerWrapperFadeIn
      i={i}
      className="flex items-center w-full h-12 border-2 border-white/80 text-white/70 px-2 justify-between"
    >
      <span>{content}</span>

      <div className="flex gap-2 justify-center items-center w-1/5">
        <AiFillCheckCircle color="#a59c3a" />
        <HiPencilAlt color="#178283" />
        <AiFillDelete color="#ee7c75" />
      </div>
    </FramerWrapperFadeIn>
  );
};

export default Task;
