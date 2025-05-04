"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ReactFlowProvider } from "@xyflow/react";

import { Workflow } from "@imymemind/core/types/schema";

import WorkflowInfoContext from "@imymemind/core/domain/workflow/_context/WorkflowInfoContext";
import { DnDProvider } from "@imymemind/core/domain/workflow/_context/DnDContext";

import { Button } from "@imymemind/core/components/ui";
import FlowEditor from "@imymemind/core/domain/workflow/_components/FlowEditor";
import { FlowEditorToolbar } from "@imymemind/core/domain/workflow/_components/flowEditorToolbar/FlowEditorToolbar";
import WorkflowUtilityBox from "@imymemind/core/domain/workflow/_components/utilityComponents/WorkflowUtilityBox";
import Schedule from "@imymemind/core/domain/workflow/_components/utilityComponents/Schedule";

const DEMO_WORKFLOW: Workflow = {
  name: "제목 없음",
  id: "demo",
  data: null,
  publish: false,
  ownerId: "demo",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const DemoPage = () => {
  const router = useRouter();

  return (
    <div className="relative w-full h-full translate-x-0">
      <ReactFlowProvider>
        <WorkflowInfoContext.Provider
          value={{
            role: "ADMIN",
            editable: true,
          }}
        >
          <DnDProvider>
            <div className="relative w-full h-full">
              <FlowEditorToolbar />
              <FlowEditor workflow={DEMO_WORKFLOW} />
            </div>
          </DnDProvider>
          <WorkflowUtilityBox workflow={DEMO_WORKFLOW}>
            <Schedule />
            <div>
              <Button
                variant="plain"
                className="px-5 h-[48px] bg-blue-400 text-secondary rounded-full items-center shadow-md select-none"
                onClick={() => router.back()}
              >
                이전 페이지로 돌아가기
              </Button>
            </div>
          </WorkflowUtilityBox>
        </WorkflowInfoContext.Provider>
      </ReactFlowProvider>
    </div>
  );
};

export default DemoPage;
