import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TextField } from "@mui/material";

export default function BasicDateTimePicker() {
  return (
    <TextField
      className="input"
      id="filled-basic"
      label="Release year"
      variant="filled"
    />
  );
}
