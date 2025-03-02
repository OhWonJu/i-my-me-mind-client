"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { Blocks, CopyIcon, EllipsisVertical, Trash, X } from "lucide-react";

import { AppNode, AppNodeData } from "@imymemind/core/types/appNode";
import { TaskBlockType } from "@imymemind/core/types/task";

import { cn } from "@imymemind/core/lib/utils";
import { useOutsideClick } from "@imymemind/core/hooks/useOutsideClick";

import { useModal } from "@imymemind/core/stores/useModalStore";

import { Button } from "@imymemind/core/components/ui";
import { CreateFlowNode } from "@imymemind/core/lib/workflow/createFlowNode";

const NodeUtilityBox = ({
  nodeId,
  nodeData,
  selected,
}: {
  nodeId: string;
  nodeData: AppNodeData;
  selected: boolean;
}) => {
  const [extend, setExtend] = useState(false);

  const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const { isOpen, onOpen } = useModal();
  const { getNode, updateNodeData, addNodes, deleteElements } = useReactFlow();

  const addNewBlock = ({
    name,
    helperText,
    type,
  }: {
    name: string;
    helperText?: string;
    type: TaskBlockType;
  }) => {
    const blockNameWithUUID = `${name}-${crypto.randomUUID()}`;

    updateNodeData(nodeId, {
      blockList: nodeData.blockList.concat({
        name: blockNameWithUUID,
        type: type,
        helperText: helperText,
      }),
    });
  };

  const copyNode = () => {
    const targetNode = getNode(nodeId) as AppNode;

    const targetNodeX = targetNode?.position.x;
    const targetNodeY = targetNode?.position.y;

    const newNode = CreateFlowNode(targetNode?.data.type, {
      x: targetNodeX + 50,
      y: targetNodeY + 50,
    });

    // TODO : 복사시 같은 블록이 아이디를 공유함 - 로직 개선
    addNodes([newNode]);
    updateNodeData(newNode.id, {
      ...nodeData,
      nodeTitle: `${nodeData.nodeTitle} 복사본 `,
    });
  };

  const deleteNode = () => {
    deleteElements({ nodes: [{ id: nodeId }] });
  };

  useLayoutEffect(() => {
    if (!selected) setExtend(false);
  }, [selected]);

  useOutsideClick(!!containerRef.current || !isOpen, containerRef, () =>
    setExtend(false)
  );

  if (!selected) return null;

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute top-4 left-[101.5%] z-20",
        extend && "bg-primary rounded-md"
      )}
    >
      <div className="flex flex-col">
        <div>
          <Button
            variant="flat"
            size="icon"
            onClick={() => setExtend(!extend)}
            className="w-7 h-7"
          >
            {!extend ? (
              <EllipsisVertical className="w-5 h-5 stroke-secondary" />
            ) : (
              <X className="w-5 h-5 stroke-secondary" />
            )}
          </Button>
        </div>
        {extend && (
          <div className="flex flex-col">
            <Button
              onClick={() =>
                onOpen("addBlock", { blockAdd: { addAction: addNewBlock } })
              }
              className="hover:bg-secondary/20"
            >
              <Blocks size={16} className="mr-2" />
              <span className="text-xs">블록 추가하기</span>
            </Button>
            <Button onClick={copyNode} className="hover:bg-secondary/20">
              <CopyIcon size={16} className="mr-2" />
              <span className="text-xs">노드 복사하기</span>
            </Button>
            <Button
              onClick={() =>
                onOpen("deleteNode", {
                  nodeDelete: { deleteAction: deleteNode },
                })
              }
              className="hover:bg-red-600"
            >
              <Trash size={16} className="mr-2" />
              <span className="text-xs">노드 삭제하기</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NodeUtilityBox;
