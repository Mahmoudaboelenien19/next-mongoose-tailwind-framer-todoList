import { TodoType } from "@/lib/types/todo";
import React, { Fragment } from "react";
import Buttons from "./Buttons";

type Props = {
  i: number;
} & TodoType;
const Task = ({ _id, content, isChecked, i }: Props) => {
  return (
    <Fragment>
      <span>{content}</span>
      <Buttons _id={_id || ""} />
    </Fragment>
  );
};

export default Task;
