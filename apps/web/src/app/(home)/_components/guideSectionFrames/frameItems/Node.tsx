"use client";

import React from "react";
import Image from "next/image";
import { AnimationControls, motion } from "motion/react";

import { cn } from "@imymemind/core/lib/utils";

// TODO : 포지션, 애니메이션, 트렌지션벨류

interface Props {
  isActive?: boolean;
  showBox?: boolean;
  openBox?: boolean;
  controls?: AnimationControls;
  className?: string;
}

const Node = ({
  isActive = false,
  showBox = false,
  openBox = false,
  className,
  controls,
}: Props) => {
  return (
    <motion.div
      className={cn("absolute", className)}
      initial={{ opacity: 0, x: 0 }}
      animate={controls}
    >
      <Image
        src={
          isActive ? "/guide_assets/nodeActive.webp" : "/guide_assets/node.webp"
        }
        alt="node"
        width={400}
        height={300}
        style={{ objectFit: "cover" }}
      />
      <div className="absolute top-[13%] w-full h-full">
        {showBox && (
          <div className="absolute -right-[10%] -top-[4%] w-[10%]">
            <Image
              src={"/guide_assets/nodeUtilityBox.webp"}
              alt="node_utily_box"
              width={25}
              height={25}
            />
          </div>
        )}
        {openBox && (
          <div className="absolute -right-[34.5%] -top-[4%] w-[35%]">
            <Image
              src={"/guide_assets/nodeUtilityBoxOpen.webp"}
              alt="node_utily_box"
              width={125}
              height={125}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Node;
