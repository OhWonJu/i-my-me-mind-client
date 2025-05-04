"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { MotionValue, useAnimation, motion } from "motion/react";

import useActiveTooltipContext from "@/app/(home)/_context/ActiveTooltipContext";

import { frameOrder } from "./NodeEditFrame";

import { cn } from "@imymemind/core/lib/utils";

type ImageStepType =
  | "HoverBlockDrag"
  | "DraggingBlock"
  | "AfterDragging"
  | "HoverBlockDelete"
  | "AfterBlockDelete";

const NodeWithBlocks = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  const [imageStep, setImageStep] = useState<ImageStepType>("HoverBlockDrag");

  const { setActiveTooltip } = useActiveTooltipContext();

  const NodeImageUrlByStep = useMemo(() => {
    if (imageStep === "HoverBlockDrag" || imageStep === "DraggingBlock")
      return "/guide_assets/nodeWithBlocksHoverBlockDrag.webp";
    else if (imageStep === "AfterDragging")
      return "/guide_assets/nodeWithBlocksAfterDrag.webp";
    else if (imageStep === "HoverBlockDelete")
      return "/guide_assets/nodeWithBlocksHoverDeleteBlock.webp";
    else if (imageStep === "AfterBlockDelete")
      return "/guide_assets/nodeWithBlocksAfterDelete.webp";
    else return "/guide_assets/nodeWithBlocksHoverBlockDrag.webp";
  }, [imageStep]);

  const controls = useAnimation();
  const blockControls = useAnimation();

  const hasRunDraggingAnimationRef = useRef(false);

  useEffect(() => {
    if (typeof scrollYProgress === "undefined") return;

    const unsubscribe = scrollYProgress.on("change", value => {
      if (
        value >= frameOrder.hoverBlockDrag &&
        value < frameOrder.hoverBlockDrag + 0.01
      ) {
        controls.start({
          opacity: 1,
          transition: { duration: 0.3 },
        });
        setActiveTooltip(4);
        setImageStep("HoverBlockDrag");
      }

      if (
        value >= frameOrder.draggingBlock &&
        value < frameOrder.draggingBlock + 0.01
      ) {
        setImageStep("DraggingBlock");

        blockControls.start({
          opacity: 1,
          transition: {
            duration: 0.3,
          },
        });
      }

      if (
        value >= frameOrder.draggingStartBlock &&
        value < frameOrder.afterDragging &&
        !hasRunDraggingAnimationRef.current
      ) {
        hasRunDraggingAnimationRef.current = true;

        blockControls
          .start({
            x: ["0%", "30%", "0%"],
            y: ["0%", "-80%", "-160%"],
            transition: {
              duration: 1.5,
              ease: "easeInOut",
            },
          })
          .then(() => {
            setImageStep("AfterDragging");
          });
      }

      if (value < frameOrder.draggingStartBlock) {
        hasRunDraggingAnimationRef.current = false;
      }

      if (
        value >= frameOrder.hoverBlockDelete &&
        value < frameOrder.hoverBlockDelete + 0.01
      ) {
        setActiveTooltip(5);
        setImageStep("HoverBlockDelete");
      }

      if (
        value >= frameOrder.afterBlockDelete &&
        value < frameOrder.afterBlockDelete + 0.01
      ) {
        setImageStep("AfterBlockDelete");
      }

      if (value >= frameOrder.frameOut) {
        setActiveTooltip(-1);
      }

      if (value < frameOrder.nodeShow || value >= frameOrder.frameOut) {
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
        initial={{ opacity: 0, x: 0 }}
        animate={controls}
      >
        <Image
          src={NodeImageUrlByStep}
          alt="node"
          width={400}
          height={300}
          style={{ objectFit: "cover" }}
        />
        <div className="absolute top-[60%] -right-[34.5%] w-[60%]">
          {imageStep === "DraggingBlock" && (
            <motion.div
              animate={blockControls}
              initial={{ opacity: 0, x: 0 }}
              className="w-full h-full"
            >
              <Image
                src="/guide_assets/markdownBlockDragging.webp"
                alt="block_dragging"
                width={300}
                height={200}
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default NodeWithBlocks;
