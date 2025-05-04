"use client";

import { useRouter } from "next/navigation";

import { Button } from "@imymemind/core/components/ui";

import Container from "@/components/Container";
import GotoDownloadButton from "@/components/GotoDownloadButton";

import Hero from "../_components/Hero";

const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="h-[100vh]">
      <Container className="flex flex-col h-full justify-center items-center pb-[60px] gap-y-6">
        <Hero />
        <h2 className="text-center text-clamp-sm font-medium text-secondary-foreground">
          문서들을 원하는 대로
          <br />
          이어나갈 수 있는 마인드플로우 애플리케이션
          <br />
          아이 마이 미 마인드
        </h2>
        <div className="flex flex-col xs:flex-row gap-y-4 xs:gap-x-4 mt-8">
          <Button
            variant="outline"
            useRipple
            size="lg"
            onClick={() => router.push("/demo")}
          >
            <span>체험 해보기</span>
          </Button>
          <GotoDownloadButton size="lg" />
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
