import { createSlice } from "@reduxjs/toolkit";
import { sendCartData } from "../cartThunks";
import { showNotification } from "./uiSlice";


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
  extraReducers: (builder) => {
    builder
      .addCase(sendCartData.pending, (state, action) => {
        // dispatch a pending notification
        action.asyncDispatch(
          showNotification({
            status: "pending",
            title: "Sending...",
            message: "Sending cart data!",
          })
        );
      })
      .addCase(sendCartData.fulfilled, (state, action) => {
        // dispatch a success notification
        action.asyncDispatch(
          showNotification({
            status: "success",
            title: "Success!",
            message: "Sent cart data successfully!",
          })
        );
      })
      .addCase(sendCartData.rejected, (state, action) => {
        // dispatch an error notification
        action.asyncDispatch(
          showNotification({
            status: "error",
            title: "Error!",
            message: action.payload || "Sending cart data failed!",
          })
        );
      });
  },
});

export const { toggleCart, addToCart, removeFromCart, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
