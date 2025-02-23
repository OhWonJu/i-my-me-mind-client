"use client";

import React from "react";

import { Workflow } from "@/types/schema";

import { cn } from "@/lib/utils";

import SaveButton from "./SaveButton";
import Collaborators from "./Collaborators";
import Schedule from "./Schedule";

const UtilsBox = ({ workflow }: { workflow: Workflow }) => {
  return (
    <div
      className={cn(
        "group/utilsbox fixed flex items-center gap-x-3 top-0 right-0 mr-4 px-4 py-3 mt-6 z-[9999]"
      )}
    >
      <Collaborators />
      <Schedule />
      <SaveButton workflowId={workflow.id} workflowName={workflow.name} />
    </div>
  );
};

export default UtilsBox;
