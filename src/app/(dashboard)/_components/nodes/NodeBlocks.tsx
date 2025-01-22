"use client";

import React, { PropsWithChildren } from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

import { TaskBlock } from "@/types/task";

import NodeBlockField from "./NodeBlockField";

export const NodeBlocks = ({ children }: PropsWithChildren<{}>) => {
  return (
    <OverlayScrollbarsComponent
      defer
      options={{ scrollbars: { autoHide: "scroll" } }}
    >
      <div className="nowheel nodarg flex flex-col w-full overflow-hidden overflow-y-auto pb-4">
        {children}
      </div>
    </OverlayScrollbarsComponent>
  );
};

export const NodeBlock = ({
  block,
  nodeId,
}: {
  block: TaskBlock;
  nodeId: string;
}) => {
  // TODO: 전역 상태로 preiew 인지 확인 후 NodeBlockField 에 전달

  return (
    <div className="relative flex justify-start pt-4 w-full">
      <div className="bg-card w-full">
        <NodeBlockField block={block} nodeId={nodeId} />
      </div>
    </div>
  );
};
