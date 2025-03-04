import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";

import { WorkflowList as WorkflowListType } from "@imymemind/core/types/schema";
import {
  GetWorkflowListResponse,
  workflowsQueryKeys,
} from "@imymemind/core/types/api/workflow";

import { deleteWorkflow } from "@renderer/api/worflow/ipc";

import { cn } from "@imymemind/core/lib/utils";

import { useModal } from "@imymemind/core/stores/useModalStore";

import { DotMenu } from "@imymemind/core/components/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@imymemind/core/components/ui/popover";
import { Button } from "@imymemind/core/components/ui";

const WorkflowList = () => {
  const { workflowId } = useParams();
  const navigate = useNavigate();

  const { onOpen } = useModal();

  const data = useQueryClient().getQueryData(
    workflowsQueryKeys.getWorkflowList
  ) as GetWorkflowListResponse;

  const workflowlist = data && data.data ? data.data : [];

  if (!workflowlist) return;

  const queryClient = useQueryClient();

  const { mutate: deleteMutate } = useMutation({
    mutationFn: async (workflowId: string) => await deleteWorkflow(workflowId),
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: workflowsQueryKeys.getWorkflowList,
      });

      toast.success("마인드플로우가 삭제되었어요.");

      const isCurrentWorkflow = workflowId === data?.data.workflowId;

      if (isCurrentWorkflow) navigate("/dashboard");
    },
  });

  return (
    <>
      <WorkflowListItem
        item={{
          id: "dashboard",
          name: "대시보드로 돌아가기",
          publish: false,
          updatedAt: null,
        }}
        isDashboard={true}
        deleteAction={() => null}
      />
      <hr className="border-none mb-[6px]" />
      {workflowlist.map(item => (
        <WorkflowListItem
          key={item.id}
          item={item}
          deleteAction={() =>
            onOpen("deleteWorkflow", {
              workflowDelete: { deleteAction: () => deleteMutate(item.id) },
            })
          }
        />
      ))}
    </>
  );
};

const WorkflowListItem = ({
  item,
  isDashboard = false,
  deleteAction,
}: {
  item: WorkflowListType;
  isDashboard?: boolean;
  deleteAction: (worflowId: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const targetPath = isDashboard ? "/dashboard" : `/workflow/${item.id}`;

  return (
    <div className="group/list select-none flex max-w-full justify-between items-center hover:bg-card-foreground/70 py-1 rounded-md cursor-pointer overflow-hidden">
      <Link className="flex-1 min-w-0 flex" to={targetPath}>
        <p
          title={item.name}
          className="truncate w-full pl-3 py-1 cursor-pointer"
        >
          {item.name}
        </p>
      </Link>

      {!isDashboard && (
        <Popover onOpenChange={setIsOpen}>
          <PopoverTrigger className="grid place-items-center w-6 h-6 shrink-0 text-primary/50 hover:text-primary">
            <DotMenu
              className={cn(
                "group-hover/list:block  w-3 h-3 rotate-90",
                isOpen && "block",
                !isOpen && "hidden"
              )}
            />
          </PopoverTrigger>
          <PopoverContent align="start" className="group w-fit p-0 z-[9999]">
            <Button
              variant="plain"
              onClick={() => deleteAction(item.id)}
              className="text-red-600 hover:bg-card-foreground"
            >
              <Trash size={16} className="mr-2" />
              <span className="text-xs">마인드플로우 삭제하기</span>
            </Button>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default WorkflowList;
