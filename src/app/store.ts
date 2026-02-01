import { configureStore } from "@reduxjs/toolkit";
import modeReducer from "../features/mode/modeSlice";
import languageReducer from "../features/language/languageSlice";
import saveLinksReducer from "../features/linksSwitch/saveLinksSlice";
import playlistLinkReducer from "../features/playlistLink/playlistSlice";
import errorPopupReducer from "../features/errorPopup/errorPopupSlice";
import inputFocusReducer from "../features/inputFocus/inputFocus";
import savedLinksReducer from "../features/savedLinks/savedLinksSlice";
import playlistReducer from "../features/api/playlistApi/playlistApiSlice";

const store = configureStore({
  reducer: {
    mode: modeReducer,
    language: languageReducer,
    saveLinksSwitch: saveLinksReducer,
    playlistLink: playlistLinkReducer,
    errorPopup: errorPopupReducer,
    inputFocus: inputFocusReducer,
    savedLinks: savedLinksReducer,
    playlist: playlistReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
