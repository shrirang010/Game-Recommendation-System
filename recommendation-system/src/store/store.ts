import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import gameCard from "../components/gameCard/gameCard";

interface game_info {
  name: string;
  free: string;
  release_date: string;
  developer: string[];
  genres: string[];
  categories: string[];
  metric: string;
  review: string;
}

interface DBase {
  games: game_info[];
  genres: [];
  categories: [];
  developers: [];

  setGame: (data: game_info[]) => void;
  setGenre: (data: []) => void;
  setCategory: (data: []) => void;
  setDeveloper: (data: []) => void;
}

const allStore = create<DBase>((set) => ({
  games: [],
  genres: [],
  categories: [],
  developers: [],

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
}));

export default allStore;
