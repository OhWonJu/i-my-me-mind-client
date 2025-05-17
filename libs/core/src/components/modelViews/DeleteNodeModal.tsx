"use client";

import React from "react";

import {
  useModal,
  useTypeSafeModal,
} from "@imymemind/core/stores/useModalStore";

import { ModalBody, ModalFooter, ModalLayout } from "../ui/Modal";
import { Button } from "../ui";

export interface DeleteNodeModalProps {
  deleteAction?: Function;
}

const DeleteNodeModal = () => {
  const { isOpen, onClose, data } = useTypeSafeModal<DeleteNodeModalProps>();

  const nodeDeletHandler = data?.deleteAction;

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
        <div className="w-full text-center">
          <p className="text-sm">
            노드를 삭제하면 내부의 블록 정보도 함께 삭제되며
            <br />
            삭제된 정보는 되돌릴 수 없어요.
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
