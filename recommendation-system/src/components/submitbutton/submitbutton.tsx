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
  let gen = allStore((state) => state.genres);
  let cat = allStore((state) => state.categories);
  let dev = allStore((state) => state.developers);
  const setGame = allStore((state) => state.setGame);

  // console.log(gen, cat, dev);
  let games: game_info[] = [];

  return (
    <Button
      variant="contained"
      className={style.btn}
      onClick={() => {
        games = get_data(gen, cat, dev, "FALSE");
        setGame(games);
      }}
    >
      Lets find some Games !
    </Button>
  );
}
