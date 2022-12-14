import { Box } from "@mui/system";
import ReactFlow, { Background, Controls, MiniMap, Viewport } from "reactflow";

import Link from "components/link";
import ButtonEdge from "containers/buttonEdge";
import CanvasNode from "containers/canvasNode";
import "reactflow/dist/style.css";
import { wrapper } from "store";
import { getAllNodes, getRunningQueriesThunk } from "store/apis/nodes";
import theme from "utils/theme";

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
  return (
    <Box sx={{ height: "90vh", width: "100%" }} border={1}>
      <ReactFlow
        defaultViewport={defaultViewport}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
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

      <Link href="/">Home</Link>
    </Box>
  );
}
