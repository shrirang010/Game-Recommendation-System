import React, { useState } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import allStore from "../../store/store";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string, theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface propsTypes {
  options: string[];
  title: string;
}

export default function MultipleSelect(props: propsTypes) {
  const options = props.options.sort();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string>([]);

  const setGenre = allStore((state) => state.setGenre);
  const setCategory = allStore((state) => state.setCategory);
  const setDeveloper = allStore((state) => state.setDeveloper);

  const handleChange = (event: { target: { value: any } }) => {
    const {
      target: { value },
    } = event;

    if (props.title === "Genre") {
      // console.log(genres);
      setGenre(value);
    } else if (props.title === "Category") {
      // console.log(categories);
      setCategory(value);
    } else if (props.title === "Developer") {
      // console.log(developers);
      setDeveloper(value);
    }

    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 600 }}>
        <InputLabel id="demo-multiple-name-label">{props.title}</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              value={option}
              style={getStyles(option, personName, theme)}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
