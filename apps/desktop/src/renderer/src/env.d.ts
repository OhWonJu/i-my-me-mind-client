/// <reference types="vite/client" />

import { ElectronAPI } from "@electron-toolkit/preload";
import { CommonResponse } from "@imymemind/core/types/api/common";

import {
  CreateWorkflowResponse,
  DeleteWorkflowResponse,
  GetWorkflowDetailResponse,
  GetWorkflowListResponse,
  UpdateWorkflowRequestBody,
} from "@imymemind/core/types/api/workflow";
import { CollaboratorRole } from "@imymemind/core/types/schema";

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      createWorkflow: (
        workspaceName: string,
        ownerId: string,
        role: CollaboratorRole
      ) => Promise<CreateWorkflowResponse>;
      getWorkflowList: () => Promise<GetWorkflowListResponse>;
      getWorkflowDetail: (
        workflowId: string
      ) => Promise<GetWorkflowDetailResponse>;
      updateWorkflow: (
        workflowId: string,
        updateData: UpdateWorkflowRequestBody
      ) => Promise<CommonResponse>;
      deleteWorkflow: (workflowId: string) => Promise<DeleteWorkflowResponse>;
      uploadSafeFile: (
        workflowId: string,
        fileName: string,
        fileData: ArrayBuffer
      ) => Promise<unknown>;
      clearAssets: (
        workflowId: string,
        requestedAssets: string[]
      ) => Promise<CommonResponse>;
      uploadThumbnail: (
        workflowId: string,
        fileData: ArrayBuffer
      ) => Promise<CommonResponse>;
    };
  }
}
