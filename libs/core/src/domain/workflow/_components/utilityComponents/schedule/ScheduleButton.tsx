"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@imymemind/core/components/ui";

import { useScheduleContext } from "./ScheduleContext";

const ScheduleButton = () => {
  const { setIsExtend } = useScheduleContext();

  return (
    <Button
      variant="plain"
      onClick={setIsExtend}
      useRipple
      className="flex px-5 h-[48px] bg-card rounded-full items-center shadow-md select-none"
    >
      <span className="text-sm mr-4 font-semibold">
        {format(new Date(), "yyyy년 M월")}
      </span>
      <CalendarIcon className="w-4 h-4 stroke-[2.5]" />
    </Button>
  );
};

export default ScheduleButton;
