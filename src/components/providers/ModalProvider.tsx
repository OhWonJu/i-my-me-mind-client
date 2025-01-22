"use client";

import { Suspense } from "react";
import { useModal } from "@/stores/useModalStore";
import { AddBlockModal, DeleteNodeModal } from "../modelViews";

const ModalProvider = () => {
  const type = useModal((state) => state.type);

  return (
    <Suspense>
      {type === "addBlock" && <AddBlockModal />}
      {type === "deleteNode" && <DeleteNodeModal />}
    </Suspense>
  );
};

export default ModalProvider;
