import { apiUrl } from "../url";

const updateTodo = async (email: string, todoId: string, content: string) => {
  const res = await fetch(
    apiUrl + "/todos/" + email + "?todoId=" + todoId + "&type=update",
    {
      method: "PATCH",
      body: JSON.stringify({ content }),
    }
  );

  if (res.status === 200) {
    return await res.json();
  }
  return;
};

export default updateTodo;
