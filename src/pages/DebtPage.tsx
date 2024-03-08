import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Paper,
  TextField,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
const DebtPage = () => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Paper className="p-4">
      <Box
        component="form"
        className="w-full flex flex-col gap-2"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box className="flex justify-center  text-lg  text-gray-400 uppercase">
          <span>Page des créances</span>
        </Box>
        <Divider
          orientation="horizontal"
          flexItem
          className="gap-2 mb-4"
          variant="middle"
        />
        <Box className="w-full flex  flex-col md:flex-row gap-4 items-center">
          <Box className="flex flex-row items-center gap-4">
            <label htmlFor="date">Start date:</label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="date"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <TextField required type="date" {...field} id="date" />
                )}
              />
            </FormControl>
          </Box>
          <Box className="flex flex-row items-center gap-4">
            <label htmlFor="date2">End date:</label>
            <FormControl className="w-full md:flex-1">
              <Controller
                name="date2"
                defaultValue=""
                control={control}
                rules={{
                  validate: (value) => {
                    console.log("value", value);

                    const startDate = new Date(getValues("date"));
                    const currentDate = new Date(value);
                    return (
                      startDate <= currentDate ||
                      "La date ne peut pas être dans le futur."
                    );
                  },
                }}
                render={({ field }) => (
                  <TextField
                    required
                    type="date"
                    {...field}
                    id="date2"
                    error={!!errors.date2}
                    helperText={
                      errors.date2
                        ? (errors.date2.message as React.ReactNode)
                        : ""
                    }
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box className="flex md:ml-auto">
            <Button
              size="small"
              type="submit"
              variant="outlined"
              startIcon={<SearchOutlinedIcon />}
              className="w-full md:w-max !px-10 !py-3 rounded-lg !ml-auto "
            >
              Search
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default DebtPage;
