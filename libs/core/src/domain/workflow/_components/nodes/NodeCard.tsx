"use client";

import React, { PropsWithChildren } from "react";
import { Handle, NodeResizer, Position, useReactFlow } from "@xyflow/react";

import { cn } from "@imymemind/core/lib/utils";

const NodeCard = ({
  children,
  nodeId,
  isSelected = false,
}: PropsWithChildren<{ nodeId: string; isSelected?: boolean }>) => {
  const { getNode, setCenter } = useReactFlow();

  const onNodeDubleClick = () => {
    const node = getNode(nodeId);
    if (!node) return;
    const { position, measured } = node;
    if (!position || !measured) return;

    const { width, height } = measured;
    const x = position.x + width! / 2;
    const y = position.y + height! / 2;
    if (x === undefined || y === undefined) return;

    setCenter(x, y, { zoom: 1.2, duration: 500 });
  };

  return (
    <>
      <NodeResizer
        color="#181818"
        isVisible={isSelected}
        minWidth={400}
        minHeight={200}
      />

      <Handle
        type="source"
        position={Position.Top}
        id="top"
        className={cn(
          "!w-4 !h-3 !rounded-md !-z-10",
          !isSelected && "!bg-border !border-border"
        )}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className={cn(
          "!w-3 !h-4 !rounded-md !-z-10",
          !isSelected && "!bg-border !border-border"
        )}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className={cn(
          "!w-4 !h-3 !rounded-md !-z-10",
          !isSelected && "!bg-border !border-border"
        )}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        className={cn(
          "!w-3 !h-4 !rounded-md !-z-10",
          !isSelected && "!bg-border !border-border"
        )}
      />

      <div
        onDoubleClick={onNodeDubleClick}
        className={cn(
          "rounded-xl cursor-pointer bg-card shadow-md overflow-hidden border-2 border-separate min-w-[400px] w-full min-h-[200px] h-full text-xs flex flex-col",
          isSelected && "border-primary"
        )}
      >
        {children}
      </div>
    </>
  );
};

export default NodeCard;
