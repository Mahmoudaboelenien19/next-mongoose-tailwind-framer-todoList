"use client";
import React from "react";
import { IconType } from "react-icons";
type Props = {
  Icon: IconType;
  type: string;
  onChagne: (e: any) => void;
  placeholder: string;
};
const Input = ({ Icon, type, placeholder, onChagne }: Props) => {
  const [isIconClicked, setIsIconClicked] = React.useState(false);

  const handleToggleInputType = () => {
    if (type === "password") {
      setIsIconClicked(!isIconClicked);
    }
  };
  return (
    <div className="relative ">
      <input
        onChange={onChagne}
        placeholder={placeholder}
        type={isIconClicked && type === "password" ? "text" : type}
        className="outline-0  border-body peer h-12 bg-transparent border focus:border-white/50  w-full flex justify-center items-center gap-8 text-white/60  p-2 rounded"
      />

      <Icon
        size={20}
        className="peer-focus:opacity-100 absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 text-white/80 transition"
        onClick={handleToggleInputType}
      />
    </div>
  );
};

export default Input;
