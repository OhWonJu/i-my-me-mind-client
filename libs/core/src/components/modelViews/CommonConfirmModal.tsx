"use client";

import React from "react";

import { useModal } from "@imymemind/core/stores/useModalStore";

import { ModalBody, ModalFooter, ModalLayout } from "../ui/Modal";
import { Button } from "../ui";

const CommonConfirmModal = () => {
  const { isOpen, onClose, data } = useModal();

  const confirmActionHandler = data?.commonConfirm?.confirmAction;

  const confirmButtonHandler = () => {
    confirmActionHandler?.();
    onClose();
  };

  const ModalHeader = <span className="font-semibold text-xl">알림</span>;

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
            windows 설치 파일은 아직 공증 받지 않았어요.
            <br />
            설치 시 경고 문구가 출력될 수 있어요.
            <br />
            I MY ME MIND 는 외부와 어떠한 통신도 하지 않아요.
            <br />
            그러니 걱정하지 마세요.
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
          <Button variant="outline" onClick={confirmButtonHandler}>
            <span className="pt-[2px] text-center content-center">
              다운로드 하기
            </span>
          </Button>
        </div>
      </ModalFooter>
    </ModalLayout>
  );
};

export default CommonConfirmModal;
