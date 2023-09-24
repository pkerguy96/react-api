import AddButton from "../components/AddButton";
import Datatable, { HeadCell } from "../components/Datatable";
import getNurses from "../hooks/getNurses";
import getPatients, { Data } from "../hooks/getPatients";
import { Box, CircularProgress } from "@mui/material";
import { Nurse } from "./AddNurseForm";

const PatientsPage = () => {
  const { data } = getNurses();
  if (!data)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  const headCells: HeadCell[] = [
    {
      id: "nom",
      numeric: false,
      disablePadding: true,
      label: "Nom",
    },
    {
      id: "prenom",
      numeric: true,
      disablePadding: false,
      label: "Prenom",
    },
    {
      id: "cin",
      numeric: true,
      disablePadding: false,
      label: "Cin",
    },
    {
      id: "date",
      numeric: true,
      disablePadding: false,
      label: "Date",
    },
    {
      id: "address",
      numeric: true,
      disablePadding: false,
      label: "Address",
    },
    {
      id: "sex",
      numeric: true,
      disablePadding: false,
      label: "Sex",
    },
    {
      id: "phoneNumber",
      numeric: true,
      disablePadding: false,
      label: "Telephone",
    },
  ];
  return (
    <>
      <AddButton link="/AddNurse" PlaceHolder="Ajouter une infirmière" />
      <Datatable data={data as Nurse[]} headCells={headCells} />
    </>
  );
};

export default PatientsPage;
