"use client";
import React from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Input from "../components/nav/(shared)/Input";
import Container from "../components/nav/(shared)/Container";

const Form = () => {
  const { data: session } = useSession();

  //not to open signup page if user authenticated
  if (session) {
    redirect("/");
  }
  return (
    <Container>
      <form
        className=" relative rounded bg-todo w-[95%] max-w-[400px] h-3/4 p-8 flex flex-col justify-between"
        onSubmit={(e) => e.preventDefault()}
      >
        <Link
          href={"/"}
          className="absolute -top-10 -left-5 text-white/60                                0 flex gap-2 justify-center items-center"
        >
          <AiOutlineLeft />
          <span>Home</span>
        </Link>
        <span className="text-center text-white/40 ">
          <h1 className="text-white text-center text-[min(5vw,35px)]">
            Register
          </h1>
          <p>Welcome! Please enter your details below to create an account.</p>
        </span>

        <Input Icon={HiOutlineUser} placeholder="Username" type="text" />
        <Input Icon={HiAtSymbol} placeholder="Email" type="email" />
        <Input Icon={HiFingerPrint} placeholder="Password" type="password" />
        <Input
          Icon={HiFingerPrint}
          placeholder="Confirm Password"
          type="password"
        />

        <button className=" h-12 border border-body w-full flex justify-center items-center gap-8 text-white/60 bg-body p-2 rounded hover:opacity-90 transition">
          Sign up
        </button>

        <div className="text-center text-white/40   ">
          have an account ?
          <Link
            href={"/signin"}
            className="text-[#EE7C75] hover:opacity-90 transition"
          >
            {" "}
            Sign in
          </Link>
        </div>
      </form>
    </Container>
  );
};

export default Form;
