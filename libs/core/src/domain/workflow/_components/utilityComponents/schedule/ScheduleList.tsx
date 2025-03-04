"use client";

import React, { useMemo } from "react";
import { useReactFlow } from "@xyflow/react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

import { Calendar } from "@imymemind/core/components/ui/calendar";

import { DateNode, useScheduleContext } from "./ScheduleContext";
import ChecklistItem from "../../blocks/_components/ChecklistItem";

const ScheduleList = () => {
  const { getNode, setCenter } = useReactFlow();

  const { dateNodes, activeDate, setActiveDate, isExtend } =
    useScheduleContext();

  const handleChangeMonth = (changedDate: Date) => {
    setActiveDate(changedDate);
    setActiveDate(changedDate);
  };

  const onScheduleListItemDubleClick = (nodeId: string) => {
    const node = getNode(nodeId);
    if (!node) return;
    const { position, measured } = node;
    if (!position || !measured) return;

    const { width, height } = measured;
    const x = position.x + width! / 2;
    const y = position.y + height! / 2;
    if (x === undefined || y === undefined) return;

    setCenter(x, y, { zoom: 1.2, duration: 500 });
  };

  if (!isExtend) return null;

  return (
    <aside className="fixed right-8 top-0 pt-24 pb-8 h-md:w-[400px] h-screen -z-10">
      <div className="flex h-md:flex-col h-full w-full bg-card p-6 rounded-2xl shadow-lg gap-x-6 h-md:gap-y-6">
        <div className="w-[300px] h-md:w-full select-none">
          <Calendar
            mode="single"
            month={activeDate}
            onMonthChange={handleChangeMonth}
            selected={new Date()}
            className="p-0"
          />
        </div>
        <div className="flex flex-col flex-1 w-[300px] h-md:w-full overflow-y-scroll scrollbar-hide space-y-4">
          {dateNodes.map((node, index) => (
            <ScheduleListItem
              key={node.nodeId}
              node={node}
              onItemDubleClick={onScheduleListItemDubleClick}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

const ScheduleListItem = ({
  node,
  onItemDubleClick,
}: {
  node: DateNode;
  onItemDubleClick: (nodeId: string) => void;
}) => {
  const formattedDate = useMemo(() => {
    const startDateFormat = node.startDate
      ? format(node?.startDate, "yyyy.M.d", { locale: ko })
      : null;
    const endDateFormat = node?.endDate
      ? format(node?.endDate, "yyyy.M.d", { locale: ko })
      : null;

    const tempFormatArray: any[] = [null, null, null];
    tempFormatArray[0] = startDateFormat;
    tempFormatArray[2] = endDateFormat;
    if (!!tempFormatArray[0] && !!tempFormatArray[2]) tempFormatArray[1] = "-";
    if (tempFormatArray[0] === tempFormatArray[2]) return tempFormatArray[0];

    const formatDate = tempFormatArray.join(" ");

    return formatDate;
  }, [node.endDate, node.startDate]);

  const checklistItemCount = node.checklistItems.length;

  return (
    <div onDoubleClick={() => onItemDubleClick(node.nodeId)}>
      <div className="flex flex-col mb-2 select-none cursor-pointer space-y-1">
        <strong className="w-[60%] truncate">{node.nodeTitle}</strong>
        <div className="flex justify-between items-center text-xs font-semibold text-primary/50">
          <span>
            할 일 {checklistItemCount > 999 ? "+999" : checklistItemCount}개
          </span>
          <span className="text-right">{formattedDate}</span>
        </div>
      </div>
      <div className="flex flex-col w-full space-y-1">
        {node.checklistItems.map((item, index) => (
          <ChecklistItem
            key={`${node.nodeId}-${index}`}
            editable={false}
            isDone={item.isDone}
            value={item.value}
            className="!text-xs"
          />
        ))}
      </div>
    </div>
  );
};

export default ScheduleList;
