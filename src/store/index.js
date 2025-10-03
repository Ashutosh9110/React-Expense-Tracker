import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import expensesReducer from "./slices/expensesSlice";
import themeReducer from "./slices/themeSlice"; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expensesReducer,
    theme: themeReducer, 
  },
});

export default store;
