"use client";

import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useInternalNode,
  useReactFlow,
} from "@xyflow/react";
import { X } from "lucide-react";

import { getEdgeParams } from "@imymemind/core/lib/workflow/workflowUtils";

import { Button } from "@imymemind/core/components/ui";

const DeletableEdge = (props: EdgeProps) => {
  const { setEdges } = useReactFlow();

  const sourceNode = useInternalNode(props.source);
  const targetNode = useInternalNode(props.target);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode
  );

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={props.markerEnd}
        style={props.style}
      />
      <EdgeLabelRenderer>
        {props.selected && (
          <i
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              pointerEvents: "all",
            }}
          >
            <Button
              variant="outline"
              className="bg-card h-6 w-6 hover:bg-card hover:shadow-md"
              size="icon"
              onClick={() => {
                setEdges(prevEdges =>
                  prevEdges.filter(edge => edge.id !== props.id)
                );
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </i>
        )}
      </EdgeLabelRenderer>
    </>
  );
};

export default DeletableEdge;
