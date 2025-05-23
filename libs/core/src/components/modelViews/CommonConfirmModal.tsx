"use client";

import { useTypeSafeModal } from "@imymemind/core/stores/useModalStore";

import { ModalBody, ModalFooter, ModalLayout } from "../ui/Modal";
import { Button } from "../ui";

export interface CommonConfirmModalProps {
  infomation?: string;
  confirmContent?: string;
  confirmAction?: Function;
}

const CommonConfirmModal = () => {
  const { isOpen, onClose, data } = useTypeSafeModal<CommonConfirmModalProps>();

  const { confirmContent, confirmAction, infomation } = data ?? {};

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
          <Button variant="outline" className="" onClick={onClose}>
            <span className="pt-[2px] text-center content-center">취소</span>
          </Button>
          <Button
            variant="flat"
            className="bg-blue-400 hover:bg-blue-500"
            onClick={confirmButtonHandler}
          >
            <span className="pt-[2px] text-center content-center">
              {confirmContent ?? "확인"}
            </span>
          </Button>
        </div>
      </ModalFooter>
    </ModalLayout>
  );
};

export default CommonConfirmModal;
