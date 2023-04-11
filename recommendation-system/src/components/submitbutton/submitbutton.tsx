import React from "react";
import style from "./submitbutton.module.css";
import Button from "@mui/material/Button";
import { get_data } from "../functions/filterdata";
import allStore from "../../store/store";

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

export default function button() {
  const gen = allStore((state) => state.genres);
  const cat = allStore((state) => state.categories);
  const dev = allStore((state) => state.developers);
  const free = allStore((state) => state.free);
  const free_str = free.toString().toUpperCase();
  const setGame = allStore((state) => state.setGame);

  let games: game_info[] = [];

  return (
    <Button
      variant="contained"
      onClick={() => {
        games = get_data(gen, cat, dev, free_str);
        setGame(games);
      }}
      sx={{ fontFamily: "Readex Pro, sans-serif", backgroundColor: "#000000" }}
    >
      Lets find some Games !
    </Button>
  );
}
