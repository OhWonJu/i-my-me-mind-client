"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui";
import { Hero } from "./_components";

const Home = () => {
  return (
    <div className="relative w-full h-full p-8 py-16 z-20 sm:max-w-[1600px]">
      {/* HERO */}
      <Hero />
      {/* LOGIN CARD */}
      <section className="absolute top-[40%] left-1/2 -translate-x-1/2 mt-8 flex flex-col w-[80%] md:w-[420px] p-8 space-y-4">
        <Button
          variant="flat"
          size="lg"
          className="bg-primary text-secondary border"
          onClick={() => {
            signIn("google", { redirect: true, callbackUrl: "/" });
          }}
        >
          <span>Google 계정으로 시작하기</span>
        </Button>
        <Button
          variant="flat"
          size="lg"
          className="bg-primary text-secondary border"
          onClick={() => null}
        >
          <span>Github 계정으로 시작하기</span>
        </Button>
      </section>
    </div>
  );
};

export default Home;
