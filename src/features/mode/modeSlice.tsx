import { createSlice } from "@reduxjs/toolkit";

export const modeSlice = createSlice({
  name: "mode",
  initialState: {
    value: localStorage.getItem("theme") || "dark",
  },
  reducers: {
    toggleMode: (state) => {
      if (state.value === "dark") {
        state.value = "light";
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
        localStorage.setItem("theme", "light");
      } else {
        state.value = "dark";
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      }
    },
    setMode: (state, action) => {
      state.value = action.payload;
      document.documentElement.classList.remove(
        action.payload === "dark" ? "light" : "dark"
      );
      document.documentElement.classList.add(action.payload);
    },
  },
});

export const { toggleMode, setMode } = modeSlice.actions;

export default modeSlice.reducer;
