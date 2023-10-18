"use client";
import deleteTodo from "@/lib/todos/deleteToDo";
import { useRouter } from "next/navigation";
import React from "react";
import { AiFillDelete, AiFillCheckCircle } from "react-icons/ai";
import { HiPencilAlt } from "react-icons/hi";

type Props = { _id: string };
const Buttons = ({ _id }: Props) => {
  const router = useRouter();
  const handleDelete = async () => {
    const res = await deleteTodo("652dc832a357b0fc4b93d5d7", _id);
    router.refresh();
  };
  return (
    <div className="flex gap-2 justify-center items-center w-1/5">
      <AiFillCheckCircle color="#a59c3a" />
      <HiPencilAlt color="#178283" />
      <AiFillDelete color="#ee7c75" onClick={handleDelete} />
    </div>
  );
};

export default Buttons;

/* 
i can import client com inside server component and still server


*/
