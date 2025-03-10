import React, { PropsWithChildren } from "react";

import { cn } from "@imymemind/core/lib/utils";

interface ModalBodyProps {
  className?: string;
}

export const ModalBody = ({
  children,
  className,
}: PropsWithChildren<ModalBodyProps>) => {
  return (
    <section
      className={cn(
        "relative flex flex-col flex-1 justify-center items-center py-6 px-8 overflow-y-auto",
        className
      )}
    >
      {children}
    </section>
  );
};
