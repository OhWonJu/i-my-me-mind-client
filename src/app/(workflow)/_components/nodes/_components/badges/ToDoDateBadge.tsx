"use client";

import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { AppNode } from "@/types/appNode";
import { useReactFlow } from "@xyflow/react";
import { ArrowRight, CalendarIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Button } from "@/components/ui";
import { Calendar } from "@/components/ui/calendar";

interface TodoDate {
  startDate?: Date;
  endDate?: Date;
}

const ToDoDateBadge = ({ nodeId }: { nodeId: string }) => {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as AppNode;

  const todoDate = node.data.todoDate as TodoDate;

  const [toggleDate, setToggleDate] = useState<"start" | "end">("start");
  const [startDate, setStartDate] = useState<Date | undefined>(
    todoDate?.startDate ? new Date(todoDate.startDate) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    todoDate?.endDate ? new Date(todoDate.endDate) : undefined
  );

  const onDateUpdate = (date?: Date) => {
    if (toggleDate === "end") {
      setEndDate(date);
      return;
    }

    setStartDate(date);
    if (!endDate) setEndDate(date);
    if (date && endDate) {
      date.getTime() > endDate.getTime() && setEndDate(date);
    }
  };

  const hasDate = useMemo(
    () => !!todoDate?.startDate || !!todoDate?.endDate,
    [todoDate?.startDate, todoDate?.endDate]
  );

  const formattedDate = useMemo(() => {
    const startDateFormat = todoDate?.startDate
      ? format(todoDate?.startDate, "yyyy/M/d", { locale: ko })
      : null;
    const endDateFormat = todoDate?.endDate
      ? format(todoDate?.endDate, "yyyy/M/d", { locale: ko })
      : null;

    let tempFormatArray: any[] = [null, null, null];
    tempFormatArray[0] = startDateFormat;
    tempFormatArray[2] = endDateFormat;
    if (!!tempFormatArray[0] && !!tempFormatArray[2]) tempFormatArray[1] = "-";
    if (tempFormatArray[0] === tempFormatArray[2]) return tempFormatArray[0];

    let formatDate = tempFormatArray.join(" ");

    return formatDate;
  }, [todoDate?.endDate, todoDate?.startDate]);

  const getTodoDate = () => {
    if (!endDate && !startDate) return undefined;

    const result = { startDate, endDate };
    if (!startDate) result.startDate = endDate;
    if (!endDate) result.endDate = startDate;

    return result;
  };

  const updateToDoDate = () => {
    updateNodeData(nodeId, {
      todoDate: getTodoDate(),
    });
  };

  return (
    <Popover>
      <PopoverTrigger className="">
        <Badge
          className={cn(
            "text-xs p-1",
            hasDate ? "bg-primary hover:bg-primary" : "bg-primary-foreground"
          )}
          onClick={() => null}
        >
          {hasDate ? (
            <span className="text-secondary px-1">{formattedDate}</span>
          ) : (
            <CalendarIcon size={16} className="stroke-white" />
          )}
        </Badge>
      </PopoverTrigger>
      <PopoverContent
        className="flex flex-col w-[350px] space-y-4 p-6"
        align="start"
      >
        <div className="flex justify-between items-center">
          <h4 className="font-semibold leading-none">일정 설정하기</h4>
          <Button
            useRipple
            className="rounded-full"
            onClick={() => updateToDoDate()}
          >
            확인
          </Button>
        </div>
        <div className="flex w-full gap-x-2 justify-between items-center">
          <Button
            variant="plain"
            className={cn(
              "flex-1 text-sm",
              toggleDate === "start" && "bg-primary text-secondary"
            )}
            onClick={() => setToggleDate("start")}
          >
            {startDate ? (
              format(startDate, "M월 d일 (EEE)", { locale: ko })
            ) : (
              <span>시작일</span>
            )}
          </Button>
          <ArrowRight className="w-4 h-4" />
          <Button
            variant="plain"
            className={cn(
              "flex-1 text-sm",
              toggleDate === "end" && "bg-primary text-secondary"
            )}
            onClick={() => setToggleDate("end")}
          >
            {endDate ? (
              format(endDate, "M월 d일 (EEE)", { locale: ko })
            ) : (
              <span>종료일</span>
            )}
          </Button>
        </div>
        <Calendar
          mode="single"
          selected={toggleDate === "start" ? startDate : endDate}
          onSelect={onDateUpdate}
          initialFocus
          disabled={
            toggleDate === "start" ? undefined : (date) => date < startDate!
          }
          className="flex w-full justify-center select-none p-0"
        />
      </PopoverContent>
    </Popover>
  );
};

export default ToDoDateBadge;
