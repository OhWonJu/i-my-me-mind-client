"use client";

import React from "react";

import { useModal } from "@/stores/useModalStore";
import { ModalBody, ModalFooter, ModalLayout } from "../ui/Modal";
import { Button } from "../ui";
import { Info } from "lucide-react";

const DeleteNodeModal = () => {
  const { isOpen, onClose, data } = useModal();

  const nodeDeletHandler = data?.nodeDelete?.deleteAction;

  const deleteButtonHandler = () => {
    nodeDeletHandler?.();
    onClose();
  };

  const ModalHeader = <span className="font-semibold text-xl">노드 삭제</span>;

  return (
    <ModalLayout
      headerComponent={ModalHeader}
      isOpen={isOpen}
      onClose={onClose}
      // disabled={isLoading}
      className="w-[90%] sm:w-[420px]"
    >
      <ModalBody>
        <div className="w-full">
          <p className="text-sm">
            노드를 삭제하면 되돌릴 수 없어요.
            <br />
            노드를 삭제하면 노드 내부의 블록 정보도 함께 삭제되요.
            <br />
          </p>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="flex w-full justify-end space-x-2">
          <Button
            variant="outline"
            className="bg-primary text-secondary hover:bg-primary/70"
            onClick={onClose}
          >
            <span className="pt-[2px] text-center content-center">취소</span>
          </Button>
          <Button variant="outline" onClick={deleteButtonHandler}>
            <span className="pt-[2px] text-center content-center">확인</span>
          </Button>
        </div>
      </ModalFooter>
    </ModalLayout>
  );
};

export default DeleteNodeModal;
