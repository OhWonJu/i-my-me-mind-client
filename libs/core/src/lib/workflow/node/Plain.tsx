import { CreditCard, LucideProps } from "lucide-react";

import { TaskType } from "@imymemind/core/types/task";

const Plain = {
  type: TaskType.PLAIN,
  label: "기본",
  icon: (props: LucideProps) => <CreditCard {...props} />,
};

export default Plain;
