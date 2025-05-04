import React, { useState } from "react";
import Image from "next/image";
import { MotionValue, useMotionValueEvent, useTransform } from "motion/react";

import useActiveTooltipContext from "@/app/(home)/_context/ActiveTooltipContext";

import Container from "@/components/Container";
import Adding from "./Adding";
import Nodes from "./Nodes";

import style from "../style.module.css";

import { cn } from "@imymemind/core/lib/utils";

export const frameOrder = {
  toobarExtend: 0.03,
  toobarFullExtend: 0.06,
  addNodeBtnDrag: 0.09,
  toolbarFadeOut: 0.12,
  nodeAdded: 0.15,
  nodesShow: 0.18,
  nodeConnectStart: 0.21,
  nodeConnnectDone: 0.24,
  nodeDisconnet: 0.27,
  frameOut: 0.3,
};

const CreateNodeFrame = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  const [toolbarExtendStep, setToolbarExtendStep] = useState(0);

  const { setActiveTooltip } = useActiveTooltipContext();

  const toolbarExtendTrigger = useTransform(
    scrollYProgress,
    [
      frameOrder.toobarExtend - 0.01,
      frameOrder.toobarExtend,
      frameOrder.toobarFullExtend - 0.01,
      frameOrder.toobarFullExtend,
      frameOrder.toolbarFadeOut - 0.01,
      frameOrder.toolbarFadeOut,
      frameOrder.frameOut + 0.1,
    ],
    [0, 1, 1, 2, 2, 3, 3]
  );

  useMotionValueEvent(toolbarExtendTrigger, "change", latest => {
    if (latest === 0) {
      setToolbarExtendStep(0);
    }
    if (latest === 1) {
      setActiveTooltip(-1);
      setToolbarExtendStep(1);
    }
    if (latest === 2) {
      setActiveTooltip(0);
      setToolbarExtendStep(2);
    }
    if (latest === 3) setToolbarExtendStep(3);
  });

  return (
    <Container className="w-full h-full">
      <div className="relative w-full h-full">
        <div
          className={cn(
            "absolute opacity-0 top-6 left-[5%] h-[70vh] bg-card rounded-2xl overflow-hidden duration-300",
            toolbarExtendStep === 0 && "w-[4vw] min-w-[60px]",
            toolbarExtendStep >= 1 && "opacity-100 w-[12vw] min-w-[180px]",
            toolbarExtendStep === 3 &&
              "opacity-0 -translate-x-[100px] duration-500",
            style.shadow
          )}
        >
          <div
            className={cn(
              toolbarExtendStep === 0 && "w-[4vw] min-w-[60px]",
              toolbarExtendStep >= 1 && "w-[12vw] min-w-[180px]"
            )}
          >
            <Image
              src={
                toolbarExtendStep === 0
                  ? "/guide_assets/toolbar.webp"
                  : toolbarExtendStep === 1
                    ? "/guide_assets/toolbarExtend.webp"
                    : "/guide_assets/toolbarFullExtend.webp"
              }
              alt="toolbar_image"
              width={300}
              height={1}
              style={{ objectFit: "cover", objectPosition: "top" }}
            />
          </div>
        </div>

        <Adding scrollYProgress={scrollYProgress} />

        <Nodes scrollYProgress={scrollYProgress} />
      </div>
    </Container>
  );
};

export default CreateNodeFrame;
