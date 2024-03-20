import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";

import { Controller, useForm } from "react-hook-form";
const patient = [
  { name: "access_patient", display: "Accès complet" },
  { name: "insert_patient", display: "Ajouter un patient" },
  { name: "update_patient", display: "Modifier un patient" },
  { name: "delete_patient", display: "Supprimer un patient" },
  { name: "detail_patient", display: "Détails du patient" },
];

const ordonance = [
  { name: "access_ordonance", display: "Accès complet" },
  { name: "insert_ordonance", display: "Ajouter une ordonnance" },
  { name: "update_ordonance", display: "Modifier une ordonnance" },
  { name: "delete_ordonance", display: "Supprimer une ordonnance" },
];

const creance = [
  { name: "access_creance", display: "Accès complet" },
  { name: "search_creance", display: "Rechercher" },
];

const debt = [
  { name: "access_debt", display: "Accès complet" },
  { name: "insert_debt", display: "Ajouter un paiement" },
  { name: "delete_debt", display: "Supprimer un paiement" },
];

const document = [
  { name: "access_document", display: "Accès complet" },
  { name: "insert_document", display: "Ajouter un document" },
  { name: "delete_document", display: "Supprimer un document" },
  { name: "download_document", display: "Télécharger un document" },
  { name: "detail_document", display: "Voir un document" },
];

const RolesSettings = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    const { nurse, role, ...rest } = data;
    console.log({
      nurse,
      role,
      rest: Object.entries(rest)
        .filter((e) => e[1])
        .map((e) => e[0]),
    });

    /* const checkedPatients = patients.filter((item) => data[item]);
    console.log("Checked patients:", checkedPatients);

    const checkedOrdonance = ordonance.filter((item) => data[item]);
    console.log("Checked ordonance:", checkedOrdonance);

    const checkedCreance = creance.filter((item) => data[item]);
    console.log("Checked creance:", checkedCreance);

    const checkedDebt = debt.filter((item) => data[item]);
    console.log("Checked debt:", checkedDebt);

    const checkedDocument = document.filter((item) => data[item]);
    console.log("Checked document:", checkedDocument); */
  };
  return (
    <Box
      className="flex flex-col w-full h-full p-4 gap-4"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="font-light text-gray-600 text-md md:text-xl text-center">
        ROLES
      </p>
      <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
        <label htmlFor="nom" className="w-full md:w-[160px]">
          Infirmière:
        </label>
        <FormControl className="w-full md:flex-1">
          <InputLabel id="nurse-label">Infirmière</InputLabel>
          <Controller
            name="nurse"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                labelId="nurse-label"
                id="nurse-select"
                label="Infirmière"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            )}
          />
        </FormControl>
      </Box>
      <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
        <label htmlFor="nom" className="w-full md:w-[160px]">
          Rôle:
        </label>
        <FormControl className="w-full md:flex-1">
          <InputLabel id="role-label">Rôle</InputLabel>
          <Controller
            name="role"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                labelId="role-label"
                id="role-select"
                label="Rôle"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            )}
          />
        </FormControl>
      </Box>
      <Box className="w-full flex flex-col gap-4 md:flex-row md:flex-wrap items-center md:items-start">
        <label className="w-full md:w-[160px] text-base">Permissions:</label>
        <Box className="w-full grid grid-rows-1 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <Box className="flex flex-col flex-wrap">
            <label htmlFor="nom">Patient:</label>
            {patient.map((item, index) => (
              <Controller
                key={index}
                name={item.name}
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label={item.display}
                  />
                )}
              />
            ))}
          </Box>
          <Box className="flex flex-col flex-wrap">
            <label htmlFor="nom">Document:</label>
            {document.map((item, index) => (
              <Controller
                key={index}
                name={item.name}
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label={item.display}
                  />
                )}
              />
            ))}
          </Box>
          <Box className="flex flex-col flex-wrap">
            <label htmlFor="nom">Ordonnance:</label>
            {ordonance.map((item, index) => (
              <Controller
                key={index}
                name={item.name}
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label={item.display}
                  />
                )}
              />
            ))}
          </Box>
          <Box className="flex flex-col flex-wrap">
            <label htmlFor="nom">Dette:</label>
            {debt.map((item, index) => (
              <Controller
                key={index}
                name={item.name}
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label={item.display}
                  />
                )}
              />
            ))}
          </Box>
          <Box className="flex flex-col flex-wrap">
            <label htmlFor="nom">Créance:</label>
            {creance.map((item, index) => (
              <Controller
                key={index}
                name={item.name}
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label={item.display}
                  />
                )}
              />
            ))}
          </Box>
        </Box>
      </Box>
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

export default RolesSettings;
