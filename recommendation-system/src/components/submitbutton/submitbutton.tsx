import React from "react";
import style from "./submitbutton.module.css";
import Button from "@mui/material/Button";
import { get_data } from "../functions/filterdata";
import allStore from "../../store/store";

export default function button() {
  let gen = allStore((state) => state.genres);
  let cat = allStore((state) => state.categories);
  let dev = allStore((state) => state.developers);

  let games = [];

  return (
    <Button
      variant="contained"
      className={style.btn}
      onClick={() => {
        games = get_data(gen, cat, dev, "FALSE");
        console.log(games);
      }}
    >
      Lets find some Games !
    </Button>
  );
}
