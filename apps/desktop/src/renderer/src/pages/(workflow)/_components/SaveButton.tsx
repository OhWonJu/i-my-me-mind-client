"use clinet";

import React from "react";
import { useReactFlow } from "@xyflow/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AppNode } from "@imymemind/core/types/appNode";
import { workflowsQueryKeys } from "@imymemind/core/types/api/workflow";
import { updatedWorkflow } from "@renderer/api/worflow/ipc";
import { useWorkflowInfoContext } from "@imymemind/core/domain/workflow/_context/WorkflowInfoContext";
import SaveButtonComponent from "@imymemind/core/domain/workflow/_components/utilityComponents/SaveButton";

const SaveButton = ({
  workflowId,
  workflowName,
}: {
  workflowId: string;
  workflowName: string;
}) => {
  const { editable } = useWorkflowInfoContext();
  const { toObject, getNode } = useReactFlow();

  const updateHandler = async () => {
    if (!editable) return;

    if (document.activeElement instanceof HTMLElement) {
      await document.activeElement.blur();
    }

    const rootNode = getNode("root") as AppNode;
    const newTitle =
      rootNode?.data.nodeTitle?.trim() !== "" &&
      rootNode?.data.nodeTitle !== workflowName
        ? rootNode?.data.nodeTitle
        : undefined;

    // console.log(toObject());

    return await updatedWorkflow(workflowId, {
      data: JSON.stringify(toObject() ?? {}),
      name: newTitle,
    });
  };

  const queryClient = useQueryClient();
  const { mutate: update } = useMutation({
    mutationFn: async () => await updateHandler(),
    onSuccess: () => {
      // TODO : 리스트 정보를 갱신해야하는 경우만 invalidate 하도록 개선
      queryClient.invalidateQueries({
        queryKey: workflowsQueryKeys.getWorkflowList,
      });
      toast.success("마인드플로우 저장이 완료되었어요.");
    },
  });

  return <SaveButtonComponent updateHandler={update} />;
};

export default SaveButton;
