import { useState } from "react";
import "./App.css";

import Head from "./components/head/head";
import Free from "./components/free/free";
import Calendar from "./components/year/year";
import Input from "./components/input/input";
import GameCard from "./components/gameCard/gameCard";
import { get_data } from "./components/functions/filterdata";
import allStore from "./store/store";

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

export default function MyApp() {
  let gen = allStore((state) => state.genres);
  let cat = allStore((state) => state.categories);
  let dev = allStore((state) => state.developers);

  const games = allStore((state) => state.games);
  // get_data(gen, cat, dev, "FALSE");
  // const games = get_data(
  //   ["Action", " Strategy", " Adventure"],
  //   ["Single-player"],
  //   ["Ubisoft Montreal"],
  //   "FALSE"
  // );

  return (
    <div className="container">
      <Head />
      <div className="inner">
        <Input />
      </div>
      <div className="game-list">
        {games.map((el,index) => {
          return (
            <GameCard
              name={el.name}
              review={el.review}
              genres={el.genres}
              categories={el.categories}
              developer={el.developer}
              release_date={el.release_date}
              rank={index+1}
            />
          );
        })}
      </div>
    </div>
  );
}
