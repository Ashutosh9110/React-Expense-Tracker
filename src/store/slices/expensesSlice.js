// src/store/slices/expensesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  totalAmount: 0,
  premiumActive: false,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpenses(state, action) {
      state.list = action.payload;
      state.totalAmount = state.list.reduce((sum, e) => sum + Number(e.amount), 0);
      state.premiumActive = state.totalAmount > 10000;
    },
    addExpense(state, action) {
      state.list.unshift(action.payload);
      state.totalAmount += Number(action.payload.amount);
      state.premiumActive = state.totalAmount > 10000;
    },
    updateExpense(state, action) {
      const { id, updatedExpense } = action.payload;
      const idx = state.list.findIndex((e) => e.firebaseId === id);
      if (idx !== -1) {
        state.totalAmount -= Number(state.list[idx].amount);
        state.list[idx] = { firebaseId: id, ...updatedExpense };
        state.totalAmount += Number(updatedExpense.amount);
      }
      state.premiumActive = state.totalAmount > 10000;
    },
    deleteExpense(state, action) {
      const id = action.payload;
      const exp = state.list.find((e) => e.firebaseId === id);
      if (exp) state.totalAmount -= Number(exp.amount);
      state.list = state.list.filter((e) => e.firebaseId !== id);
      state.premiumActive = state.totalAmount > 10000;
    },
    activatePremium: (state) => {
      state.premiumActive = true;
    }
  },
});

export const { setExpenses, addExpense, updateExpense, deleteExpense, activatePremium } = expensesSlice.actions;
export default expensesSlice.reducer;
