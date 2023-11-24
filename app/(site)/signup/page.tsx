"use client";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import Input from "../components/(shared)/widgets/Input";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import HomeLink from "../components/(shared)/widgets/HomeLink";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "@/lib/yup/signupschema";
import { toast } from "sonner";
import { AddUser } from "@/lib/user/AddUser";
import { signUpInputs } from "@/lib/arries/signupInpts";
import MainBtn from "../components/(shared)/MainBtn";

import { DataResponse } from "@/lib/types/todo";

const Form = () => {
  const { data: session } = useSession();
  const router = useRouter();
  //not to open signup page if user authenticated
  if (session) {
    redirect("/");
  }

  const methods = useForm({ resolver: yupResolver(signInSchema) });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const handleSignUp = async (data: FieldValues) => {
    const { user: name, email, password } = data;

    const res: Promise<DataResponse | undefined> = AddUser({
      name,
      email,
      password,
    });

    toast.promise(res, {
      loading: "Loading...",

      success: (res) => {
        if (res?.status === 200) {
          reset();
          router.push("/signin?email=" + email);
        }
        return `${res?.msg} `;
      },
      error: () => {
        return `${"user already registered"} `;
      },
    });
  };

  const onSubmit = async (data: FieldValues) => {
    await handleSignUp(data);
  };

  return (
    <FormProvider {...methods}>
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

        {signUpInputs.map(({ Icon, placeholder, name, type }, i) => {
          return (
            <Input
              key={i}
              Icon={Icon}
              placeholder={placeholder}
              type={type}
              name={name}
            />
          );
        })}

        <MainBtn
          btn="Sign in"
          type="submit"
          className="  h-11 border bg-body  border-body w-full  rounded"
          disabled={isSubmitting}
        />

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
    </FormProvider>
  );
};

export default Form;
