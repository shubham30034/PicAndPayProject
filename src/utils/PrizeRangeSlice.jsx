import { createSlice } from "@reduxjs/toolkit";

const prizeSlice = createSlice({
  name: "prizeRange",
  initialState: 1999, // Default price range
  reducers: {
    setPrizeRange: (state, action) => action.payload, // Updates price range
  },
});

export const { setPrizeRange } = prizeSlice.actions;
export default prizeSlice.reducer;
