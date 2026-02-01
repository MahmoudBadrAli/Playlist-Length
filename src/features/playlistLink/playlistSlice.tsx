import { createSlice } from "@reduxjs/toolkit";

export const playlistLinkSlice = createSlice({
  name: "playlistLink",
  initialState: {
    link: "",
  },
  reducers: {
    setLink: (state, action) => {
      state.link = action.payload;
    },
  },
});

export const { setLink } = playlistLinkSlice.actions;

export default playlistLinkSlice.reducer;
