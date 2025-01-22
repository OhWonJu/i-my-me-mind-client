import { Node } from "@xyflow/react";

import { TaskBlock, TaskType } from "./task";

export interface AppNodeData {
  type: TaskType;
  nodeTitle?: string | undefined;
  blockValues: Record<string, string>;
  blockList: TaskBlock[];
  editable: boolean;
  [key: string]: any;
}

export interface AppNode extends Node {
  data: AppNodeData;
}

export interface BlockProps {
  nodeId: string;
  block: TaskBlock;
  value: string;
  editable: boolean;
  updateNodeBlockValue: (newValue: string) => void;
}
