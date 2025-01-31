import { TaskType } from "@/types/task";
import React from "react";
import TodoBadge from "./TodoBadge";
import { TaskRegistry } from "@/lib/workflow/node/registry";

const TaskBadges = ({
  nodeId,
  taskType,
}: {
  nodeId: string;
  taskType: TaskType;
}) => {
  const task = TaskRegistry[taskType];

  switch (task.type) {
    case "PLAIN":
      return;
    case "TODO":
      return <TodoBadge nodeId={nodeId} />;
  }
};

export default TaskBadges;
