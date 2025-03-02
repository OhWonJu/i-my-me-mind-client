import { AppNode } from "@imymemind/core/types/appNode";
import { TaskBlock, TaskType } from "@imymemind/core/types/task";

import { BlockRegistry } from "./block/registry";

export function CreateFlowNode(
  nodeType: TaskType,
  position?: { x: number; y: number }
): AppNode {
  const defaultBlockList: TaskBlock[] = [];

  switch (nodeType) {
    case TaskType.TODO:
      defaultBlockList.push({
        name: `${BlockRegistry.CHECKLIST.name}-${crypto.randomUUID()}`,
        type: BlockRegistry.CHECKLIST.type,
        helperText: BlockRegistry.CHECKLIST.helperText,
      });
      break;
    case TaskType.ROOT:
    case TaskType.PLAIN:
    default:
      break;
  }

  return {
    id: crypto.randomUUID(),
    type: "Node",
    dragHandle: ".drag-handle",
    data: {
      type: nodeType,
      blockValues: {},
      blockList: defaultBlockList,
      nodeTitle: "제목 없음",
      editable: true,
    },
    position: position ?? { x: 0, y: 0 },
  };
}

export function CreateRootFlowNode(
  workFlowTitle: string,
  position?: { x: number; y: number }
): AppNode {
  return {
    id: "root",
    type: "Root",
    dragHandle: ".drag-handle",
    data: {
      type: TaskType.ROOT,
      blockValues: {},
      blockList: [],
      nodeTitle: workFlowTitle,
      editable: false,
    },
    position: position ?? { x: 0, y: 0 },
  };
}
