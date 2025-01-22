"use client";

import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { Blocks, EllipsisVertical, Trash, X } from "lucide-react";

import { AppNodeData } from "@/types/appNode";
import { TaskBlockType } from "@/types/task";

import { cn } from "@/lib/utils";
import { useOutsideClick } from "@/hooks/useOutsideClick";

import { useModal } from "@/stores/useModalStore";

import { Button } from "@/components/ui";

const UtilityBox = ({
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
  const { setNodes, setEdges, updateNodeData } = useReactFlow();

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

  // TODO : 모달 안내
  const deleteNode = useCallback(() => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
    setEdges((prevEdges) =>
      prevEdges.filter(
        (edge) => !(edge.source === nodeId || edge.target === nodeId)
      )
    );
  }, [nodeId, setEdges, setNodes]);

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

export default UtilityBox;
