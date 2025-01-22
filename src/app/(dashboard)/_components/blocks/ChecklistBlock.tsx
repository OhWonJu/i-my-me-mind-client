"use client";

import { useState } from "react";
import { Check, Plus, Trash } from "lucide-react";

import { BlockProps } from "@/types/appNode";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui";
import { Input } from "@/components/ui/input";

import { BlockHandler } from "./_components/BlockHandler";

type ChecklistItem = {
  isDone: boolean;
  value: string;
};

interface ChecklistItemProps extends ChecklistItem {
  editable: boolean;
  updateAction: (newVlaue: string) => void;
  toggleAction: () => void;
  deleteAction: () => void;
}

const ChecklistBlock = ({
  nodeId,
  block,
  value,
  editable,
  updateNodeBlockValue,
}: BlockProps) => {
  const [internalValue, setInternalValue] = useState<ChecklistItem[]>(
    JSON.parse(value ?? "[]")
  );

  const addChecklistItem = () => {
    const newState = [...internalValue, { isDone: false, value: "" }];
    setInternalValue(newState);
    updateNodeBlockValue(JSON.stringify(newState));
  };

  const toggleChecklistItem = (targetIndex: number) => {
    if (!editable) return;

    const newState = [...internalValue];
    newState[targetIndex].isDone = !newState[targetIndex].isDone;
    setInternalValue(newState);
    updateNodeBlockValue(JSON.stringify(internalValue));
  };

  const updateChecklistItemValue = (targetIndex: number, newValue: string) => {
    if (!editable) return;

    const newState = [...internalValue];
    newState[targetIndex].value = newValue;
    setInternalValue(newState);
    updateNodeBlockValue(JSON.stringify(internalValue));
  };

  const removeChecklistItem = (targetIndex: number) => {
    if (!editable) return;

    const newState = internalValue.filter((_, index) => index !== targetIndex);
    setInternalValue(newState);
    updateNodeBlockValue(JSON.stringify(newState));
  };

  return (
    <div className="flex-1 w-full pb-6">
      <BlockHandler
        nodeId={nodeId}
        blockName={block.name}
        blockType={block.type}
      />
      <div className="group/checklist flex flex-col flex-1 items-center px-6 gap-y-1">
        {internalValue.map((item, index) => (
          <ChecklistItem
            key={`${block.name}-${index}`}
            isDone={item.isDone}
            value={item.value}
            editable={editable}
            toggleAction={() => toggleChecklistItem(index)}
            updateAction={(newValue: string) =>
              updateChecklistItemValue(index, newValue)
            }
            deleteAction={() => removeChecklistItem(index)}
          />
        ))}
        {editable && (
          <div className="w-7 h-7 mt-2">
            <Button
              variant="outline"
              size="icon"
              onClick={addChecklistItem}
              className="hidden group-hover/checklist:flex group hover:border-primary hover:bg-transparent w-full h-full"
            >
              <Plus
                size={14}
                className="stroke-primary-foreground group-hover:stroke-primary"
              />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const ChecklistItem = ({
  isDone,
  value,
  editable,
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
        <Check
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
        onChange={(e) => setInternalValue(e.target.value)}
        onBlur={(e) => updateAction(e.target.value)}
        className="!text-xs border-none truncate disabled:opacity-100 bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0 p-0"
      />
      <div className="h-full min-w-7">
        {editable && (
          <Button
            className="hidden group group-hover/item:flex h-7 w-7"
            variant="plain"
            size="icon"
            onClick={deleteAction}
          >
            <Trash
              size={14}
              className="stroke-primary-foreground group-hover:stroke-primary"
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChecklistBlock;
