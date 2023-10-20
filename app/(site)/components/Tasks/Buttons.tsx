"use client";
import deleteTodo from "@/lib/todos/deleteToDo";
import toggleCheck from "@/lib/todos/toggleCheck";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiFillDelete, AiFillCheckCircle } from "react-icons/ai";
import { HiPencilAlt } from "react-icons/hi";
import { toast } from "sonner";

type Props = { _id: string; isChecked: boolean; content: string };
const Buttons = ({ _id, isChecked, content }: Props) => {
  const router = useRouter();

  const { data: session } = useSession();
  const handleDelete = async () => {
    const res = deleteTodo(session?.user?.userId || "", _id);
    toast.promise(res, {
      loading: "Loading...",
      success: (data: { msg: string }) => {
        return `${data.msg} `;
      },
      error: "Error",
    });
    router.refresh();
  };

  const handleCheck = async () => {
    const res = toggleCheck(session?.user?.userId || "", _id, !isChecked);
    toast.promise(res, {
      loading: "Loading...",
      success: (data: { msg: string }) => {
        return `${data.msg} `;
      },
      error: "Error",
    });
    router.refresh();
  };

  const update = async () => {
    router.push(`?update=${content}&todoId=${_id}`);
  };
  return (
    <div className="flex gap-2 justify-center items-center w-1/5">
      <AiFillCheckCircle color="#a59c3a" onClick={handleCheck} />
      <HiPencilAlt color="#178283" onClick={update} />
      <AiFillDelete color="#ee7c75" onClick={handleDelete} />
    </div>
  );
};

export default Buttons;
