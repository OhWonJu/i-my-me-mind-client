import { CollaboratorRole } from "@/types/schema";
import { createContext, useContext } from "react";

export type WorkflowInfoContextType = {
  role?: CollaboratorRole;
  editable: boolean;
};

export const WorkflowInfoContext = createContext<WorkflowInfoContextType>({
  role: undefined,
  editable: false,
});

export const useWorkflowInfoContext = () => useContext(WorkflowInfoContext);
export default WorkflowInfoContext;
