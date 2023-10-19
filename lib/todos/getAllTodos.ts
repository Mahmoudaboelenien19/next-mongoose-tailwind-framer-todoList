import { apiUrl } from "../url";

export const getAllTodos = async (email?: string) => {
  if (email) {
    const res = await fetch(apiUrl + `/todos/${email}`, {
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
