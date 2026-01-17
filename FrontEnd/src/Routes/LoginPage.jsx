import React from "react";
import { SignIn } from "@clerk/clerk-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const LoginPage = () => {
  useGSAP(() => {
    gsap.from(".login", {
      scale: 0,
      opacity: 0,

      duration: 0.7,
      ease: "power1.inOut",
    });
  }, []);
  return (
    <div className="flex login px-2 md:px-4 lg:px-8 xl:px-16 2xl:px-32 items-center justify-center h-[calc(100vh-80px)]">
      <SignIn signUpUrl="/register" />
    </div>
  );
};

export default LoginPage;
