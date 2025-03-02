import { LucideProps, SquareCheck } from "lucide-react";

import { TaskBlockType } from "@imymemind/core/types/task";

const Checklist = {
  type: TaskBlockType.CHECKLIST,
  name: "checklist",
  helperText: "체크 리스트",
  icon: (props: LucideProps) => <SquareCheck {...props} />,
};

export default Checklist;
