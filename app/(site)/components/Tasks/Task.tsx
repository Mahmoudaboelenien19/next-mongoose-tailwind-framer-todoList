import { TodoType } from "@/lib/types/todo";
import React, { Fragment } from "react";
import Buttons from "./Buttons";
import FramerChecked from "../(shared)/animations/FramerChecked";

type Props = {
  i: number;
} & TodoType;
const Task = ({ _id, content, isChecked, i }: Props) => {
  return (
    <Fragment>
      <FramerChecked _id={_id || ""} isChecked={isChecked}>
        {content}
      </FramerChecked>
      <Buttons _id={_id || ""} isChecked={isChecked} content={content} />
    </Fragment>
  );
};

export default Task;
