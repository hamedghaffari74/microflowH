import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";

import { IWorkflowResponse } from "utils/interfaces";
import { CustomNode } from "utils/types";

// Type for our state
export interface CanvasState {
  isDirty: boolean;
  removeEdgeId?: string;
  workflow?: IWorkflowResponse;
  selectedNode?: CustomNode;
}

// Initial state
// TODO: determine which state should be navigation agnostic
const initialState: CanvasState = {
  isDirty: false,
};

// Actual Slice
export const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    removeEdge: (state, action: PayloadAction<CanvasState["removeEdgeId"]>) => {
      state.removeEdgeId = action.payload;
    },

    setWorkflow: (state, action: PayloadAction<CanvasState["workflow"]>) => {
      state.workflow = action.payload;
    },

    setSelectedNode: (
      state,
      action: PayloadAction<CanvasState["selectedNode"]>
    ) => {
      state.selectedNode = action.payload;
    },

    setDirty: (state) => {
      state.isDirty = true;
    },

    removeDirty: (state) => {
      state.isDirty = false;
    },
  },
});

export const {
  removeDirty,
  removeEdge,
  setDirty,
  setSelectedNode,
  setWorkflow,
} = canvasSlice.actions;

export const selectCanvasState = (state: RootState) => state.canvas;

export default canvasSlice.reducer;
