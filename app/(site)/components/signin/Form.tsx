"use client";
import React, { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import GoogleLoginButton from "./GoogleButton";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Input from "../nav/(shared)/Input";

const Form = () => {
  const { data: session } = useSession();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  //not to open signin page if user authenticated
  if (session) {
    redirect("/");
  }
  const HandleSubmit = (e: any) => {
    e.preventDefault();
    signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: "http://localhost:3000",
    });
  };
  return (
    <form
      className=" relative rounded bg-todo w-[95%] max-w-[400px] h-3/4 p-8 flex flex-col justify-between"
      onSubmit={HandleSubmit}
    >
      <Link
        href={"/"}
        className="absolute -top-10 -left-5 text-white/60                                0 flex gap-2 justify-center items-center"
      >
        <AiOutlineLeft />
        <span>Home</span>
      </Link>
      <span className="text-center text-white/40 ">
        <h1 className="text-white text-center text-[min(5vw,35px)]">Explore</h1>
        <p className=" text-sm p-3 mx-auto">
          Welcome back! Please enter your email and password below to access
          your account.
        </p>
      </span>

      <Input
        Icon={HiAtSymbol}
        placeholder="Email"
        type="email"
        onChagne={(e: any) => {
          setData({ ...data, email: e.target.value });
        }}
      />
      <Input
        Icon={HiFingerPrint}
        placeholder="Password"
        type="password"
        onChagne={(e: any) => {
          setData({ ...data, password: e.target.value });
        }}
      />

      <button className=" h-12 border border-body w-full flex justify-center items-center gap-8 text-white/60 bg-body p-2 rounded hover:opacity-90 transition">
        Sign in
      </button>

      <GoogleLoginButton />
      <div className="text-center text-white/40   ">
        don &apos;t have an account ?{" "}
        <Link
          href={"/signup"}
          className="text-[#EE7C75] hover:opacity-90 transition"
        >
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default Form;
