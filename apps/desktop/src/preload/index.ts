import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";

import { CollaboratorRole } from "../../../../libs/core/src/types/schema";
import { UpdateWorkflowRequestBody } from "../../../../libs/core/src/types/api/workflow";

// Custom APIs for renderer
const api = {
  createWorkflow: (
    workspaceName: string,
    ownerId: string,
    role: CollaboratorRole
  ) => ipcRenderer.invoke("create-workflow", workspaceName, ownerId, role),
  getWorkflowList: () => ipcRenderer.invoke("get-workflow-list"),
  getWorkflowDetail: (workflowId: string) =>
    ipcRenderer.invoke("get-workflow-detail", workflowId),
  updateWorkflow: (workflowId: string, updateData: UpdateWorkflowRequestBody) =>
    ipcRenderer.invoke("update-workflow", workflowId, updateData),
  deleteWorkflow: (workflowId: string) =>
    ipcRenderer.invoke("delete-workflow", workflowId),
  uploadSafeFile: (
    workflowId: string,
    fileName: string,
    fileData: ArrayBuffer
  ) => ipcRenderer.invoke("upload-safeFile", workflowId, fileName, fileData),
  clearAssets: (workflowId: string, requestedAssets: string[]) =>
    ipcRenderer.invoke("clear-assets", workflowId, requestedAssets),
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
