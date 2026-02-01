import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Link {
  title: string;
  link: string;
}

interface SavedLinksState {
  links: Link[];
}

const loadFromLocalStorage = (): Link[] => {
  try {
    const serialized = localStorage.getItem("savedLinks");
    if (serialized === null) {
      return [];
    }
    return JSON.parse(serialized);
  } catch (err) {
    console.error("Error loading from localStorage:", err);
    return [];
  }
};

const saveToLocalStorage = (links: Link[]) => {
  try {
    const serialized = JSON.stringify(links);
    localStorage.setItem("savedLinks", serialized);
  } catch (err) {
    console.error("Error saving to localStorage:", err);
  }
};

const initialState: SavedLinksState = {
  links: loadFromLocalStorage(),
};

export const savedLinksSlice = createSlice({
  name: "savedLinks",
  initialState,
  reducers: {
    addLink: (state, action: PayloadAction<Link>) => {
      state.links.push(action.payload);
      saveToLocalStorage(state.links);
    },
    editLink: (state, action: PayloadAction<{ index: number; link: Link }>) => {
      state.links[action.payload.index] = action.payload.link;
      saveToLocalStorage(state.links);
    },
    deleteLink: (state, action: PayloadAction<number>) => {
      state.links.splice(action.payload, 1);
      saveToLocalStorage(state.links);
    },
    deleteAllLinks: (state) => {
      state.links = [];
      saveToLocalStorage(state.links);
    },
  },
});

export const { addLink, editLink, deleteLink, deleteAllLinks } =
  savedLinksSlice.actions;
export default savedLinksSlice.reducer;
