import { create } from "zustand";
import type { game_info } from "../types/gameInfo";

interface DBase {
  games: game_info[];
  genres: [];
  categories: [];
  developers: [];
  free: boolean;

  setGame: (data: game_info[]) => void;
  setGenre: (data: []) => void;
  setCategory: (data: []) => void;
  setDeveloper: (data: []) => void;
  setFree: (data: boolean) => void;
}

const allStore = create<DBase>((set) => ({
  games: [],
  genres: [],
  categories: [],
  developers: [],
  free: false,

  setGame: (data: game_info[]) => {
    set(() => ({
      games: data,
    }));
  },

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

  setFree: (data: boolean) => {
    set(() => ({
      free: data,
    }));
  },
}));

export default allStore;
