import {
  Box,
  Button,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { AddoperationPreference } from "../../hooks/AddoperationPreference";
import {
  OperationPreference,
  OperationsPrefApiClient,
} from "../../services/SettingsService";
import getGlobal from "../../hooks/getGlobal";
import { CACHE_KEY_OperationPref } from "../../constants";
const OperationsListSettings = () => {
  const { data } = getGlobal(
    {} as OperationPreference,
    CACHE_KEY_OperationPref,
    OperationsPrefApiClient,
    undefined
  );
  const { control, handleSubmit, reset } = useForm<OperationPreference>();
  const addOperationMutation = AddoperationPreference(() => {
    reset({
      name: "",
      price: 0.0,
      code: "",
    });
  });
  const onSubmit = async (data: OperationPreference) => {
    const zbi = await addOperationMutation.mutateAsync({
      name: data.name,
      price: data.price,
      code: data.code,
    });
    console.log(zbi);
  };
  return (
    <Box
      className="flex flex-col w-full h-full p-4 gap-4"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="font-light text-gray-600 text-md md:text-xl text-center">
        Add Operation
      </p>
      <p className=" text-start font-thin  text-sm md:text-lg">
        Enter the operation details.
      </p>
      <Box className=" flex flex-col md:flex-row gap-4 flex-wrap ">
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center ">
          <label htmlFor="nom" className="w-full md:w-[160px]">
            operation:
          </label>
          <FormControl className="w-full md:flex-1">
            <Controller
              defaultValue=""
              name="name"
              control={control}
              render={({ field }) => (
                <TextField {...field} id="name" label="name" />
              )}
            />
          </FormControl>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
          <label htmlFor="nom" className="w-full md:w-[160px]">
            price:
          </label>
          <FormControl className="w-full md:flex-1">
            <Controller
              //@ts-ignore
              defaultValue={0.0}
              name="price"
              control={control}
              render={({ field }) => (
                <TextField {...field} id="price" type="number" label="price" />
              )}
            />
          </FormControl>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
          <label htmlFor="nom" className="w-full md:w-[160px]">
            code:
          </label>
          <FormControl className="w-full md:flex-1">
            <Controller
              name="code"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <TextField {...field} id="code" label="code" />
              )}
            />
          </FormControl>
        </Box>
        <Box className="flex ml-auto mt-4">
          <Button
            type="submit"
            variant="contained"
            className="w-full md:w-max !px-8 !py-2 rounded-lg "
          >
            Add
          </Button>
        </Box>
      </Box>
      <TableContainer className="w-full max-h-[400px] flex-wrap overflow-auto border border-gray-300">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className="bg-gray-300 !rounded-2xl	sticky top-0 z-10">
              <TableCell>
                <strong>Operation name</strong>
              </TableCell>
              <TableCell>
                <strong>code</strong>
              </TableCell>
              <TableCell>
                <strong>Price</strong>
              </TableCell>
              <TableCell className="w-20" />
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((operation: OperationPreference, index: number) => (
              <TableRow key={index}>
                <TableCell>{operation.name}</TableCell>
                <TableCell>{operation.code}</TableCell>
                <TableCell>{operation.price}</TableCell>
                <TableCell className="w-20">
                  <Button
                    className="w-max mx-auto"
                    variant="outlined"
                    color="error"
                  >
                    <DeleteOutlineIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OperationsListSettings;
