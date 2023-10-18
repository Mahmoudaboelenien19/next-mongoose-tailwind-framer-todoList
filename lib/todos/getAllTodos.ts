import { apiUrl } from "../url";

export const getAllTodos = async (id: string) => {
  const res = await fetch(apiUrl + `/todos/${id}`, {
    next: { tags: ["getAllTodos"] },
  });
  if (!res.ok) return;
  console.log("status ", res.status);
  return await res.json();
};
