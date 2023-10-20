"use client";
import React from "react";

import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

import Input from "../components/(shared)/widgets/Input";
import Container from "../components/(shared)/widgets/Container";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import HomeLink from "../components/(shared)/widgets/HomeLink";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "@/lib/yup/signupschema";

import { toast } from "sonner";
import { AddUser } from "@/lib/user/AddUser";
const Form = () => {
  const { data: session } = useSession();
  const router = useRouter();
  //not to open signup page if user authenticated
  if (session) {
    redirect("/");
  }

  const methods = useForm({ resolver: yupResolver(signInSchema) });
  const { handleSubmit, reset } = methods;

  const handleSignUp = async (data: FieldValues) => {
    const { name, email, password } = data;

    const res = AddUser({
      name,
      email,
      password,
    }) as Promise<{ st: number; msg: string }>;

    toast.promise(res, {
      loading: "Loading...",

      success: ({ msg, st }) => {
        if (st === 200) {
          reset();
          router.push("/signin?email=" + email);
        }
        return `${msg} `;
      },
      error: () => {
        return `${"user already registered"} `;
      },
    });

    console.log(res);
    console.log(res);
  };

  const onSubmit = (data: FieldValues) => {
    handleSignUp(data);
  };

  return (
    <FormProvider {...methods}>
      <Container>
        <form
          noValidate
          autoComplete={"off"}
          className=" relative rounded bg-todo w-[95%] max-w-[400px] p-8  
          flex flex-col gap-8 justify-between"
          onSubmit={handleSubmit(onSubmit)}
        >
          <HomeLink />
          <span className="text-center text-white/40 ">
            <h1 className="text-white text-center text-[min(5vw,35px)]">
              Register
            </h1>
            <p className="[text-wrap:balance] text-sm  mx-auto px-2 ">
              Welcome! Please enter your details below to create an account.
            </p>
          </span>

          <Input
            Icon={HiOutlineUser}
            placeholder="Username"
            type="text"
            name="user"
          />
          <Input
            Icon={HiAtSymbol}
            placeholder="Email"
            type="email"
            name="email"
          />
          <Input
            Icon={HiFingerPrint}
            placeholder="Password"
            type="password"
            name="password"
          />
          <Input
            Icon={HiFingerPrint}
            placeholder="Confirm Password"
            type="password"
            name="confirm"
          />

          <button
            className=" h-10 border border-body w-full flex justify-center items-center gap-8 text-white/60 bg-body p-2 rounded hover:opacity-90 transition"
            type="submit"
          >
            Sign up
          </button>

          <div className="text-center text-white/40  -mt-4">
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
    </FormProvider>
  );
};

export default Form;
