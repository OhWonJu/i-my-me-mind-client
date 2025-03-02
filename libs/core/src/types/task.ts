export enum TaskType {
  ROOT = "ROOT",
  PLAIN = "PLAIN",
  TODO = "TODO",
}

export enum TaskBlockType {
  MEMO = "MEMO",
  MARKDOWN = "MARKDOWN",
  CHECKLIST = "CHECKLIST",
}

export interface TaskBlock {
  name: string;
  type: TaskBlockType;
  helperText?: string;
  // value?: string;
  [key: string]: any;
}
