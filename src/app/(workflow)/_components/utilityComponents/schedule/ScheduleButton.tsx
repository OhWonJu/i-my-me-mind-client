"use client";

import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui";

import { useScheduleContext } from "./ScheduleContext";

const ScheduleButton = () => {
  const { setIsExtend } = useScheduleContext();

  return (
    <Button
      variant="plain"
      onClick={setIsExtend}
      className="flex px-5 h-[48px] bg-card rounded-full items-center shadow-md"
    >
      <span className="text-sm mr-4 font-semibold">
        {format(new Date(), "yyyy년 M월")}
      </span>
      <CalendarIcon className="w-4 h-4 stroke-[2.5]" />
    </Button>
  );
};

export default ScheduleButton;
