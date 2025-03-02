"use client";

import { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";
import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";

import { AppNode } from "@imymemind/core/types/appNode";
import { TaskBlock, TaskBlockType } from "@imymemind/core/types/task";

import { useWorkflowInfoContext } from "../../_context/WorkflowInfoContext";

import { ChecklistBlock, MarkdownBlock, MemoBlock } from "../blocks";
import BlockCard from "../blocks/_components/BlockCard";
import { BlockHandler } from "../blocks/_components/BlockHandler";

const NodeBlockField = ({
  block,
  nodeId,
  dragHandleProps,
}: {
  block: TaskBlock;
  nodeId: string;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
}) => {
  const { editable: workflowEditable } = useWorkflowInfoContext();
  const { updateNodeData, getNode } = useReactFlow();

  const node = getNode(nodeId) as AppNode;
  const value = node?.data.blockValues?.[block.name];
  const editable = node?.data.editable && workflowEditable;
  const selected = node?.selected ?? false;

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
        <BlockCard>
          <BlockHandler
            nodeId={nodeId}
            blockName={block.name}
            blockType={block.type}
            dragHandleProps={dragHandleProps}
          />
          <ChecklistBlock
            nodeId={nodeId}
            block={block}
            value={value}
            editable={editable}
            updateNodeBlockValue={updateNodeBlockValue}
          />
        </BlockCard>
      );
    case TaskBlockType.MEMO:
      return (
        <BlockCard>
          <BlockHandler
            nodeId={nodeId}
            blockName={block.name}
            blockType={block.type}
            dragHandleProps={dragHandleProps}
          />
          <MemoBlock
            nodeId={nodeId}
            block={block}
            value={value}
            editable={editable}
            updateNodeBlockValue={updateNodeBlockValue}
          />
        </BlockCard>
      );
    case TaskBlockType.MARKDOWN:
      return (
        <BlockCard className="min-h-[300px]">
          <BlockHandler
            nodeId={nodeId}
            blockName={block.name}
            blockType={block.type}
            dragHandleProps={dragHandleProps}
          />
          <MarkdownBlock
            nodeId={nodeId}
            block={block}
            value={value}
            editable={editable && selected}
            updateNodeBlockValue={updateNodeBlockValue}
          />
        </BlockCard>
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
