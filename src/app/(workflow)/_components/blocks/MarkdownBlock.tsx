"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { BlockProps } from "@/types/appNode";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import { Skeleton } from "@/components/ui/skeleton";

const MarkdownBlockLoader = () => {
  return (
    <div className="w-full px-10">
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
  );
};

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
        loading: () => <MarkdownBlockLoader />,
      }),
    []
  );

  return (
    // <article
    //   className="h-full w-[110%] -ml-[5%] scale-90"
    //   style={{ transformOrigin: "top center" }}
    // >
    <article className="h-full w-full">
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
