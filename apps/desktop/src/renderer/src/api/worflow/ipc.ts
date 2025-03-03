import { queryOptions } from "@tanstack/react-query";

import {
  UpdateWorkflowRequestBody,
  workflowsQueryKeys,
} from "@imymemind/core/types/api/workflow";

export function getWorkflowList() {
  return queryOptions({
    queryKey: workflowsQueryKeys.getWorkflowList,
    queryFn: async () => {
      const res = await window.api.getWorkflowList();

      if (!res.ok) throw new Error(res.errorCode);
      else return res;
    },
  });
}

export function getWorkflowDetail(workflowId?: string | null) {
  return queryOptions({
    queryKey: workflowsQueryKeys.getWorkflowDetailKey(workflowId),
    queryFn: async () => {
      const res = await window.api.getWorkflowDetail(workflowId);

      if (!res.ok) throw new Error(res.errorCode);
      else return res;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: !!workflowId,
  });
}

export async function createWorkflow() {
  const res = await window.api.createWorkflow("제목 없음", "local", "ADMIN");

  if (!res.ok) throw new Error(res.errorCode);
  else return res;
}

export async function updatedWorkflow(
  workflowId: string,
  params: UpdateWorkflowRequestBody
) {
  const res = await window.api.updateWorkflow(workflowId, params);

  if (!res.ok) throw new Error(res.errorCode);
  else return res;
}

export async function deleteWorkflow(workflowId: string) {
  const res = await window.api.deleteWorkflow(workflowId);

  if (!res.ok) throw new Error(res.errorCode);
  else return res;
}

export async function clearAssets(
  workflowId: string,
  requestedAssets: string[]
) {
  const res = await window.api.clearAssets(workflowId, requestedAssets);

  if (!res.ok) throw new Error(res.errorCode);
  else return res;
}
