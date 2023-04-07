import * as React from "react";
import { TextField, Switch } from "@mui/material";
import style from "./free.module.css";

const free = () => {
  return (
    <div className={style.switch}>
      <div className={style.free}>Free </div>
      <Switch />
    </div>
  );
};

export default free;
