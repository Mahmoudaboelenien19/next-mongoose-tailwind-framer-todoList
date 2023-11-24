import Link from "next/link";
import React from "react";
import { AiOutlineLeft } from "react-icons/ai";
import FramerWrapperFadeIn from "../animations/framerWrapperFadeIn";

const HomeLink = () => {
  return (
    <FramerWrapperFadeIn
      _id="home_link"
      delay={1}
      className="absolute -top-8  left-0"
    >
      <Link
        href={"/"}
        className="   lg:-left-5 text-white/60 font-semibold flex gap-2 justify-center items-center text-sm"
      >
        <AiOutlineLeft />
        <span>Home</span>
      </Link>
    </FramerWrapperFadeIn>
  );
};

export default HomeLink;
