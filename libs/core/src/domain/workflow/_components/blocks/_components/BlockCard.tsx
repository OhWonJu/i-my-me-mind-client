"use client";

import React, { PropsWithChildren } from "react";

import { cn } from "@imymemind/core/lib/utils";

const BlockCard = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={cn("relative flex-1 w-full pb-6 border-b", className)}>
      {children}
    </div>
  );
};

export default BlockCard;
