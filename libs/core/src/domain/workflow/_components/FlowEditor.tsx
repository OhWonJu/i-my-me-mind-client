"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  ConnectionMode,
  Controls,
  Edge,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { Workflow } from "@imymemind/core/types/schema";
import { TaskType } from "@imymemind/core/types/task";
import { AppNode } from "@imymemind/core/types/appNode";

import {
  CreateFlowNode,
  CreateRootFlowNode,
} from "@imymemind/core/lib/workflow/createFlowNode";

import { useWorkflowInfoContext } from "../_context/WorkflowInfoContext";

import NodeComponent from "./nodes/NodeComponent";
import DeletableEdge from "./edges/DeletableEdge";
import RootNodeComponent from "./nodes/RootNodeComponent";

const nodeTypes = {
  Node: NodeComponent,
  Root: RootNodeComponent,
};

const edgeTypes = {
  default: DeletableEdge,
};

const fitViewOptions = { padding: 1 };

const FlowEditor = ({ workflow }: { workflow: Workflow }) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const { editable } = useWorkflowInfoContext();
  const { setViewport, screenToFlowPosition } = useReactFlow();

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.data ?? "{}");

      if (flow) {
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
      }

      // 기존 데이터가 없는 경우 초기 루트 노드 생성
      if (!flow.nodes || flow.nodes.length === 0) {
        const rootNode = CreateRootFlowNode(workflow.name, { x: 1, y: 1 });
        setNodes([rootNode]);
        setViewport({ x: 1, y: 1, zoom: 1 });
      }

      if (!flow.viewport) return;
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setViewport({ x, y, zoom });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workflow.data, setNodes, setEdges, setViewport]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      if (!editable) return;

      event.preventDefault();

      const taskType = event.dataTransfer.getData("application/reactflow");

      if (typeof taskType === "undefined" || !taskType) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = CreateFlowNode(taskType as TaskType, position);

      setNodes(prevNodes => prevNodes.concat(newNode));
    },
    [editable, screenToFlowPosition, setNodes]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      if (!editable) return;

      setEdges(prevEdges =>
        addEdge({ ...connection, animated: false }, prevEdges)
      );
    },
    [editable, setEdges]
  );

  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      if (connection.source === connection.target) return false;

      const findExistEdge = (edge: Edge) =>
        (edge.source === connection.source &&
          edge.target === connection.target) ||
        (edge.target === connection.source &&
          edge.source === connection.target);

      const oldEdge = edges.find(findExistEdge);

      if (oldEdge) return false;
      return true;
    },
    [edges]
  );

  return (
    <div ref={reactFlowWrapper} className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        // TODO : NODE, EDGE Change -> onChange with Mutation (e.g auto save)
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitViewOptions={fitViewOptions}
        deleteKeyCode={null}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        connectionMode={ConnectionMode.Loose}
        isValidConnection={isValidConnection}
        minZoom={0.2}
        nodesDraggable={editable}
        elementsSelectable={editable}
        snapToGrid={true}
        attributionPosition="bottom-left"
        // proOptions={{ hideAttribution: true }}
      >
        <Controls
          position="bottom-right"
          fitViewOptions={fitViewOptions}
          showInteractive={editable}
        />
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
      </ReactFlow>
    </div>
  );
};

export default FlowEditor;
