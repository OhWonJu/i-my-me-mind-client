"use client";

import { useModal } from "@imymemind/core/stores/useModalStore";

import { ModalBody, ModalFooter, ModalLayout } from "../ui/Modal";
import { Button } from "../ui";

const CommonConfirmModal = () => {
  const { isOpen, onClose, data } = useModal();

  const { confirmAction, infomation } = data?.commonConfirm ?? {};

  const confirmButtonHandler = () => {
    confirmAction?.();
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
          <p className="text-sm whitespace-pre-wrap">{infomation}</p>
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
