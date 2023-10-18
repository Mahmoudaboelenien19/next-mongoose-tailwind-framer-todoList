import { TodoType } from "../types/todo";
import { apiUrl } from "../url";
import { revalidateALlTodos } from "./revalidiateFn";

const AddTodo = async (id: string, todo: TodoType) => {
  const res = await fetch(apiUrl + "/todos/" + id, {
    method: "POST",
    body: JSON.stringify(todo),
  });

  if (res.status === 200) {
    await revalidateALlTodos();
  }
  return await res.json();
};

export default AddTodo;
