import { UploadResponse } from "@renderer/types/uploads";

export const uploadSafeFile = async (
  workflowId: string,
  file: File
): Promise<string | undefined> => {
  const arrayBuffer = await file.arrayBuffer(); // ArrayBuffer 변환

  const res = (await window.api.uploadSafeFile(
    workflowId,
    file.name,
    arrayBuffer
  )) as UploadResponse;

  if (res.ok) {
    return res.url; // file:// 경로 반환
  } else {
    console.error("파일 업로드 오류:", res.error);
    return undefined;
  }
};

export const uploadThumbnail = async (
  workflowId: string,
  file: File
): Promise<string | undefined> => {
  const arrayBuffer = await file.arrayBuffer(); // ArrayBuffer 변환

  const res = (await window.api.uploadThumbnail(
    workflowId,
    arrayBuffer
  )) as UploadResponse;

  if (res.ok) {
    return res.url;
  } else {
    console.error("파일 업로드 오류:", res.error);
    return undefined;
  }
};
