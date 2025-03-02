import React from "react";

import { TaskType } from "@imymemind/core/types/task";

import { TaskRegistry } from "@imymemind/core/lib/workflow/node/registry";

import TodoBadge from "./TodoBadge";
import ToDoDateBadge from "./ToDoDateBadge";

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
      return (
        <>
          <ToDoDateBadge nodeId={nodeId} />
          <TodoBadge nodeId={nodeId} />
        </>
      );
  }
};

export default TaskBadges;
