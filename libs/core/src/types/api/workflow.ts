import { Workflow, WorkflowList, WorkflowWithRole } from "../schema";
import { CommonResponse } from "./common";

export interface GetWorkflowListResponse extends CommonResponse {
  data?: WorkflowList[] | undefined;
}

export interface GetWorkflowDetailResponse extends CommonResponse {
  data?: WorkflowWithRole;
}

export interface CreateWorkflowResponse extends CommonResponse {
  data?: Workflow;
}

export interface UpdateWorkflowRequestBody {
  name?: string;
  data?: string;
  publish?: string;
  thumbnailUrl?: string;
  collaboratorsId?: string[];
}

export interface UpdateWorkflowResponse extends CommonResponse {}

export interface DeleteWorkflowResponse extends CommonResponse {
  data?: {
    workflowId: string;
  };
}

export const workflowsQueryKeys = {
  getWorkflowList: ["workflows", "list"] as const,
  getWorkflowDetailKey: (workflowId?: string | null) =>
    ["workflows", workflowId] as const,
};
