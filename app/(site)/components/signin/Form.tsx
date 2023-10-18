"use client";
import React from "react";
import GoogleLoginButton from "./GoogleButton";

const Form = () => {
  return (
    <form
      className="rounded bg-todo w-[95%] max-w-[400px] h-3/4 p-8"
      onSubmit={(e) => e.preventDefault()}
    >
      <GoogleLoginButton />
    </form>
  );
};

export default Form;
