"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { BlockProps } from "@/types/appNode";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import { Skeleton } from "@/components/ui/skeleton";
import { BlockHandler } from "./_components/BlockHandler";

const MarkdownBlock = ({
  nodeId,
  block,
  value,
  editable,
  updateNodeBlockValue,
}: BlockProps) => {
  const Editor = useMemo(
    () =>
      dynamic(() => import("@/components/markdown/MarkdownEditor"), {
        ssr: false,
        loading: () => (
          <div className="w-full px-3">
            <div className="space-y-4">
              <Skeleton className="h-16 w-[60%] sm:w-[30%]" />
              <Skeleton className="h-6 w-[100%] sm:w-[50%]" />
              <Skeleton className="h-6 w-[80%] sm:w-[40%]" />
              <Skeleton className="h-6 w-[100%] sm:w-[50%]" />
              <Skeleton className="h-6 w-[60%] sm:w-[60%]" />
              <Skeleton className="h-6 w-[80%] sm:w-[40%]" />
              <Skeleton className="h-6 w-[40%] sm:w-[20%]" />
            </div>
          </div>
        ),
      }),
    []
  );

  // Renders the editor instance using a React component.
  return (
    <article className="flex-1 min-h-[500px] w-full pb-6">
      <BlockHandler
        nodeId={nodeId}
        blockName={block.name}
        blockType={block.type}
      />
      <Editor
        nodeId={nodeId}
        block={block}
        value={value}
        editable={editable}
        updateNodeBlockValue={updateNodeBlockValue}
      />
    </article>
  );
};

export default MarkdownBlock;
