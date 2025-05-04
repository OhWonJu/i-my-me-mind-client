"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { MotionValue, useAnimation, motion } from "motion/react";

import useActiveTooltipContext from "@/app/(home)/_context/ActiveTooltipContext";

import { frameOrder } from "./TodoFrame";

import { cn } from "@imymemind/core/lib/utils";

type ImageStepType =
  | "NodeShow"
  | "HoverCalenderButton"
  | "OpenCalender"
  | "ActiveDDay"
  | "DoneTodos";

const NodeWithTodo = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  const [imageStep, setImageStep] = useState<ImageStepType>("NodeShow");

  const { setActiveTooltip } = useActiveTooltipContext();

  const NodeImageUrlByStep = useMemo(() => {
    if (imageStep === "NodeShow") return "/guide_assets/todoNode.webp";
    else if (
      imageStep === "HoverCalenderButton" ||
      imageStep === "OpenCalender"
    )
      return "/guide_assets/todoNodeHoverTodoDateBadge.webp";
    else if (imageStep === "ActiveDDay")
      return "/guide_assets/todoNodeActiveTodoDate.webp";
    else if (imageStep === "DoneTodos")
      return "/guide_assets/todoNodeChecklistDone.webp";
    else return "/guide_assets/todoNode.webp";
  }, [imageStep]);

  const controls = useAnimation();

  useEffect(() => {
    if (typeof scrollYProgress === "undefined") return;

    const unsubscribe = scrollYProgress.on("change", value => {
      if (value >= frameOrder.nodeShow && value < frameOrder.nodeShow + 0.01) {
        setImageStep("NodeShow");
        controls.start({
          opacity: 1,
          transition: { duration: 0.3 },
        });
      }

      if (
        value >= frameOrder.hoverCalenderButton &&
        value < frameOrder.hoverCalenderButton + 0.01
      ) {
        setActiveTooltip(6);
        setImageStep("HoverCalenderButton");
      }

      if (
        value >= frameOrder.openCalender &&
        value < frameOrder.openCalender + 0.01
      ) {
        setImageStep("OpenCalender");
      }

      if (
        value >= frameOrder.activeDDay &&
        value < frameOrder.activeDDay + 0.01
      ) {
        setActiveTooltip(7);
        setImageStep("ActiveDDay");
      }

      if (
        value >= frameOrder.doneTodos &&
        value < frameOrder.doneTodos + 0.01
      ) {
        setActiveTooltip(8);
        setImageStep("DoneTodos");
      }

      if (value < frameOrder.nodeShow || value >= frameOrder.frameOut - 0.01) {
        setImageStep("NodeShow");
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
      <motion.div
        className={cn("relative")}
        initial={{ opacity: 1, x: 0 }}
        animate={controls}
      >
        <Image
          src={NodeImageUrlByStep}
          alt="node"
          width={400}
          height={300}
          style={{ objectFit: "cover" }}
          unoptimized
        />
        <div className="absolute top-[20%] -right-[40%] w-[65%]">
          {imageStep === "OpenCalender" && (
            <Image
              src="/guide_assets/todoDateBadgePopover.webp"
              alt="block_dragging"
              width={300}
              height={200}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default NodeWithTodo;
