import React from "react";
import SigninButton from "../login/Button";
import Logo from "./Logo";

const Nav = () => {
  return (
    <nav className="fixed top-0 left-0 bg-black text-white/60  w-full h-12 flex items-center justify-between px-4">
      <Logo />
      <SigninButton />
    </nav>
  );
};

export default Nav;
