"use client";

import React from "react";
import { MotionValue } from "motion/react";

import Container from "@/components/Container";
import NodeWithTodo from "./NodeWithTodo";
import AboutSchedule from "./AboutSchedule";

export const frameOrder = {
  nodeShow: 0.63,

  hoverCalenderButton: 0.7,
  openCalender: 0.73,
  activeDDay: 0.77,
  doneTodos: 0.82,

  topButtonsShow: 0.85,
  scheduleListShow: 0.88,

  frameOut: 0.96,
};

const TodoFrame = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  return (
    <Container className="w-full h-full">
      <div className="relative w-full h-full">
        <NodeWithTodo scrollYProgress={scrollYProgress} />
        <AboutSchedule scrollYProgress={scrollYProgress} />
      </div>
    </Container>
  );
};

export default TodoFrame;
