import { create } from "zustand";

export type ModalType =
  | "login"
  | "commonConfirm"
  | "deleteWorkflow"
  | "addBlock"
  | "deleteNode"
  | "deleteBlock"
  | "deleteUser";

// interface ModalData {
//   blockAdd?: {
//     addAction?: ({
//       name,
//       helperText,
//       type,
//     }: {
//       name: string;
//       helperText?: string;
//       type: TaskBlockType;
//     }) => void;
//   };
//   nodeDelete?: {
//     deleteAction?: Function;
//   };
//   workflowDelete?: {
//     deleteAction?: Function;
//   };
//   commonConfirm?: {
//     infomation?: string;
//     confirmAction?: Function;
//   };
// }

interface ModalStore<T = any> {
  type: ModalType | null;
  data: T | null;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: T) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>(set => ({
  type: null,
  data: null,
  isOpen: false,
  onOpen: (type, data) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, data: null, isOpen: false }),
}));

export function useTypeSafeModal<T>() {
  return useModal() as ModalStore<T>;
}
