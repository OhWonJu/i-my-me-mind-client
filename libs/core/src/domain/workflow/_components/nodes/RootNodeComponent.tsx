"use client";

import React, { useCallback } from "react";
import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";

import { AppNodeData } from "@imymemind/core/types/appNode";

import { cn } from "@imymemind/core/lib/utils";

import NodeTitleInput from "./_components/NodeTitleInput";

const RootNodeComponent = (props: NodeProps) => {
  const nodeData = props.data as AppNodeData;

  const { getNode, setCenter, updateNodeData } = useReactFlow();

  const onNodeDubleClick = () => {
    const node = getNode(props.id);
    if (!node) return;
    const { position, measured } = node;
    if (!position || !measured) return;

    const { width, height } = measured;
    const x = position.x + width! / 2;
    const y = position.y + height! / 2;
    if (x === undefined || y === undefined) return;

    setCenter(x, y, { zoom: 1.2, duration: 500 });
  };

  const updateNodeTitle = useCallback(
    (newValue: string) => {
      updateNodeData(props.id, {
        nodeTitle: newValue,
      });
    },
    [props.id, updateNodeData]
  );

  return (
    <>
      <Handle
        type="source"
        position={Position.Top}
        id="top"
        className={cn(
          "!w-4 !h-4 !rounded-full !-z-10",
          !props.selected && "!bg-border !border-border"
        )}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className={cn(
          "!w-4 !h-4 !rounded-full !-z-10",
          !props.selected && "!bg-border !border-border"
        )}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className={cn(
          "!w-4 !h-4 !rounded-full !-z-10",
          !props.selected && "!bg-border !border-border"
        )}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        className={cn(
          "!w-4 !h-4 !rounded-full !-z-10",
          !props.selected && "!bg-border !border-border"
        )}
      />

      <div
        onDoubleClick={onNodeDubleClick}
        className={cn("drag-handle cursor-pointer px-10 py-8")}
      >
        <NodeTitleInput
          initialTitle={nodeData.nodeTitle}
          onChange={updateNodeTitle}
          className="workflow-title-textarea text-7xl font-bold text-center"
        />
      </div>
    </>
  );
};

export default React.memo(RootNodeComponent);

RootNodeComponent.displayName = "RootNodeComponent";
