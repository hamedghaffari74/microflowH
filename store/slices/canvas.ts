import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";

// Type for our state
export interface CanvasState {
  isDirty: boolean;
  removeEdgeId: string;
  workflow: any; // TODO: find workflow type
}

// Initial state
// TODO: determine which state should be navigation agnostic
const initialState: CanvasState = {
  isDirty: false,
  removeEdgeId: "",
  workflow: null,
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

    setDirty: (state) => {
      state.isDirty = true;
    },

    removeDirty: (state) => {
      state.isDirty = false;
    },
  },
});

export const { removeDirty, removeEdge, setDirty, setWorkflow } =
  canvasSlice.actions;

export const selectCanvasState = (state: RootState) => state.canvas;

export default canvasSlice.reducer;
