"use client";
import AddTodo from "@/lib/todos/AddTodo";
import { TodoType } from "@/lib/types/todo";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import { FiArrowUpRight } from "react-icons/fi";
const Form = () => {
  const router = useRouter();
  const [todo, setTodo] = React.useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };
  const addToDoFn = async () => {
    const todoObj: TodoType = {
      content: todo || "",
      isChecked: false,
    };
    if (todoObj?.content !== "") {
      const res = await AddTodo("652dc832a357b0fc4b93d5d7", todoObj);
      router.refresh();
    }
  };

  const handleSUbmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={handleSUbmit}
      className="w-full h-12 flex justify-between  my-10 mx-auto text-xs md:text-base "
    >
      <input
        onChange={handleChange}
        type="text"
        placeholder="What needs to be done "
        className="border-0 outline-none h-full pl-2 rounded-l w-[80%]"
      />
      <button
        className="bg-body border-0 rounded-r text-white w-1/5 flex gap-1 justify-center items-center font-medium p-2"
        onClick={addToDoFn}
      >
        <span> Add</span> <FiArrowUpRight />
      </button>
    </form>
  );
};

export default Form;
