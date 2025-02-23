"use clinet";

import React, { useEffect } from "react";
import { useReactFlow } from "@xyflow/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { AppNode } from "@/types/appNode";

import { updateWorkflow, workflowsQueryKeys } from "@/api/workflows";
import { Button } from "@/components/ui";

const SaveButton = ({
  workflowId,
  workflowName,
}: {
  workflowId: string;
  workflowName: string;
}) => {
  const { toObject, getNode } = useReactFlow();

  const updateHandler = async () => {
    if (document.activeElement instanceof HTMLElement) {
      await document.activeElement.blur();
    }

    const rootNode = getNode("root") as AppNode;
    const newTitle =
      rootNode?.data.nodeTitle?.trim() !== "" &&
      rootNode?.data.nodeTitle !== workflowName
        ? rootNode?.data.nodeTitle
        : undefined;

    return await updateWorkflow(workflowId, {
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
      toast.success("워크플로우 저장이 완료되었어요.");
    },
  });

  useEffect(() => {
    const down = async (e: KeyboardEvent) => {
      // if (!editable) return;

      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        update();
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, [update]);

  return (
    <Button
      variant="plain"
      onClick={() => update()}
      useRipple
      className="bg-blue-400 text-white h-[48px] px-6 rounded-full shadow-md"
    >
      <span>Save</span>
    </Button>
  );
};

export default SaveButton;
