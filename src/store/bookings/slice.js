import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apiSuccessData: undefined,
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setSuccessResponseData(state, action) {
      state.apiSuccessData = action.payload;
    },
  },
});

export const { setSuccessResponseData } = bookingsSlice.actions;

export default bookingsSlice.reducer;
