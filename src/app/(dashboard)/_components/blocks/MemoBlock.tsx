"use client";

import { ElementRef, useRef, useState } from "react";
import TextAreaAutoSize from "react-textarea-autosize";

import { BlockProps } from "@/types/appNode";

import { BlockHandler } from "./_components/BlockHandler";

const MemoBlock = ({
  nodeId,
  block,
  value,
  editable,
  updateNodeBlockValue,
}: BlockProps) => {
  const [internalValue, setInternalValue] = useState(value);

  const inputRef = useRef<ElementRef<"textarea">>(null);

  const disableInput = () => {
    let savedValue;
    if (internalValue !== "") savedValue = internalValue;
    else savedValue = internalValue ? internalValue : "";

    if (internalValue) updateNodeBlockValue && updateNodeBlockValue(savedValue);
    setInternalValue(savedValue);
  };

  const onInput = (value: string) => {
    setInternalValue(value);
  };

  return (
    <div className="flex-1 w-full pb-6">
      <BlockHandler
        nodeId={nodeId}
        blockName={block.name}
        blockType={block.type}
      />
      <TextAreaAutoSize
        ref={inputRef}
        value={internalValue || ""}
        placeholder="내용을 입력해주세요...."
        disabled={!editable}
        onChange={(e) => onInput(e.target.value)}
        onBlur={disableInput}
        className="flex-1 w-full h-full min-h-[150px] text-xs bg-transparent break-keep outline-none resize-none text-wrap px-8"
      />
    </div>
  );
};

export default MemoBlock;