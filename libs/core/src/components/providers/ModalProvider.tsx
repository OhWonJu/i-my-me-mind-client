"use client";

import { Suspense } from "react";

import { useModal } from "@imymemind/core/stores/useModalStore";

import { AddBlockModal, DeleteNodeModal } from "../modelViews";
import DeleteWorkflowModal from "../modelViews/DeleteWorkflowModal";

const ModalProvider = () => {
  const type = useModal(state => state.type);

  return (
    <Suspense>
      {type === "addBlock" && <AddBlockModal />}
      {type === "deleteNode" && <DeleteNodeModal />}
      {type === "deleteWorkflow" && <DeleteWorkflowModal />}
    </Suspense>
  );
};

export default ModalProvider;
