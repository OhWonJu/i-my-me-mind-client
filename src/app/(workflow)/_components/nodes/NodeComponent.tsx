"use client";

import React from "react";
import { NodeProps } from "@xyflow/react";

import { AppNodeData } from "@/types/appNode";

import NodeCard from "./NodeCard";
import NodeHandler from "./NodeHandler";
import { NodeBlock, NodeBlocks } from "./NodeBlocks";

import UtilityBox from "./_components/UtilityBox";

const NodeComponent = (props: NodeProps) => {
  const nodeId = props.id;
  const nodeData = props.data as AppNodeData;

  return (
    <NodeCard nodeId={props.id} isSelected={props.selected}>
      <NodeHandler nodeId={props.id} taskType={nodeData.type} />
      <NodeBlocks nodeId={nodeId}>
        {nodeData.blockList.map((block, index) => (
          <NodeBlock
            key={block.name}
            index={index}
            block={block}
            nodeId={props.id}
          />
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
