import React from "react";
import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInMonths,
} from "date-fns";

import { WorkflowList } from "@imymemind/core/types/schema";

const formatRelativeDate = (date: Date): string => {
  const now = new Date();
  const minutes = differenceInMinutes(now, date);
  const hours = differenceInHours(now, date);
  const days = differenceInDays(now, date);
  const months = differenceInMonths(now, date);

  if (minutes < 1) return "최근";
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 30) return `${days}일 전`;
  return `${months}개월 전`;
};

const WorkflowCard = ({ workflow }: { workflow: WorkflowList }) => {
  const a = formatRelativeDate(workflow.updatedAt);

  return (
    <a
      className="flex flex-col w-full space-y-2"
      href={`/workflow/${workflow.id}`}
    >
      <div className="w-full aspect-[16/9] bg-background rounded-lg overflow-hidden object-contain shadow-inner">
        <img src={workflow.thumbnailUrl} alt={`${workflow.name}'s thumbnail`} />
      </div>
      <div className="flex flex-col w-full overflow-hidden">
        <strong className="truncate">{workflow.name}</strong>
        <span className="text-xs text-primary/50">{a}에 수정됨</span>
      </div>
    </a>
  );
};

export default WorkflowCard;
