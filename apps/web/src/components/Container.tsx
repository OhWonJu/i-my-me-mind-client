"use client";

import React, { CSSProperties, PropsWithChildren, useRef } from "react";
import { useInView } from "motion/react";
import * as motion from "motion/react-client";

import { cn } from "@imymemind/core/lib/utils";

interface ContainerProps {
  useAnimation?: boolean;
  className?: string;
  style?: CSSProperties;
}

const rootClassname =
  "w-full md:max-w-4xl lg:max-w-6xl px-6 md:px-12 lg:px-24 mx-auto";

const Container = ({
  children,
  useAnimation = true,
  className,
  style,
}: PropsWithChildren<ContainerProps>) => {
  if (useAnimation)
    return (
      <AnimateContainer className={className} style={style}>
        {children}
      </AnimateContainer>
    );

  return (
    <div className={cn(rootClassname, className)} style={style}>
      {children}
    </div>
  );
};

const AnimateContainer = ({
  children,
  className,
  style,
}: PropsWithChildren<{ className?: string; style?: CSSProperties }>) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -25% 0px",
  });

  return (
    <motion.div
      ref={ref}
      className={cn(rootClassname, className)}
      style={style}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default Container;
