// src/store/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem("token");


const initialState = {
  user: null,
  token: tokenFromStorage || null,
  userId: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { user, token, userId } = action.payload;
      state.user = user;
      state.token = token;
      state.userId = userId;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.userId = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");

    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
