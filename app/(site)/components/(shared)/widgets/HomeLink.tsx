import Link from "next/link";
import React from "react";
import { AiOutlineLeft } from "react-icons/ai";

const HomeLink = () => {
  return (
    <Link
      href={"/"}
      className=" absolute -top-10  left-0 lg:-left-5 text-white/60                                0 flex gap-2 justify-center items-center"
    >
      <AiOutlineLeft />
      <span>Home</span>
    </Link>
  );
};

export default HomeLink;
