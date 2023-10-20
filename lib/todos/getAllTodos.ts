import { apiUrl } from "../url";

export const getAllTodos = async (id?: string) => {
  if (id) {
    const res = await fetch(apiUrl + `/todos/${id}`, {
      next: {
        // tags: ["getAllTodos"],

        revalidate: 0,
      },
    });
    if (!res.ok) return;

    return res;
  } else {
    return null;
  }
};
