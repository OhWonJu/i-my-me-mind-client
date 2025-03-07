"use client";

import React, { PropsWithChildren, useRef } from "react";
import { useInView } from "motion/react";
import * as motion from "motion/react-client";

import { cn } from "@imymemind/core/lib/utils";

interface ContainerProps {
  useAnimation?: boolean;
  className?: string;
}

const rootClassname = "w-full lg:max-w-7xl px-4 xs:px-10 md:px-12 mx-auto";

const Container = ({
  children,
  useAnimation = true,
  className,
}: PropsWithChildren<ContainerProps>) => {
  if (useAnimation)
    return (
      <AnimateContainer className={className}>{children}</AnimateContainer>
    );

  return <div className={cn(rootClassname, className)}>{children}</div>;
};

const AnimateContainer = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -25% 0px",
  });

  return (
    <motion.div
      ref={ref}
      className={cn(rootClassname, className)}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default Container;
