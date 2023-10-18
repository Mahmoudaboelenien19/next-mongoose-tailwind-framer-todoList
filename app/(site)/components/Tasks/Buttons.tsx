"use client";
import deleteTodo from "@/lib/todos/deleteToDo";
import { useRouter } from "next/navigation";
import { AiFillDelete, AiFillCheckCircle } from "react-icons/ai";
import { HiPencilAlt } from "react-icons/hi";
import { toast } from "sonner";

type Props = { _id: string };
const Buttons = ({ _id }: Props) => {
  const router = useRouter();
  const handleDelete = async () => {
    const res = deleteTodo("652dc832a357b0fc4b93d5d7", _id);
    toast.promise(res, {
      loading: "Loading...",
      success: (data: { msg: string }) => {
        return `${data.msg} `;
      },
      error: "Error",
    });
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
