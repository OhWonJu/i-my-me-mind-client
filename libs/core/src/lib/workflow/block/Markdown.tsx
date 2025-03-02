import { CodeXml, LucideProps } from "lucide-react";

import { TaskBlockType } from "@imymemind/core/types/task";

const Markdown = {
  type: TaskBlockType.MARKDOWN,
  name: "markdown",
  helperText: "마크다운 편집기",
  icon: (props: LucideProps) => <CodeXml {...props} />,
};

export default Markdown;
