import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    notification: null, // { status: 'pending' | 'success' | 'error', title: string, message: string }
  },
  reducers: {
    showNotification: (state, action) => {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    clearNotification: (state) => {
      state.notification = null;
    },
  },
});

export const { showNotification, clearNotification } = uiSlice.actions;
export default uiSlice.reducer;
