import React, { useState } from "react";
import { useReactFlow } from "@xyflow/react";

import { AppNode } from "@imymemind/core/types/appNode";
import { TaskBlockType } from "@imymemind/core/types/task";

import ScheduleContext, { DateNode } from "./ScheduleContext";
import { ChecklistItemType } from "../../blocks/ChecklistBlock";

interface ScheduleProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

const filteringDateNodes = (nodes: AppNode[]) => {
  const filteredNodes = nodes.filter(node => !!node.data.todoDate);
  return filteredNodes;
};

const isTargetDateUnderCurrentDate = (
  date: Date,
  startDate: Date,
  endDate: Date
) => {
  const currentFullYear = date.getFullYear();
  const currentMonth = date.getMonth();

  const startFullYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();

  const endFullYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();

  const isStartDateUnderCurrentDate =
    startFullYear < currentFullYear ||
    (startFullYear === currentFullYear && startMonth <= currentMonth);

  const isEndDateOverCurrentDate =
    endFullYear > currentFullYear ||
    (endFullYear === currentFullYear && endMonth >= currentMonth);

  const isEndDateEqualCurrentDate =
    endFullYear === currentFullYear && endMonth === currentMonth;

  return (
    (isStartDateUnderCurrentDate && isEndDateOverCurrentDate) ||
    isEndDateEqualCurrentDate
  );
};

const filteringDateNodesWithMonth = (nodes: AppNode[], date?: Date) => {
  if (!date) return [];

  const dateNodes = filteringDateNodes(nodes);

  const filteredNodes = dateNodes.filter(node => {
    const startDate = new Date(node.data?.todoDate?.startDate);
    const endDate = new Date(node.data?.todoDate?.endDate);

    return isTargetDateUnderCurrentDate(date, startDate, endDate);
  });

  // 현재 날짜와 endDate 가 가장 가까운 순으로 정렬
  filteredNodes.sort((a, b) => {
    const endDateA = new Date(a.data?.todoDate?.endDate);
    const endDateB = new Date(b.data?.todoDate?.endDate);
    const diffA = Math.abs(endDateA.getTime() - date.getTime());
    const diffB = Math.abs(endDateB.getTime() - date.getTime());

    return diffA - diffB;
  });

  return filteredNodes;
};

export const ScheduleProvider = ({ children }: ScheduleProviderProps) => {
  const [activeDate, setActiveDate] = useState<Date>(new Date());
  const [isExtend, setIsExtend] = useState(false);

  const { getNodes } = useReactFlow();

  const filterdDateNodesWithMonth = filteringDateNodesWithMonth(
    getNodes() as AppNode[],
    activeDate
  );

  const dateNodes = filterdDateNodesWithMonth.map((node): DateNode => {
    let checklistItems: ChecklistItemType[] = [];

    node.data.blockList
      .filter(block => block.type === TaskBlockType.CHECKLIST)
      .forEach(
        block =>
          (checklistItems = JSON.parse(
            node.data.blockValues[block.name]
          ) as ChecklistItemType[])
      );

    return {
      nodeId: node.id,
      nodeTitle: node.data.nodeTitle as string,
      startDate: node.data.todoDate.startDate,
      endDate: node.data.todoDate.endDate,
      checklistItems,
    };
  });

  const handleExtend = () => setIsExtend(prev => !prev);

  return (
    <ScheduleContext.Provider
      value={{
        activeDate,
        isExtend,
        dateNodes,
        setIsExtend: handleExtend,
        setActiveDate: (date: Date) => setActiveDate(date),
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};
