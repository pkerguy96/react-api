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
  FormHelperText,
} from "@mui/material";
import { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import getGlobal from "../../hooks/getGlobal";
import {
  NurseRole,
  NurseRoleResponse,
  Role,
  RoleApiClient,
  RoleNursesClient,
  RoleResponse,
} from "../../services/RolesService";
import { CACHE_KEY_NurseRole, CACHE_KEY_Role } from "../../constants";
import LoadingSpinner from "../LoadingSpinner";
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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data, isLoading } = getGlobal(
    {} as RoleResponse,
    CACHE_KEY_Role,
    RoleApiClient,
    undefined
  );
  const { data: data2, isLoading: isLoading2 } = getGlobal(
    {} as NurseRoleResponse,
    CACHE_KEY_NurseRole,
    RoleNursesClient,
    undefined
  );
  if (isLoading || isLoading2) return <LoadingSpinner />;

  const onSubmit = (data: any) => {
    const { nurse, role, ...permissions } = data;
    console.log(permissions);

    console.log({
      nurse,
      role,
      permissions: Object.entries(permissions)
        .filter((e) => e[1])
        .map((e) => e[0]),
    });
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
            rules={{ required: "Infirmière est requise" }}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                labelId="nurse-label"
                id="nurse-select"
                label="Infirmière"
                error={!!errors.nurse}
              >
                {data2.map((nurse: NurseRole) => (
                  <MenuItem value={nurse.id} key={nurse.id}>
                    {nurse.name}
                  </MenuItem>
                ))}
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
            rules={{ required: "Rôle est requise" }}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                labelId="role-label"
                id="role-select"
                label="Rôle"
                error={!!errors.role}
              >
                {data?.map((role: Role) => (
                  <MenuItem value={role.id} key={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
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
