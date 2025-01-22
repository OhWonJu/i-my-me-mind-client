import { CreditCard, LucideProps } from "lucide-react";

import { TaskType } from "@/types/task";

// TODO : 가변 인풋 구현

const Plain = {
  type: TaskType.PLAIN,
  label: "기본",
  icon: (props: LucideProps) => <CreditCard {...props} />,
  // blocks: [
  //   {
  //     name: "text",
  //     type: TaskBlockType.STRING,
  //     helperText: "Just simple text",
  //   },
  // ],
};

export default Plain;
