import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountListData: null,
  activityList: null,
  activityAll: null,
  revenueFilter: [],
  regionsFilter: [],
  partnerFilter: [],
  empSizeFilter: [],
  verticalFilter: [],
  statusFilter: [],
  technographicsFilter: [],
  partnerActivityList: null,
  regionsdropdown: null,
  partnerdropdown: null,
  regionsList: null,
  revenueList: null,
  empSizeList: null,
  verticalList: null,
  contactStatusList: null,
  technographicsList: null,
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
    revenueList: (state, action) => {
      state.revenueList = action.payload;
    },
    empSizeList: (state, action) => {
      state.empSizeList = action.payload;
    },
    contactStatusList: (state, action) => {
      state.contactStatusList = action.payload;
    },
    revenueFilter: (state, action) => {
      state.revenueFilter = action.payload;
    },
    regionsFilter: (state, action) => {
      state.regionsFilter = action.payload;
    },
    partnerFilter: (state, action) => {
      state.partnerFilter = action.payload;
    },
    empSizeFilter: (state, action) => {
      state.empSizeFilter = action.payload;
    },
    verticalFilter: (state, action) => {
      state.verticalFilter = action.payload;
    },
    statusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    technographicsList: (state, action) => {
      state.technographicsList = action.payload;
    },
    technographicsFilter: (state, action) => {
      state.technographicsFilter = action.payload;
    },
    verticalList: (state, action) => {
      state.verticalList = action.payload;
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
  regionsFilter,
  partnerFilter,
  revenueFilter,
  empSizeFilter,
  verticalFilter,
  statusFilter,
  technographicsFilter,
  accountList,
  activityAll,
  activityList,
  regionsList,
  revenueList,
  partnerList,
  verticalList,
  empSizeList,
  contactStatusList,
  technographicsList,
  partnerActivityList,
  regionsdropdown,
  partnerdropdown,
} = accountSlice.actions;
export default accountSlice.reducer;
