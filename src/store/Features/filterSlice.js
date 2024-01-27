import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "None",
  size: "None",
  revenue: "None",
  State: "None",
};
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    statusFilter: (state, action) => {
      state.status = action.payload;
      // console.log(state.status);
    },
    sizeFilter: (state, action) => {
      state.size = action.payload;
      // console.log(state.size);
    },
    revenueFilter: (state, action) => {
      state.revenue = action.payload;
      // console.log(state.revenue);
    },
    stateFilter: (state, action) => {
      state.State = action.payload;
      // console.log(state.State);
    },
  },
});

export const { stateFilter, revenueFilter, sizeFilter, statusFilter } =
  filterSlice.actions;

export default filterSlice.reducer;
