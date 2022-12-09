import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

// Type for our state
export interface AuthState {
  loggedIn: boolean;
}

// Initial state
const initialState: AuthState = {
  loggedIn: false,
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the authentication status
    setAuthState(state, action) {
      state.loggedIn = action.payload;
    },
  },
});

export const { setAuthState } = authSlice.actions;

export const selectAuthState = (state: RootState) => state.auth.loggedIn;

export default authSlice.reducer;
