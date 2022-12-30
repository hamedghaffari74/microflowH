import styled from "@emotion/styled";
import { useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { DragEvent, useCallback, useEffect, useRef } from "react";
import { batch } from "react-redux";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";

import { skipToken } from "@reduxjs/toolkit/dist/query";
import CanvasHeader from "components/navs/canvasHeader";
import AddNodes from "containers/addNodes";
import ButtonEdge from "containers/buttonEdge";
import CanvasNode from "containers/canvasNode";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import "reactflow/dist/style.css";
import { useGetAllNodesQuery } from "store/apis/endpoints/nodes";
import { useGetSpecificWorkflowQuery } from "store/apis/endpoints/workflows";
import {
  selectCanvasState,
  setDirty,
  setSelectedNode,
} from "store/slices/canvas";
import {
  addAnchors,
  checkMultipleTriggers,
  generateWebhookEndpoint,
  getEdgeLabelName,
  getUniqueNodeId,
} from "utils/genericHelpers";
import { INodeData } from "utils/interfaces";
import { CustomNode } from "utils/types";

const edgeTypes = { buttonEdge: ButtonEdge };
const nodeTypes = { customNode: CanvasNode };

function Canvas() {
  const theme = useTheme();
  const { query } = useRouter();

  const dispatch = useAppDispatch();
  const { isDirty, newFlowName } = useAppSelector(selectCanvasState);

  const { data: allNodes } = useGetAllNodesQuery();
  const { data: workflow } = useGetSpecificWorkflowQuery(
    (query.id as string) ?? skipToken
  );

  const rfInstance = useReactFlow();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState<INodeData>([]);

  useEffect(() => {
    if (workflow) {
      setEdges(workflow.edges);
      setNodes(workflow.nodes);
    }
  }, [setEdges, setNodes, workflow]);

  /********************************************
   *                Handlers                  *
   ********************************************/
  const onConnect = useCallback(
    (connection: Connection) => {
      const newEdge = {
        ...connection,
        type: "buttonEdge",
        id: `${connection.source}-${connection.sourceHandle}-${connection.target}-${connection.targetHandle}`,
        data: { label: getEdgeLabelName(connection.sourceHandle) },
      };

      setEdges((eds) => addEdge(newEdge, eds));
      if (!isDirty) dispatch(setDirty());
    },
    [dispatch, isDirty, setEdges]
  );

  const onNodeDoubleClick = useCallback(
    (_: React.MouseEvent, clickedNode: CustomNode) => {
      dispatch(setSelectedNode(clickedNode));
    },
    [dispatch]
  );

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onNodeDragStop = useCallback(
    (event: React.MouseEvent, node: CustomNode, nodes: CustomNode[]) => {
      if (!isDirty) dispatch(setDirty());
    },
    [dispatch, isDirty]
  );

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      const reactflowBounds =
        reactFlowWrapper?.current?.getBoundingClientRect();

      if (!reactflowBounds || !rfInstance) return;

      const rawNodeData = event.dataTransfer.getData("application/reactflow");

      // invalid element dropped
      if (!rawNodeData || typeof rawNodeData === "undefined") return;

      // valid element, parse data
      const nodeData: INodeData = JSON.parse(rawNodeData);

      // trying to add a trigger when one already exists
      if (
        (nodeData.type === "webhook" || nodeData.type === "trigger") &&
        checkMultipleTriggers(nodes)
      ) {
        alert("Workflow can only contain 1 trigger or webhook node");
        return;
      }

      // build new node
      if (nodeData.type === "webhook")
        nodeData.webhookEndpoint = generateWebhookEndpoint();

      const id = getUniqueNodeId(nodeData, nodes);
      const position = rfInstance.project({
        x: event.clientX - reactflowBounds.left - 100,
        y: event.clientY - reactflowBounds.top - 50,
      });

      const newNode = {
        id,
        position,
        type: "customNode",
        data: addAnchors(nodeData, nodes, id),
      };

      batch(() => {
        dispatch(setSelectedNode(newNode));
        if (!isDirty) dispatch(setDirty());
      });
      setNodes((nds) => nds.concat(newNode));
    },
    [dispatch, isDirty, nodes, rfInstance, setNodes]
  );

  /********************************************
   *                 Render                   *
   ********************************************/
  return (
    <Box>
      <CanvasHeader
        existingFlowId={workflow?.shortId}
        existingFlowName={workflow?.name}
        isDirty={isDirty}
        newFlowName={newFlowName}
      />
      <FlowWrapper ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onNodeDoubleClick={onNodeDoubleClick}
          onNodeDragStop={onNodeDragStop}
          // Edges props
          edges={edges}
          edgeTypes={edgeTypes}
          onConnect={onConnect}
          onEdgesChange={onEdgesChange}
          // Drag and drop
          onDragOver={onDragOver}
          onDrop={onDrop}
          // styling
          fitView
        >
          <AddNodes nodesData={allNodes || []} />
          <Controls
            style={{
              display: "flex",
              flexDirection: "row",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          <Background color="#00f" gap={16} />
          <MiniMap
            nodeStrokeColor={() => theme.palette.primary.main}
            nodeColor={() => theme.palette.primary.main}
            nodeBorderRadius={2}
            pannable
            zoomable
          />
        </ReactFlow>
      </FlowWrapper>
    </Box>
  );
}

export default function CanvasWithProvider() {
  return (
    <ReactFlowProvider>
      <Canvas />
    </ReactFlowProvider>
  );
}

const FlowWrapper = styled.div`
  height: calc(100vh - 80px);
`;
