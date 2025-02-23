"use client";

import React from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

import { GetWorkflowListResponse, workflowsQueryKeys } from "@/api/workflows";

import { AccordionContent } from "@/components/ui/accordion";
import { DotMenu } from "@/components/icons";

const WorkflowList = () => {
  const data = useQueryClient().getQueryData(
    workflowsQueryKeys.getWorkflowList
  ) as GetWorkflowListResponse;

  const workflowlist = data && data.data ? data.data : [];

  return (
    <>
      {workflowlist &&
        workflowlist.map((item, index) => (
          <AccordionContent key={index} className="pb-2">
            <div className="group select-none flex justify-between items-center hover:bg-card-foreground rounded-md cursor-pointer">
              <Link href={`/workflow/${item.id}`}>
                <p
                  title={item.name}
                  className="flex-1 truncate pl-3 py-1 cursor-pointer"
                >
                  {item.name}
                </p>
              </Link>
              <button className="px-3 py-1" onClick={() => alert("ITEM LIST")}>
                <DotMenu className="hidden group-hover:block w-3 h-3 rotate-90" />
              </button>
            </div>
          </AccordionContent>
        ))}
    </>
  );
};

export default WorkflowList;
