"use client";

import { Badge } from "@/components/ui/badge";
import { TaskRegistry } from "@/lib/workflow/node/registry";
import { TaskType } from "@/types/task";
import { ListCheck } from "lucide-react";
import React, { useCallback } from "react";
import TitleInput from "./_components/TitleInput";
import { useReactFlow } from "@xyflow/react";
import { AppNode } from "@/types/appNode";
import TaskBadges from "./_components/TaskBadges";

interface NodeHandlerProps {
  nodeId: string;
  taskType: TaskType;
}

const NodeHandler = ({ nodeId, taskType }: NodeHandlerProps) => {
  const task = TaskRegistry[taskType];

  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as AppNode;
  const { title, editable } = node?.data;

  const updateNodeTitle = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        nodeTitle: newValue,
      });
    },
    [nodeId, updateNodeData]
  );

  return (
    <div className="drag-handle flex items-center gap-2 p-4 bg-card">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-1 items-center mr-4 overflow-hidden space-x-2">
          {task.label && (
            <p className="text-xs font-semibold uppercase text-muted-foreground text-nowrap">
              {task.label}
            </p>
          )}
          <TitleInput
            initialTitle={title}
            // not editable || preview
            preview={!editable}
            onChange={updateNodeTitle}
          />
        </div>
        <div className="flex gap-1 items-center">
          {/* TOOD: 카드 타입, 등등 표기하기 */}
          <TaskBadges taskType={taskType} nodeId={nodeId} />
          {/* <Button
            variant="plain"
            size="icon"
            onClick={() => null}
            className="drag-handle cursor-grab hover:bg-card-foreground"
          >
            <GripVerticalIcon size={20} />
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default NodeHandler;
