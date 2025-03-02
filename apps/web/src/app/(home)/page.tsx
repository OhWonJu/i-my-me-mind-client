"use client";

import { Hero } from "./_components";

const Home = () => {
  return (
    <div className="relative w-full h-full p-8 py-16 z-20 sm:max-w-[1600px]">
      {/* HERO */}
      <Hero />
      {/* LOGIN CARD */}
      <section className="absolute top-[40%] left-1/2 -translate-x-1/2 mt-8 flex flex-col w-[80%] md:w-[420px] p-8 space-y-4"></section>
    </div>
  );
};

export default Home;
