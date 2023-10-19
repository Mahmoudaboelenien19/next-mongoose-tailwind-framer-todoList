"use client";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const handleClick = () => {
    signIn("google", { callbackUrl });
  };
  return (
    <button
      type="button"
      className="w-full flex justify-center items-center gap-8 text-white/60 border border-white/50  h-12 p-2 rounded"
      onClick={handleClick}
    >
      <FcGoogle size={24} />
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
