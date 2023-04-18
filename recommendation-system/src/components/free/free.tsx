import style from "./free.module.css";
// import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import allStore from "../../store/store";

const free = () => {
  const free = allStore((state) => state.free);
  const setFree = allStore((state) => state.setFree);

  const handleClick = () => {};

  return (
    <div className={style.switch}>
      {/* <div className={style.free}>Free </div> */}
      <FormControlLabel
        control={
          <Switch
            checked={free}
            onClick={() => {
              setFree(!free);
            }}
          />
        }
        label="Free"
        sx={{ color: "#000000" }}
      />
    </div>
  );
};

export default free;
