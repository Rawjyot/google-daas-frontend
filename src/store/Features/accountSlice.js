import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountListData: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    accountList: (state, action) => {
      state.accountListData = action.payload;
    },
  },
});

export const { accountList } = accountSlice.actions;
export default accountSlice.reducer;
