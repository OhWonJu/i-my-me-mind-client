import { ListCheck, LucideProps } from "lucide-react";

import { TaskType } from "@/types/task";

const Todo = {
  type: TaskType.TODO,
  label: "할 일",
  icon: (props: LucideProps) => <ListCheck {...props} />,
  isDone: false,
};

export default Todo;
