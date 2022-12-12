import { Box } from "@mui/system";
import ReactFlow, { Background, Controls, MiniMap, Viewport } from "reactflow";

import theme from "utils/theme";
import "reactflow/dist/style.css";

const defaultViewport: Viewport = { x: 10, y: 15, zoom: 5 };

export default function Canvas() {
  return (
    <Box sx={{ height: "90vh", width: "100%" }} border={1}>
      <ReactFlow defaultViewport={defaultViewport} defaultNodes={[]}>
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
