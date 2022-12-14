import { Box } from "@mui/system";
import { DragEvent, useCallback, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  EdgeTypes,
  MiniMap,
  ReactFlowInstance,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  Viewport,
} from "reactflow";

import Link from "components/link";
import AddNodes from "containers/addNodes";
import ButtonEdge from "containers/buttonEdge";
import CanvasNode from "containers/canvasNode";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { batch } from "react-redux";
import "reactflow/dist/style.css";
import { wrapper } from "store";
import {
  getAllNodes,
  getRunningQueriesThunk,
  removeTestTriggers,
  useGetAllNodesQuery,
} from "store/apis/nodes";
import { deleteAllTestWebhooks } from "store/apis/webhooks";
import {
  selectCanvasState,
  setDirty,
  setSelectedNode,
  setWorkflow,
} from "store/slices/canvas";
import {
  addAnchors,
  checkMultipleTriggers,
  generateWebhookEndpoint,
  getEdgeLabelName,
  getUniqueNodeId,
} from "utils/genericHelpers";
import { INodeData, IWorkflowResponse } from "utils/interfaces";
import theme from "utils/theme";
import { CustomNode } from "utils/types";

const edgeTypes = { buttonEdge: ButtonEdge };
const nodeTypes = { customNode: CanvasNode };
const defaultViewport: Viewport = { x: 10, y: 15, zoom: 5 };

// determine proper fetch time
export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch(getAllNodes.initiate());
  store.dispatch(removeTestTriggers.initiate());
  store.dispatch(deleteAllTestWebhooks.initiate());
  store.dispatch(
    setWorkflow({ name: "Untitled workflow" } as IWorkflowResponse)
  );
  await Promise.all(store.dispatch(getRunningQueriesThunk()));
  return { props: {} };
});

export default function Canvas() {
  const dispatch = useAppDispatch();
  const { selectedNode, isDirty } = useAppSelector(selectCanvasState);
  const { data: allNodes } = useGetAllNodesQuery();

  const reactFlowWrapper = useRef<HTMLElement>(null);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance>();

  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  /********************************************
   *                Handlers                  *
   ********************************************/
  const onInit = useCallback((instance: ReactFlowInstance) => {
    setRfInstance(instance);
  }, []);

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
        dispatch(setDirty());
      });
      setNodes((nds) => nds.concat(newNode));
    },
    [dispatch, nodes, rfInstance, setNodes]
  );

  /********************************************
   *                 Render                   *
   ********************************************/
  return (
    <ReactFlowProvider>
      <Box
        sx={{ height: "90vh", width: "100%" }}
        border={1}
        ref={reactFlowWrapper}
      >
        <ReactFlow
          onInit={onInit}
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
          defaultViewport={defaultViewport}
        >
          <Controls
            style={{
              display: "flex",
              flexDirection: "row",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          <AddNodes nodesData={allNodes || []} node={selectedNode} />
          <Background color="#00f" gap={16} />
          <MiniMap
            nodeStrokeColor={() => theme.palette.primary.main}
            nodeColor={() => theme.palette.primary.main}
            nodeBorderRadius={2}
          />
        </ReactFlow>

        <Link href="/">Home</Link>
      </Box>
    </ReactFlowProvider>
  );
}
