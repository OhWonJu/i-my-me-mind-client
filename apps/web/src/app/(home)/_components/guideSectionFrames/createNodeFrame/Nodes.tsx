"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, MotionValue, useAnimation } from "motion/react";

import useActiveTooltipContext from "@/app/(home)/_context/ActiveTooltipContext";

import { frameOrder } from "./CreateNodeFrame";

const Nodes = ({
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
      if (
        value >= frameOrder.nodeAdded &&
        value < frameOrder.nodeAdded + 0.01
      ) {
        setImageStep(0);
        controls.start({
          opacity: 1,
          transition: { duration: 0.3 },
        });
      }

      if (
        value >= frameOrder.nodesShow &&
        value < frameOrder.nodesShow + 0.01
      ) {
        setActiveTooltip(1);
        setImageStep(1);
      }

      if (
        value >= frameOrder.nodeConnectStart &&
        value < frameOrder.nodeConnectStart + 0.01
      ) {
        setImageStep(2);
      }

      if (
        value >= frameOrder.nodeConnnectDone &&
        value < frameOrder.nodeConnnectDone + 0.01
      ) {
        setImageStep(3);
      }

      if (value >= frameOrder.frameOut) {
        setActiveTooltip(-1);
      }

      if (value < frameOrder.nodeAdded || value >= frameOrder.frameOut) {
        controls.start({
          opacity: 0,
          transition: { duration: 0.3 },
        });
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, controls]);

  return (
    <div className="absolute top-0 w-full h-screen pt-[50px] flex justify-center items-start">
      <motion.div
        className="p-10 sm:p-0"
        initial={{ opacity: 0, x: 0 }}
        animate={controls}
      >
        <Image
          src={
            imageStep === 0
              ? "/guide_assets/node.webp"
              : imageStep === 1
                ? "/guide_assets/nodes.webp"
                : imageStep === 2
                  ? "/guide_assets/nodesConnect.webp"
                  : "/guide_assets/nodesConnectActive.webp"
          }
          alt="node"
          width={400}
          height={300}
          style={{ objectFit: "cover" }}
          priority
        />
      </motion.div>
    </div>
  );
};

export default Nodes;
