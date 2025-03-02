"use clinet";

import React, { useEffect } from "react";

import { useWorkflowInfoContext } from "../../_context/WorkflowInfoContext";

import { Button } from "@imymemind/core/components/ui";

const SaveButton = ({ updateHandler }: { updateHandler: Function }) => {
  const { editable } = useWorkflowInfoContext();

  useEffect(() => {
    const down = async (e: KeyboardEvent) => {
      if (!editable) return;

      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        updateHandler();
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, [editable, updateHandler]);

  return (
    <Button
      variant="plain"
      onClick={() => updateHandler()}
      useRipple
      className="bg-blue-400 text-white h-[48px] px-6 rounded-full shadow-md"
    >
      <span>Save</span>
    </Button>
  );
};

export default SaveButton;
