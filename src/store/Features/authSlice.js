import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
      localStorage.setItem("userData", JSON.stringify(state.userData));
      // console.log(state.userData);
    },
    logout: (state, action) => {
      state.status = false;
      state.userData = null;
    },
    loginOTP: (state, action) => {
      state.userData = action.payload
    }
  },
});

export const { login, logout, loginOTP } = authSlice.actions;

export default authSlice.reducer;
