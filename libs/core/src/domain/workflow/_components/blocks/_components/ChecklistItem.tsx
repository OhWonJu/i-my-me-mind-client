"use client";

import React, { useState } from "react";
import { CheckIcon, X } from "lucide-react";

import { cn } from "@imymemind/core/lib/utils";

import { Button } from "@imymemind/core/components/ui";
import { Input } from "@imymemind/core/components/ui/input";

import { ChecklistItemType } from "../ChecklistBlock";

interface ChecklistItemProps extends ChecklistItemType {
  editable: boolean;
  className?: string;
  updateAction?: (newVlaue: string) => void;
  toggleAction?: () => void;
  deleteAction?: () => void;
}

const ChecklistItem = ({
  isDone,
  value,
  editable,
  className,
  deleteAction,
  toggleAction,
  updateAction,
}: ChecklistItemProps) => {
  const [internalValue, setInternalValue] = useState(value);

  return (
    <div
      className={cn(
        "group/item flex w-full items-center rounded-lg px-1",
        isDone && "bg-green-500/10"
      )}
    >
      <Button
        variant="plain"
        size="icon"
        onClick={toggleAction}
        className="p-0 h-7 w-7 mr-1"
      >
        <CheckIcon
          size={14}
          className={cn(
            "stroke-[3px]",
            isDone ? "stroke-green-500" : "stroke-primary-foreground"
          )}
        />
      </Button>

      <Input
        value={internalValue || ""}
        placeholder="체크리스트를 입력해주세요."
        disabled={!editable}
        onChange={e => setInternalValue(e.target.value)}
        onBlur={e => updateAction?.(e.target.value)}
        className={cn(
          "!text-sm border-none truncate disabled:opacity-100 placeholder:text-primary/30 bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0 p-0 disabled:cursor-default",
          className
        )}
      />

      <div className="h-full min-w-7">
        {editable && (
          <Button
            className="hidden group group-hover/item:flex h-7 w-7"
            variant="plain"
            size="icon"
            onClick={deleteAction}
          >
            <X
              size={14}
              className="stroke-primary-foreground group-hover:stroke-primary"
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChecklistItem;
