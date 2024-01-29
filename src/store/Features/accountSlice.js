import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountListData: null,
  activityList: null,
  activityAll: null,
  partnerActivityList: null,
  regionsdropdown: null,
  partnerdropdown: null,
  regionsList: null,
  partnerList: null,
  activeRegionFilter: null,
  activePartnerFilter: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    regionsdropdown: (state, action) => {
      state.regionsdropdown = action.payload;
    },
    regionsList: (state, action) => {
      state.regionsList = action.payload;
    },
    activityAll: (state, action) => {
      state.activityAll = action.payload;
    },
    partnerList: (state, action) => {
      state.partnerList = action.payload;
    },
    partnerdropdown: (state, action) => {
      state.partnerdropdown = action.payload;
    },
    activityList: (state, action) => {
      state.activityList = action.payload;
    },
    partnerActivityList: (state, action) => {
      state.partnerActivityList = action.payload;
    },
    accountList: (state, action) => {
      state.accountListData = action.payload;
    },
  },
});

export const {
  accountList,
  activityAll,
  activityList,
  regionsList,
  partnerList,
  partnerActivityList,
  regionsdropdown,
  partnerdropdown,
} = accountSlice.actions;
export default accountSlice.reducer;
