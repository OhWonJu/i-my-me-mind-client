"use client";

import React from "react";
import { NodeProps } from "@xyflow/react";

import { AppNodeData } from "@/types/appNode";

import NodeCard from "./NodeCard";
import NodeHandler from "./NodeHandler";
import { NodeBlock, NodeBlocks } from "./NodeBlocks";

import UtilityBox from "./_components/UtilityBox";

const NodeComponent = (props: NodeProps) => {
  const nodeData = props.data as AppNodeData;

  return (
    <NodeCard nodeId={props.id} isSelected={props.selected}>
      <NodeHandler nodeId={props.id} taskType={nodeData.type} />
      <NodeBlocks>
        {nodeData.blockList.map((block) => (
          <NodeBlock key={block.name} block={block} nodeId={props.id} />
        ))}
      </NodeBlocks>
      <UtilityBox
        nodeId={props.id}
        nodeData={nodeData}
        selected={props.selected!}
      />
    </NodeCard>
  );
};

export default React.memo(NodeComponent);

NodeComponent.displayName = "NodeComponent";
