"use client";

import { Button } from "@/components/ui";
import { Hero } from "./_components";

const Home = () => {
  return (
    <div className="relative w-full h-full p-8 py-16 z-20 sm:max-w-[1600px]">
      {/* HERO */}
      <Hero />
      {/* LOGIN CARD */}
      <section className="absolute top-[40%] left-1/2 -translate-x-1/2 mt-8 flex flex-col w-[80%] md:w-[420px] bg-card rounded-xl shadow-md border p-8 space-y-4">
        <Button
          variant="outline"
          size="lg"
          className="bg-card border text-primary"
          onClick={() => null}
        >
          카카오로 시작하기
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="bg-card border text-primary"
          onClick={() => null}
        >
          네이버로 시작하기
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="bg-card border text-primary"
          onClick={() => null}
        >
          Google로 시작하기
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="bg-card border text-primary"
          onClick={() => null}
        >
          Apple로 시작하기
        </Button>
      </section>
    </div>
  );
};

export default Home;
