"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
const SigninButton = () => {
  const { data: session } = useSession();

  const pathname = usePathname();

  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto  justify-center items-center capitalize">
        <p className="text-white/80 whitespace-nowrap text-xs md:text-base">
          {session.user.name}
        </p>
        <button
          onClick={() => signOut()}
          className="border border-mainRed  text-xs h-9 px-4 rounded hover:bg-white/80 hover:text-mainRed transition font-semibold whitespace-nowrap"
        >
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <Link
      href={"/signin?callbackUrl=" + pathname}
      className="border border-mainRed ml-auto text-xs h-9 px-4 rounded hover:bg-white/80 hover:text-mainRed transition font-semibold whitespace-nowrap flex items-center"
    >
      Sign In
    </Link>
  );
};

export default SigninButton;
