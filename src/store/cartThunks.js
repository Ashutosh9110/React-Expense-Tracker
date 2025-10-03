// src/store/cartThunks.js
import { fetchCart, putCart } from "../utils/cartApi";
import { showNotification } from "./slices/uiSlice";
import { clearCart } from "./slices/cartSlice";

export const loadCart = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(
        showNotification({
          status: "pending",
          title: "Loading...",
          message: "Fetching cart data!",
        })
      );

      const items = await fetchCart(userId);

      dispatch({
        type: "cart/setCart",
        payload: items,
      });

      dispatch(
        showNotification({
          status: "success",
          title: "Success!",
          message: "Fetched cart data successfully!",
        })
      );
    } catch (err) {
      dispatch(
        showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart failed!",
        })
      );
    }
  };
};

export const saveCart = (userId, items) => {
  return async (dispatch) => {
    try {
      dispatch(
        showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        })
      );

      await putCart(userId, items);

      dispatch(
        showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (err) {
      dispatch(
        showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
