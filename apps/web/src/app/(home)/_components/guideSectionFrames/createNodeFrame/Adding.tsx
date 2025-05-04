"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, MotionValue, useAnimation } from "motion/react";

import { frameOrder } from "./CreateNodeFrame";
import style from "../style.module.css";

import { cn } from "@imymemind/core/lib/utils";

const Adding = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  const controls = useAnimation();

  useEffect(() => {
    if (typeof scrollYProgress === "undefined") return;

    const unsubscribe = scrollYProgress.on("change", value => {
      if (
        value >= frameOrder.addNodeBtnDrag &&
        value < frameOrder.addNodeBtnDrag + 0.01
      ) {
        controls.start({
          opacity: 1,
          left: "45%",
          transition: { duration: 0.3 },
        });
      }

      if (value < frameOrder.addNodeBtnDrag || value >= frameOrder.nodeAdded) {
        controls.start({
          opacity: 0,
          left: "6.5%",
          transition: { duration: 0 },
        });
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, controls]);

  return (
    <motion.div
      className={cn(
        "absolute top-[12%] left-[6.5%] w-[160px] h-[40px] bg-card rounded-md overflow-hidden",
        style.shadow
      )}
      initial={{ opacity: 0, x: 0 }}
      animate={controls}
    >
      <Image
        src={"/guide_assets/addNodeButton.webp"}
        alt="node_add_button"
        fill
        style={{ objectFit: "cover", objectPosition: "left" }}
      />
    </motion.div>
  );
};

export default Adding;
