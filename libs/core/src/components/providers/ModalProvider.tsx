"use client";

import { Suspense } from "react";

import { useModal } from "@imymemind/core/stores/useModalStore";

import {
  AddBlockModal,
  CommonConfirmModal,
  DeleteNodeModal,
  DeleteWorkflowModal,
} from "../modelViews";

const ModalProvider = () => {
  const type = useModal(state => state.type);

  return (
    <Suspense>
      {type === "addBlock" && <AddBlockModal />}
      {type === "commonConfirm" && <CommonConfirmModal />}
      {type === "deleteNode" && <DeleteNodeModal />}
      {type === "deleteWorkflow" && <DeleteWorkflowModal />}
    </Suspense>
  );
};

export default ModalProvider;
