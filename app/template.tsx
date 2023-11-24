"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const variants = {
    hidden: { opacity: 0, x: pathname === "/" ? 50 : -50, y: 10, scale: 0.9 },
    enter: { opacity: 1, x: 0, y: 0, scale: 1 },
    exit: { y: 500 },
  };
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        variants={variants}
        initial="hidden"
        exit="exit"
        animate="enter"
        transition={{ type: "spring", duration: 0.2 }}
        className="m-0  h-[calc(100vh_-_50px)]  mt-12 w-full flex items-center justify-center "
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
