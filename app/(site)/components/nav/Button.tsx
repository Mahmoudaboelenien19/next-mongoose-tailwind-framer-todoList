"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
const SigninButton = () => {
  const { data: session } = useSession();
  console.log(session);
  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-sky-600">{session.user.name}</p>
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
    <button
      onClick={() => signIn()}
      className="border border-mainRed ml-auto text-xs h-9 px-4 rounded hover:bg-white/80 hover:text-mainRed transition font-semibold whitespace-nowrap"
    >
      Sign In
    </button>
  );
};

export default SigninButton;
