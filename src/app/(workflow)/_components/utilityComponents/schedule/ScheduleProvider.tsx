import React, { useState } from "react";
import { useReactFlow } from "@xyflow/react";

import { AppNode } from "@/types/appNode";
import { TaskBlockType } from "@/types/task";

import ScheduleContext, { DateNode } from "./ScheduleContext";
import { ChecklistItemType } from "../../blocks/ChecklistBlock";

interface ScheduleProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

const filteringDateNodes = (nodes: AppNode[]) => {
  const filteredNodes = nodes.filter((node) => !!node.data.todoDate);
  return filteredNodes;
};

const filteringDateNodesWithMonth = (nodes: AppNode[], date?: Date) => {
  if (!date) return [];

  const dateNodes = filteringDateNodes(nodes);

  const filteredNodes = dateNodes.filter((node) => {
    const endDate = new Date(node.data?.todoDate?.endDate);
    return (
      endDate.getMonth() === date.getMonth() &&
      endDate.getFullYear() === date.getFullYear()
    );
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

  let itemCount = 0;

  const dateNodes = filterdDateNodesWithMonth.map((node): DateNode => {
    let checklistItems: ChecklistItemType[] = [];

    node.data.blockList
      .filter((block) => block.type === TaskBlockType.CHECKLIST)
      .forEach(
        (block) =>
          (checklistItems = JSON.parse(
            node.data.blockValues[block.name]
          ) as ChecklistItemType[])
      );

    itemCount += checklistItems.length;

    return {
      nodeId: node.id,
      nodeTitle: node.data.nodeTitle!,
      startDate: node.data.todoDate.startDate,
      endDate: node.data.todoDate.endDate,
      checklistItems,
    };
  });

  const handleExtend = () => setIsExtend((prev) => !prev);

  return (
    <ScheduleContext.Provider
      value={{
        activeDate,
        isExtend,
        dateNodes,
        itemCount,
        setIsExtend: handleExtend,
        setActiveDate: (date: Date) => setActiveDate(date),
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};
