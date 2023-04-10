import MultipleSelect from "../multiselect/multiselect";
import { TextField } from "@mui/material";
import SubmitButton from "../submitbutton/submitbutton";
import allStore from "../../store/store";

import { genres, categories, developers } from "./options";
import Free from "../free/free";

const input = () => {
  return (
    <div>
      <MultipleSelect options={genres} title="Genre" />
      <MultipleSelect options={categories} title="Category" />
      <MultipleSelect options={developers} title="Developer" />
      <TextField
        className="input"
        id="filled-basic"
        label="Release year"
        variant="filled"
      />
      <Free />
      <SubmitButton />
    </div>
  );
};

export default input;
