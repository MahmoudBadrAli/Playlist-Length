import { createSlice } from "@reduxjs/toolkit";

export const inputFocusSlice = createSlice({
  name: "inputFocus",
  initialState: {
    isfocused: false,
  },
  reducers: {
    setIsFocused: (state, action) => {
      state.isfocused = action.payload;
    },
  },
});

export const { setIsFocused } = inputFocusSlice.actions;

export default inputFocusSlice.reducer;
