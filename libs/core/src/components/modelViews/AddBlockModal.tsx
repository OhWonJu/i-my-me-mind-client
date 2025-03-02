"use client";

import { TaskBlockType } from "@imymemind/core/types/task";
import { BlockRegistry } from "@imymemind/core/lib/workflow/block/registry";

import { useModal } from "@imymemind/core/stores/useModalStore";

import { ModalBody, ModalLayout } from "../ui/Modal";
import { Button } from "../ui";

const taskBlocks = BlockRegistry;

const AddBlockModal = () => {
  const { isOpen, onClose, data } = useModal();

  const blockAddHandler = data?.blockAdd?.addAction;

  const addActionHandler = ({
    name,
    helperText,
    type,
  }: {
    name: string;
    helperText?: string;
    type: TaskBlockType;
  }) => {
    blockAddHandler?.({ name, helperText, type });
    onClose();
  };

  const ModalHeader = (
    <span className="font-semibold text-xl">새 블록 추가하기</span>
  );

  return (
    <ModalLayout
      headerComponent={ModalHeader}
      isOpen={isOpen}
      onClose={onClose}
      className="w-[90%] sm:w-[420px]"
    >
      <ModalBody className="space-y-1">
        {Object.entries(taskBlocks).map(([_, task], index) => (
          <Button
            key={index}
            onClick={() =>
              addActionHandler({
                name: task.name,
                helperText: task.helperText,
                type: task.type,
              })
            }
            variant="plain"
            className="justify-between items-center hover:bg-primary/5 text-primary w-full"
          >
            <div className="flex items-center">
              {task.icon && <task.icon size={16} className="mr-2" />}
              <span>{task.name}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {task.helperText}
            </span>
          </Button>
        ))}
      </ModalBody>
    </ModalLayout>
  );
};

export default AddBlockModal;
