"use client";

import React, { useMemo, useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { ArrowRight, CalendarIcon } from "lucide-react";

import { cn } from "@imymemind/core/lib/utils";
import { AppNode } from "@imymemind/core/types/appNode";

import { Badge } from "@imymemind/core/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@imymemind/core/components/ui/popover";
import { Button } from "@imymemind/core/components/ui";
import { Calendar } from "@imymemind/core/components/ui/calendar";

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

  const dDay = useMemo(() => {
    if (!todoDate?.endDate) return "";

    const today = new Date();
    const endDate = new Date(todoDate.endDate);

    const diffTime = today.getTime() - endDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const days = Math.abs(diffDays) > 9999 ? "..." : diffDays;

    return diffDays === 0 ? "D-Day" : `${diffDays > 0 ? "D+" : "D"}${days}`;
  }, [todoDate?.endDate]);

  const getTodoDate = () => {
    if (!endDate && !startDate) return undefined;

    const result = { startDate, endDate };
    if (!startDate) result.startDate = endDate;
    if (!endDate) result.endDate = startDate;

    return result;
  };

  const updateToDoDate = () => {
    const updatedDate = getTodoDate();

    setStartDate(updatedDate?.startDate);
    setEndDate(updatedDate?.endDate);

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
            <span className="text-secondary px-1">{dDay}</span>
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
              "flex-1 text-sm h-13",
              toggleDate === "start" && "bg-primary text-secondary"
            )}
            onClick={() => setToggleDate("start")}
          >
            {startDate ? (
              <p>
                {format(startDate, "yyyy년")}
                <br />
                {format(startDate, "M월 d일 (EEE)", { locale: ko })}
              </p>
            ) : (
              <span>시작일</span>
            )}
          </Button>
          <ArrowRight className="w-4 h-4" />
          <Button
            variant="plain"
            className={cn(
              "flex-1 text-sm h-13",
              toggleDate === "end" && "bg-primary text-secondary"
            )}
            onClick={() => setToggleDate("end")}
          >
            {endDate ? (
              <p>
                {format(endDate, "yyyy년")}
                <br />
                {format(endDate, "M월 d일 (EEE)", { locale: ko })}
              </p>
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
            toggleDate === "start" ? undefined : date => date < startDate!
          }
          className="flex w-full justify-center select-none p-0"
        />
      </PopoverContent>
    </Popover>
  );
};

export default ToDoDateBadge;
