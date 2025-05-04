"use client";

import React from "react";
import { MotionValue } from "motion/react";

import Container from "@/components/Container";
import NodeWithBox from "./NodeWithBox";
import NodeWithBlocks from "./NodeWithBlocks";

export const frameOrder = {
  nodeShow: 0.33,
  utilyBoxShow: 0.36,
  utilyBoxExtend: 0.39,

  hoverBlockDrag: 0.43,
  draggingBlock: 0.45,
  draggingStartBlock: 0.46,
  afterDragging: 0.51,

  hoverBlockDelete: 0.52,
  afterBlockDelete: 0.57,

  frameOut: 0.6,
};

const NodeEditFrame = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  return (
    <Container className="w-full h-full">
      <div className="relative w-full h-full">
        <NodeWithBox scrollYProgress={scrollYProgress} />
        <NodeWithBlocks scrollYProgress={scrollYProgress} />
      </div>
    </Container>
  );
};

export default NodeEditFrame;
