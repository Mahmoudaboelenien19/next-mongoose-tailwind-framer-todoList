import { apiUrl } from "../url";

export const getAllTodos = async (id: string) => {
  const res = await fetch(apiUrl + `/todos/${id}`);
  if (!res.ok) return;

  return await res.json();
};
