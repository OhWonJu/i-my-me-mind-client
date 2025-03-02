import React, { PropsWithChildren } from "react";

import { cn } from "@imymemind/core/lib/utils";

interface ModalFooterProps {
  className?: string;
}

export const ModalFooter = ({
  children,
  className,
}: PropsWithChildren<ModalFooterProps>) => {
  return (
    <section className={cn("relative flex p-6", className)}>{children}</section>
  );
};
