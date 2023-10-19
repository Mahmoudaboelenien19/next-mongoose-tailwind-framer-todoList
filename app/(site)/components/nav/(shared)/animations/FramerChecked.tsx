"use client";

import { ChildrenType } from "@/lib/types/children";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  isChecked: boolean;
  _id: string;
} & ChildrenType;
const FramerChecked = ({ _id, children, isChecked }: Props) => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{
        opacity: isChecked ? [1, 0.5] : 1,
        transition: { ease: [0.65, 0, 0.35, 1], delay: !isChecked ? 0.35 : 0 },
      }}
    >
      <AnimatePresence>
        {isChecked && (
          <motion.div
            key={_id}
            className="absolute top-1/2 left-0 h-[2px] bg-red-500 z-10"
            initial={{ width: "0%" }}
            animate={{
              width: "100%",
              transition: { delay: 0.35, ease: [0.65, 0, 0.35, 1] },
            }}
            exit={{
              width: "0%",
              transition: { delay: 0, ease: [0.65, 0, 0.35, 1] },
            }}
          />
        )}
      </AnimatePresence>
      {children}
    </motion.div>
  );
};

export default FramerChecked;
