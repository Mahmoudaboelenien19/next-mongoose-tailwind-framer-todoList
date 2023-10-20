"use client";
import React from "react";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { signIn, useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sungInSchema } from "@/lib/yup/signinSchema";
import GoogleLoginButton from "./components/GoogleButton";
import Container from "../(site)/components/(shared)/widgets/Container";
import HomeLink from "../(site)/components/(shared)/widgets/HomeLink";
import Input from "../(site)/components/(shared)/widgets/Input";

const Form = () => {
  const search = useSearchParams();
  const callbackUrl = search.get("callbackUrl") || "/";
  const email = search.get("email") || "";
  const { data: session } = useSession();
  //not to open signin page if user authenticated
  if (session) {
    redirect("/");
  }

  const methods = useForm({ resolver: yupResolver(sungInSchema) });
  const { handleSubmit } = methods;

  const Authenticate = (data: FieldValues) => {
    signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
  };

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    Authenticate(data);
  };

  return (
    <FormProvider {...methods}>
      <Container>
        <form
          autoComplete="off"
          noValidate
          className=" relative rounded bg-todo w-[95%] max-w-[400px]  p-8  flex flex-col gap-8 justify-between"
          onSubmit={handleSubmit(onSubmit)}
        >
          <HomeLink />
          <span className="text-center text-white/40 ">
            <h1 className="text-white text-center text-[min(5vw,35px)]">
              Explore
            </h1>
            <p className="[text-wrap:balance] text-sm  mx-auto p-2">
              Welcome back! Please enter your email and password below to access
              your account.
            </p>
          </span>

          <Input
            Icon={HiAtSymbol}
            placeholder="Email"
            type="email"
            name="email"
            defaultValue={email}
          />
          <Input
            Icon={HiFingerPrint}
            placeholder="Password"
            type="password"
            name="password"
          />

          <button
            type="submit"
            className=" text-sm h-11 border border-body w-full flex justify-center items-center gap-8 text-white/60 bg-body p-2 rounded hover:opacity-90 transition"
          >
            Sign in
          </button>

          <GoogleLoginButton />
          <div className="text-center text-white/40  -mt-4">
            don &apos;t have an account ?{" "}
            <Link
              href={"/signup"}
              className="text-mainRed hover:opacity-90 transition"
            >
              Sign up
            </Link>
          </div>
        </form>
      </Container>
    </FormProvider>
  );
};

export default Form;
