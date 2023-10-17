"use client";
import React from "react";
import { motion } from "framer-motion";
import { ChildrenType } from "@/lib/types/children";

type Props = {
  i: number;
  className: string;
} & ChildrenType;
const FramerWrapperFadeIn = ({ children, i, className }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.5, 1] }}
      transition={{ delay: 0.075 * i }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FramerWrapperFadeIn;
