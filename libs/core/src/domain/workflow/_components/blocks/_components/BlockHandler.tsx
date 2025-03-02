"use client";

import React, { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";
import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import { GripVerticalIcon, Trash } from "lucide-react";

import { AppNode } from "@imymemind/core/types/appNode";

import { Button } from "@imymemind/core/components/ui";
import { Label } from "@imymemind/core/components/ui/label";
import { BlockRegistry } from "@imymemind/core/lib/workflow/block/registry";
import { TaskBlockType } from "@imymemind/core/types/task";

export const BlockHandler = ({
  nodeId,
  blockName,
  blockType,
  dragHandleProps,
}: {
  nodeId: string;
  blockName: string;
  blockType: TaskBlockType;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
}) => {
  const block = BlockRegistry[blockType];

  const { getNode, updateNodeData } = useReactFlow();
  const node = getNode(nodeId) as AppNode;
  const { blockList, blockValues } = node.data;

  const removeBlock = useCallback(() => {
    const updatedBlockList = blockList.filter(
      block => block.name !== blockName
    );

    delete blockValues[blockName];

    updateNodeData(nodeId, {
      blockList: updatedBlockList,
    });
  }, [blockList, blockName, blockValues, nodeId, updateNodeData]);

  return (
    <div className="group flex justify-between items-center w-full min-h-[50px] px-4 mb-2">
      <Label className="text-xs flex items-center gap-1">
        {block.icon && <block.icon size={15} />}
        <span>{blockName.split("-")[0]}</span>
      </Label>
      <div className="flex">
        <Button
          variant="plain"
          size="icon"
          onClick={removeBlock}
          className="hidden group-hover:flex hover:bg-primary-foreground h-7 w-7"
        >
          <Trash size={14} />
        </Button>

        <Button
          variant="plain"
          size="icon"
          onClick={() => null}
          {...dragHandleProps}
          className="hidden group-hover:flex hover:bg-primary-foreground h-7 w-7"
        >
          <GripVerticalIcon size={14} />
        </Button>
      </div>
    </div>
  );
};
