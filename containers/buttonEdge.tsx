import styled from "@emotion/styled";
import React, { useCallback } from "react";
import { EdgeProps, EdgeText, getBezierPath, useReactFlow } from "reactflow";

import { useAppDispatch } from "hooks/reduxHooks";
import { setDirty } from "store/slices/canvas";

// TODO: restyle
const foreignObjectSize = 40;

const ButtonEdge: React.FC<EdgeProps> = (props) => {
  const dispatch = useAppDispatch();
  const { setEdges } = useReactFlow();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
  });

  const onEdgeClicked = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      setEdges((edges) => edges.filter((e) => e.id !== props.id));
      dispatch(setDirty());
    },
    [dispatch, props.id, setEdges]
  );

  return (
    <>
      <path
        id={props.id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={props.markerEnd}
      />
      {props.data?.label && (
        <EdgeText
          x={props.sourceX + 10}
          y={props.sourceY + 10}
          label={props.data.label}
          labelStyle={{ fill: "black" }}
          labelBgStyle={{ fill: "transparent" }}
          labelBgPadding={[2, 4]}
          labelBgBorderRadius={2}
        />
      )}
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={labelX - foreignObjectSize / 2}
        y={labelY - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <Wrapper>
          <StyledButton onClick={onEdgeClicked}>×</StyledButton>
        </Wrapper>
      </foreignObject>
    </>
  );
};

export default ButtonEdge;

const Wrapper = styled.div`
  background: transparent;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40px;
`;

const StyledButton = styled.button`
  width: 20px;
  height: 20px;
  background: #eee;
  border: 1px solid #fff;
  cursor: pointer;
  border-radius: 50%;
  font-size: 12px;
  line-height: 1;

  &:hover {
    box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.08);
  }
`;
