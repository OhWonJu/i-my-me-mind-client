import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import throttle from "lodash.throttle";

import { AppNode } from "@imymemind/core/types/appNode";
import { workflowsQueryKeys } from "@imymemind/core/types/api/workflow";
import { updatedWorkflow } from "@renderer/api/worflow/ipc";

import { uploadThumbnail } from "@renderer/libs/uploads";
import { createThumbnail } from "../_utils/createThumbnail";

import { useWorkflowInfoContext } from "@imymemind/core/domain/workflow/_context/WorkflowInfoContext";

import SaveButtonComponent from "@imymemind/core/domain/workflow/_components/utilityComponents/SaveButton";

const SaveButton = ({
  workflowId,
  workflowName,
}: {
  workflowId: string;
  workflowName: string;
}) => {
  const [isMounted, setIsMounted] = useState(false);

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
      queryClient.invalidateQueries({
        queryKey: workflowsQueryKeys.getWorkflowDetailKey(workflowId),
      });

      toast.success("마인드플로우 저장이 완료되었어요.");
    },
  });

  useLayoutEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }

    const handleUploadThumbnail = async () => {
      if (thumbnailFileRef.current) {
        await uploadThumbnail(workflowId, thumbnailFileRef.current);
        queryClient.invalidateQueries({
          queryKey: workflowsQueryKeys.getWorkflowList,
        });
      }
    };

    // window.addEventListener("hashchange", handleUploadThumbnail);

    return () => {
      handleUploadThumbnail();
      // window.removeEventListener("hashchange", handleUploadThumbnail);
    };
  }, [isMounted]);

  return <SaveButtonComponent updateHandler={update} />;
};

export default SaveButton;
