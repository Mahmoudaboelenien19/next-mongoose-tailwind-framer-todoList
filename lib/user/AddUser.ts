import { toast } from "sonner";
import { UserType } from "../types/user";
import { apiUrl } from "../url";

export const AddUser = async (user: UserType) => {
  const res = await fetch(apiUrl + "/users/signup", {
    method: "POST",
    body: JSON.stringify(user),
  });
  const status = res.status;
  if (!res.ok) return;
  const data = await res.json();
  return { msg: data.msg, status };
};
