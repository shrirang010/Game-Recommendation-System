import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface state {
  genres: [];
  categories: [];
  developers: [];

  setGenre: (data: []) => void;
  setCategory: (data: []) => void;
  setDeveloper: (data: []) => void;
}

const allStore = create<state>((set) => ({
  genres: [],
  categories: [],
  developers: [],

  setGenre: (data: []) => {
    set(() => ({
      genres: data,
    }));
  },

  setCategory: (data: []) => {
    set(() => ({
      categories: data,
    }));
  },

  setDeveloper: (data: []) => {
    set(() => ({
      developers: data,
    }));
  },
}));

export default allStore;
