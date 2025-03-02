import { LucideProps, StickyNote } from "lucide-react";

import { TaskBlockType } from "@imymemind/core/types/task";
const Memo = {
  type: TaskBlockType.MEMO,
  name: "memo",
  helperText: "간단한 메모",
  icon: (props: LucideProps) => <StickyNote {...props} />,
};

export default Memo;
