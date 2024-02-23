import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const KpiSettings = () => {
  const [selected, setSelected] = useState(""); // Initialize with a default value
  const selectRef = useRef(null);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelected(event.target.value as string);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(selected);
  };

  return (
    <Box
      className="flex flex-col w-full h-full p-4 gap-4"
      component="form"
      onSubmit={handleSubmit}
    >
      <p className="font-light text-gray-600 text-md md:text-xl text-center">
        Please select kpis duration
      </p>
      <FormControl variant="standard" className="w-full h-full">
        <InputLabel id="demo-simple-select-standard-label">Period</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Period"
          value={selected} // Set the value prop to the selected state
          onChange={handleChange}
          ref={selectRef}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Monthly</MenuItem>
          <MenuItem value={20}>Weekly</MenuItem>
          <MenuItem value={30}>Daily</MenuItem>
        </Select>
      </FormControl>
      <Box className="flex mt-4">
        <Button
          size="small"
          type="submit"
          variant="contained"
          className="w-full md:w-max !px-10 !py-3 rounded-lg !ms-auto"
        >
          Enregistrer
        </Button>
      </Box>
    </Box>
  );
};

export default KpiSettings;
