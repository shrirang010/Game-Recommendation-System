import React from 'react'
import style from "./submitbutton.module.css";
import Button from "@mui/material/Button"
export default function button() {
  return (
      <Button variant="contained" className={style.btn}>Lets find some Games !</Button>
  )
}