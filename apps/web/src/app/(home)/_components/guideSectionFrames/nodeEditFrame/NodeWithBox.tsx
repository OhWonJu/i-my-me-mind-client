"use client";

import React, { useEffect, useState } from "react";
import { MotionValue, useAnimation } from "motion/react";

import useActiveTooltipContext from "@/app/(home)/_context/ActiveTooltipContext";

import { frameOrder } from "./NodeEditFrame";
import Node from "../frameItems/Node";

const NodeWithBox = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  const [imageStep, setImageStep] = useState(0);

  const { setActiveTooltip } = useActiveTooltipContext();

  const controls = useAnimation();

  useEffect(() => {
    if (typeof scrollYProgress === "undefined") return;

    const unsubscribe = scrollYProgress.on("change", value => {
      if (value >= frameOrder.nodeShow && value < frameOrder.nodeShow + 0.01) {
        controls.start({
          opacity: 1,
          transition: { duration: 0.3 },
        });
        setImageStep(0);
      }

      if (
        value >= frameOrder.utilyBoxShow &&
        value < frameOrder.utilyBoxShow + 0.01
      ) {
        setActiveTooltip(2);
        setImageStep(1);
      }

      if (
        value >= frameOrder.utilyBoxExtend &&
        value < frameOrder.utilyBoxExtend + 0.01
      ) {
        setActiveTooltip(3);
        setImageStep(2);
      }

      if (value < frameOrder.nodeShow || value >= frameOrder.hoverBlockDrag) {
        controls.start({
          opacity: 0,
          transition: { duration: 0.3 },
        });
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, controls]);

  return (
    <div className="absolute top-[10%] left-1/2 -translate-x-1/2">
      <Node
        controls={controls}
        isActive={imageStep > 0}
        showBox={imageStep === 1}
        openBox={imageStep === 2}
        className="relative"
      />
    </div>
  );
};

export default NodeWithBox;
