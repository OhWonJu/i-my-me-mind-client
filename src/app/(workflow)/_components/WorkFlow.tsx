"use client";

import { useParams } from "next/navigation";
import { ReactFlowProvider } from "@xyflow/react";
import { useQuery } from "@tanstack/react-query";

import { getWorkflowDetail, getWorkflowList } from "@/api/workflows";

import WorkflowInfoContext from "../_context/WorkflowInfoContext";
import { DnDProvider } from "../_context/DnDContext";

import FlowEditor from "./FlowEditor";
import { FlowEditorToolbar } from "./flowEditorToolbar/FlowEditorToolbar";
import WorkflowUtilityBox from "./utilityComponents/WorkflowUtilityBox";

const WorkFlow = () => {
  const { workflowId } = useParams<{ workflowId: string }>();

  const { data, isLoading } = useQuery(getWorkflowDetail(workflowId));
  useQuery(getWorkflowList());

  if (isLoading || !data) return null;

  const role = data.data.role;
  const editable = role === "ADMIN" || role === "MODERATOR";

  return (
    <WorkflowInfoContext.Provider value={{ role, editable }}>
      <ReactFlowProvider>
        <DnDProvider>
          <div className="relative w-full h-full">
            <FlowEditorToolbar />
            <FlowEditor workflow={data.data} />
          </div>
        </DnDProvider>
        <WorkflowUtilityBox workflow={data.data} />
      </ReactFlowProvider>
    </WorkflowInfoContext.Provider>
  );
};

export default WorkFlow;
