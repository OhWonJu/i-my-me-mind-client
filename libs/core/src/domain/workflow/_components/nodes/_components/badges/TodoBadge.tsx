import React, { useCallback, useEffect, useMemo } from "react";
import { useReactFlow } from "@xyflow/react";
import { CheckCircle, Circle } from "lucide-react";

import { AppNode } from "@imymemind/core/types/appNode";
import { cn } from "@imymemind/core/lib/utils";

import { Badge } from "@imymemind/core/components/ui/badge";

const parseChecklistValues = (blockValues: Record<string, string>) =>
  Object.entries(blockValues)
    .filter(([key]) => key.includes("checklist"))
    .flatMap(([, value]) => JSON.parse(value));

const TodoBadge = ({ nodeId }: { nodeId: string }) => {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as AppNode;

  const isDone = node?.data.isDone ?? false;

  const checklistValues = useMemo(
    () => parseChecklistValues(node.data.blockValues),
    [node.data.blockValues]
  );

  const updateNodeDone = useCallback(
    (newValue: boolean) => {
      updateNodeData(nodeId, {
        isDone: newValue,
        // editable: !newValue,
      });
    },
    [nodeId, updateNodeData]
  );

  useEffect(() => {
    const isAllDone =
      checklistValues.length > 0 && checklistValues.every(item => item.isDone);

    if (isAllDone && !isDone) {
      updateNodeData(nodeId, { isDone: true });
    } else {
      updateNodeData(nodeId, { isDone: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checklistValues, nodeId, updateNodeData]);

  return (
    <Badge
      className={cn(
        "gap-2 flex items-center text-xs p-1",
        isDone
          ? "bg-green-500 hover:bg-green-500"
          : "bg-primary-foreground  hover:bg-primary/60"
      )}
      onClick={() => updateNodeDone(!isDone)}
    >
      {isDone ? (
        <CheckCircle size={16} className="stroke-white" />
      ) : (
        <Circle size={16} className="stroke-white" />
      )}
    </Badge>
  );
};

export default TodoBadge;
