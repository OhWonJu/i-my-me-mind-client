"use client";

import React from "react";
import Image from "next/image";

import { cn } from "@imymemind/core/lib/utils";

import { useScrollTop } from "@/hooks/useScrollTop";

import Container from "./ui/Container";
import GotoDownloadButton from "./GotoDownloadButton";

const Navigator = () => {
  const scrolled = useScrollTop();

  return (
    <nav
      className={cn(
        "sticky top-0 w-full h-[75px] bg-background z-[99999] transition-all duration-300 border-b border-b-transparent",
        scrolled && "border-b border-b-primary-foreground shadow-sm"
      )}
    >
      <Container
        useAnimation={false}
        className="px-6 md:px-8 py-2 flex w-full h-full items-center justify-between"
      >
        {/* SYMBOL */}
        <section className="relative flex items-center gap-x-2">
          <Image
            src="/symbol-black.png"
            width={35}
            height={35}
            alt="I MY ME MIND Symbol"
          />
          <h1 className="text-3xl font-semibold">I MY ME MIND</h1>
          <BetaBadge />
        </section>
        <section className="hidden xs:block">
          <GotoDownloadButton />
        </section>
      </Container>
    </nav>
  );
};

const BetaBadge = () => {
  return (
    <span className="absolute -bottom-1 -right-3 p-1 rounded-full text-[8px] font-bold bg-primary-foreground/90">
      Beta
    </span>
  );
};

export default Navigator;
