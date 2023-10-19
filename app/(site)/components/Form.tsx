"use client";
import AddTodo from "@/lib/todos/AddTodo";
import updateTodo from "@/lib/todos/updateTodo";
import { TodoType } from "@/lib/types/todo";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { toast } from "sonner";
import ErrorInput from "./nav/(shared)/widgets/ErrorInput";

const Form = () => {
  const [err, setErr] = useState("");
  const search = useSearchParams();
  const updateVal = search.get("update") || "";
  const todoId = search.get("todoId") || "";
  const router = useRouter();
  const [todo, setTodo] = React.useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const { data: session } = useSession();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
    if (err && e.target.value.length < 25) {
      setErr("");
    }
  };
  const inpRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (updateVal && inpRef.current) {
      inpRef.current.value = updateVal;
      setTodo(updateVal);
    }
  }, [updateVal]);
  const addToDoFn = async () => {
    const email = session?.user?.email;
    const todoObj: TodoType = {
      content: todo || "",
      isChecked: false,
    };
    if (email) {
      if (todoObj?.content !== "" && todoObj?.content.length < 25) {
        if (err) {
          setErr("");
        }
        const res = AddTodo(email, todoObj);

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
        setErr("you can't exceed 24 letter.");
      } else {
        setErr("add a todo ... !");
      }
    } else {
      setErr("you must sign in to add todo ... !");
    }
  };

  const updateTodoFn = async () => {
    const email = session?.user?.email;

    if (email) {
      if (todo !== "" && todo.length < 25) {
        if (err) {
          setErr("");
        }
        const res = updateTodo(email, todoId, todo);

        toast.promise(res, {
          loading: "Loading...",
          success: (data: { msg: string }) => {
            formRef.current?.reset();
            router.push("/");
            setTodo("");
            return `${data.msg} `;
          },
          error: "Error",
        });
        router.refresh();
      } else if (todo.length >= 25) {
        setErr("you can't exceed 24 letter.");
      } else {
        setErr("add a todo ... !");
      }
    } else {
      setErr("you must sign in to add todo ... !");
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
      <ErrorInput err={err} />
      <input
        ref={inpRef}
        onChange={handleChange}
        type="text"
        placeholder="What needs to be done "
        className="border-0 outline-none h-full pl-2 rounded-l w-[80%]"
      />
      <button
        className="bg-body border-0 rounded-r text-white w-1/5 flex gap-1 justify-center items-center font-medium p-2"
        onClick={updateVal ? updateTodoFn : addToDoFn}
      >
        <span>{updateVal?.length >= 1 ? "Update" : "Add"}</span>{" "}
        <FiArrowUpRight />
      </button>
    </form>
  );
};

export default Form;
