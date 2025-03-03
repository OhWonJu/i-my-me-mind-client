import { app, net } from "electron";
import fs from "fs";
import { join } from "path";

import { CommonResponse } from "../../../../libs/core/src/types/api/common";
import { updateWorkflow } from "./workflows";

const getWorkflowFolderPath = (workflowId?: string) => {
  if (workflowId)
    return join(app.getPath("documents"), `imymemind/workflow/${workflowId}`);
  return join(app.getPath("documents"), "imymemind/workflow");
};

const getAssetsFolderPath = (workflowId: string) => {
  const workflowFolderPath = getWorkflowFolderPath(workflowId);
  return `${workflowFolderPath}/assets`;
};

export const uploadSafeFile = async (
  _,
  workflowId: string,
  fileName: string,
  fileData: ArrayBuffer
): Promise<unknown> => {
  try {
    const basePath = getAssetsFolderPath(workflowId);

    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath, { recursive: true });
    }

    const filePath = join(basePath, fileName);

    fs.writeFileSync(filePath, new Uint8Array(fileData));

    return { ok: true, url: `safe-file://${filePath}` };
  } catch (error) {
    console.error("파일 업로드 실패:", error);
    return { ok: false, error: String(error) };
  }
};

export const uploadThumbnail = async (
  event,
  workflowId: string,
  fileData: ArrayBuffer
): Promise<unknown> => {
  try {
    const basePath = getWorkflowFolderPath(workflowId);

    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath, { recursive: true });
    }

    const filePath = join(basePath, "thumbnail.png");

    fs.writeFileSync(filePath, new Uint8Array(fileData));

    const url = `safe-file://${filePath}`;

    await updateWorkflow(event, workflowId, { thumbnailUrl: url });

    return { ok: true, url };
  } catch (error) {
    console.error("파일 업로드 실패:", error);
    return { ok: false, error: String(error) };
  }
};

const getRealPath = (safeFileUrl: string) => {
  return decodeURIComponent(safeFileUrl.replace("safe-file://", ""));
};

export const getSafeFile = async request => {
  const filePath = getRealPath(request.url);

  if (!filePath.startsWith(getWorkflowFolderPath())) {
    throw new Error("Unauthorized file access");
  }

  if (fs.existsSync(filePath)) {
    return net.fetch(`file://${filePath}`);
  } else {
    throw new Error("FILE_NOT_FOUND");
  }
};

export const clearAssests = async (
  _,
  workflowId: string,
  requestedAssets: string[]
): Promise<CommonResponse> => {
  try {
    const assetFolderPath = getAssetsFolderPath(workflowId);

    // 현재 assets 폴더에 있는 모든 파일 목록
    const existingFiles = fs
      .readdirSync(assetFolderPath)
      .map(file => join(assetFolderPath, file));

    // 실제 요청된 파일 경로 변환
    const requestedPaths = new Set(requestedAssets.map(getRealPath));

    for (const file of existingFiles) {
      if (!requestedPaths.has(file)) {
        fs.unlinkSync(file); // 파일 삭제
      }
    }

    return { ok: true };
  } catch (error) {
    return { ok: false, error: String(error) };
  }
};
