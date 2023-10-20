import { apiUrl } from "../url";

const toggleCheck = async (id: string, todoId: string, isChecked: boolean) => {
  const res = await fetch(apiUrl + "/todos/" + id + "?todoId=" + todoId, {
    method: "PATCH",
    body: JSON.stringify({ isChecked }),
  });

  if (res.status === 200) {
    return await res.json();
  }
  return;
};

export default toggleCheck;
