// src/store/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    visible: false,
    items: [], // [{ id, title, price, quantity }]
  },
  reducers: {
    toggleCart: (state) => {
      state.visible = !state.visible;
    },
    setCart: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (existing) {
        existing.quantity -= 1;
        if (existing.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== id);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { toggleCart, addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
