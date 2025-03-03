export interface Workflow {
  name: string;
  id: string;
  data: string | null;
  publish: boolean;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowWithRole extends Workflow {
  role?: CollaboratorRole;
}
export type CollaboratorRole = "ADMIN" | "MODERATOR" | "GUEST";

export interface WorkflowList {
  name: string;
  id: string;
  publish: boolean;
  thumbnailUrl?: string;
  updatedAt: Date;
}
