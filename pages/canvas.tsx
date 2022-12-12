import { Box } from "@mui/system";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  Viewport,
} from "reactflow";

import ButtonEdge from "containers/buttonEdge";
import CanvasNode from "containers/canvasNode";
import { wrapper } from "store";
import {
  getAllNodes,
  getRunningQueriesThunk,
  useGetAllNodesQuery,
} from "store/apis/nodes";
import theme from "utils/theme";
import "reactflow/dist/style.css";

const nodeTypes = { customNode: CanvasNode };
const edgeTypes = { buttonEdge: ButtonEdge };
const defaultViewport: Viewport = { x: 10, y: 15, zoom: 5 };

// determine proper fetch time
export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch(getAllNodes.initiate());
  await Promise.all(store.dispatch(getRunningQueriesThunk()));
  return { props: {} };
});

export default function Canvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { isLoading, error, data } = useGetAllNodesQuery();

  return (
    <Box sx={{ height: "90vh", width: "100%" }} border={1}>
      <ReactFlow
        defaultViewport={defaultViewport}
        edges={edges}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
      >
        <Controls
          style={{
            display: "flex",
            flexDirection: "row",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <Background color="#aaa" gap={16} />
        <MiniMap
          nodeStrokeColor={() => theme.palette.primary.main}
          nodeColor={() => theme.palette.primary.main}
          nodeBorderRadius={2}
        />
      </ReactFlow>
    </Box>
  );
}
