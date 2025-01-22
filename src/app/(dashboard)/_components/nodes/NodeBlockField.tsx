"use client";

import { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";

import { AppNode } from "@/types/appNode";
import { TaskBlock, TaskBlockType } from "@/types/task";

import { ChecklistBlock, MarkdownBlock, MemoBlock } from "../blocks";

const NodeBlockField = ({
  block,
  nodeId,
}: {
  block: TaskBlock;
  nodeId: string;
}) => {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as AppNode;
  const value = node?.data.blockValues?.[block.name];
  const editable = node?.data.editable;

  const updateNodeBlockValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        blockValues: {
          ...node?.data.blockValues,
          [block.name]: newValue,
        },
      });
    },
    [nodeId, updateNodeData, block.name, node?.data.blockValues]
  );

  switch (block.type) {
    case TaskBlockType.CHECKLIST:
      return (
        <ChecklistBlock
          nodeId={nodeId}
          block={block}
          value={value}
          editable={editable}
          updateNodeBlockValue={updateNodeBlockValue}
        />
      );
    case TaskBlockType.MEMO:
      return (
        <MemoBlock
          nodeId={nodeId}
          block={block}
          value={value}
          editable={editable}
          updateNodeBlockValue={updateNodeBlockValue}
        />
      );
    case TaskBlockType.MARKDOWN:
      return (
        <MarkdownBlock
          nodeId={nodeId}
          block={block}
          value={value}
          editable={editable}
          updateNodeBlockValue={updateNodeBlockValue}
        />
      );
    default:
      return (
        <div className="w-full ">
          <p className="text-xs text-muted-foreground">add New Block</p>
        </div>
      );
  }
};

export default NodeBlockField;
