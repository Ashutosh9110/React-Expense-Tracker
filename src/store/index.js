import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import expensesReducer from "./slices/expensesSlice";
import themeReducer from "./slices/themeSlice";  
import cartReducer from "./slices/cartSlice" 
import uiReducer from "./slices/uiSlice";


const asyncDispatchMiddleware = (storeAPI) => (next) => (action) => {
  let syncActivityFinished = false;
  let actionQueue = [];

  function flushQueue() {
    actionQueue.forEach((a) => storeAPI.dispatch(a));
    actionQueue = [];
  }

  function asyncDispatch(asyncAction) {
    actionQueue.push(asyncAction);
    if (syncActivityFinished) {
      flushQueue();
    }
  }

  const actionWithAsyncDispatch = Object.assign({}, action, { asyncDispatch });

  const res = next(actionWithAsyncDispatch);
  syncActivityFinished = true;
  flushQueue();
  return res;
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expensesReducer,
    theme: themeReducer,
    cart: cartReducer,
    ui: uiReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(asyncDispatchMiddleware),
});

export default store;
