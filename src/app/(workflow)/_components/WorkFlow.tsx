"use client";

import { ReactFlowProvider } from "@xyflow/react";

import { DnDProvider } from "../_context/DnDContext";
import FlowEditor from "./FlowEditor";
import { FlowEditorToolbar } from "./FlowEditorToolbar";

// TODO: workflow typeprops {workflow}: {workflow: Workflow}
const WorkFlow = () => {
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <div className="relative w-full h-full">
          <FlowEditorToolbar />
          <FlowEditor />
        </div>
      </DnDProvider>
    </ReactFlowProvider>
  );
};

export default WorkFlow;
