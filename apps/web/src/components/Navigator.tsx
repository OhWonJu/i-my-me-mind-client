"use client";

import React from "react";
import Image from "next/image";

import { cn } from "@imymemind/core/lib/utils";

import { useScrollTop } from "@/hooks/useScrollTop";

import Container from "./Container";
import GotoDownloadButton from "./GotoDownloadButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigator = () => {
  const pathName = usePathname();

  const scrolled = useScrollTop();

  const isDownloadsPage = pathName === "/downloads";

  if (pathName === "/demo") return null;

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
        <section>
          <Link href={"/"} className="flex items-center gap-x-2">
            <div className="relative select-none w-[35px] h-[35px]">
              <Image
                src="/symbol-black.png"
                alt="I MY ME MIND Symbol"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
            <h1 className="text-3xl font-semibold">I MY ME MIND</h1>
          </Link>
        </section>
        {!isDownloadsPage && (
          <section className="hidden xs:block">
            <GotoDownloadButton />
          </section>
        )}
      </Container>
    </nav>
  );
};

export default Navigator;
