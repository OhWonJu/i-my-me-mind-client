export interface Workflow {
  name: string;
  id: string;
  data: string | null;
  publish: boolean;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowList {
  name: string;
  id: string;
  publish: boolean;
  updatedAt: Date;
}
