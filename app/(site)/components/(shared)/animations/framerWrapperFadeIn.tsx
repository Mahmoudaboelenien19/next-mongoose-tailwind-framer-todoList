"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChildrenType } from "@/lib/types/children";

type Props = {
  i?: number;
  className?: string;
  _id: string;
  delay?: number;
} & ChildrenType;
const FramerWrapperFadeIn = ({
  children,
  i = 0,
  className = "",
  _id,
  delay = 0,
}: Props) => {
  return (
    <AnimatePresence>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 1] }}
        exit={{ opacity: [1, 0.5, 0] }}
        transition={{ delay: delay + 0.075 * i }}
        className={className}
        key={_id}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default FramerWrapperFadeIn;
