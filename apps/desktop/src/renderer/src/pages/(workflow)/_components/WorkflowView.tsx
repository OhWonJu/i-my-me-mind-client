import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

import { uploadSafeFile } from "@renderer/libs/uploads";

import {
  clearAssets,
  getWorkflowDetail,
  getWorkflowList,
} from "@renderer/api/worflow/ipc";

import WorkflowInfoContext from "@imymemind/core/domain/workflow/_context/WorkflowInfoContext";
import { DnDProvider } from "@imymemind/core/domain/workflow/_context/DnDContext";

import FlowEditor from "@imymemind/core/domain/workflow/_components/FlowEditor";
import { FlowEditorToolbar } from "@imymemind/core/domain/workflow/_components/flowEditorToolbar/FlowEditorToolbar";
import WorkflowUtilityBox from "@imymemind/core/domain/workflow/_components/utilityComponents/WorkflowUtilityBox";
import Schedule from "@imymemind/core/domain/workflow/_components/utilityComponents/Schedule";

import WorkflowList from "./WorkflowList";
import SaveButton from "./SaveButton";

const WorkflowView = () => {
  const { workflowId } = useParams();

  const { data } = useSuspenseQuery(getWorkflowDetail(workflowId));
  useSuspenseQuery(getWorkflowList());

  const workflow = data?.data;

  const role = data?.data?.role;
  const editable = role === "ADMIN" || role === "MODERATOR";

  const uploadHandler = async (file: File) =>
    await uploadSafeFile(workflowId, file);

  // Asset Clearup & create thumbnail
  useEffect(() => {
    const requestedAssets = new Set<string>();

    const collectExistingImages = () => {
      const workflowPageElement = document.getElementById("workflow-page");
      workflowPageElement.querySelectorAll("img").forEach(img => {
        requestedAssets.add(img.src);
      });
    };

    const handleUnload = async () => {
      collectExistingImages();
      clearAssets(workflowId, Array.from(requestedAssets));
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return (
    <WorkflowInfoContext.Provider value={{ role, editable, uploadHandler }}>
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
    </WorkflowInfoContext.Provider>
  );
};

export default WorkflowView;
