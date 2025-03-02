import { useSuspenseQuery } from "@tanstack/react-query";
import { ReactFlowProvider } from "@xyflow/react";

import { uploadSafeFile } from "@renderer/libs/uploads";

import { getWorkflowDetail, getWorkflowList } from "@renderer/api/worflow/ipc";

import WorkflowInfoContext from "@imymemind/core/domain/workflow/_context/WorkflowInfoContext";
import { DnDProvider } from "@imymemind/core/domain/workflow/_context/DnDContext";

import FlowEditor from "@imymemind/core/domain/workflow/_components/FlowEditor";
import { FlowEditorToolbar } from "@imymemind/core/domain/workflow/_components/flowEditorToolbar/FlowEditorToolbar";
import WorkflowUtilityBox from "@imymemind/core/domain/workflow/_components/utilityComponents/WorkflowUtilityBox";
import Schedule from "@imymemind/core/domain/workflow/_components/utilityComponents/Schedule";

import WorkflowList from "./WorkflowList";
import SaveButton from "./SaveButton";

const WorkflowView = ({ workflowId }: { workflowId: string }) => {
  const { data } = useSuspenseQuery(getWorkflowDetail(workflowId));
  useSuspenseQuery(getWorkflowList());

  const workflow = data?.data;

  const role = data?.data?.role;
  const editable = role === "ADMIN" || role === "MODERATOR";

  const uploadHandler = async (file: File) =>
    await uploadSafeFile(workflowId, file);

  return (
    <WorkflowInfoContext.Provider value={{ role, editable, uploadHandler }}>
      <ReactFlowProvider>
        <DnDProvider>
          <div className="relative w-full h-full">
            <FlowEditorToolbar>
              <WorkflowList />
            </FlowEditorToolbar>
            <FlowEditor workflow={workflow} />
          </div>
        </DnDProvider>
        <WorkflowUtilityBox workflow={workflow}>
          <Schedule />
          {editable && (
            <SaveButton workflowId={workflow.id} workflowName={workflow.name} />
          )}
        </WorkflowUtilityBox>
      </ReactFlowProvider>
    </WorkflowInfoContext.Provider>
  );
};

export default WorkflowView;
