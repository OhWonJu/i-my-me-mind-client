import { createContext, useContext } from "react";

import { CollaboratorRole } from "@imymemind/core/types/schema";

export type WorkflowInfoContextType = {
  role?: CollaboratorRole;
  editable: boolean;
  uploadHandler?: (file: File) => Promise<string | Record<string, any>>;
};

export const WorkflowInfoContext = createContext<WorkflowInfoContextType>({
  role: undefined,
  editable: false,
  uploadHandler: (file: File) => Promise.resolve(""),
});

export const useWorkflowInfoContext = () => useContext(WorkflowInfoContext);
export default WorkflowInfoContext;
