import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountListData: null,
  activityList: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    activityList: (state, action) => {
      state.activityList = action.payload;
    },
    accountList: (state, action) => {
      state.accountListData = action.payload;
    },
  },
});

export const { accountList, activityList } = accountSlice.actions;
export default accountSlice.reducer;
