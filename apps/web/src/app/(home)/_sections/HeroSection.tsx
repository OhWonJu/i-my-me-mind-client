import Container from "@/components/ui/Container";
import GotoDownloadButton from "@/components/GotoDownloadButton";

import Hero from "../_components/Hero";

const HeroSection = () => {
  return (
    <section className="h-[100vh]">
      <Container className="flex flex-col h-full justify-center items-center pb-[60px] gap-y-6">
        <Hero />
        <h2 className="text-center text-clamp-sm font-medium text-secondary-foreground">
          기억의 조각들을 원하는 대로
          <br />
          이어나갈 수 있는 마인드플로우 애플리케이션
          <br />
          아이 마이 미 마인드
        </h2>
        <GotoDownloadButton size="lg" />
      </Container>
    </section>
  );
};

export default HeroSection;
