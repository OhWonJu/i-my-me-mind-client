"use client";

import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

const BlockCard = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return <div className={cn("flex-1 w-full pb-6", className)}>{children}</div>;
};

export default BlockCard;
