"use client";
import React from "react";
import { useFormContext, FieldErrors } from "react-hook-form";
import { IconType } from "react-icons";
import ErrorInput from "./ErrorInput";

type Props = {
  Icon: IconType;
  type: string;
  placeholder: string;
  name: string;
};

const Input = ({ name, Icon, type, placeholder }: Props) => {
  const [isIconClicked, setIsIconClicked] = React.useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const handleToggleInputType = () => {
    if (type === "password") {
      setIsIconClicked(!isIconClicked);
    }
  };

  const err = errors ? errors[name]?.message?.toString() : "";

  return (
    <div className="relative ">
      <input
        {...register(name)}
        placeholder={placeholder}
        type={isIconClicked && type === "password" ? "text" : type}
        className="outline-0  border-body peer h-11 bg-transparent border focus:border-white/50  w-full flex justify-center items-center gap-8 text-white/60  p-2 rounded text-sm"
      />

      <Icon
        size={18}
        className="peer-focus:opacity-100 absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 text-white/80 transition"
        onClick={handleToggleInputType}
      />
      <ErrorInput err={err || ""} />
    </div>
  );
};

export default Input;
