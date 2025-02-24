"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { WorkflowList as WorkflowListType } from "@/types/schema";
import { cn } from "@/lib/utils";

import {
  deleteWorkflow,
  GetWorkflowListResponse,
  workflowsQueryKeys,
} from "@/api/workflows";

import { AccordionContent } from "@/components/ui/accordion";
import { DotMenu } from "@/components/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui";

const WorkflowList = () => {
  const pathname = usePathname();
  const router = useRouter();

  const data = useQueryClient().getQueryData(
    workflowsQueryKeys.getWorkflowList
  ) as GetWorkflowListResponse;

  const workflowlist = data && data.data ? data.data : [];

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (workflowId: string) => await deleteWorkflow(workflowId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: workflowsQueryKeys.getWorkflowList,
      });

      const isCurrentWorkflow =
        pathname.split("/")[2] === data?.data.workflowId;

      if (isCurrentWorkflow) router.replace("/dashboard");
    },
  });

  if (!workflowlist) return;

  return (
    <>
      {workflowlist.map((item) => (
        <WorkflowListItem key={item.id} item={item} deleteAction={mutate} />
      ))}
    </>
  );
};

const WorkflowListItem = ({
  item,
  deleteAction,
}: {
  item: WorkflowListType;
  deleteAction: (worflowId: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AccordionContent className="pb-2">
      <div className="group/list select-none flex justify-between items-center hover:bg-card-foreground rounded-md cursor-pointer">
        <Link href={`/workflow/${item.id}`}>
          <p
            title={item.name}
            className="flex-1 truncate pl-3 py-1 cursor-pointer"
          >
            {item.name}
          </p>
        </Link>
        <Popover onOpenChange={setIsOpen}>
          <PopoverTrigger>
            <button className="gird place-items-center w-6 h-full">
              <DotMenu
                className={cn(
                  "group-hover/list:block text-primary/50 hover:text-primary w-3 h-3 rotate-90",
                  isOpen && "block",
                  !isOpen && "hidden"
                )}
              />
            </button>
          </PopoverTrigger>
          <PopoverContent align="start" className="group w-fit p-0 z-[99999]">
            <Button
              variant="plain"
              onClick={() => deleteAction(item.id)}
              className="text-red-600 hover:bg-card-foreground"
            >
              <Trash size={16} className="mr-2" />
              <span className="text-xs">워크플로우 삭제하기</span>
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </AccordionContent>
  );
};

export default WorkflowList;
