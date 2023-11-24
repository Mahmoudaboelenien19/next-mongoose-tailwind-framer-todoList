import { apiUrl } from "../url";

export const getAllTodos = async (id?: string) => {
  if (id) {
    const res = await fetch(
      process.env.NEXTAUTH_URL + apiUrl + `/todos/${id}`,
      {
        next: { tags: ["todos"] },
      }
    );
    if (!res.ok) return;
    return await res.json();
  } else {
    return null;
  }
};
