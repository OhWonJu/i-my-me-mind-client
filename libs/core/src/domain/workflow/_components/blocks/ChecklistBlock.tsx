"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { BlockProps } from "@imymemind/core/types/appNode";

import { Button } from "@imymemind/core/components/ui";

import ChecklistItem from "./_components/ChecklistItem";

export type ChecklistItemType = {
  isDone: boolean;
  value: string;
};

const ChecklistBlock = ({
  nodeId,
  block,
  value,
  editable,
  updateNodeBlockValue,
}: BlockProps) => {
  const [internalValue, setInternalValue] = useState<ChecklistItemType[]>(
    JSON.parse(value ?? "[]")
  );

  const addChecklistItem = () => {
    const newState = [...internalValue, { isDone: false, value: "" }];
    setInternalValue(newState);
    updateNodeBlockValue(JSON.stringify(newState));
  };

  const toggleChecklistItemState = (targetIndex: number) => {
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
    <div className="group/checklist flex flex-col flex-1 items-center px-6 gap-y-1">
      {internalValue.map((item, index) => (
        <ChecklistItem
          key={`${block.name}-${index}-${internalValue.length}`}
          isDone={item.isDone}
          value={item.value}
          editable={editable}
          toggleAction={() => toggleChecklistItemState(index)}
          updateAction={(newValue: string) =>
            updateChecklistItemValue(index, newValue)
          }
          deleteAction={() => removeChecklistItem(index)}
        />
      ))}
      {/* Add item button */}
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
  );
};

export default ChecklistBlock;
