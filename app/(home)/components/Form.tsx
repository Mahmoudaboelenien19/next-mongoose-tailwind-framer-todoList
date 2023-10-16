import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
const Form = () => {
  return (
    <form className="w-full h-12 flex justify-between  my-10 mx-auto text-xs md:text-base ">
      <input
        type="text"
        placeholder="What needs to be done "
        className="border-0 outline-none h-full pl-2 rounded-l w-[80%]"
      />
      <button className="bg-body border-0 rounded-r text-white w-1/5 flex gap-1 justify-center items-center font-medium p-2">
        <span> Add</span> <FiArrowUpRight />
      </button>
    </form>
  );
};

export default Form;
