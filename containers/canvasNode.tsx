// TODO: restyle
import styled from "@emotion/styled";
import { Check } from "@mui/icons-material";
import { Avatar, Box, Card, Theme, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { Handle, NodeProps, Position } from "reactflow";

import { imgLoader } from "utils/genericHelpers";
import { INodeData } from "utils/interfaces";

const CardWrapper = styled(Card)(({ theme }: { theme: Theme }) => ({
  backgroundColor: "#ffffff",
  border: "solid 1px",
  color: theme.palette.text.primary,
  width: "200px",
  height: "auto",
  padding: "10px",
  boxShadow: "0 2px 14px 0 rgb(32 40 45 / 8%)",
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
}));

const handlerPosition = [[["50%"]], [["30%"], ["70%"]]];

type Props = Omit<NodeProps, "data"> & {
  data: INodeData;
};

const CanvasNode: React.FC<Props> = ({ data, selected }) => {
  const theme = useTheme();

  return (
    <>
      <CardWrapper
        sx={{
          borderColor: selected
            ? theme.palette.primary.main
            : theme.palette.text.secondary,
        }}
        theme={theme}
      >
        {data && data.outputResponses && data.outputResponses.submit && (
          <Avatar
            variant="rounded"
            sx={{
              width: "22px",
              height: "22px",
              fontSize: "1rem",
              borderRadius: "50%",
              background: theme.palette.success.dark,
              color: "white",
              ml: 2,
              position: "absolute",
              top: -10,
              right: -10,
            }}
          >
            <Check />
          </Avatar>
        )}

        {data && data.outputResponses && data.outputResponses.needRetest && (
          <Avatar
            variant="rounded"
            sx={{
              width: "22px",
              height: "22px",
              fontSize: "1rem",
              borderRadius: "50%",
              background: theme.palette.warning.dark,
              color: "white",
              ml: 2,
              position: "absolute",
              top: -10,
              right: -10,
            }}
          >
            <div>! icon</div>
          </Avatar>
        )}

        <Box>
          {data.inputAnchors &&
            data.inputAnchors.map((inputAnchor, index) => (
              <Handle
                type="target"
                position={Position.Top}
                key={inputAnchor.id}
                id={inputAnchor.id}
                style={{
                  height: 15,
                  width: 15,
                  top: -7.5,
                  backgroundColor: selected
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                  left: handlerPosition[data.inputAnchors?.length - 1][
                    index
                  ].toString(),
                }}
              />
            ))}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Box style={{ width: 50, marginRight: 10 }}>
              <div
                style={{
                  borderRadius: "8px",
                  width: "44px",
                  height: "44px",
                  fontSize: "1.5rem",
                  backgroundColor: "white",
                  cursor: "grab",
                }}
              >
                <Image
                  loader={imgLoader}
                  width={50}
                  height={50}
                  src={data.name}
                  alt={data.name}
                />
              </div>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
              >
                {data.label}
              </Typography>
            </Box>
          </div>
          {data.outputAnchors &&
            data.outputAnchors.map((outputAnchor, index) => (
              <Handle
                type="source"
                position={Position.Bottom}
                key={outputAnchor.id}
                id={outputAnchor.id}
                style={{
                  height: 15,
                  width: 15,
                  bottom: -7.5,
                  backgroundColor: selected
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                  left: handlerPosition[data.outputAnchors.length - 1][
                    index
                  ].toString(),
                }}
              />
            ))}
        </Box>
      </CardWrapper>
    </>
  );
};

export default CanvasNode;
