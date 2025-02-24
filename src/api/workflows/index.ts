"use client";

import { queryOptions } from "@tanstack/react-query";

import { _DELETE, _GET, _PATCH, _POST, _PUT } from "@/api/rootAPI";
import { CommonResponse } from "@/api/axios/axiosInstance.types";

import { Workflow, WorkflowList, WorkflowWithRole } from "@/types/schema";

export interface GetWorkflowListResponse extends CommonResponse {
  data: WorkflowList[] | undefined;
}

interface GetWorkflowDetailResponse extends CommonResponse {
  data: WorkflowWithRole;
}

interface CreateWorkflowResponse extends CommonResponse {
  data: Workflow;
}

interface UpdateWorkflowRequestBody {
  name?: string;
  data?: string;
  publish?: string;
  collaboratorsId?: string[];
}

interface UpdateWorkflowResponse extends CommonResponse {}

export const workflowsQueryKeys = {
  getWorkflowList: ["workflows", "list"] as const,
  getWorkflowDetailKey: (workflowId?: string | null) =>
    ["workflows", workflowId] as const,
};

export function getWorkflowList() {
  return queryOptions({
    queryKey: workflowsQueryKeys.getWorkflowList,
    queryFn: async () => _GET<GetWorkflowListResponse>("/workflows/list"),
  });
}

export function getWorkflowDetail(workflowId?: string | null) {
  return queryOptions({
    queryKey: workflowsQueryKeys.getWorkflowDetailKey(workflowId),
    queryFn: async () =>
      _GET<GetWorkflowDetailResponse | undefined>(
        `workflows/detail/${workflowId}`
      ),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: !!workflowId,
  });
}

export async function createWorkflow() {
  const res = await _POST<CreateWorkflowResponse>("/workflows/create");
  return res;
}

export async function updateWorkflow(
  workflowId: string,
  params: UpdateWorkflowRequestBody
) {
  const res = await _PATCH<UpdateWorkflowResponse>(`/workflows/${workflowId}`, {
    updateData: params,
  });

  return res;
}

export async function deleteWorkflow(workflowId: string) {
  const res = await _DELETE<CommonResponse>(`/workflows/${workflowId}`);

  return res;
}
