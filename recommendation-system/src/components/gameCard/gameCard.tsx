import React from "react";
import style from "./gameCard.module.css";

const gameCard = (props) => {
  return (
    <div className={style.container}>
      <div className={style.name}>{props.name}</div>
      <div className={style.review}>{props.review}</div>
      <div>{props.categories}</div>
      <div>{props.developer}</div>
    </div>
  );
};

export default gameCard;
