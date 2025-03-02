"use client";

import { ScheduleProvider } from "./schedule/ScheduleProvider";
import ScheduleButton from "./schedule/ScheduleButton";
import ScheduleList from "./schedule/ScheduleList";

const Schedule = () => {
  return (
    <ScheduleProvider>
      <ScheduleButton />
      <ScheduleList />
    </ScheduleProvider>
  );
};

export default Schedule;
