"use client";
import AddTodo from "@/lib/todos/AddTodo";
import { TodoType } from "@/lib/types/todo";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { FormEvent, useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { toast } from "sonner";

const Form = () => {
  const [err, setErr] = useState({ msg: "", hasError: false });
  const router = useRouter();
  const [todo, setTodo] = React.useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
    if (err.hasError && e.target.value.length < 25) {
      setErr({ hasError: false, msg: "" });
    }
  };
  const addToDoFn = async () => {
    const todoObj: TodoType = {
      content: todo || "",
      isChecked: false,
    };
    if (todoObj?.content !== "" && todoObj?.content.length < 25) {
      if (err.hasError) {
        setErr({ ...err, hasError: false });
      }
      const res = AddTodo("652dc832a357b0fc4b93d5d7", todoObj);

      toast.promise(res, {
        loading: "Loading...",
        success: (data: { msg: string }) => {
          formRef.current?.reset();
          setTodo("");
          return `${data.msg} `;
        },
        error: "Error",
      });
      router.refresh();
    } else if (todoObj?.content.length >= 25) {
      setErr({ hasError: true, msg: "you can't exceed 24 letter." });
    } else {
      setErr({ hasError: true, msg: "add a todo ... !" });
    }
  };

  const handleSUbmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <form
      ref={formRef}
      onSubmit={handleSUbmit}
      className="w-full h-12 flex justify-between  my-10 mx-auto text-xs md:text-base relative "
    >
      <AnimatePresence>
        {err.hasError && (
          <motion.div
            key="err"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 1] }}
            exit={{ opacity: [1, 0.5, 0] }}
            className="absolute top-[calc(100%_+_5px)]  left-0 w-full h-4  text-center text-red-700  font-semibold "
          >
            {err.msg}
          </motion.div>
        )}
      </AnimatePresence>
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
