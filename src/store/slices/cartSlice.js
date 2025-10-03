import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { visible: false },
  reducers: {
    toggleCart: (state) => {
      state.visible = !state.visible;
    },
  },
});

export const { toggleCart } = cartSlice.actions;
export default cartSlice.reducer;
