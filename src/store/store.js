import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./Features/accountSlice";
import authReducer from "./Features/authSlice";
import filterReducer from "./Features/filterSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    filter: filterReducer,
    account: accountReducer,
  },
});

export default store;
