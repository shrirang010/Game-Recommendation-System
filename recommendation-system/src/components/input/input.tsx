import MultipleSelect from "../multiselect/multiselect";
import SubmitButton from "../submitbutton/submitbutton";
import style from "./input.module.css";

import { genres, categories, developers } from "./options";
import Free from "../free/free";

const input = () => {
  return (
    <div className={style.container}>
      <MultipleSelect options={genres} title="Genre" />
      <MultipleSelect options={categories} title="Category" />
      <MultipleSelect options={developers} title="Developer" />

      <Free />
      <SubmitButton />
    </div>
  );
};

export default input;
