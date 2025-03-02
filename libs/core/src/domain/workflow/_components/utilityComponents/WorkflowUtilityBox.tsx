"use client";

import { PropsWithChildren } from "react";

import { Workflow } from "@imymemind/core/types/schema";

import { cn } from "@imymemind/core/lib/utils";

const WorkflowUtilityBox = ({
  workflow,
  children,
}: PropsWithChildren<{ workflow: Workflow }>) => {
  return (
    <div
      className={cn(
        "group/utilsbox fixed flex items-center gap-x-3 top-0 right-0 mr-4 px-4 py-3 mt-6 z-[9999]"
      )}
    >
      {children}
      {/* <Schedule />
      {editable && (
        <SaveButton
          workflowId={workflow.id}
          workflowName={workflow.name}
          updateHandler={() => null}
        />
      )} */}
    </div>
  );
};

export default WorkflowUtilityBox;
