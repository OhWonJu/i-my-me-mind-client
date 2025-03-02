"use client";

import React, { PropsWithChildren, useCallback } from "react";
import { useReactFlow } from "@xyflow/react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

import { TaskBlock } from "@imymemind/core/types/task";
import { AppNode } from "@imymemind/core/types/appNode";

import { cn } from "@imymemind/core/lib/utils";

import NodeBlockField from "./NodeBlockField";

const reorder = (list: TaskBlock[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const NodeBlocks = ({
  children,
  nodeId,
}: PropsWithChildren<{ nodeId: string }>) => {
  const { getNode, updateNodeData } = useReactFlow();
  const node = getNode(nodeId) as AppNode;
  const blocklist = node.data.blockList;

  const onDragEnd = useCallback(
    (result: any) => {
      if (!result.destination) {
        return;
      }

      if (result.destination.index === result.source.index) {
        return;
      }

      const newBlocklist = reorder(
        blocklist,
        result.source.index,
        result.destination.index
      );

      updateNodeData(nodeId, {
        blockList: newBlocklist,
      });
    },
    [blocklist, nodeId, updateNodeData]
  );

  return (
    <OverlayScrollbarsComponent
      defer
      options={{ scrollbars: { autoHide: "scroll" } }}
    >
      <div className="nowheel nodarg relative flex flex-col w-full bg-card-foreground overflow-hidden overflow-y-scroll">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={`${nodeId}`}>
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {children}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </OverlayScrollbarsComponent>
  );
};

export const NodeBlock = ({
  index,
  block,
  nodeId,
}: {
  index: number;
  block: TaskBlock;
  nodeId: string;
}) => {
  // TODO: 전역 상태로 preiew 인지 확인 후 NodeBlockField 에 전달

  return (
    <Draggable key={block.name} draggableId={block.name} index={index}>
      {(provided, snapshot) => {
        if (snapshot.isDragging) {
          const offsetEl = document.querySelector(
            `[data-rfd-draggable-id='${provided.draggableProps["data-rfd-draggable-id"]}']`
          ) as HTMLElement;

          // @ts-ignore
          provided.draggableProps.style = {
            ...provided.draggableProps.style,
            left: offsetEl ? offsetEl.offsetLeft : 0,
            top: offsetEl ? offsetEl.offsetTop : 0,
          };
        }

        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={cn("w-full", snapshot.isDragging && "!w-full")}
            style={{
              ...provided.draggableProps.style,
            }}
          >
            <div
              className={cn(
                "bg-card w-full",
                snapshot.isDragging &&
                  "rounded-md shadow-md max-h-[300px] overflow-hidden"
              )}
            >
              <NodeBlockField
                block={block}
                nodeId={nodeId}
                dragHandleProps={provided.dragHandleProps}
              />
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};
