import fs from "fs";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { app } from "electron";

import {
  WorkflowWithRole,
  CollaboratorRole,
  WorkflowList,
} from "../../../../libs/core/src/types/schema";

import { CommonResponse } from "../../../../libs/core/src/types/api/common";
import {
  GetWorkflowListResponse,
  CreateWorkflowResponse,
  GetWorkflowDetailResponse,
  UpdateWorkflowRequestBody,
  DeleteWorkflowResponse,
} from "../../../../libs/core/src/types/api/workflow";

export const generateUniqueWorkspacePath = (
  basePath: string
): { workspaceId: string; workspacePath: string } => {
  let workspaceId = uuidv4();
  let workspacePath = join(basePath, workspaceId);

  while (fs.existsSync(workspacePath)) {
    console.log(
      `UUID ${workspaceId}가 이미 존재합니다. 새로운 UUID 생성 중...`
    );
    workspaceId = uuidv4();
    workspacePath = join(basePath, workspaceId);
  }

  return { workspaceId, workspacePath };
};

export const createWorkflow = async (
  event,
  workspaceName: string,
  ownerId: string,
  role: CollaboratorRole
): Promise<CreateWorkflowResponse> => {
  try {
    const basePath = join(app.getPath("documents"), "imymemind", "workflow");

    const { workspaceId, workspacePath } =
      generateUniqueWorkspacePath(basePath);

    fs.mkdirSync(workspacePath, { recursive: true });
    fs.mkdirSync(join(workspacePath, "assets"), { recursive: true });

    const metadataPath = join(workspacePath, "metadata.json");
    const metadata = {
      name: workspaceName,
      id: workspaceId,
      publish: false,
      ownerId,
      role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

    // data.mdx 생성
    const mdxPath = join(workspacePath, "data.mdx");
    fs.writeFileSync(mdxPath, "{}", "utf-8");

    const workflowData: WorkflowWithRole = {
      name: workspaceName,
      id: workspaceId,
      data: null,
      publish: false,
      ownerId: ownerId,
      createdAt: new Date(),
      updatedAt: new Date(),
      role,
    };

    return { ok: true, data: workflowData };
  } catch (error) {
    return { ok: false, error: String(error) };
  }
};

export const getWorkflowList = async (): Promise<GetWorkflowListResponse> => {
  try {
    const basePath = join(app.getPath("documents"), "imymemind", "workflow");

    if (!fs.existsSync(basePath)) {
      return { ok: true, data: [] };
    }

    const workspaceDirs = fs.readdirSync(basePath).filter(dir => {
      return fs.statSync(join(basePath, dir)).isDirectory();
    });

    const workflows: WorkflowList[] = [];

    for (const workspaceId of workspaceDirs) {
      const metadataPath = join(basePath, workspaceId, "metadata.json");

      if (!fs.existsSync(metadataPath)) continue;

      try {
        const metadataContent = fs.readFileSync(metadataPath, "utf-8");
        const metadata = JSON.parse(metadataContent);

        workflows.push({
          name: metadata.name,
          id: metadata.id,
          publish: metadata.publish,
          updatedAt: new Date(metadata.updatedAt),
        });
      } catch (error) {
        console.error(
          `워크플로우 ${workspaceId}의 metadata.json 파싱 실패`,
          error
        );
        continue;
      }
    }

    workflows.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

    return { ok: true, data: workflows };
  } catch (error) {
    console.error("워크플로우 리스트 가져오기 실패:", error);
    return { ok: false, data: undefined, error: String(error) };
  }
};

export const getWorkflowDetail = async (
  _,
  workflowId: string
): Promise<GetWorkflowDetailResponse> => {
  try {
    const basePath = join(
      app.getPath("documents"),
      "imymemind",
      "workflow",
      workflowId
    );

    const metadataPath = join(basePath, "metadata.json");
    const mdxPath = join(basePath, "data.mdx");

    // 워크플로우 존재 여부 확인
    if (!fs.existsSync(metadataPath)) {
      return { ok: false, error: "Workflow not found" };
    }

    // metadata.json 읽기
    const metadataContent = fs.readFileSync(metadataPath, "utf-8");
    const metadata = JSON.parse(metadataContent);

    // data.mdx 읽기 (없으면 null)
    let mdxContent: string | null = null;
    if (fs.existsSync(mdxPath)) {
      mdxContent = fs.readFileSync(mdxPath, "utf-8");
    }

    // 응답 데이터 생성
    const data: WorkflowWithRole = {
      name: metadata.name,
      id: metadata.id,
      data: mdxContent,
      publish: metadata.publish,
      ownerId: metadata.ownerId, // ownerId 필드 추가 필요
      createdAt: new Date(metadata.createdAt),
      updatedAt: new Date(metadata.updatedAt),
      role: metadata.role || undefined, // 역할이 있을 경우 포함
    };

    return { ok: true, data };
  } catch (error) {
    console.error("워크플로우 상세 조회 실패:", error);
    return { ok: false, error: String(error) };
  }
};

export const updateWorkflow = async (
  _,
  workflowId: string,
  updateData: UpdateWorkflowRequestBody
): Promise<CommonResponse> => {
  try {
    const basePath = join(
      app.getPath("documents"),
      "imymemind",
      "workflow",
      workflowId
    );
    const metadataPath = join(basePath, "metadata.json");
    const mdxPath = join(basePath, "data.mdx");

    // 워크플로우 존재 여부 확인
    if (!fs.existsSync(metadataPath)) {
      return { ok: false, error: "Workflow not found" };
    }

    // 1️⃣ metadata.json 업데이트
    const metadataContent = fs.readFileSync(metadataPath, "utf-8");
    const metadata = JSON.parse(metadataContent);

    if (updateData.name !== undefined) metadata.name = updateData.name;
    if (updateData.publish !== undefined) metadata.publish = updateData.publish;
    if (updateData.collaboratorsId !== undefined)
      metadata.collaboratorsId = updateData.collaboratorsId;

    metadata.updatedAt = new Date().toISOString(); // 수정 시간 갱신

    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

    // 2️⃣ data.mdx 업데이트 (data 필드가 있을 경우)
    if (updateData.data !== undefined) {
      fs.writeFileSync(mdxPath, updateData.data);
    }

    return { ok: true };
  } catch (error) {
    console.error("워크플로우 업데이트 실패:", error);
    return { ok: false, error: String(error) };
  }
};

const deleteDirectoryRecursive = (dirPath: string) => {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach(file => {
      const curPath = join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteDirectoryRecursive(curPath); // 하위 폴더 재귀 삭제
      } else {
        fs.unlinkSync(curPath); // 파일 삭제
      }
    });
    fs.rmdirSync(dirPath); // 폴더 삭제
  }
};

export const deleteWorkflow = async (
  _,
  workflowId: string
): Promise<DeleteWorkflowResponse> => {
  try {
    const workflowPath = join(
      app.getPath("documents"),
      "imymemind",
      "workflow",
      workflowId
    );

    // 워크플로우 존재 여부 확인
    if (!fs.existsSync(workflowPath)) {
      return { ok: false, error: "Workflow not found" };
    }

    // 디렉토리 삭제
    deleteDirectoryRecursive(workflowPath);

    return { ok: true, data: { workflowId } };
  } catch (error) {
    console.error("워크플로우 삭제 실패:", error);
    return { ok: false, error: String(error) };
  }
};
