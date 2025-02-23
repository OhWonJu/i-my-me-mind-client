"use client";

import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

const BlockCard = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={cn(
        "relative flex-1 w-full pb-6 border-b border-background",
        className
      )}
    >
      {children}
    </div>
  );
};

export default BlockCard;
