import { createContext, useContext } from "react";

import { ChecklistItemType } from "../../blocks/ChecklistBlock";

export interface DateNode {
  nodeId: string;
  nodeTitle: string;
  startDate?: Date;
  endDate?: Date;
  checklistItems: ChecklistItemType[];
}

export type ScheduleContextType = {
  isExtend: boolean;
  activeDate: Date;
  dateNodes: DateNode[];

  setIsExtend: () => void;
  setActiveDate: (date: Date) => void;
};

export const ScheduleContext = createContext<ScheduleContextType>({
  isExtend: false,
  activeDate: new Date(),
  dateNodes: [],

  setIsExtend: () => {},
  setActiveDate: () => {},
});

export const useScheduleContext = () => useContext(ScheduleContext);
export default ScheduleContext;
