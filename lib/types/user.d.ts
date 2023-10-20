import { TodoType } from "./todo";

export type UserType = {
  name: string;
  email: string;
  password: string;
  todos?: TodoType[];
};
