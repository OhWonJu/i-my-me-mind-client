import React, { useEffect, useRef } from "react";
import { useReactFlow } from "@xyflow/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import throttle from "lodash.throttle";

import { AppNode } from "@imymemind/core/types/appNode";
import { workflowsQueryKeys } from "@imymemind/core/types/api/workflow";
import { updatedWorkflow } from "@renderer/api/worflow/ipc";

import { uploadThumbnail } from "@renderer/libs/uploads";
import { createThumbnail } from "../utils/createThumbnail";

import { useWorkflowInfoContext } from "@imymemind/core/domain/workflow/_context/WorkflowInfoContext";

import SaveButtonComponent from "@imymemind/core/domain/workflow/_components/utilityComponents/SaveButton";

const SaveButton = ({
  workflowId,
  workflowName,
}: {
  workflowId: string;
  workflowName: string;
}) => {
  const thumbnailFileRef = useRef<File | null>(null);

  const { editable } = useWorkflowInfoContext();
  const { toObject, getNode, getNodes, getNodesBounds } = useReactFlow();

  const throttledCreateThumbnail = throttle(() => {
    createThumbnail(getNodes, getNodesBounds).then(file => {
      if (file) {
        thumbnailFileRef.current = file;
      }
    });
  }, 10000);

  const updateHandler = async () => {
    if (!editable) return;

    if (document.activeElement instanceof HTMLElement) {
      await new Promise<void>(resolve => {
        setTimeout(async () => {
          // @ts-ignore
          await document.activeElement.blur();
          resolve();
        }, 0);
      });
    }

    const rootNode = getNode("root") as AppNode;
    const newTitle =
      rootNode?.data.nodeTitle?.trim() !== "" &&
      rootNode?.data.nodeTitle !== workflowName
        ? rootNode?.data.nodeTitle
        : undefined;

    return await updatedWorkflow(workflowId, {
      data: JSON.stringify(toObject() ?? {}),
      name: newTitle,
    });
  };

  const queryClient = useQueryClient();
  const { mutate: update } = useMutation({
    mutationFn: async () => await updateHandler(),
    onSuccess: () => {
      throttledCreateThumbnail();
      // TODO : 리스트 정보를 갱신해야하는 경우만 invalidate 하도록 개선
      queryClient.invalidateQueries({
        queryKey: workflowsQueryKeys.getWorkflowList,
      });
      toast.success("마인드플로우 저장이 완료되었어요.");
    },
  });

  useEffect(() => {
    const handleUploadThumbnail = async () => {
      if (thumbnailFileRef.current) {
        await uploadThumbnail(workflowId, thumbnailFileRef.current);
      }
    };

    window.addEventListener("beforeunload", handleUploadThumbnail);

    return () => {
      window.removeEventListener("beforeunload", handleUploadThumbnail);
    };
  }, []);

  return <SaveButtonComponent updateHandler={update} />;
};

export default SaveButton;
