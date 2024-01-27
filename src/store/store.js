import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/authSlice";
import filterReducer from "./Features/filterSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    filter: filterReducer,
  },
});

export default store;
