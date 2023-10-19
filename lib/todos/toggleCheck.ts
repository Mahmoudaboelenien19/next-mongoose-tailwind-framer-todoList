import { apiUrl } from "../url";

const toggleCheck = async (
  email: string,
  todoId: string,
  isChecked: boolean
) => {
  const res = await fetch(apiUrl + "/todos/" + email + "?todoId=" + todoId, {
    method: "PATCH",
    body: JSON.stringify({ isChecked }),
  });

  if (res.status === 200) {
    return await res.json();
  }
  return;
};

export default toggleCheck;
