import { apiUrl } from "../url";

export const revalidateALlTodos = async () => {
  await fetch(
    apiUrl +
      `/revalidate?tag=getAllTodos&secret=${process.env.NEXT_PUBLIC_REVALIDIATE_SECRET}`,
    { method: "POST", body: null }
  );
};
