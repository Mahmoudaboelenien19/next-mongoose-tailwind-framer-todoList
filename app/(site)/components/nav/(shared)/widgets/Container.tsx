import { ChildrenType } from "@/lib/types/children";
import React from "react";
import clsx from "clsx";
type Props = {
  className?: string;
} & ChildrenType;
const Container = ({ children, className }: Props) => {
  return (
    <div
      className={clsx(
        "h-[calc(100vh_-_50px)]  mt-12 w-full flex items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
