"use client";

import React, { ElementRef, useRef, useState } from "react";
import TextAreaAutoSize from "react-textarea-autosize";

import { cn } from "@/lib/utils";

interface NodeTitleInputProps {
  initialTitle?: string;
  onChange?: (value: string) => void;
  preview?: boolean;
  className?: string;
}

const NodeTitleInput = ({
  initialTitle,
  onChange,
  preview,
  className,
}: NodeTitleInputProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [internalValue, setInternalValue] = useState(
    initialTitle ?? "제목 없음"
  );

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);

    let savedValue;
    if (internalValue !== "") savedValue = internalValue;
    else savedValue = initialTitle ? initialTitle : "제목 없음";

    if (internalValue) onChange && onChange(savedValue);
    setInternalValue(savedValue);
  };

  const onInput = (value: string) => {
    setInternalValue(value);
  };

  const onKeydown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  return (
    <>
      {isEditing ? (
        <TextAreaAutoSize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeydown}
          value={internalValue}
          onChange={(e) => onInput(e.target.value)}
          maxRows={1}
          className={cn(
            "nodrag text-base font-bold bg-transparent break-words outline-none resize-none truncate text-nowrap",
            className
          )}
        />
      ) : (
        <h2
          role="heading"
          onClick={enableInput}
          className={cn(
            "text-base font-bold break-words outline-none truncate",
            className
          )}
        >
          {internalValue}
        </h2>
      )}
    </>
  );
};

export default NodeTitleInput;
