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

import { TaskType } from "@/types/task";
import { AppNode } from "@/types/appNode";

import {
  CreateFlowNode,
  CreateRootFlowNode,
} from "@/lib/workflow/createFlowNode";

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

// TODO: workflow typeprops {workflow}: {workflow: Workflow}
const FlowEditor = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const { setViewport, screenToFlowPosition } = useReactFlow();

  // 3:01:00 <- initial 관련
  useEffect(() => {
    // TODO : 아무런 노드가 없을 때 루트노드 초기화

    // workFlow title
    const rootNode = CreateRootFlowNode("무제", TaskType.ROOT, { x: 1, y: 1 });
    setNodes([rootNode]);

    setViewport({ x: 1, y: 1, zoom: 1.2 });
  }, [screenToFlowPosition, setNodes, setViewport]);

  // useEffect(() => {
  //   try {
  //     const flow = JSON.parse(workflow.definition);
  //     if (!flow) return;
  //     setNodes(flow.nodes || []);
  //     setEdges(flow.edges || []);
  //     if (!flow.viewport) return;
  //     const { x = 0, y = 0, zoom = 1 } = flow.viewport;
  //     setViewport({ x, y, zoom }); // if use this => remove fitView
  //   } catch (error) {}
  // }, [workflow.definition, setNodes, setEdges, setViewport]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const taskType = event.dataTransfer.getData("application/reactflow");

      if (typeof taskType === undefined || !taskType) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = CreateFlowNode(taskType as TaskType, position);

      setNodes((prevNodes) => prevNodes.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((prevEdges) =>
        addEdge({ ...connection, animated: false }, prevEdges)
      );
    },
    [setEdges]
  );

  return (
    <div ref={reactFlowWrapper} className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        // TODO : NODE, EDGE Change -> onChange with Mutation
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={fitViewOptions}
        deleteKeyCode={null}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        connectionMode={ConnectionMode.Loose}
        minZoom={0.4}
      >
        <Controls position="bottom-right" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
      </ReactFlow>
    </div>
  );
};

export default FlowEditor;
