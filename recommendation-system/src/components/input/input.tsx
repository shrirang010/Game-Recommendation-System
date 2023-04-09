import MultipleSelect from "../multiselect/multiselect";
import { TextField } from "@mui/material";
import SubmitButton from "../submitbutton/submitbutton";
import allStore from "../../store/store";
import { genres, categories, developers } from "./options";
import Free from "../free/free";

const input = () => {
  let gen = allStore((state) => state.genres);
  let cat = allStore((state) => state.categories);
  let dev = allStore((state) => state.developers);
  console.log(gen, cat, dev);

  return (
    <div>
      <MultipleSelect options={genres} title="Genre" />
      <MultipleSelect options={categories} title="Category" />
      <MultipleSelect options={developers} title="Studio" />
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
