import { apiUrl } from "../url";
import { revalidateALlTodos } from "./revalidiateFn";

const deleteTodo = async (id: string, todoId: string) => {
  const res = await fetch(apiUrl + "/todos/" + id + `?todoId=${todoId}`, {
    method: "DELETE",
  });
  if (res.status === 200) {
    return await res.json();
  }
  return;
};

export default deleteTodo;
