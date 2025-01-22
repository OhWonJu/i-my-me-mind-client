"use client";

import React, { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";
import { Trash } from "lucide-react";

import { AppNode } from "@/types/appNode";

import { Button } from "@/components/ui";
import { Label } from "@/components/ui/label";
import { BlockRegistry } from "@/lib/workflow/block/registry";
import { TaskBlockType } from "@/types/task";

export const BlockHandler = ({
  nodeId,
  blockName,
  blockType,
}: {
  nodeId: string;
  blockName: string;
  blockType: TaskBlockType;
}) => {
  const block = BlockRegistry[blockType];

  const { getNode, updateNodeData } = useReactFlow();
  const node = getNode(nodeId) as AppNode;
  const { blockList, blockValues } = node.data;

  const removeBlock = useCallback(() => {
    const updatedBlockList = blockList.filter(
      (block) => block.name !== blockName
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
        {blockName.split("-")[0]}
      </Label>
      <Button
        className="hidden group-hover:flex hover:bg-primary-foreground h-7 w-7"
        variant="plain"
        size="icon"
        onClick={removeBlock}
      >
        <Trash size={14} />
      </Button>
    </div>
  );
};
