"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MotionValue, useAnimation, motion } from "motion/react";

import { frameOrder } from "./TodoFrame";

import { cn } from "@imymemind/core/lib/utils";

const AboutSchedule = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  const [imageStep, setImageStep] = useState(0);

  const controls = useAnimation();

  useEffect(() => {
    if (typeof scrollYProgress === "undefined") return;

    const unsubscribe = scrollYProgress.on("change", value => {
      if (
        value >= frameOrder.topButtonsShow &&
        value < frameOrder.topButtonsShow + 0.01
      ) {
        controls.start({
          opacity: 1,
          transition: { duration: 0.3 },
        });
        setImageStep(1);
      }

      if (
        value >= frameOrder.scheduleListShow &&
        value < frameOrder.scheduleListShow + 0.01
      ) {
        setImageStep(2);
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
    <div className="absolute top-[1%] w-full">
      <motion.div
        className={cn("relative, w-full")}
        initial={{ opacity: 0, x: 0 }}
        animate={controls}
      >
        {imageStep > 0 && (
          <div className="flex w-full h-[50px] justify-end items-center">
            <Image
              src="/guide_assets/scheduleButton.webp"
              alt="schedule-button"
              width={145}
              height={50}
            />
            <Image
              src="/guide_assets/saveButton.webp"
              alt="save-button"
              width={86}
              height={50}
            />
          </div>
        )}
        <div className="absolute top-[130%] -right-[0%] h-[80%]">
          {imageStep > 1 && (
            <Image
              src="/guide_assets/scheduleList.webp"
              alt="save"
              width={300}
              height={400}
              unoptimized
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutSchedule;
