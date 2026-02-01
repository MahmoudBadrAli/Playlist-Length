import { createSlice } from "@reduxjs/toolkit";

export const errorPopupSlice = createSlice({
  name: "errorPopup",
  initialState: {
    showPopup: false,
  },
  reducers: {
    setShowPopup: (state, action) => {
      state.showPopup = action.payload;
    },
  },
});

export const { setShowPopup } = errorPopupSlice.actions;

export default errorPopupSlice.reducer;
