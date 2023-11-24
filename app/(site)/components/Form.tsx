"use client";
import AddTodo from "@/lib/todos/AddTodo";
import updateTodo from "@/lib/todos/updateTodo";
import { DataResponse, TodoType } from "@/lib/types/todo";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { toast } from "sonner";
import ErrorInput from "./(shared)/widgets/ErrorInput";
import MainBtn from "./(shared)/MainBtn";

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
    const userId = session?.user?.userId;
    const todoObj: TodoType = {
      content: todo || "",
      isChecked: false,
    };
    if (userId) {
      if (todoObj?.content !== "" && todoObj?.content.length < 25) {
        if (err) {
          setErr("");
        }
        const res = AddTodo(userId, todoObj);

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
    const userId = session?.user?.userId;

    if (userId) {
      if (todo !== "" && todo.length < 25) {
        if (err) {
          setErr("");
        }
        const res: Promise<DataResponse> = updateTodo(userId, todoId, todo);

        toast.promise(res, {
          loading: "Loading...",
          success: (data) => {
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
      <MainBtn
        className=" w-1/5 bg-body  rounded-r"
        onClick={updateVal ? updateTodoFn : addToDoFn}
        btn={updateVal?.length >= 1 ? "Update" : "Add"}
        Icon={FiArrowUpRight}
      />
    </form>
  );
};

export default Form;
