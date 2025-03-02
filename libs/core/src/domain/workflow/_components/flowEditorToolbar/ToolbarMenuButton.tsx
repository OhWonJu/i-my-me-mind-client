"use client";

import React from "react";

import { TaskType } from "@imymemind/core/types/task";

import { TaskRegistry } from "@imymemind/core/lib/workflow/node/registry";

import { Button } from "@imymemind/core/components/ui";

const ToolbarMenuButton = ({ taskType }: { taskType: TaskType }) => {
  const task = TaskRegistry[taskType];

  const onDragStart = (event: React.DragEvent, type: TaskType) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Button
      variant="plain"
      onClick={() => {}}
      draggable
      onDragStart={event => onDragStart(event, task.type)}
      className="justify-start items-center hover:bg-card-foreground/70 text-primary w-full"
    >
      <div className="flex gap-2 items-center">
        {task.icon && <task.icon size={15} />}
        <span className="text-xs">{task.label} 노드 추가하기</span>
      </div>
    </Button>
  );
};

export default ToolbarMenuButton;
