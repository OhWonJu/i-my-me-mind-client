import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/task";

export function CreateFlowNode(
  nodeType: TaskType,
  position?: { x: number; y: number }
): AppNode {
  return {
    id: crypto.randomUUID(),
    type: "Node",
    dragHandle: ".drag-handle",
    data: {
      type: nodeType,
      blockValues: {},
      blockList: [],
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
    id: crypto.randomUUID(),
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
