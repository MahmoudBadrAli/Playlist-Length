import { createSlice } from "@reduxjs/toolkit";

interface SaveLinksState {
  value: boolean;
}

const saved = localStorage.getItem("saveLinks");
const initialValue: boolean = saved !== null ? saved === "true" : true;

const initialState: SaveLinksState = {
  value: initialValue,
};

export const saveLinksSlice = createSlice({
  name: "saveLinks",
  initialState,
  reducers: {
    saveLinksStatus: (state) => {
      state.value = !state.value;
      localStorage.setItem("saveLinks", String(state.value));
    },
  },
});

export const { saveLinksStatus } = saveLinksSlice.actions;

export default saveLinksSlice.reducer;
