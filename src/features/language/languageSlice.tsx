import { createSlice } from "@reduxjs/toolkit";

export const languageSlice = createSlice({
  name: "language",
  initialState: {
    value: {
      lang: localStorage.getItem("language") || "en",
      dir: localStorage.getItem("direction") || "ltr",
    },
  },
  reducers: {
    toggleLang: (state) => {
      if (state.value.lang === "en") {
        state.value.lang = "ar";
        state.value.dir = "rtl";
        localStorage.setItem("language", "ar");
        localStorage.setItem("direction", "rtl");
      } else {
        state.value.lang = "en";
        state.value.dir = "ltr";
        localStorage.setItem("language", "en");
        localStorage.setItem("direction", "ltr");
      }
    },
  },
});

export const { toggleLang } = languageSlice.actions;

export default languageSlice.reducer;
