import React from "react";
import Link from "next/link";
import logo from "@/public/logo.png";
import Image from "next/image";
const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="h-8 w-32 overflow-hidden relative -translate-x-10">
        <Image
          src={logo}
          alt="todo"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </Link>
  );
};

export default Logo;
