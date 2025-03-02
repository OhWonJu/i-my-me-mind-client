"use client";

import React, { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";

import { TaskType } from "@imymemind/core/types/task";
import { AppNode } from "@imymemind/core/types/appNode";

import { TaskRegistry } from "@imymemind/core/lib/workflow/node/registry";

import { useWorkflowInfoContext } from "../../_context/WorkflowInfoContext";

import NodeTitleInput from "./_components/NodeTitleInput";
import TaskBadges from "./_components/badges/TaskBadges";

interface NodeHandlerProps {
  nodeId: string;
  taskType: TaskType;
}

const NodeHandler = ({ nodeId, taskType }: NodeHandlerProps) => {
  const task = TaskRegistry[taskType];

  const { updateNodeData, getNode } = useReactFlow();
  const { editable: workflowEditable } = useWorkflowInfoContext();

  const node = getNode(nodeId) as AppNode;
  const { nodeTitle } = node?.data ?? { nodeTitle: undefined };

  const updateNodeTitle = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        nodeTitle: newValue,
      });
    },
    [nodeId, updateNodeData]
  );

  return (
    <div className="drag-handle flex items-center gap-2 p-4 bg-card border-b-2">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-1 items-center mr-4 overflow-hidden space-x-2">
          {task.label && (
            <p className="text-xs font-semibold uppercase text-muted-foreground text-nowrap">
              {task.label}
            </p>
          )}
          <NodeTitleInput
            initialTitle={nodeTitle}
            // not editable || preview
            preview={!workflowEditable}
            onChange={updateNodeTitle}
          />
        </div>
        <div className="flex gap-1 items-center">
          {/* TOOD: 카드 타입, 등등 표기하기 */}
          <TaskBadges taskType={taskType} nodeId={nodeId} />
        </div>
      </div>
    </div>
  );
};

export default NodeHandler;
