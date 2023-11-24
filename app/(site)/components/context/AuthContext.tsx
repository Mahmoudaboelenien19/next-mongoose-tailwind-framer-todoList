"use client";
import { ChildrenType } from "@/lib/types/children";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import React, { ReactNode } from "react";
type Props = {
  session: Session | null;
  children: ReactNode;
};

const AuthContext = ({ children, session }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthContext;
