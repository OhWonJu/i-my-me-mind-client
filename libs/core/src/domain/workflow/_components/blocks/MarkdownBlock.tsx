"use client";

import { BlockProps } from "@imymemind/core/types/appNode";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import MarkdownEditor from "../../markdown/MarkdownEditor";

const MarkdownBlock = ({
  nodeId,
  block,
  value,
  editable,
  updateNodeBlockValue,
}: BlockProps) => {
  return (
    <article className="h-full w-full">
      <MarkdownEditor
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
