import { useLayoutEffect, useRef, useState } from "react";
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

const WorkflowView = ({ workflowId }: { workflowId: string }) => {
  const [isMounted, setIsMounted] = useState(false);

  const currentWorkflowId = useRef(workflowId);

  const { data } = useSuspenseQuery(getWorkflowDetail(workflowId));
  useSuspenseQuery(getWorkflowList());

  const workflow = data?.data;

  const role = data?.data?.role;
  const editable = role === "ADMIN" || role === "MODERATOR";

  const uploadHandler = async (file: File) =>
    await uploadSafeFile(workflowId, file);

  // Asset Clearup & create thumbnail
  useLayoutEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }

    let requestedAssets = new Set<string>();

    const collectExistingImages = () => {
      // const workflowPageElement = document.getElementById("workflow-page");
      const flowElement = document.querySelector(".react-flow__viewport");
      if (!flowElement) {
        requestedAssets = null;
        return;
      }

      flowElement.querySelectorAll("img").forEach(img => {
        requestedAssets.add(img.src);
      });
    };

    const handleUnload = async () => {
      collectExistingImages();

      if (!currentWorkflowId.current) return;
      if (requestedAssets === null) return;

      clearAssets(currentWorkflowId.current, Array.from(requestedAssets));
    };

    // beforeunmount
    return () => {
      handleUnload();
    };
  }, [isMounted]);

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
