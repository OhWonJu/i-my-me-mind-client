"use client";

import React, { useRef, useState } from "react";
import { MotionValue, useMotionValueEvent, useScroll } from "motion/react";

import Container from "@/components/Container";
import CreateNodeFrame from "../_components/guideSectionFrames/createNodeFrame/CreateNodeFrame";
import NodeEditFrame from "../_components/guideSectionFrames/nodeEditFrame/NodeEditFrame";
import TodoFrame from "../_components/guideSectionFrames/todoFrame/TodoFrame";

import { cn } from "@imymemind/core/lib/utils";

const FRAMES = [
  ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => (
    <CreateNodeFrame scrollYProgress={scrollYProgress} />
  ),
  ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => (
    <NodeEditFrame scrollYProgress={scrollYProgress} />
  ),
  ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => (
    <TodoFrame scrollYProgress={scrollYProgress} />
  ),
];

const GuideSection = () => {
  const [activeFrame, setActiveFrame] = useState(0);

  const ref = useRef<any>(null);
  const previousLatest = useRef(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = FRAMES.length;

  useMotionValueEvent(scrollYProgress, "change", latest => {
    const cardsBreakpoints = FRAMES.map((_, index) => index / cardLength);

    const nextBreakpointIndex = activeFrame + 1;
    const prevBreakpointIndex = activeFrame - 1;

    if (latest > previousLatest.current) {
      // 스크롤을 아래로 내릴 때
      if (
        nextBreakpointIndex < cardsBreakpoints.length &&
        latest >= cardsBreakpoints[nextBreakpointIndex]
      ) {
        setActiveFrame(nextBreakpointIndex);
      }
    } else if (latest < previousLatest.current) {
      // 스크롤을 위로 올릴 때
      if (prevBreakpointIndex >= 0 && latest <= cardsBreakpoints[activeFrame]) {
        setActiveFrame(prevBreakpointIndex);
      }
    }

    previousLatest.current = latest; // 이전 latest 값 업데이트
  });

  return (
    <div className="relative w-screen h-[4500vh]" ref={ref}>
      <div
        className={cn("sticky top-0 h-screen w-full")}
        style={{ backgroundImage: "url(/guide_assets/background.webp)" }}
      >
        <Container className="pt-[100px]">
          <h3 className="text-clamp-lg font-bold">사용 가이드</h3>
        </Container>
        {FRAMES[activeFrame]({ scrollYProgress }) ?? null}
      </div>
    </div>
  );
};

export default GuideSection;
